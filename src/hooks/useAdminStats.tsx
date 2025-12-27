import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AdminStats {
  pendingBookings: number;
  todayBookings: number;
  totalRevenue: number;
  isLoading: boolean;
}

const requestNotificationPermission = async () => {
  if (!('Notification' in window)) return false;
  if (Notification.permission === 'granted') return true;
  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  return false;
};

const showBookingNotification = (bookingName: string) => {
  if (Notification.permission === 'granted') {
    new Notification('New Booking Request', {
      body: `New booking from ${bookingName}`,
      icon: '/favicon.ico',
      tag: 'new-booking',
    });
  }
};

export const useAdminStats = (isAdmin: boolean) => {
  const [stats, setStats] = useState<AdminStats>({
    pendingBookings: 0,
    todayBookings: 0,
    totalRevenue: 0,
    isLoading: true,
  });
  const initialLoadDone = useRef(false);

  const fetchStats = useCallback(async () => {
    if (!isAdmin) return;
    
    try {
      const today = new Date().toISOString().split('T')[0];

      const { count: pendingCount } = await supabase
        .from('bookings')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      const { count: todayCount } = await supabase
        .from('bookings')
        .select('*', { count: 'exact', head: true })
        .eq('event_date', today);

      const { data: payments } = await supabase
        .from('payments')
        .select('amount')
        .eq('status', 'completed');

      const totalRevenue = payments?.reduce((sum, p) => sum + Number(p.amount), 0) || 0;

      setStats({
        pendingBookings: pendingCount || 0,
        todayBookings: todayCount || 0,
        totalRevenue,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error fetching admin stats:', error);
      setStats(prev => ({ ...prev, isLoading: false }));
    }
  }, [isAdmin]);

  useEffect(() => {
    if (!isAdmin) {
      setStats(prev => ({ ...prev, isLoading: false }));
      return;
    }

    // Request notification permission on mount
    requestNotificationPermission();

    fetchStats().then(() => {
      initialLoadDone.current = true;
    });

    // Set up real-time subscription for bookings changes
    const bookingsChannel = supabase
      .channel('admin-stats-bookings')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'bookings' },
        (payload) => {
          if (initialLoadDone.current && payload.new) {
            const booking = payload.new as { name: string; status: string };
            if (booking.status === 'pending') {
              showBookingNotification(booking.name);
            }
          }
          fetchStats();
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'bookings' },
        () => {
          fetchStats();
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'bookings' },
        () => {
          fetchStats();
        }
      )
      .subscribe();

    const paymentsChannel = supabase
      .channel('admin-stats-payments')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'payments' },
        () => {
          fetchStats();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(bookingsChannel);
      supabase.removeChannel(paymentsChannel);
    };
  }, [isAdmin, fetchStats]);

  return stats;
};
