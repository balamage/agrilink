"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Listing = {
  id: number;
  product: string;
  quantity: number;
  unit: string;
  price: number;
  location: string;
  seller: string;
  phone: string;
  image: string;
  verified: boolean;
};

const starter: Listing[] = [
  {
    id: 1,
    product: "Ail",
    quantity: 25,
    unit: "kg",
    price: 30000,
    location: "Masisi",
    seller: "Espoir Agricole",
    phone: "+243 970 000 106",
    image: "https://loremflickr.com/800/600/garlic?lock=101",
    verified: true
  },
  {
    id: 2,
    product: "Pommes de terre",
    quantity: 80,
    unit: "sac",
    price: 275000,
    location: "Masisi",
    seller: "Coopérative Umoja",
    phone: "+243 970 000 101",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=900&q=85",
    verified: true
  },
  {
    id: 3,
    product: "Haricots",
    quantity: 250,
    unit: "kg",
    price: 3800,
    location: "Rutshuru",
    seller: "Maman Bahati",
    phone: "+243 970 000 102",
    image: "https://loremflickr.com/800/600/kidneybeans?lock=103",
    verified: true
  },
  {
    id: 4,
    product: "Oignons",
    quantity: 40,
    unit: "bassin",
    price: 120000,
    location: "Nyiragongo",
    seller: "Ferme La Récolte",
    phone: "+243 970 000 103",
    image: "https://loremflickr.com/800/600/onions?lock=104",
    verified: false
  },
  {
    id: 5,
    product: "Tomates",
    quantity: 60,
    unit: "caisse",
    price: 25000,
    location: "Masisi",
    seller: "Jean-Pierre M.",
    phone: "+243 970 000 104",
    image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=900&q=85",
    verified: true
  },
  {
    id: 6,
    product: "Manioc",
    quantity: 150,
    unit: "kg",
    price: 1150,
    location: "Rutshuru",
    seller: "Groupe Tujenge",
    phone: "+243 970 000 105",
    image: "https://loremflickr.com/800/600/cassava?lock=106",
    verified: true
  },
  {
    id: 7,
    product: "Maïs",
    quantity: 180,
    unit: "kg",
    price: 1800,
    location: "Rutshuru",
    seller: "Coopérative Maendeleo",
    phone: "+243 970 000 107",
    image: "https://loremflickr.com/800/600/corn?lock=107",
    verified: true
  },
  {
    id: 8,
    product: "Bananes plantain",
    quantity: 35,
    unit: "régime",
    price: 18000,
    location: "Nyiragongo",
    seller: "Maman Amani",
    phone: "+243 970 000 108",
    image: "https://loremflickr.com/800/600/plantain?lock=108",
    verified: false
  },
  {
    id: 9,
    product: "Avocats",
    quantity: 90,
    unit: "kg",
    price: 2500,
    location: "Masisi",
    seller: "Ferme Kivu Vert",
    phone: "+243 970 000 109",
    image: "https://images.unsplash.com/photo-1523046146857-4b4b6f4f3f3f?auto=format&fit=crop&w=900&q=85",
    verified: true
  },
  {
    id: 10,
    product: "Choux",
    quantity: 70,
    unit: "pièce",
    price: 1500,
    location: "Nyiragongo",
    seller: "Jardin du Kivu",
    phone: "+243 970 000 110",
    image: "https://loremflickr.com/800/600/cabbage?lock=110",
    verified: false
  },
  {
    id: 11,
    product: "Patates douces",
    quantity: 120,
    unit: "kg",
    price: 1300,
    location: "Masisi",
    seller: "Groupe Tujenge",
    phone: "+243 970 000 111",
    image: "https://loremflickr.com/800/600/sweetpotato?lock=111",
    verified: true
  },
  {
    id: 12,
    product: "Carottes",
    quantity: 55,
    unit: "kg",
    price: 2200,
    location: "Rutshuru",
    seller: "Ferme La Récolte",
    phone: "+243 970 000 112",
    image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=900&q=85",
    verified: true
  },
  {
    id: 13,
    product: "Poivrons",
    quantity: 45,
    unit: "kg",
    price: 3500,
    location: "Nyiragongo",
    seller: "Espoir Agricole",
    phone: "+243 970 000 113",
    image: "https://loremflickr.com/800/600/bellpepper?lock=113",
    verified: false
  },
  {
    id: 14,
    product: "Aubergines",
    quantity: 65,
    unit: "kg",
    price: 1800,
    location: "Masisi",
    seller: "Maman Bahati",
    phone: "+243 970 000 114",
    image: "https://loremflickr.com/800/600/eggplant?lock=114",
    verified: false
  }
];

const marketPrices = [
  ["Haricots", "kg", "1 200 – 2 500 FC", "3 000 – 4 500 FC", "Hausse"],
  ["Ail", "5 kg", "10 000 FC", "30 000 FC", "Hausse"],
  ["Oignons", "bassin", "50 000 FC", "120 000 FC", "Hausse"],
  ["Pommes de terre", "sac", "120 000 – 140 000 FC", "275 000 FC", "Hausse"],
  ["Manioc", "kg", "—", "1 100 – 1 200 FC", "Stable"],
  ["Maïs", "kg", "—", "1 800 FC", "Stable"],
  ["Tomates", "caisse", "—", "25 000 FC", "Stable"]
];

const formatMoney = (n: number) =>
  `${new Intl.NumberFormat("fr-FR").format(n)} FC`;

export default function Home() {
  const [items, setItems] = useState<Listing[]>(starter);
  const [query, setQuery] = useState("");
  const [zone, setZone] = useState("Toutes les zones");
  const [sort, setSort] = useState("recent");
  const [phoneId, setPhoneId] = useState<number | null>(null);
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const data = localStorage.getItem("agrilien-annonces");

      if (data) {
        const saved: Listing[] = JSON.parse(data);
        const savedIds = new Set(saved.map(x => x.id));

        setItems([
          ...saved,
          ...starter.filter(x => !savedIds.has(x.id))
        ]);
      }
    } catch {
      console.log("Erreur de chargement des annonces");
    }
  }, []);

  const filtered = useMemo(() => {
    const result = items.filter(x =>
      `${x.product} ${x.location} ${x.seller}`
        .toLowerCase()
        .includes(query.toLowerCase()) &&
      (zone === "Toutes les zones" || x.location === zone)
    );

    if (sort === "asc") result.sort((a, b) => a.price - b.price);
    if (sort === "desc") result.sort((a, b) => b.price - a.price);
    if (sort === "quantity") result.sort((a, b) => b.quantity - a.quantity);

    return result;
  }, [items, query, zone, sort]);

  function publish(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const f = new FormData(form);

    const next: Listing = {
      id: Date.now(),
      product: String(f.get("product")),
      quantity: Number(f.get("quantity")),
      unit: String(f.get("unit")),
      price: Number(f.get("price")),
      location: String(f.get("location")),
      seller: String(f.get("seller")),
      phone: String(f.get("phone")),
      image: "https://loremflickr.com/800/600/vegetables?lock=" + Date.now(),
      verified: false
    };

    const updated = [next, ...items];

    setItems(updated);

    try {
      localStorage.setItem("agrilien-annonces", JSON.stringify(updated));
    } catch {}

    setModal(false);
    form.reset();

    setMessage("Annonce enregistrée sur cet appareil. Elle n'est pas encore partagée avec les autres visiteurs.");

    setTimeout(() => setMessage(""), 7000);
  }

  return (
    <>
      <div className="topbar">
        <div className="wrap topbar-inner">
          <span>🌱 Le marché agricole du Nord-Kivu</span>
          <span>Goma · République démocratique du Congo</span>
        </div>
      </div>

      <header className="header">
        <div className="wrap nav">
          <a href="#accueil" className="brand">
            <img src="/logo-agrilien.jpg" alt="Logo AgriLien" />
            <span>
              Agri<span>Lien</span>
              <small>LE MARCHÉ AGRICOLE DIRECT</small>
            </span>
          </a>

          <nav>
            <a href="#annonces">Annonces</a>
            <a href="#prix">Prix du marché</a>
            <a href="#apropos">À propos</a>
            <a href="#contact">Contact</a>
          </nav>

          <button className="nav-cta" onClick={() => setModal(true)}>
            ＋ Publier une récolte
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="accueil">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">
                <i /> PRODUCTEURS & ACHETEURS RÉUNIS
              </span>

              <h1>
                La récolte locale,
                <br />
                <em>au bon prix.</em>
              </h1>

              <p>
                AgriLien rapproche les producteurs du Nord-Kivu et les
                acheteurs de Goma. Trouvez des produits frais, comparez
                les prix et contactez directement les vendeurs.
              </p>

              <div className="hero-actions">
                <a className="btn primary" href="#annonces">
                  Découvrir les récoltes ↗
                </a>

                <a className="btn outline" href="#fonctionnement">
                  Comment ça marche ?
                </a>
              </div>

              <div className="promise">
                <span>✓</span>
                <div>
                  <b>Du producteur à l'acheteur</b>
                  <small>Des prix plus transparents.</small>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85"
                alt="Champs agricoles"
              />

              <div className="photo-caption">
                <span>🌾</span>
                <div>
                  <b>Du champ à Goma</b>
                  <small>Un lien direct pour mieux vendre.</small>
                </div>
              </div>

              <div className="round-stamp">
                100%
                <small>LOCAL</small>
              </div>
            </div>
          </div>

          <div className="wrap stats">
            <div>
              <b>3</b>
              <span>territoires de production</span>
            </div>
            <div>
              <b>Direct</b>
              <span>contact producteur-acheteur</span>
            </div>
            <div>
              <b>Accessible</b>
              <span>adapté aux téléphones</span>
            </div>
          </div>
        </section>

        <section className="section" id="annonces">
          <div className="wrap">
            <div className="section-head">
              <div>
                <span className="label">LE MARCHÉ EN LIGNE</span>
                <h2>Les récoltes <em>disponibles</em></h2>
                <p>Découvrez les produits agricoles de la région.</p>
              </div>

              <button className="link-button" onClick={() => setModal(true)}>
                Vendre ma récolte ↗
              </button>
            </div>

            <div className="filters">
              <label className="search">
                <span>⌕</span>
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Rechercher un produit..."
                />
              </label>

              <select value={zone} onChange={e => setZone(e.target.value)}>
                <option>Toutes les zones</option>
                <option>Masisi</option>
                <option>Rutshuru</option>
                <option>Nyiragongo</option>
              </select>

              <select value={sort} onChange={e => setSort(e.target.value)}>
                <option value="recent">Plus récentes</option>
                <option value="asc">Prix croissant</option>
                <option value="desc">Prix décroissant</option>
                <option value="quantity">Quantité disponible</option>
              </select>
            </div>

            <div className="cards">
              {filtered.map(x => (
                <article className="card" key={x.id}>
                  <div className="card-img">
                    <img
                      src={x.image}
                      alt={x.product}
                      loading="lazy"
                      onError={e => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          "https://loremflickr.com/800/600/vegetables?lock=999";
                      }}
                    />
                    <span>⌖ {x.location}</span>
                  </div>

                  <div className="card-body">
                    <div className="card-title">
                      <h3>{x.product}</h3>
                      {x.verified && (
                        <span className="verified">✓ Vérifié</span>
                      )}
                    </div>

                    <p className="seller">Par {x.seller}</p>

                    <div className="price-row">
                      <div>
                        <b>{formatMoney(x.price)}</b>
                        <small>par {x.unit}</small>
                      </div>

                      <span>{x.quantity} {x.unit}</span>
                    </div>

                    <button
                      className="contact"
                      onClick={() =>
                        setPhoneId(phoneId === x.id ? null : x.id)
                      }
                    >
                      {phoneId === x.id ? x.phone : "Afficher le contact"} ↗
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="empty">Aucun produit trouvé.</p>
            )}

            <p className="disclaimer">
              Les produits et les prix affichés sont des données de
              démonstration à confirmer auprès des vendeurs.
            </p>
          </div>
        </section>

        <section className="market" id="prix">
          <div className="wrap market-grid">
            <div>
              <span className="label">INFORMATION & TRANSPARENCE</span>

              <h2>
                Les prix du marché
                <br />
                <em>à Goma.</em>
              </h2>

              <p>
                Consultez les prix indicatifs des produits agricoles.
                Les valeurs doivent être régulièrement actualisées.
              </p>

              <div className="source-note">
                ● Prix indicatifs · Francs congolais (FC)
              </div>
            </div>

            <div className="table-box">
              <table>
                <thead>
                  <tr>
                    <th>Produit / unité</th>
                    <th>Avant</th>
                    <th>Maintenant</th>
                    <th>Tendance</th>
                  </tr>
                </thead>

                <tbody>
                  {marketPrices.map(row => (
                    <tr key={row[0]}>
                      <td>
                        <b>{row[0]}</b>
                        <small>par {row[1]}</small>
                      </td>
                      <td>{row[2]}</td>
                      <td className="now">{row[3]}</td>
                      <td>
                        <span className={row[4] === "Stable" ? "stable" : "up"}>
                          {row[4] === "Stable" ? "→ Stable" : "↑ Hausse"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <small className="table-foot">
                Prix de démonstration à vérifier sur les marchés locaux.
              </small>
            </div>
          </div>
        </section>

        <section className="section how" id="fonctionnement">
          <div className="wrap">
            <div className="center">
              <span className="label">SIMPLE COMME UN LIEN</span>
              <h2>Comment fonctionne <em>AgriLien ?</em></h2>
              <p>Une plateforme pensée pour les producteurs et acheteurs.</p>
            </div>

            <div className="steps">
              <article>
                <b>01</b>
                <div>🌾</div>
                <h3>Le producteur publie</h3>
                <p>Il présente son produit, son prix et sa quantité.</p>
              </article>

              <article>
                <b>02</b>
                <div>🔎</div>
                <h3>L'acheteur compare</h3>
                <p>Il recherche les produits et compare les prix.</p>
              </article>

              <article>
                <b>03</b>
                <div>🤝</div>
                <h3>Ils se contactent</h3>
                <p>L'acheteur contacte directement le vendeur.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="publish">
          <div className="wrap publish-inner">
            <div>
              <span className="label">VOUS ÊTES PRODUCTEUR ?</span>
              <h2>
                Votre récolte mérite
                <br />
                <em>un meilleur marché.</em>
              </h2>
              <p>Présentez vos produits aux acheteurs de Goma.</p>
            </div>

            <button className="btn light" onClick={() => setModal(true)}>
              ＋ Publier une annonce
            </button>
          </div>
        </section>

        <section className="section about" id="apropos">
          <div className="wrap about-grid">
            <div>
              <span className="label">NOTRE VISION</span>
              <h2>Un marché plus juste, <em>ensemble.</em></h2>
              <p>
                AgriLien rapproche les producteurs et les acheteurs
                pour faciliter les échanges agricoles dans le Nord-Kivu.
              </p>
              <strong>
                Vendez au meilleur prix, achetez directement au producteur.
              </strong>
            </div>

            <div className="values">
              <div>
                <b>01</b>
                <span>
                  <strong>Transparence des prix</strong>
                  <small>Des informations locales.</small>
                </span>
              </div>

              <div>
                <b>02</b>
                <span>
                  <strong>Confiance</strong>
                  <small>Des vendeurs identifiables.</small>
                </span>
              </div>

              <div>
                <b>03</b>
                <span>
                  <strong>Accessibilité</strong>
                  <small>Une expérience adaptée au mobile.</small>
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="wrap contact-grid">
            <div>
              <span className="label">RESTONS EN CONTACT</span>
              <h2>
                Construisons des liens
                <br />
                qui font grandir <em>l'agriculture.</em>
              </h2>
            </div>

            <div>
              <p>
                Producteur, coopérative ou commerçant ?
                Contactez l'équipe AgriLien.
              </p>

              <a className="btn primary" href="mailto:contact@agrilien.cd">
                Écrire à AgriLien ↗
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap footer-inner">
          <a href="#accueil" className="brand">
            <img src="/logo-agrilien.jpg" alt="AgriLien" />
            <span>
              Agri<span>Lien</span>
              <small>LE MARCHÉ AGRICOLE DIRECT</small>
            </span>
          </a>

          <p>© {new Date().getFullYear()} AgriLien · Goma, RDC</p>
          <a href="#accueil">Retour en haut ↑</a>
        </div>
      </footer>

      {message && <div className="toast">{message}</div>}

      {modal && (
        <div className="overlay" onMouseDown={e => {
          if (e.target === e.currentTarget) setModal(false);
        }}>
          <form className="form-modal" onSubmit={publish}>
            <button
              className="close"
              type="button"
              onClick={() => setModal(false)}
            >
              ×
            </button>

            <span className="label">NOUVELLE ANNONCE</span>
            <h2>Publier une récolte</h2>

            <label>
              Produit
              <select name="product" required defaultValue="">
                <option value="" disabled>Choisir un produit</option>
                {starter.map(x => (
                  <option key={x.id}>{x.product}</option>
                ))}
              </select>
            </label>

            <div className="form-row">
              <label>
                Quantité
                <input name="quantity" type="number" min="1" required />
              </label>

              <label>
                Unité
                <select name="unit">
                  <option>kg</option>
                  <option>sac</option>
                  <option>bassin</option>
                  <option>caisse</option>
                  <option>régime</option>
                  <option>pièce</option>
                </select>
              </label>
            </div>

            <label>
              Prix en FC
              <input name="price" type="number" min="1" required />
            </label>

            <label>
              Territoire
              <input name="location" required placeholder="Ex. Masisi" />
            </label>

            <label>
              Nom du producteur
              <input name="seller" required />
            </label>

            <label>
              Téléphone
              <input name="phone" type="tel" required placeholder="+243..." />
            </label>

            <button className="btn primary submit" type="submit">
              Publier l'annonce ↗
            </button>

            <small className="form-note">
              Les annonces sont actuellement enregistrées sur cet appareil.
            </small>
          </form>
        </div>
      )}
    </>
  );
}
