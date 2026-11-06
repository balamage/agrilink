"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Listing = {
  id: number; product: string; quantity: number; unit: string; price: number;
  location: string; seller: string; phone: string; image: string; verified: boolean;
};
const starter: Listing[] = [
  {id:1,product:"Pommes de terre",quantity:80,unit:"sac",price:275000,location:"Masisi",seller:"Coopérative Umoja",phone:"+243 970 000 101",image:"https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=900&q=80",verified:true},
  {id:2,product:"Haricots",quantity:250,unit:"kg",price:3800,location:"Rutshuru",seller:"Maman Bahati",phone:"+243 970 000 102",image:"https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=900&q=80",verified:true},
  {id:3,product:"Oignons",quantity:40,unit:"bassin",price:120000,location:"Nyiragongo",seller:"Ferme La Récolte",phone:"+243 970 000 103",image:"https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=900&q=80",verified:false},
  {id:4,product:"Tomates",quantity:60,unit:"caisse",price:25000,location:"Masisi",seller:"Jean-Pierre M.",phone:"+243 970 000 104",image:"https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=900&q=80",verified:true},
  {id:5,product:"Manioc",quantity:150,unit:"kg",price:1150,location:"Rutshuru",seller:"Groupe Tujenge",phone:"+243 970 000 105",image:"https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=900&q=80",verified:true},
  {id:6,product:"Ail",quantity:25,unit:"lot de 5 kg",price:30000,location:"Masisi",seller:"Espoir Agricole",phone:"+243 970 000 106",image:"https://images.unsplash.com/photo-1615477550927-6ec8445e2a7b?auto=format&fit=crop&w=900&q=80",verified:false},
];
const marketPrices = [
  ["Haricots","kg","1 200 – 2 500 FC","3 000 – 4 500 FC","Hausse"],
  ["Ail","5 kg","10 000 FC","30 000 FC","Hausse"],
  ["Oignons","bassin","50 000 FC","120 000 FC","Hausse"],
  ["Pommes de terre","sac","120 000 – 140 000 FC","≈ 275 000 FC","Hausse"],
  ["Cossettes de manioc","kg","—","1 100 – 1 200 FC","Stable"],
];
const formatMoney = (n:number) => `${new Intl.NumberFormat("fr-FR").format(n)} FC`;

export default function Home() {
  const [items,setItems] = useState<Listing[]>(starter);
  const [query,setQuery] = useState("");
  const [zone,setZone] = useState("Toutes les zones");
  const [sort,setSort] = useState("recent");
  const [phoneId,setPhoneId] = useState<number|null>(null);
  const [modal,setModal] = useState(false);
  const [message,setMessage] = useState("");

  useEffect(() => {
    try { const data=localStorage.getItem("agrilien-annonces"); if(data) setItems(JSON.parse(data)); } catch {}
  },[]);
  const filtered = useMemo(() => {
    const result=items.filter(x =>
      `${x.product} ${x.location} ${x.seller}`.toLowerCase().includes(query.toLowerCase()) &&
      (zone==="Toutes les zones" || x.location.toLowerCase().includes(zone.toLowerCase()))
    );
    if(sort==="asc") result.sort((a,b)=>a.price-b.price);
    if(sort==="desc") result.sort((a,b)=>b.price-a.price);
    if(sort==="quantity") result.sort((a,b)=>b.quantity-a.quantity);
    return result;
  },[items,query,zone,sort]);

  function publish(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f=new FormData(e.currentTarget);
    const next:Listing[]=[{
      id:Date.now(), product:String(f.get("product")), quantity:Number(f.get("quantity")),
      unit:String(f.get("unit")), price:Number(f.get("price")), location:String(f.get("location")),
      seller:String(f.get("seller")), phone:String(f.get("phone")),
      image:"https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80",
      verified:false
    },...items];
    setItems(next);
    try { localStorage.setItem("agrilien-annonces",JSON.stringify(next)); } catch {}
    setModal(false); setMessage("Annonce ajoutée sur cet appareil. Elle n'est pas encore visible sur les autres téléphones.");
    e.currentTarget.reset(); window.setTimeout(()=>setMessage(""),7000);
  }

  return <>
    <div className="topbar"><div className="wrap topbar-inner"><span>🌱 Le marché agricole du Nord-Kivu</span><span>Goma · République démocratique du Congo</span></div></div>
    <header className="header"><div className="wrap nav">
      <a href="#accueil" className="brand"><img src="/logo-agrilien.jpg" alt="Logo AgriLien"/><span>Agri<span>Lien</span><small>LE MARCHÉ AGRICOLE DIRECT</small></span></a>
      <nav><a href="#annonces">Annonces</a><a href="#prix">Prix du marché</a><a href="#apropos">À propos</a><a href="#contact">Contact</a></nav>
      <a className="nav-cta" href="#publier">＋ Publier une récolte</a>
    </div></header>

    <main>
      <section className="hero" id="accueil"><div className="wrap hero-grid">
        <div className="hero-copy"><span className="eyebrow"><i/> PRODUCTEURS & ACHETEURS RÉUNIS</span>
          <h1>La récolte locale,<br/><em>au bon prix.</em></h1>
          <p>AgriLien rapproche les producteurs du Nord-Kivu et les acheteurs de Goma. Trouvez des produits frais, comparez les prix et contactez directement les vendeurs.</p>
          <div className="hero-actions"><a className="btn primary" href="#annonces">Découvrir les récoltes <b>↗</b></a><a className="btn outline" href="#fonctionnement">Comment ça marche ?</a></div>
          <div className="promise"><span>✓</span><div><b>Du producteur à l’acheteur</b><small>Des prix plus transparents, moins d’intermédiaires.</small></div></div>
        </div>
        <div className="hero-visual"><img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85" alt="Paysage de champs agricoles verdoyants"/>
          <div className="photo-caption"><span>🌾</span><div><b>Du champ à Goma</b><small>Un lien direct pour mieux vendre et acheter.</small></div></div><div className="round-stamp">100%<small>LOCAL</small></div>
        </div>
      </div><div className="wrap stats"><div><b>3</b><span>territoires de production ciblés</span></div><div><b>Direct</b><span>contact producteur-acheteur</span></div><div><b>Accessible</b><span>un site léger, adapté au mobile</span></div></div></section>

      <section className="section" id="annonces"><div className="wrap">
        <div className="section-head"><div><span className="label">LE MARCHÉ EN LIGNE</span><h2>Les récoltes <em>disponibles</em></h2><p>Explorez les produits proposés par les producteurs et coopératives de la région.</p></div><button className="link-button" onClick={()=>setModal(true)}>Vendre ma récolte ↗</button></div>
        <div className="filters"><label className="search"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Rechercher un produit ou une zone..." aria-label="Recherche"/></label>
          <select value={zone} onChange={e=>setZone(e.target.value)} aria-label="Filtrer par zone"><option>Toutes les zones</option><option>Masisi</option><option>Rutshuru</option><option>Nyiragongo</option></select>
          <select value={sort} onChange={e=>setSort(e.target.value)} aria-label="Trier"><option value="recent">Plus récentes</option><option value="asc">Prix croissant</option><option value="desc">Prix décroissant</option><option value="quantity">Quantité disponible</option></select></div>
        <div className="cards">{filtered.map(x=><article className="card" key={x.id}><div className="card-img"><img src={x.image} alt={x.product} loading="lazy"/><span>⌖ {x.location}</span></div><div className="card-body"><div className="card-title"><h3>{x.product}</h3>{x.verified&&<span className="verified">✓ Vérifié</span>}</div><p className="seller">Par {x.seller}</p><div className="price-row"><div><b>{formatMoney(x.price)}</b><small>par {x.unit}</small></div><span>{x.quantity} {x.unit}</span></div><button className="contact" onClick={()=>setPhoneId(phoneId===x.id?null:x.id)}>{phoneId===x.id?x.phone:"Afficher le contact"} <b>↗</b></button></div></article>)}</div>
        {filtered.length===0&&<p className="empty">Aucune annonce trouvée. Essayez une autre recherche.</p>}
        <p className="disclaimer">Prototype : les annonces de départ sont des exemples. Les prix peuvent varier et doivent être confirmés sur le marché.</p>
      </div></section>

      <section className="market"><div className="wrap market-grid"><div><span className="label">INFORMATION & TRANSPARENCE</span><h2>Les prix du marché<br/><em>à Goma.</em></h2><p>Valeurs indicatives rapportées dans le travail pratique. Elles doivent être confirmées par des relevés réguliers auprès des marchés et agents relais.</p><div className="source-note">● Données indicatives · Francs congolais (FC)</div></div>
        <div className="table-box"><table><thead><tr><th>Produit / unité</th><th>Avant</th><th>Maintenant</th><th>Tendance</th></tr></thead><tbody>{marketPrices.map(row=><tr key={row[0]}><td><b>{row[0]}</b><small>par {row[1]}</small></td><td>{row[2]}</td><td className="now">{row[3]}</td><td><span className={row[4]==="Stable"?"stable":"up"}>{row[4]==="Stable"?"→ Stable":"↑ Hausse"}</span></td></tr>)}</tbody></table><small className="table-foot">Source : TP AgriLien, chiffres indicatifs rapportés par la presse locale en 2026.</small></div>
      </div></section>

      <section className="section how" id="fonctionnement"><div className="wrap"><div className="center"><span className="label">SIMPLE COMME UN LIEN</span><h2>Comment fonctionne <em>AgriLien ?</em></h2><p>Une plateforme pensée pour les réalités des producteurs et des acheteurs du Nord-Kivu.</p></div>
        <div className="steps"><article><b>01</b><div>🌾</div><h3>Le producteur publie</h3><p>Produit, quantité, prix, territoire, nom et téléphone. La publication par SMS/USSD fait partie de la vision du projet et nécessitera une passerelle télécom.</p></article><article><b>02</b><div>🔎</div><h3>L’acheteur compare</h3><p>Il recherche les produits, filtre par zone et compare les prix et les quantités disponibles.</p></article><article><b>03</b><div>🤝</div><h3>Ils se contactent</h3><p>L’acheteur contacte directement le vendeur pour vérifier la disponibilité et organiser la transaction.</p></article></div>
      </div></section>

      <section className="publish" id="publier"><div className="wrap publish-inner"><div><span className="label">VOUS ÊTES PRODUCTEUR ?</span><h2>Votre récolte mérite<br/><em>un meilleur marché.</em></h2><p>Présentez vos produits aux acheteurs de Goma. La publication est gratuite dans la V1.</p></div><button className="btn light" onClick={()=>setModal(true)}>＋ Publier une annonce</button></div></section>

      <section className="section about" id="apropos"><div className="wrap about-grid"><div><span className="label">NOTRE VISION</span><h2>Un marché plus juste, <em>ensemble.</em></h2><p>Transformer chaque producteur et chaque acheteur de Goma en acteur d’un marché agricole direct, transparent et accessible, même par simple SMS.</p><strong>« Vendez au meilleur prix, achetez directement au producteur. »</strong></div>
        <div className="values"><div><b>01</b><span><strong>Transparence des prix</strong><small>Des informations locales pour mieux décider.</small></span></div><div><b>02</b><span><strong>Confiance</strong><small>Producteurs vérifiés, annonces modérées et signalement.</small></span></div><div><b>03</b><span><strong>Accessibilité</strong><small>Une expérience légère, pensée pour les connexions limitées.</small></span></div></div></div></section>

      <section className="contact-section" id="contact"><div className="wrap contact-grid"><div><span className="label">RESTONS EN CONTACT</span><h2>Construisons des liens<br/>qui font grandir <em>l’agriculture.</em></h2></div><div><p>Producteur, coopérative, commerçant ou partenaire ? Écrivez à l’équipe AgriLien pour en savoir plus.</p><a className="btn primary" href="mailto:contact@agrilien.cd">Écrire à AgriLien ↗</a><small>Adresse de démonstration à remplacer par le contact officiel du projet.</small></div></div></section>
    </main>

    <footer><div className="wrap footer-inner"><a href="#accueil" className="brand"><img src="/logo-agrilien.jpg" alt=""/><span>Agri<span>Lien</span><small>LE MARCHÉ AGRICOLE DIRECT</small></span></a><p>© {new Date().getFullYear()} AgriLien · Goma, RDC</p><a href="#accueil">Retour en haut ↑</a></div></footer>

    {message&&<div className="toast" role="status">{message}</div>}
    {modal&&<div className="overlay" onMouseDown={e=>{if(e.target===e.currentTarget)setModal(false)}}><form className="form-modal" onSubmit={publish}><button className="close" type="button" onClick={()=>setModal(false)}>×</button><span className="label">NOUVELLE ANNONCE</span><h2>Publier une récolte</h2><p>Renseignez les informations de votre produit.</p>
      <label>Produit<select name="product" required defaultValue=""><option value="" disabled>Choisir un produit</option>{["Haricots","Pommes de terre","Oignons","Ail","Manioc","Tomates","Maïs","Autre produit"].map(p=><option key={p}>{p}</option>)}</select></label>
      <div className="form-row"><label>Quantité<input name="quantity" type="number" min="1" required placeholder="Ex. 50"/></label><label>Unité<select name="unit"><option>kg</option><option>sac</option><option>bassin</option><option>caisse</option><option>lot de 5 kg</option></select></label></div>
      <label>Prix (FC)<input name="price" type="number" min="1" required placeholder="Ex. 3500"/></label><label>Territoire / zone<input name="location" required placeholder="Ex. Masisi"/></label><label>Nom du producteur<input name="seller" required placeholder="Votre nom ou coopérative"/></label><label>Téléphone<input name="phone" type="tel" required placeholder="+243..."/></label>
      <button className="btn primary submit" type="submit">Publier l’annonce ↗</button><small className="form-note">Prototype : l’annonce est enregistrée sur ce navigateur uniquement, sans base de données partagée.</small>
    </form></div>}
  </>;
}
