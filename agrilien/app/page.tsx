"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Listing = {
  id: number;
  name: string;
  category: string;
  price: number;
  unit: string;
  location: string;
  image: string;
  description: string;
  phone?: string;
};

const starterItems: Listing[] = [
  {
    id: 1,
    name: "Carottes",
    category: "Légumes",
    price: 2500,
    unit: "kg",
    location: "Goma",
    image:
      "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=800",
    description: "Carottes fraîches de bonne qualité.",
  },
  {
    id: 2,
    name: "Tomates",
    category: "Légumes",
    price: 3000,
    unit: "kg",
    location: "Goma",
    image:
      "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=800",
    description: "Tomates fraîches pour vos repas.",
  },
  {
    id: 3,
    name: "Pommes de terre",
    category: "Légumes",
    price: 2000,
    unit: "kg",
    location: "Goma",
    image:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800",
    description: "Pommes de terre de bonne qualité.",
  },
  {
    id: 4,
    name: "Bananes",
    category: "Fruits",
    price: 1500,
    unit: "régime",
    location: "Goma",
    image:
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800",
    description: "Bananes fraîches.",
  },
  {
    id: 5,
    name: "Patates douces",
    category: "Légumes",
    price: 1800,
    unit: "kg",
    location: "Goma",
    image:
      "https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?w=800",
    description: "Patates douces fraîches.",
  },
  {
    id: 6,
    name: "Choux",
    category: "Légumes",
    price: 1000,
    unit: "pièce",
    location: "Goma",
    image:
      "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=800",
    description: "Choux frais du marché.",
  },
];

const marketPrices = [
  { name: "Carottes", price: 2500, unit: "kg" },
  { name: "Tomates", price: 3000, unit: "kg" },
  { name: "Pommes de terre", price: 2000, unit: "kg" },
  { name: "Bananes", price: 1500, unit: "régime" },
  { name: "Patates douces", price: 1800, unit: "kg" },
  { name: "Choux", price: 1000, unit: "pièce" },
];

const allowedProducts = starterItems.map((item) => item.name);

export default function Home() {
  const [items, setItems] = useState<Listing[]>(starterItems);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tous");
  const [sort, setSort] = useState("recent");
  const [selectedContact, setSelectedContact] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "Carottes",
    price: "",
    unit: "kg",
    location: "Goma",
    description: "",
    phone: "",
  });

  // Charger les annonces enregistrées
  useEffect(() => {
    try {
      const saved = localStorage.getItem("agrilien-annonces");

      if (saved) {
        const parsed: Listing[] = JSON.parse(saved);

        // Ne conserver que les six produits autorisés
        const filtered = parsed.filter((item) =>
          allowedProducts.includes(item.name)
        );

        setItems(filtered.length > 0 ? filtered : starterItems);
      }
    } catch {
      setItems(starterItems);
    }
  }, []);

  // Enregistrer les annonces
  useEffect(() => {
    localStorage.setItem("agrilien-annonces", JSON.stringify(items));
  }, [items]);

  // Recherche et filtrage
  const filteredItems = useMemo(() => {
    let result = items.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "Tous" || item.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "price-asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sort === "price-desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [items, search, category, sort]);

  // Publication d'une annonce
  function handlePublish(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const product = starterItems.find(
      (item) => item.name === form.name
    );

    if (!product) {
      setMessage("Produit non autorisé.");
      return;
    }

    const newItem: Listing = {
      id: Date.now(),
      name: product.name,
      category: product.category,
      price: Number(form.price),
      unit: form.unit,
      location: form.location,
      image: product.image,
      description: form.description,
      phone: form.phone,
    };

    setItems((previous) => [newItem, ...previous]);
    setShowModal(false);

    setForm({
      name: "Carottes",
      price: "",
      unit: "kg",
      location: "Goma",
      description: "",
      phone: "",
    });

    setMessage("Votre annonce a été publiée avec succès !");

    setTimeout(() => setMessage(""), 4000);
  }

  function formatPrice(price: number) {
    return new Intl.NumberFormat("fr-FR").format(price) + " FC";
  }

  return (
    <main>
      {/* NAVIGATION */}
      <header className="header">
        <div className="container nav-container">
          <a href="#" className="logo">
            <img
              src="/logo-agrilien.jpg"
              alt="Logo AgriLien"
              className="logo-img"
            />
            <span>AgriLien</span>
          </a>

          <nav className="nav-links">
            <a href="#accueil">Accueil</a>
            <a href="#produits">Produits</a>
            <a href="#prix">Prix du marché</a>
            <a href="#fonctionnement">Fonctionnement</a>
            <a href="#apropos">À propos</a>
            <a href="#contact">Contact</a>
          </nav>

          <a href="#publier" className="nav-cta">
            Publier une annonce
          </a>
        </div>
      </header>

      {/* ACCUEIL */}
      <section className="hero" id="accueil">
        <div className="container hero-content">
          <div className="hero-text">
            <span className="hero-badge">
              🌱 Le marché agricole en ligne
            </span>

            <h1>
              Connectons les producteurs et les acheteurs agricoles
            </h1>

            <p>
              AgriLien facilite la vente et l'achat des produits agricoles
              à Goma et dans toute la région du Nord-Kivu.
            </p>

            <div className="hero-buttons">
              <a href="#produits" className="btn-primary">
                Découvrir les produits
              </a>

              <a href="#publier" className="btn-secondary">
                Vendre mes produits
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUITS */}
      <section className="section" id="produits">
        <div className="container">
          <div className="section-heading">
            <span className="section-subtitle">Notre marché</span>
            <h2>Produits agricoles disponibles</h2>
            <p>
              Retrouvez les produits proposés par les producteurs.
            </p>
          </div>

          {/* RECHERCHE */}
          <div className="search-area">
            <input
              type="text"
              placeholder="Rechercher un produit ou une ville..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Tous">Toutes les catégories</option>
              <option value="Légumes">Légumes</option>
              <option value="Fruits">Fruits</option>
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="recent">Plus récents</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
            </select>
          </div>

          {/* CARTES DES PRODUITS */}
          <div className="products-grid">
            {filteredItems.map((item) => (
              <article className="product-card" key={item.id}>
                <div className="product-image">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800";
                    }}
                  />
                </div>

                <div className="product-info">
                  <span className="product-category">
                    {item.category}
                  </span>

                  <h3>{item.name}</h3>

                  <p className="product-description">
                    {item.description}
                  </p>

                  <div className="product-location">
                    📍 {item.location}
                  </div>

                  <div className="product-bottom">
                    <div className="product-price">
                      {formatPrice(item.price)}
                      <small> / {item.unit}</small>
                    </div>

                    <button
                      className="btn-contact"
                      onClick={() =>
                        setSelectedContact(
                          selectedContact === item.id ? null : item.id
                        )
                      }
                    >
                      Contacter
                    </button>
                  </div>

                  {selectedContact === item.id && (
                    <div className="contact-details">
                      {item.phone ? (
                        <a href={`tel:${item.phone}`}>
                          📞 {item.phone}
                        </a>
                      ) : (
                        <p>Contactez le vendeur pour plus d'informations.</p>
                      )}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <p className="no-results">
              Aucun produit trouvé.
            </p>
          )}
        </div>
      </section>

      {/* PRIX DU MARCHÉ */}
      <section className="section market-section" id="prix">
        <div className="container">
          <div className="section-heading">
            <span className="section-subtitle">Informations agricoles</span>
            <h2>Prix du marché</h2>
            <p>
              Consultez les prix indicatifs de nos six produits.
            </p>
          </div>

          <div className="market-grid">
            {marketPrices.map((item) => (
              <div className="market-card" key={item.name}>
                <h3>{item.name}</h3>

                <div className="market-price">
                  {formatPrice(item.price)}
                </div>

                <p>Par {item.unit}</p>
              </div>
            ))}
          </div>

          <p className="market-note">
            * Les prix sont indicatifs et peuvent varier selon le marché.
          </p>
        </div>
      </section>

      {/* FONCTIONNEMENT */}
      <section className="section" id="fonctionnement">
        <div className="container">
          <div className="section-heading">
            <span className="section-subtitle">Simple et rapide</span>
            <h2>Comment fonctionne AgriLien ?</h2>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-icon">🧑‍🌾</div>
              <h3>1. Le producteur</h3>
              <p>
                Le producteur choisit son produit et publie une annonce.
              </p>
            </div>

            <div className="step-card">
              <div className="step-icon">🔎</div>
              <h3>2. L'acheteur</h3>
              <p>
                L'acheteur consulte les produits et leurs prix.
              </p>
            </div>

            <div className="step-card">
              <div className="step-icon">🤝</div>
              <h3>3. La rencontre</h3>
              <p>
                Le producteur et l'acheteur prennent contact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PUBLIER UNE ANNONCE */}
      <section className="section publish-section" id="publier">
        <div className="container">
          <div className="publish-box">
            <div>
              <span className="section-subtitle">Vous êtes producteur ?</span>
              <h2>Vendez vos produits avec AgriLien</h2>
              <p>
                Publiez gratuitement votre annonce et trouvez des acheteurs.
              </p>
            </div>

            <button
              className="btn-primary"
              onClick={() => setShowModal(true)}
            >
              Publier une annonce
            </button>
          </div>
        </div>
      </section>

      {/* À PROPOS */}
      <section className="section" id="apropos">
        <div className="container about-content">
          <div className="section-heading">
            <span className="section-subtitle">Qui sommes-nous ?</span>
            <h2>À propos d'AgriLien</h2>
          </div>

          <p>
            AgriLien est une plateforme destinée à faciliter les échanges
            entre les producteurs agricoles et les acheteurs. Notre objectif
            est de rendre les produits agricoles plus accessibles, de
            faciliter leur commercialisation et de soutenir les producteurs
            de Goma et du Nord-Kivu.
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section contact-section" id="contact">
        <div className="container">
          <div className="section-heading">
            <span className="section-subtitle">Restons en contact</span>
            <h2>Contactez AgriLien</h2>
            <p>
              Vous avez une question ou une suggestion ? Contactez-nous.
            </p>
          </div>

          <div className="contact-box">
            <p>📍 Goma, Nord-Kivu, République démocratique du Congo</p>
            <p>🌱 AgriLien — Ensemble pour une agriculture connectée.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <p>
            © {new Date().getFullYear()} AgriLien. Tous droits réservés.
          </p>
        </div>
      </footer>

      {/* MESSAGE */}
      {message && (
        <div className="success-message">
          {message}
        </div>
      )}

      {/* FORMULAIRE DE PUBLICATION */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button
              className="modal-close"
              onClick={() => setShowModal(false)}
              aria-label="Fermer"
            >
              ×
            </button>

            <h2>Publier un produit</h2>

            <p>Remplissez les informations de votre annonce.</p>

            <form onSubmit={handlePublish}>
              <label>Produit</label>

              <select
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
              >
                {starterItems.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>

              <label>Prix en FC</label>

              <input
                type="number"
                placeholder="Exemple : 2500"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
                required
                min="1"
              />

              <label>Unité</label>

              <select
                value={form.unit}
                onChange={(e) =>
                  setForm({ ...form, unit: e.target.value })
                }
              >
                <option value="kg">Kilogramme</option>
                <option value="pièce">Pièce</option>
                <option value="régime">Régime</option>
                <option value="sac">Sac</option>
              </select>

              <label>Localisation</label>

              <input
                type="text"
                value={form.location}
                onChange={(e) =>
                  setForm({ ...form, location: e.target.value })
                }
                required
              />

              <label>Numéro de téléphone</label>

              <input
                type="tel"
                placeholder="Votre numéro"
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
              />

              <label>Description</label>

              <textarea
                placeholder="Décrivez votre produit..."
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                required
              />

              <button type="submit" className="btn-primary">
                Publier maintenant
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}        
                
                    
