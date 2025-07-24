import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Video, 
  Download, 
  Users, 
  MessageCircle, 
  TrendingUp,
  FileText,
  Lightbulb,
  Target,
  BarChart3,
  Camera,
  ShoppingCart
} from "lucide-react";

export default function VendorResources() {
  const resourceCategories = [
    {
      title: "Начало работы",
      icon: <BookOpen className="w-6 h-6 text-blue-600" />,
      resources: [
        {
          title: "Руководство для новых продавцов",
          type: "guide",
          description: "Пошаговое руководство по настройке магазина",
          badge: "Популярное"
        },
        {
          title: "Создание первого товара",
          type: "video",
          description: "Видеоурок по добавлению товаров",
          badge: "Новое"
        },
        {
          title: "Настройка профиля магазина",
          type: "guide",
          description: "Как создать привлекательный профиль"
        }
      ]
    },
    {
      title: "Продвижение и маркетинг",
      icon: <TrendingUp className="w-6 h-6 text-green-600" />,
      resources: [
        {
          title: "SEO оптимизация товаров",
          type: "guide",
          description: "Как улучшить видимость ваших товаров"
        },
        {
          title: "Рекламные кампании",
          type: "video",
          description: "Создание эффективной рекламы"
        },
        {
          title: "Социальные сети для продаж",
          type: "guide",
          description: "Использование соцсетей для привлечения клиентов"
        }
      ]
    },
    {
      title: "Фотография товаров",
      icon: <Camera className="w-6 h-6 text-purple-600" />,
      resources: [
        {
          title: "Основы предметной съемки",
          type: "video",
          description: "Как делать качественные фото товаров"
        },
        {
          title: "Обработка изображений",
          type: "guide",
          description: "Простые способы улучшить фотографии"
        },
        {
          title: "Требования к изображениям",
          type: "document",
          description: "Технические требования к фото на платформе"
        }
      ]
    },
    {
      title: "Аналитика и отчеты",
      icon: <BarChart3 className="w-6 h-6 text-orange-600" />,
      resources: [
        {
          title: "Понимание аналитики продаж",
          type: "guide",
          description: "Как читать и использовать отчеты"
        },
        {
          title: "KPI для продавцов",
          type: "document",
          description: "Ключевые метрики для отслеживания"
        },
        {
          title: "Сезонные тренды",
          type: "guide",
          description: "Анализ сезонности продаж"
        }
      ]
    }
  ];

  const tools = [
    {
      title: "Шаблоны описаний",
      description: "Готовые шаблоны для описания товаров",
      icon: <FileText className="w-8 h-8 text-blue-600" />,
      downloadable: true
    },
    {
      title: "Калькулятор прибыли",
      description: "Рассчитайте рентабельность ваших товаров",
      icon: <Target className="w-8 h-8 text-green-600" />,
      downloadable: false
    },
    {
      title: "Генератор ключевых слов",
      description: "Подберите ключевые слова для товаров",
      icon: <Lightbulb className="w-8 h-8 text-yellow-600" />,
      downloadable: false
    },
    {
      title: "Планировщик акций",
      description: "Планируйте скидки и распродажи",
      icon: <ShoppingCart className="w-8 h-8 text-purple-600" />,
      downloadable: true
    }
  ];

  const webinars = [
    {
      title: "Как увеличить продажи в 2024 году",
      date: "15 февраля, 14:00",
      speaker: "Анна Козлова, эксперт по e-commerce",
      status: "upcoming"
    },
    {
      title: "Работа с негативными отзывами",
      date: "22 февраля, 15:00",
      speaker: "Дмитрий Петров, менеджер по качеству",
      status: "upcoming"
    },
    {
      title: "Оптимизация логистики",
      date: "28 января, 14:00",
      speaker: "Елена Сидорова, логист",
      status: "recorded"
    }
  ];

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4 text-red-600" />;
      case 'document':
        return <Download className="w-4 h-4 text-blue-600" />;
      default:
        return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ресурсы для продавцов</h1>
          <p className="text-gray-600">Всё необходимое для успешных продаж на MarketHub</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-gray-900 mb-1">50+</div>
              <p className="text-gray-600 text-sm">Обучающих материалов</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <Video className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-gray-900 mb-1">25+</div>
              <p className="text-gray-600 text-sm">Видеоуроков</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-gray-900 mb-1">15K+</div>
              <p className="text-gray-600 text-sm">Участников сообщества</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <MessageCircle className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-gray-900 mb-1">24/7</div>
              <p className="text-gray-600 text-sm">Поддержка</p>
            </CardContent>
          </Card>
        </div>

        {/* Resource Categories */}
        <div className="space-y-8 mb-12">
          {resourceCategories.map((category, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  {category.icon}
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {category.resources.map((resource, resourceIndex) => (
                    <div key={resourceIndex} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getResourceIcon(resource.type)}
                          <h4 className="font-semibold text-gray-900">{resource.title}</h4>
                        </div>
                        {resource.badge && (
                          <Badge variant={resource.badge === 'Новое' ? 'default' : 'secondary'} className="text-xs">
                            {resource.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                      <Button size="sm" variant="outline" className="w-full">
                        {resource.type === 'video' ? 'Смотреть' : 'Читать'}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tools Section */}
        <div className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Полезные инструменты</CardTitle>
              <p className="text-gray-600">Инструменты для оптимизации ваших продаж</p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {tools.map((tool, index) => (
                  <div key={index} className="text-center border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="mb-4">{tool.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-2">{tool.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
                    <Button size="sm" variant={tool.downloadable ? 'default' : 'outline'}>
                      {tool.downloadable ? (
                        <>
                          <Download className="w-4 h-4 mr-1" />
                          Скачать
                        </>
                      ) : (
                        'Использовать'
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Webinars Section */}
        <div className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="w-5 h-5" />
                Вебинары и события
              </CardTitle>
              <p className="text-gray-600">Обучающие мероприятия от экспертов</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {webinars.map((webinar, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{webinar.title}</h4>
                      <p className="text-gray-600 text-sm mb-1">{webinar.speaker}</p>
                      <p className="text-gray-500 text-sm">{webinar.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={webinar.status === 'upcoming' ? 'default' : 'secondary'}>
                        {webinar.status === 'upcoming' ? 'Предстоящий' : 'Запись'}
                      </Badge>
                      <Button size="sm" variant={webinar.status === 'upcoming' ? 'default' : 'outline'}>
                        {webinar.status === 'upcoming' ? 'Записаться' : 'Смотреть'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Community Section */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="p-8 text-center">
            <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Присоединяйтесь к сообществу</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Общайтесь с другими продавцами, делитесь опытом и получайте советы от экспертов
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                <MessageCircle className="w-4 h-4 mr-2" />
                Telegram чат
              </Button>
              <Button size="lg" variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Форум продавцов
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}