import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { StatCard } from '@/components/admin/StatCard';
import { supabase } from '@/integrations/supabase/client';
import { 
  DollarSign, 
  Clock, 
  AlertTriangle, 
  TrendingUp,
  Download,
  FileText,
  CreditCard
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format, startOfMonth, endOfMonth, subMonths } from 'date-fns';

interface Payment {
  id: string;
  booking_id: string | null;
  user_id: string;
  amount: number;
  status: string;
  payment_method: string | null;
  transaction_id: string | null;
  refund_amount: number;
  refund_reason: string | null;
  created_at: string;
}

interface ServiceEarning {
  event_type: string;
  total: number;
  count: number;
}

const AdminPayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'));
  const [serviceEarnings, setServiceEarnings] = useState<ServiceEarning[]>([]);

  useEffect(() => {
    fetchPayments();
  }, [selectedMonth]);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const monthDate = new Date(selectedMonth + '-01');
      const startDate = startOfMonth(monthDate).toISOString();
      const endDate = endOfMonth(monthDate).toISOString();

      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .gte('created_at', startDate)
        .lte('created_at', endDate)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPayments(data || []);

      // Calculate earnings per service type from bookings
      const { data: bookingsData } = await supabase
        .from('bookings')
        .select('event_type, plan')
        .gte('created_at', startDate)
        .lte('created_at', endDate);

      if (bookingsData) {
        const earningsMap = new Map<string, { total: number; count: number }>();
        bookingsData.forEach(booking => {
          const type = booking.event_type;
          const planPrice = booking.plan === 'premium' ? 5000 : booking.plan === 'standard' ? 3500 : 2000;
          const existing = earningsMap.get(type) || { total: 0, count: 0 };
          earningsMap.set(type, {
            total: existing.total + planPrice,
            count: existing.count + 1
          });
        });
        setServiceEarnings(
          Array.from(earningsMap.entries()).map(([event_type, data]) => ({
            event_type,
            ...data
          }))
        );
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalRevenue = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const pendingPayments = payments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const totalRefunds = payments
    .reduce((sum, p) => sum + Number(p.refund_amount || 0), 0);

  const disputeCount = payments.filter(p => p.status === 'disputed').length;

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      completed: 'default',
      pending: 'secondary',
      failed: 'destructive',
      disputed: 'destructive',
      refunded: 'outline'
    };
    return <Badge variant={variants[status] || 'secondary'}>{status}</Badge>;
  };

  const generateMonthOptions = () => {
    const options = [];
    for (let i = 0; i < 12; i++) {
      const date = subMonths(new Date(), i);
      options.push({
        value: format(date, 'yyyy-MM'),
        label: format(date, 'MMMM yyyy')
      });
    }
    return options;
  };

  const downloadStatement = () => {
    const headers = ['Date', 'Transaction ID', 'Amount', 'Status', 'Payment Method', 'Refund'];
    const rows = payments.map(p => [
      format(new Date(p.created_at), 'yyyy-MM-dd'),
      p.transaction_id || 'N/A',
      `₹${p.amount}`,
      p.status,
      p.payment_method || 'N/A',
      p.refund_amount ? `₹${p.refund_amount}` : '-'
    ]);
    
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `statement-${selectedMonth}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <AdminLayout title="Payments & Finance" subtitle="Manage payments, refunds, and financial reports">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Payments & Finance" subtitle="Manage payments, refunds, and financial reports">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Revenue"
          value={`₹${totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          trend={{ value: 12, isPositive: true }}
          variant="success"
        />
        <StatCard
          title="Pending Payments"
          value={`₹${pendingPayments.toLocaleString()}`}
          icon={Clock}
          variant="warning"
        />
        <StatCard
          title="Total Refunds"
          value={`₹${totalRefunds.toLocaleString()}`}
          icon={AlertTriangle}
          variant="danger"
        />
        <StatCard
          title="Disputes"
          value={disputeCount.toString()}
          icon={AlertTriangle}
          variant={disputeCount > 0 ? 'danger' : 'default'}
        />
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            {generateMonthOptions().map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={downloadStatement}>
          <Download className="w-4 h-4 mr-2" />
          Download Statement
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payments Table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Gateway Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            {payments.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No payments found for this period</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Method</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.slice(0, 10).map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>
                          {format(new Date(payment.created_at), 'MMM dd, yyyy')}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {payment.transaction_id || '-'}
                        </TableCell>
                        <TableCell className="font-semibold">
                          ₹{Number(payment.amount).toLocaleString()}
                        </TableCell>
                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
                        <TableCell>{payment.payment_method || '-'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Earnings per Service Type */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Earnings by Service
            </CardTitle>
          </CardHeader>
          <CardContent>
            {serviceEarnings.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No service data available</p>
              </div>
            ) : (
              <div className="space-y-4">
                {serviceEarnings.map((service) => (
                  <div key={service.event_type} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium capitalize">{service.event_type}</p>
                      <p className="text-sm text-muted-foreground">{service.count} bookings</p>
                    </div>
                    <p className="font-bold text-primary">₹{service.total.toLocaleString()}</p>
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

export default AdminPayments;