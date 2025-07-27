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
              The ultimate multi-vendor e-commerce platform connecting buyers
              and sellers worldwide.
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
            <h6 className="font-semibold mb-4">For Buyers</h6>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/products" className="hover:text-white" onClick={scrollToTop}>
                  Browse Products
                </Link>
              </li>
              <li>
                <Link href="/track-orders" className="hover:text-white" onClick={scrollToTop}>
                  Track Orders
                </Link>
              </li>
              <li>
                <Link href="/customer-support" className="hover:text-white" onClick={scrollToTop}>
                  Customer Support
                </Link>
              </li>
              <li>
                <Link href="/return-policy" className="hover:text-white" onClick={scrollToTop}>
                  Return Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="font-semibold mb-4">For Vendors</h6>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/vendor/register" className="hover:text-white" onClick={scrollToTop}>
                  Sell on MarketHub
                </Link>
              </li>
              <li>
                <Link href="/vendor-resources" className="hover:text-white" onClick={scrollToTop}>
                  Vendor Resources
                </Link>
              </li>
              <li>
                <Link href="/fee-structure" className="hover:text-white" onClick={scrollToTop}>
                  Fee Structure
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="hover:text-white" onClick={scrollToTop}>
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="font-semibold mb-4">Company</h6>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/about-us" className="hover:text-white" onClick={scrollToTop}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white" onClick={scrollToTop}>
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="hover:text-white" onClick={scrollToTop}>
                  Press
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white" onClick={scrollToTop}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>
            &copy; 2025 MarketHub. All rights reserved. | Privacy Policy | Terms
            of Service
          </p>
        </div>
      </div>
    </footer>
  );
}
