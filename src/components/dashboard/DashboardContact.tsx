
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { MessageCircle, Phone, Mail, MapPin, Send, Clock } from 'lucide-react';

const DashboardContact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    priority: 'normal'
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    
    // Simulate sending message
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ subject: '', message: '', priority: 'normal' });
      setSending(false);
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Contact Support</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Form */}
        <Card className="bg-white/60 backdrop-blur-sm border-orange-200/50">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
              <MessageCircle size={20} />
              <span>Send us a Message</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-sm font-semibold text-gray-700">
                  Subject
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                  placeholder="What can we help you with?"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority" className="text-sm font-semibold text-gray-700">
                  Priority
                </Label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-orange-200 rounded-md focus:border-orange-500 focus:ring-orange-500 bg-white"
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-semibold text-gray-700">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="border-orange-200 focus:border-orange-500 focus:ring-orange-500 min-h-[120px]"
                  placeholder="Describe your issue or question in detail..."
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={sending}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transition-all duration-300"
              >
                {sending ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Send size={16} />
                    <span>Send Message</span>
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="space-y-6">
          <Card className="bg-white/60 backdrop-blur-sm border-orange-200/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">
                Get in Touch
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                <Phone className="text-orange-600" size={20} />
                <div>
                  <p className="text-sm font-medium text-gray-700">Phone</p>
                  <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                <Mail className="text-orange-600" size={20} />
                <div>
                  <p className="text-sm font-medium text-gray-700">Email</p>
                  <p className="text-sm text-gray-600">support@shootspace.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                <MapPin className="text-orange-600" size={20} />
                <div>
                  <p className="text-sm font-medium text-gray-700">Address</p>
                  <p className="text-sm text-gray-600">123 Photo Street<br />Studio City, CA 90210</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                <Clock className="text-orange-600" size={20} />
                <div>
                  <p className="text-sm font-medium text-gray-700">Business Hours</p>
                  <p className="text-sm text-gray-600">Mon-Fri: 9AM-6PM<br />Sat-Sun: 10AM-4PM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Quick Links */}
          <Card className="bg-white/60 backdrop-blur-sm border-orange-200/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">
                Quick Help
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start text-gray-700 border-orange-200 hover:bg-orange-50"
              >
                How to reschedule a booking?
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-gray-700 border-orange-200 hover:bg-orange-50"
              >
                Cancellation policy
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-gray-700 border-orange-200 hover:bg-orange-50"
              >
                Photo delivery timeline
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-gray-700 border-orange-200 hover:bg-orange-50"
              >
                Payment & billing
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardContact;
