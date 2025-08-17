let cartCount = 0;
let cartItems = [];

const products = [
  {
    id: 1,
    name: "ChocoCarinho",
    category: "Brigadeiro",
    price: "4,60€",
    image: "images/chococarinho.webp",
  },
  {
    id: 2,
    name: "Belgian Delight",
    category: "Prestige Mousse",
    price: "5,40€",
    image: "images/encanto_belga.webp",
  },
  {
    id: 3,
    name: "Choco & Coconut",
    category: "Prestige",
    price: "5,10€",
    image: "images/choco_coco.webp",
  },
  {
    id: 4,
    name: "Little Carrot",
    category: "Carrot with Brigadeiro",
    price: "4,50€",
    image: "images/cenourinha.webp",
  },
  {
    id: 5,
    name: "Tropical Flavor",
    category: "Coconut & Mango",
    price: "6,20€",
    image: "images/encanto_belga.webp",
  },
  {
    id: 6,
    name: "Complete Delight",
    category: "Classic Flavors Mix",
    price: "18,00€",
    image: "images/all_cakes.webp",
  },
];

function loadCartFromStorage() {
  const savedCart = localStorage.getItem("cartItems");
  if (savedCart) {
    cartItems = JSON.parse(savedCart);
    cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    updateCartCounter();
  }
}

function saveCartToStorage() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function getCartItems() {
  return cartItems;
}

function getCartCount() {
  return cartCount;
}

function setDynamicGreeting() {
  const now = new Date();
  const hour = now.getHours();
  const greetingElement = document.getElementById("dynamic-greeting");

  let greeting;
  if (hour >= 5 && hour < 12) {
    greeting = "Good Morning,<br>Welcome";
  } else if (hour >= 12 && hour < 18) {
    greeting = "Good Afternoon,<br>Welcome";
  } else {
    greeting = "Good Evening,<br>Welcome";
  }

  greetingElement.innerHTML = greeting;
}

function showProducts(productList = products) {
  const container = document.getElementById("products-grid");
  let html = "";

  for (let i = 0; i < productList.length; i++) {
    const product = productList[i];

    html += '<div class="product-card">';
    html +=
      '<a href="#" onclick="addToCart(' +
      product.id +
      ')"><img class="cart-btn" src="images/carrinho.svg" alt="Cart"></a>';
    html +=
      '<a href="#" class="product-image-link" onclick="goToProductDetails(' +
      product.id +
      ')">';
    html += '<div class="product-image">';
    html += '<img src="' + product.image + '" alt="' + product.name + '">';
    html += "</div>";
    html += "</a>";
    html += '<div class="product-info">';
    html += '<h3 class="product-name">' + product.name + "</h3>";
    html += '<p class="product-category">' + product.category + "</p>";
    html += '<div class="product-footer">';
    html += '<span class="product-price">' + product.price + "</span>";
    html +=
      '<a class="arrow-btn" href="#" onclick="goToProductDetails(' +
      product.id +
      ')"></a>';
    html += "</div>";
    html += "</div>";
    html += "</div>";
  }

  container.innerHTML = html;
}

function addToCart(productId) {
  let productFound = false;

  for (let i = 0; i < products.length; i++) {
    if (products[i].id == productId) {
      const existingItemIndex = cartItems.findIndex(
        (item) => item.id === productId
      );

      if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity += 1;
      } else {
        cartItems.push({
          id: products[i].id,
          name: products[i].name,
          category: products[i].category,
          price: products[i].price,
          image: products[i].image,
          quantity: 1,
        });
      }

      cartCount += 1;
      updateCartCounter();
      saveCartToStorage();
      alert(products[i].name + " was added to cart!");
      productFound = true;
      break;
    }
  }

  if (productFound == false) {
    alert("Product not found!");
  }
}

function viewProduct(productId) {
  let foundProduct = null;

  for (let i = 0; i < products.length; i++) {
    if (products[i].id == productId) {
      foundProduct = products[i];
    }
  }

  if (foundProduct != null) {
    alert("Viewing details of: " + foundProduct.name);
  } else {
    alert("Product not found!");
  }
}

function updateCartCounter() {
  const cartCountElement = document.getElementById("cart-count");

  if (cartCountElement) {
    cartCountElement.textContent = cartCount;

    if (cartCount > 0) {
      cartCountElement.style.display = "flex";
    } else {
      cartCountElement.style.display = "none";
    }
  } else {
    console.log("Cart count element not found!");
  }
}

function toggleMenu() {
  const hamburger = document.getElementById("hamburger-menu");
  const menu = document.getElementById("mobile-nav");

  hamburger.classList.toggle("active");
  menu.classList.toggle("active");
}

window.onload = function () {
  loadCartFromStorage();
  showProducts();
};

function scrollToContact() {
  document.getElementById("contact").scrollIntoView({
    behavior: "smooth",
  });

  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(128, 128, 128, 0.7)";
  overlay.style.zIndex = "998";
  overlay.style.opacity = "0";
  overlay.style.transition = "opacity 0.5s ease";

  document.body.appendChild(overlay);

  setTimeout(function () {
    overlay.style.opacity = "1";
  }, 100);

  setTimeout(function () {
    overlay.style.opacity = "0";
    setTimeout(function () {
      document.body.removeChild(overlay);
    }, 500);
  }, 2000);

  setTimeout(function () {
    const contactImages = document.querySelectorAll("#contact img");
    for (let i = 0; i < contactImages.length; i++) {
      const img = contactImages[i];
      img.style.position = "relative";
      img.style.zIndex = "1000";

      setTimeout(function () {
        img.style.transform = "scale(1.2)";
        img.style.transition =
          "transform 0.6s ease, box-shadow 0.6s ease, opacity 0.6s ease";
        img.style.boxShadow =
          "0 0 20px 5px rgba(255, 255, 255, 0.8), 0 0 40px 10px rgba(255, 255, 255, 0.4)";
        img.style.opacity = "0.9";

        setTimeout(function () {
          img.style.transform = "scale(1)";
          img.style.boxShadow = "0 0 10px 2px rgba(255, 255, 255, 0.3)";
          img.style.opacity = "1";
        }, 600);
      }, i * 300);
    }
  }, 1000);
}

document
  .getElementById("search-input")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      window.location.href = "#products";
    }
  });

function searchProducts() {
  const input = document.getElementById("search-input");
  let searchTerm = input.value;
  searchTerm = searchTerm.toLowerCase();

  if (searchTerm == "") {
    showProducts(products);
    return;
  }

  const filtered = [];
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const productName = product.name.toLowerCase();
    const productCategory = product.category.toLowerCase();

    if (
      productName.includes(searchTerm) ||
      productCategory.includes(searchTerm)
    ) {
      filtered.push(product);
    }
  }

  showProducts(filtered);
}

function checkUserData() {
  const userData = localStorage.getItem("userData");

  if (userData) {
    const user = JSON.parse(userData);
    if (user.name && user.phone && user.email) {
      return true;
    }
  }
  return false;
}

function handleCartClick(event) {
  event.preventDefault();

  if (checkUserData()) {
    window.location.href = "cart.html";
  } else {
    alert("Please fill in your information first!");
    window.location.href = "form.html";
  }
}

function goToProductDetails(productId) {
  window.location.href = `detail.html?id=${productId}`;
}

function removeFromCart(productId) {
  const itemIndex = cartItems.findIndex((item) => item.id === productId);

  if (itemIndex !== -1) {
    cartCount -= cartItems[itemIndex].quantity;
    cartItems.splice(itemIndex, 1);
    updateCartCounter();
    saveCartToStorage();
  }
}

function clearCart() {
  cartItems = [];
  cartCount = 0;
  updateCartCounter();
  saveCartToStorage();
}

function updateItemQuantity(productId, newQuantity) {
  const itemIndex = cartItems.findIndex((item) => item.id === productId);

  if (itemIndex !== -1 && newQuantity > 0) {
    const oldQuantity = cartItems[itemIndex].quantity;
    cartItems[itemIndex].quantity = newQuantity;
    cartCount = cartCount - oldQuantity + newQuantity;
    updateCartCounter();
    saveCartToStorage();
  }
}
