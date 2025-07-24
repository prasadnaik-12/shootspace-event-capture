import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Save, X, Upload } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  id: string;
  name: string | null;
  phone: string | null;
  about?: string | null;
  avatar_url?: string | null;
  created_at: string;
  updated_at?: string;
}

interface ProfileFormProps {
  profile: Profile | null;
  user: any;
  onProfileUpdate: () => void;
}

const ProfileForm = ({ profile, user, onProfileUpdate }: ProfileFormProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    phone: profile?.phone || '',
    about: profile?.about || '',
  });

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

      setIsEditing(false);
      onProfileUpdate();
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

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          upsert: true
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          avatar_url: publicUrl,
          updated_at: new Date().toISOString(),
        });

      if (updateError) throw updateError;

      toast({
        title: "Avatar Updated",
        description: "Your profile picture has been updated successfully.",
      });

      onProfileUpdate();
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload profile picture",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
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

  const cancelEdit = () => {
    setFormData({
      name: profile?.name || '',
      phone: profile?.phone || '',
      about: profile?.about || '',
    });
    setIsEditing(false);
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-orange-200/50">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-gray-800 mb-4">
            BASIC INFORMATION
          </CardTitle>
          {!isEditing ? (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsEditing(true)}
              className="border-orange-200 hover:border-orange-300"
            >
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={cancelEdit}
                className="border-gray-200 hover:border-gray-300"
              >
                <X size={16} />
                Cancel
              </Button>
            </div>
          )}
        </div>
        
        {/* Avatar Section */}
        <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-gray-200">
          <Avatar className="w-16 h-16">
            <AvatarImage src={profile?.avatar_url || ''} />
            <AvatarFallback className="bg-orange-100 text-orange-600 text-lg font-semibold">
              {getInitials(profile?.name, user?.email)}
            </AvatarFallback>
          </Avatar>
          <div>
            <input
              type="file"
              id="avatar-upload"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
              disabled={uploading}
            />
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center space-x-2 border-orange-200 hover:border-orange-300"
              onClick={() => document.getElementById('avatar-upload')?.click()}
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload size={16} />
                  <span>Upload Avatar</span>
                </>
              )}
            </Button>
            <p className="text-xs text-gray-500 mt-1">
              PNG, JPG up to 5MB
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {isEditing ? (
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
                <>
                  <Save size={16} className="mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Full Name
              </Label>
              <p className="text-gray-900 py-2 px-3 bg-gray-50 rounded-lg border">
                {profile?.name || 'Not provided'}
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Phone Number
              </Label>
              <p className="text-gray-900 py-2 px-3 bg-gray-50 rounded-lg border">
                {profile?.phone || 'Not provided'}
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                About
              </Label>
              <p className="text-gray-900 py-2 px-3 bg-gray-50 rounded-lg border min-h-[100px]">
                {profile?.about || 'Not provided'}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileForm;