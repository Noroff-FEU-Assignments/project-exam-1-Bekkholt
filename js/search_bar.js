const searchBar = document.getElementById("searchbar");

searchBar.addEventListener("keydown", handleKeyDown);

function handleKeyDown(event){
    if(event.key === `Enter`){
        event.preventDefault();
        const URL = "search_result.html?search=";
        window.location.href = URL + searchBar.value;
    }
}