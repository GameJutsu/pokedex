//Call an id'd Pokemon
async function calculate(id) {
  const api = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();
  const element = document.createElement("div");
  element.classList.add("pokemon");
  element.classList.add(data.types[0].type.name);
  const types = `${data.types.reduce(
    (acc, element) => acc + element.type.name + " ",
    ""
  )}`;
  // console.log(types);
  element.innerHTML = `<p>${
    data.name
  }</p><p>${types}</p><p><img src="${api}${idPadding(id)}.png"></p>`;
  document.body.appendChild(element);
  // console.log(data);
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

callPokemons(151);
