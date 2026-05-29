require("dotenv").config();
const mongoose = require("mongoose");
const Gallery = require("../models/gallery.model.js");

const cloudinaryBase =
  "https://res.cloudinary.com/dhv61cvx5/image/upload/sobf_migration/";

async function migrate() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected");

    const items = await Gallery.find({});

    for (let item of items) {
      if (!item.image || typeof item.image !== "string") continue;

      if (!item.image.startsWith("http")) {
        const filename = item.image;

        const newUrl = cloudinaryBase + filename;

        await Gallery.updateOne(
          { _id: item._id },
          { $set: { image: newUrl } }
        );

        console.log(`Updated: ${filename} → ${newUrl}`);
      }
    }

    console.log("🚀 Migration completed successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Migration failed:", err);
    process.exit(1);
  }
}

migrate();