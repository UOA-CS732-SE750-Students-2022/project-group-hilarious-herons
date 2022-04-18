const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Post = require("../Post/PostSchema");

let mongod;

let post1 = {
  _id: new mongoose.Types.ObjectId("000000000000000000000001"),
  foodName: "Steak",
  bodyText: "This is a nice steak",
  tags: ["Fast food", "steak"],
  dietryRequirements: [],
  restaurant: new mongoose.Types.ObjectId("000000000000000000000001"),
  numberOfLikes: 2,
  rating: 4,
  numberOfReviews: 10,
  imageURLs: [],
};

let post2 = {
  _id: new mongoose.Types.ObjectId("000000000000000000000002"),
  foodName: "Fries",
  bodyText: "This is a really nice Fries",
  tags: ["Fast food", "fries"],
  restaurant: new mongoose.Types.ObjectId("000000000000000000000001"),
  numberOfLikes: 2,
  rating: 2,
  numberOfReviews: 5,
};

let posts = [post1, post2];

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();

  const connectionString = mongod.getUri();
  await mongoose.connect(connectionString, { useNewUrlParser: true });
});

beforeEach(async () => {
  await mongoose.connection.db.dropDatabase();

  const coll = await mongoose.connection.db.createCollection("posts");
  await coll.insertMany(posts);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

it("get all posts", async () => {
  const posts = await Post.find();

  expect(posts[0]).toBeTruthy();
  expect(posts[0].foodName).toBe("Steak");
  expect(posts[0].bodyText).toBe("This is a nice steak");
  expect(posts[0].tags).toStrictEqual(["Fast food", "steak"]);
  expect(posts[0].dietryRequirements).toStrictEqual([]);
  expect(posts[0].restaurant).toStrictEqual(
    new mongoose.Types.ObjectId("000000000000000000000001")
  );
  expect(posts[0].numberOfLikes).toBe(2);
  expect(posts[0].rating).toBe(4);
  expect(posts[0].numberOfReviews).toBe(10);
  expect(posts[0].imageURLs).toStrictEqual([]);

  expect(posts[1]).toBeTruthy();
  expect(posts[1].foodName).toBe("Fries");
  expect(posts[1].bodyText).toBe("This is a really nice Fries");
  expect(posts[1].tags).toStrictEqual(["Fast food", "fries"]);
  expect(posts[1].dietryRequirements).toStrictEqual([]);
  expect(posts[1].restaurant).toStrictEqual(
    new mongoose.Types.ObjectId("000000000000000000000001")
  );
  expect(posts[1].numberOfLikes).toBe(2);
  expect(posts[1].rating).toBe(2);
  expect(posts[1].numberOfReviews).toBe(5);
});

it("get single post", async () => {
  const post = await Post.findById("000000000000000000000001");

  expect(post).toBeTruthy();
  expect(post.foodName).toBe("Steak");
  expect(post.bodyText).toBe("This is a nice steak");
  expect(post.tags).toStrictEqual(["Fast food", "steak"]);
  expect(post.dietryRequirements).toStrictEqual([]);
  expect(post.restaurant).toStrictEqual(
    new mongoose.Types.ObjectId("000000000000000000000001")
  );
  expect(post.numberOfLikes).toBe(2);
  expect(post.rating).toBe(4);
  expect(post.numberOfReviews).toBe(10);
  expect(post.imageURLs).toStrictEqual([]);
});

it("create post successfully", async () => {
  const newPost = new Post({
    foodName: "Steak",
    bodyText: "This is a nice steak",
    tags: ["Fast food", "steak"],
    dietryRequirements: [],
    restaurant: new mongoose.Types.ObjectId("000000000000000000000001"),
    numberOfLikes: 2,
    rating: 4,
    numberOfReviews: 10,
    imageURLs: [],
  });

  await newPost.save();

  const findNewPost = await Post.findById(newPost._id);

  expect(findNewPost).toBeTruthy();
  expect(findNewPost.foodName).toBe("Steak");
  expect(findNewPost.bodyText).toBe("This is a nice steak");
  expect(findNewPost.tags).toStrictEqual(["Fast food", "steak"]);
  expect(findNewPost.dietryRequirements).toStrictEqual([]);
  expect(findNewPost.restaurant).toStrictEqual(
    new mongoose.Types.ObjectId("000000000000000000000001")
  );
  expect(findNewPost.numberOfLikes).toBe(2);
  expect(findNewPost.rating).toBe(4);
  expect(findNewPost.numberOfReviews).toBe(10);
  expect(findNewPost.imageURLs).toStrictEqual([]);
});

it("fails when trying to saving post with no body text", async () => {
  const newPost = new Post({
    foodName: "Steak",
    tags: ["Fast food", "steak"],
    dietryRequirements: [],
    restaurant: new mongoose.Types.ObjectId("000000000000000000000001"),
    numberOfLikes: 2,
    rating: 4,
    numberOfReviews: 10,
    imageURLs: [],
  });

  return expect(newPost.save()).rejects.toThrow();
});

it("fails when trying to saving post with no empty text", async () => {
  const newPost = new Post({
    foodName: "Steak",
    bodyText: "",
    tags: ["Fast food", "steak"],
    dietryRequirements: [],
    restaurant: new mongoose.Types.ObjectId("000000000000000000000001"),
    numberOfLikes: 2,
    rating: 4,
    numberOfReviews: 10,
    imageURLs: [],
  });

  return expect(newPost.save()).rejects.toThrow();
});

it("fails when trying to saving post with no tags", async () => {
  const newPost = new Post({
    foodName: "Steak",
    bodyText: "",
    dietryRequirements: [],
    restaurant: new mongoose.Types.ObjectId("000000000000000000000001"),
    numberOfLikes: 2,
    rating: 4,
    numberOfReviews: 10,
    imageURLs: [],
  });

  return expect(newPost.save()).rejects.toThrow();
});

it("fails when trying to saving post with empty tags array", async () => {
  const newPost = new Post({
    foodName: "Steak",
    bodyText: "",
    tags: [],
    dietryRequirements: [],
    restaurant: new mongoose.Types.ObjectId("000000000000000000000001"),
    numberOfLikes: 2,
    rating: 4,
    numberOfReviews: 10,
    imageURLs: [],
  });

  return expect(newPost.save()).rejects.toThrow();
});
