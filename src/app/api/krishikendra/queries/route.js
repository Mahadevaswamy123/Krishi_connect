import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); // Instantiate Prisma Client

// POST method to add a new problem query
export async function POST(req) {
  try {
    // Parse the request body
    const { title, description, image } = await req.json();

    // Basic validation for required fields
    if (!title || !description) {
      return new Response(
        JSON.stringify({ message: "Title and description are required." }),
        { status: 400 }
      );
    }

    // Create a new problem query in the database using Prisma
    const newQuery = await prisma.query.create({
      data: {
        title,
        description,
        image: image || null, // Handle image being optional
      },
    });

    // Return the newly created query with status 201
    return new Response(JSON.stringify(newQuery), { status: 201 });
  } catch (error) {
    console.error("Error saving query:", error);
    return new Response(JSON.stringify({ message: "Error saving query" }), {
      status: 500,
    });
  }
}

// GET method to fetch all problem queries
export async function GET(req) {
  try {
    // Fetch all problem queries from the database
    const queries = await prisma.query.findMany({
      orderBy: {
        createdAt: "desc", // Orders the queries by createdAt in descending order
      },
    });

    // Return the queries as JSON with status 200
    return new Response(JSON.stringify(queries), { status: 200 });
  } catch (error) {
    console.error("Error fetching queries:", error);
    return new Response(JSON.stringify({ message: "Error fetching queries" }), {
      status: 500,
    });
  }
}
