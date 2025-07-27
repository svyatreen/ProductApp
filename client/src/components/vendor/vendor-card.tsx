import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import type { Vendor } from "@shared/schema";

interface VendorCardProps {
  vendor: Vendor;
}

export default function VendorCard({ vendor }: VendorCardProps) {
  return (
    <div className="text-center group">
      <div className="relative mb-6">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
          alt={vendor.storeName}
          className="w-full h-48 object-cover rounded-xl"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Button className="bg-white text-gray-900 hover:bg-gray-100">
            Visit Store
          </Button>
        </div>
      </div>
      
      <h4 className="text-xl font-bold text-gray-900 mb-2">{vendor.storeName}</h4>
      <p className="text-gray-600 mb-4 line-clamp-2">
        {vendor.storeDescription || "Quality products with excellent service"}
      </p>
      
      <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
        <span className="flex items-center">
          <Star className="h-4 w-4 text-yellow-400 mr-1" />
          {vendor.rating}
        </span>
        <span>1.2k+ products</span>
        <span>{vendor.totalSales}+ sales</span>
      </div>
    </div>
  );
}
