const pokedex = document.querySelector("#pokedex");

const fetchPokemon = () => {
	//leeres Array um dann alle Promises zu speichern
	const promises = [];

	//alle Promises (RESPONSES) erstmal pushen ins Array
	for (let i = 1; i <= 151; i++) {
		const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
		promises.push(fetch(url).then(res => res.json()));
	}

	//* alle promises laufen nun parallel, ist viel schneller als ein for loop, gibt auch in anderen faellen so keine probleme, fall andere loops parralel laufen wuerden
	//! fuer jede promise erstllen wir nun ein Objekt mit den Daten die wir verwenden moechten
	Promise.all(promises).then(data => {
		const pokemon = data.map(dataObj => ({
			name: dataObj.name,
			id: dataObj.id,
			image: dataObj.sprites.other["official-artwork"].front_default,
			type: dataObj.types.map(type => type.type.name).join(", "),
			weight: dataObj.weight / 10 + " kg",
		}));
		displayPokemon(pokemon);
	});
};

const displayPokemon = pokemon => {
	console.log(pokemon);
	const pokemonHtmlString = pokemon.map(pokemon => {
		return `<li>
            <img src="${pokemon.image}">
            <h2>${pokemon.id}. ${pokemon.name}</h2>
            <p>Type: ${pokemon.type}</p>
            <p>Weight: ${pokemon.weight}</p>
        </li>`;
	});
	pokedex.innerHTML = pokemonHtmlString.join("");
};

fetchPokemon();
