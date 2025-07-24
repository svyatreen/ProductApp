import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Package, Truck, CheckCircle, Clock } from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import type { Order } from "@shared/schema";

export default function TrackOrders() {
  const { user } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: orders, isLoading } = useQuery<Order[]>({
    queryKey: ["/api/orders/user", user?.id],
    enabled: !!user?.id,
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "processing":
        return <Package className="w-4 h-4" />;
      case "shipped":
        return <Truck className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Ожидает обработки";
      case "processing":
        return "В обработке";
      case "shipped":
        return "Отправлен";
      case "completed":
        return "Доставлен";
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredOrders = orders?.filter(order =>
    order.id.toString().includes(searchTerm) ||
    order.shippingAddress.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Отслеживание заказов</h1>
          <p className="text-gray-600">Следите за статусом ваших заказов в режиме реального времени</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Поиск по номеру заказа или адресу доставки..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="grid gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredOrders.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm ? "Заказы не найдены" : "У вас пока нет заказов"}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm 
                  ? "Попробуйте изменить критерии поиска"
                  : "Когда вы совершите покупку, ваши заказы появятся здесь"
                }
              </p>
              {!searchTerm && (
                <Button onClick={() => window.location.href = "/products"}>
                  Начать покупки
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">Заказ #{order.id}</CardTitle>
                      <p className="text-gray-600 text-sm mt-1">
                        {new Date(order.createdAt!).toLocaleDateString('ru-RU', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <Badge className={getStatusColor(order.status!)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(order.status!)}
                        {getStatusText(order.status!)}
                      </div>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Адрес доставки</h4>
                      <p className="text-gray-600 text-sm">{order.shippingAddress}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Сумма заказа</h4>
                      <p className="text-lg font-semibold text-green-600">
                        {order.totalAmount} ₽
                      </p>
                    </div>
                  </div>
                  
                  {/* Order Timeline */}
                  <div className="mt-6 pt-6 border-t">
                    <div className="flex justify-between items-center">
                      <div className={`flex items-center gap-2 ${order.status === 'pending' || order.status === 'processing' || order.status === 'shipped' || order.status === 'completed' ? 'text-green-600' : 'text-gray-400'}`}>
                        <div className={`w-3 h-3 rounded-full ${order.status === 'pending' || order.status === 'processing' || order.status === 'shipped' || order.status === 'completed' ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                        <span className="text-sm font-medium">Заказ размещен</span>
                      </div>
                      <div className={`flex items-center gap-2 ${order.status === 'processing' || order.status === 'shipped' || order.status === 'completed' ? 'text-green-600' : 'text-gray-400'}`}>
                        <div className={`w-3 h-3 rounded-full ${order.status === 'processing' || order.status === 'shipped' || order.status === 'completed' ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                        <span className="text-sm font-medium">В обработке</span>
                      </div>
                      <div className={`flex items-center gap-2 ${order.status === 'shipped' || order.status === 'completed' ? 'text-green-600' : 'text-gray-400'}`}>
                        <div className={`w-3 h-3 rounded-full ${order.status === 'shipped' || order.status === 'completed' ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                        <span className="text-sm font-medium">Отправлен</span>
                      </div>
                      <div className={`flex items-center gap-2 ${order.status === 'completed' ? 'text-green-600' : 'text-gray-400'}`}>
                        <div className={`w-3 h-3 rounded-full ${order.status === 'completed' ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                        <span className="text-sm font-medium">Доставлен</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}