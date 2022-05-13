import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import { useState } from "react";
import { AddPostModal } from "./AddPostModal";
import { SignInModal } from "./SignInModal";

export const AddPostButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const handleClick = () => {
    const uid = localStorage.getItem("uid");

    if (!uid && !showSignIn) {
      setShowSignIn(true);
      setIsModalOpen(false);
    } else if (uid && !isModalOpen) {
      setShowSignIn(false);
      setIsModalOpen(true);
    }
  };

  return (
    <IonFab
      vertical="bottom"
      horizontal="end"
      style={{ position: "fixed", padding: "1rem" }}
      onClick={() => handleClick()}
    >
      <IonFabButton id="addPost" color="ionWhite">
        <IonIcon icon={add} size="large" color="primary" />
      </IonFabButton>
      <AddPostModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <SignInModal
        showModal={showSignIn}
        setShowModal={setShowSignIn}
        title="Want to share with other?"
        subtitle="Sign in now to start creating posts"
        imgSrc="/sign-in-img-2.png"
      >
        <p className="img-attribution">
          Illustration by{" "}
          <a href="https://icons8.com/illustrations/author/u7l2K4BCiAa9">
            Natasha Remarchuk
          </a>{" "}
          from <a href="https://icons8.com/illustrations">Ouch!</a>
        </p>
      </SignInModal>
    </IonFab>
  );
};
