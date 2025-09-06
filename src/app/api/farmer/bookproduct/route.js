import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

// POST method to book a product
export async function POST(req) {
  try {
    // Get session to check if the user is authenticated
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Check if user is a farmer
    if (session.user.role !== "FARMER") {
      return NextResponse.json({ message: "Only farmers can book products" }, { status: 403 });
    }

    // Ensure body is parsed
    const body = await req.json();
    const { productId } = body;
    
    if (!productId) {
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 }
      );
    }

    // Fetch the product to ensure it exists
    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
    });

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    // Check if product has available quantity
    if (product.quantity <= 0) {
      return NextResponse.json({ message: "Product is out of stock" }, { status: 400 });
    }

    // Check if user already has a pending booking for this product
    const existingBooking = await prisma.booking.findFirst({
      where: {
        userId: session.user.id,
        productId: parseInt(productId),
        status: "Pending"
      }
    });

    if (existingBooking) {
      return NextResponse.json({ message: "You already have a pending booking for this product" }, { status: 400 });
    }

    // Create the booking in the database
    const booking = await prisma.booking.create({
      data: {
        userId: session.user.id,
        productId: parseInt(productId),
        status: "Pending",
      },
      include: {
        product: true,
        user: true
      }
    });

    // Return success response
    return NextResponse.json(
      { message: "Product booked successfully", booking },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error booking product:", error);
    return NextResponse.json({ message: "Error booking product" }, { status: 500 });
  }
}
