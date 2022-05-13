import { IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";
import { useEffect, useState } from "react";
import { FoodPage } from "../components/FoodPage";
import { PostsLayout } from "../components/PostsLayout";
import { userService } from "../services/UserService";

export const AccountPage = () => {
  const [option, setOption] = useState("liked");
  const [likedPosts, setLikedPosts] = useState([]);
  const [createdPosts, setCreatedPosts] = useState([]);

  const fetchPosts = async () => {
    const uid = localStorage.getItem("uid");
    const { favourites, posts } = await userService.getUser(uid);

    setLikedPosts(favourites);
    setCreatedPosts(posts);
  };

  useEffect(() => {
    // Call backend api to fetch user liked or created posts
    fetchPosts();
  }, [option]);

  const handleSegmentClick = async (e) => {
    setOption(e.detail.value);
  };

  return (
    <FoodPage>
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
