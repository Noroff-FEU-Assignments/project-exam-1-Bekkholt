const imageURL = "https://noroffapi.bekkholt.no/wp-json/wp/v2/media/";

const api = "https://noroffapi.bekkholt.no/";
const postsURL = "wp-json/wp/v2/posts?_embed";

const fullPostsURL = api + postsURL;

async function getImages() {
  const response = await fetch(imageURL);

  const posts = await response.json();

  return posts;
}

async function getPosts() {
  const response = await fetch(fullPostsURL);

  const posts = await response.json();

  return posts;
}

const loaderContainer = document.querySelector(".slider");
const imageSpinner = document.getElementById("image_spinner");

function showLoader() {
  loaderContainer.classList.add("hidden");
  imageSpinner.classList.add("loader");
}

function stopLoader() {
  imageSpinner.classList.remove("loader");
  loaderContainer.classList.remove("hidden");
}

showLoader();
const imgDatas = await getImages();
const postDatas = await getPosts();
stopLoader();

function displayPostsDesktop(imgDatas) {
  for (let i = 0; i < 4; i++) {
    const imgData = imgDatas[i];
    const postData = postDatas[i];

    const outerContainer = document.querySelector(".slider");
    const innerContainer = document.createElement(`div`);
    const seeMoreButton = document.getElementById("see_more_button");
    innerContainer.classList.add("sliderImage");
    outerContainer.insertBefore(innerContainer, seeMoreButton);

    const postImageElement = innerContainer.appendChild(
      document.createElement(`img`)
    );
    const imgURL = imgData.source_url;
    postImageElement.src = imgURL;
    postImageElement.classList.add("featured_image");

    const aElement = innerContainer.appendChild(document.createElement(`a`));
    const hrefText = `post_specific.html?id=${postData.id}`;
    aElement.href = hrefText;
    const titleElement = aElement.appendChild(document.createElement(`h2`));
    titleElement.textContent = postData.title.rendered;
    aElement.append(titleElement, postImageElement);
  }
}

function displayPostMobile(postDatas) {
  const container = document.querySelector(".slider");
  const postContainer = document.createElement("div");
  const imageContainer = document.createElement("div");

  postContainer.classList.add("post_cards");

  const a = document.createElement(`a`);
  const titleUrl = "post_specific.html?id=";
  a.href = titleUrl + `${postDatas.id}`;

  const title = a.appendChild(document.createElement(`h2`));

  const postExcerpt = postDatas.excerpt.rendered;
  const excerptWithoutTags = postExcerpt.replace(/<[^>]*>/g, "");

  const postImage = postContainer.appendChild(document.createElement(`img`));
  const imageElement = postDatas._embedded;
  const featuredImages = imageElement[`wp:featuredmedia`];
  const featuredImage = featuredImages[0];
  const image = featuredImage.source_url;
  postImage.src = image;

  imageContainer.classList.add("image_container");
  postImage.classList.add("featured_image");

  a.append(postContainer);
  postContainer.append(title);
  postContainer.append(excerptWithoutTags);
  title.append(postDatas.title.rendered);
  postContainer.append(imageContainer);
  imageContainer.append(postImage);
  container.append(a);
}

function createPostsMobile(postDatas) {
  for (let i = 0; i < 4; i++) {
    const post = postDatas[i];
    displayPostMobile(post);
  }
}

let isTouchScreen = `ontouchstart` in window || navigator.maxTouchPoints;

if (isTouchScreen === true) {
  createPostsMobile(postDatas);
  const seeMore = document.getElementById("see_more_button");
  const buttonNext = document.getElementById("button_next");
  const buttonPrev = document.getElementById("button_prev");
  seeMore.classList.add("hidden");
  buttonNext.classList.add("hidden");
  buttonPrev.classList.add("hidden");
} else {
  displayPostsDesktop(imgDatas);
  const slides = document.querySelectorAll(".sliderImage");

  slides.forEach((sliderImage, indx) => {
    sliderImage.style.transform = `translateX(${indx * 100}%)`;
  });

  let currentSlide = 0;
  let maxSlide = slides.length - 1;

  const nextSlide = document.querySelector(".nextButton");

  nextSlide.addEventListener("click", function () {
    if (currentSlide === maxSlide) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }

    slides.forEach((sliderImage, indx) => {
      sliderImage.style.transform = `translateX(${
        100 * (indx - currentSlide)
      }%)`;
    });
  });

  const prevSlide = document.querySelector(".prevButton");

  prevSlide.addEventListener("click", function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide;
    } else {
      currentSlide--;
    }
    slides.forEach((sliderImage, indx) => {
      sliderImage.style.transform = `translateX(${
        100 * (indx - currentSlide)
      }%)`;
    });
  });
}
