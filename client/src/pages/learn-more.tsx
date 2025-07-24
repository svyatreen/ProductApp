
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import SmartVendorButton from "@/components/ui/smart-vendor-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, ShoppingBag, Star, TrendingUp, Shield, Truck, CreditCard, HeadphonesIcon } from "lucide-react";

export default function LearnMore() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center mb-8">
            <Link href="/">
              <Button variant="ghost" className="text-white hover:text-gray-200 hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to MarketHub
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              The ultimate multi-vendor e-commerce platform connecting buyers and sellers worldwide
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/products">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Start Shopping
                </Button>
              </Link>
              <SmartVendorButton size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Become a Vendor
              </SmartVendorButton>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">10,000+</h3>
            <p className="text-gray-600">Active Vendors</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">1M+</h3>
            <p className="text-gray-600">Products Available</p>
          </div>
          <div className="text-center">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">4.8/5</h3>
            <p className="text-gray-600">Customer Rating</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">50M+</h3>
            <p className="text-gray-600">Orders Delivered</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose MarketHub?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide a seamless shopping experience with cutting-edge features and unmatched service quality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Secure Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Your transactions are protected with industry-leading encryption and security measures.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Truck className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Fast Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Get your orders delivered quickly with our network of reliable shipping partners.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <CreditCard className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Easy Returns</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Not satisfied? Return your purchase within 30 days with our hassle-free return policy.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <HeadphonesIcon className="h-6 w-6 text-yellow-600" />
                </div>
                <CardTitle>24/7 Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our customer support team is available round the clock to help you with any queries.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Verified Vendors</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  All our vendors go through a strict verification process to ensure quality and reliability.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle>Quality Products</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We maintain high quality standards and customer reviews help you make informed decisions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How MarketHub Works
            </h2>
            <p className="text-xl text-gray-600">
              Getting started is simple and straightforward
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Browse & Discover</h3>
              <p className="text-gray-600">
                Explore thousands of products from verified vendors across multiple categories.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Add to Cart & Checkout</h3>
              <p className="text-gray-600">
                Add your favorite items to cart and checkout securely with multiple payment options.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Receive & Enjoy</h3>
              <p className="text-gray-600">
                Get your orders delivered to your doorstep and enjoy your new purchases!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Vendor Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Selling?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of successful vendors on MarketHub and reach millions of customers worldwide
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div>
              <h3 className="text-2xl font-bold mb-2">Low Fees</h3>
              <p>Competitive commission rates to maximize your profits</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Global Reach</h3>
              <p>Access to customers from around the world</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Easy Setup</h3>
              <p>Get your store up and running in minutes</p>
            </div>
          </div>

          <SmartVendorButton size="lg" className="bg-white text-green-600 hover:bg-gray-100">
            Start Selling Today
          </SmartVendorButton>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "MarketHub has completely transformed my online shopping experience. The variety of products and fast delivery is amazing!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                    A
                  </div>
                  <div>
                    <p className="font-semibold">Anna Wilson</p>
                    <p className="text-sm text-gray-500">Verified Buyer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "As a vendor, MarketHub has helped me reach customers I never thought possible. The platform is easy to use and very effective."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                    M
                  </div>
                  <div>
                    <p className="font-semibold">Mike Chen</p>
                    <p className="text-sm text-gray-500">Vendor</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "The customer support is outstanding! They helped me resolve my issue within minutes. Highly recommended!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                    S
                  </div>
                  <div>
                    <p className="font-semibold">Sarah Johnson</p>
                    <p className="text-sm text-gray-500">Regular Customer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8">
            Join MarketHub today and discover a world of endless possibilities
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="bg-blue-600 text-white">
                Create Account
              </Button>
            </Link>
            <Link href="/products">
              <Button size="lg" className="bg-blue-600 text-white">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
