const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const enquiryRoutes = require("./routes/enquiryRoutes");
const connectDB = require("./config/db");
const Enquiry = require("./models/Enquiry");
const Newsletter = require("./models/Newsletter");

const app = express();

// Connect to MongoDB Atlas
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/enquiries", enquiryRoutes);
// Base Route
app.get("/", (req, res) => {
  res.json({
    name: "SFM Travels API",
    status: "online",
    message: "SFM Travels Backend is running successfully!",
    endpoints: [
      "POST /api/enquiries",
      "GET /api/enquiries",
      "POST /api/newsletter",
      "GET /api/health",
    ],
  });
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  const dbState = mongoose.connection.readyState;
  const states = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };

  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    database: states[dbState] || "unknown",
  });
});

// -------------------------------------------------------------
// ENQUIRY ROUTES
// -------------------------------------------------------------

// Submit a new travel enquiry
app.post("/api/enquiries", async (req, res) => {
  try {
    const { fullName, phone, destination, message, travelDate, travellers, source } = req.body;

    if (!fullName || !phone || !destination) {
      return res.status(400).json({
        success: false,
        error: "Full name, phone, and destination are required.",
      });
    }

    const enquiry = new Enquiry({
      fullName,
      phone,
      destination,
      message: message || "",
      travelDate: travelDate || "",
      travellers: travellers || "",
      source: source || "contact_form",
    });

    const savedEnquiry = await enquiry.save();

    console.log(`[Enquiry] New booking request received from ${fullName} for ${destination}`);

    return res.status(201).json({
      success: true,
      message: "Your enquiry has been received successfully! Our travel planner will contact you soon.",
      data: savedEnquiry,
    });
  } catch (error) {
    console.error("[Enquiry Error]:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to submit enquiry. Please try again later.",
    });
  }
});

// Retrieve all enquiries (for administrative checks)
app.get("/api/enquiries", async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 }).limit(100);
    return res.json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    console.error("[Get Enquiries Error]:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to retrieve enquiries.",
    });
  }
});

// -------------------------------------------------------------
// NEWSLETTER ROUTES
// -------------------------------------------------------------

// Subscribe to newsletter
app.post("/api/newsletter", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes("@")) {
      return res.status(400).json({
        success: false,
        error: "Please provide a valid email address.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if already subscribed
    const existing = await Newsletter.findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(200).json({
        success: true,
        message: "You are already subscribed to our newsletter! Thank you.",
        alreadySubscribed: true,
      });
    }

    const subscriber = new Newsletter({ email: normalizedEmail });
    await subscriber.save();

    console.log(`[Newsletter] New subscriber added: ${normalizedEmail}`);

    return res.status(201).json({
      success: true,
      message: "Thank you for subscribing to SFM Travels newsletter!",
      data: subscriber,
    });
  } catch (error) {
    console.error("[Newsletter Error]:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to subscribe to newsletter. Please try again.",
    });
  }
});

// Retrieve all newsletter subscribers
app.get("/api/newsletter", async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ createdAt: -1 });
    return res.json({
      success: true,
      count: subscribers.length,
      data: subscribers,
    });
  } catch (error) {
    console.error("[Get Newsletter Error]:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to retrieve subscribers.",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`SFM Travels server running on port ${PORT}`);
});