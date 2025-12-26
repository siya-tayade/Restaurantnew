function getCart(){const raw=localStorage.getItem(window.CART_KEY);return raw?JSON.parse(raw):[]}
function currency(n){return '₹'+n.toFixed(0)}

function renderSummary(){
  const items = getCart();
  const wrap = document.getElementById('summary-items');
  wrap.innerHTML = '';
  items.forEach(i=>{
    const row = document.createElement('div');
    row.className = 'summary-row';
    row.innerHTML = `<span>${i.name} × ${i.qty}</span><span>${currency(i.price*i.qty)}</span>`;
    wrap.appendChild(row);
  });
  const subtotal = items.reduce((a,c)=>a+c.price*c.qty,0);
  const tax = subtotal*0.05;
  const total = subtotal+tax;
  document.getElementById('subtotal').textContent = currency(subtotal);
  document.getElementById('tax').textContent = currency(tax);
  document.getElementById('total').textContent = currency(total);
}

function validate(){
  let ok=true;
  const name = document.getElementById('name');
  const phone = document.getElementById('phone');
  const city = document.getElementById('city');
  const address = document.getElementById('address');
  const setErr=(id,msg)=>{const el=document.getElementById(id);if(el)el.textContent=msg};
  setErr('name-error','');setErr('phone-error','');setErr('city-error','');setErr('address-error','');
  if(!name.value.trim()){setErr('name-error','Please enter your name');ok=false}
  if(!/^[0-9]{10}$/.test(phone.value.trim())){setErr('phone-error','Enter a valid 10-digit phone');ok=false}
  if(!city.value.trim()){setErr('city-error','Please enter your city');ok=false}
  if(address.value.trim().length<6){setErr('address-error','Please enter full address');ok=false}
  return ok;
}

document.addEventListener('DOMContentLoaded',()=>{
  renderSummary();
  // Refresh summary if cart changes in localStorage or page becomes visible again
  window.addEventListener('storage',(e)=>{ if(e.key===window.CART_KEY) renderSummary(); });
  document.addEventListener('visibilitychange',()=>{ if(!document.hidden) renderSummary(); });
  const form = document.getElementById('checkout-form');
  form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(!validate()) return;
    localStorage.removeItem(window.CART_KEY);
    document.getElementById('cart-count').textContent='0';
    const banner = document.getElementById('success-banner');
    banner.classList.add('show');
    alert('🎉 Order placed successfully! Thank you for ordering 💖');
    form.reset();
  });
});
