import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════
//  DESIGN TOKENS
// ═══════════════════════════════════════════════════
const N = "#1a2744";   // Navy
const G = "#b89a2f";   // Gold
const GL = "#d4b94e";  // Gold light
const CR = "#f8f6f1";  // Cream
const NS = "#2a3a5c";  // Navy soft

// ═══════════════════════════════════════════════════
//  GLOBAL STYLES
// ═══════════════════════════════════════════════════
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'DM Sans',sans-serif;color:${N};background:#fff;overflow-x:hidden}
    @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes slideDown{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
    @keyframes scaleIn{from{opacity:0;transform:scale(.93)}to{opacity:1;transform:scale(1)}}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
    @keyframes spin{to{transform:rotate(360deg)}}
    @keyframes toastIn{from{opacity:0;transform:translateY(16px) scale(.95)}to{opacity:1;transform:translateY(0) scale(1)}}
    @keyframes barSlide{from{transform:scaleX(0)}to{transform:scaleX(1)}}
    .fade-up{animation:fadeUp .55s ease both}
    .fade-in{animation:fadeIn .4s ease both}
    .scale-in{animation:scaleIn .4s ease both}
    a{text-decoration:none;color:inherit}
    button{cursor:pointer;font-family:'DM Sans',sans-serif}
    input,textarea,select{font-family:'DM Sans',sans-serif}
    ::-webkit-scrollbar{width:6px}
    ::-webkit-scrollbar-track{background:#f5f3ee}
    ::-webkit-scrollbar-thumb{background:${G}40;border-radius:3px}
    .nav-link{font-size:13px;font-weight:500;color:rgba(255,255,255,.7);padding:8px 2px;position:relative;transition:color .2s;cursor:pointer}
    .nav-link:hover,.nav-link.active{color:${GL}}
    .nav-link.active::after{content:'';position:absolute;bottom:-2px;left:0;right:0;height:2px;background:${G};border-radius:1px;animation:barSlide .3s ease both;transform-origin:left}
    .btn-gold{display:inline-flex;align-items:center;gap:8px;padding:13px 28px;font-size:14px;font-weight:600;background:linear-gradient(135deg,${G},${GL});color:${N};border:none;border-radius:8px;cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif}
    .btn-gold:hover{transform:translateY(-2px);box-shadow:0 8px 24px ${G}40}
    .btn-navy{display:inline-flex;align-items:center;gap:8px;padding:13px 28px;font-size:14px;font-weight:600;background:linear-gradient(135deg,${N},${NS});color:#fff;border:none;border-radius:8px;cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif}
    .btn-navy:hover{transform:translateY(-2px);box-shadow:0 8px 24px ${N}30}
    .btn-outline{display:inline-flex;align-items:center;gap:8px;padding:12px 26px;font-size:14px;font-weight:500;background:transparent;color:#fff;border:1.5px solid rgba(255,255,255,.3);border-radius:8px;cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif}
    .btn-outline:hover{border-color:${GL};color:${GL}}
    .section-label{font-size:11px;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;color:${G};margin-bottom:12px;display:block}
    .gold-line{height:3px;width:48px;background:linear-gradient(90deg,${G},${GL});border-radius:2px}
    .card{background:#fff;border:1.5px solid #eae7df;border-radius:16px;transition:all .25s}
    .card:hover{border-color:${G}50;box-shadow:0 10px 32px rgba(26,39,68,.06);transform:translateY(-3px)}
    .input-field{width:100%;padding:12px 16px;font-size:14px;border:1.5px solid #eae7df;border-radius:10px;background:${CR};color:${N};outline:none;box-sizing:border-box;transition:border-color .2s}
    .input-field:focus{border-color:${G};box-shadow:0 0 0 3px ${G}12}
    .tag{display:inline-block;font-size:11px;padding:4px 12px;border-radius:20px;background:${CR};border:1px solid #eae7df;color:${NS};font-weight:500;margin:2px 3px 2px 0}
    .status-badge{display:inline-flex;align-items:center;gap:5px;font-size:11px;font-weight:600;padding:4px 12px;border-radius:20px}
  `}</style>
);

// ═══════════════════════════════════════════════════
//  LOGO COMPONENT
// ═══════════════════════════════════════════════════
const Logo = ({ size = "md", onClick }) => {
  const s = size === "sm" ? { box: 30, font: 11, title: 13, sub: 8 }
    : size === "lg" ? { box: 52, font: 18, title: 20, sub: 10 }
    : { box: 38, font: 14, title: 15, sub: 9 };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={onClick}>
      <div style={{ width: s.box, height: s.box, borderRadius: 8, background: `linear-gradient(135deg,${G},${GL})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: s.font, color: N, flexShrink: 0, boxShadow: `0 4px 14px ${G}30` }}>ELR</div>
      <div>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: s.title, fontWeight: 700, color: "#fff", lineHeight: 1 }}>LEXA-ROK</div>
        <div style={{ fontSize: s.sub, fontWeight: 500, color: "rgba(255,255,255,.4)", letterSpacing: "2px", textTransform: "uppercase", marginTop: 2 }}>expertise</div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════
//  NAVBAR
// ═══════════════════════════════════════════════════
const Navbar = ({ page, go, user, setUser }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = [
    { id: "accueil", label: "Accueil" },
    { id: "services", label: "Services" },
    { id: "a-propos", label: "Le cabinet" },
    { id: "blog", label: "Blog" },
    { id: "contact", label: "Contact" },
  ];
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, background: scrolled ? `${N}f2` : "transparent", backdropFilter: scrolled ? "blur(14px)" : "none", borderBottom: scrolled ? `1px solid ${N}30` : "none", transition: "all .3s", padding: "0 40px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <Logo onClick={() => go("accueil")} />
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {links.map(l => (
            <span key={l.id} className={`nav-link ${page === l.id ? "active" : ""}`} onClick={() => go(l.id)}>{l.label}</span>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span className="nav-link" onClick={() => go("rdv")} style={{ color: "rgba(255,255,255,.6)", marginRight: 4 }}>📅 RDV</span>
          {user ? (
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => go(user.role === "admin" ? "dashboard" : "portail")} style={{ padding: "8px 18px", fontSize: 12, fontWeight: 600, background: `${G}20`, color: GL, border: `1px solid ${G}30`, borderRadius: 8 }}>
                {user.role === "admin" ? "🛡️ Admin" : "👤 Mon espace"}
              </button>
              <button onClick={() => { setUser(null); go("accueil"); }} style={{ padding: "8px 14px", fontSize: 12, background: "rgba(255,255,255,.08)", color: "rgba(255,255,255,.5)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 8 }}>↩</button>
            </div>
          ) : (
            <button onClick={() => go("connexion")} style={{ padding: "9px 22px", fontSize: 12, fontWeight: 600, background: `linear-gradient(135deg,${G},${GL})`, color: N, borderRadius: 6, border: "none" }}>Connexion</button>
          )}
        </div>
      </div>
    </nav>
  );
};

// ═══════════════════════════════════════════════════
//  PAGE: ACCUEIL
// ═══════════════════════════════════════════════════
const PageAccueil = ({ go }) => {
  const services = [
    { icon: "⚖️", t: "Consultation juridique", d: "Analyse personnalisée de votre situation juridique." },
    { icon: "🏢", t: "Création d'entreprise", d: "De l'idée à l'immatriculation, nous vous guidons." },
    { icon: "📝", t: "Rédaction de contrats", d: "Contrats solides et adaptés à vos besoins." },
    { icon: "📋", t: "Formalités juridiques", d: "Vos démarches administratives simplifiées." },
    { icon: "🛡️", t: "Contentieux & litiges", d: "Défense de vos droits avec rigueur." },
    { icon: "📰", t: "Veille juridique", d: "Newsletter hebdomadaire sur l'actualité du droit." },
  ];
  const stats = [{ v: "500+", l: "Clients" }, { v: "98%", l: "Satisfaction" }, { v: "72h", l: "Délai de réponse" }, { v: "15+", l: "Domaines" }];
  const values = [
    { n: "Rigueur", d: "Précision absolue sur chaque dossier." },
    { n: "Proximité", d: "Un expert dédié qui vous connaît." },
    { n: "Transparence", d: "Tarifs clairs, aucun frais caché." },
    { n: "Innovation", d: "Droit traditionnel + outils digitaux." },
  ];
  return (
    <div style={{ background: "#fff" }}>
      {/* HERO */}
      <section style={{ minHeight: "100vh", background: `linear-gradient(155deg,${N} 0%,${NS} 45%,#1e3050 100%)`, display: "flex", alignItems: "center", padding: "120px 40px 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, borderRadius: "50%", border: `1px solid ${G}08` }} />
        <div style={{ position: "absolute", top: "25%", right: "12%", width: 6, height: 6, borderRadius: "50%", background: G, opacity: .3, animation: "float 4s ease infinite" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 60, alignItems: "center" }}>
          <div className="fade-up">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div className="gold-line" />
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: GL }}>Cabinet de conseil juridique</span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 52, fontWeight: 700, lineHeight: 1.1, color: "#fff", margin: "0 0 22px", letterSpacing: "-1.5px" }}>
              Votre droit,<br />
              <span style={{ color: GL, fontStyle: "italic" }}>notre</span> expertise.
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,.55)", margin: "0 0 36px", maxWidth: 440 }}>
              Expertise LEXA-ROK vous accompagne dans toutes vos démarches juridiques — de la consultation à la création d'entreprise.
            </p>
            <div style={{ display: "flex", gap: 14 }}>
              <button className="btn-gold" onClick={() => go("services")}>Nos services <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke={N} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
              <button className="btn-outline" onClick={() => go("rdv")}>Prendre RDV</button>
            </div>
          </div>
          {/* Logo orbe */}
          <div className="fade-up" style={{ animationDelay: ".15s", display: "flex", justifyContent: "center" }}>
            <div style={{ width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle at 30% 30%,${NS},${N}ee)`, border: `1.5px solid ${G}20`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: `0 0 80px ${G}10`, position: "relative" }}>
              <div style={{ width: 84, height: 84, borderRadius: 18, background: `linear-gradient(145deg,${G},${GL})`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, boxShadow: `0 12px 40px ${G}30` }}>
                <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: 30, color: N }}>ELR</span>
              </div>
              <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "4px", textTransform: "uppercase", color: "rgba(255,255,255,.45)", marginBottom: 6 }}>expertise</div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: "#fff" }}>LEXA-ROK</div>
              <div style={{ position: "absolute", width: "100%", height: "100%", animation: "spin 20s linear infinite" }}>
                <div style={{ position: "absolute", top: -5, left: "50%", width: 10, height: 10, borderRadius: "50%", background: G, boxShadow: `0 0 14px ${G}60` }} />
              </div>
            </div>
          </div>
        </div>
        {/* Stats bar */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: `${N}cc`, backdropFilter: "blur(10px)", borderTop: `1px solid ${G}15` }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
            {stats.map((s, i) => (
              <div key={i} style={{ textAlign: "center", padding: "22px 12px", borderRight: i < 3 ? `1px solid ${G}12` : "none" }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, color: GL }}>{s.v}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ padding: "88px 40px", background: CR }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <span className="section-label">Nos expertises</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 36, fontWeight: 700, letterSpacing: "-.5px" }}>
              Solutions juridiques <span style={{ color: G, fontStyle: "italic" }}>sur mesure</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
            {services.map((s, i) => (
              <div key={i} className="card fade-up" style={{ padding: "28px 24px", animationDelay: `${i * .07}s`, cursor: "pointer" }} onClick={() => go("services")}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `${G}10`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 16 }}>{s.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{s.t}</h3>
                <p style={{ fontSize: 13, color: "#888", lineHeight: 1.6 }}>{s.d}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 36 }}>
            <button className="btn-navy" onClick={() => go("services")}>Voir tous les services</button>
          </div>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section style={{ padding: "88px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
          <div>
            <span className="section-label">Le cabinet</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 34, fontWeight: 700, lineHeight: 1.2, marginBottom: 18, letterSpacing: "-.5px" }}>
              L'excellence juridique au service de <span style={{ color: G, fontStyle: "italic" }}>votre réussite</span>
            </h2>
            <p style={{ fontSize: 15, color: "#666", lineHeight: 1.8, marginBottom: 28 }}>Expertise LEXA-ROK combine expertise rigoureuse et outils numériques modernes pour rendre le droit accessible, efficace et humain en Côte d'Ivoire.</p>
            <button className="btn-navy" onClick={() => go("a-propos")}>Découvrir le cabinet</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {values.map((v, i) => (
              <div key={i} className="card" style={{ padding: "24px 20px" }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, color: `${G}25`, marginBottom: 8, lineHeight: 1 }}>{String(i + 1).padStart(2, "0")}</div>
                <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{v.n}</h4>
                <p style={{ fontSize: 12, color: "#999", lineHeight: 1.5 }}>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section style={{ padding: "72px 40px", background: `linear-gradient(135deg,${N},${NS})`, textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Besoin d'un conseil juridique ?</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,.5)", marginBottom: 32 }}>Premier diagnostic gratuit — prenez rendez-vous dès aujourd'hui.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
            <button className="btn-gold" onClick={() => go("rdv")}>Prendre rendez-vous</button>
            <button className="btn-outline" onClick={() => go("contact")}>Nous contacter</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer go={go} />
    </div>
  );
};

// ═══════════════════════════════════════════════════
//  PAGE: SERVICES (résumé avec lien vers détail)
// ═══════════════════════════════════════════════════
const PageServices = ({ go }) => {
  const [active, setActive] = useState(null);
  const svcs = [
    { cat: "conseil", icon: "⚖️", t: "Consultation juridique", tl: "Un avis éclairé pour chaque situation", p: "25 000 FCFA", d: "45 min – 1h30", popular: true, desc: "Analyse approfondie, identification des risques et recommandations stratégiques écrites.", inc: ["Analyse de votre situation", "Identification des risques", "Recommandations écrites", "Suivi 7 jours"], dom: ["Droit civil", "Droit des affaires", "Droit du travail", "Droit de la famille"] },
    { cat: "entreprise", icon: "🏢", t: "Création d'entreprise", tl: "De l'idée à l'immatriculation", p: "150 000 FCFA", d: "7–15 jours", popular: true, desc: "Choix du statut, rédaction des statuts, dépôt au greffe, DFE.", inc: ["Choix du statut juridique", "Rédaction des statuts", "Dépôt RCCM", "Déclaration DFE", "Kit juridique complet"], dom: ["SARL / SARLU", "SAS / SA", "Auto-entrepreneur", "GIE"] },
    { cat: "formalites", icon: "📝", t: "Rédaction de contrats", tl: "Des contrats solides et sur mesure", p: "50 000 FCFA", d: "3–7 jours", popular: true, desc: "Élaboration, révision et négociation de tous types de contrats.", inc: ["Rédaction sur mesure", "Révision de contrats", "Négociation des clauses", "Explication des engagements"], dom: ["Contrats commerciaux", "Baux professionnels", "CGV / CGU", "Pactes d'associés"] },
    { cat: "formalites", icon: "📋", t: "Formalités juridiques", tl: "Zéro paperasse, zéro stress", p: "30 000 FCFA", d: "3–10 jours", popular: false, desc: "Toutes vos démarches administratives prises en charge.", inc: ["Constitution du dossier", "Dépôt et suivi", "Publication légale", "Remise des documents"], dom: ["Greffe du tribunal", "Impôts & CNPS", "Préfecture", "JAL"] },
    { cat: "contentieux", icon: "🛡️", t: "Contentieux & litiges", tl: "Défendre vos droits avec fermeté", p: "Devis personnalisé", d: "Variable", popular: false, desc: "Résolution amiable, médiation, arbitrage ou procédure judiciaire.", inc: ["Analyse de recevabilité", "Mises en demeure", "Médiation & arbitrage", "Représentation judiciaire"], dom: ["Litiges commerciaux", "Recouvrement", "Conflits travail", "Litiges immobiliers"] },
    { cat: "conseil", icon: "📰", t: "Veille & newsletter", tl: "Restez informé, restez conforme", p: "Gratuit", d: "Abonnement", popular: false, desc: "Bulletins juridiques hebdomadaires, alertes législatives et guides pratiques.", inc: ["Newsletter hebdomadaire", "Alertes réformes", "Fiches pratiques", "Base documentaire"], dom: ["Droit OHADA", "Fiscalité", "Droit du travail"] },
  ];
  return (
    <div style={{ background: CR }}>
      <section style={{ background: `linear-gradient(155deg,${N},${NS})`, padding: "120px 40px 64px", textAlign: "center" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div className="gold-line" style={{ margin: "0 auto 18px" }} />
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 42, fontWeight: 700, color: "#fff", margin: "0 0 14px", letterSpacing: "-1px" }}>
            Prestations <span style={{ color: GL, fontStyle: "italic" }}>juridiques</span>
          </h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,.5)", lineHeight: 1.7 }}>Accompagnement complet et transparent — de la consultation à la gestion de vos litiges.</p>
        </div>
      </section>
      <section style={{ padding: "48px 40px 80px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          {svcs.map((s, i) => {
            const open = active === i;
            return (
              <div key={i} onClick={() => setActive(open ? null : i)} className="fade-up" style={{ background: "#fff", border: `1.5px solid ${open ? G : "#eae7df"}`, borderRadius: 18, marginBottom: 14, overflow: "hidden", cursor: "pointer", transition: "all .3s", animationDelay: `${i * .05}s`, boxShadow: open ? `0 12px 36px rgba(26,39,68,.07)` : "none" }}>
                <div style={{ padding: "22px 26px", display: "flex", alignItems: "center", gap: 18 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: open ? `linear-gradient(135deg,${N},${NS})` : `${G}10`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0, transition: "all .3s" }}>{s.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                      <h3 style={{ fontSize: 17, fontWeight: 700, fontFamily: "'Playfair Display',serif" }}>{s.t}</h3>
                      {s.popular && <span style={{ fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: `${G}18`, color: G }}>Populaire</span>}
                    </div>
                    <p style={{ fontSize: 12, color: "#999", fontStyle: "italic" }}>{s.tl}</p>
                  </div>
                  <div style={{ textAlign: "right", minWidth: 120, flexShrink: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{s.p}</div>
                    <div style={{ fontSize: 11, color: "#bbb" }}>{s.d}</div>
                  </div>
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform .3s", marginLeft: 8, flexShrink: 0 }}>
                    <path d="M3 5l4 4 4-4" stroke={open ? G : "#ccc"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div style={{ maxHeight: open ? 400 : 0, overflow: "hidden", transition: "max-height .4s ease" }}>
                  <div style={{ padding: "0 26px 26px", borderTop: "1px solid #eae7df" }}>
                    <p style={{ fontSize: 14, color: "#666", lineHeight: 1.75, margin: "18px 0 18px" }}>{s.desc}</p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1.5px", color: G, marginBottom: 10 }}>Inclus</div>
                        {s.inc.map((x, j) => <div key={j} style={{ display: "flex", gap: 8, alignItems: "center", padding: "5px 0", fontSize: 13, color: "#555" }}><div style={{ width: 16, height: 16, borderRadius: "50%", background: `${G}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4.5" stroke={G} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div>{x}</div>)}
                      </div>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1.5px", color: G, marginBottom: 10 }}>Domaines</div>
                        <div>{s.dom.map((d, j) => <span key={j} className="tag">{d}</span>)}</div>
                        <button className="btn-gold" onClick={e => { e.stopPropagation(); go("rdv"); }} style={{ marginTop: 16, width: "100%", justifyContent: "center", padding: "11px" }}>Demander ce service</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <Footer go={go} />
    </div>
  );
};

// ═══════════════════════════════════════════════════
//  PAGE: À PROPOS
// ═══════════════════════════════════════════════════
const PageAPropos = ({ go }) => {
  const [activeTeam, setActiveTeam] = useState(0);
  const team = [
    { i: "DK", n: "Dr. Konan", r: "Fondateur & Directeur", b: "Juriste d'affaires, 12 ans d'expérience en droit OHADA et droit des sociétés.", sp: ["Droit OHADA", "Fusions & acquisitions"], c: G },
    { i: "AT", n: "Maître Touré", r: "Resp. Contentieux", b: "Spécialiste en litiges commerciaux et recouvrement, ancien avocat au barreau.", sp: ["Contentieux", "Recouvrement", "Arbitrage"], c: "#3b82f6" },
    { i: "MN", n: "Mme N'Dri", r: "Chargée de Formalités", b: "Experte en création d'entreprise et procédures RCCM.", sp: ["Création entreprise", "Formalités"], c: "#22c55e" },
    { i: "SK", n: "M. Sanogo", r: "Conseiller Fiscal", b: "Fiscaliste certifié, optimisation juridique et conformité fiscale.", sp: ["Fiscalité", "Déclarations"], c: "#8b5cf6" },
  ];
  const tl = [
    { y: "2019", t: "Naissance de l'idée", d: "Conception d'un cabinet juridique moderne et digitalisé." },
    { y: "2020", t: "Premières consultations", d: "Lancement des prestations de conseil et d'accompagnement." },
    { y: "2022", t: "Expansion", d: "Contentieux, recouvrement, veille juridique. L'équipe s'agrandit." },
    { y: "2024", t: "Transformation digitale", d: "Portail client en ligne et newsletter juridique." },
    { y: "2026", t: "Expertise LEXA-ROK", d: "Refonte complète de la marque. Référence en droit digital en Afrique de l'Ouest." },
  ];
  const vals = [
    { s: "◈", t: "Rigueur", d: "Précision absolue sur chaque dossier.", c: G },
    { s: "◎", t: "Proximité", d: "Un accompagnement humain et personnalisé.", c: "#3b82f6" },
    { s: "◇", t: "Confidentialité", d: "Secret professionnel le plus strict.", c: "#22c55e" },
    { s: "△", t: "Innovation", d: "Expertise juridique et outils numériques modernes.", c: "#8b5cf6" },
    { s: "□", t: "Transparence", d: "Tarifs clairs, aucun frais caché.", c: "#e67e22" },
    { s: "○", t: "Excellence", d: "Dépasser vos attentes à chaque interaction.", c: "#e74c3c" },
  ];
  return (
    <div>
      {/* HERO */}
      <section style={{ background: `linear-gradient(155deg,${N},${NS})`, padding: "120px 40px 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", border: `1px solid ${G}08` }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 60, alignItems: "center" }}>
          <div className="fade-up">
            <div className="gold-line" style={{ marginBottom: 20 }} />
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 44, fontWeight: 700, color: "#fff", margin: "0 0 18px", letterSpacing: "-1px", lineHeight: 1.12 }}>
              Le droit,<br /><span style={{ color: GL, fontStyle: "italic" }}>autrement.</span>
            </h1>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,.5)", lineHeight: 1.8, maxWidth: 420 }}>Expertise LEXA-ROK est né d'une conviction : le droit doit être accessible, humain et efficace.</p>
          </div>
          <div className="fade-up" style={{ animationDelay: ".15s" }}>
            <div style={{ background: "rgba(255,255,255,.04)", border: `1px solid ${G}18`, borderRadius: 22, padding: "34px 30px" }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: GL, marginBottom: 14 }}>Notre mission</div>
              <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 500, color: "#fff", lineHeight: 1.65, fontStyle: "italic" }}>"Rendre le droit accessible à tous en Côte d'Ivoire — particuliers comme entreprises."</p>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section style={{ padding: "80px 40px", background: CR }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="section-label">Notre histoire</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 700, letterSpacing: "-.5px" }}>Un parcours <span style={{ color: G, fontStyle: "italic" }}>d'engagement</span></h2>
          </div>
          <div style={{ position: "relative", paddingLeft: 56 }}>
            <div style={{ position: "absolute", left: 23, top: 8, bottom: 8, width: 2, background: `linear-gradient(to bottom,${G},${G}30)`, borderRadius: 1 }} />
            {tl.map((t, i) => (
              <div key={i} className="fade-up" style={{ marginBottom: i < tl.length - 1 ? 28 : 0, animationDelay: `${i * .1}s`, position: "relative" }}>
                <div style={{ position: "absolute", left: -46, top: 8, width: i === tl.length - 1 ? 18 : 14, height: i === tl.length - 1 ? 18 : 14, borderRadius: "50%", background: i === tl.length - 1 ? G : "#fff", border: `${i === tl.length - 1 ? 3 : 2}px solid ${G}` }} />
                <div style={{ padding: "20px 24px", borderRadius: 14, background: i === tl.length - 1 ? `linear-gradient(135deg,${N},${NS})` : "#fff", border: i === tl.length - 1 ? "none" : "1px solid #eae7df" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                    <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, color: i === tl.length - 1 ? GL : G }}>{t.y}</span>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: i === tl.length - 1 ? "#fff" : N }}>{t.t}</h3>
                  </div>
                  <p style={{ fontSize: 13, color: i === tl.length - 1 ? "rgba(255,255,255,.5)" : "#888", lineHeight: 1.6 }}>{t.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ padding: "80px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="section-label">Nos valeurs</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 700, letterSpacing: "-.5px" }}>Ce qui nous <span style={{ color: G, fontStyle: "italic" }}>définit</span></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {vals.map((v, i) => (
              <div key={i} className="card fade-up" style={{ padding: "28px 24px", animationDelay: `${i * .07}s` }}>
                <div style={{ width: 56, height: 56, borderRadius: 14, background: `${v.c}10`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 16, color: v.c }}>{v.s}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, fontFamily: "'Playfair Display',serif", marginBottom: 8 }}>{v.t}</h3>
                <p style={{ fontSize: 13, color: "#888", lineHeight: 1.6 }}>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section style={{ padding: "80px 40px", background: CR }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="section-label">L'équipe</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 700, letterSpacing: "-.5px" }}>Les experts <span style={{ color: G, fontStyle: "italic" }}>derrière ELR</span></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
            {team.map((m, i) => {
              const isAct = activeTeam === i;
              return (
                <div key={i} className="card" style={{ padding: "26px 20px", cursor: "pointer", textAlign: "center", borderColor: isAct ? G : "#eae7df", background: isAct ? `linear-gradient(135deg,${N}03,${G}05)` : "#fff", position: "relative", overflow: "hidden" }} onClick={() => setActiveTeam(i)}>
                  {isAct && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${m.c},${m.c}70)` }} />}
                  <div style={{ width: 60, height: 60, borderRadius: 14, background: `${m.c}15`, border: `2px solid ${isAct ? m.c : m.c + "30"}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", transition: "border-color .3s" }}>
                    <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, color: m.c }}>{m.i}</span>
                  </div>
                  <h4 style={{ fontSize: 15, fontWeight: 700, fontFamily: "'Playfair Display',serif", marginBottom: 4 }}>{m.n}</h4>
                  <p style={{ fontSize: 11, color: G, fontWeight: 500, marginBottom: 8 }}>{m.r}</p>
                  <div style={{ maxHeight: isAct ? 120 : 0, overflow: "hidden", transition: "max-height .35s ease" }}>
                    <p style={{ fontSize: 12, color: "#777", lineHeight: 1.5, marginBottom: 10 }}>{m.b}</p>
                    <div>{m.sp.map((s, j) => <span key={j} style={{ fontSize: 10, padding: "3px 9px", borderRadius: 20, background: `${m.c}10`, color: m.c, display: "inline-block", margin: "2px" }}>{s}</span>)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "72px 40px", background: `linear-gradient(135deg,${N},${NS})`, textAlign: "center" }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Prêt à nous faire confiance ?</h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,.45)", marginBottom: 28 }}>Premier diagnostic gratuit — contactez notre équipe.</p>
          <button className="btn-gold" onClick={() => go("contact")}>Contactez-nous</button>
        </div>
      </section>
      <Footer go={go} />
    </div>
  );
};

// ═══════════════════════════════════════════════════
//  PAGE: BLOG (aperçu)
// ═══════════════════════════════════════════════════
const PageBlog = ({ go }) => {
  const [filter, setFilter] = useState("all");
  const [reading, setReading] = useState(null);
  const cats = [{ id: "all", l: "Tous" }, { id: "ohada", l: "OHADA" }, { id: "entreprise", l: "Entreprise" }, { id: "fiscal", l: "Fiscalité" }, { id: "travail", l: "Travail" }];
  const arts = [
    { id: 1, cat: "ohada", feat: true, title: "Réforme OHADA 2026 : ce qui change", exc: "L'Acte uniforme révisé entre en vigueur. Les 5 changements majeurs pour votre entreprise.", auth: "Dr. Konan", date: "22 avril 2026", rt: "6 min", tags: ["OHADA", "Réforme"], content: "L'Organisation pour l'Harmonisation en Afrique du Droit des Affaires a adopté une révision majeure impactant directement la gouvernance et les obligations des sociétés opérant dans l'espace OHADA. Parmi les changements clés : réduction du capital social minimum pour les SARL, introduction de la SAS simplifiée, nouvelles obligations de registre des bénéficiaires effectifs, renforcement des droits des associés minoritaires, et digitalisation de certaines formalités." },
    { id: 2, cat: "entreprise", feat: false, title: "SARL ou SAS : quel statut choisir ?", exc: "Comparatif détaillé des deux formes juridiques les plus populaires en Côte d'Ivoire.", auth: "Mme N'Dri", date: "18 avril", rt: "8 min", tags: ["SARL", "SAS", "Guide"], content: "Le choix entre SARL et SAS est crucial lors de la création d'entreprise. La SARL offre un cadre bien encadré pour les PME familiales, tandis que la SAS offre une grande liberté statutaire pour les startups et projets nécessitant des investisseurs." },
    { id: 3, cat: "fiscal", feat: false, title: "Déclaration fiscale 2026 : les erreurs à éviter", exc: "La période de déclaration approche. Découvrez les pièges les plus courants.", auth: "M. Sanogo", date: "14 avril", rt: "5 min", tags: ["Fiscalité", "Déclaration"], content: "Les erreurs fréquentes lors des déclarations fiscales incluent : retard de dépôt, erreurs de calcul TVA, omission de charges déductibles, mauvaise classification des revenus, et absence de rapprochement bancaire." },
    { id: 4, cat: "travail", feat: false, title: "Licenciement en Côte d'Ivoire : droits et procédures", exc: "Tout ce que l'employeur et le salarié doivent savoir.", auth: "Maître Touré", date: "10 avril", rt: "7 min", tags: ["Travail", "Licenciement"], content: "Le droit du travail ivoirien encadre strictement les conditions de licenciement. La procédure doit être rigoureusement respectée sous peine de requalification en licenciement abusif. Les étapes clés incluent la convocation à l'entretien préalable, la notification écrite et motivée, le respect du préavis, et le calcul des indemnités." },
    { id: 5, cat: "entreprise", feat: false, title: "Checklist : 12 documents pour créer votre SARL", exc: "Liste complète des documents nécessaires à la constitution de votre SARL.", auth: "Mme N'Dri", date: "5 avril", rt: "4 min", tags: ["Checklist", "SARL"], content: "Pour créer une SARL, vous aurez besoin de : formulaire d'immatriculation, statuts signés (4 exemplaires), PV de nomination du gérant, attestation de dépôt des fonds, pièce d'identité du gérant, extrait de casier judiciaire, attestation de domiciliation, plan de localisation, publication JAL, et formulaire CNPS." },
  ];
  const filtered = filter === "all" ? arts : arts.filter(a => a.cat === filter);
  const feat = arts.find(a => a.feat);
  if (reading) {
    const art = arts.find(a => a.id === reading);
    return (
      <div>
        <div style={{ background: `linear-gradient(155deg,${N},${NS})`, padding: "110px 40px 52px" }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <button onClick={() => setReading(null)} style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", borderRadius: 8, padding: "8px 18px", cursor: "pointer", fontSize: 13, color: "rgba(255,255,255,.7)", fontFamily: "'DM Sans',sans-serif", marginBottom: 28, display: "flex", alignItems: "center", gap: 8 }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 4l-4 4 4 4" stroke="rgba(255,255,255,.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg> Retour au blog
            </button>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 36, fontWeight: 700, color: "#fff", margin: "0 0 16px", lineHeight: 1.2 }}>{art.title}</h1>
            <div style={{ display: "flex", gap: 14, fontSize: 12, color: "rgba(255,255,255,.4)" }}>
              <span>{art.auth}</span><span>·</span><span>{art.date}</span><span>·</span><span>{art.rt} de lecture</span>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 40px 80px" }}>
          <p style={{ fontSize: 16, lineHeight: 2, color: "#444" }}>{art.content}</p>
          <div style={{ marginTop: 28, display: "flex", gap: 6 }}>{art.tags.map((t, i) => <span key={i} className="tag">{t}</span>)}</div>
          <div style={{ marginTop: 36, padding: "24px", borderRadius: 14, background: `linear-gradient(135deg,${N}05,${G}08)`, border: `1px solid ${G}20`, textAlign: "center" }}>
            <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Ce sujet vous concerne ?</p>
            <button className="btn-gold" onClick={() => go("rdv")}>Prendre rendez-vous</button>
          </div>
        </div>
        <Footer go={go} />
      </div>
    );
  }
  return (
    <div style={{ background: CR }}>
      <section style={{ background: `linear-gradient(155deg,${N},${NS})`, padding: "120px 40px 64px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
          <div className="fade-up">
            <div className="gold-line" style={{ marginBottom: 18 }} />
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 40, fontWeight: 700, color: "#fff", margin: "0 0 12px", letterSpacing: "-1px" }}>Veille <span style={{ color: GL, fontStyle: "italic" }}>juridique</span></h1>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,.5)", lineHeight: 1.7 }}>Articles, analyses et guides pratiques sur le droit en Côte d'Ivoire et dans l'espace OHADA.</p>
          </div>
          <div className="fade-up" style={{ animationDelay: ".15s" }}>
            <div style={{ background: "rgba(255,255,255,.05)", border: `1px solid ${G}15`, borderRadius: 16, padding: "24px" }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: GL, marginBottom: 10 }}>Newsletter juridique</div>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,.5)", marginBottom: 14 }}>Recevez nos analyses chaque semaine.</p>
              <div style={{ display: "flex", gap: 8 }}>
                <input placeholder="votre@email.com" style={{ flex: 1, padding: "11px 14px", fontSize: 13, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 8, color: "#fff", outline: "none" }} />
                <button className="btn-gold" style={{ padding: "11px 20px", fontSize: 13 }}>S'abonner</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section style={{ padding: "0 40px", background: "#fff", borderBottom: "1px solid #eae7df" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 6, padding: "16px 0" }}>
          {cats.map(c => <button key={c.id} onClick={() => setFilter(c.id)} style={{ padding: "8px 18px", fontSize: 12, fontWeight: 500, borderRadius: 24, border: `1.5px solid ${filter === c.id ? N : "#eae7df"}`, background: filter === c.id ? N : "#fff", color: filter === c.id ? GL : "#888", cursor: "pointer", transition: "all .15s" }}>{c.l}</button>)}
        </div>
      </section>
      {filter === "all" && feat && (
        <section style={{ padding: "40px 40px 0" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div onClick={() => setReading(feat.id)} style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", borderRadius: 20, overflow: "hidden", cursor: "pointer", border: "1.5px solid #eae7df", transition: "all .25s" }}>
              <div style={{ background: `linear-gradient(135deg,${N},${NS})`, padding: "40px 36px" }}>
                <span style={{ fontSize: 10, fontWeight: 600, padding: "3px 12px", borderRadius: 20, background: `${G}20`, color: GL, display: "inline-block", marginBottom: 14 }}>À LA UNE</span>
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 700, color: "#fff", margin: "0 0 12px", lineHeight: 1.3 }}>{feat.title}</h2>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,.5)", lineHeight: 1.7, margin: "0 0 18px" }}>{feat.exc}</p>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,.4)" }}>{feat.auth} · {feat.date} · {feat.rt}</div>
              </div>
              <div style={{ background: `linear-gradient(135deg,${G}08,${G}15)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 36 }}>
                <div style={{ width: 72, height: 72, borderRadius: 16, background: `linear-gradient(135deg,${G},${GL})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 26, color: N, marginBottom: 16, boxShadow: `0 10px 30px ${G}30` }}>ELR</div>
                <div>{feat.tags.map((t, i) => <span key={i} className="tag">{t}</span>)}</div>
              </div>
            </div>
          </div>
        </section>
      )}
      <section style={{ padding: "32px 40px 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
          {filtered.filter(a => !a.feat || filter !== "all").map((a, i) => (
            <div key={a.id} className="card fade-up" style={{ cursor: "pointer", animationDelay: `${i * .06}s`, overflow: "hidden" }} onClick={() => setReading(a.id)}>
              <div style={{ padding: "22px 22px 0" }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 12, alignItems: "center" }}>
                  <span style={{ fontSize: 10, fontWeight: 600, padding: "3px 12px", borderRadius: 16, background: `${G}12`, color: G }}>{cats.find(c => c.id === a.cat)?.l}</span>
                  <span style={{ fontSize: 11, color: "#bbb" }}>{a.rt}</span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Playfair Display',serif", marginBottom: 8, lineHeight: 1.35 }}>{a.title}</h3>
                <p style={{ fontSize: 13, color: "#888", lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{a.exc}</p>
              </div>
              <div style={{ padding: "12px 22px", borderTop: "1px solid #eae7df", marginTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: "#999" }}>
                <span>{a.auth}</span><span>{a.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer go={go} />
    </div>
  );
};

// ═══════════════════════════════════════════════════
//  PAGE: CONTACT
// ═══════════════════════════════════════════════════
const PageContact = ({ go }) => {
  const [sent, setSent] = useState(false);
  const [faq, setFaq] = useState(null);
  const coords = [
    { icon: "📍", l: "Adresse", v: "Plateau, Abidjan", s: "Côte d'Ivoire — sur rendez-vous" },
    { icon: "📞", l: "Téléphone", v: "+225 07 07 07 07 07", s: "Lun – Ven, 8h – 18h" },
    { icon: "✉️", l: "Email", v: "contact@lexa-rok.com", s: "Réponse sous 24h" },
    { icon: "💬", l: "WhatsApp", v: "+225 07 07 07 07 07", s: "Réponse rapide" },
  ];
  const faqs = [
    { q: "Le premier échange est-il gratuit ?", a: "Oui. Le premier appel de 15 minutes est offert et sans engagement pour comprendre votre besoin." },
    { q: "Comment se déroule une consultation en ligne ?", a: "Après prise de RDV, vous recevez un lien Google Meet ou Zoom. Durée moyenne : 45 min à 1h30." },
    { q: "Quels sont vos moyens de paiement ?", a: "Virements bancaires, mobile money (Orange, MTN, Wave) et espèces au cabinet." },
    { q: "Travaillez-vous avec des clients hors de Côte d'Ivoire ?", a: "Oui, nous accompagnons toute la zone OHADA grâce à nos consultations en visioconférence." },
  ];
  return (
    <div>
      <section style={{ background: `linear-gradient(155deg,${N},${NS})`, padding: "120px 40px 72px", textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <div className="gold-line" style={{ margin: "0 auto 18px" }} />
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 42, fontWeight: 700, color: "#fff", margin: "0 0 12px", letterSpacing: "-1px" }}>Parlons de <span style={{ color: GL, fontStyle: "italic" }}>votre projet</span></h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,.5)", lineHeight: 1.7 }}>Premier diagnostic gratuit — prenez rendez-vous ou écrivez-nous.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 28 }}>
            <button style={{ padding: "12px 24px", fontSize: 13, fontWeight: 600, background: "linear-gradient(135deg,#25d366,#20bd5a)", color: "#fff", border: "none", borderRadius: 10, cursor: "pointer" }}>💬 WhatsApp</button>
            <button className="btn-outline" style={{ fontSize: 13, padding: "12px 24px" }}>📞 Appeler</button>
            <button className="btn-outline" style={{ fontSize: 13, padding: "12px 24px" }}>✉️ Email</button>
          </div>
        </div>
      </section>
      <section style={{ padding: "56px 40px 80px", background: CR }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 32 }}>
          <div>
            <div style={{ display: "grid", gap: 12, marginBottom: 20 }}>
              {coords.map((c, i) => (
                <div key={i} className="card" style={{ padding: "18px 20px", display: "flex", gap: 14, alignItems: "center" }}>
                  <div style={{ width: 46, height: 46, borderRadius: 12, background: `${G}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{c.icon}</div>
                  <div><div style={{ fontSize: 10, color: "#aaa", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600, marginBottom: 2 }}>{c.l}</div><div style={{ fontSize: 14, fontWeight: 600 }}>{c.v}</div><div style={{ fontSize: 11, color: "#999" }}>{c.s}</div></div>
                </div>
              ))}
            </div>
            <div style={{ padding: "22px 24px", borderRadius: 16, background: `linear-gradient(135deg,${N},${NS})`, color: "#fff" }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: GL, marginBottom: 14 }}>Horaires</div>
              {[["Lun – Ven", "08:00 – 18:00"], ["Samedi", "09:00 – 13:00"], ["Dimanche", "Fermé"]].map(([d, h], i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,.08)" : "none", fontSize: 13 }}>
                  <span style={{ color: "rgba(255,255,255,.6)" }}>{d}</span><span style={{ fontWeight: 500 }}>{h}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: "#fff", borderRadius: 18, border: "1.5px solid #eae7df", padding: "32px 28px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg,${G},${GL})` }} />
            {!sent ? <>
              <h3 style={{ fontSize: 20, fontWeight: 700, fontFamily: "'Playfair Display',serif", marginBottom: 4 }}>Demander un rendez-vous</h3>
              <p style={{ fontSize: 13, color: "#999", marginBottom: 24 }}>Remplissez le formulaire — réponse sous 24h.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[["Nom complet", "text", "Votre nom"], ["Email", "email", "votre@email.com"], ["Téléphone", "tel", "+225 XX XX XX"], ["Service", "select", ""]].map(([l, t, p], i) => (
                  <div key={i} className="form-field" style={{ marginBottom: 14 }}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 500, marginBottom: 6 }}>{l}</label>
                    {t === "select" ? (
                      <select className="input-field">
                        <option>Consultation juridique</option>
                        <option>Création d'entreprise</option>
                        <option>Rédaction de contrats</option>
                        <option>Formalités juridiques</option>
                        <option>Contentieux & litiges</option>
                      </select>
                    ) : <input type={t} placeholder={p} className="input-field" />}
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 500, marginBottom: 6 }}>Message</label>
                <textarea className="input-field" rows={3} placeholder="Décrivez brièvement votre besoin..." style={{ resize: "vertical" }} />
              </div>
              <button onClick={() => setSent(true)} className="btn-gold" style={{ width: "100%", justifyContent: "center" }}>
                Envoyer ma demande <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke={N} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </> : (
              <div style={{ textAlign: "center", padding: "40px 0", animation: "scaleIn .4s ease both" }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,#22c55e18,#16a34a10)", border: "2px solid #22c55e35", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M8 16l6 6 10-12" stroke="#22c55e" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, fontFamily: "'Playfair Display',serif", marginBottom: 8 }}>Message envoyé !</h3>
                <p style={{ fontSize: 14, color: "#888" }}>Nous vous recontactons sous 24h.</p>
                <button onClick={() => setSent(false)} className="btn-navy" style={{ marginTop: 20 }}>Nouveau message</button>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* FAQ */}
      <section style={{ padding: "72px 40px", background: "#fff" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span className="section-label">FAQ</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, fontWeight: 700, letterSpacing: "-.5px" }}>Questions <span style={{ color: G, fontStyle: "italic" }}>fréquentes</span></h2>
          </div>
          {faqs.map((f, i) => (
            <div key={i} style={{ border: `1.5px solid ${faq === i ? G + "40" : "#eae7df"}`, borderRadius: 14, marginBottom: 10, overflow: "hidden" }}>
              <div onClick={() => setFaq(faq === i ? null : i)} style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", gap: 14 }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{f.q}</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: faq === i ? "rotate(180deg)" : "none", transition: "transform .25s", flexShrink: 0 }}>
                  <path d="M2.5 4.5l3.5 3 3.5-3" stroke={faq === i ? G : "#999"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div style={{ maxHeight: faq === i ? 120 : 0, overflow: "hidden", transition: "max-height .3s ease" }}>
                <p style={{ padding: "0 20px 16px", fontSize: 13, color: "#777", lineHeight: 1.7 }}>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer go={go} />
    </div>
  );
};

// ═══════════════════════════════════════════════════
//  PAGE: RENDEZ-VOUS
// ═══════════════════════════════════════════════════
const PageRDV = ({ go }) => {
  const [step, setStep] = useState(1);
  const [sel, setSel] = useState({ service: null, format: null, date: null, slot: null });
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [confirmed, setConfirmed] = useState(false);
  const svcs = [
    { id: "c", icon: "⚖️", t: "Consultation juridique", p: "25 000 FCFA", d: "60 min" },
    { id: "e", icon: "🏢", t: "Création d'entreprise", p: "Sur devis", d: "90 min" },
    { id: "r", icon: "📝", t: "Rédaction de contrat", p: "50 000 FCFA", d: "60 min" },
    { id: "f", icon: "📋", t: "Formalités juridiques", p: "30 000 FCFA", d: "45 min" },
    { id: "ct", icon: "🛡️", t: "Contentieux & litiges", p: "Devis personnalisé", d: "90 min" },
    { id: "fs", icon: "💰", t: "Conseil fiscal", p: "35 000 FCFA", d: "60 min" },
  ];
  const fmts = [{ id: "cab", icon: "🏛️", l: "Au cabinet", s: "Plateau, Abidjan" }, { id: "vis", icon: "💻", l: "Visioconférence", s: "Google Meet / Zoom" }, { id: "tel", icon: "📞", l: "Téléphone", s: "Nous vous appelons" }];
  const dates = ["28 avril", "29 avril", "30 avril", "2 mai", "3 mai", "5 mai"];
  const slots = ["08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "14:00", "14:30", "15:00", "15:30", "16:00"];
  const canNext = () => (step === 1 ? sel.service && sel.format : step === 2 ? sel.date && sel.slot : form.name && form.email);
  const selSvc = svcs.find(s => s.id === sel.service);
  const selFmt = fmts.find(f => f.id === sel.format);
  return (
    <div style={{ background: CR, minHeight: "100vh" }}>
      <section style={{ background: `linear-gradient(155deg,${N},${NS})`, padding: "120px 40px 60px", textAlign: "center" }}>
        <div className="gold-line" style={{ margin: "0 auto 18px" }} />
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 40, fontWeight: 700, color: "#fff", margin: "0 0 12px", letterSpacing: "-1px" }}>Prendre <span style={{ color: GL, fontStyle: "italic" }}>rendez-vous</span></h1>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,.5)" }}>Choisissez votre service et votre créneau en 3 étapes simples.</p>
      </section>
      <section style={{ padding: "40px 40px 80px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          {/* Stepper */}
          {!confirmed && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 36 }}>
              {[1, 2, 3].map(s => (
                <div key={s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: step >= s ? `linear-gradient(135deg,${G},${GL})` : "#fff", border: step >= s ? "none" : "2px solid #ddd", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: step >= s ? N : "#bbb", transition: "all .3s", boxShadow: step === s ? `0 4px 14px ${G}30` : "none" }}>{s}</div>
                  <span style={{ fontSize: 12, fontWeight: step === s ? 600 : 400, color: step >= s ? N : "#bbb" }}>{s === 1 ? "Service" : s === 2 ? "Créneau" : "Confirmation"}</span>
                  {s < 3 && <div style={{ width: 32, height: 2, background: step > s ? G : "#ddd", borderRadius: 1 }} />}
                </div>
              ))}
            </div>
          )}

          {step === 1 && !confirmed && (
            <div className="fade-up">
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, marginBottom: 18, textAlign: "center" }}>Quel service vous intéresse ?</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
                {svcs.map(s => (
                  <div key={s.id} onClick={() => setSel({ ...sel, service: s.id })} style={{ background: "#fff", border: `1.5px solid ${sel.service === s.id ? G : "#eae7df"}`, borderRadius: 14, padding: "16px 18px", cursor: "pointer", display: "flex", gap: 14, alignItems: "center", transition: "all .2s" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: sel.service === s.id ? `linear-gradient(135deg,${N},${NS})` : `${G}10`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0, transition: "all .2s" }}>{s.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{s.t}</div>
                      <div style={{ fontSize: 11, color: G, fontWeight: 600 }}>{s.p} · {s.d}</div>
                    </div>
                    {sel.service === s.id && <div style={{ width: 20, height: 20, borderRadius: "50%", background: G, display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2.5 6l2.5 2.5 4.5-5" stroke={N} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></div>}
                  </div>
                ))}
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 14, textAlign: "center" }}>Format de consultation</h3>
              <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                {fmts.map(f => (
                  <div key={f.id} onClick={() => setSel({ ...sel, format: f.id })} style={{ flex: 1, background: "#fff", border: `1.5px solid ${sel.format === f.id ? G : "#eae7df"}`, borderRadius: 12, padding: "16px", textAlign: "center", cursor: "pointer", transition: "all .2s" }}>
                    <div style={{ fontSize: 26, marginBottom: 8 }}>{f.icon}</div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{f.l}</div>
                    <div style={{ fontSize: 11, color: "#999" }}>{f.s}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && !confirmed && (
            <div className="fade-up">
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, marginBottom: 20, textAlign: "center" }}>Choisissez votre créneau</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #eae7df", padding: "22px" }}>
                  <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 14 }}>Dates disponibles</h4>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {dates.map(d => (
                      <button key={d} onClick={() => setSel({ ...sel, date: d })} style={{ padding: "12px 8px", borderRadius: 10, fontSize: 13, fontWeight: 500, border: `1.5px solid ${sel.date === d ? G : "#eae7df"}`, background: sel.date === d ? `linear-gradient(135deg,${G},${GL})` : "#fff", color: sel.date === d ? N : N, cursor: "pointer", transition: "all .15s" }}>{d}</button>
                    ))}
                  </div>
                </div>
                <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #eae7df", padding: "22px" }}>
                  <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 14 }}>Horaires {sel.date ? `— ${sel.date}` : ""}</h4>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6 }}>
                    {slots.map(s => (
                      <button key={s} onClick={() => setSel({ ...sel, slot: s })} style={{ padding: "9px 0", borderRadius: 8, fontSize: 12, fontWeight: 500, border: `1.5px solid ${sel.slot === s ? G : "#eae7df"}`, background: sel.slot === s ? `linear-gradient(135deg,${G},${GL})` : "#fff", color: sel.slot === s ? N : N, cursor: "pointer", transition: "all .15s", textAlign: "center" }}>{s}</button>
                    ))}
                  </div>
                </div>
              </div>
              {sel.date && sel.slot && (
                <div className="fade-up" style={{ marginTop: 16, padding: "14px 18px", borderRadius: 12, background: `linear-gradient(135deg,${N}06,${G}08)`, border: `1px solid ${G}20` }}>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>📌 {sel.slot} le {sel.date} — {selSvc?.t} · {selFmt?.l}</span>
                </div>
              )}
            </div>
          )}

          {step === 3 && !confirmed && (
            <div className="fade-up" style={{ maxWidth: 540, margin: "0 auto" }}>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, marginBottom: 20, textAlign: "center" }}>Confirmez votre rendez-vous</h2>
              <div style={{ padding: "20px 24px", borderRadius: 14, background: `linear-gradient(135deg,${N},${NS})`, color: "#fff", marginBottom: 24 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                  {[["Service", selSvc?.t], ["Date", `${sel.date} à ${sel.slot}`], ["Format", selFmt?.l]].map(([l, v], i) => (
                    <div key={i}><div style={{ fontSize: 10, color: GL, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 4 }}>{l}</div><div style={{ fontSize: 13, fontWeight: 600 }}>{v}</div></div>
                  ))}
                </div>
              </div>
              {[["Nom complet *", "text", "Votre nom"], ["Email *", "email", "votre@email.com"], ["Téléphone", "tel", "+225 XX XX XX"]].map(([l, t, p]) => (
                <div key={l} style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 500, marginBottom: 6 }}>{l}</label>
                  <input type={t} placeholder={p} className="input-field" onChange={e => setForm({ ...form, [l.includes("Nom") ? "name" : l.includes("Email") ? "email" : "phone"]: e.target.value })} />
                </div>
              ))}
            </div>
          )}

          {confirmed && (
            <div style={{ textAlign: "center", padding: "48px 20px", animation: "scaleIn .5s ease both", maxWidth: 480, margin: "0 auto" }}>
              <div style={{ width: 84, height: 84, borderRadius: "50%", background: "linear-gradient(135deg,#22c55e15,#16a34a10)", border: "2.5px solid #22c55e30", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <svg width="38" height="38" viewBox="0 0 40 40" fill="none"><path d="M10 20l7 7 13-15" stroke="#22c55e" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, marginBottom: 8 }}>Rendez-vous confirmé !</h2>
              <p style={{ fontSize: 14, color: "#888", marginBottom: 28 }}>Un email de confirmation vous sera envoyé sous peu.</p>
              <div style={{ background: "#fff", border: "1.5px solid #eae7df", borderRadius: 14, padding: "20px 24px", textAlign: "left", marginBottom: 24 }}>
                {[["Service", selSvc?.t], ["Date", `${sel.date} à ${sel.slot}`], ["Format", selFmt?.l], ["Client", form.name || "—"]].map(([l, v], i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: i < 3 ? "1px solid #f5f3ee" : "none", fontSize: 13 }}>
                    <span style={{ color: "#999" }}>{l}</span><span style={{ fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
              </div>
              <button className="btn-gold" onClick={() => { setConfirmed(false); setStep(1); setSel({ service: null, format: null, date: null, slot: null }); setForm({ name: "", email: "", phone: "" }); }}>Nouveau rendez-vous</button>
            </div>
          )}

          {!confirmed && (
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32, maxWidth: 540, margin: "32px auto 0" }}>
              {step > 1 ? <button onClick={() => setStep(s => s - 1)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "12px 22px", fontSize: 13, fontWeight: 500, background: "#fff", color: N, border: "1.5px solid #ddd", borderRadius: 10 }}>
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M10 4l-4 4 4 4" stroke={N} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg> Retour
              </button> : <div />}
              <button onClick={() => { if (step < 3) setStep(s => s + 1); else setConfirmed(true); }} disabled={!canNext()} style={{ padding: "12px 26px", fontSize: 14, fontWeight: 600, background: canNext() ? `linear-gradient(135deg,${G},${GL})` : "#ddd", color: canNext() ? N : "#999", border: "none", borderRadius: 10, cursor: canNext() ? "pointer" : "not-allowed", display: "flex", alignItems: "center", gap: 8, boxShadow: canNext() ? `0 4px 14px ${G}30` : "none" }}>
                {step < 3 ? "Continuer" : "Confirmer"} {step < 3 && <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke={N} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
              </button>
            </div>
          )}
        </div>
      </section>
      <Footer go={go} />
    </div>
  );
};

// ═══════════════════════════════════════════════════
//  PAGE: CONNEXION
// ═══════════════════════════════════════════════════
const PageConnexion = ({ go, setUser }) => {
  const [roleStep, setRoleStep] = useState(true);
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const roles = [
    { id: "admin", l: "Administrateur", icon: "🛡️", d: "Accès complet", dest: "dashboard" },
    { id: "juriste", l: "Responsable juridique", icon: "⚖️", d: "Dossiers & formulaires", dest: "portail" },
    { id: "comptable", l: "Comptable", icon: "📊", d: "Sheets financiers", dest: "portail" },
    { id: "personnel", l: "Personnel", icon: "👤", d: "Portail interne", dest: "portail" },
    { id: "client", l: "Client", icon: "🔑", d: "Suivi de votre dossier", dest: "portail" },
  ];
  const login = () => {
    if (!email || !pwd) return;
    setLoading(true);
    setTimeout(() => { setUser({ name: email.split("@")[0], role: role.id }); go(role.dest); }, 1400);
  };
  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(155deg,${N},${NS})`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <div style={{ width: 60, height: 60, borderRadius: 14, background: `linear-gradient(135deg,${G},${GL})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 22, color: N, margin: "0 auto 14px", boxShadow: `0 8px 28px ${G}30` }}>ELR</div>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, color: "#fff", margin: "0 0 4px" }}>LEXA-ROK</h1>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,.4)" }}>Portail sécurisé</p>
      </div>
      <div style={{ width: "100%", maxWidth: 420, background: CR, borderRadius: 20, border: "1px solid #e8e6e0", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,.2)" }}>
        {roleStep ? (
          <div style={{ padding: "28px 26px" }} className="fade-up">
            <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Bienvenue</h2>
            <p style={{ fontSize: 13, color: "#999", marginBottom: 20 }}>Sélectionnez votre profil d'accès</p>
            {roles.map((r, i) => (
              <div key={r.id} onClick={() => { setRole(r); setRoleStep(false); }} className="fade-up" style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 12, background: "#fff", border: "1.5px solid #eae7df", cursor: "pointer", marginBottom: 8, transition: "all .2s", animationDelay: `${i * .05}s` }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = G; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "#eae7df"; }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: `${G}10`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{r.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{r.l}</div>
                  <div style={{ fontSize: 11, color: "#aaa" }}>{r.d}</div>
                </div>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ opacity: .3 }}><path d="M6 4l4 4-4 4" stroke={N} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            ))}
          </div>
        ) : role && (
          <div className="fade-up">
            <div style={{ padding: "16px 24px", background: `linear-gradient(135deg,${N},${NS})`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ fontSize: 18 }}>{role.icon}</span>
                <div><div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{role.l}</div><div style={{ fontSize: 10, color: "rgba(255,255,255,.5)" }}>{role.d}</div></div>
              </div>
              <button onClick={() => { setRoleStep(true); setRole(null); }} style={{ padding: "5px 12px", fontSize: 11, background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.15)", borderRadius: 6, color: "#fff", cursor: "pointer" }}>Changer</button>
            </div>
            <div style={{ padding: "24px 26px" }}>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", color: G, marginBottom: 6 }}>Email</label>
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="votre@email.com" className="input-field" />
              </div>
              <div style={{ marginBottom: 20, position: "relative" }}>
                <label style={{ display: "block", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", color: G, marginBottom: 6 }}>Mot de passe</label>
                <input value={pwd} onChange={e => setPwd(e.target.value)} type={showPwd ? "text" : "password"} placeholder="••••••••" className="input-field" style={{ paddingRight: 60 }} />
                <button onClick={() => setShowPwd(!showPwd)} style={{ position: "absolute", right: 14, bottom: 12, background: "none", border: "none", fontSize: 12, color: "#aaa", cursor: "pointer" }}>{showPwd ? "Cacher" : "Voir"}</button>
              </div>
              <button onClick={login} disabled={!email || !pwd || loading} style={{ width: "100%", padding: "14px", fontSize: 14, fontWeight: 600, background: email && pwd ? `linear-gradient(135deg,${N},${NS})` : "#ddd", color: email && pwd ? "#fff" : "#999", border: "none", borderRadius: 10, cursor: email && pwd ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                {loading ? <><span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin .7s linear infinite", display: "inline-block" }} /> Connexion...</> : "Se connecter"}
              </button>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 16 }}>
                {["🔒 Chiffré", "🛡️ Par rôle", "📱 Sécurisé"].map((s, i) => <span key={i} style={{ fontSize: 11, color: "#bbb" }}>{s}</span>)}
              </div>
            </div>
          </div>
        )}
      </div>
      <button onClick={() => go("accueil")} style={{ marginTop: 20, fontSize: 12, color: "rgba(255,255,255,.35)", background: "none", border: "none", cursor: "pointer" }}>← Retour au site</button>
    </div>
  );
};

// ═══════════════════════════════════════════════════
//  PAGE: DASHBOARD ADMIN
// ═══════════════════════════════════════════════════
const PageDashboard = ({ go, user }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const kpis = [{ l: "Clients actifs", v: "47", delta: "+5", up: true, icon: "👤" }, { l: "RDV cette semaine", v: "12", delta: "+3", up: true, icon: "📅" }, { l: "Dossiers en cours", v: "23", delta: "-2", up: false, icon: "📂" }, { l: "Revenus du mois", v: "1.2M FCFA", delta: "+18%", up: true, icon: "💰" }];
  const clients = [
    { n: "Aminata Koné", t: "Création SARL", st: "En cours", d: "24 avr.", i: "AK" },
    { n: "Jean-Marc Bédié", t: "Consultation", st: "Terminé", d: "23 avr.", i: "JB" },
    { n: "Fatou Diallo", t: "Formalités", st: "En attente", d: "22 avr.", i: "FD" },
    { n: "Kouassi Yao", t: "Contrat", st: "En cours", d: "21 avr.", i: "KY" },
  ];
  const rdvs = [{ t: "09:00", c: "Aminata Koné", s: "Suivi SARL", d: "45 min" }, { t: "10:30", c: "Ibrahim Touré", s: "Première consultation", d: "1h" }, { t: "14:00", c: "Fatou Diallo", s: "Signature documents", d: "30 min" }];
  const stColor = { "En cours": ["#e8f4ed", "#16a34a"], "Terminé": ["#e8eef4", "#2563eb"], "En attente": ["#fef3e2", "#d97706"] };
  return (
    <div style={{ background: CR, minHeight: "100vh" }}>
      {/* Dashboard header */}
      <div style={{ background: `linear-gradient(135deg,${N},${NS})`, padding: "24px 36px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Logo size="sm" onClick={() => go("accueil")} />
            <div style={{ width: 1, height: 24, background: "rgba(255,255,255,.15)", margin: "0 4px" }} />
            <div><div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>Tableau de bord</div><div style={{ fontSize: 11, color: "rgba(255,255,255,.4)" }}>Administrateur</div></div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => go("portail")} style={{ padding: "8px 16px", fontSize: 12, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 8, color: "rgba(255,255,255,.6)", cursor: "pointer" }}>Espace client</button>
            <button onClick={() => go("accueil")} style={{ padding: "8px 16px", fontSize: 12, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 8, color: "rgba(255,255,255,.6)", cursor: "pointer" }}>← Site public</button>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div style={{ background: "#fff", borderBottom: "1px solid #eae7df", padding: "0 36px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex" }}>
          {[["overview", "Vue d'ensemble"], ["clients", "Clients récents"], ["rdv", "Agenda"]].map(([id, l]) => (
            <button key={id} onClick={() => setActiveTab(id)} style={{ padding: "14px 20px", fontSize: 13, fontWeight: activeTab === id ? 600 : 400, color: activeTab === id ? N : "#888", background: "none", border: "none", borderBottom: `2.5px solid ${activeTab === id ? G : "transparent"}`, cursor: "pointer" }}>{l}</button>
          ))}
        </div>
      </div>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 36px" }}>
        {/* KPIs always visible */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 28 }}>
          {kpis.map((k, i) => (
            <div key={i} className="card fade-up" style={{ padding: "20px 18px", position: "relative", overflow: "hidden", animationDelay: `${i * .07}s` }}>
              <div style={{ position: "absolute", top: 14, right: 14, fontSize: 24, opacity: .1 }}>{k.icon}</div>
              <p style={{ fontSize: 10, color: "#999", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".5px", marginBottom: 8 }}>{k.l}</p>
              <div style={{ fontSize: 28, fontWeight: 700, color: N, letterSpacing: "-1px" }}>{k.v}</div>
              <span style={{ fontSize: 11, fontWeight: 600, color: k.up ? "#16a34a" : "#dc2626" }}>{k.up ? "↑" : "↓"} {k.delta}</span>
            </div>
          ))}
        </div>
        {activeTab === "overview" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #eae7df", padding: "22px 24px" }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 18 }}>Statut des dossiers</h3>
              {[{ l: "Nouveaux", v: 5, c: "#8b5cf6" }, { l: "En cours", v: 14, c: "#22c55e" }, { l: "En attente", v: 4, c: "#f59e0b" }, { l: "Terminés", v: 24, c: "#3b82f6" }].map((d, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: i < 3 ? "1px solid #f5f3ee" : "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}><div style={{ width: 8, height: 8, borderRadius: "50%", background: d.c }} /><span style={{ fontSize: 13, color: "#555" }}>{d.l}</span></div>
                  <span style={{ fontSize: 16, fontWeight: 700, color: N }}>{d.v}</span>
                </div>
              ))}
            </div>
            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #eae7df", padding: "22px 24px" }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Actions rapides</h3>
              {[["➕", "Nouveau client", "Ajouter une fiche"], ["📅", "Planifier un RDV", "Via Calendly / Tally"], ["📝", "Nouveau dossier", "Ouvrir un dossier juridique"], ["✉️", "Newsletter", "Rédiger un bulletin"], ["📊", "Exporter", "Télécharger les rapports"]].map(([icon, l, d], i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 10, background: CR, border: "1px solid #eae7df", marginBottom: 8, cursor: "pointer", transition: "all .15s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = G; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "#eae7df"; }}>
                  <div style={{ width: 34, height: 34, borderRadius: 8, background: "#fff", border: "1px solid #eae7df", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>{icon}</div>
                  <div><div style={{ fontSize: 13, fontWeight: 500 }}>{l}</div><div style={{ fontSize: 11, color: "#999" }}>{d}</div></div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === "clients" && (
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #eae7df", padding: "22px 24px" }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 18 }}>Clients récents</h3>
            {clients.map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: i < clients.length - 1 ? "1px solid #f5f3ee" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg,${N},${NS})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 600 }}>{c.i}</div>
                  <div><div style={{ fontSize: 14, fontWeight: 500 }}>{c.n}</div><div style={{ fontSize: 12, color: "#999" }}>{c.t}</div></div>
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span className="status-badge" style={{ background: stColor[c.st]?.[0] || "#f5f3ee", color: stColor[c.st]?.[1] || "#666" }}>{c.st}</span>
                  <span style={{ fontSize: 12, color: "#bbb" }}>{c.d}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === "rdv" && (
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #eae7df", padding: "22px 24px" }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 18 }}>Agenda du jour</h3>
            <div style={{ position: "relative", paddingLeft: 24 }}>
              <div style={{ position: "absolute", left: 7, top: 8, bottom: 8, width: 2, background: `linear-gradient(to bottom,${G},${G}20)`, borderRadius: 1 }} />
              {rdvs.map((r, i) => (
                <div key={i} style={{ position: "relative", marginBottom: i < rdvs.length - 1 ? 16 : 0 }}>
                  <div style={{ position: "absolute", left: -20, top: 10, width: 12, height: 12, borderRadius: "50%", background: i === 0 ? G : "#fff", border: `2px solid ${i === 0 ? G : "#ccc"}` }} />
                  <div style={{ padding: "14px 16px", borderRadius: 10, background: i === 0 ? `${N}06` : CR, border: `1px solid ${i === 0 ? G + "30" : "#eae7df"}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div><span style={{ fontSize: 16, fontWeight: 600 }}>{r.t}</span><span style={{ fontSize: 13, color: "#666", marginLeft: 10 }}>{r.c}</span></div>
                      <span style={{ fontSize: 11, color: "#aaa", background: "#fff", padding: "2px 10px", borderRadius: 20, border: "1px solid #eae7df" }}>{r.d}</span>
                    </div>
                    <p style={{ fontSize: 12, color: "#888", marginTop: 4 }}>{r.s}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════
//  PAGE: PORTAIL CLIENT
// ═══════════════════════════════════════════════════
const PagePortail = ({ go, user }) => {
  const [tab, setTab] = useState("dossiers");
  const [open, setOpen] = useState(null);
  const dossiers = [
    { id: "d1", ref: "ELR-2026-042", title: "Création SARL AK Distribution", st: "en_cours", cat: "Création d'entreprise", expert: "Mme N'Dri", updated: "24 avril 2026", prog: 50 },
    { id: "d2", ref: "ELR-2026-038", title: "Révision contrat de bail commercial", st: "termine", cat: "Rédaction de contrats", expert: "Dr. Konan", updated: "10 mars 2026", prog: 100 },
    { id: "d3", ref: "ELR-2025-019", title: "Consultation droit du travail", st: "archive", cat: "Consultation juridique", expert: "Maître Touré", updated: "12 sept. 2025", prog: 100 },
  ];
  const steps = ["Consultation initiale ✅", "Rédaction des statuts ✅", "Dépôt du capital ✅", "Publication JAL ✅", "Dépôt au greffe ⏳", "Obtention RCCM —", "Déclaration DFE —", "Remise du kit —"];
  const docs = [{ n: "Statuts SARL — v2.pdf", d: "22 mars 2026", s: "245 Ko" }, { n: "Attestation de dépôt.pdf", d: "28 mars 2026", s: "120 Ko" }, { n: "Annonce légale JAL.pdf", d: "5 avril 2026", s: "89 Ko" }];
  const ST = { en_cours: ["#e8f4ed", "#16a34a", "En cours ⚙️"], termine: ["#e8eef4", "#2563eb", "Terminé ✅"], archive: ["#f1f0ec", "#888", "Archivé 📦"] };
  return (
    <div style={{ background: CR, minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg,${N},${NS})`, padding: "16px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Logo size="sm" onClick={() => go("accueil")} />
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button onClick={() => go("rdv")} style={{ padding: "8px 16px", fontSize: 12, background: `${G}20`, color: GL, border: `1px solid ${G}30`, borderRadius: 8, cursor: "pointer" }}>+ Rendez-vous</button>
          <button onClick={() => go("accueil")} style={{ padding: "8px 16px", fontSize: 12, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 8, color: "rgba(255,255,255,.6)", cursor: "pointer" }}>← Site</button>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 6 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: `${G}25`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: GL }}>AK</div>
            <span style={{ fontSize: 12, fontWeight: 500, color: "#fff" }}>Aminata Koné</span>
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", minHeight: "calc(100vh - 66px)" }}>
        {/* Sidebar */}
        <aside style={{ background: "#fff", borderRight: "1px solid #eae7df", padding: "20px 0" }}>
          {[["dossiers", "📂", "Mes dossiers", dossiers.length], ["docs", "📄", "Documents"], ["rdvs", "📅", "Rendez-vous", 1], ["profil", "👤", "Mon profil"]].map(([id, icon, l, count]) => (
            <button key={id} onClick={() => { setTab(id); setOpen(null); }} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 16px", fontSize: 13, fontWeight: tab === id && !open ? 600 : 400, color: tab === id && !open ? N : "#888", background: tab === id && !open ? `${G}08` : "none", borderLeft: `3px solid ${tab === id && !open ? G : "transparent"}`, border: "none", borderRight: "none", borderTop: "none", borderBottom: "none", cursor: "pointer", textAlign: "left" }}>
              <span style={{ fontSize: 16 }}>{icon}</span>{l}
              {count && <span style={{ marginLeft: "auto", fontSize: 10, padding: "2px 7px", borderRadius: 10, background: CR, color: "#888" }}>{count}</span>}
            </button>
          ))}
        </aside>
        {/* Main */}
        <main style={{ padding: "28px 32px" }}>
          {tab === "dossiers" && !open && (
            <div className="fade-up">
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, marginBottom: 22 }}>Mes dossiers</h2>
              {dossiers.map((d, i) => (
                <div key={d.id} className="card fade-up" style={{ padding: "20px 22px", marginBottom: 12, cursor: "pointer", animationDelay: `${i * .06}s` }} onClick={() => setOpen(d.id)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <div>
                      <div style={{ display: "flex", gap: 8, marginBottom: 5 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: G, fontFamily: "monospace" }}>{d.ref}</span>
                        <span className="status-badge" style={{ background: ST[d.st][0], color: ST[d.st][1] }}>{ST[d.st][2]}</span>
                      </div>
                      <h3 style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Playfair Display',serif" }}>{d.title}</h3>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 12, color: "#999" }}>
                    <span>📁 {d.cat}</span><span>👤 {d.expert}</span><span>🗓 {d.updated}</span>
                    <div style={{ flex: 1 }} />
                    <div style={{ display: "flex", gap: 8, alignItems: "center", minWidth: 110 }}>
                      <div style={{ flex: 1, height: 4, background: "#eae7df", borderRadius: 2, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${d.prog}%`, background: `linear-gradient(90deg,${G},${GL})`, borderRadius: 2 }} />
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 600 }}>{d.prog}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {tab === "dossiers" && open && (
            <div className="slide-in">
              <button onClick={() => setOpen(null)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#888", marginBottom: 16 }}>
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M10 4l-4 4 4 4" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg> Retour
              </button>
              <div style={{ padding: "22px 26px", borderRadius: 16, background: `linear-gradient(135deg,${N},${NS})`, color: "#fff", marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: GL, fontFamily: "monospace", marginBottom: 6 }}>ELR-2026-042</div>
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Création SARL AK Distribution</h2>
                <div style={{ display: "flex", gap: 16, fontSize: 12, color: "rgba(255,255,255,.5)" }}><span>Expert : Mme N'Dri</span><span>Ouvert le 15 mars 2026</span></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #eae7df", padding: "22px" }}>
                  <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Étapes du dossier</h4>
                  {steps.map((s, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < steps.length - 1 ? "1px solid #f5f3ee" : "none", fontSize: 13, color: s.includes("✅") ? N : s.includes("⏳") ? "#d97706" : "#bbb" }}>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", background: s.includes("✅") ? G : s.includes("⏳") ? "#fef3e2" : "#f5f3ee", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, flexShrink: 0 }}>{s.includes("✅") ? "✓" : s.includes("⏳") ? "…" : "○"}</div>
                      {s.replace(" ✅", "").replace(" ⏳", "").replace(" —", "")}
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #eae7df", padding: "22px", marginBottom: 14 }}>
                    <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 14 }}>Documents</h4>
                    {docs.map((d, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: i < docs.length - 1 ? "1px solid #f5f3ee" : "none" }}>
                        <span style={{ fontSize: 18 }}>📄</span>
                        <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 500 }}>{d.n}</div><div style={{ fontSize: 11, color: "#999" }}>{d.d} · {d.s}</div></div>
                        <button style={{ fontSize: 11, padding: "5px 12px", background: CR, border: "1px solid #eae7df", borderRadius: 6, cursor: "pointer" }}>↓</button>
                      </div>
                    ))}
                  </div>
                  <button className="btn-gold" onClick={() => go("rdv")} style={{ width: "100%", justifyContent: "center" }}>📅 Planifier un suivi</button>
                </div>
              </div>
            </div>
          )}
          {tab === "docs" && (
            <div className="fade-up">
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, marginBottom: 22 }}>Mes documents</h2>
              <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #eae7df", padding: "22px" }}>
                {docs.map((d, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: i < docs.length - 1 ? "1px solid #f5f3ee" : "none" }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>📄</div>
                    <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600 }}>{d.n}</div><div style={{ fontSize: 11, color: "#999" }}>ELR-2026-042 · {d.d} · {d.s}</div></div>
                    <button className="btn-navy" style={{ padding: "8px 18px", fontSize: 12 }}>Télécharger</button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === "rdvs" && (
            <div className="fade-up">
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, marginBottom: 22 }}>Mes rendez-vous</h2>
              <h4 style={{ fontSize: 12, fontWeight: 600, color: G, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 12 }}>À venir</h4>
              <div style={{ display: "flex", gap: 14, padding: "18px 20px", background: "#fff", borderRadius: 14, border: `1.5px solid ${G}30`, marginBottom: 20, alignItems: "center" }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `linear-gradient(135deg,${N},${NS})`, display: "flex", alignItems: "center", justifyContent: "center", color: GL, fontSize: 14, fontWeight: 700 }}>10:00</div>
                <div style={{ flex: 1 }}><div style={{ fontSize: 15, fontWeight: 600 }}>Suivi création SARL</div><div style={{ fontSize: 12, color: "#999" }}>28 avril 2026 · Visioconférence · Mme N'Dri</div></div>
                <span className="status-badge" style={{ background: "#e8f4ed", color: "#16a34a" }}>Confirmé</span>
              </div>
              <button className="btn-gold" onClick={() => go("rdv")}>+ Nouveau rendez-vous</button>
            </div>
          )}
          {tab === "profil" && (
            <div className="fade-up" style={{ maxWidth: 480 }}>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, marginBottom: 22 }}>Mon profil</h2>
              <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #eae7df", padding: "30px 26px" }}>
                <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 24 }}>
                  <div style={{ width: 60, height: 60, borderRadius: 14, background: `${G}18`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: G }}>AK</div>
                  <div><div style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Playfair Display',serif" }}>Aminata Koné</div><div style={{ fontSize: 12, color: "#999" }}>Client depuis Janvier 2025</div></div>
                </div>
                {[["Email", "aminata.kone@email.com"], ["Téléphone", "+225 07 12 34 56 78"], ["Expert référent", "Mme N'Dri"]].map(([l, v]) => (
                  <div key={l} style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", color: G, marginBottom: 5 }}>{l}</div>
                    <div style={{ padding: "10px 14px", fontSize: 14, background: CR, borderRadius: 8, border: "1px solid #eae7df" }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════
//  FOOTER
// ═══════════════════════════════════════════════════
const Footer = ({ go }) => (
  <footer style={{ padding: "52px 40px 28px", background: N }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 36, marginBottom: 36 }}>
        <div>
          <Logo onClick={() => go("accueil")} />
          <p style={{ fontSize: 13, color: "rgba(255,255,255,.35)", lineHeight: 1.7, maxWidth: 260, marginTop: 14 }}>Cabinet de conseil juridique au service des particuliers et des entreprises en Côte d'Ivoire.</p>
        </div>
        {[
          { t: "Services", l: [["services", "Consultation"], ["services", "Création d'entreprise"], ["services", "Formalités"], ["services", "Contrats"]] },
          { t: "Cabinet", l: [["a-propos", "À propos"], ["blog", "Blog juridique"], ["contact", "Contact"]] },
          { t: "Portail", l: [["rdv", "Rendez-vous"], ["connexion", "Connexion client"], ["portail", "Espace client"]] },
        ].map((c, i) => (
          <div key={i}>
            <h4 style={{ fontSize: 11, fontWeight: 600, color: GL, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 14 }}>{c.t}</h4>
            {c.l.map(([page, l], j) => <div key={j} onClick={() => go(page)} style={{ fontSize: 13, color: "rgba(255,255,255,.45)", padding: "4px 0", cursor: "pointer", transition: "color .15s" }} onMouseEnter={e => e.target.style.color = GL} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,.45)"}>{l}</div>)}
          </div>
        ))}
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,.08)", paddingTop: 22, display: "flex", justifyContent: "space-between", fontSize: 12, color: "rgba(255,255,255,.3)" }}>
        <span>© 2026 Expertise LEXA-ROK · Tous droits réservés</span>
        <span>Abidjan, Côte d'Ivoire</span>
      </div>
    </div>
  </footer>
);

// ═══════════════════════════════════════════════════
//  TOAST
// ═══════════════════════════════════════════════════
const Toast = ({ msg }) => msg ? (
  <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 9999, padding: "12px 24px", borderRadius: 12, background: N, color: "#fff", fontSize: 13, fontWeight: 500, boxShadow: `0 8px 30px ${N}40`, animation: "toastIn .3s ease both", display: "flex", alignItems: "center", gap: 8 }}>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 8l3 3 5-6" stroke={GL} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
    {msg}
  </div>
) : null;

// ═══════════════════════════════════════════════════
//  PAGE TRANSITION WRAPPER
// ═══════════════════════════════════════════════════
const PageTransition = ({ children, page }) => {
  const [show, setShow] = useState(false);
  useEffect(() => { setShow(false); const t = setTimeout(() => setShow(true), 40); return () => clearTimeout(t); }, [page]);
  return (
    <div style={{ opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(12px)", transition: "opacity .35s ease, transform .35s ease" }}>
      {children}
    </div>
  );
};

// ═══════════════════════════════════════════════════
//  MAIN APP
// ═══════════════════════════════════════════════════
const PUBLIC_PAGES = ["accueil", "services", "a-propos", "blog", "contact", "rdv"];
const PORTAL_PAGES = ["portail", "dashboard"];

export default function App() {
  const [page, setPage] = useState("accueil");
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState(null);

  const go = (target) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPage(target);
  };

  const showPublicNav = PUBLIC_PAGES.includes(page) || page === "connexion";

  return (
    <>
      <GlobalStyles />
      <Toast msg={toast} />
      {showPublicNav && page !== "connexion" && (
        <Navbar page={page} go={go} user={user} setUser={setUser} />
      )}
      <PageTransition page={page}>
        {page === "accueil"    && <PageAccueil go={go} />}
        {page === "services"   && <PageServices go={go} />}
        {page === "a-propos"   && <PageAPropos go={go} />}
        {page === "blog"       && <PageBlog go={go} />}
        {page === "contact"    && <PageContact go={go} />}
        {page === "rdv"        && <PageRDV go={go} />}
        {page === "connexion"  && <PageConnexion go={go} setUser={setUser} />}
        {page === "dashboard"  && <PageDashboard go={go} user={user} />}
        {page === "portail"    && <PagePortail go={go} user={user} />}
      </PageTransition>
    </>
  );
}
