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

// async function fetchImage(singlePost) {

//     const imgElement = singlePost._links;
//     const featuredImages = imgElement[`wp:featuredmedia`];
//     const featuredImage = featuredImages[0];
//     const image = featuredImage.href;

//     const response = await fetch(image);

//     const result = await response.json();

//     return result
// }

function createPostHTML(singlePost) {

    document.title = "Eurovisionsquad" + " | " + singlePost.title.rendered;

    const postContainer = document.querySelector(".post_content");
    const imageContainer = document.createElement("div");

    // // featuredimage
    // const postImage = imageContainer.appendChild(document.createElement(`img`));
    // const sourceURL = imageData.source_url;
    // postImage.src = sourceURL;


    // title
    // imageContainer.classList.add("image_container")
    // postImage.classList.add("featured_image")

    const title = document.createElement("h1");
    title.innerText = singlePost.title.rendered;

    // append
    postContainer.append(imageContainer);
    postContainer.append(title);
    
    // text
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
// const imageData = await fetchImage(singlePost);
createPostHTML(singlePost);
