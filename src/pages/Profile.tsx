
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/Navbar';
import ProfileForm from '@/components/ProfileForm';

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
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

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
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
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
          <ProfileForm 
            profile={profile} 
            user={user} 
            onProfileUpdate={fetchProfile}
          />

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
