// nav-component.js — injects shared nav and footer, toast container, bg canvas

const NAV_HTML = `
<canvas id="bg-canvas"></canvas>
<div id="toast-container"></div>
<nav>
  <a href="../index.html" class="nav-logo">NEXUS<span>TECH</span></a>
  <ul class="nav-links">
    <li><a href="../index.html">Home</a></li>
    <li><a href="games.html">Games</a></li>
    <li><a href="products.html">Products</a></li>
    <li><a href="contact.html">Contact Us</a></li>
  </ul>
  <a href="cart.html" class="nav-cart">
    🛒 Cart
    <span class="cart-badge" id="cart-badge" style="display:none">0</span>
  </a>
</nav>
`;

const FOOTER_HTML = `
<footer>
  <a href="../index.html" class="footer-logo">NEXUS<span>TECH</span></a>
  <ul class="footer-links">
    <li><a href="../index.html">Home</a></li>
    <li><a href="games.html">Games</a></li>
    <li><a href="products.html">Products</a></li>
    <li><a href="cart.html">Cart</a></li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
  <p>© 2025 NexusTech. All rights reserved.</p>
</footer>
`;

// For root-level pages (index.html)
const NAV_HTML_ROOT = `
<canvas id="bg-canvas"></canvas>
<div id="toast-container"></div>
<nav>
  <a href="index.html" class="nav-logo">NEXUS<span>TECH</span></a>
  <ul class="nav-links">
    <li><a href="index.html">Home</a></li>
    <li><a href="pages/games.html">Games</a></li>
    <li><a href="pages/products.html">Products</a></li>
    <li><a href="pages/contact.html">Contact Us</a></li>
  </ul>
  <a href="pages/cart.html" class="nav-cart">
    🛒 Cart
    <span class="cart-badge" id="cart-badge" style="display:none">0</span>
  </a>
</nav>
`;

const FOOTER_HTML_ROOT = `
<footer>
  <a href="index.html" class="footer-logo">NEXUS<span>TECH</span></a>
  <ul class="footer-links">
    <li><a href="index.html">Home</a></li>
    <li><a href="pages/games.html">Games</a></li>
    <li><a href="pages/products.html">Products</a></li>
    <li><a href="pages/cart.html">Cart</a></li>
    <li><a href="pages/contact.html">Contact</a></li>
  </ul>
  <p>© 2025 NexusTech. All rights reserved.</p>
</footer>
`;

function injectLayout(isRoot = false) {
    document.body.insertAdjacentHTML('afterbegin', isRoot ? NAV_HTML_ROOT : NAV_HTML);
    document.body.insertAdjacentHTML('beforeend', isRoot ? FOOTER_HTML_ROOT : FOOTER_HTML);
}