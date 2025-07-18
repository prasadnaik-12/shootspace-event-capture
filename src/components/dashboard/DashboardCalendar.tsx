
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Camera, Clock, MapPin } from 'lucide-react';

interface Booking {
  id: string;
  event_type: string;
  event_date: string;
  event_time: string;
  location: string;
  status: string;
}

const DashboardCalendar = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const fetchBookings = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('id, event_type, event_date, event_time, location, status')
        .eq('user_id', user.id)
        .order('event_date', { ascending: true });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getBookingDates = () => {
    return bookings.map(booking => new Date(booking.event_date));
  };

  const getBookingsForDate = (date: Date | undefined) => {
    if (!date) return [];
    const dateString = format(date, 'yyyy-MM-dd');
    return bookings.filter(booking => booking.event_date === dateString);
  };

  const selectedDateBookings = getBookingsForDate(selectedDate);

  const modifiers = {
    booked: getBookingDates(),
  };

  const modifiersStyles = {
    booked: {
      backgroundColor: '#fed7aa',
      color: '#ea580c',
      fontWeight: 'bold',
    },
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="animate-pulse">
          <CardHeader>
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          </CardHeader>
          <CardContent>
            <div className="h-80 bg-gray-200 rounded"></div>
          </CardContent>
        </Card>
        <Card className="animate-pulse">
          <CardHeader>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Calendar View</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar */}
        <Card className="bg-white/60 backdrop-blur-sm border-orange-200/50">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">
              Booking Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              modifiers={modifiers}
              modifiersStyles={modifiersStyles}
              className="rounded-md border border-orange-200"
            />
            <div className="mt-4 flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-4 h-4 bg-orange-200 rounded"></div>
              <span>Days with bookings</span>
            </div>
          </CardContent>
        </Card>

        {/* Selected Date Details */}
        <Card className="bg-white/60 backdrop-blur-sm border-orange-200/50">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">
              {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a date'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDateBookings.length === 0 ? (
              <div className="text-center py-8">
                <Camera className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">No bookings on this date</p>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedDateBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="p-4 rounded-lg border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800 capitalize">
                        {booking.event_type.replace('_', ' ')}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        {booking.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Clock size={14} />
                        <span>{booking.event_time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin size={14} />
                        <span>{booking.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardCalendar;
