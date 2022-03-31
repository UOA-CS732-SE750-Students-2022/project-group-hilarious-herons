import { 
  IonModal, 
  IonContent, 
  IonButton, 
  IonButtons,
  IonIcon,
  IonTitle, 
  IonToolbar,
  IonSearchbar,
  IonTextarea,
  IonInput,
  IonLabel
} from '@ionic/react';
import { 
  closeOutline, 
  locationOutline, 
  cameraOutline,
} from 'ionicons/icons';
import { useState } from "react";
import './AddPostModal.css';

export const AddPostModal = () => {
  const [isModalOpen, setIsModalOpen] = useState('true')
  const [searchLocationText, setSearchLocationText] = useState('');
  const [experienceText, setExperienceText] = useState('');
  
  const [postJson, setPostJson] = useState ({
    food: "",
    rating: 0,
    timestamp: new Date(),
    imgs: [],
    bodyText: "",
    restaurant: ""
  });
  
  function getFiveStarRating () {
    const greyStars = [...Array(6).keys()].slice(1);

    return ( 
      <IonButtons className='star-rating'>
        { greyStars.map((num) => { 
              return <IonIcon 
                    key={num}
                    size='large' 
                    src="/star.svg" 
                    class='star' 
                    onClick={(e) => {
                      ratingStar(e);
                    }}/>;
            }) 
        }
      </IonButtons>) 
  }

  function ratingStar(e) {
    document.querySelectorAll('.star-rating .star').forEach ( (eIcon) =>
      eIcon.classList.remove('active')
    )
    prevAll(e.target)
  }

  function prevAll(element) {
    element.classList.add('active')
    
    while (element = element.previousElementSibling) {
          element.classList.add('active')
    }
  } 
  
  return (
      <IonModal className='add-post-modal'
                trigger='addPost' 
                isOpen={isModalOpen}
                swipeToClose={true} 
                mode='ios'>
        <IonContent>
          <IonToolbar>
            <IonTitle color='primary'>
              Add a Review
            </IonTitle>
            <IonButtons slot='primary'>
              <IonButton color='light' 
                         onClick={ () => setIsModalOpen(false)}>
                <IonIcon icon={ closeOutline } />
              </IonButton>
            </IonButtons>
          </IonToolbar>

          <IonToolbar mode='md' className='location'>
            <IonTitle size='small'>Restaurant Location</IonTitle>
            <IonSearchbar
                value={ searchLocationText } 
                class="location-bar"
                mode="ios"
                placeholder='Serach'
                searchIcon= {locationOutline}
                showClearButton='never'
                style={{ padding: '0 1em'}}
                onIonChange={(e) => {
                  setSearchLocationText(e.detail.value)
                }}/> 

              <IonTextarea 
                placeholder="Share your experience with others ~" 
                value={ experienceText } 
                rows={ 6 } 
                enterkeyhint='enter'
                spellCheck={ true }
                onIonChange={e => setExperienceText(e.detail.value)}
                style={{       
                  border: "1px solid #ccc"
                }}>
              </IonTextarea>
       
              <div className='upload'>
                <input
                    id="upload-images" 
                    name="upload-images" 
                    type="file" 
                    accept="image/*" 
                    multiple
                    placeholder="Upload Images" 
                    onChange={ (e) => {
                      console.log(e.target.files);
                      // postJson.imgs = setPostJson([e.target.files])
                    }} 
                />
              <label htmlFor="upload-images" >
                <IonIcon icon={ cameraOutline } color='medium'/>
              </label>
              </div>
          </IonToolbar>

    
          <IonToolbar>
            { getFiveStarRating() }
            <IonButton shape="round" slot='end' onClick={(e) => {
               
            }}>
              Submit
            </IonButton>
          </IonToolbar>

        </IonContent>
      </IonModal>
  );
}