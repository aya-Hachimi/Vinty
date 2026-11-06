document.addEventListener('DOMContentLoaded', () => {

    // 1. Les données des catégories
    const categoriesData = {
        "Animaux": ["Chiens", "Chats", "Oiseaux", "Rongeurs", "Poissons"],
        "Véhicules": ["Voitures", "Motos", "Camions", "Bateaux", "Pièces détachées"],
        "Immobilier": ["Appartements", "Maisons", "Terrains", "Locations", "Bureaux"],
        "High-Tech": ["Téléphones", "Ordinateurs", "Consoles", "Accessoires", "TV & Audio"]
    };

    // 2. Récupération des éléments
    const openBtn = document.getElementById('openSidebarBtn');
    const closeBtn = document.getElementById('closeSidebarBtn');
    const overlay = document.getElementById('sidebarOverlay');
    const sidebar = document.getElementById('categorySidebar');
    const content = document.getElementById('sidebarContent');
    const title = document.getElementById('sidebarTitle');
    const inputDisplay = document.getElementById('selectedCategoryText');

    // Vérification : affiche dans la console si un élément manque
    const elements = { openBtn, closeBtn, overlay, sidebar, content, title, inputDisplay };
    for (const [name, el] of Object.entries(elements)) {
        if (!el) console.error(`Élément introuvable : ${name}`);
    }
    if (!openBtn || !sidebar) return;

    // 3. Ouvrir / fermer
    function openSidebar() {
        sidebar.classList.add('open');
        overlay.classList.add('active');
        renderMainCategories();
    }

    function closeSidebar() {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
    }

    // 4. Catégories principales
    function renderMainCategories() {
        title.innerText = "Catégories";
        content.innerHTML = '';

        const ul = document.createElement('ul');
        ul.className = 'sidebar-list';

        for (const mainCategory in categoriesData) {
            const li = document.createElement('li');
            li.className = 'sidebar-item';
            li.innerHTML = `${mainCategory} <i class="fa-solid fa-chevron-right"></i>`;
            li.addEventListener('click', () => renderSubCategories(mainCategory));
            ul.appendChild(li);
        }
        content.appendChild(ul);
    }

    // 5. Sous-catégories
    function renderSubCategories(mainCategory) {
        title.innerText = mainCategory;
        content.innerHTML = '';

        const backBtn = document.createElement('button');
        backBtn.className = 'back-btn';
        backBtn.innerHTML = `<i class="fa-solid fa-arrow-left"></i> Retour aux catégories`;
        backBtn.addEventListener('click', renderMainCategories);
        content.appendChild(backBtn);

        const ul = document.createElement('ul');
        ul.className = 'sidebar-list';

        categoriesData[mainCategory].forEach(subCat => {
            const li = document.createElement('li');
            li.className = 'sidebar-item';
            li.innerHTML = `<span><i class="fa-solid fa-tag" style="color:#94a3b8; margin-right:10px;"></i> ${subCat}</span>`;

            li.addEventListener('click', () => {
                inputDisplay.innerText = `${mainCategory} > ${subCat}`;
                inputDisplay.style.color = "#0f172a";
                inputDisplay.style.fontWeight = "600";
                closeSidebar();
            });

            ul.appendChild(li);
        });
        content.appendChild(ul);
    }

    // 6. Les clics
    openBtn.addEventListener('click', openSidebar);
    closeBtn.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);

    // Bonus : fermer avec la touche Échap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeSidebar();
    });

    

// ===== CHOIX DES VILLES =====

const cityInput = document.getElementById("cityInput");
const cityList = document.getElementById("cityList");

let cities = [];
let citiesLoaded = false;

// Charger les villes depuis PHP
async function loadCities() {

    // 1. Lire les villes déjà enregistrées
    const savedCities = localStorage.getItem("vintyCities");

    if (savedCities) {
        try {
            cities = JSON.parse(savedCities);
            citiesLoaded = true;

            console.log("Villes chargées depuis le cache :", cities.length);

            // Afficher immédiatement si le champ est ouvert
            if (cityList.classList.contains("show")) {
                displayCities(cityInput.value);
            }

        } catch (error) {
            localStorage.removeItem("vintyCities");
        }
    }

    // 2. Récupérer les villes depuis PHP
    try {
        const response = await fetch("../backend/API/cities-api.php");

        if (!response.ok) {
            throw new Error("Erreur HTTP : " + response.status);
        }

        const data = await response.json();

        let newCities = Array.isArray(data)
            ? data
            : data.cities || data.data || [];

        newCities = newCities
            .map(city => typeof city === "string" ? city : city.name || city.city)
            .filter(city => typeof city === "string" && city.trim() !== "");

        if (newCities.length === 0) {
            throw new Error("Aucune ville reçue");
        }

        // 3. Enregistrer les nouvelles villes
        cities = newCities;
        citiesLoaded = true;

        localStorage.setItem("vintyCities", JSON.stringify(cities));

        console.log("Villes actualisées depuis PHP :", cities.length);

        // Actualiser la liste si elle est ouverte
        if (cityList.classList.contains("show")) {
            displayCities(cityInput.value);
        }

    } catch (error) {
        console.error("Erreur des villes :", error);

        if (!citiesLoaded) {
            cityList.innerHTML =
                "<p style='padding:12px'>Impossible de charger les villes</p>";
            cityList.classList.add("show");
        }
    }
}

// Afficher les villes
function displayCities(search = "") {

    cityList.innerHTML = "";

    if (!citiesLoaded) {
        cityList.innerHTML = "<p style='padding:12px'>Chargement des villes...</p>";
        cityList.classList.add("show");
        return;
    }

    const filteredCities = cities.filter(city =>
        city.toLowerCase().includes(search.toLowerCase())
    );

    if (filteredCities.length === 0) {
        cityList.innerHTML = "<p style='padding:12px'>Aucune ville trouvée</p>";
    }

    filteredCities.forEach(city => {

        const option = document.createElement("div");

        option.className = "city-option";
        option.textContent = city;

        option.addEventListener("click", () => {
            cityInput.value = city;
            cityList.classList.remove("show");
        });

        cityList.appendChild(option);
    });

    cityList.classList.add("show");
}

// Cliquer sur le champ Ville
if (cityInput && cityList) {

    cityInput.addEventListener("focus", () => {
        displayCities(cityInput.value);
    });

    cityInput.addEventListener("input", () => {
        displayCities(cityInput.value);
    });

    // Fermer la liste si on clique ailleurs
    document.addEventListener("click", event => {
        if (!event.target.closest(".city-container")) {
            cityList.classList.remove("show");
        }
    });

    // Charger les villes
    loadCities();
}


}); 