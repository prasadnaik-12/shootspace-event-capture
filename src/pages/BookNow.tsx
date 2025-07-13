
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const BookNow = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: '',
    date: '',
    time: '',
    location: '',
    plan: '',
    specialNotes: '',
  });
  const [selectedDate, setSelectedDate] = useState<Date>();
  const { toast } = useToast();

  const eventTypes = ['Wedding', 'Birthday', 'Corporate', 'Fashion', 'Custom'];
  const plans = [
    { name: 'Basic', price: '₹2,000+GST', features: ['2 hours shoot', '1 edited reel', '15 edited portraits'] },
    { name: 'Standard', price: '₹5,000+GST', features: ['Half day shoot', '3 edited reels', '30 edited portraits'] },
    { name: 'Premium', price: '₹10,000+GST', features: ['Full day shoot', '5 edited reels', '50 edited portraits', 'Online gallery'] }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Booking submitted:', { ...formData, selectedDate });
    
    toast({
      title: "Booking Submitted!",
      description: "We'll contact you soon to confirm your booking.",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setFormData({
      ...formData,
      date: date ? format(date, 'yyyy-MM-dd') : ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFE5B4] to-[#FF9E4F] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Link to="/" className="text-4xl font-bold text-[#B55233] hover:scale-105 transition-transform duration-300 inline-block">
            ShootSpace
          </Link>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#5B3228] mt-4 mb-4">
            Book Your Perfect Shoot
          </h1>
          <p className="text-xl text-[#5B3228] max-w-2xl mx-auto">
            Fill out the details below and we'll create magic together
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#B55233] p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#5B3228] mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-[#B55233] rounded-xl focus:ring-2 focus:ring-[#FF9E4F] focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[#5B3228] mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 border border-[#B55233] rounded-xl focus:ring-2 focus:ring-[#FF9E4F] focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#5B3228] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-[#B55233] rounded-xl focus:ring-2 focus:ring-[#FF9E4F] focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
            </div>

            {/* Event Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="eventType" className="block text-sm font-medium text-[#5B3228] mb-2">
                  Event Type *
                </label>
                <select
                  id="eventType"
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-[#B55233] rounded-xl focus:ring-2 focus:ring-[#FF9E4F] focus:border-transparent transition-all duration-300"
                  required
                >
                  <option value="">Select Event Type</option>
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="plan" className="block text-sm font-medium text-[#5B3228] mb-2">
                  Select Plan *
                </label>
                <select
                  id="plan"
                  name="plan"
                  value={formData.plan}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-[#B55233] rounded-xl focus:ring-2 focus:ring-[#FF9E4F] focus:border-transparent transition-all duration-300"
                  required
                >
                  <option value="">Select Plan</option>
                  {plans.map((plan) => (
                    <option key={plan.name} value={plan.name}>
                      {plan.name} - {plan.price}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#5B3228] mb-2">
                  Event Date *
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full px-4 py-3 border border-[#B55233] rounded-xl focus:ring-2 focus:ring-[#FF9E4F] focus:border-transparent transition-all duration-300 justify-start text-left font-normal bg-white hover:bg-gray-50",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      disabled={(date) =>
                        date < new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label htmlFor="time" className="block text-sm font-medium text-[#5B3228] mb-2">
                  Preferred Time *
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-[#B55233] rounded-xl focus:ring-2 focus:ring-[#FF9E4F] focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-[#5B3228] mb-2">
                Event Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter the venue address"
                className="w-full px-4 py-3 border border-[#B55233] rounded-xl focus:ring-2 focus:ring-[#FF9E4F] focus:border-transparent transition-all duration-300"
                required
              />
            </div>

            {/* Special Notes */}
            <div>
              <label htmlFor="specialNotes" className="block text-sm font-medium text-[#5B3228] mb-2">
                Special Notes (Optional)
              </label>
              <textarea
                id="specialNotes"
                name="specialNotes"
                value={formData.specialNotes}
                onChange={handleInputChange}
                rows={4}
                placeholder="Any specific requirements, themes, or special requests..."
                className="w-full px-4 py-3 border border-[#B55233] rounded-xl focus:ring-2 focus:ring-[#FF9E4F] focus:border-transparent transition-all duration-300 resize-none"
              ></textarea>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="submit"
                className="bg-[#FF9E4F] text-[#5B3228] px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-[#e68834] hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Submit Booking
              </button>
              <Link
                to="/"
                className="bg-[#B55233] text-[#FFE5B4] px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-[#953f2a] hover:scale-105 transition-all duration-300 shadow-lg text-center"
              >
                Back to Home
              </Link>
            </div>
          </form>
        </div>

        <div className="mt-8 text-center">
          <p className="text-[#5B3228] text-lg">
            Questions? <a href="mailto:hello@shootspace.com" className="text-[#B55233] hover:text-[#5B3228] font-semibold">Contact us</a> directly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookNow;
