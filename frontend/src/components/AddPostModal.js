import {
  IonModal,
  IonButton,
  IonButtons,
  IonIcon,
  IonTitle,
  IonToolbar,
  IonTextarea,
  IonRow,
  useIonToast,
  IonFab,
  IonFabButton,
  IonInput,
  IonItem,
  IonLabel,
  IonHeader,
  IonChip,
} from "@ionic/react";
import {
  closeOutline,
  cameraOutline,
  star,
  closeCircleOutline,
} from "ionicons/icons";
import { useState } from "react";
import { DietariesSelect } from "./DietariesSelect";
import "./AddPostModal.css";

export const AddPostModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [foodName, setFoodName] = useState("");
  const [experienceText, setExperienceText] = useState("");
  const [images, setImages] = useState([]);
  const [restaurantName, setRestaurantName] = useState("");
  const [dietaries, setDietaries] = useState([]);
  const [tag, setTag] = useState("");
  const [tagsList, setTagsList] = useState([]);
  const [present] = useIonToast();

  function getFiveStarRating() {
    const greyStars = [...Array(6).keys()].slice(1);

    return (
      <IonButtons className="star-rating">
        {greyStars.map((num) => {
          return (
            <IonIcon
              key={num}
              size="large"
              icon={star}
              class="star"
              onClick={(e) => {
                ratingStar(e);
              }}
            />
          );
        })}
      </IonButtons>
    );
  }

  function ratingStar(e) {
    document.querySelectorAll(".star-rating .star").forEach((eIcon) => {
      eIcon.classList.remove("active");
    });
    prevAll(e.target);
  }

  function getRateOfFood() {
    return document.querySelectorAll(".star-rating .active").length;
  }

  function prevAll(element) {
    element.classList.add("active");

    while ((element = element.previousElementSibling)) {
      element.classList.add("active");
    }
  }

  function handlePreviewImages(uploadImgs) {
    if (uploadImgs) {
      const files = Array.from(uploadImgs);

      if (files.length <= 9) {
        return (
          <IonRow className="nine-images">
            {files.map((file, num) => {
              const imgUrl = URL.createObjectURL(file);
              return (
                <img
                  id={num}
                  key={num}
                  src={imgUrl}
                  alt="your image"
                  width="120px"
                  style={{ objectFit: "cover" }}
                />
              );
            })}
          </IonRow>
        );
      } else {
        present({
          message: "Share up to 9 photos in one post.",
          mode: "ios",
          color: "dark",
          duration: 2000,
        });
      }
    }
  }

  function handleReset() {
    setRestaurantName("");
    setFoodName("");
    setExperienceText("");
    setImages([]);
    setDietaries([]);
    setTag("");
    setTagsList([]);
    document.querySelectorAll(".star-rating .star").forEach((eIcon) => {
      eIcon.classList.remove("active");
    });
  }

  function handleSubmitPost() {
    let postJson = {
      foodName: "",
      rate: getRateOfFood(),
      timestamp: new Date(),
      bodyText: experienceText,
      imgs: images,
      restaurant: restaurantName,
    };

    setIsModalOpen(false);
    handleReset();
  }

  const handleEnterTag = (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      setTag("");

      if (tag.length > 1) {
        if (tagsList.length < 5) {
          setTagsList([...tagsList, tag]);
        } else {
          present({
            message: "Maximum 5 tags per post only",
            mode: "ios",
            color: "dark",
            duration: 2000,
          });
        }
      }
    }
  };

  const removeTag = (idx) => {
    tagsList.splice(idx, 1);
    setTagsList([...tagsList]);
  };

  return (
    <IonModal
      className="add-post-modal"
      trigger="addPost"
      isOpen={isModalOpen}
      swipeToClose
      mode="ios"
      onDidPresent={() => setIsModalOpen(true)}
      onDidDismiss={() => {
        handleReset();
        setIsModalOpen(false);
      }}
    >
      <IonHeader>
        <IonItem lines="none">
          <IonTitle color="primary">Add a Review</IonTitle>
          <IonButtons slot="end">
            <IonButton
              color="light"
              onClick={() => {
                handleReset();
                setIsModalOpen(false);
              }}
            >
              <IonIcon icon={closeOutline} />
            </IonButton>
          </IonButtons>
        </IonItem>
      </IonHeader>
      {/* Adding food name */}
      <IonToolbar mode="ios">
        <IonItem lines="none" className="foodname">
          <IonLabel position="fixed">Food Name</IonLabel>
          <IonInput
            value={foodName}
            required={true}
            autoCorrect="on"
            type="text"
            placeholder="Enter food name"
            className="food-name-input"
            onIonChange={(e) => setFoodName(e.detail.value)}
          />
        </IonItem>

        {/* Adding the restaurant name*/}
        <IonItem lines="none" className="foodname">
          <IonLabel position="fixed">Restaurant</IonLabel>
          <IonInput
            value={restaurantName}
            required={true}
            autoCorrect="on"
            type="text"
            placeholder="Enter restaurant name"
            className="restaurant-input"
            style={{ verticalAlign: "text-top" }}
            onIonChange={(e) => setRestaurantName(e.detail.value)}
          />
        </IonItem>

        {/* Adding dietaries for the food*/}
        <DietariesSelect dietaries={dietaries} setDietaries={setDietaries} />

        {/* Adding tags*/}
        <IonItem lines="none">
          <IonLabel position="fixed">Tags</IonLabel>
          <IonInput
            value={tag}
            required={true}
            autoCorrect="on"
            type="text"
            placeholder="Add tags to your post"
            className="tags-input"
            style={{ verticalAlign: "text-top" }}
            onKeyUp={(e) => handleEnterTag(e)}
            onIonChange={(e) => setTag(e.detail.value)}
          />
          <IonChip color="medium" className="chip">
            {tagsList.length} / 5
          </IonChip>
        </IonItem>
        <IonItem lines="none">
          {tagsList.map((tag, idx) => {
            return (
              <IonChip key={idx} color="primary" className="chip">
                {tag}
                <IonIcon
                  icon={closeCircleOutline}
                  onClick={() => removeTag(idx)}
                  style={{ cursor: "pointer" }}
                />
              </IonChip>
            );
          })}
        </IonItem>
      </IonToolbar>

      {/* Adding experience and images to the food */}
      <IonToolbar mode="md">
        <IonTextarea
          placeholder="Share your experience with others ~"
          value={experienceText}
          rows={5}
          enterkeyhint="enter"
          spellCheck={true}
          onIonChange={(e) => setExperienceText(e.detail.value)}
          style={{
            border: "1px solid #ccc",
          }}
        />

        <div className="upload">
          <input
            id="upload-images"
            name="upload-images"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              setImages(e.target.files);
            }}
          />
          {handlePreviewImages(images)}
          <IonRow>
            <IonFab
              vertical="bottom"
              horizontal="end"
              style={{ paddingRight: "1rem" }}
            >
              <IonFabButton>
                <label htmlFor="upload-images">
                  <IonIcon icon={cameraOutline} color="ionWhite" />
                </label>
              </IonFabButton>
            </IonFab>
          </IonRow>
        </div>
      </IonToolbar>

      {/* Dynamic Rating section and submit button section */}
      <IonToolbar style={{ padding: "0 1rem" }}>
        {getFiveStarRating()}
        <IonButton
          shape="round"
          slot="end"
          onClick={(e) => {
            handleSubmitPost();
          }}
        >
          Submit
        </IonButton>
      </IonToolbar>
    </IonModal>
  );
};
