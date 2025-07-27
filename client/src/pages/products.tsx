import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import ProductCard from "@/components/product/product-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { useState, useEffect } from "react";
import type { Product, Category } from "@shared/schema";

export default function Products() {
  const [location, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Extract search params from URL
  const searchParams = new URLSearchParams(location.split('?')[1] || '');
  const currentSearch = searchParams.get('search') || '';
  const currentCategory = searchParams.get('category') || '';

  // Sync search input with URL on page load
  useEffect(() => {
    setSearchQuery(currentSearch);
  }, [currentSearch]);

  // Build query params for API request
  const queryParams = new URLSearchParams();
  if (currentSearch) queryParams.append('search', currentSearch);
  if (currentCategory) queryParams.append('category', currentCategory);
  
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", currentSearch, currentCategory],
    queryFn: async () => {
      const url = `/api/products${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return response.json();
    },
    staleTime: 0, // Always refetch to get latest products
    refetchOnWindowFocus: true, // Refetch when user returns to page
  });

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const params = new URLSearchParams();
      params.set('search', searchQuery.trim());
      if (currentCategory) {
        params.set('category', currentCategory);
      }
      navigate(`/products?${params.toString()}`);
    } else {
      // If search is empty, just apply category filter if exists
      if (currentCategory) {
        navigate(`/products?category=${currentCategory}`);
      } else {
        navigate('/products');
      }
    }
  };

  const handleCategoryFilter = (categoryId: number) => {
    const params = new URLSearchParams();
    params.set('category', categoryId.toString());
    if (currentSearch) {
      params.set('search', currentSearch);
    }
    navigate(`/products?${params.toString()}`);
  };

  const clearFilters = () => {
    setSearchQuery("");
    navigate("/products");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Products</h1>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 sm:h-auto"
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </div>
            <Button type="submit" className="sm:px-6">
              <span className="sm:hidden">Search</span>
              <span className="hidden sm:inline">Search Products</span>
            </Button>
          </form>

          {/* Category Filters */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={!currentCategory ? "default" : "outline"}
                onClick={() => navigate("/products")}
                size="sm"
              >
                All
              </Button>
              {categories?.map((category) => (
                <Button
                  key={category.id}
                  variant={currentCategory === category.id.toString() ? "default" : "outline"}
                  onClick={() => handleCategoryFilter(category.id)}
                  size="sm"
                  className="text-xs sm:text-sm"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Search/Filter Info */}
          {(currentSearch || currentCategory) && (
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-gray-600">
                {currentSearch && currentCategory && 
                  `Showing results for "${currentSearch}" in "${categories?.find(c => c.id.toString() === currentCategory)?.name}"`
                }
                {currentSearch && !currentCategory && `Showing results for "${currentSearch}"`}
                {currentCategory && !currentSearch && 
                  `Showing products in "${categories?.find(c => c.id.toString() === currentCategory)?.name}"`
                }
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearFilters}
                className="self-start sm:self-center"
              >
                <X className="w-4 h-4 mr-1" />
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm animate-pulse">
                <div className="h-40 sm:h-48 bg-gray-200 rounded-t-lg"></div>
                <div className="p-3 sm:p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-base sm:text-lg">No products found.</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your search or browse all categories</p>
            <Button
              variant="outline"
              onClick={() => navigate("/products")}
              className="mt-4"
            >
              View All Products
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
