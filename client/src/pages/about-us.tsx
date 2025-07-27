import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Target, 
  Heart, 
  Shield, 
  Globe,
  Award,
  TrendingUp,
  Clock,
  ChevronRight
} from "lucide-react";

export default function AboutUs() {
  const values = [
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Забота о клиентах",
      description: "Мы ставим интересы наших пользователей на первое место и стремимся превзойти их ожидания"
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: "Безопасность",
      description: "Обеспечиваем надежную защиту данных и безопасные транзакции для всех участников"
    },
    {
      icon: <Target className="w-8 h-8 text-green-500" />,
      title: "Инновации",
      description: "Постоянно развиваем технологии, чтобы предлагать лучшие решения для e-commerce"
    },
    {
      icon: <Users className="w-8 h-8 text-purple-500" />,
      title: "Сообщество",
      description: "Строим сильное сообщество продавцов и покупателей, основанное на доверии"
    }
  ];

  const stats = [
    {
      number: "2M+",
      label: "Активных покупателей",
      icon: <Users className="w-6 h-6 text-blue-600" />
    },
    {
      number: "50K+",
      label: "Продавцов",
      icon: <Users className="w-6 h-6 text-green-600" />
    },
    {
      number: "₽15B",
      label: "Оборот в 2024",
      icon: <TrendingUp className="w-6 h-6 text-purple-600" />
    },
    {
      number: "500+",
      label: "Городов",
      icon: <Globe className="w-6 h-6 text-orange-600" />
    }
  ];

  const team = [
    {
      name: "Алексей Смирнов",
      position: "Генеральный директор",
      description: "15+ лет опыта в e-commerce и технологиях",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
    },
    {
      name: "Мария Петрова",
      position: "Директор по продукту",
      description: "Эксперт в области UX/UI и продуктовой стратегии",
      image: "https://images.unsplash.com/photo-1494790108755-2616b6b2bb21?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
    },
    {
      name: "Дмитрий Козлов",
      position: "CTO",
      description: "Ведет разработку платформы и внедрение новых технологий",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
    },
    {
      name: "Елена Иванова",
      position: "Директор по маркетингу",
      description: "Развивает бренд и привлекает новых пользователей",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
    }
  ];

  const timeline = [
    {
      year: "2020",
      title: "Основание",
      description: "Идея создать платформу, объединяющую лучших продавцов России"
    },
    {
      year: "2021",
      title: "Запуск MVP",
      description: "Первая версия платформы с базовым функционалом"
    },
    {
      year: "2022",
      title: "Рост",
      description: "10,000+ продавцов и ₽1B оборота"
    },
    {
      year: "2023",
      title: "Инновации",
      description: "Внедрение AI и машинного обучения"
    },
    {
      year: "2024",
      title: "Лидерство",
      description: "Становимся ведущей платформой в России"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">О MarketHub</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Мы создаем будущее электронной коммерции в России, объединяя 
            лучших продавцов и миллионы покупателей на одной платформе
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <p className="text-gray-600">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Наша миссия
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                Мы стремимся создать самую удобную и безопасную платформу для электронной коммерции, 
                которая поможет предпринимателям развивать свой бизнес, а покупателям - находить 
                качественные товары по лучшим ценам. Наша цель - сделать онлайн-торговлю доступной 
                и выгодной для всех участников рынка.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-green-600" />
                Наше видение
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                Мы видим будущее, где каждый предприниматель в России имеет возможность продавать 
                свои товары миллионам покупателей с помощью современных технологий. MarketHub станет 
                основой цифровой экономики страны, поддерживая малый и средний бизнес на пути к успеху.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Наши ценности</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Принципы, которые направляют нашу работу и помогают создавать лучший сервис
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="mb-4">{value.icon}</div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Наш путь</h2>
            <p className="text-gray-600">История развития MarketHub</p>
          </div>

          <Card>
            <CardContent className="p-8">
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        {item.year}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Наша команда</h2>
            <p className="text-gray-600">Люди, которые создают будущее e-commerce</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.position}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Awards */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-yellow-50 to-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-center">
                <Award className="w-6 h-6 text-yellow-600" />
                Награды и признание
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <Award className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">Лучшая e-commerce платформа</h3>
                    <p className="text-gray-600 text-sm">Премия "Рунет" 2024</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">Быстрорастущий стартап</h3>
                    <p className="text-gray-600 text-sm">Forbes Russia 2024</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                    <h3 className="font-semibent text-gray-900 mb-2">Выбор пользователей</h3>
                    <p className="text-gray-600 text-sm">Рейтинг качества 2024</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact CTA */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-700 text-white text-center">
          <CardContent className="p-12">
            <h2 className="text-3xl font-bold mb-4">Присоединяйтесь к нам</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Станьте частью команды, которая меняет будущее российской e-commerce
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Вакансии
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-blue-600">
                Связаться с нами
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}