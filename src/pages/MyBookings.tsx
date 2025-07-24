import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Calendar, Clock, MapPin, Camera, Users, Eye, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';

interface Booking {
  id: string;
  name: string;
  phone: string;
  email: string;
  event_type: string;
  event_date: string;
  event_time: string;
  location: string;
  plan: string;
  special_notes?: string;
  status: string;
  created_at: string;
}

const MyBookings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const fetchBookings = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user.id)
        .order('event_date', { ascending: true });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch bookings",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId)
        .eq('user_id', user?.id);

      if (error) throw error;

      toast({
        title: "Booking Cancelled",
        description: "Your booking has been cancelled successfully.",
      });

      // Refresh bookings
      fetchBookings();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel booking",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Bookings</h1>
          <Badge variant="outline" className="text-sm">
            {bookings.length} booking{bookings.length !== 1 ? 's' : ''}
          </Badge>
        </div>

        {bookings.length === 0 ? (
          <Card className="text-center py-12 bg-white/60 backdrop-blur-sm border-orange-200/50">
            <CardContent>
              <Camera className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No bookings yet</h3>
              <p className="text-gray-500">Your photo shoot bookings will appear here.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {/* Booking Sections */}
            {['confirmed', 'pending', 'cancelled'].map((status) => {
              const statusBookings = bookings.filter(booking => booking.status === status);
              
              if (statusBookings.length === 0) return null;
              
              return (
                <div key={status} className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 uppercase tracking-wide">
                    {status} Bookings ({statusBookings.length})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {statusBookings.map((booking) => (
                      <Card key={booking.id} className="bg-white/60 backdrop-blur-sm border-orange-200/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-semibold text-gray-800 capitalize">
                              {booking.event_type.replace('_', ' ')}
                            </CardTitle>
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Calendar size={16} />
                            <span className="text-sm">{new Date(booking.event_date).toLocaleDateString()}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Clock size={16} />
                            <span className="text-sm">{booking.event_time}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2 text-gray-600">
                            <MapPin size={16} />
                            <span className="text-sm">{booking.location}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Users size={16} />
                            <span className="text-sm capitalize">{booking.plan} Plan</span>
                          </div>

                          {booking.special_notes && (
                            <div className="mt-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                              <p className="text-sm text-gray-700">{booking.special_notes}</p>
                            </div>
                          )}

                          <div className="flex gap-2 mt-4">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="flex-1">
                                  <Eye size={16} className="mr-1" />
                                  View Booking
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-md">
                                <DialogHeader>
                                  <DialogTitle>Booking Details</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <p className="font-semibold text-gray-700">Event Type:</p>
                                    <p className="capitalize">{booking.event_type.replace('_', ' ')}</p>
                                  </div>
                                  <div>
                                    <p className="font-semibold text-gray-700">Name:</p>
                                    <p>{booking.name}</p>
                                  </div>
                                  <div>
                                    <p className="font-semibold text-gray-700">Email:</p>
                                    <p>{booking.email}</p>
                                  </div>
                                  <div>
                                    <p className="font-semibold text-gray-700">Phone:</p>
                                    <p>{booking.phone}</p>
                                  </div>
                                  <div>
                                    <p className="font-semibold text-gray-700">Date & Time:</p>
                                    <p>{new Date(booking.event_date).toLocaleDateString()} at {booking.event_time}</p>
                                  </div>
                                  <div>
                                    <p className="font-semibold text-gray-700">Location:</p>
                                    <p>{booking.location}</p>
                                  </div>
                                  <div>
                                    <p className="font-semibold text-gray-700">Plan:</p>
                                    <p className="capitalize">{booking.plan} Plan</p>
                                  </div>
                                  <div>
                                    <p className="font-semibold text-gray-700">Status:</p>
                                    <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                                  </div>
                                  {booking.special_notes && (
                                    <div>
                                      <p className="font-semibold text-gray-700">Special Notes:</p>
                                      <p>{booking.special_notes}</p>
                                    </div>
                                  )}
                                </div>
                              </DialogContent>
                            </Dialog>

                            {booking.status !== 'cancelled' && (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="destructive" size="sm" className="flex-1">
                                    <X size={16} className="mr-1" />
                                    Cancel
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to cancel this booking? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Keep Booking</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={() => cancelBooking(booking.id)}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Cancel Booking
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;