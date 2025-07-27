import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Users, 
  Star, 
  Award,
  ChevronRight,
  Quote,
  BarChart3,
  Globe,
  Zap
} from "lucide-react";

export default function SuccessStories() {
  const featuredStories = [
    {
      id: 1,
      name: "TechStore",
      owner: "Алексей Петров",
      category: "Электроника",
      description: "Специализируется на продаже смартфонов и аксессуаров",
      achievement: "Увеличил продажи на 300% за 6 месяцев",
      revenue: "₽2.5M",
      period: "в месяц",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      quote: "MarketHub предоставил мне все инструменты для масштабирования бизнеса. Аналитика и маркетинговые возможности превзошли все ожидания.",
      metrics: {
        orders: "1.2K",
        rating: "4.9",
        customers: "800+"
      },
      badge: "Топ продавец"
    },
    {
      id: 2,
      name: "FashionHub",
      owner: "Мария Иванова",
      category: "Мода",
      description: "Женская одежда и аксессуары от молодых дизайнеров",
      achievement: "Вышла на федеральный уровень за 8 месяцев",
      revenue: "₽1.8M",
      period: "в месяц",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      quote: "Благодаря MarketHub я смогла превратить хобби в успешный бизнес. Платформа дала возможность выйти на новые рынки.",
      metrics: {
        orders: "950",
        rating: "4.8",
        customers: "650+"
      },
      badge: "Растущая звезда"
    },
    {
      id: 3,
      name: "HomeDecor",
      owner: "Дмитрий Сидоров",
      category: "Дом и сад",
      description: "Товары для дома, декор и садовая мебель",
      achievement: "Достиг ₽50M оборота в год",
      revenue: "₽4.2M",
      period: "в месяц",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      quote: "MarketHub стал ключевым каналом продаж для нашего бизнеса. Высокое качество трафика и отличная конверсия.",
      metrics: {
        orders: "2.5K",
        rating: "4.9",
        customers: "1.5K+"
      },
      badge: "Лидер категории"
    }
  ];

  const quickStats = [
    {
      title: "Средний рост продаж",
      value: "250%",
      description: "в первый год работы",
      icon: <TrendingUp className="w-8 h-8 text-green-600" />
    },
    {
      title: "Продавцов-миллионеров",
      value: "500+",
      description: "зарабатывают ₽1M+ в месяц",
      icon: <Award className="w-8 h-8 text-yellow-600" />
    },
    {
      title: "География продаж",
      value: "85+",
      description: "регионов России",
      icon: <Globe className="w-8 h-8 text-blue-600" />
    },
    {
      title: "Скорость роста",
      value: "3x",
      description: "быстрее, чем в офлайне",
      icon: <Zap className="w-8 h-8 text-purple-600" />
    }
  ];

  const categories = [
    { name: "Электроника", count: 150, growth: "+45%" },
    { name: "Мода и одежда", count: 230, growth: "+62%" },
    { name: "Дом и сад", count: 120, growth: "+38%" },
    { name: "Красота", count: 180, growth: "+55%" },
    { name: "Спорт", count: 90, growth: "+41%" },
    { name: "Детские товары", count: 110, growth: "+48%" }
  ];

  const milestones = [
    {
      year: "2021",
      title: "Запуск платформы",
      description: "Первые 100 продавцов присоединились к MarketHub"
    },
    {
      year: "2022",
      title: "Масштабирование",
      description: "10,000+ продавцов, ₽1B общего оборота"
    },
    {
      year: "2023",
      title: "Инновации",
      description: "Запуск AI-инструментов для продавцов"
    },
    {
      year: "2024",
      title: "Лидерство",
      description: "50,000+ продавцов, ₽15B оборота"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Истории успеха</h1>
          <p className="text-gray-600">Узнайте, как другие продавцы достигли выдающихся результатов на MarketHub</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {quickStats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{stat.title}</h3>
                <p className="text-gray-600 text-sm">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Success Stories */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Истории наших героев</h2>
            <p className="text-gray-600">Познакомьтесь с продавцами, которые изменили свою жизнь благодаря MarketHub</p>
          </div>

          <div className="space-y-8">
            {featuredStories.map((story) => (
              <Card key={story.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img 
                      src={story.image} 
                      alt={story.name}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold text-gray-900">{story.name}</h3>
                          <Badge className="bg-blue-100 text-blue-800">{story.badge}</Badge>
                        </div>
                        <p className="text-gray-600 mb-1">Владелец: {story.owner}</p>
                        <p className="text-gray-500 text-sm">{story.description}</p>
                      </div>
                      <Badge variant="outline">{story.category}</Badge>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <Quote className="w-5 h-5 text-gray-400 mb-2" />
                      <p className="text-gray-700 italic">"{story.quote}"</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <div className="mb-4">
                          <div className="text-2xl font-bold text-green-600">{story.revenue}</div>
                          <p className="text-gray-600 text-sm">{story.period}</p>
                          <p className="text-lg font-semibold text-gray-900 mt-1">{story.achievement}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">{story.metrics.orders}</div>
                          <p className="text-gray-600 text-xs">Заказов</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-lg font-bold text-gray-900">{story.metrics.rating}</span>
                          </div>
                          <p className="text-gray-600 text-xs">Рейтинг</p>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">{story.metrics.customers}</div>
                          <p className="text-gray-600 text-xs">Клиентов</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Success by Categories */}
        <div className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Успешные продавцы по категориям
              </CardTitle>
              <p className="text-gray-600">Количество топ-продавцов и средний рост в каждой категории</p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-900">{category.name}</h4>
                      <p className="text-gray-600 text-sm">{category.count} топ-продавцов</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      {category.growth}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Timeline */}
        <div className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Путь к успеху MarketHub</CardTitle>
              <p className="text-gray-600">Как мы росли вместе с нашими продавцами</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      {milestone.year}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{milestone.title}</h4>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-700 text-white text-center">
          <CardContent className="p-12">
            <Users className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl font-bold mb-4">Станьте следующей историей успеха</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Присоединяйтесь к тысячам успешных продавцов, которые уже изменили свою жизнь благодаря MarketHub
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Начать продавать
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-blue-600">
                Узнать больше
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}