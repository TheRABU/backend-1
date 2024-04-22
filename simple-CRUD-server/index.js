const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

// mongodb username and pass
/**
 * fazlerabbixd
 * GHHQ6yNJO7OkYizk
 *
 * mongodb+srv://fazlerabbixd:<password>@cluster0.mrusgwq.mongodb.net/
 *
 *
 */

const uri =
  "mongodb+srv://fazlerabbixd:GHHQ6yNJO7OkYizk@cluster0.mrusgwq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
    const database = client.db("usersDataB");
    const usersCollection = database.collection("all-users");

    app.post("/users", async (req, res) => {
      const user = req.body;
      console.log("New User", user);
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("SIMPLE CRUD server is running");
});

app.listen(port, () => {
  console.log(`Simple crud is listening on port: ${port} `);
});
