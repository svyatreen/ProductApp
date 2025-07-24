
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/auth-store";

interface SmartVendorButtonProps {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export default function SmartVendorButton({ 
  children, 
  className, 
  size = "default",
  variant = "default" 
}: SmartVendorButtonProps) {
  const { isAuthenticated } = useAuthStore();
  
  // Если пользователь не авторизован, отправляем на регистрацию
  // Если авторизован, отправляем на страницу создания vendor аккаунта
  const targetPath = isAuthenticated ? "/vendor/register" : "/register";
  
  return (
    <Link href={targetPath}>
      <Button className={className} size={size} variant={variant}>
        {children}
      </Button>
    </Link>
  );
}
