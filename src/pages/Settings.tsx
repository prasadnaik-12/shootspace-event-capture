
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Bell, Shield, Moon, Globe, Trash2, AlertTriangle } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Settings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    darkMode: false,
    publicProfile: false,
  });

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    
    toast({
      title: "Setting Updated",
      description: `${key.replace(/([A-Z])/g, ' $1').toLowerCase()} has been ${value ? 'enabled' : 'disabled'}.`,
    });
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      toast({
        title: "Account Deletion",
        description: "Please contact support to delete your account.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Settings</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Notification Settings */}
          <Card className="bg-white/60 backdrop-blur-sm border-orange-200/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                <Bell size={20} />
                <span>Notifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg border border-orange-200 bg-orange-50">
                <div>
                  <Label htmlFor="email-notifications" className="text-sm font-medium text-gray-700">
                    Email Notifications
                  </Label>
                  <p className="text-xs text-gray-600">Receive booking confirmations and updates via email</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={(value) => handleSettingChange('emailNotifications', value)}
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-orange-200 bg-orange-50">
                <div>
                  <Label htmlFor="sms-notifications" className="text-sm font-medium text-gray-700">
                    SMS Notifications
                  </Label>
                  <p className="text-xs text-gray-600">Receive booking reminders via text message</p>
                </div>
                <Switch
                  id="sms-notifications"
                  checked={settings.smsNotifications}
                  onCheckedChange={(value) => handleSettingChange('smsNotifications', value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card className="bg-white/60 backdrop-blur-sm border-orange-200/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                <Shield size={20} />
                <span>Privacy & Security</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg border border-orange-200 bg-orange-50">
                <div>
                  <Label htmlFor="public-profile" className="text-sm font-medium text-gray-700">
                    Public Profile
                  </Label>
                  <p className="text-xs text-gray-600">Make your profile visible to other users</p>
                </div>
                <Switch
                  id="public-profile"
                  checked={settings.publicProfile}
                  onCheckedChange={(value) => handleSettingChange('publicProfile', value)}
                />
              </div>

              <div className="p-3 rounded-lg border border-orange-200 bg-orange-50">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Account Email
                  </Label>
                </div>
                <p className="text-sm text-gray-600">{user?.email}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 text-orange-600 border-orange-300 hover:bg-orange-50"
                >
                  Change Email
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Display Settings */}
          <Card className="bg-white/60 backdrop-blur-sm border-orange-200/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                <Moon size={20} />
                <span>Display</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg border border-orange-200 bg-orange-50">
                <div>
                  <Label htmlFor="dark-mode" className="text-sm font-medium text-gray-700">
                    Dark Mode
                  </Label>
                  <p className="text-xs text-gray-600">Use dark theme for better low-light viewing</p>
                </div>
                <Switch
                  id="dark-mode"
                  checked={settings.darkMode}
                  onCheckedChange={(value) => handleSettingChange('darkMode', value)}
                />
              </div>

              <div className="p-3 rounded-lg border border-orange-200 bg-orange-50">
                <div className="flex items-center space-x-2 mb-2">
                  <Globe size={16} className="text-orange-600" />
                  <Label className="text-sm font-medium text-gray-700">
                    Language & Region
                  </Label>
                </div>
                <p className="text-sm text-gray-600 mb-2">English (US)</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-orange-600 border-orange-300 hover:bg-orange-50"
                >
                  Change Language
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="bg-white/60 backdrop-blur-sm border-red-200/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-red-600 flex items-center space-x-2">
                <AlertTriangle size={20} />
                <span>Danger Zone</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg border border-red-200 bg-red-50">
                <h4 className="text-sm font-medium text-red-800 mb-2">Delete Account</h4>
                <p className="text-xs text-red-600 mb-3">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button
                  onClick={handleDeleteAccount}
                  variant="destructive"
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 flex items-center space-x-2"
                >
                  <Trash2 size={16} />
                  <span>Delete Account</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
