// /app/api/krishikendra/bookings/route.js

// Simulating bookings data for now
let bookings = [
  {
    id: 1,
    product: { name: "Seed A" },
    farmer: { name: "Farmer 1" },
    status: "Pending",
  },
  {
    id: 2,
    product: { name: "Seed B" },
    farmer: { name: "Farmer 2" },
    status: "Approved",
  },
  {
    id: 3,
    product: { name: "Fertilizer X" },
    farmer: { name: "Farmer 3" },
    status: "Rejected",
  },
];

// Handle GET request to fetch all bookings
export async function GET() {
  return new Response(JSON.stringify(bookings), {
    status: 200,
  });
}

// Handle PATCH request to update booking status
export async function PATCH(req) {
  const { id, status } = await req.json();

  // Find the booking and update its status
  const bookingIndex = bookings.findIndex((booking) => booking.id === id);
  if (bookingIndex === -1) {
    return new Response(JSON.stringify({ message: "Booking not found" }), {
      status: 404,
    });
  }

  bookings[bookingIndex].status = status;

  // Return updated booking status
  return new Response(JSON.stringify(bookings[bookingIndex]), {
    status: 200,
  });
}
