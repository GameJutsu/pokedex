const main = document.getElementById("pokemon-card-container");

//Call an id'd Pokemon
async function calculate(id) {
  const api = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();
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
  pID.innerHTML = `<em>#${idPadding(id)}</em>`;

  //Adding image source
  cardBG.src = "assets/img/pokeball.png";
  pImg.src = `${api}${idPadding(id)}.png`;

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
}

//Call n number of Pokemons
function callPokemons(n) {
  for (var i = 1; i <= n; i++) {
    calculate(i);
  }
}

//Padding for id
function idPadding(id) {
  id = id.toString();
  if (id < 10) {
    id = "00" + id;
  } else if (id < 100) {
    id = "0" + id;
  }
  return id;
}

callPokemons(251);
