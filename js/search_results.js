const api = "https://noroffapi.bekkholt.no/";
const postsURL = "wp-json/wp/v2/posts?_embed";
const seeMoreURL = "wp-json/wp/v2/posts?page=2&_embed";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);

const search = params.get("search");

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

function getPostsIncluding(posts, searchText) {
    const results = posts.filter(function(post) {
        const postTitle = post.title.rendered.toLowerCase();
        const postExcerpt = post.excerpt.rendered.toLowerCase();
        const inputText = searchText.toLowerCase();
        const including = postTitle.includes(inputText) || postExcerpt.includes(inputText);
        return including;
    });
    return results;
}

const mergePages = [...await getPosts(),...await getNewPage()];

const searchResult = document.querySelector(".search_result");

function showResults(result) {
    const noResult = result.length === 0;

    if (noResult) {
        searchResult.innerHTML = `<p>No results found<p>`;
    } else {
        for (let i = 0; i < result.length; i++) {
            const container = document.querySelector(".search_result");
            const postContainer = document.createElement("div");
            const imageContainer = document.createElement("div");
        
            postContainer.classList.add("post_cards");
        
            const a = document.createElement(`a`);
            const titleUrl = "post_specific.html?id=";
            a.href = titleUrl + `${result[i].id}`;
    
            const title = a.appendChild(document.createElement(`h2`));
    
            const postExcerpt = result[i].excerpt.rendered;
            const excerptWithoutTags = postExcerpt.replace(/<[^>]*>/g, '');
    
            const postImage = postContainer.appendChild(document.createElement(`img`));
            const imageElement = result[i]._embedded;
            const featuredImages = imageElement[`wp:featuredmedia`];
            const featuredImage = featuredImages[0];
            const image = featuredImage.source_url;
            postImage.src = image;
    
            imageContainer.classList.add("image_container")
            postImage.classList.add("featured_image")
    
            a.append(postContainer);
            postContainer.append(title);
            postContainer.append(excerptWithoutTags);
            title.append(result[i].title.rendered);
            postContainer.append(imageContainer);
            imageContainer.append(postImage);
            container.append(a);
        }
    }
}

async function allResultsPage() {
    const allPosts = mergePages;
    const filteredPosts = getPostsIncluding(allPosts, search);
    showResults(filteredPosts);
}

allResultsPage()