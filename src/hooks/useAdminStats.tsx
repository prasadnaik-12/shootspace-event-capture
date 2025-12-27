import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AdminStats {
  pendingBookings: number;
  todayBookings: number;
  totalRevenue: number;
  isLoading: boolean;
}

export const useAdminStats = (isAdmin: boolean) => {
  const [stats, setStats] = useState<AdminStats>({
    pendingBookings: 0,
    todayBookings: 0,
    totalRevenue: 0,
    isLoading: true,
  });

  useEffect(() => {
    if (!isAdmin) {
      setStats(prev => ({ ...prev, isLoading: false }));
      return;
    }

    const fetchStats = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];

        // Fetch pending bookings count
        const { count: pendingCount } = await supabase
          .from('bookings')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending');

        // Fetch today's bookings count
        const { count: todayCount } = await supabase
          .from('bookings')
          .select('*', { count: 'exact', head: true })
          .eq('event_date', today);

        // Fetch total revenue from completed payments
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
    };

    fetchStats();
  }, [isAdmin]);

  return stats;
};
