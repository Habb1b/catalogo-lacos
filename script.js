let cart = [];

/* ===== MODAL DE IMAGEM ===== */
function openModal(src) {
  document.getElementById('modalImg').src = src;
  document.getElementById('imageModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('imageModal').style.display = 'none';
}

/* ===== CARRINHO ===== */

// abre / fecha o painel do carrinho
function toggleCart() {
  document.getElementById('cartPanel').classList.toggle('open');
}

// atualiza o número de itens no botão
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById('cartCount').innerText = count;
}

function addToCart(name, price) {
  const item = cart.find(i => i.name === name);

  if (item) {
    item.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  renderCart();
}

function changeQty(index, delta) {
  cart[index].qty += delta;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  renderCart();
}

function renderCart() {
  const el = document.getElementById('cartItems');
  el.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    el.innerHTML += `
      <div class="cart-item">
        <strong>${item.name}</strong><br>
        R$ ${item.price},00 x ${item.qty}
        <div class="qty-controls">
          <button onclick="changeQty(${index}, -1)">-</button>
          <button onclick="changeQty(${index}, 1)">+</button>
          <button class="remove" onclick="changeQty(${index}, -${item.qty})">Excluir</button>
        </div>
      </div>
    `;
  });

  document.getElementById('total').innerText =
    'Total: R$ ' + total + ',00';

  updateCartCount();
}

function checkout() {
  if (cart.length === 0) {
    alert('Carrinho vazio');
    return;
  }

  let msg = 'Olá! Gostaria de fazer um pedido 🎀%0A%0A';
  let total = 0;

  cart.forEach(item => {
    msg += `• ${item.name} - ${item.qty}x - R$ ${item.price * item.qty},00%0A`;
    total += item.price * item.qty;
  });

  msg += `%0A💰 Total: R$ ${total},00`;

  window.open(
    'https://wa.me/5548996220648?text=' + msg,
    '_blank'
  );
}
