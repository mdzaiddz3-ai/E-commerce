const products = [
    { id: 1, name: "Oversized Essential T-Shirt", cat: "men", label: "Men", price: 1499, old: 1899, img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85" },
    { id: 2, name: "Premium Relaxed Shirt", cat: "men", label: "Men", price: 2299, old: 2799, img: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=85" },
    { id: 3, name: "Urban Cargo Pants", cat: "new", label: "New Arrivals", price: 2799, old: null, img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85" },
    { id: 4, name: "Classic Denim Jacket", cat: "men", label: "Men", price: 3499, old: 3999, img: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=900&q=85" },
    { id: 5, name: "Essential Hoodie", cat: "new", label: "New Arrivals", price: 2499, old: 2999, img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85" },
    { id: 6, name: "Minimal Summer Dress", cat: "women", label: "Women", price: 2999, old: 3599, img: "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?auto=format&fit=crop&w=900&q=85" },
    { id: 7, name: "Premium Blazer", cat: "women", label: "Women", price: 4499, old: 4999, img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=85" },
    { id: 8, name: "Streetwear Sweatshirt", cat: "new", label: "New Arrivals", price: 2199, old: null, img: "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?auto=format&fit=crop&w=900&q=85" }
];
let cart = JSON.parse(localStorage.getItem("aurelCart") || "[]");
let wishlist = JSON.parse(localStorage.getItem("aurelWishlist") || "[]");
const $ = s => document.querySelector(s), $$ = s => document.querySelectorAll(s);
const money = n => "₹" + n.toLocaleString("en-IN");
function productCard(p) { return `<article class="product-card reveal visible" data-id="${p.id}"><div class="product-image" onclick="openProduct(${p.id})"><img loading="lazy" src="${p.img}" alt="${p.name}"><button class="wish ${wishlist.includes(p.id) ? "liked" : ""}" onclick="event.stopPropagation();toggleWish(${p.id})">${wishlist.includes(p.id) ? "♥" : "♡"}</button><button class="btn btn-light quick" onclick="event.stopPropagation();addToCart(${p.id})">ADD TO BAG +</button></div><div class="product-info"><small>${p.label}</small><h3>${p.name}</h3><div class="price">${money(p.price)} ${p.old ? `<span class="old">${money(p.old)}</span>` : ""}</div><div class="rating">★★★★★</div></div></article>` }
function renderProducts(filter = "all") { const list = filter === "all" ? products : products.filter(p => p.cat === filter); $("#productGrid").innerHTML = list.map(productCard).join(""); }
function renderBest() { $("#bestTrack").innerHTML = products.slice(0, 6).map(productCard).join(""); }
function save() { localStorage.setItem("aurelCart", JSON.stringify(cart)); localStorage.setItem("aurelWishlist", JSON.stringify(wishlist)); }
function addToCart(id) { const item = cart.find(x => x.id === id); item ? item.qty++ : cart.push({ id, qty: 1 }); save(); renderCart(); toast("Added to cart!"); }
function changeQty(id, delta) { const x = cart.find(i => i.id === id); if (!x) return; x.qty += delta; if (x.qty < 1) cart = cart.filter(i => i.id !== id); save(); renderCart() }
function removeItem(id) { cart = cart.filter(i => i.id !== id); save(); renderCart() }
function renderCart() { const count = cart.reduce((s, x) => s + x.qty, 0); $("#cartCount").textContent = count; $("#cartItems").innerHTML = cart.length ? cart.map(x => { const p = products.find(y => y.id === x.id); return `<div class="cart-row"><img src="${p.img}" alt="${p.name}"><div><h4>${p.name}</h4><small>${money(p.price)}</small><div class="qty"><button onclick="changeQty(${p.id},-1)">−</button><span>${x.qty}</span><button onclick="changeQty(${p.id},1)">+</button></div></div><button class="remove" onclick="removeItem(${p.id})">REMOVE</button></div>` }).join("") : `<p style="text-align:center;color:#888;padding:60px 0;font-size:12px">Your bag is empty.</p>`; $("#cartTotal").textContent = money(cart.reduce((s, x) => s + products.find(p => p.id === x.id).price * x.qty, 0)) }
function toggleWish(id) { wishlist.includes(id) ? wishlist = wishlist.filter(x => x !== id) : wishlist.push(id); save(); renderProducts($("#filters .active").dataset.filter); renderBest(); toast(wishlist.includes(id) ? "Saved to wishlist" : "Removed from wishlist") }
function openProduct(id) { const p = products.find(x => x.id === id); $("#modalContent").innerHTML = `<div class="modal-product"><img src="${p.img}" alt="${p.name}"><div class="modal-info"><small>${p.label} / AUREL</small><h2>${p.name}</h2><div class="price">${money(p.price)} ${p.old ? `<span class="old">${money(p.old)}</span>` : ""}</div><div class="rating">★★★★★  4.9</div><p>A refined everyday essential made for effortless style. Designed with a contemporary silhouette, premium feel and versatile finish.</p><strong style="font-size:10px;letter-spacing:1px">SELECT SIZE</strong><div class="sizes">${["S", "M", "L", "XL"].map((s, i) => `<button class="${i === 1 ? "selected" : ""}" onclick="this.parentElement.querySelectorAll('button').forEach(b=>b.classList.remove('selected'));this.classList.add('selected')">${s}</button>`).join("")}</div><strong style="font-size:10px;letter-spacing:1px">COLOR</strong><div class="colors"><button class="color" style="background:#181818"></button><button class="color" style="background:#ddd"></button><button class="color" style="background:#b39c83"></button></div><button class="btn btn-dark modal-add" onclick="addToCart(${p.id});closeProduct()">ADD TO BAG — ${money(p.price)}</button></div></div>`; $("#productModal").classList.add("open"); $("#overlay").classList.add("open") }
function closeProduct() { $("#productModal").classList.remove("open"); $("#overlay").classList.remove("open") }
function toast(text) { $("#toast").textContent = text; $("#toast").classList.add("show"); setTimeout(() => $("#toast").classList.remove("show"), 1800) }
function openCart() { $("#cartDrawer").classList.add("open"); $("#overlay").classList.add("open") }
function closeCart() { $("#cartDrawer").classList.remove("open"); $("#overlay").classList.remove("open") }
$("#filters").addEventListener("click", e => { if (!e.target.classList.contains("filter")) return; $$(".filter").forEach(x => x.classList.remove("active")); e.target.classList.add("active"); renderProducts(e.target.dataset.filter) });
$("#cartBtn").onclick = openCart; $("#closeCart").onclick = closeCart; $("#closeModal").onclick = closeProduct; $("#overlay").onclick = () => { closeCart(); closeProduct(); closeSearch() };
$("#menuBtn").onclick = () => { $("#navLinks").classList.toggle("open") };
$$(".nav-links a").forEach(a => a.onclick = () => $("#navLinks").classList.remove("open"));
window.addEventListener("scroll", () => { $("#navbar").classList.toggle("scrolled", scrollY > 70); $("#backTop").classList.toggle("show", scrollY > 600) });
$("#backTop").onclick = () => scrollTo({ top: 0, behavior: "smooth" });
$("#prevBest").onclick = () => $("#bestTrack").scrollBy({ left: -320, behavior: "smooth" }); $("#nextBest").onclick = () => $("#bestTrack").scrollBy({ left: 320, behavior: "smooth" });
const reviews = [
    ["Aanya Mehta", "The fit, fabric and packaging were all exceptional. AUREL has instantly become one of my go-to brands."],
    ["Rohan Kapoor", "Minimal, premium and incredibly easy to style. The quality genuinely feels above the price point."],
    ["Sara Khan", "Beautiful pieces and super-fast delivery. I ordered twice already and both experiences were perfect."],
    ["Arjun Verma", "The attention to detail is impressive. Everything looks even better in person."]
]; let reviewIndex = 0;
function renderReview() { const r = reviews[reviewIndex]; $("#reviewCard").innerHTML = `<div class="review-stars">★★★★★</div><div class="review-text">“${r[1]}”</div><div class="review-name">${r[0]} <span class="verified">✓ VERIFIED CUSTOMER</span></div>`; $("#reviewDots").innerHTML = reviews.map((_, i) => `<i class="dot ${i === reviewIndex ? "active" : ""}"></i>`).join("") }
function nextReview(d = 1) { reviewIndex = (reviewIndex + d + reviews.length) % reviews.length; renderReview() }
$("#prevReview").onclick = () => nextReview(-1); $("#nextReview").onclick = () => nextReview(1); setInterval(() => nextReview(1), 6000);
const searchPanel = $("#searchPanel"); function openSearch() { searchPanel.classList.add("open"); $("#overlay").classList.add("open"); $("#searchInput").focus() } function closeSearch() { searchPanel.classList.remove("open"); $("#overlay").classList.remove("open") }
$("#searchBtn").onclick = openSearch; $("#closeSearch").onclick = closeSearch;
$("#searchInput").oninput = e => { const q = e.target.value.toLowerCase(); $("#searchResults").innerHTML = q ? products.filter(p => p.name.toLowerCase().includes(q) || p.label.toLowerCase().includes(q)).map(p => `<div class="search-result"><strong>${p.name}</strong> — ${money(p.price)}</div>`).join("") || `<div class="search-result">No products found.</div>` : "" };
$("#newsletterForm").onsubmit = e => { e.preventDefault(); const input = $("#email"), msg = $("#emailMsg"); if (!input.value.trim()) { msg.textContent = "Please enter your email address."; msg.className = "error"; return } if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(input.value)) { msg.textContent = "Please enter a valid email address."; msg.className = "error"; return } msg.textContent = "You're on the list — welcome to AUREL."; msg.className = "success"; input.value = "" };
$("#checkoutBtn").onclick = () => cart.length ? toast("Checkout demo — connect your payment gateway here.") : toast("Your bag is empty.");
document.addEventListener("keydown", e => { if (e.key === "Escape") { closeCart(); closeProduct(); closeSearch() } });
const observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible") }), { threshold: .12 }); $$(".reveal").forEach(x => observer.observe(x));
renderProducts(); renderBest(); renderCart(); renderReview();
