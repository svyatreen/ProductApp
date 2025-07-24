import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Store, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Shield, 
  Headphones,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Globe,
  Zap
} from "lucide-react";

export default function SellOnMarketHub() {
  const benefits = [
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Миллионы покупателей",
      description: "Доступ к огромной аудитории активных покупателей"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-600" />,
      title: "Рост продаж",
      description: "Увеличьте продажи с помощью наших маркетинговых инструментов"
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-600" />,
      title: "Защита сделок",
      description: "Гарантированная защита всех транзакций и платежей"
    },
    {
      icon: <Headphones className="w-8 h-8 text-orange-600" />,
      title: "Поддержка 24/7",
      description: "Круглосуточная поддержка для решения любых вопросов"
    }
  ];

  const features = [
    "Простая загрузка товаров",
    "Автоматическое управление заказами",
    "Аналитика продаж в реальном времени",
    "Интеграция с популярными службами доставки",
    "Многоканальные продажи",
    "Персональная витрина магазина"
  ];

  const plans = [
    {
      name: "Базовый",
      price: "Бесплатно",
      commission: "8%",
      features: [
        "До 100 товаров",
        "Базовая аналитика",
        "Email поддержка",
        "Стандартные инструменты продаж"
      ],
      popular: false
    },
    {
      name: "Профессиональный",
      price: "2,990 ₽/мес",
      commission: "5%",
      features: [
        "Неограниченное количество товаров",
        "Расширенная аналитика",
        "Приоритетная поддержка",
        "Продвинутые маркетинговые инструменты",
        "Персональный менеджер",
        "Рекламные кампании"
      ],
      popular: true
    },
    {
      name: "Корпоративный",
      price: "От 9,990 ₽/мес",
      commission: "3%",
      features: [
        "Все функции Профессионального плана",
        "Индивидуальные условия",
        "API интеграция",
        "Белый лейбл решения",
        "Выделенный аккаунт-менеджер",
        "Кастомные отчеты"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Продавайте на MarketHub
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Присоединяйтесь к тысячам успешных продавцов и развивайте свой бизнес 
            на крупнейшей торговой платформе России
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Начать продавать
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-blue-600">
              Узнать больше
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center">
            <CardContent className="pt-6">
              <BarChart3 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">2M+</div>
              <p className="text-gray-600">Активных покупателей</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <Store className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">50K+</div>
              <p className="text-gray-600">Продавцов доверяют нам</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <DollarSign className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">₽15B</div>
              <p className="text-gray-600">Оборот в 2024 году</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <Globe className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
              <p className="text-gray-600">Городов покрытия</p>
            </CardContent>
          </Card>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Почему выбирают MarketHub?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Мы предоставляем все необходимые инструменты для успешного развития вашего бизнеса
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="mb-4">{benefit.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl">Мощные инструменты для продаж</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pricing Plans */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Выберите свой план</h2>
            <p className="text-gray-600">Начните бесплатно или выберите план, который подходит вашему бизнесу</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-blue-600' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                    Популярный
                  </Badge>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-gray-900 mt-2">{plan.price}</div>
                  <p className="text-gray-600">Комиссия: {plan.commission} с продажи</p>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.price === 'Бесплатно' ? 'Начать бесплатно' : 'Выбрать план'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-green-50 to-blue-50">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Истории успеха</h2>
                <p className="text-gray-600">Узнайте, как другие продавцы достигли успеха на нашей платформе</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <Zap className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">TechStore</h3>
                    <p className="text-gray-600 text-sm mb-3">Увеличил продажи на 300% за 6 месяцев</p>
                    <Badge variant="secondary">Электроника</Badge>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <Store className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">FashionHub</h3>
                    <p className="text-gray-600 text-sm mb-3">Вышел на федеральный уровень</p>
                    <Badge variant="secondary">Мода</Badge>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">HomeDecor</h3>
                    <p className="text-gray-600 text-sm mb-3">Достиг ₽50M оборота в год</p>
                    <Badge variant="secondary">Дом и сад</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Готовы начать продавать?</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Присоединяйтесь к MarketHub сегодня и откройте новые возможности для своего бизнеса
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Зарегистрироваться как продавец
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-blue-600">
                  Связаться с нами
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}