const fs = require("fs")


const createInitialAdmin = async () => {
  try {

    const username = 'Test'; // Set default username
    const email = 'test@example.com'; // Set default email
    const password = 'test@123'; // Set default password

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin: true
    });

    await newAdmin.save();
    console.log('Initial admin user created successfully');
  } catch (error) {
    console.error('Failed to create initial admin user:', error);
  }
};


//  !FOLDER CREATING IF NOT ...
const createDirectoryIfDoesntExist = (dirPath) => {
  try {
    console.log("dirPath", dirPath)
    if (!fs.existsSync(dirPath)) {
      console.log(`Creating directory: ${dirPath}`);
      fs.mkdirSync(dirPath, { recursive: true });
    } else {
      console.log(`Directory already exists: ${dirPath}`);
    }
  } catch (error) {
    console.log("error while creating folders")
  }
}
module.exports = {createDirectoryIfDoesntExist}