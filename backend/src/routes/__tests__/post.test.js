const request = require("supertest");
const express = require("express");
const routes = require("../index");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

let mongod;

const app = express();
app.use(express.json());
app.use("/", routes);

app.listen(80, () => console.log(`App server listening on port ${80}!`));

describe("GET /post/:id", () => {
  it("do return post", (done) => {
    request(app)
      .get("/post/6243c31783390bc7186d14b2")
      .send()
      .expect(200)
      .end((err, res) => {
        expect(res.body);
        expect(res.body[0].foodName).toBe("Beef");
        return done();
      });
  });
});

describe("Fail GET /post/:id", () => {
  it("do return post", (done) => {
    request(app)
      .get("/post/0")
      .send()
      .expect(404)
      .end((err) => {
        expect(err);
        return done();
      });
  });
});
