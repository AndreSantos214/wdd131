let cartCount = 0;

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
    name: "Encanto Belga",
    category: "Mousse Prestígio",
    price: "5,40€",
    image: "images/encanto_belga.webp",
  },
  {
    id: 3,
    name: "Choco & Coco",
    category: "Prestígio",
    price: "5,10€",
    image: "images/choco_coco.webp",
  },
  {
    id: 4,
    name: "Cenourinha",
    category: "Cenoura com Brigadeiro",
    price: "4,50€",
    image: "images/cenourinha.webp",
  },
  {
    id: 5,
    name: "Sabor Tropical",
    category: "Coco & Manga",
    price: "6,20€",
    image: "images/encanto_belga.webp",
  },
  {
    id: 6,
    name: "Encanto Completo",
    category: "Mix de Sabores Clássicos",
    price: "5,80€",
    image: "images/all_cakes.webp",
  },
];

function showProducts(productsToShow) {
  if (!productsToShow) {
    productsToShow = products;
  }

  const container = document.getElementById("products-grid");
  let html = "";

  for (let i = 0; i < productsToShow.length; i++) {
    const product = productsToShow[i];

    html += '<div class="product-card">';
    html +=
      '<a href="#" onclick="addToCart(' +
      product.id +
      ')"><img class="cart-btn" src="images/carrinho.svg" alt="Cart"></a>';
    html += '<a href="#" class="product-image-link">';
    html += '<div class="product-image">';
    html += '<img src="' + product.image + '" alt="' + product.name + '">';
    html += "</div>";
    html += "</a>";
    html += '<div class="product-info">';
    html += '<h3 class="product-name">' + product.name + "</h3>";
    html += '<p class="product-category">' + product.category + "</p>";
    html += '<div class="product-footer">';
    html += '<span class="product-price">' + product.price + "</span>";
    html += '<a class="arrow-btn" href="#"></a>';
    html += "</div>";
    html += "</div>";
    html += "</div>";
  }

  container.innerHTML = html;
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

function searchProducts() {
  var input = document.getElementById("search-input");
  var searchTerm = input.value;
  searchTerm = searchTerm.toLowerCase();

  if (searchTerm == "") {
    showProducts(products);
    return;
  }

  var filtered = [];
  for (var i = 0; i < products.length; i++) {
    var product = products[i];
    var productName = product.name.toLowerCase();
    var productCategory = product.category.toLowerCase();

    if (
      productName.includes(searchTerm) ||
      productCategory.includes(searchTerm)
    ) {
      filtered.push(product);
    }
  }

  showProducts(filtered);
}

function addToCart(productId) {
  let productFound = false;

  for (let i = 0; i < products.length; i++) {
    if (products[i].id == productId) {
      cartCount = cartCount + 1;
      updateCartCounter();
      alert(products[i].name + " was added to cart!");
      productFound = true;
      break;
    }
  }

  if (productFound == false) {
    alert("Product not found!");
  }
}

function updateCartCounter() {
  var cartCountElement = document.getElementById("cart-count");

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

function closeMenu() {
  const hamburger = document.getElementById("hamburger-menu");
  const menu = document.getElementById("mobile-nav");

  hamburger.classList.remove("active");
  menu.classList.remove("active");
}

document.addEventListener("click", function (event) {
  const hamburger = document.getElementById("hamburger-menu");
  const menu = document.getElementById("mobile-nav");

  if (!hamburger.contains(event.target) && !menu.contains(event.target)) {
    hamburger.classList.remove("active");
    menu.classList.remove("active");
  }
});

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

window.onload = function () {
  setDynamicGreeting();
  showProducts();
  showProducts();
};
