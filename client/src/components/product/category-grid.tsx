import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Laptop, Shirt, Home, Gamepad2, Book, Sparkles, Gamepad, Car, Palette } from "lucide-react";
import type { Category } from "@shared/schema";

export default function CategoryGrid() {
  const [, navigate] = useLocation();
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 sm:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="text-center animate-pulse">
            <div className="bg-gray-200 rounded-full w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4"></div>
            <div className="bg-gray-200 h-3 sm:h-4 rounded mx-auto w-12 sm:w-16"></div>
          </div>
        ))}
      </div>
    );
  }

  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      laptop: Laptop,
      tshirt: Shirt,
      home: Home,
      gamepad: Gamepad2,
      book: Book,
      sparkles: Sparkles,
      gamepad2: Gamepad,
      car: Car,
      palette: Palette,
    };
    return iconMap[iconName] || Laptop;
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 sm:gap-6">
      {categories?.map((category) => {
        const IconComponent = getIcon(category.icon);
        return (
          <div 
            key={category.id} 
            className="text-center group cursor-pointer"
            onClick={() => navigate(`/products?category=${category.id}`)}
          >
            <div className="bg-gray-100 rounded-full w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              <IconComponent className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <p className="font-medium text-gray-900 text-sm sm:text-base group-hover:text-primary transition-colors duration-300">{category.name}</p>
          </div>
        );
      })}
    </div>
  );
}
