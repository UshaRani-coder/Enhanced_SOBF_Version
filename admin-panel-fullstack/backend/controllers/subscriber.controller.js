const subscriberModel = require('../models/subscriber.model');

const postSubscriber = async (req, res) => {
  try {
    const { email, pan } = req.body;

    // Check for existing records manually for better error messages
    const existingEmail = await subscriberModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        error: 'Email already exists'
      });
    }

    const existingPan = await subscriberModel.findOne({ pan });
    if (existingPan) {
      return res.status(400).json({
        success: false,
        error: 'PAN already exists'
      });
    }

    // Create new subscriber if no duplicates found
    const subscriber = new subscriberModel(req.body);
    await subscriber.save();

    res.status(201).json({
      success: true,
      message: "Subscription created successfully",
      data: subscriber
    });

  } catch (error) {
    console.error('Subscription error:', error);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    }

    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};



const getSubscriber = async (req, res) => {
  try {
    const subscribers = await subscriberModel.find({});
    console.log("subscribers", subscribers);
    res.status(200).json({
      success: true,
      count: subscribers.length,
      data: subscribers
    });
  } catch (error) {
    console.log("error", error);    
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
}

module.exports = {postSubscriber,getSubscriber};
