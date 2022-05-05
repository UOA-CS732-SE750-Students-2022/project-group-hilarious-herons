const request = require("supertest");
const express = require("express");
const routes = require("../index");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const Post = require("../../models/Post/PostSchema");
const Restaurant = require("../../models/Restaurant/RestaurantSchema");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use("/", routes);

let mongod;

const mockRestaurant = {
  _id: new mongoose.Types.ObjectId("000000000000000000000001"),
  name: "Paradise Takeaway",
  address: "581 Sandringham Road, Sandringham, Auckland",
  coordinates: {
    lat: -36.91042,
    long: 174.7698112,
  },
  googlePlaceId: "ChIJcT4y8llGDW0RfP72WCE-SF0",
  googleMapsURL: "https://maps.google.com/?cid=6721690756797890172",
  openHours: [
    "Monday: 5:00 AM – 11:00 PM",
    "Tuesday: 5:00 AM – 11:00 PM",
    "Wednesday: 5:00 AM – 11:00 PM",
    "Thursday: 5:00 AM – 11:00 PM",
    "Friday: 5:00 AM – 11:00 PM",
    "Saturday: 5:00 AM – 11:00 PM",
    "Sunday: 5:00 AM – 11:00 PM",
  ],
};

const mockPost = {
  _id: new mongoose.Types.ObjectId("000000000000000000000001"),
  foodName: "Fries",
  restaurant: new mongoose.Types.ObjectId("000000000000000000000001"),
  bodyText: "This is a really nice Fries",
  tags: ["Fast food", "fries"],
  numberOfLikes: 2,
  rating: 2,
  numberOfReviews: 5,
};

beforeAll(async () => {
  // jest.setTimeout();
  mongod = await MongoMemoryServer.create();

  const connectionString = mongod.getUri();
  await mongoose.connect(connectionString, { useNewUrlParser: true });
});

beforeEach(async () => {
  await mongoose.connection.db.dropDatabase();

  await mongoose.connection.db.createCollection("posts");
  await mongoose.connection.db.createCollection("restaurants");

  const restaurant = new Restaurant(mockRestaurant);
  await restaurant.save();
  const post = new Post(mockPost);
  await post.save();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

describe("GET /posts/search", () => {
  it("GET /posts/search", (done) => {
    request(app)
      .get("/api/posts/search")
      .send({ lat: -36.91042, long: 174.7698112, searchKeyWord: "Fries" })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body);

        expect(res.body[0].foodName).toBe("Fries");
        return done();
      });
  });
});

describe("GET /posts/search", () => {
  it("GET /posts/search within array", (done) => {
    request(app)
      .get("/api/posts/search")
      .send({ lat: -36.91042, long: 174.7698112, searchKeyWord: "ood" })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body);
        console.log(res.body);

        expect(res.body[0].foodName).toBe("Fries");
        return done();
      });
  });
});
