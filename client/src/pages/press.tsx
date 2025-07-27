import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Users, 
  Zap,
  Heart,
  Coffee,
  Gamepad2,
  GraduationCap,
  TrendingUp,
  ChevronRight
} from "lucide-react";

export default function Careers() {
  const benefits = [
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Медицинская страховка",
      description: "Полное медицинское страхование для вас и вашей семьи"
    },
    {
      icon: <Coffee className="w-8 h-8 text-brown-500" />,
      title: "Гибкий график",
      description: "Удаленная работа и гибкое рабочее время"
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-blue-500" />,
      title: "Обучение и развитие",
      description: "Конференции, курсы и программы развития"
    },
    {
      icon: <Gamepad2 className="w-8 h-8 text-purple-500" />,
      title: "Отдых и развлечения",
      description: "Корпоративные мероприятия и зоны отдыха"
    }
  ];

  const openPositions = [
    {
      title: "Senior Frontend Developer",
      department: "Разработка",
      location: "Москва / Удаленно",
      type: "Полная занятость",
      salary: "200,000 - 350,000 ₽",
      description: "Ищем опытного фронтенд-разработчика для работы над клиентской частью платформы",
      requirements: [
        "5+ лет опыта с React/TypeScript",
        "Опыт работы с современными инструментами сборки",
        "Знание принципов UX/UI",
        "Опыт работы в команде"
      ],
      hot: true
    },
    {
      title: "Product Manager",
      department: "Продукт",
      location: "Москва",
      type: "Полная занятость",
      salary: "180,000 - 280,000 ₽",
      description: "Развитие продуктовой стратегии и управление roadmap платформы",
      requirements: [
        "3+ года опыта в продуктовом менеджменте",
        "Опыт работы с e-commerce платформами",
        "Аналитические навыки",
        "Лидерские качества"
      ],
      hot: false
    },
    {
      title: "DevOps Engineer",
      department: "Инфраструктура",
      location: "Удаленно",
      type: "Полная занятость",
      salary: "180,000 - 300,000 ₽",
      description: "Поддержка и развитие инфраструктуры высоконагруженной платформы",
      requirements: [
        "Опыт с AWS/GCP/Azure",
        "Kubernetes и Docker",
        "CI/CD пайплайны",
        "Мониторинг и логирование"
      ],
      hot: false
    },
    {
      title: "UX/UI Designer",
      department: "Дизайн",
      location: "Москва / Удаленно",
      type: "Полная занятость",
      salary: "120,000 - 200,000 ₽",
      description: "Создание интуитивных интерфейсов для продавцов и покупателей",
      requirements: [
        "Портфолио с UX/UI проектами",
        "Figma, Sketch или аналоги",
        "Понимание принципов дизайна",
        "Опыт работы с командой разработки"
      ],
      hot: true
    },
    {
      title: "Data Scientist",
      department: "Аналитика",
      location: "Москва",
      type: "Полная занятость",
      salary: "150,000 - 250,000 ₽",
      description: "Анализ данных и создание ML-моделей для улучшения платформы",
      requirements: [
        "Python, SQL, R",
        "Машинное обучение",
        "Статистический анализ",
        "Опыт с big data"
      ],
      hot: false
    },
    {
      title: "Customer Success Manager",
      department: "Клиентский сервис",
      location: "Москва",
      type: "Полная занятость",
      salary: "100,000 - 150,000 ₽",
      description: "Работа с ключевыми клиентами и помощь в достижении их целей",
      requirements: [
        "Опыт работы с B2B клиентами",
        "Коммуникативные навыки",
        "Аналитическое мышление",
        "Знание английского языка"
      ],
      hot: false
    }
  ];

  const departments = [
    { name: "Разработка", count: 25, icon: "💻" },
    { name: "Продукт", count: 8, icon: "🎯" },
    { name: "Дизайн", count: 6, icon: "🎨" },
    { name: "Маркетинг", count: 12, icon: "📈" },
    { name: "Продажи", count: 15, icon: "💼" },
    { name: "Поддержка", count: 20, icon: "🎧" }
  ];

  const values = [
    {
      title: "Инновации",
      description: "Мы не боимся экспериментировать и внедрять новые технологии"
    },
    {
      title: "Командная работа",
      description: "Вместе мы достигаем больших результатов"
    },
    {
      title: "Развитие",
      description: "Постоянное обучение и профессиональный рост"
    },
    {
      title: "Результат",
      description: "Фокусируемся на достижении поставленных целей"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Работа в MarketHub</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Присоединяйтесь к команде, которая строит будущее российской e-commerce
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8">
            Посмотреть вакансии
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">200+</div>
              <p className="text-gray-600">Сотрудников</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">50%</div>
              <p className="text-gray-600">Рост команды в год</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <Zap className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">4.8</div>
              <p className="text-gray-600">Рейтинг на HeadHunter</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <MapPin className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">5</div>
              <p className="text-gray-600">Офисов в России</p>
            </CardContent>
          </Card>
        </div>

        {/* Why Work With Us */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Почему MarketHub?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Мы создаем среду, где каждый может развиваться и достигать профессиональных целей
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="mb-4">{benefit.icon}</div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Departments */}
        <div className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Наши команды</CardTitle>
              <p className="text-gray-600">Найдите свое место в одной из наших команд</p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {departments.map((dept, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{dept.icon}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">{dept.name}</h4>
                        <p className="text-gray-600 text-sm">{dept.count} сотрудников</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Open Positions */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Открытые вакансии</h2>
            <p className="text-gray-600">Присоединяйтесь к нашей команде профессионалов</p>
          </div>

          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-wrap items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <Briefcase className="w-5 h-5 text-blue-600 mt-1" />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-semibold text-gray-900">{position.title}</h3>
                          {position.hot && (
                            <Badge className="bg-red-100 text-red-800">Горячая вакансия</Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {position.department}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {position.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {position.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-green-600 mb-1">{position.salary}</div>
                      <Button>Откликнуться</Button>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{position.description}</p>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Требования:</h4>
                    <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                      {position.requirements.map((req, reqIndex) => (
                        <li key={reqIndex}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Company Values */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
            <CardHeader>
              <CardTitle className="text-center">Наши ценности</CardTitle>
              <p className="text-gray-600 text-center">Принципы, которые объединяют нашу команду</p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                      <p className="text-gray-600 text-sm">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Application Process */}
        <div className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Процесс отбора</CardTitle>
              <p className="text-gray-600">Как проходит собеседование в MarketHub</p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-4">
                    1
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Отклик</h4>
                  <p className="text-gray-600 text-sm">Отправьте резюме на интересную вакансию</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-4">
                    2
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Скрининг</h4>
                  <p className="text-gray-600 text-sm">Знакомство с HR и обсуждение вакансии</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-4">
                    3
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Интервью</h4>
                  <p className="text-gray-600 text-sm">Техническое интервью с командой</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-4">
                    4
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Оффер</h4>
                  <p className="text-gray-600 text-sm">Обсуждение условий и старт работы</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-700 text-white text-center">
          <CardContent className="p-12">
            <h2 className="text-3xl font-bold mb-4">Готовы присоединиться?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Станьте частью команды, которая меняет будущее e-commerce в России
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Посмотреть все вакансии
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-blue-600">
                Отправить резюме
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}