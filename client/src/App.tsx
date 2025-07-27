import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Products from "@/pages/products";
import ProductDetail from "@/pages/product-detail";
import Vendors from "@/pages/vendors";
import Deals from "@/pages/deals";
import VendorDashboard from "@/pages/vendor-dashboard";
import VendorRegister from "@/pages/vendor-register";
import LearnMore from "@/pages/learn-more";
import Cart from "@/pages/cart";
import Checkout from "@/pages/checkout";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Favorites from "@/pages/favorites";
import TrackOrders from "@/pages/track-orders";
import CustomerSupport from "@/pages/customer-support";
import ReturnPolicy from "@/pages/return-policy";
import SellOnMarkethub from "@/pages/sell-on-markethub";
import VendorResources from "@/pages/vendor-resources";
import FeeStructure from "@/pages/fee-structure";
import SuccessStories from "@/pages/success-stories";
import AboutUs from "@/pages/about-us";
import Careers from "@/pages/careers";
import Press from "@/pages/press";
import Contact from "@/pages/contact";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CartSidebar from "@/components/cart/cart-sidebar";

function Router() {
  useScrollToTop();
  
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/products" component={Products} />
        <Route path="/products/:id" component={ProductDetail} />
        <Route path="/vendors" component={Vendors} />
        <Route path="/deals" component={Deals} />
        <Route path="/vendor/dashboard" component={VendorDashboard} />
        <Route path="/vendor/register" component={VendorRegister} />
        <Route path="/learn-more" component={LearnMore} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/favorites" component={Favorites} />
        <Route path="/track-orders" component={TrackOrders} />
        <Route path="/customer-support" component={CustomerSupport} />
        <Route path="/return-policy" component={ReturnPolicy} />
        <Route path="/sell-on-markethub" component={SellOnMarkethub} />
        <Route path="/vendor-resources" component={VendorResources} />
        <Route path="/fee-structure" component={FeeStructure} />
        <Route path="/success-stories" component={SuccessStories} />
        <Route path="/about-us" component={AboutUs} />
        <Route path="/careers" component={Careers} />
        <Route path="/press" component={Press} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
      <CartSidebar />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;