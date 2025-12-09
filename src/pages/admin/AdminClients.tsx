import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { format, parseISO } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Search, Eye, Phone, CreditCard, Calendar, IndianRupee } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Profile {
  id: string;
  name: string | null;
  phone: string | null;
  about: string | null;
  avatar_url: string | null;
  created_at: string;
}

interface Booking {
  id: string;
  user_id: string | null;
  event_date: string;
  event_time: string;
  event_type: string;
  status: string;
  plan: string;
  location: string;
}

interface Payment {
  id: string;
  user_id: string;
  amount: number;
  status: string;
  payment_method: string | null;
  created_at: string;
}

export const AdminClients = () => {
  const [clients, setClients] = useState<Profile[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState<Profile | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [clientsRes, bookingsRes, paymentsRes] = await Promise.all([
        supabase.from('profiles').select('*').order('created_at', { ascending: false }),
        supabase.from('bookings').select('*'),
        supabase.from('payments').select('*')
      ]);

      if (clientsRes.data) setClients(clientsRes.data);
      if (bookingsRes.data) setBookings(bookingsRes.data);
      if (paymentsRes.data) setPayments(paymentsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getClientBookings = (clientId: string) => {
    return bookings.filter(b => b.user_id === clientId);
  };

  const getClientPayments = (clientId: string) => {
    return payments.filter(p => p.user_id === clientId);
  };

  const getClientBookingCount = (clientId: string) => {
    return getClientBookings(clientId).length;
  };

  const getClientTotalSpent = (clientId: string) => {
    return getClientPayments(clientId)
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + Number(p.amount), 0);
  };

  const getClientPaymentStatus = (clientId: string) => {
    const clientPayments = getClientPayments(clientId);
    const pending = clientPayments.filter(p => p.status === 'pending').length;
    const completed = clientPayments.filter(p => p.status === 'completed').length;
    
    if (pending > 0) return { status: 'pending', label: `${pending} pending` };
    if (completed > 0) return { status: 'paid', label: 'Paid' };
    return { status: 'none', label: 'No payments' };
  };

  const handleViewClient = (client: Profile) => {
    setSelectedClient(client);
    setViewDialogOpen(true);
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

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-admin-success text-primary-foreground">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-admin-warning text-foreground">Pending</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      case 'refunded':
        return <Badge variant="outline">Refunded</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredClients = clients.filter(client => 
    client.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.phone?.includes(searchQuery)
  );

  if (loading) {
    return (
      <AdminLayout title="Clients" subtitle="Loading...">
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Clients Management" subtitle="View and manage all registered clients">
      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search clients by name or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Clients Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Clients ({filteredClients.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredClients.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No clients found</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Bookings</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client) => {
                    const paymentStatus = getClientPaymentStatus(client.id);
                    return (
                      <TableRow key={client.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={client.avatar_url || undefined} />
                              <AvatarFallback className="bg-gradient-to-br from-primary to-muted-foreground text-primary-foreground">
                                {client.name?.charAt(0).toUpperCase() || '?'}
                              </AvatarFallback>
                            </Avatar>
                            <p className="font-medium">{client.name || 'Unknown'}</p>
                          </div>
                        </TableCell>
                        <TableCell>{client.phone || 'N/A'}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{getClientBookingCount(client.id)} bookings</Badge>
                        </TableCell>
                        <TableCell className="font-semibold">
                          ₹{getClientTotalSpent(client.id).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={paymentStatus.status === 'paid' ? 'default' : 
                                    paymentStatus.status === 'pending' ? 'secondary' : 'outline'}
                            className={paymentStatus.status === 'paid' ? 'bg-admin-success' : 
                                       paymentStatus.status === 'pending' ? 'bg-admin-warning' : ''}
                          >
                            {paymentStatus.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {format(parseISO(client.created_at), 'MMM d, yyyy')}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleViewClient(client)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Client Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Client Profile</DialogTitle>
            <DialogDescription>
              Detailed client information, booking history, and payments
            </DialogDescription>
          </DialogHeader>
          {selectedClient && (
            <div className="space-y-6">
              {/* Client Info */}
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={selectedClient.avatar_url || undefined} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-muted-foreground text-primary-foreground text-xl">
                    {selectedClient.name?.charAt(0).toUpperCase() || '?'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">{selectedClient.name || 'Unknown'}</h3>
                  <p className="text-sm text-muted-foreground">
                    Member since {format(parseISO(selectedClient.created_at), 'MMMM yyyy')}
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 rounded-lg bg-muted/50 text-center">
                  <p className="text-2xl font-bold">{getClientBookingCount(selectedClient.id)}</p>
                  <p className="text-sm text-muted-foreground">Total Bookings</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 text-center">
                  <p className="text-2xl font-bold">₹{getClientTotalSpent(selectedClient.id).toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 text-center">
                  <p className="text-2xl font-bold">{getClientPayments(selectedClient.id).length}</p>
                  <p className="text-sm text-muted-foreground">Payments</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{selectedClient.phone || 'Not provided'}</p>
                </div>
              </div>

              {/* Tabs for History */}
              <Tabs defaultValue="bookings" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="bookings" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Booking History
                  </TabsTrigger>
                  <TabsTrigger value="payments" className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Payment Status
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="bookings" className="mt-4">
                  {getClientBookings(selectedClient.id).length === 0 ? (
                    <p className="text-center text-muted-foreground py-6">No bookings found</p>
                  ) : (
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {getClientBookings(selectedClient.id).map((booking) => (
                        <div key={booking.id} className="p-4 rounded-lg border bg-card">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold capitalize">{booking.event_type}</span>
                            {getStatusBadge(booking.status)}
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {format(parseISO(booking.event_date), 'MMM d, yyyy')}
                            </div>
                            <div>Time: {booking.event_time}</div>
                            <div>Plan: <span className="capitalize">{booking.plan}</span></div>
                            <div className="truncate">Location: {booking.location}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="payments" className="mt-4">
                  {getClientPayments(selectedClient.id).length === 0 ? (
                    <p className="text-center text-muted-foreground py-6">No payments found</p>
                  ) : (
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {getClientPayments(selectedClient.id).map((payment) => (
                        <div key={payment.id} className="p-4 rounded-lg border bg-card">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <IndianRupee className="w-4 h-4" />
                              <span className="font-semibold">₹{Number(payment.amount).toLocaleString()}</span>
                            </div>
                            {getPaymentStatusBadge(payment.status)}
                          </div>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>{payment.payment_method || 'N/A'}</span>
                            <span>{format(parseISO(payment.created_at), 'MMM d, yyyy')}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};
