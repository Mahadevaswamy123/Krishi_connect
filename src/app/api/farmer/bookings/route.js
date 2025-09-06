import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

// Handle GET request to fetch farmer's own bookings
export async function GET() {
  try {
    // Get session to check if the user is authenticated
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Check if user is a farmer
    if (session.user.role !== "FARMER") {
      return NextResponse.json({ message: "Only farmers can view their bookings" }, { status: 403 });
    }

    // Fetch farmer's bookings with related data
    const bookings = await prisma.booking.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            type: true,
            price: true,
            quantity: true,
            image: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error("Error fetching farmer bookings:", error);
    return NextResponse.json({ message: "Error fetching bookings" }, { status: 500 });
  }
}
