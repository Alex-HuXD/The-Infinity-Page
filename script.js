const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArray = [];

//Unsplash API
const count = 30;
const apiKey = config.MY_Key;
const apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images were loaded
function imageLoaded(){
    imagesLoaded++;
    
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        
    }
}

//Helper 
function setAttributes(element,attributes) {
    for(const key in attributes) {
        element.setAttribute(key,attributes[key])
    }
}
//Create photos to add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photoArray.length;
    console.log('total images', totalImages);
    photoArray.forEach((photo) =>{
        const item = document.createElement('a');
        setAttributes(item,{
            href:photo.links.html,
            target:'_blank',
        });

        const img = document.createElement('img');
        setAttributes(img, {
            src:photo.urls.regular,
            alt: photo.alt_description,
            title:photo.alt_description,
        });
        //Event listener, check when each photo is finished loading
        img.addEventListener('load',imageLoaded);
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


// Get Photos from Unsplash API

async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photoArray = await response.json();
        displayPhotos();
        
    } catch(error){

    }
}

//Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll',()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;  
        getPhotos();
    }
})

//On load
getPhotos();