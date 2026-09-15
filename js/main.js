// ============================================================
// HurciKendő - weboldal logika
//
// EMAIL BEÁLLÍTÁS: az "Érdekel" űrlap a Web3Forms ingyenes
// szolgáltatáson keresztül küldi el az érdeklődéseket emailben.
// 1) Menj a https://web3forms.com oldalra
// 2) Add meg az email címed, ahova az érdeklődéseket szeretnéd kapni
// 3) Másold ki az onnan kapott "Access Key"-t
// 4) Illeszd be ide, a WEB3FORMS_ACCESS_KEY helyére (idézőjelek között)
// ============================================================
const WEB3FORMS_ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";

// ---------- Mobil menü ----------
function initNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

// ---------- Termékrács renderelése (termekek.html) ----------
function renderProductGrid(containerSelector) {
  const grid = document.querySelector(containerSelector);
  if (!grid) return;
  grid.innerHTML = PRODUCTS.map(
    (p) => `
    <article class="product-card">
      <a class="thumb" href="termek.html?slug=${p.slug}">
        <img src="${productImageSrc(p, 1)}" alt="${p.name}" loading="lazy">
      </a>
      <div class="body">
        <span class="condition-tag">${p.condition}</span>
        <h3><a href="termek.html?slug=${p.slug}">${p.name}</a></h3>
        <p class="desc">${p.description}</p>
        <div class="price-row">
          <span class="price">${formatFt(p.price)}</span>
          <span style="font-size:0.78rem;color:var(--ink-soft)">${p.size}</span>
        </div>
        <button class="btn btn-primary btn-small" data-open-modal="${p.slug}">Érdekel</button>
      </div>
    </article>`
  ).join("");
}

// ---------- Termék részletes oldal (termek.html) ----------
function renderProductDetail() {
  const root = document.querySelector("[data-product-detail]");
  if (!root) return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  const product = getProductBySlug(slug);

  if (!product) {
    root.innerHTML = `<div class="section container" style="text-align:center">
      <h2>Ezt a kendőt nem találjuk</h2>
      <p><a class="btn btn-primary" href="termekek.html">Vissza a kendőkhöz</a></p>
    </div>`;
    document.title = "Termék nem található – HurciKendő";
    return;
  }

  document.title = `${product.name} – HurciKendő`;
  document.querySelector("[data-breadcrumb-name]").textContent = product.name;

  const images = Array.from({ length: product.images }, (_, i) => productImageSrc(product, i + 1));

  const specs = [
    ["Állapot", product.condition],
    ["Összetétel", product.composition],
    ["Méret", product.size],
    product.gsm ? ["Vastagság", product.gsm] : null,
  ].filter(Boolean);

  root.innerHTML = `
    <div class="gallery">
      <div class="gallery-main">
        <img src="${images[0]}" alt="${product.name}" data-main-image>
      </div>
      ${
        images.length > 1
          ? `<div class="gallery-thumbs">
              ${images
                .map(
                  (src, i) =>
                    `<img src="${src}" alt="${product.name} ${i + 1}" class="${i === 0 ? "active" : ""}" data-thumb>`
                )
                .join("")}
            </div>`
          : ""
      }
    </div>
    <div class="detail-info">
      <span class="condition-tag">${product.condition}</span>
      <h1>${product.name}</h1>
      <div class="price">${formatFt(product.price)}</div>
      <p class="description">${product.description}</p>
      <ul class="spec-list">
        ${specs
          .map(
            ([k, v]) =>
              `<li><span class="tick">✓</span><span class="k">${k}</span><span class="v">${v}</span></li>`
          )
          .join("")}
      </ul>
      <div class="detail-actions">
        <button class="btn btn-primary" data-open-modal="${product.slug}">Érdekel</button>
      </div>
      <p class="detail-note">🔒 Egyedi, használt darab — amint elkel, levesszük a kínálatból. Az adataidat bizalmasan kezeljük.</p>
    </div>
  `;

  // galéria váltás
  const mainImg = root.querySelector("[data-main-image]");
  root.querySelectorAll("[data-thumb]").forEach((thumb) => {
    thumb.addEventListener("click", () => {
      mainImg.src = thumb.src;
      root.querySelectorAll("[data-thumb]").forEach((t) => t.classList.remove("active"));
      thumb.classList.add("active");
    });
  });
}

// ---------- Érdeklődés modal ----------
function initInterestModal() {
  const overlay = document.querySelector("#interest-modal");
  if (!overlay) return;

  const form = overlay.querySelector("form");
  const nameField = form.querySelector("#f-name");
  const phoneField = form.querySelector("#f-phone");
  const productNameEl = overlay.querySelector("[data-modal-product-name]");
  const productPriceEl = overlay.querySelector("[data-modal-product-price]");
  const productImgEl = overlay.querySelector("[data-modal-product-img]");
  const slugInput = overlay.querySelector("#f-product-slug");
  const productLabelInput = overlay.querySelector("#f-product-label");
  const statusEl = overlay.querySelector(".form-status");
  const submitBtn = form.querySelector('button[type="submit"]');
  const formView = overlay.querySelector("[data-form-view]");
  const successView = overlay.querySelector("[data-success-view]");

  function openModal(slug) {
    const product = getProductBySlug(slug);
    if (!product) return;

    formView.style.display = "";
    successView.style.display = "none";
    statusEl.className = "form-status";
    statusEl.textContent = "";
    form.reset();
    overlay.querySelectorAll(".form-field").forEach((f) => f.classList.remove("invalid"));

    productNameEl.textContent = product.name;
    productPriceEl.textContent = formatFt(product.price);
    productImgEl.src = productImageSrc(product, 1);
    slugInput.value = product.slug;
    productLabelInput.value = `${product.name} (${formatFt(product.price)})`;

    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    setTimeout(() => nameField.focus(), 50);
  }

  function closeModal() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-open-modal]").forEach((btn) => {
    btn.addEventListener("click", () => openModal(btn.getAttribute("data-open-modal")));
  });

  overlay.querySelector(".modal-close").addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("open")) closeModal();
  });

  function validate() {
    let ok = true;
    const nameOk = nameField.value.trim().length >= 2;
    const phoneOk = phoneField.value.replace(/[^0-9+]/g, "").length >= 7;

    nameField.closest(".form-field").classList.toggle("invalid", !nameOk);
    phoneField.closest(".form-field").classList.toggle("invalid", !phoneOk);

    if (!nameOk) ok = false;
    if (!phoneOk) ok = false;
    return ok;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validate()) return;

    submitBtn.disabled = true;
    submitBtn.textContent = "Küldés...";
    statusEl.className = "form-status";
    statusEl.textContent = "";

    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `Új érdeklődés – ${productLabelInput.value}`,
      from_name: "HurciKendő weboldal",
      name: nameField.value.trim(),
      phone: phoneField.value.trim(),
      termek: productLabelInput.value,
      message: `Név: ${nameField.value.trim()}\nTelefonszám: ${phoneField.value.trim()}\nTermék: ${productLabelInput.value}`,
    };

    try {
      if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === "YOUR_WEB3FORMS_ACCESS_KEY") {
        throw new Error("missing-key");
      }

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        formView.style.display = "none";
        successView.style.display = "";
      } else {
        throw new Error(data.message || "send-failed");
      }
    } catch (err) {
      if (err.message === "missing-key") {
        statusEl.textContent =
          "A weboldal még nincs bekötve az email küldéshez. (Fejlesztői teendő: Web3Forms kulcs beillesztése a js/main.js fájlban.)";
      } else {
        statusEl.textContent = "Hiba történt a küldés közben. Kérjük, próbáld meg újra, vagy hívj minket telefonon.";
      }
      statusEl.classList.add("error", "show");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Küldés";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNavToggle();
  renderProductGrid("[data-product-grid]");
  renderProductDetail();
  initInterestModal();

  // aktív nav link
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a").forEach((a) => {
    if (a.getAttribute("href") === path) a.classList.add("active");
  });
});
