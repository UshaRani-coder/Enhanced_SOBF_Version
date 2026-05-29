const mongoose = require("mongoose");
const { LegalDoc } = require("../models/other.model");
require("dotenv").config();

const migrate = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB connected");

    const docs = await LegalDoc.find({});

    let count = 0;

    for (let doc of docs) {
      if (doc.fileName && doc.fileName.startsWith("/uploads")) {
        
        console.log("🔍 Old file found:", doc.fileName);
        doc.isMigrated = false; // you can later use this flag if needed

       
        await doc.save();

        count++;
      }
    }

    console.log(`🚀 Scan completed. Found ${count} old upload references.`);
    console.log("✅ No data was deleted. Safe migration completed.");

    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
};

migrate();