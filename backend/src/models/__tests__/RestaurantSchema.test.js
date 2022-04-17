const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Restaurant = require("../Restaurant/RestaurantSchema");

let mongod;

let restaurant1 = {
  _id: new mongoose.Types.ObjectId("000000000000000000000001"),
  name: "Mcdonalds",
  address: "21 Jump Street",
  coordinates: {
    lat: 0,
    long: 0,
  },
  googlePlaceId: "ID_1",
  googleMapsURL: "URL_1",
};

let restaurant2 = {
  _id: new mongoose.Types.ObjectId("000000000000000000000002"),
  name: "Burger King",
  address: "22 Jump Street",
  coordinates: {
    lat: 321,
    long: 12,
  },
  googlePlaceId: "ID_2",
  googleMapsURL: "URL_2",
};

let restaurants = [restaurant1, restaurant2];

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();

  const connectionString = mongod.getUri();
  await mongoose.connect(connectionString, { useNewUrlParser: true });
});

beforeEach(async () => {
  await mongoose.connection.db.dropDatabase();

  const coll = await mongoose.connection.db.createCollection("restaurants");
  await coll.insertMany(restaurants);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

it("get all restaurants", async () => {
  const restaurants = await Restaurant.find();

  expect(restaurants).toBeTruthy();
  expect(restaurants.length).toBe(2);

  expect(restaurants[0].name).toBe("Mcdonalds");
  expect(restaurants[0].address).toBe("21 Jump Street");
  expect(restaurants[0].coordinates.lat).toBe(0);
  expect(restaurants[0].coordinates.long).toBe(0);
  expect(restaurants[0].googlePlaceId).toBe("ID_1");
  expect(restaurants[0].googleMapsURL).toBe("URL_1");

  expect(restaurants[1].name).toBe("Burger King");
  expect(restaurants[1].address).toBe("22 Jump Street");
  expect(restaurants[1].coordinates.lat).toBe(321);
  expect(restaurants[1].coordinates.long).toBe(12);
  expect(restaurants[1].googlePlaceId).toBe("ID_2");
  expect(restaurants[1].googleMapsURL).toBe("URL_2");
});

it("get single restaurant", async () => {
  const restaurant = await Restaurant.findById("000000000000000000000001");

  expect(restaurant).toBeTruthy();
  expect(restaurant.name).toBe("Mcdonalds");
  expect(restaurant.address).toBe("21 Jump Street");
  expect(restaurant.coordinates.lat).toBe(0);
  expect(restaurant.coordinates.long).toBe(0);
  expect(restaurant.googlePlaceId).toBe("ID_1");
  expect(restaurant.googleMapsURL).toBe("URL_1");
});

it("add restaurant successfully", async () => {
  const newRestaurant = new Restaurant({
    name: "Wendy's",
    address: "23 Jump Street",
    coordinates: {
      lat: 25,
      long: 52,
    },
    googlePlaceId: "ID_3",
    googleMapsURL: "URL_3",
  });

  await newRestaurant.save();

  const findNewRestaurant = await Restaurant.findById(newRestaurant._id);

  expect(findNewRestaurant).toBeTruthy();
  expect(findNewRestaurant.name).toBe("Wendy's");
  expect(findNewRestaurant.address).toBe("23 Jump Street");
  expect(findNewRestaurant.coordinates.lat).toBe(25);
  expect(findNewRestaurant.coordinates.long).toBe(52);
  expect(findNewRestaurant.googlePlaceId).toBe("ID_3");
  expect(findNewRestaurant.googleMapsURL).toBe("URL_3");
});

it("fails when adding restaurant no name", async () => {
  const newRestaurant = new Restaurant({
    address: "23 Jump Street",
    coordinates: {
      lat: 25,
      long: 52,
    },
    googlePlaceId: "ID_3",
    googleMapsURL: "URL_3",
  });

  return expect(newRestaurant.save()).rejects.toThrow();
});

it("fails when adding restaurant no address", async () => {
  const newRestaurant = new Restaurant({
    name: "Wendy's",
    coordinates: {
      lat: 25,
      long: 52,
    },
    googlePlaceId: "ID_3",
    googleMapsURL: "URL_3",
  });

  return expect(newRestaurant.save()).rejects.toThrow();
});

it("fails when adding restaurant no place ID", async () => {
  const newRestaurant = new Restaurant({
    name: "Wendy's",
    address: "23 Jump Street",
    coordinates: {
      lat: 25,
      long: 52,
    },
    googleMapsURL: "URL_3",
  });

  return expect(newRestaurant.save()).rejects.toThrow();
});

it("fails when adding restaurant no maps URL", async () => {
  const newRestaurant = new Restaurant({
    name: "Wendy's",
    address: "23 Jump Street",
    coordinates: {
      lat: 25,
      long: 52,
    },
    googlePlaceId: "ID_3",
  });

  return expect(newRestaurant.save()).rejects.toThrow();
});
