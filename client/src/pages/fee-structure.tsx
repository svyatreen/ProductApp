import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, 
  CreditCard, 
  TrendingDown, 
  Calculator,
  CheckCircle,
  AlertCircle,
  Info
} from "lucide-react";

export default function FeeStructure() {
  const feeCategories = [
    {
      category: "Электроника",
      commission: "8%",
      color: "bg-blue-100 text-blue-800"
    },
    {
      category: "Мода и одежда",
      commission: "12%",
      color: "bg-purple-100 text-purple-800"
    },
    {
      category: "Дом и сад",
      commission: "10%",
      color: "bg-green-100 text-green-800"
    },
    {
      category: "Красота и здоровье",
      commission: "15%",
      color: "bg-pink-100 text-pink-800"
    },
    {
      category: "Спорт и отдых",
      commission: "10%",
      color: "bg-orange-100 text-orange-800"
    },
    {
      category: "Книги и канцелярия",
      commission: "6%",
      color: "bg-indigo-100 text-indigo-800"
    }
  ];

  const additionalFees = [
    {
      service: "Размещение товара",
      cost: "Бесплатно",
      description: "Добавление товаров в каталог",
      icon: <CheckCircle className="w-5 h-5 text-green-600" />
    },
    {
      service: "Обработка платежей",
      cost: "2.9% + 15₽",
      description: "За каждую успешную транзакцию",
      icon: <CreditCard className="w-5 h-5 text-blue-600" />
    },
    {
      service: "Возврат товара",
      cost: "50₽",
      description: "Административный сбор за обработку возврата",
      icon: <AlertCircle className="w-5 h-5 text-orange-600" />
    },
    {
      service: "Продвижение товаров",
      cost: "От 100₽/день",
      description: "Реклама товаров в поиске и каталоге",
      icon: <TrendingDown className="w-5 h-5 text-purple-600" />
    }
  ];

  const paymentSchedule = [
    {
      period: "Еженедельно",
      description: "Выплаты каждый вторник",
      fee: "Без дополнительной комиссии",
      popular: true
    },
    {
      period: "Ежемесячно",
      description: "Выплаты 1 числа каждого месяца",
      fee: "Без дополнительной комиссии",
      popular: false
    },
    {
      period: "По запросу",
      description: "Мгновенные выплаты на карту",
      fee: "1% от суммы, мин. 50₽",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Структура комиссий</h1>
          <p className="text-gray-600">Прозрачные условия сотрудничества для всех продавцов</p>
        </div>

        {/* Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-gray-900 mb-1">0₽</div>
              <p className="text-gray-600">Регистрация и размещение</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <Calculator className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-gray-900 mb-1">6-15%</div>
              <p className="text-gray-600">Комиссия с продаж</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <CreditCard className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-gray-900 mb-1">2.9%</div>
              <p className="text-gray-600">Обработка платежей</p>
            </CardContent>
          </Card>
        </div>

        {/* Commission by Category */}
        <div className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Комиссия по категориям товаров</CardTitle>
              <p className="text-gray-600">Размер комиссии зависит от категории ваших товаров</p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {feeCategories.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.category}</h4>
                    </div>
                    <Badge className={item.color}>
                      {item.commission}
                    </Badge>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">Как рассчитывается комиссия?</h4>
                    <p className="text-blue-800 text-sm">
                      Комиссия взимается только с успешно проданных товаров. Расчет происходит после подтверждения получения товара покупателем.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Services */}
        <div className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Дополнительные услуги</CardTitle>
              <p className="text-gray-600">Стоимость дополнительных сервисов платформы</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {additionalFees.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {service.icon}
                      <div>
                        <h4 className="font-semibold text-gray-900">{service.service}</h4>
                        <p className="text-gray-600 text-sm">{service.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{service.cost}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Schedule */}
        <div className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>График выплат</CardTitle>
              <p className="text-gray-600">Выберите удобную схему получения средств</p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {paymentSchedule.map((schedule, index) => (
                  <div key={index} className={`relative border rounded-lg p-6 ${schedule.popular ? 'ring-2 ring-blue-600' : ''}`}>
                    {schedule.popular && (
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                        Популярный
                      </Badge>
                    )}
                    
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{schedule.period}</h3>
                      <p className="text-gray-600 text-sm mb-4">{schedule.description}</p>
                      <div className="text-lg font-semibold text-green-600 mb-4">{schedule.fee}</div>
                      <Button 
                        variant={schedule.popular ? 'default' : 'outline'}
                        className="w-full"
                      >
                        Выбрать
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fee Calculator */}
        <div className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Калькулятор комиссий
              </CardTitle>
              <p className="text-gray-600">Рассчитайте ваши расходы и прибыль</p>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <Calculator className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Интерактивный калькулятор</h3>
                <p className="text-gray-600 mb-6">
                  Введите стоимость товара и категорию, чтобы узнать точную сумму комиссии и вашу прибыль
                </p>
                <Button>Открыть калькулятор</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Volume Discounts */}
        <div className="mb-12">
          <Card className="bg-gradient-to-r from-green-50 to-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-green-600" />
                Скидки за объем
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="text-2xl font-bold text-gray-900 mb-2">₽500K+</div>
                    <p className="text-gray-600 mb-3">Оборот в месяц</p>
                    <Badge className="bg-green-100 text-green-800">-10% к комиссии</Badge>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="text-2xl font-bold text-gray-900 mb-2">₽1M+</div>
                    <p className="text-gray-600 mb-3">Оборот в месяц</p>
                    <Badge className="bg-blue-100 text-blue-800">-15% к комиссии</Badge>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="text-2xl font-bold text-gray-900 mb-2">₽2M+</div>
                    <p className="text-gray-600 mb-3">Оборот в месяц</p>
                    <Badge className="bg-purple-100 text-purple-800">-20% к комиссии</Badge>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-gray-600 mb-4">
                  Достигайте больших объемов продаж и получайте выгодные условия сотрудничества
                </p>
                <Button variant="outline">Узнать больше о скидках</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle>Часто задаваемые вопросы</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Когда взимается комиссия?</h4>
                <p className="text-gray-600">Комиссия взимается только после успешной продажи и подтверждения получения товара покупателем.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Можно ли изменить график выплат?</h4>
                <p className="text-gray-600">Да, вы можете изменить график выплат в настройках вашего аккаунта продавца в любое время.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Взимается ли комиссия с доставки?</h4>
                <p className="text-gray-600">Нет, комиссия взимается только со стоимости товара, стоимость доставки не включается в расчет.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Как получить скидку на комиссию?</h4>
                <p className="text-gray-600">Скидки предоставляются автоматически при достижении определенного объема продаж в месяц.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}