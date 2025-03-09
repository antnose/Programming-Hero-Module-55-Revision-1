const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3001;

// Here all middleware
app.use(express.json());
app.use(cors());

// Dummy Data
const users = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@example.com",
  },
  {
    id: 3,
    name: "Charlie Davis",
    email: "charlie.davis@example.com",
  },
  {
    id: 4,
    name: "Dana Lee",
    email: "dana.lee@example.com",
  },
  {
    id: 5,
    name: "Eve Williams",
    email: "eve.williams@example.com",
  },
];

// MongoDB Code Start

const uri =
  "mongodb+srv://admin:admin@cluster0.to58y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const dataBase = client.db("users");
    const haiku = dataBase.collection("users");

    app.post("/users", async (req, res) => {
      const user = req.body;
      console.log("New user", user);
      const result = await haiku.insertOne(user);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// MongoDB Code End

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
