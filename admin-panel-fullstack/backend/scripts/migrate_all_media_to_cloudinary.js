
const fs = require("fs");
const cloudinary = require("../config/cloudinary");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI);

const models = [
  { model: require("../models/gallery.model"), fields: ["image"] },
  { model: require("../models/post.model"), fields: ["images"] },
  { model: require("../models/newspost.model"), fields: ["images"] },
  { model: require("../models/team.model"), fields: ["image"] },
  { model: require("../models/hero-banner.model"), fields: ["image"] },
  { model: require("../models/our-impacts.model"), fields: ["image"] },
];

async function uploadToCloudinary(filePath, folder) {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: `sobf_uploads/${folder}`,
  });

  return result.secure_url;
}

async function migrateModel(Model, folder, fields) {
  const items = await Model.find();

  for (let item of items) {
    let updated = false;

    for (let field of fields) {
      if (!item[field]) continue;

      // single image
      if (typeof item[field] === "string") {
        const newUrl = await uploadToCloudinary(item[field], folder);
        item[field] = newUrl;
        updated = true;
      }

      // array images (news)
      if (Array.isArray(item[field])) {
        const newUrls = [];

        for (let img of item[field]) {
          const url = await uploadToCloudinary(img, folder);
          newUrls.push(url);
        }

        item[field] = newUrls;
        updated = true;
      }
    }

    if (updated) {
      await item.save();
      console.log(`✅ Migrated ${Model.modelName} -> ${item._id}`);
    }
  }
}

async function run() {
  try {
    for (let m of models) {
      await migrateModel(m.model, m.folder, m.fields);
    }

    console.log("🚀 REAL CLOUDINARY MIGRATION DONE");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();