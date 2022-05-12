import { IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";
import { useEffect, useState } from "react";
import { FoodPage } from "../components/FoodPage";
import { PostsLayout } from "../components/PostsLayout";
import { BackHomeButton } from "../components/BackHomeButton";
import { userService } from "../services/UserService";
import { PostService } from "../services/PostService";
import { getTimestampFromId } from "../utils/helper";

export const AccountPage = () => {
  const [option, setOption] = useState("liked");
  const [likedPosts, setLikedPosts] = useState([]);
  const [createdPosts, setCreatedPosts] = useState([]);
  const [user, setUser] = useState();

  const fetchPosts = async () => {
    const uid = localStorage.getItem("uid");

    if (uid !== null) {
      if (option === "liked") {
        const favPosts = [];
        const { favourites } = await userService.getUser(uid);

        favourites.map(async (id) => {
          const { _id, imageURLs, foodName, rating, numberOfLikes } =
            await PostService.getPostDetails(id);

          favPosts.push({
            id: _id,
            image: imageURLs[0],
            foodName: foodName,
            rating: rating,
            timestamp: getTimestampFromId(id),
            numberOfLikes: numberOfLikes,
            postLiked: true,
          });
        });

        setLikedPosts(favPosts);
        console.log(likedPosts);
      } else {
        const createdPosts = [];
        const { posts } = await userService.getUser(uid);

        posts.map(async (id) => {
          const { _id, imageURLs, foodName, rating, numberOfLikes } =
            await PostService.getPostDetails(id);

          createdPosts.push({
            id: _id,
            image: imageURLs[0],
            foodName: foodName,
            rating: rating,
            timestamp: getTimestampFromId(id),
            numberOfLikes: numberOfLikes,
            postLiked: true,
          });
        });

        setCreatedPosts(posts);
        console.log(posts);
      }
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const uid = localStorage.getItem("uid");
      const user = await userService.getUser(uid);
      setUser(user);
    };
    getUser();

    // fetchPosts();
  }, []);

  const handleSegmentClick = async (e) => {
    setOption(e.detail.value);
    fetchPosts();
  };

  return (
    <FoodPage>
      <BackHomeButton />
      <IonSegment
        mode="md"
        value={option}
        onIonChange={(e) => handleSegmentClick(e)}
      >
        <IonSegmentButton value="liked">
          <IonLabel>Liked</IonLabel>
        </IonSegmentButton>

        <IonSegmentButton value="created">
          <IonLabel>Created</IonLabel>
        </IonSegmentButton>
      </IonSegment>
      <br />
      <PostsLayout
        dataForCards={option === "liked" ? likedPosts : createdPosts}
      />
    </FoodPage>
  );
};
