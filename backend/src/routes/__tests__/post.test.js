const request = require("supertest");
const express = require("express");
const routes = require("../index");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const Post = require("../../models/Post/PostSchema");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use("/", routes);

let mongod;

const mockPost = {
  _id: new mongoose.Types.ObjectId("000000000000000000000002"),
  foodName: "Fries",
  bodyText: "This is a really nice Fries",
  tags: ["Fast food", "fries"],
  numberOfLikes: 2,
  rating: 2,
  numberOfReviews: 5,
};
const post1 = {
  _id: new mongoose.Types.ObjectId("000000000000000000000001"),
  foodName: "Steak",
  bodyText: "This is a really nice steak",
  tags: ["beef", "steak"],
  numberOfLikes: 5,
  rating: 10,
  numberOfReviews: 5,
};

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();

  const connectionString = mongod.getUri();
  await mongoose.connect(connectionString, { useNewUrlParser: true });
  await mongoose.connection.db.createCollection("Posts");
});

beforeEach(async () => {
  // await mongoose.connection.db.dropDatabase();

  // console.log(coll);
  const post = new Post(mockPost);
  await post.save();
});

afterEach(async () => {
  await Post.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

describe("GET /api/posts/:id", () => {
  it("do return post", (done) => {
    request(app)
      .get("/api/posts/000000000000000000000002")
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body);
        expect(res.body.foodName).toBe("Fries");
        return done();
      });
  });
});

describe("Fail GET /api/post/:id", () => {
  it("do not return post", (done) => {
    request(app)
      .get("/api/posts/0")
      .send()
      .expect(404)
      .end((err) => {
        expect(err);
        return done();
      });
  });
});

describe("POST /posts", () => {
  it("POST /posts", (done) => {
    request(app)
      .post("/api/posts")
      .set("Accept", "application/json")
      .send(post1)
      .expect(201)
      .end((err, res) => {
        expect(res.body);
        expect(res.body.foodName).toBe("Steak");
        return done();
      });
  });
});
