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
import { LocationSearchbar } from "./LocationSearchbar";
import { PostService } from "../services/PostService";

export const AddPostModal = ({ isModalOpen, setIsModalOpen }) => {
  const [foodName, setFoodName] = useState("");
  const [experienceText, setExperienceText] = useState("");
  const [images, setImages] = useState([]);
  const [restaurantName, setRestaurantName] = useState("");
  const [restauantId, setRestaurantId] = useState("");
  const [dietaries, setDietaries] = useState([]);
  const [tag, setTag] = useState("");
  const [tagsList, setTagsList] = useState([]);
  const [present] = useIonToast();
  const [tagButton, setTagButton] = useState("");

  const createWarning = (message) => {
    return present({
      message: message,
      mode: "ios",
      color: "dark",
      duration: 2000,
    });
  };

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
                  alt="your"
                  width="120px"
                  style={{ objectFit: "cover" }}
                />
              );
            })}
          </IonRow>
        );
      } else {
        createWarning("Share up to 9 photos in one post.");
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
    setRestaurantId("");
    document.querySelectorAll(".star-rating .star").forEach((eIcon) => {
      eIcon.classList.remove("active");
    });
  }

  async function handleSubmitPost() {
    if (
      foodName == "" ||
      tagsList.length == 0 ||
      images.length == 0 ||
      restauantId == ""
    ) {
      if (images.length == 0) {
        createWarning("Please upload an image");
      } else {
        createWarning("Please enter all required field");
      }
    } else {
      let postJson = {
        foodName: foodName,
        bodyText: experienceText,
        tags: tagsList,
        dietaries: dietaries,
        numberOfLikes: 0,
        rating: getRateOfFood(),
        numberOfReviews: 0,
        timestamp: new Date(),
        restaurantId: restauantId,
      };

      console.log(postJson);
      const res = await PostService.addPost(postJson, images[0]);
      if (!res || res.status >= 400) {
        console.log(res);

        createWarning("Add post uncessefully: " + res.data.message);
      } else {
        createWarning("Add post successfully");
      }
      setIsModalOpen(false);
      handleReset();
    }
  }

  const handleEnterTag = (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      setTag("");

      if (tag.length > 0) {
        if (tagsList.length < 5) {
          setTagsList([...tagsList, tag]);
        } else {
          createWarning("Maximum 5 tags per post only");
        }
      }
    }
  };

  const removeTag = (idx) => {
    tagsList.splice(idx, 1);
    setTagsList([...tagsList]);
  };

  const handleEnterButtonTag = () => {
    setTag("");
    if (tag.length > 0) {
      if (tagsList.length < 5) {
        setTagsList([...tagsList, tag]);
      } else {
        createWarning("Maximum 5 tags per post only");
      }
    }
  };

  return (
    <IonModal
      className="add-post-modal"
      isOpen={isModalOpen}
      swipeToClose
      mode="ios"
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
          <IonLabel position="fixed">Food Name*</IonLabel>
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
        <LocationSearchbar
          label="Restaurant*"
          placeholder="Enter restaurant name"
          locationText={restaurantName}
          setLocationText={setRestaurantName}
          setRestaurantId={setRestaurantId}
          restauantId={restauantId}
        />

        {/* Adding dietaries for the food*/}
        <DietariesSelect dietaries={dietaries} setDietaries={setDietaries} />

        {/* Adding tags*/}
        <IonItem lines="none">
          <IonLabel position="fixed">Tags*</IonLabel>
          <IonInput
            value={tag}
            required={true}
            autoCorrect="on"
            type="text"
            placeholder="Add tags to your post (e.g. burger, pasta, etc)"
            className="tags-input"
            style={{ verticalAlign: "text-top" }}
            onKeyUp={(e) => handleEnterTag(e)}
            onIonChange={(e) => setTag(e.detail.value)}
          />
          <IonButton onClick={(e) => handleEnterButtonTag()}>Enter</IonButton>

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
      <IonToolbar color="background-color" style={{ padding: "0 1rem" }}>
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
