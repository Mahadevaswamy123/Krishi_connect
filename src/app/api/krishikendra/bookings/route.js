import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

// Handle GET request to fetch all bookings
export async function GET() {
  try {
    // Get session to check if the user is authenticated
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Check if user is a krishikendra
    if (session.user.role !== "KRISHI_KENDRA") {
      return NextResponse.json({ message: "Only krishikendra can view bookings" }, { status: 403 });
    }

    // Fetch all bookings with related data
    const bookings = await prisma.booking.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        product: {
          select: {
            id: true,
            name: true,
            type: true,
            price: true,
            quantity: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json({ message: "Error fetching bookings" }, { status: 500 });
  }
}

// Handle PATCH request to update booking status
export async function PATCH(req) {
  try {
    // Get session to check if the user is authenticated
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Check if user is a krishikendra
    if (session.user.role !== "KRISHI_KENDRA") {
      return NextResponse.json({ message: "Only krishikendra can update booking status" }, { status: 403 });
    }

    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ message: "Booking ID and status are required" }, { status: 400 });
    }

    // Validate status
    const validStatuses = ["Pending", "Approved", "Rejected"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ message: "Invalid status. Must be Pending, Approved, or Rejected" }, { status: 400 });
    }

    // Find the booking and update its status
    const booking = await prisma.booking.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        product: {
          select: {
            id: true,
            name: true,
            type: true,
            price: true,
            quantity: true
          }
        }
      }
    });

    if (!booking) {
      return NextResponse.json({ message: "Booking not found" }, { status: 404 });
    }

    // Update the booking status
    const updatedBooking = await prisma.booking.update({
      where: { id: parseInt(id) },
      data: { status },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        product: {
          select: {
            id: true,
            name: true,
            type: true,
            price: true,
            quantity: true
          }
        }
      }
    });

    // If approved, reduce product quantity
    if (status === "Approved" && booking.status === "Pending") {
      await prisma.product.update({
        where: { id: booking.productId },
        data: {
          quantity: {
            decrement: 1
          }
        }
      });
    }

    return NextResponse.json({ 
      message: "Booking status updated successfully", 
      booking: updatedBooking 
    }, { status: 200 });
  } catch (error) {
    console.error("Error updating booking status:", error);
    return NextResponse.json({ message: "Error updating booking status" }, { status: 500 });
  }
}
