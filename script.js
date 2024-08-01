var video = document.getElementById("trailerVid");

// Autoplay the video when hovering
video.addEventListener("mouseenter", function() {
    video.play();
});

// Pause the video when not hovering
video.addEventListener("mouseleave", function() {
    video.pause();
});

video.addEventListener('click', function() {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) { 
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) { 
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { 
        video.msRequestFullscreen();
    }

    video.play();
});

document.addEventListener('fullscreenchange', exitHandler);
document.addEventListener('mozfullscreenchange', exitHandler);
document.addEventListener('webkitfullscreenchange', exitHandler);
document.addEventListener('msfullscreenchange', exitHandler);

function exitHandler() {
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        video.pause();
    }
}

//image carousel
const imageMap = {
    'media/daleProfile.png': 'media/daleBackground.png',
    'media/marielProfile.png': 'media/marielBackground.png',
    'media/cybilProfile.png': 'media/cybilBackground.png',
    'media/andrieProfile.png': 'media/andrieBackground.png',
    'media/marjunProfile.png': 'media/marjunBackground.png',
    'media/carlProfile.png': 'media/carlbackground.png',
    'media/delinquentsProfile.png': 'media/delinquentsBackground.png'
};

// Get all thumbnail images
const thumbnails = document.querySelectorAll('.thumbNail .itemThumbnail img');

// Get all background image items
const backgroundItems = document.querySelectorAll('.backgroundImage .item');

// Get previous and next buttons
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

// Current index for cycling through background items
let currentIndex = 0;

// Function to update the displayed background item
function updateBackground(index) {
    backgroundItems.forEach((item, i) => {
        item.style.display = i === index ? 'block' : 'none';
    });
}

// Function to show the next background item
function showNextImage() {
    currentIndex = (currentIndex + 1) % backgroundItems.length;
    updateBackground(currentIndex);
}

// Function to show the previous background item
function showPreviousImage() {
    currentIndex = (currentIndex - 1 + backgroundItems.length) % backgroundItems.length;
    updateBackground(currentIndex);
}

// Set up event listeners for thumbnails
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        const thumbnailSrc = thumbnail.src.split('/').pop(); // Get the image filename
        const backgroundSrc = imageMap[`media/${thumbnailSrc}`];

        // Find the corresponding background item
        backgroundItems.forEach((item, i) => {
            const itemImgSrc = item.querySelector('img').src.split('/').pop(); // Get the image filename
            if (`media/${itemImgSrc}` === backgroundSrc) {
                currentIndex = i;
                updateBackground(currentIndex);
            }
        });
    });
});

// Set up event listeners for buttons
nextButton.addEventListener('click', showNextImage);
prevButton.addEventListener('click', showPreviousImage);

// Initialize the first background image
updateBackground(currentIndex);



