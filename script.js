const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photoArray = [];

//Unsplash API
const count = 10;
const apiKey ="FqODDsmOAg_e33WnzlNK8fD7JdAozFnbOD9n3nULi98"
const apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Helper 
function setAttributes(element,attributes) {
    for(const key in attributes) {
        element.setAttribute(key,attributes[key])
    }
}
//Create photos to add to DOM
function displayPhotos(){
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

//On load
getPhotos();