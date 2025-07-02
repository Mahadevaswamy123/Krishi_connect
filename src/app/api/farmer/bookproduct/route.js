import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma"; // Assuming you have prisma client setup here

// POST method to book a product
export async function POST(req) {
  try {
    // Ensure body is parsed
    const body = await req.json(); // Explicitly parse the body

    const { productId } = body;
    if (!productId) {
      return new Response(
        JSON.stringify({ message: "Product ID is required" }),
        { status: 400 }
      );
    }

    // Get session to check if the user is authenticated
    const session = await getSession({ req });
    if (!session) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    // Fetch the product to ensure it exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return new Response(JSON.stringify({ message: "Product not found" }), {
        status: 404,
      });
    }

    // Create the booking in the database
    const booking = await prisma.booking.create({
      data: {
        userId: session.user.id, // Use the user ID from the session
        productId: product.id, // Use the product ID from the request
        status: "Pending", // Default status for the booking
      },
    });

    // Return success response
    return new Response(
      JSON.stringify({ message: "Product booked successfully", booking }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error booking product:", error);
    return new Response(JSON.stringify({ message: "Error booking product" }), {
      status: 500,
    });
  }
}
