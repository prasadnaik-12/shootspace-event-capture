
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Phone, Calendar, Save, Camera } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Navbar from '@/components/Navbar';

interface Profile {
  id: string;
  name: string | null;
  phone: string | null;
  about?: string | null;
  avatar_url?: string | null;
  created_at: string;
  updated_at?: string;
}

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    about: '',
  });

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setProfile(data);
        setFormData({
          name: data.name || '',
          phone: data.phone || '',
          about: data.about || '',
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          name: formData.name,
          phone: formData.phone,
          about: formData.about,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });

      fetchProfile();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getInitials = (name: string | null, email: string | undefined) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    if (email) {
      return email[0].toUpperCase();
    }
    return 'U';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">PROFILE</h1>
          <p className="text-gray-600 text-sm">MANAGE YOUR PROFILE</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Form */}
          <Card className="bg-white/80 backdrop-blur-sm border-orange-200/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 mb-4">
                BASIC INFORMATION
              </CardTitle>
              
              {/* Avatar Section */}
              <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-gray-200">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={profile?.avatar_url || ''} />
                  <AvatarFallback className="bg-orange-100 text-orange-600 text-lg font-semibold">
                    {getInitials(profile?.name, user?.email)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center space-x-2 border-orange-200 hover:border-orange-300"
                  >
                    <Camera size={16} />
                    <span>Change Avatar</span>
                  </Button>
                  <p className="text-xs text-gray-500 mt-1">
                    Or drag and drop an image anywhere on the page
                  </p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-lg"
                    placeholder=""
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-lg"
                    placeholder=""
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="about" className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    About
                  </Label>
                  <Textarea
                    id="about"
                    name="about"
                    value={formData.about}
                    onChange={handleInputChange}
                    className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-lg min-h-[100px] resize-none"
                    placeholder=""
                  />
                </div>

                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-2 rounded-lg uppercase tracking-wide text-sm font-medium"
                >
                  {saving ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Saving...</span>
                    </div>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Account Info */}
          <Card className="bg-white/80 backdrop-blur-sm border-orange-200/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 uppercase tracking-wide">
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2 block">
                  Email Address
                </Label>
                <Input
                  value={user?.email || ''}
                  readOnly
                  className="border-gray-300 bg-gray-50 rounded-lg"
                />
              </div>

              <div>
                <Label className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2 block">
                  Phone Number
                </Label>
                <Input
                  value={profile?.phone || ''}
                  readOnly
                  className="border-gray-300 bg-gray-50 rounded-lg"
                />
              </div>

              <div>
                <Label className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2 block">
                  Last Signed In
                </Label>
                <Input
                  value={profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'N/A'}
                  readOnly
                  className="border-gray-300 bg-gray-50 rounded-lg"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
