const request = require("supertest");
const express = require("express");
const routes = require("../index");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const User = require("../../models/User/UserSchema");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use("/", routes);

let mongod;

let mockUser = {
  _id: new mongoose.Types.ObjectId("000000000000000000000001"),
  firebaseUUID: "ID_1",
  displayName: "user1",
  firstName: "first",
  lastName: "user",
  posts: [new mongoose.Types.ObjectId("000000000000000000000001")],
  favourites: [new mongoose.Types.ObjectId("000000000000000000000001")],
  followingUsers: [new mongoose.Types.ObjectId("000000000000000000000001")],
};

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();

  const connectionString = mongod.getUri();
  await mongoose.connect(connectionString, { useNewUrlParser: true });
});

beforeEach(async () => {
  await mongoose.connection.db.dropDatabase();

  const coll = await mongoose.connection.db.createCollection("users");
  const user = new User(mockUser);
  await user.save();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

describe("GET user /api/user/:id", () => {
  it("successful get user", (done) => {
    request(app)
      .get("/api/users/000000000000000000000001")
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body);
        expect(res.body.displayName).toBe("user1");
        expect(res.body.firstName).toBe("first");
        expect(res.body.lastName).toBe("user");

        return done();
      });
  });

  it("user does not exist", (done) => {
    request(app)
      .get("/api/users/000000000000000000000002")
      .send()
      .expect(404)
      .end((err, res) => {
        expect(err);
        return done();
      });
  });
});

describe("GET user /api/user/firebase/:id", () => {
  it("successful get user", (done) => {
    request(app)
      .get("/api/users/firebase/ID_1")
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body);
        expect(res.body.displayName).toBe("user1");
        expect(res.body.firstName).toBe("first");
        expect(res.body.lastName).toBe("user");

        return done();
      });
  });

  it("user does not exist", (done) => {
    request(app)
      .get("/api/users/firebase/ID_3")
      .send()
      .expect(404)
      .end((err, res) => {
        expect(err);
        return done();
      });
  });
});

describe("POST user /api/users/", () => {
  it("post valid user", (done) => {
    const newUser = {
      firebaseUUID: "ID_2",
      displayName: "user2",
      firstName: "second",
      lastName: "person",
      posts: ["000000000000000000000001"],
      favourites: ["000000000000000000000001"],
      followingUsers: ["000000000000000000000001"],
    };

    request(app)
      .post("/api/users")
      .set("Accept", "application/json")
      .send(newUser)
      .expect(201)
      .end((err, res) => {
        expect(res.body);
        expect(res.body.displayName).toBe("user2");
        expect(res.body.firstName).toBe("second");
        expect(res.body.lastName).toBe("person");
        return done();
      });
  });

  it("post invalid user (missing firebase UUID)", (done) => {
    const newUser = {
      firebaseUUID: "",
      displayName: "user2",
      firstName: "second",
      lastName: "person",
      posts: ["000000000000000000000001"],
      favourites: ["000000000000000000000001"],
      followingUsers: ["000000000000000000000001"],
    };

    request(app)
      .post("/api/users")
      .set("Accept", "application/json")
      .send(newUser)
      .expect(500)
      .end((err, res) => {
        expect(err);
        return done();
      });
  });

  it("post invalid user (missing display name)", (done) => {
    const newUser = {
      firebaseUUID: "ID_2",
      displayName: "",
      firstName: "second",
      lastName: "person",
      posts: ["000000000000000000000001"],
      favourites: ["000000000000000000000001"],
      followingUsers: ["000000000000000000000001"],
    };

    request(app)
      .post("/api/users")
      .set("Accept", "application/json")
      .send(newUser)
      .expect(500)
      .end((err, res) => {
        expect(err);
        return done();
      });
  });

  it("post invalid user (missing first name)", (done) => {
    const newUser = {
      firebaseUUID: "ID_2",
      displayName: "user2",
      firstName: "",
      lastName: "person",
      posts: ["000000000000000000000001"],
      favourites: ["000000000000000000000001"],
      followingUsers: ["000000000000000000000001"],
    };

    request(app)
      .post("/api/users")
      .set("Accept", "application/json")
      .send(newUser)
      .expect(500)
      .end((err, res) => {
        expect(err);
        return done();
      });
  });

  it("post invalid user (missing last name)", (done) => {
    const newUser = {
      firebaseUUID: "ID_2",
      displayName: "user2",
      firstName: "second",
      lastName: "",
      posts: ["000000000000000000000001"],
      favourites: ["000000000000000000000001"],
      followingUsers: ["000000000000000000000001"],
    };

    request(app)
      .post("/api/users")
      .set("Accept", "application/json")
      .send(newUser)
      .expect(500)
      .end((err, res) => {
        expect(err);
        return done();
      });
  });
});

describe("PUT user /api/users/:id", () => {
  it("successful update user", async () => {
    const updatedUser = {
      firebaseUUID: "ID_1",
      displayName: "user1",
      firstName: "updated",
      lastName: "user",
      posts: ["000000000000000000000001"],
      favourites: ["000000000000000000000001"],
      followingUsers: ["000000000000000000000001"],
    };

    await request(app)
      .put("/api/users/000000000000000000000001")
      .set("Accept", "application/json")
      .send(updatedUser)
      .expect(204);

    const { body: updatedDBUser } = await request(app)
      .get("/api/users/000000000000000000000001")
      .send()
      .expect(200);

    expect(updatedDBUser.firstName).toBe("updated");
  });
});
