import {
  users, vendors, categories, products, orders, orderItems, reviews, cartItems, favorites, messages, suppliers,
  type User, type InsertUser,
  type Vendor, type InsertVendor,
  type Category, type InsertCategory,
  type Product, type InsertProduct,
  type Order, type InsertOrder,
  type OrderItem, type InsertOrderItem,
  type Review, type InsertReview,
  type CartItem, type InsertCartItem,
  type Favorite, type InsertFavorite,
  type Message, type InsertMessage,
  type Supplier, type InsertSupplier
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<InsertUser>): Promise<User | undefined>;

  // Vendors
  getVendor(id: number): Promise<Vendor | undefined>;
  getVendorByUserId(userId: number): Promise<Vendor | undefined>;
  getVendors(): Promise<Vendor[]>;
  getFeaturedVendors(): Promise<Vendor[]>;
  createVendor(vendor: InsertVendor): Promise<Vendor>;
  updateVendor(id: number, updates: Partial<InsertVendor>): Promise<Vendor | undefined>;

  // Categories
  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;

  // Products
  getProduct(id: number): Promise<Product | undefined>;
  getProducts(): Promise<Product[]>;
  getProductsByCategory(categoryId: number): Promise<Product[]>;
  getProductsByVendor(vendorId: number): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, updates: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;

  // Orders
  getOrder(id: number): Promise<Order | undefined>;
  getOrdersByUser(userId: number): Promise<Order[]>;
  getOrdersByVendor(vendorId: number): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: number, status: string): Promise<Order | undefined>;

  // Order Items
  getOrderItems(orderId: number): Promise<OrderItem[]>;
  createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem>;

  // Reviews
  getProductReviews(productId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;

  // Cart
  getCartItems(userId: number): Promise<CartItem[]>;
  addToCart(cartItem: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: number): Promise<boolean>;
  clearCart(userId: number): Promise<boolean>;

  // Favorites
  getFavorites(userId: number): Promise<Favorite[]>;
  addToFavorites(favorite: InsertFavorite): Promise<Favorite>;
  removeFromFavorites(userId: number, productId: number): Promise<boolean>;
  isFavorite(userId: number, productId: number): Promise<boolean>;

  // Messages
  getMessages(vendorId: number): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  markMessageAsRead(id: number): Promise<Message | undefined>;

  // Suppliers
  getSuppliers(vendorId: number): Promise<Supplier[]>;
  createSupplier(supplier: InsertSupplier): Promise<Supplier>;
  updateSupplier(id: number, updates: Partial<InsertSupplier>): Promise<Supplier | undefined>;
  deleteSupplier(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private vendors: Map<number, Vendor>;
  private categories: Map<number, Category>;
  private products: Map<number, Product>;
  private orders: Map<number, Order>;
  private orderItems: Map<number, OrderItem>;
  private reviews: Map<number, Review>;
  private cartItems: Map<number, CartItem>;
  private favorites: Map<number, Favorite>;
  private messages: Map<number, Message>;
  private suppliers: Map<number, Supplier>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.vendors = new Map();
    this.categories = new Map();
    this.products = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    this.reviews = new Map();
    this.cartItems = new Map();
    this.favorites = new Map();
    this.messages = new Map();
    this.suppliers = new Map();
    this.currentId = 1;

    this.seedData();
  }

  private seedData() {
    // Seed categories
    const categoriesData = [
      { name: "Electronics", icon: "laptop", slug: "electronics" },
      { name: "Fashion", icon: "tshirt", slug: "fashion" },
      { name: "Home & Garden", icon: "home", slug: "home-garden" },
      { name: "Sports", icon: "gamepad", slug: "sports" },
      { name: "Books", icon: "book", slug: "books" },
      { name: "Beauty", icon: "sparkles", slug: "beauty" },
      { name: "Toys", icon: "gamepad2", slug: "toys" },
      { name: "Automotive", icon: "car", slug: "automotive" }
    ];

    categoriesData.forEach(cat => {
      const category: Category = { ...cat, id: this.currentId++ };
      this.categories.set(category.id, category);
    });

    // Seed a test user and vendor
    const testUser: User = {
      id: this.currentId++,
      username: "testvendor",
      email: "vendor@test.com",
      password: "password123",
      firstName: "John",
      lastName: "Doe",
      isVendor: true,
      createdAt: new Date()
    };
    this.users.set(testUser.id, testUser);

    const testVendor: Vendor = {
      id: this.currentId++,
      userId: testUser.id,
      storeName: "TechGear Solutions",
      storeDescription: "Premium electronics and gadgets",
      rating: "4.8",
      totalSales: 1250,
      isApproved: true,
      createdAt: new Date()
    };
    this.vendors.set(testVendor.id, testVendor);

    // Create multiple vendors with diverse offerings
    const vendors = [
      {
        storeName: "Fashion Forward",
        storeDescription: "Trendy fashion and accessories for modern lifestyle",
        rating: "4.6",
        totalSales: 890,
      },
      {
        storeName: "Home & Garden Plus",
        storeDescription: "Everything for your home and garden needs",
        rating: "4.3",
        totalSales: 645,
      },
      {
        storeName: "Sports World",
        storeDescription: "Premium sports equipment and athletic wear",
        rating: "4.7",
        totalSales: 1150,
      },
      {
        storeName: "Beauty Boutique",
        storeDescription: "Natural and organic beauty products",
        rating: "4.5",
        totalSales: 720,
      },
      {
        storeName: "Book Haven",
        storeDescription: "Rare books, bestsellers, and educational materials",
        rating: "4.8",
        totalSales: 580,
      },
      {
        storeName: "Toy Paradise",
        storeDescription: "Safe and fun toys for children of all ages",
        rating: "4.4",
        totalSales: 950,
      },
      {
        storeName: "Auto Parts Pro",
        storeDescription: "Quality automotive parts and accessories",
        rating: "4.6",
        totalSales: 1020,
      },
      {
        storeName: "Gadget Galaxy",
        storeDescription: "Latest gadgets and tech accessories",
        rating: "4.7",
        totalSales: 1340,
      },
      {
        storeName: "Eco Living",
        storeDescription: "Sustainable and eco-friendly products",
        rating: "4.9",
        totalSales: 430,
      },
      {
        storeName: "Kitchen Masters",
        storeDescription: "Professional cooking tools and kitchenware",
        rating: "4.5",
        totalSales: 780,
      }
    ];

    const createdVendors: Vendor[] = [];
    vendors.forEach(vendorData => {
      const vendor: Vendor = {
        id: this.currentId++,
        userId: testUser.id,
        ...vendorData,
        isApproved: true,
        createdAt: new Date()
      };
      this.vendors.set(vendor.id, vendor);
      createdVendors.push(vendor);
    });

    // Get vendor references for products
    const fashionVendor = createdVendors[0]; // Fashion Forward
    const homeVendor = createdVendors[1]; // Home & Garden Plus  
    const sportsVendor = createdVendors[2]; // Sports World
    const beautyVendor = createdVendors[3]; // Beauty Boutique
    const bookVendor = createdVendors[4]; // Book Haven
    const toyVendor = createdVendors[5]; // Toy Paradise
    const autoVendor = createdVendors[6]; // Auto Parts Pro
    const gadgetVendor = createdVendors[7]; // Gadget Galaxy

    // Seed many products
    const productsData = [
      // Electronics
      {
        vendorId: testVendor.id,
        categoryId: 1,
        name: "Premium Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation",
        price: "79.99",
        originalPrice: "99.99",
        stock: 50,
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.5",
        reviewCount: 124
      },
      {
        vendorId: testVendor.id,
        categoryId: 1,
        name: "Ultra-thin Laptop Pro",
        description: "Professional laptop with latest specs",
        price: "899.99",
        stock: 25,
        imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.7",
        reviewCount: 156
      },
      {
        vendorId: testVendor.id,
        categoryId: 1,
        name: "Smartphone X Pro",
        description: "Latest smartphone with amazing camera",
        price: "599.99",
        originalPrice: "699.99",
        stock: 75,
        imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.8",
        reviewCount: 203
      },
      {
        vendorId: testVendor.id,
        categoryId: 1,
        name: "Wireless Gaming Mouse",
        description: "Professional gaming mouse with RGB lighting",
        price: "49.99",
        stock: 120,
        imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.4",
        reviewCount: 89
      },
      // Fashion
      {
        vendorId: fashionVendor.id,
        categoryId: 2,
        name: "Designer Jeans",
        description: "Premium denim jeans with perfect fit",
        price: "129.99",
        originalPrice: "159.99",
        stock: 40,
        imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.6",
        reviewCount: 67
      },
      {
        vendorId: fashionVendor.id,
        categoryId: 2,
        name: "Summer Dress",
        description: "Elegant summer dress for all occasions",
        price: "89.99",
        stock: 60,
        imageUrl: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.7",
        reviewCount: 112
      },
      {
        vendorId: fashionVendor.id,
        categoryId: 2,
        name: "Leather Jacket",
        description: "Genuine leather jacket for style",
        price: "199.99",
        originalPrice: "249.99",
        stock: 25,
        imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.5",
        reviewCount: 45
      },
      // Home & Garden
      {
        vendorId: homeVendor.id,
        categoryId: 3,
        name: "Modern Coffee Table",
        description: "Stylish coffee table for your living room",
        price: "299.99",
        stock: 15,
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.3",
        reviewCount: 34
      },
      {
        vendorId: homeVendor.id,
        categoryId: 3,
        name: "Garden Tool Set",
        description: "Complete set of garden tools",
        price: "79.99",
        originalPrice: "99.99",
        stock: 35,
        imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.4",
        reviewCount: 78
      },
      // Sports
      {
        vendorId: testVendor.id,
        categoryId: 4,
        name: "Running Shoes",
        description: "Professional running shoes for athletes",
        price: "149.99",
        originalPrice: "179.99",
        stock: 80,
        imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.8",
        reviewCount: 167
      },
      {
        vendorId: sportsVendor.id,
        categoryId: 4,
        name: "Yoga Mat",
        description: "Premium non-slip yoga mat",
        price: "39.99",
        stock: 90,
        imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.5",
        reviewCount: 92
      },
      // Books
      {
        vendorId: beautyVendor.id,
        categoryId: 5,
        name: "Programming Guide",
        description: "Complete guide to modern programming",
        price: "29.99",
        stock: 100,
        imageUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.7",
        reviewCount: 145
      },
      {
        vendorId: sportsVendor.id,
        categoryId: 5,
        name: "Science Fiction Novel",
        description: "Epic space adventure story",
        price: "19.99",
        originalPrice: "24.99",
        stock: 65,
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.4",
        reviewCount: 89
      },
      // More Electronics
      {
        vendorId: testVendor.id,
        categoryId: 1,
        name: "4K Smart TV",
        description: "55-inch 4K Ultra HD Smart TV with HDR",
        price: "449.99",
        originalPrice: "599.99",
        stock: 20,
        imageUrl: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.6",
        reviewCount: 178
      },
      {
        vendorId: sportsVendor.id,
        categoryId: 1,
        name: "Bluetooth Speaker",
        description: "Portable waterproof Bluetooth speaker",
        price: "59.99",
        stock: 85,
        imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.3",
        reviewCount: 142
      },
      {
        vendorId: testVendor.id,
        categoryId: 1,
        name: "Mechanical Keyboard",
        description: "RGB backlit mechanical gaming keyboard",
        price: "89.99",
        originalPrice: "119.99",
        stock: 45,
        imageUrl: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.7",
        reviewCount: 156
      },
      {
        vendorId: beautyVendor.id,
        categoryId: 1,
        name: "Wireless Charger",
        description: "Fast wireless charging pad for all devices",
        price: "29.99",
        stock: 95,
        imageUrl: "https://images.unsplash.com/photo-1580910051074-3eb694886505?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.2",
        reviewCount: 73
      },
      // More Fashion
      {
        vendorId: sportsVendor.id,
        categoryId: 2,
        name: "Classic T-Shirt",
        description: "Premium cotton classic fit t-shirt",
        price: "24.99",
        stock: 150,
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.5",
        reviewCount: 234
      },
      {
        vendorId: sportsVendor.id,
        categoryId: 2,
        name: "Winter Coat",
        description: "Warm winter coat for cold weather",
        price: "159.99",
        originalPrice: "199.99",
        stock: 30,
        imageUrl: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.6",
        reviewCount: 98
      },
      {
        vendorId: beautyVendor.id,
        categoryId: 2,
        name: "Sneakers Collection",
        description: "Trendy casual sneakers for everyday wear",
        price: "79.99",
        stock: 75,
        imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.4",
        reviewCount: 187
      },
      {
        vendorId: sportsVendor.id,
        categoryId: 2,
        name: "Designer Handbag",
        description: "Elegant leather handbag for professionals",
        price: "199.99",
        originalPrice: "249.99",
        stock: 25,
        imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.8",
        reviewCount: 156
      },
      // More Home & Garden
      {
        vendorId: beautyVendor.id,
        categoryId: 3,
        name: "LED Floor Lamp",
        description: "Modern LED floor lamp with dimmer",
        price: "89.99",
        stock: 40,
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.3",
        reviewCount: 67
      },
      {
        vendorId: testVendor.id,
        categoryId: 3,
        name: "Kitchen Knife Set",
        description: "Professional chef knife set with block",
        price: "129.99",
        originalPrice: "169.99",
        stock: 35,
        imageUrl: "https://images.unsplash.com/photo-1593618998160-e34014e67546?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.7",
        reviewCount: 123
      },
      {
        vendorId: beautyVendor.id,
        categoryId: 3,
        name: "Plant Collection",
        description: "Set of 3 indoor plants for home decoration",
        price: "49.99",
        stock: 60,
        imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.5",
        reviewCount: 145
      },
      {
        vendorId: sportsVendor.id,
        categoryId: 3,
        name: "Throw Pillows Set",
        description: "Decorative throw pillows for sofa",
        price: "39.99",
        stock: 85,
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.2",
        reviewCount: 92
      },
      // More Sports
      {
        vendorId: testVendor.id,
        categoryId: 4,
        name: "Basketball",
        description: "Official size basketball for outdoor play",
        price: "34.99",
        stock: 70,
        imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.4",
        reviewCount: 134
      },
      {
        vendorId: sportsVendor.id,
        categoryId: 4,
        name: "Fitness Tracker",
        description: "Smart fitness tracker with heart rate monitor",
        price: "99.99",
        originalPrice: "129.99",
        stock: 55,
        imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.6",
        reviewCount: 189
      },
      {
        vendorId: beautyVendor.id,
        categoryId: 4,
        name: "Dumbbells Set",
        description: "Adjustable dumbbells for home gym",
        price: "149.99",
        stock: 25,
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.5",
        reviewCount: 78
      },
      {
        vendorId: testVendor.id,
        categoryId: 4,
        name: "Tennis Racket",
        description: "Professional tennis racket for competitive play",
        price: "119.99",
        originalPrice: "149.99",
        stock: 30,
        imageUrl: "https://images.unsplash.com/photo-1544718187-0275d7c35ba9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.7",
        reviewCount: 156
      },
      // More Books
      {
        vendorId: beautyVendor.id,
        categoryId: 5,
        name: "Cookbook Collection",
        description: "International recipes cookbook",
        price: "34.99",
        stock: 45,
        imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.6",
        reviewCount: 201
      },
      {
        vendorId: testVendor.id,
        categoryId: 5,
        name: "Business Strategy Guide",
        description: "Essential guide for business success",
        price: "39.99",
        originalPrice: "49.99",
        stock: 65,
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.5",
        reviewCount: 178
      },
      {
        vendorId: sportsVendor.id,
        categoryId: 5,
        name: "Art & Design Book",
        description: "Visual guide to modern art and design",
        price: "44.99",
        stock: 35,
        imageUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.8",
        reviewCount: 87
      },
      // Beauty Products
      {
        vendorId: sportsVendor.id,
        categoryId: 6,
        name: "Skincare Set",
        description: "Complete skincare routine for glowing skin",
        price: "89.99",
        originalPrice: "109.99",
        stock: 40,
        imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.7",
        reviewCount: 156
      },
      {
        vendorId: beautyVendor.id,
        categoryId: 6,
        name: "Professional Makeup Kit",
        description: "Complete makeup kit for professionals",
        price: "129.99",
        stock: 25,
        imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.8",
        reviewCount: 198
      },
      {
        vendorId: sportsVendor.id,
        categoryId: 6,
        name: "Hair Care Bundle",
        description: "Shampoo, conditioner and styling products",
        price: "59.99",
        originalPrice: "79.99",
        stock: 60,
        imageUrl: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.5",
        reviewCount: 143
      },
      // Toys
      {
        vendorId: beautyVendor.id,
        categoryId: 7,
        name: "Building Blocks Set",
        description: "Educational building blocks for kids",
        price: "39.99",
        stock: 85,
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.6",
        reviewCount: 267
      },
      {
        vendorId: testVendor.id,
        categoryId: 7,
        name: "Remote Control Car",
        description: "High-speed remote control racing car",
        price: "79.99",
        originalPrice: "99.99",
        stock: 45,
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.4",
        reviewCount: 124
      },
      {
        vendorId: sportsVendor.id,
        categoryId: 7,
        name: "Board Game Collection",
        description: "Classic board games for family fun",
        price: "49.99",
        stock: 55,
        imageUrl: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.7",
        reviewCount: 189
      },
      // Automotive
      {
        vendorId: testVendor.id,
        categoryId: 8,
        name: "Car Phone Mount",
        description: "Universal car phone holder for dashboard",
        price: "24.99",
        stock: 120,
        imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.3",
        reviewCount: 234
      },
      {
        vendorId: beautyVendor.id,
        categoryId: 8,
        name: "Car Care Kit",
        description: "Complete car cleaning and maintenance kit",
        price: "69.99",
        originalPrice: "89.99",
        stock: 35,
        imageUrl: "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.5",
        reviewCount: 167
      },
      {
        vendorId: testVendor.id,
        categoryId: 8,
        name: "Dash Camera",
        description: "HD dash camera with night vision",
        price: "149.99",
        stock: 25,
        imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.6",
        reviewCount: 145
      }
    ];

    productsData.forEach(prod => {
      const product: Product = {
        ...prod,
        id: this.currentId++,
        isActive: true,
        originalPrice: prod.originalPrice || null,
        description: prod.description || null,
        imageUrl: prod.imageUrl || null,
        createdAt: new Date()
      };
      this.products.set(product.id, product);
    });

    // Add test orders for vendor@test.com (TechGear Solutions)
    const testOrdersData = [
      {
        userId: testUser.id,
        vendorId: testVendor.id,
        status: "completed",
        totalAmount: "129.98",
        shippingAddress: "123 Main St, New York, NY 10001",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
      },
      {
        userId: testUser.id,
        vendorId: testVendor.id,
        status: "processing",
        totalAmount: "79.99",
        shippingAddress: "456 Oak Ave, Los Angeles, CA 90210",
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
      },
      {
        userId: testUser.id,
        vendorId: testVendor.id,
        status: "shipped",
        totalAmount: "249.97",
        shippingAddress: "789 Pine Rd, Chicago, IL 60601",
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000) // 5 hours ago
      }
    ];

    testOrdersData.forEach(orderData => {
      const order: Order = {
        ...orderData,
        id: this.currentId++,
        createdAt: orderData.createdAt
      };
      this.orders.set(order.id, order);
    });

    // Add test messages for vendor@test.com (TechGear Solutions)
    const testMessagesData = [
      {
        vendorId: testVendor.id,
        senderName: "Анна Смирнова",
        senderEmail: "anna.smirnova@email.ru",
        subject: "Вопрос о наушниках",
        message: "Здравствуйте! Хотела бы узнать, есть ли у вас в наличии беспроводные наушники Premium? И какая гарантия на них предоставляется?",
        isRead: false,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
      },
      {
        vendorId: testVendor.id,
        senderName: "Дмитрий Петров",
        senderEmail: "dmitry.petrov@company.com",
        subject: "Оптовая закупка",
        message: "Добрый день! Интересует возможность оптовой закупки ваших товаров для нашей компании. Можете предоставить прайс-лист с оптовыми ценами?",
        isRead: true,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
      },
      {
        vendorId: testVendor.id,
        senderName: "Елена Козлова",
        senderEmail: "elena.kozlova@gmail.com",
        subject: "Проблема с заказом",
        message: "Здравствуйте! У меня проблема с заказом #12345. Товар пришел поврежденным. Как можно оформить возврат или обмен?",
        isRead: false,
        createdAt: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes ago
      }
    ];

    testMessagesData.forEach(msgData => {
      const message: Message = {
        ...msgData,
        id: this.currentId++,
        createdAt: msgData.createdAt
      };
      this.messages.set(message.id, message);
    });

    // Add test suppliers for vendor@test.com (TechGear Solutions)
    const testSuppliersData = [
      {
        vendorId: testVendor.id,
        name: "Electronics Wholesale Ltd",
        contact: "John Smith",
        email: "john@electronics-wholesale.com",
        phone: "+1 (555) 123-4567",
        address: "123 Business St, Tech City, TC 12345",
        products: "Smartphones, Laptops, Tablets",
        status: 'active',
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) // 10 days ago
      },
      {
        vendorId: testVendor.id,
        name: "Global Components Inc",
        contact: "Sarah Johnson",
        email: "sarah@globalcomponents.com",
        phone: "+1 (555) 987-6543",
        address: "456 Supply Ave, Component City, CC 67890",
        products: "Phone Accessories, Charging Cables",
        status: 'active',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
      },
      {
        vendorId: testVendor.id,
        name: "Mobile Tech Distributors",
        contact: "Mike Chen",
        email: "mike@mobiletech.com",
        phone: "+1 (555) 456-7890",
        address: "789 Tech Park Dr, Silicon Valley, CA 94088",
        products: "Wireless Headphones, Smart Watches, Tablets",
        status: 'active',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
      }
    ];

    testSuppliersData.forEach(supplierData => {
      const supplier: Supplier = {
        ...supplierData,
        id: this.currentId++,
        phone: supplierData.phone,
        address: supplierData.address,
        products: supplierData.products,
        status: supplierData.status as any,
        createdAt: supplierData.createdAt
      };
      this.suppliers.set(supplier.id, supplier);
    });
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { 
      ...insertUser, 
      id, 
      isVendor: insertUser.isVendor || false,
      createdAt: new Date() 
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updates: Partial<InsertUser>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Vendors
  async getVendor(id: number): Promise<Vendor | undefined> {
    return this.vendors.get(id);
  }

  async getVendorByUserId(userId: number): Promise<Vendor | undefined> {
    return Array.from(this.vendors.values()).find(vendor => vendor.userId === userId);
  }

  async getVendors(): Promise<Vendor[]> {
    return Array.from(this.vendors.values());
  }

  async getFeaturedVendors(): Promise<Vendor[]> {
    return Array.from(this.vendors.values())
      .filter(vendor => vendor.isApproved)
      .sort((a, b) => parseFloat(b.rating || "0") - parseFloat(a.rating || "0"))
      .slice(0, 6);
  }

  async createVendor(insertVendor: InsertVendor): Promise<Vendor> {
    const id = this.currentId++;
    const vendor: Vendor = {
      ...insertVendor,
      id,
      rating: "0.00",
      totalSales: 0,
      storeDescription: insertVendor.storeDescription || null,
      isApproved: insertVendor.isApproved || true,
      createdAt: new Date()
    };
    this.vendors.set(id, vendor);
    return vendor;
  }

  async updateVendor(id: number, updates: Partial<InsertVendor>): Promise<Vendor | undefined> {
    const vendor = this.vendors.get(id);
    if (!vendor) return undefined;
    const updatedVendor = { ...vendor, ...updates };
    this.vendors.set(id, updatedVendor);
    return updatedVendor;
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategory(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  // Products
  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.isActive);
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return Array.from(this.products.values())
      .filter(product => product.categoryId === categoryId && product.isActive);
  }

  async getProductsByVendor(vendorId: number): Promise<Product[]> {
    return Array.from(this.products.values())
      .filter(product => product.vendorId === vendorId);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values())
      .filter(product => product.isActive)
      .sort((a, b) => parseFloat(b.rating || "0") - parseFloat(a.rating || "0"))
      .slice(0, 8);
  }

  async searchProducts(query: string): Promise<Product[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.products.values())
      .filter(product =>
        product.isActive &&
        (product.name.toLowerCase().includes(lowerQuery) ||
         product.description?.toLowerCase().includes(lowerQuery))
      );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentId++;
    const product: Product = {
      ...insertProduct,
      id,
      rating: "0.00",
      reviewCount: 0,
      description: insertProduct.description || null,
      originalPrice: insertProduct.originalPrice || null,
      stock: insertProduct.stock || 0,
      imageUrl: insertProduct.imageUrl || null,
      isActive: insertProduct.isActive ?? true,
      createdAt: new Date()
    };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: number, updates: Partial<InsertProduct>): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;
    const updatedProduct = { ...product, ...updates };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  async deleteProduct(id: number): Promise<boolean> {
    return this.products.delete(id);
  }

  // Orders
  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async getOrdersByUser(userId: number): Promise<Order[]> {
    return Array.from(this.orders.values())
      .filter(order => order.userId === userId);
  }

  async getOrdersByVendor(vendorId: number): Promise<Order[]> {
    return Array.from(this.orders.values())
      .filter(order => order.vendorId === vendorId);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentId++;
    const order: Order = { 
      ...insertOrder, 
      id, 
      status: insertOrder.status || "pending",
      createdAt: new Date() 
    };
    this.orders.set(id, order);
    return order;
  }

  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;
    const updatedOrder = { ...order, status };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }

  // Order Items
  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    return Array.from(this.orderItems.values())
      .filter(item => item.orderId === orderId);
  }

  async createOrderItem(insertOrderItem: InsertOrderItem): Promise<OrderItem> {
    const id = this.currentId++;
    const orderItem: OrderItem = { ...insertOrderItem, id };
    this.orderItems.set(id, orderItem);
    return orderItem;
  }

  // Reviews
  async getProductReviews(productId: number): Promise<Review[]> {
    return Array.from(this.reviews.values())
      .filter(review => review.productId === productId);
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.currentId++;
    const review: Review = { 
      ...insertReview, 
      id, 
      comment: insertReview.comment || null,
      createdAt: new Date() 
    };
    this.reviews.set(id, review);
    return review;
  }

  // Cart
  async getCartItems(userId: number): Promise<CartItem[]> {
    return Array.from(this.cartItems.values())
      .filter(item => item.userId === userId);
  }

  async addToCart(insertCartItem: InsertCartItem): Promise<CartItem> {
    // Check if item already exists in cart
    const existingItem = Array.from(this.cartItems.values())
      .find(item => item.userId === insertCartItem.userId && item.productId === insertCartItem.productId);
    
    if (existingItem) {
      existingItem.quantity += insertCartItem.quantity;
      this.cartItems.set(existingItem.id, existingItem);
      return existingItem;
    }

    const id = this.currentId++;
    const cartItem: CartItem = { ...insertCartItem, id };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem | undefined> {
    const cartItem = this.cartItems.get(id);
    if (!cartItem) return undefined;
    const updatedItem = { ...cartItem, quantity };
    this.cartItems.set(id, updatedItem);
    return updatedItem;
  }

  async removeFromCart(id: number): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async clearCart(userId: number): Promise<boolean> {
    const userCartItems = Array.from(this.cartItems.entries())
      .filter(([_, item]) => item.userId === userId);
    
    userCartItems.forEach(([id]) => this.cartItems.delete(id));
    return true;
  }

  // Favorites methods
  async getFavorites(userId: number): Promise<Favorite[]> {
    return Array.from(this.favorites.values())
      .filter(favorite => favorite.userId === userId);
  }

  async addToFavorites(insertFavorite: InsertFavorite): Promise<Favorite> {
    // Check if already in favorites
    const existingFavorite = Array.from(this.favorites.values())
      .find(fav => fav.userId === insertFavorite.userId && fav.productId === insertFavorite.productId);
    
    if (existingFavorite) {
      return existingFavorite;
    }

    const id = this.currentId++;
    const favorite: Favorite = { 
      ...insertFavorite, 
      id, 
      createdAt: new Date() 
    };
    this.favorites.set(id, favorite);
    return favorite;
  }

  async removeFromFavorites(userId: number, productId: number): Promise<boolean> {
    const favoriteEntry = Array.from(this.favorites.entries())
      .find(([_, fav]) => fav.userId === userId && fav.productId === productId);
    
    if (favoriteEntry) {
      this.favorites.delete(favoriteEntry[0]);
      return true;
    }
    return false;
  }

  async isFavorite(userId: number, productId: number): Promise<boolean> {
    return Array.from(this.favorites.values())
      .some(fav => fav.userId === userId && fav.productId === productId);
  }

  // Messages
  async getMessages(vendorId: number): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter(message => message.vendorId === vendorId)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.currentId++;
    const message: Message = {
      ...insertMessage,
      id,
      isRead: insertMessage.isRead || false,
      createdAt: new Date()
    };
    this.messages.set(id, message);
    return message;
  }

  async markMessageAsRead(id: number): Promise<Message | undefined> {
    const message = this.messages.get(id);
    if (!message) return undefined;
    const updatedMessage = { ...message, isRead: true };
    this.messages.set(id, updatedMessage);
    return updatedMessage;
  }

  // Suppliers
  async getSuppliers(vendorId: number): Promise<Supplier[]> {
    return Array.from(this.suppliers.values())
      .filter(supplier => supplier.vendorId === vendorId)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async createSupplier(insertSupplier: InsertSupplier): Promise<Supplier> {
    const id = this.currentId++;
    const supplier: Supplier = {
      id,
      vendorId: insertSupplier.vendorId,
      name: insertSupplier.name,
      contact: insertSupplier.contact,
      email: insertSupplier.email,
      phone: insertSupplier.phone || null,
      address: insertSupplier.address || null,
      products: insertSupplier.products || null,
      status: insertSupplier.status || 'active',
      createdAt: new Date()
    };
    this.suppliers.set(id, supplier);
    return supplier;
  }

  async updateSupplier(id: number, updates: Partial<InsertSupplier>): Promise<Supplier | undefined> {
    const supplier = this.suppliers.get(id);
    if (!supplier) return undefined;
    const updatedSupplier = { ...supplier, ...updates };
    this.suppliers.set(id, updatedSupplier);
    return updatedSupplier;
  }

  async deleteSupplier(id: number): Promise<boolean> {
    return this.suppliers.delete(id);
  }
}

export const storage = new MemStorage();
