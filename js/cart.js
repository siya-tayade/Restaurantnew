window.CART_KEY = window.CART_KEY || 'restaurant_cart';

function getCart() {
  const raw = localStorage.getItem(window.CART_KEY);
  return raw ? JSON.parse(raw) : [];
}
function setCart(cart) {
  localStorage.setItem(window.CART_KEY, JSON.stringify(cart));
  updateBadge();
}
function currency(n) {
  return '₹' + n.toFixed(0);
}
function updateBadge() {
  const countEl = document.getElementById('cart-count');
  if (!countEl) return;
  const cart = getCart();
  const count = cart.reduce((a, c) => a + c.qty, 0);
  countEl.textContent = String(count);
}

function renderCartPage() {
  const container = document.getElementById('cart-items');
  if (!container) { updateBadge(); return; }
  const cart = getCart();
  container.innerHTML = '';
  const empty = document.getElementById('empty-msg');
  empty.style.display = cart.length ? 'none' : 'block';

  cart.forEach(item => {
    const row = document.createElement('div');
    row.className = 'cart-item';
    row.dataset.id = item.id;
    row.innerHTML = `
      <img src="${item.image}" alt="${item.name}" onerror="this.src='https://picsum.photos/seed/cartfallback/1200/800';this.onerror=null">
      <div>
        <h4>${item.name}</h4>
        <div class="cart-controls">
          <button class="icon-btn dec"><i class="fa-solid fa-minus"></i></button>
          <span>${item.qty}</span>
          <button class="icon-btn inc"><i class="fa-solid fa-plus"></i></button>
          <button class="icon-btn remove remove-btn"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>
      <div class="line-price">${currency(item.price * item.qty)}</div>
    `;
    container.appendChild(row);
  });
  updateSummary();
}

function updateSummary() {
  const cart = getCart();
  const subtotal = cart.reduce((a, c) => a + c.price * c.qty, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;
  const s = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = currency(val); };
  s('subtotal', subtotal);
  s('tax', tax);
  s('total', total);
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) checkoutBtn.style.pointerEvents = cart.length ? 'auto' : 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  updateBadge();
  renderCartPage();
  const itemsEl = document.getElementById('cart-items');
  if (itemsEl) {
    itemsEl.addEventListener('click', (e) => {
      const row = e.target.closest('.cart-item');
      if (!row) return;
      const id = row.dataset.id;
      let cart = getCart();
      const idx = cart.findIndex(i => String(i.id) === String(id));
      if (idx === -1) return;
      if (e.target.closest('.inc')) cart[idx].qty += 1;
      if (e.target.closest('.dec')) cart[idx].qty = Math.max(1, cart[idx].qty - 1);
      if (e.target.closest('.remove')) cart.splice(idx, 1);
      setCart(cart);
      renderCartPage();
    });
    const clearBtn = document.getElementById('clear-cart');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        localStorage.removeItem(window.CART_KEY);
        renderCartPage();
        updateBadge();
      });
    }
  }
});
