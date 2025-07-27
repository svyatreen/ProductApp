import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, ShoppingCart, Menu, User, LogOut, X, Heart } from "lucide-react";
import { scrollToTop } from "@/hooks/use-scroll-to-top";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/lib/cart-store";
import { useAuthStore } from "@/lib/auth-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location, navigate] = useLocation();
  const { toggleCart, getTotalItems } = useCartStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  const totalItems = getTotalItems();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0" onClick={scrollToTop}>
              <h1 className="text-xl sm:text-2xl font-bold text-primary">MarketHub</h1>
            </Link>
          </div>

          {/* Spacer for layout */}
          <div className="flex-1"></div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/products" className="text-gray-700 hover:text-primary transition-colors" onClick={scrollToTop}>
              Categories
            </Link>
            <Link href="/vendors" className="text-gray-700 hover:text-primary transition-colors" onClick={scrollToTop}>
              Vendors
            </Link>
            <Link href="/deals" className="text-gray-700 hover:text-primary transition-colors" onClick={scrollToTop}>
              Deals
            </Link>
            
            {/* Favorites Icon */}
            <Link href="/favorites" onClick={scrollToTop}>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-700 hover:text-primary transition-colors p-2"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
            
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleCart}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </div>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span className="hidden lg:inline text-sm">{user?.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="px-2 py-1.5 text-sm text-gray-500">
                    Signed in as
                  </div>
                  <div className="px-2 py-1 text-sm font-medium">
                    {user?.email}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/vendor/dashboard" onClick={scrollToTop}>Vendor Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login" onClick={scrollToTop}>
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register" onClick={scrollToTop}>
                  <Button variant="outline" size="sm">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Navigation */}
          <div className="flex items-center space-x-2 md:hidden">
            {/* Mobile Favorites Button */}
            <Link href="/favorites" onClick={scrollToTop}>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-700"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
            
            {/* Mobile Cart Button */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleCart}
                className="text-gray-700"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                
                <div className="mt-6 space-y-6">
                  {/* Mobile Search */}
                  <form onSubmit={handleSearch} className="relative">
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2"
                    />
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  </form>

                  {/* Mobile Navigation Links */}
                  <nav className="space-y-4">
                    <Link 
                      href="/products" 
                      className="block text-lg font-medium text-gray-900 hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      All Products
                    </Link>
                    <Link 
                      href="/products" 
                      className="block text-lg font-medium text-gray-900 hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Categories
                    </Link>
                    <Link 
                      href="/vendor/register" 
                      className="block text-lg font-medium text-gray-900 hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Become a Vendor
                    </Link>
                    <Link 
                      href="/products" 
                      className="block text-lg font-medium text-gray-900 hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Deals
                    </Link>
                    <Link 
                      href="/favorites" 
                      className="block text-lg font-medium text-gray-900 hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      My Favorites
                    </Link>
                  </nav>

                  {/* Mobile User Section */}
                  <div className="border-t pt-6">
                    {isAuthenticated ? (
                      <div className="space-y-4">
                        <div className="text-sm text-gray-500">Signed in as</div>
                        <div className="text-base font-medium">{user?.email}</div>
                        <Link 
                          href="/vendor/dashboard"
                          className="block text-base text-gray-900 hover:text-primary transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Vendor Dashboard
                        </Link>
                        <Button
                          variant="outline"
                          onClick={() => {
                            logout();
                            setMobileMenuOpen(false);
                          }}
                          className="w-full text-red-600 border-red-600 hover:bg-red-50"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Link 
                          href="/login"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Button variant="outline" className="w-full">
                            Sign In
                          </Button>
                        </Link>
                        <Link 
                          href="/register"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Button className="w-full">
                            Register
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
