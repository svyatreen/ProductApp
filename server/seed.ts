import { db } from "./db";
import { users, vendors, categories, products, orders, messages, suppliers } from "@shared/schema";

export async function seedDatabase() {
  console.log("🌱 Seeding database...");

  try {
    // Seed categories
    const categoriesData = [
      { name: "Electronics", icon: "laptop", slug: "electronics" },
      { name: "Fashion", icon: "tshirt", slug: "fashion" },
      { name: "Home & Garden", icon: "home", slug: "home-garden" },
      { name: "Sports", icon: "gamepad", slug: "sports" },
      { name: "Books", icon: "book", slug: "books" },
      { name: "Beauty", icon: "sparkles", slug: "beauty" },
    ];

    // Check if categories already exist
    const existingCategories = await db.select().from(categories);
    if (existingCategories.length === 0) {
      console.log("📚 Seeding categories...");
      for (const category of categoriesData) {
        await db.insert(categories).values(category);
      }
    } else {
      console.log("📚 Categories already exist, skipping...");
    }

    // Seed users
    const usersData = [
      {
        username: "testvendor",
        email: "vendor@test.com",
        password: "$2b$10$8K1p/a0dUrFNzVn2gO1G5.rAFl.wS5WrU1q4rJL3M9x6z7y8w9a0b", // password: "password"
        firstName: "Test",
        lastName: "Vendor",
        isVendor: true,
      },
      {
        username: "fashionvendor",
        email: "fashion@vendor.com",
        password: "$2b$10$8K1p/a0dUrFNzVn2gO1G5.rAFl.wS5WrU1q4rJL3M9x6z7y8w9a0b",
        firstName: "Fashion",
        lastName: "Store",
        isVendor: true,
      },
      {
        username: "homevendor",
        email: "home@vendor.com",
        password: "$2b$10$8K1p/a0dUrFNzVn2gO1G5.rAFl.wS5WrU1q4rJL3M9x6z7y8w9a0b",
        firstName: "Home",
        lastName: "Garden",
        isVendor: true,
      },
      {
        username: "sportsvendor",
        email: "sports@vendor.com",
        password: "$2b$10$8K1p/a0dUrFNzVn2gO1G5.rAFl.wS5WrU1q4rJL3M9x6z7y8w9a0b",
        firstName: "Sports",
        lastName: "Store",
        isVendor: true,
      },
      {
        username: "beautyvendor",
        email: "beauty@vendor.com",
        password: "$2b$10$8K1p/a0dUrFNzVn2gO1G5.rAFl.wS5WrU1q4rJL3M9x6z7y8w9a0b",
        firstName: "Beauty",
        lastName: "Store",
        isVendor: true,
      },
    ];

    // Check if users already exist
    const existingUsers = await db.select().from(users);
    if (existingUsers.length === 0) {
      console.log("👤 Seeding users...");
      for (const user of usersData) {
        await db.insert(users).values(user);
      }
    } else {
      console.log("👤 Users already exist, skipping...");
    }

    // Get inserted users
    const insertedUsers = await db.select().from(users);
    const testVendorUser = insertedUsers.find(u => u.username === "testvendor");
    const fashionVendorUser = insertedUsers.find(u => u.username === "fashionvendor");
    const homeVendorUser = insertedUsers.find(u => u.username === "homevendor");
    const sportsVendorUser = insertedUsers.find(u => u.username === "sportsvendor");
    const beautyVendorUser = insertedUsers.find(u => u.username === "beautyvendor");

    if (!testVendorUser || !fashionVendorUser || !homeVendorUser || !sportsVendorUser || !beautyVendorUser) {
      throw new Error("Failed to create vendor users");
    }

    // Seed vendors
    const vendorsData = [
      {
        userId: testVendorUser.id,
        storeName: "TechGear Solutions",
        storeDescription: "Premium electronics and gadgets for tech enthusiasts",
        rating: "4.8",
        totalSales: 1250,
        isApproved: true,
      },
      {
        userId: fashionVendorUser.id,
        storeName: "Style Central",
        storeDescription: "Fashion-forward clothing and accessories",
        rating: "4.6",
        totalSales: 890,
        isApproved: true,
      },
      {
        userId: homeVendorUser.id,
        storeName: "Cozy Living",
        storeDescription: "Home decor and garden essentials",
        rating: "4.5",
        totalSales: 650,
        isApproved: true,
      },
      {
        userId: sportsVendorUser.id,
        storeName: "Active Life",
        storeDescription: "Sports equipment and fitness gear",
        rating: "4.7",
        totalSales: 780,
        isApproved: true,
      },
      {
        userId: beautyVendorUser.id,
        storeName: "Eco Living",
        storeDescription: "Natural beauty and eco-friendly products",
        rating: "4.4",
        totalSales: 420,
        isApproved: true,
      },
    ];

    // Check if vendors already exist
    const existingVendors = await db.select().from(vendors);
    if (existingVendors.length === 0) {
      console.log("🏪 Seeding vendors...");
      for (const vendor of vendorsData) {
        await db.insert(vendors).values(vendor);
      }
    } else {
      console.log("🏪 Vendors already exist, skipping...");
    }

    // Get inserted vendors
    const insertedVendors = await db.select().from(vendors);
    const testVendor = insertedVendors.find(v => v.userId === testVendorUser.id);
    const fashionVendor = insertedVendors.find(v => v.userId === fashionVendorUser.id);
    const homeVendor = insertedVendors.find(v => v.userId === homeVendorUser.id);
    const sportsVendor = insertedVendors.find(v => v.userId === sportsVendorUser.id);
    const beautyVendor = insertedVendors.find(v => v.userId === beautyVendorUser.id);

    if (!testVendor || !fashionVendor || !homeVendor || !sportsVendor || !beautyVendor) {
      throw new Error("Failed to create vendors");
    }

    // Seed products
    const productsData = [
      // Electronics
      {
        vendorId: testVendor.id,
        categoryId: 1,
        name: "Premium Smartphone X Pro",
        description: "Latest flagship smartphone with advanced camera system and 5G connectivity",
        price: "699.99",
        originalPrice: "799.99",
        stock: 75,
        imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.8",
        reviewCount: 203,
        isActive: true,
      },
      {
        vendorId: testVendor.id,
        categoryId: 1,
        name: "Wireless Gaming Mouse Pro",
        description: "Professional gaming mouse with RGB lighting and precision sensor",
        price: "79.99",
        stock: 120,
        imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.6",
        reviewCount: 89,
        isActive: true,
      },
      {
        vendorId: testVendor.id,
        categoryId: 1,
        name: "4K Ultra HD Smart TV",
        description: "55-inch 4K Ultra HD Smart TV with HDR and streaming apps",
        price: "599.99",
        originalPrice: "749.99",
        stock: 25,
        imageUrl: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.7",
        reviewCount: 156,
        isActive: true,
      },
      {
        vendorId: beautyVendor.id,
        categoryId: 1,
        name: "Bluetooth Speaker Waterproof",
        description: "Portable waterproof Bluetooth speaker with premium sound",
        price: "49.99",
        stock: 95,
        imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.4",
        reviewCount: 112,
        isActive: true,
      },
      // Fashion
      {
        vendorId: fashionVendor.id,
        categoryId: 2,
        name: "Designer Premium Jeans",
        description: "Premium denim jeans with perfect fit and lasting comfort",
        price: "129.99",
        originalPrice: "159.99",
        stock: 60,
        imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.6",
        reviewCount: 87,
        isActive: true,
      },
      {
        vendorId: fashionVendor.id,
        categoryId: 2,
        name: "Elegant Summer Dress",
        description: "Lightweight summer dress perfect for any occasion",
        price: "89.99",
        stock: 45,
        imageUrl: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.8",
        reviewCount: 134,
        isActive: true,
      },
      {
        vendorId: sportsVendor.id,
        categoryId: 2,
        name: "Casual T-Shirt Collection",
        description: "Premium cotton t-shirts in various colors and sizes",
        price: "24.99",
        stock: 150,
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.5",
        reviewCount: 267,
        isActive: true,
      },
      // Home & Garden
      {
        vendorId: homeVendor.id,
        categoryId: 3,
        name: "Modern Coffee Table",
        description: "Stylish modern coffee table perfect for any living room",
        price: "299.99",
        stock: 20,
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.3",
        reviewCount: 45,
        isActive: true,
      },
      {
        vendorId: homeVendor.id,
        categoryId: 3,
        name: "Professional Garden Tool Set",
        description: "Complete set of professional garden tools for all your needs",
        price: "149.99",
        originalPrice: "199.99",
        stock: 35,
        imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.7",
        reviewCount: 98,
        isActive: true,
      },
      // Sports
      {
        vendorId: sportsVendor.id,
        categoryId: 4,
        name: "Professional Running Shoes",
        description: "High-performance running shoes for serious athletes",
        price: "149.99",
        originalPrice: "179.99",
        stock: 80,
        imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.9",
        reviewCount: 189,
        isActive: true,
      },
      {
        vendorId: sportsVendor.id,
        categoryId: 4,
        name: "Premium Yoga Mat",
        description: "Non-slip yoga mat perfect for all fitness activities",
        price: "39.99",
        stock: 90,
        imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.6",
        reviewCount: 156,
        isActive: true,
      },
      // Books
      {
        vendorId: beautyVendor.id,
        categoryId: 5,
        name: "Complete Programming Guide",
        description: "Comprehensive guide to modern programming languages and techniques",
        price: "39.99",
        stock: 100,
        imageUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.8",
        reviewCount: 178,
        isActive: true,
      },
      {
        vendorId: sportsVendor.id,
        categoryId: 5,
        name: "Science Fiction Adventure",
        description: "Epic space adventure novel with thrilling storyline",
        price: "19.99",
        originalPrice: "24.99",
        stock: 65,
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.5",
        reviewCount: 92,
        isActive: true,
      },
    ];

    // Check if products already exist
    const existingProducts = await db.select().from(products);
    if (existingProducts.length === 0) {
      console.log("📦 Seeding products...");
      for (const product of productsData) {
        await db.insert(products).values(product);
      }
    } else {
      console.log("📦 Products already exist, skipping...");
    }

    // Seed some sample orders
    const ordersData = [
      {
        userId: testVendorUser.id,
        vendorId: testVendor.id,
        status: "completed",
        totalAmount: "129.98",
        shippingAddress: "123 Tech Street, San Francisco, CA 94105",
      },
      {
        userId: fashionVendorUser.id,
        vendorId: fashionVendor.id,
        status: "processing",
        totalAmount: "89.99",
        shippingAddress: "456 Fashion Ave, New York, NY 10001",
      },
    ];

    // Check if orders already exist
    const existingOrders = await db.select().from(orders);
    if (existingOrders.length === 0) {
      console.log("📋 Seeding orders...");
      for (const order of ordersData) {
        await db.insert(orders).values(order);
      }
    } else {
      console.log("📋 Orders already exist, skipping...");
    }

    // Seed sample messages
    const messagesData = [
      {
        vendorId: testVendor.id,
        senderName: "Елена Козлова",
        senderEmail: "elena@example.com",
        subject: "Вопрос о товаре",
        message: "Здравствуйте! Подскажите, когда будет в наличии смартфон?",
        isRead: false,
      },
      {
        vendorId: fashionVendor.id,
        senderName: "John Smith",
        senderEmail: "john@example.com",
        subject: "Product inquiry",
        message: "Hi, I'm interested in your summer dress collection. Do you have size L available?",
        isRead: true,
      },
    ];

    // Check if messages already exist
    const existingMessages = await db.select().from(messages);
    if (existingMessages.length === 0) {
      console.log("💬 Seeding messages...");
      for (const message of messagesData) {
        await db.insert(messages).values(message);
      }
    } else {
      console.log("💬 Messages already exist, skipping...");
    }

    // Seed sample suppliers
    const suppliersData = [
      {
        vendorId: testVendor.id,
        name: "Mobile Tech Distributors",
        contact: "Alex Johnson",
        email: "alex@mobiletech.com",
        phone: "+1-555-0123",
        address: "789 Tech Park, Silicon Valley, CA 94043",
        products: "Smartphones, Tablets, Accessories",
        status: "active",
      },
      {
        vendorId: fashionVendor.id,
        name: "Fashion Forward Supply",
        contact: "Maria Rodriguez",
        email: "maria@fashionforward.com",
        phone: "+1-555-0456",
        address: "321 Fashion District, Los Angeles, CA 90014",
        products: "Clothing, Accessories, Footwear",
        status: "active",
      },
    ];

    // Check if suppliers already exist
    const existingSuppliers = await db.select().from(suppliers);
    if (existingSuppliers.length === 0) {
      console.log("🏭 Seeding suppliers...");
      for (const supplier of suppliersData) {
        await db.insert(suppliers).values(supplier);
      }
    } else {
      console.log("🏭 Suppliers already exist, skipping...");
    }

    console.log("✅ Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}