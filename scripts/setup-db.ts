import { seedDatabase } from "../server/seed";

async function setupDatabase() {
  console.log("🚀 Setting up database...");
  
  try {
    await seedDatabase();
    console.log("✅ Database setup completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Database setup failed:", error);
    process.exit(1);
  }
}

setupDatabase();