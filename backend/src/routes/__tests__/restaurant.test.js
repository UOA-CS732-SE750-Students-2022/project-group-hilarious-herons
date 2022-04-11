const request = require("supertest");
const express = require("express");
const routes = require("../index");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const Restaurant = require("../../models/Restaurant/RestaurantSchema");
const { post } = require("../api");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use("/", routes);

let mongod;

const data = {
  _id: new mongoose.Types.ObjectId("000000000000000000000001"),
  name: "Paradise Takeaway",
  address: "581 Sandringham Road, Sandringham, Auckland",
  googlePlaceId: "test",
  googleMapsURL: "https://maps.google.com/?cid=6721690756797890172",
  openHours: [
    "Monday: 11:00 AM – 11:00 PM",
    "Tuesday: 11:00 AM – 11:00 PM",
    "Wednesday: 11:00 AM – 11:00 PM",
    "Thursday: 11:00 AM – 11:00 PM",
    "Friday: 11:00 AM – 11:00 PM",
    "Saturday: 11:00 AM – 11:00 PM",
    "Sunday: 11:00 AM – 11:00 PM",
  ],
};
beforeAll(async () => {
  mongod = await MongoMemoryServer.create();

  const connectionString = mongod.getUri();
  await mongoose.connect(connectionString, { useNewUrlParser: true });
});

beforeEach(async () => {
  await mongoose.connection.db.dropDatabase();

  const coll = await mongoose.connection.db.createCollection("Restaurants");
  const restaurant = new Restaurant(data);
  await restaurant.save();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

describe("GET /restaurants", () => {
  it("do return restaurant", (done) => {
    request(app)
      .get("/api/restaurants")
      .send({ name: "Paradise Takeaway" })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body);
        expect(res.body[0].name).toBe("Paradise Takeaway");
        expect(res.body[0].googlePlaceId).toBe("test");

        return done();
      });
  });
});

describe("GET /restaurants", () => {
  it("do return restaurant", (done) => {
    request(app)
      .get("/api/restaurants")
      .send({ name: "Mcdonald" })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body);
        expect(res.body[0].name).toBe("McDonald's Mount Wellington");
        return done();
      });
  });
});
