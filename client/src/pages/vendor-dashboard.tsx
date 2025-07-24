import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Package, ShoppingBag, Star, Settings, BarChart, Mail, Users, Phone, MapPin, TrendingUp, DollarSign, AlertTriangle, Calendar, Eye, MessageSquare, Clock } from "lucide-react";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useAuthStore } from "@/lib/auth-store";
import type { Product, Order, Vendor, User, Message, Supplier } from "@shared/schema";

export default function VendorDashboard() {
  const { user, isAuthenticated } = useAuthStore();
  const [, navigate] = useLocation();
  const [isAddSupplierOpen, setIsAddSupplierOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [supplierForm, setSupplierForm] = useState({
    name: '',
    contact: '',
    email: '',
    phone: '',
    address: '',
    products: ''
  });
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    stock: '',
    imageUrl: '',
    categoryId: ''
  });
  const { toast } = useToast();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Get vendor data for current user
  const { data: vendor } = useQuery<Vendor>({
    queryKey: ["/api/vendors/by-user", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const response = await fetch(`/api/vendors/by-user/${user?.id}`);
      if (!response.ok) throw new Error('Failed to fetch vendor data');
      return response.json();
    }
  });

  // Get categories for product form
  const { data: categories } = useQuery<Array<{id: number, name: string}>>({
    queryKey: ["/api/categories"],
  });

  // Suppliers from database
  const { data: suppliers, isLoading: suppliersLoading, refetch: refetchSuppliers } = useQuery<Supplier[]>({
    queryKey: ["/api/suppliers/vendor", vendor?.id],
    enabled: !!vendor?.id,
  });

  const { data: products, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", { vendor: vendor?.id }],
    enabled: !!vendor?.id,
  });

  const { data: orders, isLoading: ordersLoading } = useQuery<Order[]>({
    queryKey: ["/api/orders/vendor", vendor?.id],
    enabled: !!vendor?.id,
  });

  const { data: messages, isLoading: messagesLoading } = useQuery<Message[]>({
    queryKey: ["/api/messages/vendor", vendor?.id],
    enabled: !!vendor?.id,
  });

  // Early return check after all hooks
  if (!isAuthenticated || !user) {
    return null; // Will redirect in useEffect
  }

  // Mock sales data for chart
  const salesData = [
    { name: 'Пн', sales: 2400 },
    { name: 'Вт', sales: 1398 },
    { name: 'Ср', sales: 9800 },
    { name: 'Чт', sales: 3908 },
    { name: 'Пт', sales: 4800 },
    { name: 'Сб', sales: 3800 },
    { name: 'Вс', sales: 4300 },
  ];

  const stats = {
    activeProducts: products?.filter(p => p.isActive)?.length || 0,
    totalProducts: products?.length || 0,
    todayOrders: orders?.filter(o => {
      const today = new Date().toDateString();
      return new Date(o.createdAt!).toDateString() === today;
    }).length || 0,
    totalSales: vendor?.totalSales || 0,
    monthSales: Math.floor((vendor?.totalSales || 0) * 0.2), // Approximate monthly sales
    pendingReviews: products?.reduce((acc, p) => acc + (p.reviewCount || 0), 0) || 0,
    activeSuppliers: suppliers?.filter(s => s.status === 'active').length || 0,
    totalSuppliers: suppliers?.length || 0,
  };

  // Add supplier mutation
  const addSupplierMutation = useMutation({
    mutationFn: async (data: any) => {
      if (!vendor?.id) throw new Error('Vendor not found');
      
      const supplierData = {
        vendorId: vendor.id,
        name: data.name,
        contact: data.contact,
        email: data.email,
        phone: data.phone || '',
        address: data.address || '',
        products: data.products || '',
        status: 'active'
      };

      const response = await fetch('/api/suppliers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(supplierData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to add supplier');
      }

      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Поставщик добавлен",
        description: `${supplierForm.name} успешно добавлен в список поставщиков`,
      });

      // Reset form
      setSupplierForm({
        name: '',
        contact: '',
        email: '',
        phone: '',
        address: '',
        products: ''
      });
      setIsAddSupplierOpen(false);

      // Refetch suppliers
      refetchSuppliers();
    },
    onError: (error: any) => {
      toast({
        title: "Ошибка",
        description: error.message || "Не удалось добавить поставщика",
        variant: "destructive"
      });
    }
  });

  const handleAddSupplier = () => {
    // Validate form
    if (!supplierForm.name || !supplierForm.contact || !supplierForm.email) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все обязательные поля",
        variant: "destructive"
      });
      return;
    }

    addSupplierMutation.mutate(supplierForm);
  };

  // Add product mutation
  const addProductMutation = useMutation({
    mutationFn: async (data: any) => {
      if (!vendor?.id) throw new Error('Vendor not found');
      
      const productData = {
        vendorId: vendor.id,
        name: data.name,
        description: data.description || null,
        price: data.price,
        originalPrice: data.originalPrice || null,
        stock: data.stock ? parseInt(data.stock) : 0,
        imageUrl: data.imageUrl || null,
        categoryId: parseInt(data.categoryId),
        isActive: true
      };

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add product');
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Ваш товар добавлен",
        description: "Товар успешно добавлен и теперь доступен в магазине",
      });
      // Invalidate all products queries to refresh the products page
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      // Also invalidate vendor-specific products
      queryClient.invalidateQueries({ queryKey: ["/api/products", { vendor: vendor?.id }] });
      setProductForm({
        name: '',
        description: '',
        price: '',
        originalPrice: '',
        stock: '',
        imageUrl: '',
        categoryId: ''
      });
      setIsAddProductOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: "Ошибка",
        description: error.message || "Не удалось добавить товар",
        variant: "destructive"
      });
    }
  });

  const handleAddProduct = () => {
    if (!vendor?.id) {
      toast({
        title: "Ошибка",
        description: "Данные поставщика не найдены",
        variant: "destructive"
      });
      return;
    }

    if (!productForm.name || !productForm.price || !productForm.categoryId) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все обязательные поля",
        variant: "destructive"
      });
      return;
    }

    // Validate price is a valid number
    if (isNaN(parseFloat(productForm.price)) || parseFloat(productForm.price) <= 0) {
      toast({
        title: "Ошибка",
        description: "Цена должна быть положительным числом",
        variant: "destructive"
      });
      return;
    }

    // Validate originalPrice if provided
    if (productForm.originalPrice && (isNaN(parseFloat(productForm.originalPrice)) || parseFloat(productForm.originalPrice) <= 0)) {
      toast({
        title: "Ошибка", 
        description: "Старая цена должна быть положительным числом",
        variant: "destructive"
      });
      return;
    }

    // Validate stock if provided
    if (productForm.stock && (isNaN(parseInt(productForm.stock)) || parseInt(productForm.stock) < 0)) {
      toast({
        title: "Ошибка",
        description: "Количество должно быть неотрицательным числом",
        variant: "destructive"
      });
      return;
    }

    addProductMutation.mutate(productForm);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="bg-gray-900 text-white p-6 rounded-2xl mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{vendor?.storeName || 'Vendor'} Dashboard</h1>
              <p className="text-gray-300">Welcome back, {user?.name || user?.email}!</p>
            </div>
            <div className="flex items-center space-x-8">
              <div className="text-right">
                <p className="text-sm text-gray-300">Total Sales</p>
                <p className="text-2xl font-bold">${stats.totalSales.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-300">This Month</p>
                <p className="text-2xl font-bold text-accent">${stats.monthSales.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-600">Active Products</p>
                      <p className="text-2xl font-bold text-blue-900">{stats.activeProducts}</p>
                    </div>
                    <Package className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600">Orders Today</p>
                      <p className="text-2xl font-bold text-green-900">{stats.todayOrders}</p>
                    </div>
                    <ShoppingBag className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-yellow-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-yellow-600">Pending Reviews</p>
                      <p className="text-2xl font-bold text-yellow-900">{stats.pendingReviews}</p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5" />
                    Последние заказы
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Все заказы
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {ordersLoading ? (
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-12 bg-gray-200 rounded animate-pulse" />
                    ))}
                  </div>
                ) : orders && orders.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID заказа</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead>Сумма</TableHead>
                        <TableHead>Дата</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.slice(0, 5).map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">#{order.id}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(order.status || "pending")}>
                              {order.status === 'completed' ? 'Завершен' : 
                               order.status === 'processing' ? 'Обработка' :
                               order.status === 'shipped' ? 'Отправлен' : 'В ожидании'}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-semibold">${order.totalAmount}</TableCell>
                          <TableCell className="text-gray-600">
                            {new Date(order.createdAt!).toLocaleDateString('ru-RU')}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Нет недавних заказов</p>
                    <p className="text-sm">Заказы будут отображаться здесь</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Messages Section */}
            <Card className="mt-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Сообщения
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Все сообщения
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {messagesLoading ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-20 bg-gray-200 rounded animate-pulse" />
                    ))}
                  </div>
                ) : messages && messages.length > 0 ? (
                  <div className="space-y-4">
                    {messages.slice(0, 5).map((message) => (
                      <div 
                        key={message.id} 
                        className={`p-4 rounded-lg border ${
                          message.isRead 
                            ? 'border-gray-200 bg-gray-50' 
                            : 'border-blue-200 bg-blue-50'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-medium">{message.senderName}</span>
                              <span className="text-sm text-gray-500">({message.senderEmail})</span>
                              {!message.isRead && (
                                <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                                  Новое
                                </Badge>
                              )}
                            </div>
                            <p className="font-medium text-gray-900 mb-2">{message.subject}</p>
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{message.message}</p>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Clock className="h-3 w-3" />
                              {new Date(message.createdAt!).toLocaleString('ru-RU', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </div>
                          </div>
                          <MessageSquare className="h-5 w-5 text-gray-400 flex-shrink-0 ml-3" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Новых сообщений нет</p>
                    <p className="text-sm">Сообщения клиентов будут отображаться здесь</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full justify-start">
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Добавить новый товар</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="product-name">Название товара *</Label>
                        <Input
                          id="product-name"
                          value={productForm.name}
                          onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                          placeholder="Введите название товара"
                        />
                      </div>
                      <div>
                        <Label htmlFor="product-category">Категория *</Label>
                        <select
                          id="product-category"
                          value={productForm.categoryId}
                          onChange={(e) => setProductForm({...productForm, categoryId: e.target.value})}
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="">Выберите категорию</option>
                          {categories?.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="product-price">Цена *</Label>
                        <Input
                          id="product-price"
                          type="number"
                          step="0.01"
                          value={productForm.price}
                          onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        <Label htmlFor="product-original-price">Старая цена</Label>
                        <Input
                          id="product-original-price"
                          type="number"
                          step="0.01"
                          value={productForm.originalPrice}
                          onChange={(e) => setProductForm({...productForm, originalPrice: e.target.value})}
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        <Label htmlFor="product-stock">Количество</Label>
                        <Input
                          id="product-stock"
                          type="number"
                          value={productForm.stock}
                          onChange={(e) => setProductForm({...productForm, stock: e.target.value})}
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="product-image">URL изображения</Label>
                        <Input
                          id="product-image"
                          value={productForm.imageUrl}
                          onChange={(e) => setProductForm({...productForm, imageUrl: e.target.value})}
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="product-description">Описание</Label>
                        <Textarea
                          id="product-description"
                          value={productForm.description}
                          onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                          placeholder="Описание товара"
                          rows={3}
                        />
                      </div>
                      <div className="md:col-span-2 flex gap-2 pt-4">
                        <Button 
                          onClick={handleAddProduct} 
                          className="flex-1"
                          disabled={addProductMutation.isPending}
                        >
                          {addProductMutation.isPending ? "Добавление..." : "Добавить товар"}
                        </Button>
                        <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
                          Отмена
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Dialog open={isAddSupplierOpen} onOpenChange={setIsAddSupplierOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="mr-2 h-4 w-4" />
                      Add Supplier
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Добавить поставщика</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="supplier-name">Название компании *</Label>
                        <Input
                          id="supplier-name"
                          value={supplierForm.name}
                          onChange={(e) => setSupplierForm({...supplierForm, name: e.target.value})}
                          placeholder="Введите название компании"
                        />
                      </div>
                      <div>
                        <Label htmlFor="supplier-contact">Контактное лицо *</Label>
                        <Input
                          id="supplier-contact"
                          value={supplierForm.contact}
                          onChange={(e) => setSupplierForm({...supplierForm, contact: e.target.value})}
                          placeholder="Имя контактного лица"
                        />
                      </div>
                      <div>
                        <Label htmlFor="supplier-email">Email *</Label>
                        <Input
                          id="supplier-email"
                          type="email"
                          value={supplierForm.email}
                          onChange={(e) => setSupplierForm({...supplierForm, email: e.target.value})}
                          placeholder="email@example.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="supplier-phone">Телефон</Label>
                        <Input
                          id="supplier-phone"
                          value={supplierForm.phone}
                          onChange={(e) => setSupplierForm({...supplierForm, phone: e.target.value})}
                          placeholder="+7 (xxx) xxx-xx-xx"
                        />
                      </div>
                      <div>
                        <Label htmlFor="supplier-address">Адрес</Label>
                        <Textarea
                          id="supplier-address"
                          value={supplierForm.address}
                          onChange={(e) => setSupplierForm({...supplierForm, address: e.target.value})}
                          placeholder="Адрес поставщика"
                          rows={2}
                        />
                      </div>
                      <div>
                        <Label htmlFor="supplier-products">Товары</Label>
                        <Textarea
                          id="supplier-products"
                          value={supplierForm.products}
                          onChange={(e) => setSupplierForm({...supplierForm, products: e.target.value})}
                          placeholder="Описание поставляемых товаров"
                          rows={2}
                        />
                      </div>
                      <div className="flex gap-2 pt-4">
                        <Button onClick={handleAddSupplier} className="flex-1">
                          Добавить
                        </Button>
                        <Button variant="outline" onClick={() => setIsAddSupplierOpen(false)}>
                          Отмена
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/products')}>
                  <BarChart className="mr-2 h-4 w-4" />
                  View All Products
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Store Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="mr-2 h-4 w-4" />
                  Messages ({messages?.filter(m => !m.isRead).length || 0})
                </Button>
              </CardContent>
            </Card>

            {/* Sales Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Продажи за неделю
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`$${value}`, 'Продажи']}
                        labelStyle={{ color: '#000' }}
                      />
                      <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Suppliers Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Поставщики</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Активные</span>
                    <span className="font-semibold">{stats.activeSuppliers}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Всего</span>
                    <span className="font-semibold">{stats.totalSuppliers}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Suppliers Management Section */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Управление поставщиками</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Компания</TableHead>
                    <TableHead>Контакт</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Телефон</TableHead>
                    <TableHead>Товары</TableHead>
                    <TableHead>Статус</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {suppliersLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        Загрузка поставщиков...
                      </TableCell>
                    </TableRow>
                  ) : suppliers?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        Поставщики не найдены. Добавьте первого поставщика.
                      </TableCell>
                    </TableRow>
                  ) : (
                    suppliers?.map((supplier) => (
                      <TableRow key={supplier.id}>
                        <TableCell className="font-medium">{supplier.name}</TableCell>
                        <TableCell>{supplier.contact}</TableCell>
                        <TableCell>{supplier.email}</TableCell>
                        <TableCell>{supplier.phone || '-'}</TableCell>
                        <TableCell className="max-w-xs truncate">{supplier.products || '-'}</TableCell>
                        <TableCell>
                          <Badge className={supplier.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                            {supplier.status === 'active' ? 'Активен' : 'Неактивен'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
