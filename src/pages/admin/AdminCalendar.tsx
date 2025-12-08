import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format, parseISO, isSameDay } from 'date-fns';
import { cn } from '@/lib/utils';

interface Booking {
  id: string;
  name: string;
  event_date: string;
  event_time: string;
  event_type: string;
  status: string;
  location: string;
}

export const AdminCalendar = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('event_date', { ascending: true });

      if (error) throw error;
      if (data) setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getBookingsForDate = (date: Date) => {
    return bookings.filter(booking => 
      isSameDay(parseISO(booking.event_date), date)
    );
  };

  const selectedDateBookings = selectedDate ? getBookingsForDate(selectedDate) : [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-admin-success';
      case 'pending':
        return 'bg-admin-pending';
      case 'cancelled':
        return 'bg-destructive';
      default:
        return 'bg-muted';
    }
  };

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

  // Create a map of dates with bookings for highlighting
  const datesWithBookings = bookings.reduce((acc, booking) => {
    const dateStr = booking.event_date;
    if (!acc[dateStr]) {
      acc[dateStr] = [];
    }
    acc[dateStr].push(booking);
    return acc;
  }, {} as Record<string, Booking[]>);

  if (loading) {
    return (
      <AdminLayout title="Calendar" subtitle="Loading...">
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Calendar View" subtitle="Visual overview of all scheduled bookings">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Booking Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border w-full pointer-events-auto"
              modifiers={{
                booked: (date) => {
                  const dateStr = format(date, 'yyyy-MM-dd');
                  return !!datesWithBookings[dateStr];
                }
              }}
              modifiersStyles={{
                booked: {
                  fontWeight: 'bold',
                  backgroundColor: 'hsl(var(--primary) / 0.1)',
                  color: 'hsl(var(--primary))'
                }
              }}
              components={{
                DayContent: ({ date }) => {
                  const dateStr = format(date, 'yyyy-MM-dd');
                  const dayBookings = datesWithBookings[dateStr] || [];
                  const hasConfirmed = dayBookings.some(b => b.status === 'confirmed');
                  const hasPending = dayBookings.some(b => b.status === 'pending');
                  
                  return (
                    <div className="relative w-full h-full flex flex-col items-center justify-center">
                      <span>{format(date, 'd')}</span>
                      {dayBookings.length > 0 && (
                        <div className="absolute bottom-1 flex gap-0.5">
                          {hasConfirmed && (
                            <div className="w-1.5 h-1.5 rounded-full bg-admin-success" />
                          )}
                          {hasPending && (
                            <div className="w-1.5 h-1.5 rounded-full bg-admin-pending" />
                          )}
                        </div>
                      )}
                    </div>
                  );
                }
              }}
            />
            <div className="flex items-center gap-4 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-admin-success" />
                <span className="text-muted-foreground">Confirmed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-admin-pending" />
                <span className="text-muted-foreground">Pending</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <span className="text-muted-foreground">Cancelled</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selected Date Details */}
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a date'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDateBookings.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No bookings for this date
              </p>
            ) : (
              <div className="space-y-4">
                {selectedDateBookings.map((booking) => (
                  <div 
                    key={booking.id}
                    className={cn(
                      "p-4 rounded-lg border-l-4",
                      booking.status === 'confirmed' && "border-l-admin-success bg-admin-success/5",
                      booking.status === 'pending' && "border-l-admin-pending bg-admin-pending/5",
                      booking.status === 'cancelled' && "border-l-destructive bg-destructive/5"
                    )}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-medium text-foreground">{booking.name}</p>
                      {getStatusBadge(booking.status || 'pending')}
                    </div>
                    <p className="text-sm text-muted-foreground">{booking.event_time}</p>
                    <p className="text-sm text-muted-foreground">{booking.event_type}</p>
                    <p className="text-sm text-muted-foreground">{booking.location}</p>
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
