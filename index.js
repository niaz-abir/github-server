const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.icnwzoy.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  const jobCollection = client.db("job-portal").collection("allJobs");
  const jobCategory = client.db("job-portal").collection("allcategory");
  const allResume = client.db("job-portal").collection("resume");
  const blogCollection = client.db("job-portal").collection("blog");
  const internCollection = client.db("job-portal").collection("allIntern");
  const jobApplyCollection = client.db("job-portal").collection("jobapply");
  const internApplyCollection = client
    .db("job-portal")
    .collection("internapply");

  // job part
  app.get("/jobs", async (req, res) => {
    const query = {};
    const result = await jobCollection.find(query).toArray();
    res.send(result);
  });

  app.get("/jobs/job/:id", async (req, res) => {
    const id = req.params.id;
    const result = await jobCollection.findOne({ _id: new ObjectId(id) });
    res.send(result);
  });

  app.post("/jobapply", async (req, res) => {
    const user = req.body;
    const result = await jobApplyCollection.insertOne(user);
    res.send(result);
  });

  app.get("/alljobs", async (req, res) => {
    const email = req.query.email;
    const query = { email: email };
    const result = await jobApplyCollection.find(query).toArray();
    res.send(result);
  });

  app.get("/interns", async (req, res) => {
    const query = {};
    const result = await internCollection.find(query).toArray();
    res.send(result);
  });

  app.get("/interns/intern/:id", async (req, res) => {
    const id = req.params.id;
    const result = await internCollection.findOne({ _id: new ObjectId(id) });
    res.send(result);
  });

  app.post("/internapply", async (req, res) => {
    const user = req.body;
    const result = await internApplyCollection.insertOne(user);
    res.send(result);
  });
  app.get("/allintern", async (req, res) => {
    const email = req.query.email;
    const query = { email: email };
    const result = await internApplyCollection.find(query).toArray();
    res.send(result);
  });

  app.get("/resume", async (req, res) => {
    const email = req.query.email;
    const query = { email: email };
    const result = await allResume.findOne(query);
    res.json(result);
  });

  app.post("/resume", async (req, res) => {
    const user = req.body;
    const result = await allResume.insertOne(user);
    res.send(result);
  });

  app.get("/blog", async (req, res) => {
    const query = {};
    const result = await blogCollection.find(query).toArray();
    res.send(result);
  });
  app.get("/blog/single", async (req, res) => {
    const id = req.query.id;
    const result = await blogCollection.findOne({ _id: new ObjectId(id) });
    res.send(result);
  });

  app.get("/allcategory", async (req, res) => {
    const query = {};
    const result = await jobCategory.find(query).toArray();
    res.send(result);
  });
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("server is running");
});

app.listen(port, () => {
  console.log(`job portal is running is ${port}`);
});
