const api = "https://noroffapi.bekkholt.no/";
const postsURL = "wp-json/wp/v2/posts?_embed";

const fullPostsURL = api + postsURL;

async function getPosts() {
    
    const response = await fetch(fullPostsURL);

    const posts = await response.json();

    return posts
}

function createPostHTML(post) {
    const container = document.querySelector(".posts");
    const postContainer = document.createElement("div");
    const imageContainer = document.createElement("div");

    postContainer.classList.add("post_cards");

        const a = document.createElement(`a`);
        const titleUrl = "post_specific.html?id=";
        a.href = titleUrl + `${post.id}`;

        const title = a.appendChild(document.createElement(`h2`));

        const postExcerpt = post.excerpt.rendered;
        const excerptWithoutTags = postExcerpt.replace(/<[^>]*>/g, '');

        const postImage = postContainer.appendChild(document.createElement(`img`));
        const imageElement = post._embedded;
        const featuredImages = imageElement[`wp:featuredmedia`];
        const featuredImage = featuredImages[0];
        const image = featuredImage.source_url;
        postImage.src = image;

        imageContainer.classList.add("image_container")
        postImage.classList.add("featured_image")

        a.append(postContainer);
        postContainer.append(title);
        postContainer.append(excerptWithoutTags);
        title.append(post.title.rendered);
        postContainer.append(imageContainer);
        imageContainer.append(postImage);
        container.append(a);
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