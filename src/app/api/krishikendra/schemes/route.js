import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Handle GET request to fetch all schemes
export async function GET() {
  try {
    const schemes = await prisma.scheme.findMany(); // Fetch all schemes from the database
    return new Response(JSON.stringify(schemes), { status: 200 });
  } catch (error) {
    console.error("Error fetching schemes:", error);
    return new Response(JSON.stringify({ message: "Error fetching schemes" }), {
      status: 500,
    });
  }
}

// Handle POST request to add a new scheme
export async function POST(req) {
  try {
    const { title, description } = await req.json();

    if (!title || !description) {
      return new Response(
        JSON.stringify({ message: "Title and description are required." }),
        { status: 400 }
      );
    }

    // Create a new scheme record in the database using Prisma
    const newScheme = await prisma.scheme.create({
      data: {
        title,
        description,
      },
    });

    return new Response(JSON.stringify(newScheme), { status: 201 });
  } catch (error) {
    console.error("Error saving scheme:", error);
    return new Response(JSON.stringify({ message: "Error saving scheme" }), {
      status: 500,
    });
  }
}
