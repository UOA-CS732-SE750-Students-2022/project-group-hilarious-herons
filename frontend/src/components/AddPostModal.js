import { 
  IonModal, 
  IonContent, 
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
} from '@ionic/react';
import { 
  closeOutline, 
  cameraOutline,
  star
} from 'ionicons/icons';
import { useState } from "react";
import { LocationSearchbar } from './LocationSearchbar';
import './AddPostModal.css';

export const AddPostModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [foodName, setFoodName] = useState('');
  const [locationFilter, setLocationFilter] = useState(
    localStorage.getItem("locationFilter") || ""
  );
  const [experienceText, setExperienceText] = useState('');
  const [images, setImages] = useState([]);
  const [present] = useIonToast();
  
  
  function getFiveStarRating () {
    const greyStars = [...Array(6).keys()].slice(1);

    return ( 
      <IonButtons className='star-rating'>
        { greyStars.map((num) => { 
              return <IonIcon 
                    key={num}
                    size='large' 
                    icon={ star }
                    class='star' 
                    onClick={(e) => {
                      ratingStar(e);
                    }}/>;
            }) 
        }
      </IonButtons>) 
  }

  function ratingStar(e) {
    document.querySelectorAll('.star-rating .star').forEach ( (eIcon) => {
      eIcon.classList.remove('active');
    })
    prevAll(e.target)
  }

  function getRateOfFood() {
    return document.querySelectorAll('.star-rating .active').length
  }

  function prevAll(element) {
    element.classList.add('active')
    
    while (element = element.previousElementSibling) {
          element.classList.add('active')
    }
  } 

  function handlePreviewImages(uploadImgs) {
    if(uploadImgs) {
      const files = Array.from(uploadImgs);

      if(files.length <= 9) {
        return (
          <IonRow className='nine-images'>
            { 
              files.map( (file, num) => {
                const imgUrl = URL.createObjectURL(file);
                return  <img id={ num } 
                             key={ num } 
                             src={ imgUrl } 
                             alt='your image' 
                             width='120px'
                             style={{ objectFit: "cover" }}/>
              })
            } 
          </IonRow>
        )
      } else {
        present({
          message: 'Share up to 9 photos in one post.',
          mode: 'ios',
          color: 'dark',
          duration: 2000,
        })
      }
    }
  }

  function handleReset () {
    setLocationFilter("");
    setFoodName("");
    setExperienceText("");
    setImages([]);
    document.querySelectorAll('.star-rating .star').forEach ( (eIcon) => {
      eIcon.classList.remove('active');
    })

  }

  function handleSubmitPost() {
    let postJson = { 
      foodName: "",
      rate: getRateOfFood(),
      timestamp: new Date(),
      bodyText: experienceText,
      imgs: images,
      restaurant: locationFilter,
    }    
    
    setIsModalOpen(false);
    handleReset();
  }
  
  return (
      <IonModal className='add-post-modal'
                trigger='addPost' 
                isOpen={ isModalOpen }
                swipeToClose
                mode='ios'
                onDidPresent={() => setIsModalOpen(true)}
                onDidDismiss={() => { 
                  handleReset();
                  setIsModalOpen(false);
                }}
                >
        <IonHeader>
          <IonItem lines='none'>
              <IonTitle color='primary'>
                Add a Review
              </IonTitle>
              <IonButtons slot='end'>
                <IonButton color="light" 
                           onClick={ () => { 
                             handleReset();
                             setIsModalOpen(false) 
                            }}
                >
                    <IonIcon icon={ closeOutline } />
                </IonButton>
            </IonButtons>
          </IonItem>
        </IonHeader>
        <IonContent>
                
          {/* Search locations of the restrautants section */}     
          <IonItem lines="none" className='foodname'>
              <IonLabel >Food Name</IonLabel>
              <IonInput value={ foodName } 
                        size="text"
                        placeholder="Enter food name" 
                        className='food-name-input'
                        onIonChange={ (e) => 
                          setFoodName(e.detail.value)
                        } />
            </IonItem>
            
            <LocationSearchbar locationFilter={ locationFilter } setLocationFilter={ setLocationFilter }/>
            
            <IonToolbar mode='md'>
              <IonTextarea 
                placeholder="Share your experience with others ~" 
                value={ experienceText } 
                rows={ 6 } 
                enterkeyhint='enter'
                spellCheck={ true }
                onIonChange={ e => 
                  setExperienceText(e.detail.value) 
                }
                style={{       
                  border: "1px solid #ccc"
                }}>
              </IonTextarea>  

              <div className='upload'>
                <input id="upload-images" 
                       name="upload-images" 
                       type="file" 
                       accept="image/*" 
                       multiple
                      onChange={ (e) => {
                        setImages(e.target.files);
                      }} />
                { handlePreviewImages(images) }
                <IonRow>
                  
                    <IonFab vertical="bottom" horizontal="end" >
                      <IonFabButton>
                       <label htmlFor="upload-images" >
                          <IonIcon icon={ cameraOutline } color="ionWhite"/>
                      </label>
                      </IonFabButton>
                    </IonFab>
                </IonRow>
              </div>
          </IonToolbar>

          {/* Dynamic Rating section and submit button section */}
          <IonToolbar>
            { getFiveStarRating() }
            <IonButton shape="round" 
                       slot='end' 
                       onClick={(e) => { 
                          handleSubmitPost();
                        }}
            >
              Submit
            </IonButton>
          </IonToolbar>

        </IonContent>
      </IonModal>
  );
}