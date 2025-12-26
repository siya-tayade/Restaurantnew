const MENU_ITEMS = [
  { id: 's1', name: 'Garlic Bread', price: 129, category: 'starters', image: 'https://picsum.photos/seed/garlicbread/800/600', desc: 'Buttery, crispy with herbs' },
  { id: 's2', name: 'Tomato Soup', price: 149, category: 'starters', image: 'https://picsum.photos/seed/tomatosoup/800/600', desc: 'Creamy and warm' },
  { id: 'm1', name: 'Margherita Pizza', price: 299, category: 'main', image: 'https://picsum.photos/seed/pizza/800/600', desc: 'Mozzarella, basil, tomato' },
  { id: 'm2', name: 'Veg Burger', price: 199, category: 'main', image: 'https://picsum.photos/seed/vegburger/800/600', desc: 'Crispy patty with sauces' },
  { id: 'm3', name: 'Pasta Alfredo', price: 349, category: 'main', image: 'https://picsum.photos/seed/pastaalfredo/800/600', desc: 'Silky cream sauce' },
  { id: 'd1', name: 'Chocolate Lava Cake', price: 199, category: 'desserts', image: 'https://picsum.photos/seed/lavacake/800/600', desc: 'Molten center, ice cream' },
  { id: 'd2', name: 'Cheesecake', price: 249, category: 'desserts', image: 'https://picsum.photos/seed/cheesecake/800/600', desc: 'Rich and creamy' },
  { id: 'dr1', name: 'Cold Coffee', price: 129, category: 'drinks', image: 'https://picsum.photos/seed/coldcoffee/800/600', desc: 'Iced and refreshing' },
  { id: 'dr2', name: 'Fresh Lemonade', price: 99, category: 'drinks', image: 'https://picsum.photos/seed/lemonade/800/600', desc: 'Zesty and cool' },
  { id: 'd3', name: 'Strawberry Cupcake', price: 149, category: 'desserts', image: 'https://picsum.photos/seed/strawberrycupcake/800/600', desc: 'Pink frosting, fresh berries' },
  { id: 'm4', name: 'Paneer Tikka', price: 279, category: 'main', image: 'https://picsum.photos/seed/paneertikka/800/600', desc: 'Smoky, spicy, tender' },
  { id: 's3', name: 'Caesar Salad', price: 169, category: 'starters', image: 'https://picsum.photos/seed/caesarsalad/800/600', desc: 'Crisp lettuce, creamy dressing' },
  { id: 'dr3', name: 'Pink Milkshake', price: 129, category: 'drinks', image: 'https://picsum.photos/seed/pinkmilkshake/800/600', desc: 'Bubbly strawberry shake' },
  { id: 'm5', name: 'Veg Biryani', price: 259, category: 'main', image: 'https://picsum.photos/seed/vegbiryani/800/600', desc: 'Aromatic, saffron-kissed' },
  { id: 'd4', name: 'Macarons Box', price: 299, category: 'desserts', image: 'https://picsum.photos/seed/macarons/800/600', desc: 'Assorted pastel bites' },
  { id: 's4', name: 'Veg Spring Rolls', price: 149, category: 'starters', image: 'https://picsum.photos/seed/springrolls/800/600', desc: 'Crispy and golden' },
  { id: 'dr4', name: 'Iced Tea', price: 99, category: 'drinks', image: 'https://picsum.photos/seed/icedtea/800/600', desc: 'Refreshing & light' },
  { id: 'dr5', name: 'Rose Falooda', price: 169, category: 'drinks', image: 'https://picsum.photos/seed/rosefalooda/800/600', desc: 'Rose, vermicelli, ice cream' },
  { id: 'd5', name: 'Berry Pancakes', price: 229, category: 'desserts', image: 'https://picsum.photos/seed/berrypancakes/800/600', desc: 'Stacked with fresh berries' },
  { id: 'm6', name: 'Butter Naan', price: 79, category: 'main', image: 'https://picsum.photos/seed/butternaan/800/600', desc: 'Soft, buttery Indian bread' },
  { id: 's5', name: 'Pink Slaw', price: 129, category: 'starters', image: 'https://picsum.photos/seed/pinkslaw/800/600', desc: 'Colorful crunchy salad' },
];

function getCart() {
  const raw = localStorage.getItem('restaurant_cart');
  return raw ? JSON.parse(raw) : [];
}
function setCart(cart) {
  localStorage.setItem('restaurant_cart', JSON.stringify(cart));
  const countEl = document.getElementById('cart-count');
  if (countEl) {
    countEl.textContent = String(cart.reduce((a,c)=>a+c.qty,0));
  }
}

function renderMenu(items) {
  const grid = document.getElementById('menu-grid');
  grid.innerHTML = '';
  items.forEach(item => {
    const card = document.createElement('article');
    card.className = 'dish-card';
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" onerror="this.src='https://picsum.photos/seed/foodfallback/1200/800';this.onerror=null">
      <div class="dish-info">
        <div class="dish-title">${item.name}</div>
        <div class="dish-meta">
          <span class="price">₹${item.price}</span>
          <span class="muted">${item.category}</span>
        </div>
        <div class="muted">${item.desc}</div>
        <div class="dish-actions">
          <input type="number" min="1" value="1" class="qty-input">
          <button class="add-btn" data-id="${item.id}"><i class="fa-solid fa-plus"></i> Add</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function applyFilter(filter) {
  if (filter === 'all') return MENU_ITEMS;
  return MENU_ITEMS.filter(i => i.category === filter);
}

function applySearch(list, q) {
  if (!q) return list;
  const s = q.toLowerCase();
  return list.filter(i => i.name.toLowerCase().includes(s) || i.desc.toLowerCase().includes(s));
}

document.addEventListener('DOMContentLoaded', () => {
  renderMenu(MENU_ITEMS);
  const countEl = document.getElementById('cart-count');
  if (countEl) countEl.textContent = String(getCart().reduce((a,c)=>a+c.qty,0));

  const filters = document.querySelectorAll('.filter-btn');
  let currentFilter = 'all';
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      const q = document.getElementById('search-input').value.trim();
      const list = applySearch(applyFilter(currentFilter), q);
      renderMenu(list);
    });
  });

  const search = document.getElementById('search-input');
  search.addEventListener('input', () => {
    const list = applySearch(applyFilter(currentFilter), search.value.trim());
    renderMenu(list);
  });

  const grid = document.getElementById('menu-grid');
  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.add-btn');
    if (!btn) return;
    const card = btn.closest('.dish-card');
    const qtyEl = card.querySelector('.qty-input');
    const qty = Math.max(1, parseInt(qtyEl.value || '1'));
    const id = btn.dataset.id;
    const item = MENU_ITEMS.find(i => i.id === id);
    if (!item) return;
    let cart = getCart();
    const existing = cart.find(i => i.id === id);
    if (existing) existing.qty += qty;
    else cart.push({ id: item.id, name: item.name, price: item.price, image: item.image, qty });
    setCart(cart);
    const toast = document.getElementById('toast');
    if (toast) {
      toast.textContent = `${item.name} added to cart`;
      toast.classList.add('show');
      setTimeout(()=>toast.classList.remove('show'),1500);
    }
  });
});
