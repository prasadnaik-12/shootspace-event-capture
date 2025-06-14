
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const SignIn = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    toast({
      title: isSignUp ? "Account Created!" : "Signed In!",
      description: isSignUp ? "Welcome to ShootSpace!" : "Welcome back!",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF9E4F] to-[#B55233] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#FFE5B4] rounded-2xl border border-[#B55233] p-8 shadow-xl">
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-bold text-[#FF9E4F] hover:scale-105 transition-transform duration-300 inline-block">
            ShootSpace
          </Link>
          <h2 className="text-2xl font-bold text-[#5B3228] mt-4">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-[#5B3228] mt-2">
            {isSignUp ? 'Join ShootSpace today' : 'Sign in to your account'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {isSignUp && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#5B3228] mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-[#B55233] rounded-xl focus:ring-2 focus:ring-[#FF9E4F] focus:border-transparent transition-all duration-300"
                required={isSignUp}
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#5B3228] mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-[#B55233] rounded-xl focus:ring-2 focus:ring-[#FF9E4F] focus:border-transparent transition-all duration-300"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#5B3228] mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-[#B55233] rounded-xl focus:ring-2 focus:ring-[#FF9E4F] focus:border-transparent transition-all duration-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#FF9E4F] text-[#5B3228] py-3 rounded-xl font-semibold hover:bg-[#e68834] hover:scale-105 transition-all duration-300 shadow-lg"
          >
            {isSignUp ? 'Create Account' : 'Sign In'}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-[#B55233] hover:text-[#FF9E4F] font-medium transition-colors duration-300"
            >
              {isSignUp 
                ? 'Already have an account? Sign In' 
                : "Don't have an account? Sign Up"
              }
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#B55233]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#FFE5B4] text-[#5B3228]">Or continue with</span>
            </div>
          </div>

          <button
            type="button"
            className="w-full bg-white border border-[#B55233] text-[#5B3228] py-3 rounded-xl font-semibold hover:bg-gray-50 hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center"
          >
            <span className="mr-2">🔗</span>
            Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
