import prisma from "@/lib/prisma";

// GET method - Fetch user profile
export async function GET(req) {
  // Assuming you have some kind of user authentication middleware
  // that puts user info (e.g., userId) in the request
  const userId = req.user?.id; // Replace with your actual user ID extraction logic

  if (!userId) {
    return new Response(JSON.stringify({ error: "User not authenticated" }), {
      status: 401,
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true },
    });
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error fetching profile" }), {
      status: 500,
    });
  }
}

// PUT method - Update user profile
export async function PUT(req) {
  const { name, email } = await req.json();

  // Assuming you have some kind of user authentication middleware
  const userId = req.user?.id; // Replace with your actual user ID extraction logic

  if (!userId) {
    return new Response(JSON.stringify({ error: "User not authenticated" }), {
      status: 401,
    });
  }

  if (!name || !email) {
    return new Response(
      JSON.stringify({ error: "Name and email are required" }),
      { status: 400 }
    );
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name, email },
      select: { id: true, name: true, email: true },
    });
    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error updating profile" }), {
      status: 500,
    });
  }
}
