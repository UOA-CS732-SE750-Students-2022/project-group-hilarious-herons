import { IonIcon, IonRow, IonText } from "@ionic/react";
import { useEffect, useState } from "react";
import { PostService } from "../services/PostService";
import { userService } from "../services/UserService";
import { SignInModal } from "./SignInModal";
import { heart, heartOutline } from "ionicons/icons";
import "./LikeButton.css";

export const LikeButton = ({ id, postLiked, numberOfLikes }) => {
  const [liked, setLiked] = useState(postLiked);
  const [showModal, setShowModal] = useState(false);
  const [totalLikes, setTotalLikes] = useState(numberOfLikes);

  useEffect(() => {
    setTotalLikes(numberOfLikes);
    setLiked(postLiked);
  }, [numberOfLikes, postLiked]);

  const updateLike = async () => {
    const userId = localStorage.getItem("uid");

    // Fetch the user if signed in
    if (userId !== null) {
      const user = await userService.getUser(userId);
      const uid = user._id;
      const favouritePosts = user.favourites;

      if (!liked) {
        setTotalLikes(totalLikes + 1);

        // update server
        PostService.likePost(id);
        favouritePosts.push(id);
        userService.updateUser(uid, user);
      } else {
        setTotalLikes(totalLikes - 1);

        // update server
        PostService.unlikePost(id);
        const idx = favouritePosts.indexOf(id);
        favouritePosts.splice(idx, 1);
        userService.updateUser(uid, user);
      }

      setLiked(!liked);
    } else {
      setShowModal(true);
    }
  };
  return (
    <IonRow style={{ display: "inline-block" }}>
      <IonIcon
        className="like-button"
        onClick={() => updateLike()}
        icon={liked ? heart : heartOutline}
        size="large"
      />
      <IonText color="dark" style={{ marginLeft: "0.3rem" }}>
        {totalLikes}
      </IonText>
      <SignInModal showModal={showModal} setShowModal={setShowModal} />
    </IonRow>
  );
};
