import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const vendorSchema = z.object({
  userId: z.number().default(1), // Mock user ID
  storeName: z.string().min(1, "Store name is required"),
  storeDescription: z.string().optional(),
});

type VendorFormData = z.infer<typeof vendorSchema>;

export default function VendorRegister() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<VendorFormData>({
    resolver: zodResolver(vendorSchema),
    defaultValues: {
      userId: 1, // Mock user ID
      storeName: "",
      storeDescription: "",
    },
  });

  const registerVendorMutation = useMutation({
    mutationFn: async (data: VendorFormData) => {
      const response = await apiRequest("POST", "/api/vendors", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your vendor account has been created successfully!",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/vendors"] });
      queryClient.invalidateQueries({ queryKey: ["/api/vendors", { featured: "true" }] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to submit vendor application. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: VendorFormData) => {
    registerVendorMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Become a MarketHub Vendor
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of successful sellers and start your online business today. 
            Reach millions of customers worldwide with our powerful e-commerce platform.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Benefits */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Sell on MarketHub?</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary rounded-full p-2">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Quick Setup</h3>
                  <p className="text-gray-600">Get your store online in minutes with our easy setup process.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary rounded-full p-2">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Global Reach</h3>
                  <p className="text-gray-600">Access millions of customers from around the world.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary rounded-full p-2">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Powerful Analytics</h3>
                  <p className="text-gray-600">Track your performance with detailed sales and customer insights.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary rounded-full p-2">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">24/7 Support</h3>
                  <p className="text-gray-600">Get help whenever you need it with our dedicated support team.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <Card>
            <CardHeader>
              <CardTitle>Create Your Vendor Account</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="storeName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Store Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your store name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="storeDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Store Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell customers about your store and products"
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={registerVendorMutation.isPending}
                  >
                    {registerVendorMutation.isPending ? "Submitting..." : "Submit Application"}
                  </Button>
                </form>
              </Form>

              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-gray-600 text-center">
                  Already have a vendor account?{" "}
                  <a href="/vendor/dashboard" className="text-primary hover:underline">
                    Go to Dashboard
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
