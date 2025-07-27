import { useEffect } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, ShoppingCart, ArrowLeft } from "lucide-react";
import { useFavoritesStore } from "@/lib/favorites-store";
import { useCartStore } from "@/lib/cart-store";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";

export default function Favorites() {
  const { favorites, loadUserFavorites, removeFromFavorites, userId } = useFavoritesStore();
  const { addItem } = useCartStore();
  const { toast } = useToast();

  useEffect(() => {
    loadUserFavorites(userId);
  }, [loadUserFavorites, userId]);

  // Get product details for favorite items
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
    enabled: favorites.size > 0,
  });

  const favoriteProducts = products?.filter(product => 
    favorites.has(product.id)
  ) || [];

  const handleAddToCart = (product: Product) => {
    addItem({
      productId: product.id,
      name: product.name,
      price: parseFloat(product.price),
      imageUrl: product.imageUrl || undefined,
      quantity: 1,
      vendorId: product.vendorId,
    });
    toast({
      title: "Добавлено в корзину",
      description: `${product.name} добавлен в корзину`,
    });
  };

  const handleRemoveFromFavorites = (productId: number) => {
    removeFromFavorites(productId);
    toast({
      title: "Удалено из избранного",
      description: "Товар удален из избранного",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Favorites</h1>
            <p className="text-gray-600">
              {favoriteProducts.length} item{favoriteProducts.length !== 1 ? 's' : ''} in your wishlist
            </p>
          </div>
        </div>

        {/* Empty State */}
        {favoriteProducts.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">No favorites yet</h2>
            <p className="text-gray-600 mb-8">
              Start browsing and add products to your wishlist
            </p>
            <Link href="/">
              <Button>
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          /* Favorites Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteProducts.map((product) => {
              const discountPercentage = product.originalPrice
                ? Math.round(((parseFloat(product.originalPrice) - parseFloat(product.price)) / parseFloat(product.originalPrice)) * 100)
                : 0;

              return (
                <div key={product.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-all duration-300 group h-full flex flex-col">
                  <Link href={`/products/${product.id}`}>
                    <div className="relative overflow-hidden rounded-t-lg cursor-pointer">
                      <img
                        src={product.imageUrl || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"}
                        alt={product.name}
                        className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {discountPercentage > 0 && (
                        <div className="absolute top-2 left-2">
                          <Badge variant="secondary" className="bg-red-500 text-white text-xs px-2 py-1">
                            -{discountPercentage}%
                          </Badge>
                        </div>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full p-0 hover:bg-white"
                        onClick={(e) => {
                          e.preventDefault();
                          handleRemoveFromFavorites(product.id);
                        }}
                      >
                        <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                      </Button>
                    </div>
                  </Link>
                  
                  <div className="p-4 sm:p-5 flex flex-col flex-grow">
                    <p className="text-xs sm:text-sm text-gray-500 mb-2">Vendor Store</p>
                    <Link href={`/products/${product.id}`} className="mb-3">
                      <h4 className="font-semibold text-gray-900 line-clamp-2 text-sm sm:text-base leading-tight min-h-[40px] hover:text-blue-600 cursor-pointer transition-colors">
                        {product.name}
                      </h4>
                    </Link>
                    
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 sm:w-4 sm:h-4 ${
                              i < Math.floor(parseFloat(product.rating || '0'))
                                ? "fill-current"
                                : "fill-gray-200 text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs sm:text-sm text-gray-500 ml-2">
                        ({product.reviewCount || 0})
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4 mt-auto">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg sm:text-xl font-bold text-gray-900">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-green-600">Free shipping</p>
                    </div>
                    
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="w-full text-sm"
                      size="sm"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}