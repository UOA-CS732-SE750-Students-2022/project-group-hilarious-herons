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

// describe("GET /post/:id", () => {
//   it("do return post", (done) => {
//     request(app)
//       .get("/post/62497099b05489667afd295c")
//       .send()
//       .expect(200)
//       .end((err, res) => {
//         expect(res.body);
//         expect(res.body.foodName).toBe("Beef");
//         return done();
//       });
//   });
// });

// describe("Fail GET /post/:id", () => {
//   it("do not return post", (done) => {
//     request(app)
//       .get("/post/0")
//       .send()
//       .expect(404)
//       .end((err) => {
//         expect(err);
//         return done();
//       });
//   });
// });

describe("Post /post/like-post", () => {
  it("increment likes", (done) => {
    request(app)
      .get("/post/62497099b05489667afd295c")
      .send()
      .end((err, res) => {
        const numberOfLikes = res.body.numberOfLikes;

        request(app)
          .post("/post/like-post")
          .send(data)
          .expect(200)
          .end((err, res) => {
            expect(res);
            expect(res.body.currentLikes).toBe(numberOfLikes + 1);
            return done();
          });
      });

    const data = {
      id: "62497099b05489667afd295c",
    };
  });
});

describe("Post /post/unlike-post", () => {
  it("unlikes", (done) => {
    request(app)
      .get("/post/62497099b05489667afd295c")
      .send()
      .end((err, res) => {
        const numberOfLikes = res.body.numberOfLikes;

        request(app)
          .post("/post/unlike-post")
          .send(data)
          .expect(200)
          .end((err, res) => {
            expect(res);
            expect(res.body.currentLikes).toBe(
              numberOfLikes === 0 ? 0 : numberOfLikes - 1
            );
            return done();
          });
      });

    const data = {
      id: "62497099b05489667afd295c",
    };
  });
});
