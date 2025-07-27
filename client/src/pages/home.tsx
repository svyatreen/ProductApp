import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import SmartVendorButton from "@/components/ui/smart-vendor-button";
import ProductCard from "@/components/product/product-card";
import CategoryGrid from "@/components/product/category-grid";
import VendorCard from "@/components/vendor/vendor-card";
import { useFavoritesStore } from "@/lib/favorites-store";
import type { Product, Vendor } from "@shared/schema";

export default function Home() {
  const { loadUserFavorites, userId } = useFavoritesStore();

  const { data: featuredProducts, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", { featured: "true" }],
  });

  const { data: featuredVendors, isLoading: vendorsLoading } = useQuery<Vendor[]>({
    queryKey: ["/api/vendors", { featured: "true" }],
  });

  // Load user favorites on component mount
  useEffect(() => {
    loadUserFavorites(userId);
  }, [loadUserFavorites, userId]);

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Discover Amazing Products from Trusted Vendors
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Join thousands of vendors and millions of customers in our thriving marketplace
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <Button className="bg-white text-primary hover:bg-gray-100">
                    Start Shopping
                  </Button>
                </Link>
                <SmartVendorButton className="bg-white text-primary hover:bg-gray-100">
                  Become a Vendor
                </SmartVendorButton>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Shopping bags and e-commerce products"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Shop by Category
          </h3>
          <CategoryGrid />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900">Featured Products</h3>
            <Link href="/products">
              <Button variant="ghost" className="text-primary hover:text-blue-700">
                View All →
              </Button>
            </Link>
          </div>

          {productsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm animate-pulse">
                  <div className="h-40 sm:h-48 bg-gray-200 rounded-t-xl"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {featuredProducts?.slice(0, 10)?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Vendor Spotlight */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Featured Vendors
          </h3>

          {vendorsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="text-center animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-xl mb-6"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredVendors?.map((vendor) => (
                <VendorCard key={vendor.id} vendor={vendor} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Online Business?
          </h3>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of successful vendors on MarketHub. Set up your store in minutes and start selling today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SmartVendorButton className="bg-white text-primary hover:bg-gray-100">
              Start Selling Now
            </SmartVendorButton>
            <Link href="/learn-more">
              <Button className="bg-white text-primary hover:bg-gray-100">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}