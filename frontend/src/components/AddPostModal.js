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
  
} from '@ionic/react';
import { closeOutline, locationOutline} from 'ionicons/icons';
import { useState } from "react";
import "./AddPostModal.css";

export const AddPostModal = () => {
  const [isModalOpen, setIsModalOpen] = useState('true')
  const [searchLocationText, setSearchLocationText] = useState('');
  const [experienceText, setExperienceText] = useState('');

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

        </IonContent>
      </IonModal>
    );
}