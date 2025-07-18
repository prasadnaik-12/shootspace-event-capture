
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, BookOpenCheck, User, Settings, MessageCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import DashboardBookings from '@/components/dashboard/DashboardBookings';
import DashboardCalendar from '@/components/dashboard/DashboardCalendar';
import DashboardProfile from '@/components/dashboard/DashboardProfile';
import DashboardSettings from '@/components/dashboard/DashboardSettings';
import DashboardContact from '@/components/dashboard/DashboardContact';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('bookings');

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Signed Out",
        description: "You've been signed out successfully",
      });
    }
  };

  const tabs = [
    { id: 'bookings', label: 'My Bookings', icon: BookOpenCheck },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'contact', label: 'Contact', icon: MessageCircle },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <div className="hidden md:block text-gray-600">
                Welcome back, {user?.email?.split('@')[0]}!
              </div>
            </div>
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="flex items-center space-x-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          {/* Tab Navigation */}
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-2 bg-white/60 backdrop-blur-sm p-2 rounded-2xl border border-orange-200/50 shadow-lg">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-orange-50"
              >
                <tab.icon size={18} />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tab Content */}
          <div className="animate-fade-in">
            <TabsContent value="bookings" className="space-y-6">
              <DashboardBookings />
            </TabsContent>

            <TabsContent value="calendar" className="space-y-6">
              <DashboardCalendar />
            </TabsContent>

            <TabsContent value="profile" className="space-y-6">
              <DashboardProfile />
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <DashboardSettings />
            </TabsContent>

            <TabsContent value="contact" className="space-y-6">
              <DashboardContact />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
