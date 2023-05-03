const api = "https://noroffapi.bekkholt.no/";
const postsURL = "wp-json/wp/v2/posts?_embed";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);

let id = params.get("id");

const fullPostsURL = api + postsURL;

console.log(id)

async function fetchSinglePost(id) {
    
    const response = await fetch(fullPostsURL + `${id}`);

    const result = await response.json();

    return result
}

console.log(await fetchSinglePost(id));

const singlePost = await fetchSinglePost(id);

for (let i = 0; i < singlePost.lenght; i++) {
    const post = singlePost[i];

    const titleContainer = document.createElement("h2");

    const title = post.title.rendered;

    titleContainer.append(title);

}