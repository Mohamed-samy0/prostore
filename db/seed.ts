import { PrismaClient } from "@/lib/generated/prisma";
import sampleData from "./sample-data";
import { config } from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";
config({ path: ".env" });

import { Pool } from "pg";

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });
  await prisma.product.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();

  await prisma.product.createMany({ data: sampleData.products });
  await prisma.user.createMany({ data: sampleData.users });
  console.log("DataBase Sucsses");
}

main();
