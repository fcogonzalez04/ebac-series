const createShowCard = (show) => {
    const card = document.createElement("div");
    card.classList.add("show-card");

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("show-info");

    const name = document.createElement("h2");
    name.classList.add("show-name");
    name.textContent = show.name;

    const genresDiv = document.createElement("div");
    genresDiv.classList.add("show-genres");

    show.genres.forEach((genre) => {
        const genreSpan = document.createElement("span");
        genreSpan.classList.add("show-genre");
        genreSpan.textContent = genre;
        genresDiv.appendChild(genreSpan);
    });

    infoDiv.appendChild(name);
    infoDiv.appendChild(genresDiv);

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("show-image-container");

    const image = document.createElement("img");
    image.classList.add("show-image");
    image.src = show.image ? show.image.medium : 'img/placeholder.png';
    image.alt = show.name;

    imageContainer.appendChild(image);

    card.appendChild(infoDiv);
    card.appendChild(imageContainer);

    return card;
};

const fetchShows = async () => {
    const showGrid = document.getElementById("show-grid");

    try {
        // Limpiar la cuadrícula de programas antes de cargar los nuevos resultados
        showGrid.innerHTML = '';

        // Endpoint 1: Obtener la lista de shows
        const showsResponse = await axios.get("https://api.tvmaze.com/shows");
        const shows = showsResponse.data;

        shows.forEach((show) => {
            const showCard = createShowCard(show);
            showGrid.appendChild(showCard);
        });
    } catch (error) {
        console.log("Error fetching shows:", error);
    }
};

const searchShows = async (query) => {
    const showGrid = document.getElementById("show-grid");

    try {
        // Limpiar la cuadrícula de programas antes de cargar los nuevos resultados
        showGrid.innerHTML = '';

        // Endpoint 2: Buscar shows por nombre
        const searchResponse = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
        const searchResults = searchResponse.data;

        searchResults.forEach((result) => {
            const showCard = createShowCard(result.show);
            showGrid.appendChild(showCard);
        });
    } catch (error) {
        console.log("Error searching shows:", error);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    fetchShows();

    const searchButton = document.getElementById("search-button");
    const searchBar = document.getElementById("search__bar-primary");

    searchButton.addEventListener("click", () => {
        const query = searchBar.value;
        if (query) {
            searchShows(query);
        }
    });

    searchBar.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            const query = searchBar.value;
            if (query) {
                searchShows(query);
            }
        }
    });
});
