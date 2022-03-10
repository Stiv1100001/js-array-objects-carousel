const items = [
  {
    img: 'img/01.jpg',
    title: 'Svezia',
    text: 'eligendi ex ad ullam, cumque provident totam omnis, magnam dolores dolorum corporis.',
  },
  {
    img: 'img/02.jpg',
    title: 'Svizzera',
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipinventore eligendi ex ad ullam, cumque provident totam omnis, magnam dolores dolorum corporis.',
  },
  {
    img: 'img/03.jpg',
    title: 'Gran Bretagna',
    text: 'Lorem ipsum, dolor sit corporis.',
  },
  {
    img: 'img/04.jpg',
    title: 'Germania',
    text: 'Lorem ictetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam inventore eligendi ex ad ullam, cumque provident totam omnis, magnam dolores dolorum corporis.',
  },
  {
    img: 'img/05.jpg',
    title: 'Paradise',
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam inventore eligendi ex ad ullam, cumque ',
  },
];

let currentImageIndex;
let direction = 'right';

function init() {
  // | Create Main img
  const mainImage = document.createElement('img');
  mainImage.id = 'cover-image';

  // | Create Title
  const mainTitle = document.createElement('h3');
  mainTitle.id = 'cover-title';

  // | Crate Subtitle
  const mainSubtitle = document.createElement('h5');
  mainSubtitle.id = 'cover-subtitle';

  // % Insert new elements in DOM
  const coverImage = document.querySelector('.my-carousel-images');
  coverImage.appendChild(mainImage);
  coverImage.appendChild(mainTitle);
  coverImage.appendChild(mainSubtitle);

  generateCarousel(true);

  document.querySelector('.my-next').addEventListener('click', () => {
    updateCurrentIndex('+');
    setCover(currentImageIndex);
    direction = 'right';
  });

  document.querySelector('.my-previous').addEventListener('click', () => {
    updateCurrentIndex('-');
    setCover(currentImageIndex);
    direction = 'left';
  });

  setInterval(autoNext, 3000, direction);
}

function setCover(currentIndex) {
  const coverImage = document.getElementById('cover-image');

  coverImage.src = items[currentIndex].img;
  coverImage.alt = items[currentIndex].title;

  document.getElementById('cover-title').innerText = items[currentIndex].title;
  document.getElementById('cover-subtitle').innerText = items[currentIndex].text;

  const carouselImages = document.querySelectorAll('.carousel-image');

  for (let i = 0; i < carouselImages.length; i++) {
    carouselImages[i].classList.remove('active');
  }

  carouselImages[currentIndex].classList.add('active');
}

function generateCarousel(isInit = false) {
  const carouselContainer = document.querySelector('.my-thumbnails');

  for (let i = 0; i < items.length; i++) {
    const newCarouselImage = document.createElement('img');

    newCarouselImage.classList.add('carousel-image');
    newCarouselImage.style.width = `calc( 100% / ${items.length})`;

    newCarouselImage.src = items[i].img;
    newCarouselImage.alt = items[i].title;

    carouselContainer.appendChild(newCarouselImage);
  }

  if (isInit) {
    currentImageIndex = 0;
    setCover(currentImageIndex);
  }
}

function autoNext() {
  if (direction === 'right') {
    updateCurrentIndex('+');
    setCover(currentImageIndex);
  } else if (direction === 'left') {
    updateCurrentIndex('-');
    setCover(currentImageIndex);
  }
}

function updateCurrentIndex(plusMinus) {
  if (plusMinus === '+') {
    currentImageIndex++;
    if (currentImageIndex === items.length) currentImageIndex = 0;
  } else if (plusMinus === '-') {
    currentImageIndex--;
    if (currentImageIndex < 0) currentImageIndex = items.length - 1;
  }
}

init();
