import { IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";
import { useEffect, useState } from "react";
import { FoodPage } from "../components/FoodPage";
import { PostsLayout } from "../components/PostsLayout";
import { BackHomeButton } from "../components/BackHomeButton";
import { userService } from "../services/UserService";
import { PostService } from "../services/PostService";
import { getTimestampFromId } from "../utils/helper";
import { Loading } from "../components/Loading";

export const AccountPage = () => {
  const [option, setOption] = useState("liked");
  const [likedPosts, setLikedPosts] = useState([]);
  const [createdPosts, setCreatedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = async () => {
    setIsLoading(true);
    const uid = localStorage.getItem("uid");
    const user = await userService.getUser(uid);

    if (!user) return null;

    if (uid !== null) {
      if (option === "liked") {
        const { favourites } = user;
        Promise.all(
          favourites.map(async (id) => {
            const {
              _id,
              imageURLs,
              foodName,
              rating,
              numberOfLikes,
              distance,
            } = await PostService.getPostDetails(id);

            return {
              id: _id,
              image: imageURLs[0],
              foodName: foodName,
              rating: rating,
              timestamp: getTimestampFromId(id),
              numberOfLikes: numberOfLikes,
              postLiked: true,
              distance,
              distance,
            };
          })
        ).then((likes) => {
          setLikedPosts(likes);
        });

        setIsLoading(false);
      } else if (option === "created") {
        const { posts } = user;
        Promise.all(
          posts.map(async (id) => {
            const { _id, imageURLs, foodName, rating, numberOfLikes } =
              await PostService.getPostDetails(id);

            return {
              id: _id,
              image: imageURLs[0],
              foodName: foodName,
              rating: rating,
              timestamp: getTimestampFromId(id),
              numberOfLikes: numberOfLikes,
              postLiked: true,
            };
          })
        ).then((created) => {
          setCreatedPosts(created);
        });

        setIsLoading(false);
      }
    }
  };

  // Fetch posts on load
  useEffect(() => {
    fetchPosts();
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
      {isLoading ? (
        <Loading />
      ) : (
        <PostsLayout
          dataForCards={option === "liked" ? likedPosts : createdPosts}
        />
      )}
    </FoodPage>
  );
};
