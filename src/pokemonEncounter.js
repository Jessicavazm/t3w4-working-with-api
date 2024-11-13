console.log("Pokemon Journey begins...");

// Fetch the specific ID's
const encounterButton = document.getElementById("pokemonEncounterButton");
const pokemonRenderArea = document.getElementById("encounterPokemonArea");
const pokemonContainerDiv = document.getElementById("pokemonContainer");
const encounterGroupButton = document.getElementById("pokemonGroupEncounterButton");

function renderPokemonData(pokemonData) {
    if (!pokemonData.name) {
        return;
    }
    // Amended this div to a class to style it with CSS
    pokemonContainerDiv.classList += "pokemonCardEntry";

    let pokemonHeading = document.createElement("h1");
    pokemonHeading.innerText = pokemonData.name;
    pokemonContainerDiv.appendChild(pokemonHeading);

    // Create the img element and attach the src
    let pokemonImage = document.createElement("img");
    pokemonImage.src = pokemonData.image;
    pokemonContainerDiv.appendChild(pokemonImage);

    let pokemonTypesHeading = document.createElement("h3");
    pokemonTypesHeading.innerText = "Types:",
    pokemonContainerDiv.appendChild(pokemonTypesHeading);

    let pokemonTypeList = document.createElement("ul");
    // Loop through the array of pokemonData
    pokemonData.types.forEach((typeObject) => {
        // Create li element for each type
        let pokemonTypeListItem = document.createElement("li");
        // Add name to li
        pokemonTypeListItem.innerText = typeObject.type.name;
        // Append it to ul
        pokemonTypeList.appendChild(pokemonTypeListItem);
    });
    pokemonContainerDiv.appendChild(pokemonTypeList);

    let pokemonAudioButton = document.createElement("button");
    pokemonAudioButton.innerText = "Play Sound";
    pokemonAudioButton.addEventListener("click", () => {
        let pokemonAudioObject = new Audio(pokemonData.sound);
        pokemonAudioObject.play();
    })
    pokemonContainerDiv.appendChild(pokemonAudioButton);

    pokemonRenderArea.appendChild(pokemonContainerDiv);
}

function getRandomPokemonId(){
    // Random number between 1 and 1025 (max number of Pokemon)
    return Math.ceil(Math.random() * 1025);
}

async function getPokemon(){
    console.log("Looking for a wild Pokemon...");

    // fetching data from an API and returning the response
    let apiResponse = await fetch("https://pokeapi.co/api/v2/pokemon/" + getRandomPokemonId());
    let apiData =await apiResponse.json();

    // Fetch name, type, image and cry of the pokemon
    // let pokemonName = apiData.name;
    return {
        name: apiData.name,
        types: apiData.types,
        image: apiData.sprites.other.home.front_default,
        sound: apiData.cries.latest
    };
}

// encounterButton.addEventListener("click", (event) => getPokemon(event));
// encounterButton.addEventListener("click", getPokemon);

encounterButton.addEventListener("click", async (event) =>{
    pokemonContainerDiv.innerText = "";
    console.log("Doing something...");

    let pokemonResult = await getPokemon();

    console.log(pokemonResult);

    renderPokemonData(pokemonResult);
});

encounterGroupButton.addEventListener("click", async () => {
    pokemonContainerDiv.innerText = "";
    let multiplePokemonResult = await Promise.all([
        getPokemon(),
        getPokemon(),
        getPokemon(),
        getPokemon(),
        getPokemon(),
        getPokemon(),
    ]);
    
    // Check if the output is as expected
    console.log(multiplePokemonResult);

    // Run a loop to render the result 
    multiplePokemonResult.forEach(renderPokemonData);

    // Lengthier version of the above function
    // multiplePokemonResult.forEach((pokemonResult) => {
    //     renderPokemonData(pokemonResult);
    // });
});