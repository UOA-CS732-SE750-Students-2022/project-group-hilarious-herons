const Post = require("./PostSchema");

/**
 * Saves a post to the database
 * @param {*} post The Post object to be saved
 * @returns Post object created from mongoose schema
 */
exports.createPost = async (post) => {
  const newPost = new Post(post);
  await newPost.save();

  return newPost;
};

/**
 * Retrieves the post from the database with the specified ID
 * @param {*} postId UUID for post to be retrieved
 * @returns Object with given postID if it can be found
 */
exports.retrievePost = async (postId) => {
  return await Post.findById(postId);
};

/**
 * Updates an existing post in the database with new data from supplied object
 * @param {*} post
 * @returns True if object is found and update, false otherwise
 */
exports.updatePost = async (post) => {
  const existingPost = await Post.findById(post._id);

  if (existingPost) {
    existingPost.foodName = post.foodName;
    existingPost.bodyText = post.bodyText;
    existingPost.tags = post.tags;
    existingPost.dietryRequirements = post.dietryRequirements;
    existingPost.restaurant = post.restaurant;
    existingPost.numberOfLikes = post.numberOfLikes;
    existingPost.rating = post.rating;
    existingPost.numberOfReviews = post.numberOfReviews;

    await existingPost.save();

    return true;
  }

  return false;
};

/**
 * Deletes the post from the database, if it exists.
 * @param {*} postId The ID for the post to be deleted
 * @returns
 */
exports.deletePost = async (postId) => {
  return await Post.deleteOne({ id: postId });
};
