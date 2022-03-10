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

  document.getElementById('my-before-carousel').innerHTML = '<h3>Awesome Carousel</h3>';
  generateCarousel(true);
  createForm();

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

function addImageToCarousel() {
  const title = document.getElementById('input-title');
  const subtitle = document.getElementById('input-subtitle');
  const img = document.getElementById('input-image');

  const newItem = {
    title: title.value,
    text: subtitle.value,
    img: `img/${img.value}`,
  };

  title.value = '';
  subtitle.value = '';
  img.value = '';

  items.push(newItem);

  generateCarousel();
}

function createForm() {
  const form = document.createElement('div');
  form.classList.add('d-flex', 'flex-column', 'justify-content-center', 'align-items-center');

  const title = document.createElement('h4');
  title.innerText = 'Insert new carousel image';

  const inputTitle = document.createElement('input');
  inputTitle.classList.add('form-control', 'mb-3');
  inputTitle.placeholder = 'Title';
  inputTitle.type = 'text';
  inputTitle.id = 'input-title';

  const inputSubtitle = document.createElement('input');
  inputSubtitle.classList.add('form-control', 'mb-3');
  inputSubtitle.placeholder = 'Subtitle';
  inputSubtitle.type = 'text';
  inputSubtitle.id = 'input-subtitle';

  const inputImage = document.createElement('input');
  inputImage.classList.add('form-control', 'mb-3');
  inputImage.placeholder = 'Image';
  inputImage.type = 'text';
  inputImage.id = 'input-image';

  const insertButton = document.createElement('button');
  insertButton.classList.add('btn', 'btn-warning');
  insertButton.innerText = 'Add';
  insertButton.addEventListener('click', addImageToCarousel);

  form.appendChild(title);
  form.appendChild(inputTitle);
  form.appendChild(inputSubtitle);
  form.appendChild(inputImage);
  form.appendChild(insertButton);

  const col = document.createElement('div');
  col.classList.add('col-4', 'offset-4');

  col.appendChild(form);

  document.querySelector('.row').appendChild(col);
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

  let container;

  if (isInit) {
    container = document.createElement('div');
    container.id = 'container';
  } else {
    container = document.getElementById('container');
  }

  container.innerHTML = '';

  carouselContainer.appendChild(container);

  for (let i = 0; i < items.length; i++) {
    const newCarouselImage = document.createElement('img');

    newCarouselImage.classList.add('carousel-image');
    newCarouselImage.style.width = `calc( 100% / ${items.length})`;

    newCarouselImage.src = items[i].img;
    newCarouselImage.alt = items[i].title;

    container.appendChild(newCarouselImage);
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
