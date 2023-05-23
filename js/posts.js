const api = "https://noroffapi.bekkholt.no/";
const postsURL = "wp-json/wp/v2/posts?_embed";
const seeMoreURL = "wp-json/wp/v2/posts?page=2&_embed";

const fullPostsURL = api + postsURL;
const newPageURL = api + seeMoreURL;

async function getPosts() {
    
    const response = await fetch(fullPostsURL);

    const posts = await response.json();

    return posts
}

async function getNewPage() {
    
    const response = await fetch(newPageURL);

    const posts = await response.json();

    return posts
}

const loaderContainer = document.querySelector(".posts");
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
const postDatas = await getPosts();
stopLoader();

window.seeMorePosts = seeMorePosts;

async function seeMorePosts() {
    const morePosts = await getNewPage();
    for (let i = 0; i < morePosts.length; i++) {
        const post = morePosts[i];
        createPostHTML(post)
        const button = document.querySelector(".see_more");
        button.classList.add("hidden");
    }
}

function createPostHTML(post) {
    const container = document.querySelector(".posts");
    const postContainer = document.createElement("div");
    const imageContainer = document.createElement("div");

    postContainer.classList.add("post_cards");

    const aElement = document.createElement(`a`);
    aElement.classList.add("center");
    const titleUrl = "post_specific.html?id=";
    aElement.href = titleUrl + `${post.id}`;

    const title = aElement.appendChild(document.createElement(`h2`));

    const postExcerptText = post.excerpt.rendered;
    const excerptWithoutTagsText = postExcerptText.replace(/<[^>]*>/g, '');
    const excerptElement = aElement.appendChild(document.createElement(`p`));
    excerptElement.textContent = excerptWithoutTagsText;

    const postImage = postContainer.appendChild(document.createElement(`img`));
    const imageElement = post._embedded;
    const featuredImages = imageElement[`wp:featuredmedia`];
    const featuredImage = featuredImages[0];
    const image = featuredImage.source_url;
    postImage.src = image;

    imageContainer.classList.add("image_container")
    postImage.classList.add("card_image")

    aElement.append(postContainer);
    postContainer.append(title);
    postContainer.append(excerptElement);
    title.append(post.title.rendered);
    postContainer.append(imageContainer);
    imageContainer.append(postImage);
    container.append(aElement);
}


function createPostsHTML(posts) {
    for (let i = 0; i < 10; i++) {
        const post = posts[i];
        createPostHTML(post)
    }
}

async function allPostsPage() {
    const allPosts = await getPosts()
    createPostsHTML(allPosts)
}

allPostsPage()