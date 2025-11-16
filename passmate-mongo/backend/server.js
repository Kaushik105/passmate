import express from "express";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";

dotenv.config();

//connecting to MOngoDB client
const url = `${process.env.MONGODB_URI}${process.env.DB_NAME}`;
const client = new MongoClient(url);

//App and database
const database = process.env.DB_NAME;
const app = express();
const port = process.env.PORT || 5000;

//Middlewares
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Connect to MongoDB
client.connect()
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

//Get all the passwords
app.get("/", async (req, res) => {
  try {
    const db = client.db(database);
    const collection = db.collection("passwords");
    const result = await collection.find({}).toArray();
    res.json(result);
  } catch (error) {
    console.error("Error fetching passwords:", error);
    res.status(500).json({ error: "Failed to fetch passwords", success: false });
  }
});

//Save the passwords
app.post("/", async (req, res) => {
  try {
    const pass = req.body;
    const db = client.db(database);
    const collection = db.collection("passwords");

    // Insert the password object (MongoDB will create its own _id)
    const result = await collection.insertOne(pass);

    res.status(201).send({ success: true, result: { ...pass, _id: result.insertedId } });
  } catch (error) {
    console.error("Error saving password:", error);
    res.status(500).json({ error: "Failed to save password", success: false });
  }
});

//update the passwords
app.put("/", async (req, res) => {
  try {
    const pass = req.body;
    console.log("updating id: ", req.body._id);
    const db = client.db(database);
    const collection = db.collection("passwords");

    // Extract the MongoDB ObjectId from the request
    const { _id, ...updateData } = pass;
    
    // Validate the ObjectId
    if (!ObjectId.isValid(_id)) {
      return res.status(400).json({ error: "Invalid ID format", success: false });
    }
    
    const objectId = new ObjectId(_id);

    const result = await collection.findOneAndUpdate(
      { _id: objectId },
      { $set: updateData }, // Only update the fields that should change
      { returnDocument: 'after' } // Return the updated document
    );
    
    if (!result.value) {
      return res.status(404).json({ error: "Password not found", success: false });
    }

    res.send({ success: true, result: result.value });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ error: "Failed to update password", success: false });
  }
});

//delete the passwords
app.delete("/", async (req, res) => {
  try {
    const pass = req.body;
    console.log("deleting from id ", pass);
    const db = client.db(database);
    const collection = db.collection("passwords");

    // Validate the ObjectId
    if (!pass._id || !ObjectId.isValid(pass._id)) {
      return res.status(400).json({ error: "Invalid ID format", success: false });
    }

    // Convert the string ID to ObjectId
    const objectId = new ObjectId(pass._id);
    const result = await collection.deleteOne({ _id: objectId });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Password not found", success: false });
    }

    res.send({ success: true, result: pass });
  } catch (error) {
    console.error("Error deleting password:", error);
    res.status(500).json({ error: "Failed to delete password", success: false });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error", success: false });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});