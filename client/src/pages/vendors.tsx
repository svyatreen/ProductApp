import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Store, ShoppingCart, Users } from "lucide-react";
import { Link } from "wouter";
import { scrollToTop } from "@/hooks/use-scroll-to-top";
import { useAuthStore } from "@/lib/auth-store";
import type { Vendor } from "@shared/schema";

export default function Vendors() {
  const { user } = useAuthStore();
  const { data: vendors, isLoading } = useQuery<Vendor[]>({
    queryKey: ["/api/vendors"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Загружаем поставщиков...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Наши поставщики
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Откройте для себя широкий выбор надежных поставщиков с качественными товарами
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Store className="h-5 w-5 text-indigo-600" />
            <span className="text-gray-700 dark:text-gray-300">
              {vendors?.length || 0} проверенных поставщиков
            </span>
          </div>
        </div>

        {/* Vendors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors?.map((vendor) => (
            <Card key={vendor.id} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2 flex items-center gap-2">
                      <Store className="h-5 w-5 text-indigo-600" />
                      {vendor.storeName}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {vendor.storeDescription}
                    </CardDescription>
                  </div>
                  {vendor.isApproved && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Проверен
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{vendor.rating}</span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">рейтинг</span>
                  </div>

                  {/* Sales */}
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      <span className="font-medium">{vendor.totalSales}</span> продаж
                    </span>
                  </div>

                  {/* Member Since */}
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      С нами с {vendor.createdAt ? new Date(vendor.createdAt).toLocaleDateString('ru-RU', { 
                        year: 'numeric', 
                        month: 'long' 
                      }) : 'давно'}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4">
                    <Button asChild className="flex-1" onClick={scrollToTop}>
                      <Link href={`/products?vendor=${vendor.id}`}>
                        Товары магазина
                      </Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        // Vendor profile functionality not implemented yet
                      }}
                      disabled
                    >
                      Профиль
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {vendors && vendors.length === 0 && (
          <div className="text-center py-12">
            <Store className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              Поставщики не найдены
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              В настоящее время нет доступных поставщиков
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16 py-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Хотите стать поставщиком?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
            Присоединяйтесь к нашей платформе и начните продавать свои товары тысячам покупателей
          </p>
          <Button asChild size="lg" onClick={scrollToTop}>
            <Link href={user ? "/vendor/register" : "/register"}>
              Стать поставщиком
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}