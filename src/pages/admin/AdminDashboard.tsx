import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { StatCard } from '@/components/admin/StatCard';
import { supabase } from '@/integrations/supabase/client';
import { 
  CalendarCheck, 
  Users, 
  Clock, 
  CheckCircle,
  XCircle,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isToday, parseISO } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Booking {
  id: string;
  name: string;
  email: string;
  event_date: string;
  event_time: string;
  event_type: string;
  status: string;
  location: string;
  plan: string;
}

interface Profile {
  id: string;
  name: string;
  created_at: string;
}

export const AdminDashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [clients, setClients] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [bookingsRes, clientsRes] = await Promise.all([
        supabase.from('bookings').select('*').order('event_date', { ascending: true }),
        supabase.from('profiles').select('*').order('created_at', { ascending: false })
      ]);

      if (bookingsRes.data) setBookings(bookingsRes.data);
      if (clientsRes.data) setClients(clientsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const weekStart = startOfWeek(today);
  const weekEnd = endOfWeek(today);

  const todayBookings = bookings.filter(b => {
    const bookingDate = parseISO(b.event_date);
    return isToday(bookingDate);
  });

  const weekBookings = bookings.filter(b => {
    const bookingDate = parseISO(b.event_date);
    return bookingDate >= weekStart && bookingDate <= weekEnd;
  });

  const monthBookings = bookings.filter(b => {
    const bookingDate = parseISO(b.event_date);
    return bookingDate >= monthStart && bookingDate <= monthEnd;
  });

  const pendingBookings = bookings.filter(b => b.status === 'pending');
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed');
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled');

  const upcomingBookings = bookings
    .filter(b => parseISO(b.event_date) >= today && b.status !== 'cancelled')
    .slice(0, 5);

  const recentClients = clients.slice(0, 5);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-admin-success text-primary-foreground">Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-admin-pending text-foreground">Pending</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Dashboard" subtitle="Loading...">
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout 
      title="Dashboard" 
      subtitle={`Welcome back! Here's what's happening today, ${format(today, 'MMMM d, yyyy')}`}
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Today's Bookings" 
          value={todayBookings.length}
          icon={Calendar}
          variant="info"
        />
        <StatCard 
          title="This Week" 
          value={weekBookings.length}
          icon={CalendarCheck}
          variant="default"
        />
        <StatCard 
          title="This Month" 
          value={monthBookings.length}
          icon={TrendingUp}
          variant="success"
        />
        <StatCard 
          title="Total Clients" 
          value={clients.length}
          icon={Users}
          variant="default"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard 
          title="Pending Approvals" 
          value={pendingBookings.length}
          icon={Clock}
          variant="pending"
        />
        <StatCard 
          title="Confirmed" 
          value={confirmedBookings.length}
          icon={CheckCircle}
          variant="success"
        />
        <StatCard 
          title="Cancelled" 
          value={cancelledBookings.length}
          icon={XCircle}
          variant="warning"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Bookings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-primary" />
              Upcoming Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingBookings.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No upcoming bookings</p>
            ) : (
              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <div 
                    key={booking.id} 
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div>
                      <p className="font-medium text-foreground">{booking.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(parseISO(booking.event_date), 'MMM d, yyyy')} at {booking.event_time}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{booking.event_type}</p>
                    </div>
                    {getStatusBadge(booking.status || 'pending')}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Clients */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Recent Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentClients.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No clients yet</p>
            ) : (
              <div className="space-y-4">
                {recentClients.map((client) => (
                  <div 
                    key={client.id} 
                    className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-muted-foreground flex items-center justify-center text-primary-foreground font-bold">
                      {client.name?.charAt(0).toUpperCase() || '?'}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{client.name || 'Unknown'}</p>
                      <p className="text-sm text-muted-foreground">
                        Joined {format(parseISO(client.created_at), 'MMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};
