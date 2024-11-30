import { connect } from "@/dbConfig/dbConfig";
import Receipt from "@/models/receiptModels";
import { NextResponse } from "next/server";

connect(); // Connect to the database

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { autoSync } = await req.json();

    // Update the receipt's autoSync field
    const updatedReceipt = await Receipt.findByIdAndUpdate(
      id,
      { autoSync },
      { new: true } // Return the updated document
    );

    if (!updatedReceipt) {
      return NextResponse.json(
        { message: "Receipt not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Auto-sync updated successfully.",
      receipt: updatedReceipt,
    });
  } catch (error) {
    console.error("Error updating auto-sync:", error);
    return NextResponse.json(
      { message: "Failed to update auto-sync." },
      { status: 500 }
    );
  }
}
