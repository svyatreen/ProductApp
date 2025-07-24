import { Heart, Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/cart-store";
import { useFavoritesStore } from "@/lib/favorites-store";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavoritesStore();
  const { toast } = useToast();

  const handleAddToCart = () => {
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

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite(product.id)) {
      await removeFromFavorites(product.id);
      toast({
        title: "Удалено из избранного",
        description: "Товар удален из избранного",
      });
    } else {
      await addToFavorites(product.id);
      toast({
        title: "Добавлено в избранное",
        description: "Товар добавлен в избранное",
      });
    }
  };

  const discountPercentage = product.originalPrice
    ? Math.round(((parseFloat(product.originalPrice) - parseFloat(product.price)) / parseFloat(product.originalPrice)) * 100)
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-all duration-300 group h-full flex flex-col">
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
            className="absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity p-0 hover:bg-white"
            onClick={handleToggleFavorite}
          >
            <Heart 
              className={`h-3 w-3 sm:h-4 sm:w-4 transition-colors ${
                isFavorite(product.id) 
                  ? 'text-red-500 fill-red-500' 
                  : 'text-gray-400 hover:text-red-500'
              }`} 
            />
          </Button>
        </div>
      </Link>
      
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        <p className="text-xs sm:text-sm text-gray-500 mb-2">Vendor Store</p>
        <Link href={`/products/${product.id}`} className="mb-3">
          <h4 className="font-semibold text-gray-900 line-clamp-2 text-sm sm:text-base leading-tight min-h-[40px] hover:text-blue-600 cursor-pointer transition-colors">{product.name}</h4>
        </Link>
        
        <div className="flex items-center mb-4">
          <div className="flex text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 sm:h-4 sm:w-4 ${
                  i < Math.floor(parseFloat(product.rating || "0")) ? "fill-current" : ""
                }`}
              />
            ))}
          </div>
          <span className="text-xs sm:text-sm text-gray-500 ml-2">({product.reviewCount})</span>
        </div>
        
        <div className="mt-auto">
          <div className="flex items-center space-x-1 sm:space-x-2 mb-3">
            <span className="text-base sm:text-lg font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xs sm:text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <Button onClick={handleAddToCart} size="sm" className="w-full text-xs px-3 py-2 sm:text-sm">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
