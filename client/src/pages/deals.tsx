import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Clock, Percent, ShoppingCart, Tag, Star } from "lucide-react";
import { Link } from "wouter";
import { useCartStore } from "@/lib/cart-store";
import { useFavoritesStore } from "@/lib/favorites-store";
import { useToast } from "@/hooks/use-toast";
import { scrollToTop } from "@/hooks/use-scroll-to-top";
import type { Product } from "@shared/schema";

export default function Deals() {
  const [email, setEmail] = useState("");
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });
  
  const { addItem } = useCartStore();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavoritesStore();
  const { toast } = useToast();

  // Filter products that have discounts (originalPrice > price)
  const dealsProducts = products?.filter(product => 
    product.originalPrice && parseFloat(product.originalPrice) > parseFloat(product.price)
  ) || [];

  // Sort by discount percentage (highest first)
  const sortedDeals = dealsProducts.sort((a, b) => {
    const discountA = a.originalPrice ? 
      ((parseFloat(a.originalPrice) - parseFloat(a.price)) / parseFloat(a.originalPrice)) * 100 : 0;
    const discountB = b.originalPrice ? 
      ((parseFloat(b.originalPrice) - parseFloat(b.price)) / parseFloat(b.originalPrice)) * 100 : 0;
    return discountB - discountA;
  });

  const calculateDiscount = (price: string, originalPrice?: string) => {
    if (!originalPrice) return 0;
    return Math.round(((parseFloat(originalPrice) - parseFloat(price)) / parseFloat(originalPrice)) * 100);
  };

  const handleAddToCart = (product: Product) => {
    addItem({
      productId: product.id,
      name: product.name,
      price: parseFloat(product.price),
      imageUrl: product.imageUrl || "",
      quantity: 1,
      vendorId: product.vendorId,
    });
    toast({
      title: "Добавлено в корзину",
      description: `${product.name} добавлен в корзину`,
    });
  };

  const handleToggleFavorite = async (productId: number) => {
    const isCurrentlyFavorite = isFavorite(productId);
    if (isCurrentlyFavorite) {
      await removeFromFavorites(productId);
      toast({
        title: "Удалено из избранного",
        description: "Товар удален из избранного",
      });
    } else {
      await addToFavorites(productId);
      toast({
        title: "Добавлено в избранное",
        description: "Товар добавлен в избранное",
      });
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите email адрес",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Спасибо за подписку!",
      description: "Вы будете получать уведомления о лучших предложениях",
    });
    setEmail("");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Загружаем скидки...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Tag className="h-8 w-8 text-red-600" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Лучшие скидки
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Не упустите возможность купить качественные товары по выгодным ценам
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Percent className="h-5 w-5 text-red-600" />
            <span className="text-gray-700 dark:text-gray-300">
              {sortedDeals.length} товаров со скидкой
            </span>
          </div>
        </div>

        {/* Flash Sale Banner */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">🔥 Молниеносная распродажа</h2>
              <p className="text-red-100">Ограниченное время! Скидки до 70%</p>
            </div>
            <div className="flex items-center gap-2 text-right">
              <Clock className="h-6 w-6" />
              <div>
                <div className="text-2xl font-bold">23:59:45</div>
                <div className="text-sm text-red-100">осталось</div>
              </div>
            </div>
          </div>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedDeals.map((product) => {
            const discount = calculateDiscount(product.price, product.originalPrice);
            return (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
                {/* Discount Badge */}
                <div className="absolute top-2 left-2 z-10">
                  <Badge variant="destructive" className="bg-red-600 text-white font-bold">
                    -{discount}%
                  </Badge>
                </div>

                {/* Heart Icon for Favorites */}
                <button
                  onClick={() => handleToggleFavorite(product.id)}
                  className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                >
                  <Heart
                    className={`h-4 w-4 ${
                      isFavorite(product.id) 
                        ? "fill-red-500 text-red-500" 
                        : "text-gray-400"
                    }`}
                  />
                </button>

                {/* Product Image */}
                <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingCart className="h-16 w-16 text-gray-300" />
                    </div>
                  )}
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="text-lg line-clamp-2 group-hover:text-red-600 transition-colors">
                    {product.name}
                  </CardTitle>
                  {product.description && (
                    <CardDescription className="line-clamp-2">
                      {product.description}
                    </CardDescription>
                  )}
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Pricing */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-red-600">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-green-600 font-medium">
                      Экономия: ${product.originalPrice ? 
                        (parseFloat(product.originalPrice) - parseFloat(product.price)).toFixed(2) : 
                        '0.00'
                      }
                    </div>
                  </div>

                  {/* Rating */}
                  {product.rating && (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{product.rating}</span>
                      </div>
                      {product.reviewCount && (
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          ({product.reviewCount} отзывов)
                        </span>
                      )}
                    </div>
                  )}

                  {/* Stock Status */}
                  <div className="flex items-center justify-between text-sm">
                    <span className={`${(product.stock || 0) > 10 ? 'text-green-600' : 'text-red-600'} font-medium`}>
                      {(product.stock || 0) > 0 ? `${product.stock} в наличии` : 'Нет в наличии'}
                    </span>
                    {(product.stock || 0) <= 10 && (product.stock || 0) > 0 && (
                      <span className="text-red-600 font-medium animate-pulse">
                        Торопитесь!
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button 
                      onClick={() => handleAddToCart(product)}
                      disabled={(product.stock || 0) === 0}
                      className="flex-1 bg-red-600 hover:bg-red-700"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      В корзину
                    </Button>
                    <Button variant="outline" asChild onClick={scrollToTop}>
                      <Link href={`/products/${product.id}`}>
                        Подробнее
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {sortedDeals.length === 0 && (
          <div className="text-center py-12">
            <Tag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              Скидки не найдены
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              В настоящее время нет товаров со скидкой, но следите за обновлениями!
            </p>
            <Button asChild onClick={scrollToTop}>
              <Link href="/products">
                Посмотреть все товары
              </Link>
            </Button>
          </div>
        )}

        {/* Newsletter Subscription */}
        <div className="text-center mt-16 py-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Не пропустите лучшие предложения!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
            Подпишитесь на нашу рассылку и первыми узнавайте о новых скидках и акциях
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex max-w-md mx-auto gap-2">
            <Input
              type="email"
              placeholder="Ваш email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" className="bg-red-600 hover:bg-red-700">
              Подписаться
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}