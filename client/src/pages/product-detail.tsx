import { useState } from "react";
import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Heart, Truck, Shield, ArrowLeft, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { useFavoritesStore } from "@/lib/favorites-store";
import type { Product } from "@shared/schema";

export default function ProductDetail() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavoritesStore();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ['/api/products', id],
    queryFn: async () => {
      const response = await fetch(`/api/products/${id}`);
      if (!response.ok) {
        throw new Error('Product not found');
      }
      return response.json();
    },
    enabled: !!id,
  });

  const { data: vendor } = useQuery<{ id: number; storeName: string; storeDescription: string }>({
    queryKey: ['/api/vendors', product?.vendorId],
    queryFn: async () => {
      const response = await fetch(`/api/vendors/${product?.vendorId}`);
      if (!response.ok) {
        throw new Error('Vendor not found');
      }
      return response.json();
    },
    enabled: !!product?.vendorId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <Link href="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const discountPercentage = product.originalPrice
    ? Math.round(((parseFloat(product.originalPrice) - parseFloat(product.price)) / parseFloat(product.originalPrice)) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: parseFloat(product.price),
      imageUrl: product.imageUrl || undefined,
      quantity,
      vendorId: product.vendorId,
    });
  };

  const handleToggleFavorite = () => {
    if (!product) return;
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product.id);
    }
  };

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/products">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
        </Link>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={product.imageUrl || `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800&seed=${product.id}`}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square overflow-hidden rounded-md bg-gray-100">
                    <img
                      src={product.imageUrl || `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&seed=${product.id}&blur=${i}`}
                      alt={`${product.name} view ${i}`}
                      className="w-full h-full object-cover cursor-pointer hover:opacity-75 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-500 mb-2">{vendor?.storeName || 'Vendor Store'}</p>
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                
                <div className="flex items-center mt-4 space-x-4">
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(parseFloat(product.rating || "0")) ? "fill-current" : ""
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">
                      {product.rating} ({product.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-xl text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                      <Badge variant="secondary" className="bg-red-500 text-white">
                        -{discountPercentage}% OFF
                      </Badge>
                    </>
                  )}
                </div>
                <p className="text-sm text-green-600">Free shipping on orders over $50</p>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description || `${product.name} - высококачественный продукт с отличными характеристиками. Идеально подходит для повседневного использования и отвечает самым высоким стандартам качества.`}
                </p>
              </div>

              <Separator />

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium">Quantity:</label>
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-4 py-2 text-center min-w-[60px]">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuantityChange(1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={handleAddToCart} className="flex-1">
                    Add to Cart - ${(parseFloat(product.price) * quantity).toFixed(2)}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleToggleFavorite}
                    className={isFavorite(product.id) ? 'text-red-500 border-red-500' : ''}
                  >
                    <Heart 
                      className={`h-4 w-4 ${
                        isFavorite(product.id) ? 'fill-red-500' : ''
                      }`} 
                    />
                  </Button>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center space-x-2">
                  <Truck className="h-5 w-5 text-blue-500" />
                  <span className="text-sm">Fast Delivery</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Secure Payment</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Tabs */}
          <div className="border-t">
            <Tabs defaultValue="details" className="p-6 lg:p-8">
              <TabsList>
                <TabsTrigger value="details">Product Details</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Product Details</h3>
                    <div className="prose max-w-none">
                      <p>
                        {product.description || `${product.name} - это высококачественный продукт, который сочетает в себе функциональность и стиль. Изготовлен с вниманием к деталям и рассчитан на долгосрочное использование.`}
                      </p>
                      <h4>Основные характеристики:</h4>
                      <ul>
                        <li>Высококачественные материалы</li>
                        <li>Современные технологии</li>
                        <li>Эргономичный дизайн</li>
                        <li>Надежное качество сборки</li>
                        <li>Простота в использовании</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="specifications" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Technical Specifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">General</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Бренд:</span>
                            <span>{vendor?.storeName || 'Premium'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Модель:</span>
                            <span>{product.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Артикул:</span>
                            <span>SKU-{product.id?.toString().padStart(6, '0')}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Dimensions</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Вес:</span>
                            <span>{((product.id || 1) % 5 + 0.5).toFixed(1)} кг</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Размеры:</span>
                            <span>{(product.id || 1) % 20 + 10} x {(product.id || 1) % 15 + 8} x {(product.id || 1) % 8 + 2} см</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Цвет:</span>
                            <span>Различные варианты</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold">Customer Reviews</h3>
                      <div className="flex items-center space-x-2">
                        <div className="flex text-yellow-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {product.rating} out of 5 ({product.reviewCount} reviews)
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        {
                          name: "Алексей И.",
                          rating: Math.floor(parseFloat(product.rating || "5")),
                          date: "2 дня назад",
                          comment: `Отличное качество ${product.name}. Быстрая доставка, товар полностью соответствует описанию!`,
                        },
                        {
                          name: "Мария К.",
                          rating: Math.max(3, Math.floor(parseFloat(product.rating || "4"))),
                          date: "1 неделю назад",
                          comment: `Очень довольна покупкой ${product.name}. Рекомендую всем!`,
                        },
                        {
                          name: "Дмитрий С.",
                          rating: Math.floor(parseFloat(product.rating || "5")),
                          date: "2 недели назад",
                          comment: `Превосходное качество сборки. ${product.name} стоит своих денег.`,
                        },
                      ].map((review, index) => (
                        <div key={index} className="border-b pb-4 last:border-b-0">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{review.name}</h4>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <div className="flex items-center mb-2">
                            <div className="flex text-yellow-400">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? "fill-current" : ""
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="shipping" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Shipping & Returns</h3>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-2">Shipping Information</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          <li>• Free standard shipping on orders over $50</li>
                          <li>• Express shipping available for $9.99</li>
                          <li>• Standard delivery: 3-5 business days</li>
                          <li>• Express delivery: 1-2 business days</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Return Policy</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          <li>• 30-day return window</li>
                          <li>• Free returns for defective items</li>
                          <li>• Original packaging required</li>
                          <li>• Refund processed within 5-7 business days</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}