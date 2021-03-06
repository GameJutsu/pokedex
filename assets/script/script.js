const main = document.getElementById("pokemon-card-container");
const imageURL = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";
const preloader = document.getElementById("preloader");
const loadText = document.getElementById("loadText");

// Function to call one Pokemon
const getPokemon = async (id) => {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return res.data;
};

const getAndAddMultiplePokemon = async (start, count) => {
  let loadedPokemons = 0;  
  for (let i = start; i < start + count; i++) {
    // Storing returned response
    const data = await getPokemon(i);

    // Making new elements to push data to
    const card = document.createElement("div");
    const cardBG = document.createElement("img");
    const pID = document.createElement("p");
    const pName = document.createElement("p");
    const pTypeContainer = document.createElement("ul");
    const pImg = document.createElement("img");

    //Adding required classes to elements
    card.classList.add("pokemon-card");
    card.classList.add(data.types[0].type.name);
    cardBG.classList.add("pokemon-card-background");
    pID.classList.add("pokemon-id");
    pName.classList.add("pokemon-name");
    pTypeContainer.classList.add("pokemon-type-container");
    pImg.classList.add("pokemon-image");

    //Adding required HTML contents
    pName.innerHTML = data.name;
    pID.innerHTML = `<em>#${idPadding(data.id)}</em>`;

    //Adding image source
    cardBG.src = "assets/img/pokeball.png";
    pImg.src = `${imageURL}${idPadding(data.id)}.png`;

    //Appending elements to their respective parent elements
    main.appendChild(card);
    card.appendChild(cardBG);
    card.appendChild(pID);
    card.appendChild(pName);
    card.appendChild(pTypeContainer);
    card.appendChild(pImg);

    //Handling types separately
    data.types.slice().forEach((item) => {
      const pType = document.createElement("li");
      pType.classList.add("pokemon-type");
      pType.classList.add(data.types[0].type.name);
      pType.innerHTML = item.type.name;
      pTypeContainer.appendChild(pType);
    });
    loadedPokemons++;
    loadText.innerText = Math.floor((loadedPokemons * 100) / count) + "%";
  }
  preloader.style.display = "none";
};

//Padding for id
const idPadding = (id) => {
  id = id.toString();
  if (id < 10) {
    id = "00" + id;
  } else if (id < 100) {
    id = "0" + id;
  }
  return id;
};

//Running function for 251 Pokemon
getAndAddMultiplePokemon(1, 151);
