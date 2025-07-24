import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock, 
  HelpCircle, 
  Search,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";

export default function CustomerSupport() {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const { toast } = useToast();

  const faqData = [
    {
      question: "Как отследить мой заказ?",
      answer: "Вы можете отследить свой заказ на странице 'Отслеживание заказов'. Войдите в свой аккаунт и найдите нужный заказ по номеру или адресу доставки."
    },
    {
      question: "Какие способы оплаты вы принимаете?",
      answer: "Мы принимаем все основные банковские карты (Visa, MasterCard, МИР), электронные кошельки (Яндекс.Деньги, QIWI), а также наличные при получении."
    },
    {
      question: "Сколько времени занимает доставка?",
      answer: "Стандартная доставка занимает 3-7 рабочих дней. Экспресс-доставка доступна в крупных городах и занимает 1-2 дня."
    },
    {
      question: "Могу ли я вернуть товар?",
      answer: "Да, вы можете вернуть товар в течение 14 дней с момента получения. Товар должен быть в оригинальной упаковке и неиспользованном состоянии."
    },
    {
      question: "Как стать продавцом на платформе?",
      answer: "Зарегистрируйтесь как продавец через страницу 'Регистрация продавца'. После проверки документов вы сможете добавлять товары в каталог."
    },
    {
      question: "Есть ли программа лояльности?",
      answer: "Да! За каждую покупку вы получаете бонусные баллы, которые можно использовать для оплаты следующих заказов. 1 балл = 1 рубль."
    },
    {
      question: "Что делать, если товар пришел поврежденным?",
      answer: "Свяжитесь с нами в течение 48 часов после получения. Мы организуем возврат или обмен поврежденного товара за наш счет."
    }
  ];

  const filteredFAQ = faqData.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.subject || !contactForm.message) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все поля",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Сообщение отправлено",
      description: "Мы свяжемся с вами в ближайшее время"
    });

    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Поддержка клиентов</h1>
          <p className="text-gray-600">Мы здесь, чтобы помочь вам с любыми вопросами</p>
        </div>

        {/* Contact Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Онлайн чат</h3>
              <p className="text-gray-600 mb-4">Мгновенная помощь от наших консультантов</p>
              <Badge className="bg-green-100 text-green-800">Онлайн</Badge>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Phone className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Телефон</h3>
              <p className="text-gray-600 mb-4">8 (800) 123-45-67</p>
              <div className="flex items-center justify-center gap-1 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                Пн-Пт 9:00-18:00
              </div>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Mail className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-gray-600 mb-4">support@markethub.ru</p>
              <div className="text-sm text-gray-500">Ответ в течение 24 часов</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* FAQ Section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  Часто задаваемые вопросы
                </CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Поиск по вопросам..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredFAQ.map((item, index) => (
                  <Collapsible 
                    key={index}
                    open={openFAQ === index}
                    onOpenChange={() => setOpenFAQ(openFAQ === index ? null : index)}
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <span className="font-medium">{item.question}</span>
                      {openFAQ === index ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-4 py-3 text-gray-600">
                      {item.answer}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
                
                {filteredFAQ.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <HelpCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Вопросы не найдены. Попробуйте изменить поисковый запрос.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Свяжитесь с нами</CardTitle>
                <p className="text-gray-600">Опишите вашу проблему, и мы поможем решить её</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Имя *
                      </label>
                      <Input
                        value={contactForm.name}
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                        placeholder="Ваше имя"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <Input
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Тема обращения *
                    </label>
                    <Input
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                      placeholder="Кратко опишите проблему"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Сообщение *
                    </label>
                    <Textarea
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      placeholder="Подробно опишите вашу проблему или вопрос..."
                      rows={6}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Отправить сообщение
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}