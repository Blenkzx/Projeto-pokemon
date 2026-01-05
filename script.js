const types = ["normal", "fire", "water", "grass", "electric", "ice", "fighting", "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"];
const t1 = document.getElementById('type1');
const t2 = document.getElementById('type2');

// Popular os campos de seleção de tipo
types.forEach(type => {
    t1.innerHTML += `<option value="${type}">${type.toUpperCase()}</option>`;
    t2.innerHTML += `<option value="${type}">${type.toUpperCase()}</option>`;
});

// Carregar coleção do LocalStorage
let collection = JSON.parse(localStorage.getItem('myPokedex')) || [];
renderPokedex();

function createPokemon() {
    const name = document.getElementById('name').value;
    const img = document.getElementById('img').value || 'https://via.placeholder.com/120?text=Pokeball';
    const type1 = document.getElementById('type1').value;
    const type2 = document.getElementById('type2').value;

    if(!name) return alert("Digite o nome!");

    collection.push({ id: Date.now(), name, img, type1, type2 });
    saveAndRender();
    
    // Limpar campos
    document.getElementById('name').value = "";
    document.getElementById('img').value = "";
}

function deletePoke(id) {
    collection = collection.filter(p => p.id !== id);
    saveAndRender();
}

function saveAndRender() {
    localStorage.setItem('myPokedex', JSON.stringify(collection));
    renderPokedex();
}

function renderPokedex() {
    const container = document.getElementById('pokedex');
    container.innerHTML = "";
    collection.forEach(p => {
        container.innerHTML += `
            <div class="card">
                <img src="${p.img}">
                <h3>${p.name}</h3>
                <div class="type-container">
                    <span class="badge ${p.type1}">${p.type1}</span>
                    ${p.type2 !== 'none' ? `<span class="badge ${p.type2}">${p.type2}</span>` : ''}
                </div>
                <button class="btn-delete" onclick="deletePoke(${p.id})">Soltar</button>
            </div>
        `;
    });
}