import { 
  IonModal, 
  IonContent, 
  IonButton, 
  IonButtons,
  IonIcon,
  IonTitle, 
  IonToolbar,
  IonSearchbar, 
  IonItem,
  IonTextarea,
  IonRadio,
  
} from '@ionic/react';
import { 
  closeOutline, 
  locationOutline, 
} from 'ionicons/icons';
import { useState } from "react";
import './AddPostModal.css';

export const AddPostModal = () => {
  const [isModalOpen, setIsModalOpen] = useState('true')
  const [searchLocationText, setSearchLocationText] = useState('');
  const [experienceText, setExperienceText] = useState('');
  
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
      <IonModal trigger='addPost' 
                isOpen={isModalOpen}
                swipeToClose={true} 
                mode='ios'>
        <IonContent>
          <IonToolbar>
            <IonTitle color='primary'>Add a Review</IonTitle>
            <IonButtons slot='primary'>
              <IonButton color='light' 
                         onClick={ () => setIsModalOpen(false)}>
                <IonIcon icon={closeOutline} />
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
                value={experienceText} 
                rows={6} 
                enterkeyhint='enter'
                spellCheck={ true }
                onIonChange={e => setExperienceText(e.detail.value)}
                style={{       
                  border: "1px solid #ccc"
                }}>
              </IonTextarea>
          </IonToolbar>
                
          <IonToolbar>
            { getFiveStarRating() }
            <IonButton slot='end'>
              Submit
            </IonButton>
          </IonToolbar>

        </IonContent>
      </IonModal>
  );
}