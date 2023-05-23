const api = "https://noroffapi.bekkholt.no/";
const postsURL = "wp-json/wp/v2/posts/";
const imageURL = "https://noroffapi.bekkholt.no/wp-json/wp/v2/media/"

const queryString = document.location.search;
const params = new URLSearchParams(queryString);

const id = params.get("id");

const fullPostsURL = api + postsURL;

async function fetchSinglePost(id) {
    
    const response = await fetch(fullPostsURL + `${id}`);

    const result = await response.json();

    return result
}

const loaderContainer = document.querySelector(".post_content");
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
const postDatas = await fetchSinglePost();
stopLoader();

function createPostHTML(singlePost) {

    document.title = "Eurovisionsquad" + " | " + singlePost.title.rendered;

    const postContainer = document.querySelector(".post_content");
    const imageContainer = document.createElement("div");

    const title = document.createElement("h1");
    title.classList.add("title")
    title.innerText = singlePost.title.rendered;

    postContainer.append(imageContainer);
    postContainer.append(title);
    
    const postText = singlePost.content.rendered;
    postContainer.innerHTML += postText;     
}

window.hideModal = hideModal;
window.showModal = showModal;

function showModal(imgSrcFromWP) {
	const modalElement = document.getElementById("modal");
	const imgElement = document.getElementById("modalImg");
	modalElement.classList.remove("hidden");
	imgElement.src = imgSrcFromWP;
}

function hideModal() {
    const modalElement = document.getElementById("modal");
    modalElement.classList.add("hidden");
}

const singlePost = await fetchSinglePost(id);
createPostHTML(singlePost);
