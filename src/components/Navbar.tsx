import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, UserCircle, BookOpen, Settings, LayoutDashboard, Clock, Calendar, DollarSign, Bell } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/hooks/useAuth';
import { useAdmin } from '@/hooks/useAdmin';
import { useAdminStats } from '@/hooks/useAdminStats';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdmin();
  const adminStats = useAdminStats(isAdmin);
  const { toast } = useToast();
  const location = useLocation();

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

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Our Journey', href: '/our-journey' },
    { name: 'Explore', href: '/explore' },
    { name: 'VibeSpace', href: '/vibe-space' },
    { name: 'Pricing', href: '/pricing' },
  ];

  const getUserInitials = () => {
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
            ShootSpace
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-300 hover:scale-105"
              >
                {link.name}
              </Link>
            ))}
            
            {user ? (
              <div className="flex items-center space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="relative cursor-pointer">
                      <Avatar className="hover:ring-2 hover:ring-orange-500 transition-all duration-200">
                        <AvatarFallback className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                      {isAdmin && adminStats.pendingBookings > 0 && (
                        <Badge 
                          className="absolute -top-1 -right-1 h-5 min-w-[20px] flex items-center justify-center p-0 text-xs bg-red-500 hover:bg-red-500 border-2 border-white"
                        >
                          {adminStats.pendingBookings > 9 ? '9+' : adminStats.pendingBookings}
                        </Badge>
                      )}
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">My Account</p>
                        <p className="text-xs leading-none text-muted-foreground truncate">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {isAdmin && (
                      <>
                        <div className="px-2 py-2 space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="flex items-center text-muted-foreground">
                              <Clock className="mr-1.5 h-3 w-3" />
                              Pending
                            </span>
                            <span className="font-semibold text-orange-600">
                              {adminStats.isLoading ? '...' : adminStats.pendingBookings}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="flex items-center text-muted-foreground">
                              <Calendar className="mr-1.5 h-3 w-3" />
                              Today
                            </span>
                            <span className="font-semibold text-blue-600">
                              {adminStats.isLoading ? '...' : adminStats.todayBookings}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="flex items-center text-muted-foreground">
                              <DollarSign className="mr-1.5 h-3 w-3" />
                              Revenue
                            </span>
                            <span className="font-semibold text-green-600">
                              ₹{adminStats.isLoading ? '...' : adminStats.totalRevenue.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link to="/admin" className="flex items-center cursor-pointer text-orange-600">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            <span>Admin Dashboard</span>
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    {!isAdmin && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link to="/profile" className="flex items-center cursor-pointer">
                            <UserCircle className="mr-2 h-4 w-4" />
                            <span>View Profile</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/my-bookings" className="flex items-center cursor-pointer">
                            <BookOpen className="mr-2 h-4 w-4" />
                            <span>My Bookings</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/settings" className="flex items-center cursor-pointer">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Link
                to="/signin"
                className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-300 hover:scale-105"
              >
                Sign In
              </Link>
            )}

            {!isAdmin && (
              <Link
                to="/book"
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full font-semibold hover:from-orange-600 hover:to-red-600 hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Book Now
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-orange-600 transition-colors duration-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-orange-100 bg-white/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block px-3 py-2 text-gray-700 hover:text-orange-600 font-medium transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              {user ? (
                <div className="px-3 py-2 border-t border-gray-100 mt-2">
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="flex items-center space-x-2 text-orange-600 font-semibold transition-colors duration-300 mb-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <LayoutDashboard size={16} />
                      <span>Admin Dashboard</span>
                      {adminStats.pendingBookings > 0 && (
                        <Badge className="ml-auto h-5 min-w-[20px] flex items-center justify-center p-0 px-1.5 text-xs bg-red-500 hover:bg-red-500">
                          {adminStats.pendingBookings}
                        </Badge>
                      )}
                    </Link>
                  )}
                  <p className="text-sm text-gray-600 mb-2">Signed in as: {user.email}</p>
                  {!isAdmin && (
                    <>
                      <Link
                        to="/profile"
                        className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 font-medium transition-colors duration-300 mb-2"
                        onClick={() => setIsOpen(false)}
                      >
                        <UserCircle size={16} />
                        <span>View Profile</span>
                      </Link>
                      <Link
                        to="/my-bookings"
                        className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 font-medium transition-colors duration-300 mb-2"
                        onClick={() => setIsOpen(false)}
                      >
                        <BookOpen size={16} />
                        <span>My Bookings</span>
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 font-medium transition-colors duration-300 mb-2"
                        onClick={() => setIsOpen(false)}
                      >
                        <Settings size={16} />
                        <span>Settings</span>
                      </Link>
                    </>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 font-medium transition-colors duration-300"
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/signin"
                  className="block px-3 py-2 text-gray-700 hover:text-orange-600 font-medium transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
              )}

              {!isAdmin && (
                <Link
                  to="/book"
                  className="block mx-3 mt-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full font-semibold text-center hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Book Now
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
