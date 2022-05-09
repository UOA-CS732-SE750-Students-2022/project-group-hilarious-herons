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
                  alt="your"
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
      foodName: foodName,
      bodyText: experienceText,
      tags: tagsList,
      dietaries: dietaries,
      numberOfLikes: 0,
      rating: getRateOfFood(),
      numberOfReviews :0,
      timestamp: new Date(),
      restaurantId: "626268a2797a487bcc773af8",
    };

    console.log(images[0]);
    PostService.addPost(postJson, images[0]);

    setIsModalOpen(false);
    handleReset();
  }

  const handleEnterTag = (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      setTag("");

      if (tag.length > 0) {
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

  const getLocations = () => {
    const locations = [
      { name: "McDonald's Ti Rakau", address: "500 Ti Rakau Dr" },
      { name: "McDonald's Botany Town centre", address: "Botany Town Centre" },
      { name: "McDonald's Pakuranga", address: "472 Pakuranga Rd" },
      { name: "McDonald's Ormiston", address: "249 Ormiston Rd" },
      { name: "Carl's Jr. Pakuranga", address: "490 Pakuranga Rd" },
      { name: "Carl's Jr. St Johns", address: "113-117 Felton Mathew Ave" },
      { name: "Carl's Jr.", address: "639 Great South Rd" },
      { name: "Domino's Pizza Howick", address: "26 Moore St" },
      {
        name: "Domino's Pizza Highland Park NZ",
        address: "Unit 3/5 Aviemore Dr",
      },
      { name: "Domino's Pizza Pakuranga", address: "2 Johns Ln" },
    ];

    return locations;
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
        <LocationSearchbar
          label="Restaurant"
          placeholder="Enter restaurant name"
          locationText={restaurantName}
          setLocationText={setRestaurantName}
          locations={getLocations()}
        />

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
            placeholder="Add tags to your post (e.g. burger, pasta, etc)"
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
