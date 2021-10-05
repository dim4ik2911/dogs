const breed = document.getElementById("breed");
const slideshow = document.getElementsByClassName("slideshow");
let timer;
let deleteFirstPhotoDelay;

// main function - allows us to get the data
const start = async () => {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();

    createBreedList(data.message);
  } catch (e) {
    alert("No Internet Connection");
  }
};
start();

// function for slide show of images
const createSlideShow = (images) => {
  let currentPosition = 0;
  clearInterval(timer);
  clearInterval(deleteFirstPhotoDelay);
  slideshow[0].innerHTML = `<div class="slide" style="background-image: url(${images[0]})"></div>
  <div class="slide" style="background-image: url(${images[1]})"></div>`;
  currentPosition += 2;
  const nextSlide = () => {
    slideshow[0].insertAdjacentHTML(
      "beforeend",
      `<div class="slide" style="background-image: url(${images[currentPosition]})"></div>`
    );
    deleteFirstPhotoDelay = setTimeout(() => {
      document.getElementsByClassName("slide")[0].remove();
    }, 1000);
    if (currentPosition + 1 >= images.length) {
      currentPosition = 0;
    } else {
      currentPosition++;
    }
  };
  timer = setInterval(nextSlide, 3000);
};

// function to load the chosed breed
const loadByBreed = async (breed) => {
  if (breed !== "Choose your breed") {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    const images = await response.json();
    createSlideShow(images.message);
  }
};
// function to get options of breeds
const createBreedList = (information) => {
  breed.innerHTML = `<select onchange="loadByBreed(this.value)">
  <option>Choose your breed</option>
  ${Object.keys(information).map((info) => {
    return `<option>${info}</option>`;
  })}
  </select>`;
};
