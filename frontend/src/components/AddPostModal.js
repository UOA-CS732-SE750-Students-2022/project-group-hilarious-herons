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
  IonRow,
  useIonToast,
} from '@ionic/react';
import { 
  closeOutline, 
  locationOutline, 
  cameraOutline,
  star
} from 'ionicons/icons';
import { useState } from "react";
import './AddPostModal.css';

export const AddPostModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchLocationText, setSearchLocationText] = useState('');
  const [experienceText, setExperienceText] = useState('');
  const [images, setImages] = useState();
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
                             width='100px'
                             style={{ objectFit: "cover" }}/>
              })
            } 
          </IonRow>
        )
      } else {
        present({
          message: 'Share up to 9 photos in one post.',
          mode: "ios",
          color: "dark",
          duration: 2000,
        })
      }
    }
  }

  function handleSubmitPost() {
    let postJson = { 
      foodName: "",
      rate: getRateOfFood(),
      timestamp: new Date(),
      bodyText: experienceText,
      imgs: images,
      restaurant: searchLocationText 
    }    
    setIsModalOpen(false);
  }
  
  return (
      <IonModal className='add-post-modal'
                trigger='addPost' 
                isOpen={ isModalOpen }
                swipeToClose
                mode='ios'
                onDidPresent={() => setIsModalOpen(true)}
                onDidDismiss={() => setIsModalOpen(false)}
                >
        <IonContent>
          {/* Modal header and close button section */}
          <IonToolbar>
            <IonTitle color='primary'>
              Add a Review
            </IonTitle>
            <IonButtons slot='primary'>
              <IonButton color="light" 
                         onClick={ () => {
                            setIsModalOpen(false);
                            console.log(isModalOpen);                        
                          }
                        }>
                <IonIcon icon={ closeOutline } />
              </IonButton>
            </IonButtons>
          </IonToolbar>
          {/* Search locations of the restrautants section */}
          <IonToolbar mode="md" className="location">
            <IonTitle size='small'>Restaurant Location</IonTitle>
            <IonSearchbar
                value={ searchLocationText } 
                class="location-bar"
                mode="ios"
                placeholder="Search"
                searchIcon= { locationOutline }
                showClearButton="never"
                style={{ padding: "0 1em"}}
                onIonChange={ (e) => {
                  setSearchLocationText(e.detail.value)
                }}/> 
                
              {/* Typing expereicne section */}
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

              {/* upload image section */}
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
                    <label htmlFor="upload-images" >
                        <IonIcon icon={ cameraOutline } color='medium'/>
                    </label>
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