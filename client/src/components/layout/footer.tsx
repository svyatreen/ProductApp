import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { scrollToTop } from "@/hooks/use-scroll-to-top";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h5 className="text-xl font-bold mb-4">MarketHub</h5>
            <p className="text-gray-300 mb-4">
              Лучшая многопоставщическая платформа электронной коммерции, 
              соединяющая покупателей и продавцов по всему миру.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h6 className="font-semibold mb-4">Для покупателей</h6>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/products" className="hover:text-white" onClick={scrollToTop}>
                  Обзор товаров
                </Link>
              </li>
              <li>
                <Link href="/track-orders" className="hover:text-white" onClick={scrollToTop}>
                  Отслеживание заказов
                </Link>
              </li>
              <li>
                <Link href="/customer-support" className="hover:text-white" onClick={scrollToTop}>
                  Поддержка клиентов
                </Link>
              </li>
              <li>
                <Link href="/return-policy" className="hover:text-white" onClick={scrollToTop}>
                  Политика возврата
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="font-semibold mb-4">Для продавцов</h6>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/vendor/register" className="hover:text-white" onClick={scrollToTop}>
                  Продавать на MarketHub
                </Link>
              </li>
              <li>
                <Link href="/vendor-resources" className="hover:text-white" onClick={scrollToTop}>
                  Ресурсы для продавцов
                </Link>
              </li>
              <li>
                <Link href="/fee-structure" className="hover:text-white" onClick={scrollToTop}>
                  Структура комиссий
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="hover:text-white" onClick={scrollToTop}>
                  Истории успеха
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="font-semibold mb-4">Компания</h6>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/about-us" className="hover:text-white" onClick={scrollToTop}>
                  О нас
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white" onClick={scrollToTop}>
                  Карьера
                </Link>
              </li>
              <li>
                <Link href="/press" className="hover:text-white" onClick={scrollToTop}>
                  Пресса
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white" onClick={scrollToTop}>
                  Контакты
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>
            &copy; 2025 MarketHub. Все права защищены. | Политика конфиденциальности | Условия
            обслуживания
          </p>
        </div>
      </div>
    </footer>
  );
}
