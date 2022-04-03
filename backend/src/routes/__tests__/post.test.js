const request = require("supertest");
const express = require("express");
const routes = require("../index");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use("/", routes);

mongoose
  .connect(
    `mongodb+srv://db-user:${process.env.MONGO_PASSWORD}@cluster0.vprvj.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then((result) => {
    console.log("MongoDB connection successful");
  })
  .then(() => {
    app.listen(80, () => console.log(`App server listening on port ${80}!`));
  })
  .catch((error) => {
    console.log("MongoDB connection failed : ", error.message);
  });

describe("GET /post/:id", () => {
  it("do return post", (done) => {
    request(app)
      .get("/post/6243c31783390bc7186d14b2")
      .send()
      .expect(200)
      .end((err, res) => {
        expect(res.body);
        expect(res.body.foodName).toBe("Beef");
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
