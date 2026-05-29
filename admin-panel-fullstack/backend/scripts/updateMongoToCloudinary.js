require("dotenv").config();
const mongoose = require("mongoose");
const Gallery = require("../models/gallery.model.js");

mongoose.connect(process.env.MONGO_URI);

async function migrate() {
  try {
    console.log("✅ MongoDB connected");

    const items = await Gallery.find({});

    let updatedCount = 0;

    for (let item of items) {
      if (!item.image) continue;

      // Skip already migrated Cloudinary URLs
      if (typeof item.image === "string" && item.image.startsWith("http")) {
        continue;
      }

      // If image is invalid or empty
      if (typeof item.image !== "string" || item.image.trim() === "") {
        console.log(`⚠️ Skipped invalid image for ID: ${item._id}`);
        continue;
      }

      const filename = item.image.trim();

      // Only convert if it looks like a file name
      if (filename.includes("/")) {
        console.log(`⚠️ Skipped suspicious path: ${filename}`);
        continue;
      }

      // Build Cloudinary URL (safe assumption layer)
      const cloudinaryBase =
        "https://res.cloudinary.com/dhv61cvx5/image/upload/sobf_migration/";

      const newUrl = cloudinaryBase + filename;

      await Gallery.updateOne(
        { _id: item._id },
        { $set: { image: newUrl } }
      );

      updatedCount++;

      console.log(`🔄 Updated: ${filename} → ${newUrl}`);
    }

    console.log(`🚀 Migration completed successfully. Updated: ${updatedCount}`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Migration failed:", err);
    process.exit(1);
  }
}

migrate();