const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const User = require("../User/UserSchema");

let mongod;

let user1 = {
  _id: new mongoose.Types.ObjectId("000000000000000000000001"),
  firebaseUUID: "ID_1",
  displayName: "user1",
  firstName: "first",
  lastName: "user",
  posts: [new mongoose.Types.ObjectId("000000000000000000000001")],
  favourites: [new mongoose.Types.ObjectId("000000000000000000000001")],
  followingUsers: [new mongoose.Types.ObjectId("000000000000000000000001")],
};

let user2 = {
  _id: new mongoose.Types.ObjectId("000000000000000000000002"),
  firebaseUUID: "ID_2",
  displayName: "user2",
  firstName: "other",
  lastName: "person",
  posts: [],
  favourites: [],
  followingUsers: [],
};

const users = [user1, user2];

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();

  const connectionString = mongod.getUri();
  await mongoose.connect(connectionString, { useNewUrlParser: true });
});

beforeEach(async () => {
  await mongoose.connection.db.dropDatabase();

  const coll = await mongoose.connection.db.createCollection("users");
  await coll.insertMany(users);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

it("get all users", async () => {
  const users = await User.find();

  expect(users[0]).toBeTruthy();
  expect(users[0].firebaseUUID).toBe("ID_1");
  expect(users[0].displayName).toBe("user1");
  expect(users[0].firstName).toBe("first");
  expect(users[0].lastName).toBe("user");
  expect(users[0].posts).toStrictEqual([
    new mongoose.Types.ObjectId("000000000000000000000001"),
  ]);
  expect(users[0].favourites).toStrictEqual([
    new mongoose.Types.ObjectId("000000000000000000000001"),
  ]);
  expect(users[0].followingUsers).toStrictEqual([
    new mongoose.Types.ObjectId("000000000000000000000001"),
  ]);

  expect(users[1]).toBeTruthy();
  expect(users[1].firebaseUUID).toBe("ID_2");
  expect(users[1].displayName).toBe("user2");
  expect(users[1].firstName).toBe("other");
  expect(users[1].lastName).toBe("person");
  expect(users[1].posts).toStrictEqual([]);
  expect(users[1].favourites).toStrictEqual([]);
  expect(users[1].followingUsers).toStrictEqual([]);
});

it("get single user", async () => {
  const user = await User.findById("000000000000000000000001");

  expect(user).toBeTruthy();
  expect(user.firebaseUUID).toBe("ID_1");
  expect(user.displayName).toBe("user1");
  expect(user.firstName).toBe("first");
  expect(user.lastName).toBe("user");
  expect(user.posts).toStrictEqual([
    new mongoose.Types.ObjectId("000000000000000000000001"),
  ]);
  expect(user.favourites).toStrictEqual([
    new mongoose.Types.ObjectId("000000000000000000000001"),
  ]);
  expect(user.followingUsers).toStrictEqual([
    new mongoose.Types.ObjectId("000000000000000000000001"),
  ]);
});

it("create user successfully", async () => {
  const newUser = new User({
    firebaseUUID: "ID_1",
    displayName: "user1",
    firstName: "first",
    lastName: "user",
    posts: [new mongoose.Types.ObjectId("000000000000000000000001")],
    favourites: [new mongoose.Types.ObjectId("000000000000000000000001")],
    followingUsers: [new mongoose.Types.ObjectId("000000000000000000000001")],
  });

  await newUser.save();

  const findDbUser = await User.findById(newUser._id);

  expect(findDbUser).toBeTruthy();
  expect(findDbUser.firebaseUUID).toBe("ID_1");
  expect(findDbUser.displayName).toBe("user1");
  expect(findDbUser.firstName).toBe("first");
  expect(findDbUser.lastName).toBe("user");
  expect(findDbUser.posts).toStrictEqual([
    new mongoose.Types.ObjectId("000000000000000000000001"),
  ]);
  expect(findDbUser.favourites).toStrictEqual([
    new mongoose.Types.ObjectId("000000000000000000000001"),
  ]);
  expect(findDbUser.followingUsers).toStrictEqual([
    new mongoose.Types.ObjectId("000000000000000000000001"),
  ]);
});

it("fails when trying to save user with no firebase UUID", async () => {
  const newUser = new User({
    displayName: "user1",
    firstName: "first",
    lastName: "user",
    posts: [new mongoose.Types.ObjectId("000000000000000000000001")],
    favourites: [new mongoose.Types.ObjectId("000000000000000000000001")],
    followingUsers: [new mongoose.Types.ObjectId("000000000000000000000001")],
  });

  return expect(newUser.save()).rejects.toThrow();
});

it("fails when trying to save user with empty firebase UUID", async () => {
  const newUser = new User({
    firebaseUUID: "",
    displayName: "user1",
    firstName: "first",
    lastName: "user",
    posts: [new mongoose.Types.ObjectId("000000000000000000000001")],
    favourites: [new mongoose.Types.ObjectId("000000000000000000000001")],
    followingUsers: [new mongoose.Types.ObjectId("000000000000000000000001")],
  });

  return expect(newUser.save()).rejects.toThrow();
});

it("fails when trying to save user with no display name", async () => {
  const newUser = new User({
    firebaseUUID: "ID_1",
    firstName: "first",
    lastName: "user",
    posts: [new mongoose.Types.ObjectId("000000000000000000000001")],
    favourites: [new mongoose.Types.ObjectId("000000000000000000000001")],
    followingUsers: [new mongoose.Types.ObjectId("000000000000000000000001")],
  });

  return expect(newUser.save()).rejects.toThrow();
});

it("fails when trying to save user with empty display name", async () => {
  const newUser = new User({
    firebaseUUID: "ID_1",
    displayName: "",
    firstName: "first",
    lastName: "user",
    posts: [new mongoose.Types.ObjectId("000000000000000000000001")],
    favourites: [new mongoose.Types.ObjectId("000000000000000000000001")],
    followingUsers: [new mongoose.Types.ObjectId("000000000000000000000001")],
  });

  return expect(newUser.save()).rejects.toThrow();
});

it("fails when trying to save user with no first name", async () => {
  const newUser = new User({
    firebaseUUID: "ID_1",
    displayName: "user1",
    lastName: "user",
    posts: [new mongoose.Types.ObjectId("000000000000000000000001")],
    favourites: [new mongoose.Types.ObjectId("000000000000000000000001")],
    followingUsers: [new mongoose.Types.ObjectId("000000000000000000000001")],
  });

  return expect(newUser.save()).rejects.toThrow();
});

it("fails when trying to save user with empty first name", async () => {
  const newUser = new User({
    firebaseUUID: "ID_1",
    displayName: "user1",
    firstName: "",
    lastName: "user",
    posts: [new mongoose.Types.ObjectId("000000000000000000000001")],
    favourites: [new mongoose.Types.ObjectId("000000000000000000000001")],
    followingUsers: [new mongoose.Types.ObjectId("000000000000000000000001")],
  });

  return expect(newUser.save()).rejects.toThrow();
});

it("fails when trying to save user with no last name", async () => {
  const newUser = new User({
    firebaseUUID: "ID_1",
    displayName: "user1",
    firstName: "first",
    posts: [new mongoose.Types.ObjectId("000000000000000000000001")],
    favourites: [new mongoose.Types.ObjectId("000000000000000000000001")],
    followingUsers: [new mongoose.Types.ObjectId("000000000000000000000001")],
  });

  return expect(newUser.save()).rejects.toThrow();
});

it("fails when trying to save user with empty last name", async () => {
  const newUser = new User({
    firebaseUUID: "ID_1",
    displayName: "user1",
    firstName: "first",
    lastName: "",
    posts: [new mongoose.Types.ObjectId("000000000000000000000001")],
    favourites: [new mongoose.Types.ObjectId("000000000000000000000001")],
    followingUsers: [new mongoose.Types.ObjectId("000000000000000000000001")],
  });

  return expect(newUser.save()).rejects.toThrow();
});
