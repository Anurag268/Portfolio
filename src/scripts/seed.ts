import mongoose from 'mongoose';

import { Portfolio } from '../models/Portfolio';
import { portfolioData } from '../data/portfolio';

const MONGODB_URI = process.env.MONGODB_URI;

async function seed() {
  if (!MONGODB_URI) {
    console.error("No MONGODB_URI found in .env.local");
    process.exit(1);
  }

  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected.");

  console.log("Clearing existing Portfolio documents...");
  await Portfolio.deleteMany({});

  console.log("Seeding new portfolio data...");
  const newPortfolio = await Portfolio.create(portfolioData);
  
  console.log("Successfully seeded Portfolio with ID:", newPortfolio._id);
  
  await mongoose.disconnect();
  console.log("Disconnected.");
}

seed().catch(console.error);
