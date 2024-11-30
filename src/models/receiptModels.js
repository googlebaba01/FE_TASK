import mongoose from "mongoose";

const receiptSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: [true, "File name is required"],
  },
  fileData: {
    type: String, // Store as base64 string or a URL to the file if stored elsewhere
    required: [true, "File data is required"],
  },
  uploadedAt: {
    type: Date,
    default: Date.now, // Automatically set to the current date and time
  },
  autoSync: {
    type: Boolean,
    default: false, // Indicates if the receipt was uploaded via auto-sync
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User schema
    required: true,
  },
  tags: {
    type: [String], // Array of tags for categorizing receipts
    default: [],
  },
});

const Receipt = mongoose.models.Receipt || mongoose.model("Receipt", receiptSchema);

export default Receipt;
