const api = "https://noroffapi.bekkholt.no/";
const postsURL = "wp-json/wp/v2/posts?_embed"

const fullPostsURL = api + postsURL;

async function getPosts() {
    const response = await fetch(fullPostsURL);

    const posts = await response.json();

    return posts
}

function createAllPostsHTML(post) {
    const container = document.querySelector(".posts");
    const postContainer = document.createElement("div");

    postContainer.classList.add("post");
    postContainer.id = post.id;

    for (let i = 0; i < post.images.length; i++) {
        const imgData = post.images[i];

        const a = document.createElement('a');
        const imageURL = "post-specific.html?id=";
        a.href = imageURL + `${post.id}`;
        
        const img = a.appendChild(document.createElement('img'));
        img.src = imgData.src;
        img.alt = imgData.alt;
        img.classList.add("icon_decoration");

        postContainer.append(a);
    }

    container.append(postContainer)
}

function createPostsHTML(posts) {
    for (let i = 0; i < posts.length; i++) {
        const product = posts[i];
        createPostsHTML(product)
    }
}

async function allPostsPage() {
    const posts = await getPosts()
    createPostsHTML(posts)
}

allPostsPage()