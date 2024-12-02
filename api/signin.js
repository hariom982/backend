const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://hariom:salmankhan@cluster0.4khuw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Replace with your MongoDB connection string
const client = new MongoClient(uri);

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  try {
    await client.connect();
    const database = client.db("myDatabase"); // Replace with your database name
    const users = database.collection("users");

    const user = await users.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    return res.status(200).json({ success: true, message: "Sign-in successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
