const api = "https://noroffapi.bekkholt.no/";
const postsURL = "wp-json/wp/v2/posts?_embed";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);

let id = params.get("id");

const fullPostsURL = api + postsURL;

async function fetchSinglePost(id) {
    
    const response = await fetch(postsURL + `${id}`);

    const result = await response.json();

    return result
}

const singlePost = await fetchSinglePost(id);

