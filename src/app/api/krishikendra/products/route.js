// /app/api/krishikendra/product/route.js

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// POST request: To create a new product
export async function POST(req) {
  try {
    // Parse JSON data from the request body
    const { name, type, quantity, price, image } = await req.json();

    // Save product data to the database
    const product = await prisma.product.create({
      data: {
        name,
        type,
        quantity: parseInt(quantity), // Ensure the quantity is a number
        price: parseFloat(price), // Ensure the price is a number
        image, // Store the Base64 image string
      },
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error("Error saving product:", error);
    return NextResponse.json(
      { error: "Error saving product" },
      { status: 500 }
    );
  }
}

// GET request: To fetch all products
export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Error fetching products" },
      { status: 500 }
    );
  }
}
