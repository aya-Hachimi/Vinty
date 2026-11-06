
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vinty - Accueil</title>
    <link rel="stylesheet" href="accueil.css">
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>

    <!-- 1. BARRE DE NAVIGATION -->
    <header class="navbar">
        <div class="nav-brand">
            <div class="logo-icon"><i class="fa-solid fa-layer-group"></i></div>
            <span class="logo-text">Vinty</span>
        </div>

        <div class="nav-actions">
            <button class="btn-icon" title="Langues">
                <i class="fa-solid fa-globe"></i> FR
            </button>
            <button class="btn-primary" title="Ajouter une annonce">
                <i class="fa-solid fa-plus"></i> Déposer une annonce
            </button>
            <button class="btn-chat-nav" title="Messagerie">
                <i class="fa-regular fa-comments"></i>
            </button>
            <button class="btn-account" title="Mon Compte">
                <i class="fa-regular fa-user"></i>
            </button>
        </div>
    </header>

    <!-- 2. BARRE DE FILTRES -->
    <section class="filter-bar">
        <div class="filter-inputs">
            
            <!-- Recherche -->
            <div class="input-wrapper">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" placeholder="Que recherchez-vous ?">
            </div>

            <!-- Catégorie -->
            <div class="input-wrapper category-trigger" id="openSidebarBtn">
                <i class="fa-solid fa-list"></i>
                <span id="selectedCategoryText" style="flex: 1; color: #64748b; font-size: 14px;">Toutes les catégories</span>
                <i class="fa-solid fa-chevron-down" style="font-size: 12px; color: #94a3b8;"></i>
            </div>

            <!-- Ville -->
            <div class="input-wrapper city-container">
                <i class="fa-solid fa-location-dot"></i>

                <input
                    type="text"
                    id="cityInput"
                    name="city"
                    placeholder="Ville ou région"
                    autocomplete="off">

                <div id="cityList" class="city-list"></div>
            </div>

        </div>
        
        <button class="btn-search">Rechercher</button>
    </section>

    <!-- 3. CONTENU PRINCIPAL -->
    <main class="main-container">
        
        <!-- Colonne de Gauche -->
        <div class="left-content">
            
            <div class="section-header">
                <h2>Explorer par catégories</h2>
                <a href="#" class="see-all">Tout voir <i class="fa-solid fa-arrow-right"></i></a>
            </div>
            
            <section class="categories-grid">
                <div class="category-card">
                    <div class="cat-icon bg-blue"><i class="fa-solid fa-car"></i></div>
                    <span>Véhicules</span>
                </div>
                <div class="category-card">
                    <div class="cat-icon bg-green"><i class="fa-solid fa-house"></i></div>
                    <span>Immobilier</span>
                </div>
                <div class="category-card">
                    <div class="cat-icon bg-purple"><i class="fa-solid fa-laptop"></i></div>
                    <span>High-Tech</span>
                </div>
                <div class="category-card">
                    <div class="cat-icon bg-orange"><i class="fa-solid fa-couch"></i></div>
                    <span>Maison</span>
                </div>
                <div class="category-card">
                    <div class="cat-icon bg-pink"><i class="fa-solid fa-shirt"></i></div>
                    <span>Mode</span>
                </div>
                <div class="category-card">
                    <div class="cat-icon bg-teal"><i class="fa-solid fa-briefcase"></i></div>
                    <span>Emploi</span>
                </div>
            </section>

            <div class="section-header mt-4">
                <h2>Annonces récentes</h2>
                <a href="#" class="see-all">Tout voir <i class="fa-solid fa-arrow-right"></i></a>
            </div>

            <section class="annonces-grid">
                <div class="annonce-card">
                    <div class="annonce-img" style="background-image: url('https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=500');">
                        <span class="badge">Urgent</span>
                    </div>
                    <div class="annonce-info">
                        <h3>Magnifique Voiture de sport</h3>
                        <p class="price">45 000 €</p>
                        <div class="location"><i class="fa-solid fa-location-dot"></i> Paris, France</div>
                    </div>
                </div>

                <div class="annonce-card">
                    <div class="annonce-img" style="background-image: url('https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=500');">
                    </div>
                    <div class="annonce-info">
                        <h3>Appartement lumineux 3 pièces</h3>
                        <p class="price">1 200 € / mois</p>
                        <div class="location"><i class="fa-solid fa-location-dot"></i> Lyon, France</div>
                    </div>
                </div>
            </section>
            
        </div>

        <!-- Colonne de Droite : Chatbot AI -->
        <aside class="chatbot-section">
            <div class="chatbot-header">
                <div class="bot-avatar"><i class="fa-solid fa-robot"></i></div>
                <div>
                    <h3>Assistant Vinty</h3>
                    <span class="status"><span class="dot"></span> En ligne</span>
                </div>
            </div>
            
            <div class="chatbot-messages">
                <div class="message bot">
                    Bonjour ! 👋 Je suis l'assistant IA de Vinty. Comment puis-je vous aider à trouver ce que vous cherchez aujourd'hui ?
                </div>
            </div>

            <div class="chatbot-input-area">
                <input type="text" placeholder="Posez votre question...">
                <button class="send-btn"><i class="fa-solid fa-paper-plane"></i></button>
            </div>
        </aside>

    </main>

    <!-- SIDEBAR (LE MENU LATÉRAL) -->
    <div class="sidebar-overlay" id="sidebarOverlay"></div>

    <aside class="sidebar" id="categorySidebar">
        <div class="sidebar-header">
            <h2 id="sidebarTitle">Catégories</h2>
            <button class="close-btn" id="closeSidebarBtn"><i class="fa-solid fa-xmark"></i></button>
        </div>
        
        <div class="sidebar-content" id="sidebarContent">
            <!-- Le contenu sera injecté par JavaScript -->
        </div>
    </aside>

    <!-- Lien vers le script JS -->
    <script src="accueil.js"></script>
</body>
</html>
