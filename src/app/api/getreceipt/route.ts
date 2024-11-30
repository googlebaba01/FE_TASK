import { connect } from "@/dbConfig/dbConfig";
import Receipt from "@/models/receiptModels";
import { NextResponse } from "next/server";

connect(); // Connect to the database

export async function GET() {
  try {
    const receipts = await Receipt.find(); // Fetch all receipts
    return NextResponse.json(receipts);
  } catch (error) {
    console.error("Error fetching receipts:", error);
    return NextResponse.json(
      { message: "Failed to fetch receipts." },
      { status: 500 }
    );
  }
}
