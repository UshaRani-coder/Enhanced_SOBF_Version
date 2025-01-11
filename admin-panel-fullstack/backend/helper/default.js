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
