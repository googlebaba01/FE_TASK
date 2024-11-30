import { connect } from "@/dbConfig/dbConfig";
import Receipt from "@/models/receiptModels"; // Import the Receipt model
import { NextResponse } from "next/server";

// Connect to the database
connect();

export async function POST(req: Request) {
  try {
    // Parse the request body
    const reqBody = await req.json();
    const { fileName, fileData, userId, autoSync, tags } = reqBody;

    // Create a new receipt document
    const newReceipt = new Receipt({
      fileName,
      fileData,
      userId, // Associate receipt with a user
      autoSync: autoSync || false, // Default to false if not provided
      tags: tags || [], // Default to an empty array if not provided
    });

    // Save the receipt to the database
    const result = await newReceipt.save();

    // Respond with success
    return NextResponse.json({
      message: "Receipt uploaded successfully.",
      receiptId: result._id,
    });
  } catch (error) {
    console.error("Error uploading receipt:", error);
    return NextResponse.json(
      { message: "Failed to upload receipt."},
      { status: 500 }
    );
  }
}
