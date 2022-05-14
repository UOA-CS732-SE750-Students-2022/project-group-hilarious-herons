const request = require("supertest");
const express = require("express");
const routes = require("../index");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const Post = require("../../models/Post/PostSchema");
const { getTestAuthToken } = require("../../utils/testing/utils");
const Restaurant = require("../../models/Restaurant/RestaurantSchema");
const User = require("../../models/User/UserSchema");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use("/", routes);

let mongod;
let token;

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
  _id: new mongoose.Types.ObjectId("000000000000000000000002"),
  foodName: "Fries",
  bodyText: "This is a really nice Fries",
  restaurant: new mongoose.Types.ObjectId("000000000000000000000001"),
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
  userId: "uid",
};

const mockUser = {
  _id: new mongoose.Types.ObjectId("000000000000000000000003"),
  firebaseUUID: "uid",
  displayName: "Henry Man",
  firstName: "",
  lastName: "",
  posts: [],
  favourites: [],
  followingUsers: [],
};

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();

  const connectionString = mongod.getUri();
  await mongoose.connect(connectionString, { useNewUrlParser: true });
  token = await getTestAuthToken();
});

beforeEach(async () => {
  await mongoose.connection.db.dropDatabase();

  const coll = await mongoose.connection.db.createCollection("posts");
  await mongoose.connection.db.createCollection("restaurants");
  await mongoose.connection.db.createCollection("users");

  const restaurant = new Restaurant(mockRestaurant);
  await restaurant.save();
  const post = new Post(mockPost);
  await post.save();

  const user = new User(mockUser);
  await user.save();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

describe("GET /api/posts/:id", () => {
  it("do return post", (done) => {
    request(app)
      .get("/api/posts/000000000000000000000002")
      .query({
        lat: -36.91042,
        long: 174.7698112,
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body);
        expect(res.body.restaurant.name).toBe("Paradise Takeaway");
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
