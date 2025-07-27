import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  RefreshCw, 
  ShieldCheck, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Package,
  CreditCard
} from "lucide-react";

export default function ReturnPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Политика возврата</h1>
          <p className="text-gray-600">Подробная информация о возврате и обмене товаров</p>
        </div>

        {/* Key Points */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">14 дней</h3>
              <p className="text-gray-600">на возврат товара</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <RefreshCw className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Бесплатный</h3>
              <p className="text-gray-600">возврат по нашей вине</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <CreditCard className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">100%</h3>
              <p className="text-gray-600">возврат средств</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* General Return Policy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                Общие условия возврата
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Что можно вернуть:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Товары в оригинальной упаковке
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Неиспользованные товары
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Товары с сохранными ярлыками
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Товары без повреждений
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Что нельзя вернуть:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      Продукты питания и напитки
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      Косметика и средства гигиены
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      Товары по индивидуальному заказу
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      Цифровые товары и программы
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Return Process */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-600" />
                Процедура возврата
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Подача заявки</h4>
                    <p className="text-gray-600">Свяжитесь с нами через форму обратной связи или по телефону 8 (800) 123-45-67. Укажите номер заказа и причину возврата.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Получение разрешения</h4>
                    <p className="text-gray-600">Мы рассмотрим вашу заявку в течение 24 часов и отправим инструкцию по возврату.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Отправка товара</h4>
                    <p className="text-gray-600">Упакуйте товар в оригинальную упаковку и отправьте по указанному адресу. Сохраните трек-номер.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Возврат средств</h4>
                    <p className="text-gray-600">После получения и проверки товара мы вернем деньги в течение 7 рабочих дней.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Special Cases */}
          <Card>
            <CardHeader>
              <CardTitle>Особые случаи</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-red-100 text-red-800">Брак</Badge>
                  <h4 className="font-semibold">Товар с браком или повреждениями</h4>
                </div>
                <p className="text-gray-600">
                  Если товар пришел поврежденным или с браком, мы организуем бесплатный возврат и возместим стоимость доставки. 
                  Обратитесь к нам в течение 48 часов после получения.
                </p>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-yellow-100 text-yellow-800">Неподходящий размер</Badge>
                  <h4 className="font-semibold">Обмен по размеру</h4>
                </div>
                <p className="text-gray-600">
                  Одежду и обувь можно обменять на другой размер в течение 14 дней. Стоимость доставки обмена оплачивает покупатель, если товар не бракованный.
                </p>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-green-100 text-green-800">Крупногабарит</Badge>
                  <h4 className="font-semibold">Крупногабаритные товары</h4>
                </div>
                <p className="text-gray-600">
                  Для возврата мебели и крупной техники мы организуем забор курьером. Услуга платная (500-1500 рублей в зависимости от города).
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Контакты для возврата</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Горячая линия</h4>
                  <p className="text-gray-600 mb-2">8 (800) 123-45-67</p>
                  <p className="text-sm text-gray-500">Пн-Пт с 9:00 до 18:00 (МСК)</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Email поддержки</h4>
                  <p className="text-gray-600 mb-2">returns@markethub.ru</p>
                  <p className="text-sm text-gray-500">Ответ в течение 24 часов</p>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <h4 className="font-semibold text-gray-900 mb-3">Адрес для возврата</h4>
                <p className="text-gray-600">
                  123456, г. Москва, ул. Складская, д. 15, стр. 2<br />
                  ООО "МаркетХаб", отдел возвратов<br />
                  Тел: +7 (495) 123-45-67
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}