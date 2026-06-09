// ============================================
//  CART PAGE — Render & Interaction
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});

function renderCart() {
    const layout = document.getElementById('cartLayout');
    if (!layout) return;

    const items = Cart.get();

    if (items.length === 0) {
        layout.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Looks like you haven't added anything yet.</p>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
          <a href="products.html" class="btn btn-primary">Shop Products</a>
          <a href="games.html" class="btn btn-outline">Browse Games</a>
        </div>
      </div>
    `;
        return;
    }

    const subtotal = Cart.total();
    const shipping = subtotal > 2000 ? 0 : 199;
    const tax = subtotal * 0.15;
    const total = subtotal + shipping + tax;

    layout.innerHTML = `
    <div class="cart-items" id="cartItems">
      ${items.map(item => renderCartItem(item)).join('')}
    </div>
    <aside class="cart-sidebar">
      <div class="order-summary">
        <h3 class="order-summary-title">Order Summary</h3>

        <div class="summary-lines">
          <div class="summary-line">
            <span>Subtotal (${Cart.count()} items)</span>
            <span>R${subtotal.toFixed(2)}</span>
          </div>
          <div class="summary-line">
            <span>Shipping</span>
            <span>${shipping === 0 ? '<span class="free-tag">FREE</span>' : 'R' + shipping.toFixed(2)}</span>
          </div>
          <div class="summary-line">
            <span>VAT (15%)</span>
            <span>R${tax.toFixed(2)}</span>
          </div>
          <div class="summary-divider"></div>
          <div class="summary-line total-line">
            <span>Total</span>
            <span>R${total.toFixed(2)}</span>
          </div>
        </div>

        ${shipping > 0 ? `<div class="free-shipping-note">Add R${(2000 - subtotal).toFixed(2)} more for free shipping!</div>` : '<div class="free-shipping-note success">🎉 You qualify for free shipping!</div>'}

        <h4 class="shipping-title">Shipping Details</h4>
        <form class="shipping-form" onsubmit="handleCheckout(event)">
          <div class="form-row">
            <div class="form-group">
              <label>First Name</label>
              <input type="text" placeholder="John" required />
            </div>
            <div class="form-group">
              <label>Last Name</label>
              <input type="text" placeholder="Doe" required />
            </div>
          </div>
          <div class="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="john@example.com" required />
          </div>
          <div class="form-group">
            <label>Phone</label>
            <input type="tel" placeholder="+27 00 000 0000" />
          </div>
          <div class="form-group">
            <label>Street Address</label>
            <input type="text" placeholder="123 Main Street" required />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>City</label>
              <input type="text" placeholder="Durban" required />
            </div>
            <div class="form-group">
              <label>Postal Code</label>
              <input type="text" placeholder="4001" required />
            </div>
          </div>
          <div class="form-group">
            <label>Province</label>
            <select required>
              <option value="">Select province</option>
              <option>KwaZulu-Natal</option>
              <option>Gauteng</option>
              <option>Western Cape</option>
              <option>Eastern Cape</option>
              <option>Limpopo</option>
              <option>Mpumalanga</option>
              <option>North West</option>
              <option>Free State</option>
              <option>Northern Cape</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary btn-checkout">
            Proceed to Payment — R${total.toFixed(2)}
          </button>
        </form>
      </div>
    </aside>
  `;

    // Attach qty/remove handlers
    document.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const delta = parseInt(btn.dataset.delta);
            const item = Cart.get().find(i => i.id === id);
            if (item) Cart.updateQty(id, item.qty + delta);
            renderCart();
        });
    });

    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            Cart.remove(btn.dataset.id);
            renderCart();
        });
    });
}

function renderCartItem(item) {
    return `
    <div class="cart-item" id="cart-item-${item.id}">
      <div class="cart-item-emoji">${item.emoji}</div>
      <div class="cart-item-info">
        <span class="cart-item-category">${item.category}</span>
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">R${(item.price * item.qty).toFixed(2)}</div>
      </div>
      <div class="cart-item-controls">
        <div class="qty-controls">
          <button class="qty-btn" data-id="${item.id}" data-delta="-1">−</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" data-id="${item.id}" data-delta="1">+</button>
        </div>
        <span class="unit-price">R${parseFloat(item.price).toFixed(2)} each</span>
        <button class="remove-btn btn btn-outline" data-id="${item.id}">Remove</button>
      </div>
    </div>
  `;
}

function handleCheckout(e) {
    e.preventDefault();
    const layout = document.getElementById('cartLayout');
    layout.innerHTML = `
    <div class="cart-empty">
      <div class="cart-empty-icon">✅</div>
      <h3>Order Placed!</h3>
      <p>Thank you for your order. You'll receive a confirmation email shortly.</p>
      <a href="../index.html" class="btn btn-primary" style="margin-top:20px">Back to Home</a>
    </div>
  `;
    localStorage.removeItem('nexus_cart');
    Cart.updateBadge();
}