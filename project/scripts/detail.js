let cartCount = 0;
let cartItems = [];

function setResponsiveLink() {
  const arrowLink = document.getElementById("arrow-link");

  if (window.innerWidth <= 950) {
    arrowLink.href = "menu-mobile.html";
  } else {
    arrowLink.href = "index.html";
  }
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

function updateCartCounter() {
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = cartCount;

    if (cartCount > 0) {
      cartCountElement.style.display = "flex";
    } else {
      cartCountElement.style.display = "none";
    }
  }
}

function addToCart(productId, quantity = 1) {
  let productFound = false;

  for (let i = 0; i < carouselProducts.length; i++) {
    if (carouselProducts[i].id == productId) {
      const existingItemIndex = cartItems.findIndex(
        (item) => item.id === productId
      );

      if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity += quantity;
      } else {
        cartItems.push({
          id: carouselProducts[i].id,
          name: carouselProducts[i].name,
          category: carouselProducts[i].category,
          price: carouselProducts[i].price.toFixed(2) + "€",
          image: carouselProducts[i].image,
          quantity: quantity,
        });
      }

      cartCount += quantity;
      updateCartCounter();
      saveCartToStorage();
      productFound = true;
      break;
    }
  }

  if (!productFound) {
    console.log("Product not found!");
  }
}

let currentSlide = 0;
let isAnimating = false;
let currentQuantity = 1;

const carouselProducts = [
  {
    id: 1,
    name: "ChocoCarinho",
    category: "Brigadeiro",
    price: 4.6,
    image: "images/chococarinho.webp",
    description:
      "Surprise yourself with this dream cake: light dough, generous filling and a mouth-watering topping. This cake is the right choice for those who seek to enchant and sweeten the day.",
  },
  {
    id: 2,
    name: "Belgian Delight",
    category: "Prestige Mousse",
    price: 5.4,
    image: "images/encanto_belga.webp",
    description:
      "A unique experience with Belgian chocolate mousse and creamy coconut. Each spoonful is a journey to the most refined flavors of European confectionery.",
  },
  {
    id: 3,
    name: "Choco & Coconut",
    category: "Prestige",
    price: 5.1,
    image: "images/choco_coco.webp",
    description:
      "The perfect combination between intense chocolate and tropical coconut. A sweet that awakens the senses and brings affective memories with each bite.",
  },
  {
    id: 4,
    name: "Little Carrot",
    category: "Carrot with Brigadeiro",
    price: 4.5,
    image: "images/cenourinha.webp",
    description:
      "The classic carrot cake reinvented with creamy brigadeiro topping. Homemade flavor that warms the heart and awakens smiles.",
  },
  {
    id: 5,
    name: "Tropical Flavor",
    category: "Coconut & Mango",
    price: 6.2,
    image: "images/encanto_belga.webp",
    description:
      "An explosion of tropical flavors with fresh coconut and sweet mango. Transport yourself to a paradise of exotic and refreshing flavors.",
  },
  {
    id: 6,
    name: "Complete Delight",
    category: "Classic Flavors Mix",
    price: 5.8,
    image: "images/all_cakes.webp",
    description:
      "A special selection of our most beloved flavors. Perfect for those who can't choose just one and want to experience the best of everything.",
  },
];

function initializeCarousel() {
  generateCarouselItems();
  generateCarouselDots();
  updateCarousel();
  updateProductDetails();
}

function generateCarouselItems() {
  const wrapper = document.getElementById("carousel-wrapper");
  if (!wrapper) return;

  let html = "";
  const extendedProducts = [
    ...carouselProducts,
    ...carouselProducts,
    ...carouselProducts,
  ];

  extendedProducts.forEach((product, index) => {
    html += `
    <div class="carousel-item" data-index="${index}" data-product-id="${product.id}">
    <div class="carousel-product">
    <div class="carousel-product-image">
    <img src="${product.image}" alt="${product.name}" loading="lazy">
    </div>
    <h3 class="carousel-product-name">${product.name}</h3>
    <p class="carousel-product-category">${product.category}</p>
    </div>
    </div>
    `;
  });

  wrapper.innerHTML = html;

  const items = wrapper.querySelectorAll(".carousel-item");
  items.forEach((item) => {
    item.addEventListener("click", () => {
      if (!isAnimating) {
        const productId = parseInt(item.dataset.productId);
        selectCarouselItem(productId);
      }
    });
  });
}

function generateCarouselDots() {
  const dotsContainer = document.getElementById("carousel-dots");
  if (!dotsContainer) return;

  let html = "";
  carouselProducts.forEach((_, index) => {
    html += `<div class="carousel-dot" data-slide="${index}"></div>`;
  });

  dotsContainer.innerHTML = html;

  const dots = dotsContainer.querySelectorAll(".carousel-dot");
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      if (!isAnimating) {
        const slideIndex = parseInt(dot.dataset.slide);
        goToSlide(slideIndex);
      }
    });
  });
}

function updateCarousel() {
  const items = document.querySelectorAll(".carousel-item");
  const dots = document.querySelectorAll(".carousel-dot");
  const totalProducts = carouselProducts.length;

  if (items.length === 0) return;

  items.forEach((item) => {
    item.classList.remove("active", "prev", "next", "hidden");
    item.classList.add("hidden");
  });

  const centerIndex = totalProducts + (currentSlide % totalProducts);
  const prevIndex = centerIndex - 1;
  const nextIndex = centerIndex + 1;

  if (items[prevIndex]) {
    items[prevIndex].classList.remove("hidden");
    items[prevIndex].classList.add("prev");
  }

  if (items[centerIndex]) {
    items[centerIndex].classList.remove("hidden");
    items[centerIndex].classList.add("active");
  }

  if (items[nextIndex]) {
    items[nextIndex].classList.remove("hidden");
    items[nextIndex].classList.add("next");
  }

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide % totalProducts);
  });

  updateProductDetails();
}

function updateProductDetails() {
  const currentProduct =
    carouselProducts[currentSlide % carouselProducts.length];

  const titleElement = document.getElementById("product-title");
  const categoryElement = document.getElementById("product-category");
  const descriptionElement = document.getElementById("product-description");
  const priceElement = document.getElementById("product-price");
  const quantityElement = document.getElementById("quantity-display");

  if (titleElement && categoryElement && descriptionElement && priceElement) {
    const detailsCard = document.querySelector(".product-info-card");
    if (detailsCard) {
      detailsCard.classList.add("product-changing");

      setTimeout(() => {
        titleElement.textContent = currentProduct.name;
        categoryElement.textContent = currentProduct.category;
        descriptionElement.textContent = currentProduct.description;

        currentQuantity = 1;
        if (quantityElement) {
          quantityElement.textContent = currentQuantity;
        }

        updatePrice();

        detailsCard.classList.remove("product-changing");
        detailsCard.classList.add("product-changed");

        setTimeout(() => {
          detailsCard.classList.remove("product-changed");
        }, 500);
      }, 150);
    }
  }
}

function nextSlide() {
  if (isAnimating) return;

  isAnimating = true;
  currentSlide = (currentSlide + 1) % carouselProducts.length;

  setTimeout(() => {
    updateCarousel();
    isAnimating = false;
  }, 100);
}

function previousSlide() {
  if (isAnimating) return;

  isAnimating = true;
  currentSlide =
    (currentSlide - 1 + carouselProducts.length) % carouselProducts.length;

  setTimeout(() => {
    updateCarousel();
    isAnimating = false;
  }, 100);
}

function goToSlide(index) {
  if (isAnimating || index === currentSlide) return;

  isAnimating = true;
  currentSlide = index;

  setTimeout(() => {
    updateCarousel();
    isAnimating = false;
  }, 100);
}

function selectCarouselItem(productId) {
  const productIndex = carouselProducts.findIndex((p) => p.id === productId);
  if (productIndex !== -1 && productIndex !== currentSlide) {
    goToSlide(productIndex);
  }
  addToCart(productId, 1);
}

function goToProduct(productId) {
  const productIndex = carouselProducts.findIndex((p) => p.id === productId);
  if (productIndex !== -1) {
    goToSlide(productIndex);

    const carouselSection = document.querySelector(".carousel-section");
    if (carouselSection) {
      carouselSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  }
}

function increaseQuantity() {
  currentQuantity++;
  updateQuantityDisplay();
}

function decreaseQuantity() {
  if (currentQuantity > 1) {
    currentQuantity--;
    updateQuantityDisplay();
  }
}

function updateQuantityDisplay() {
  const quantityElement = document.getElementById("quantity-display");
  if (quantityElement) {
    quantityElement.textContent = currentQuantity;

    quantityElement.style.transform = "scale(1.2)";
    quantityElement.style.color = "#52190A";

    setTimeout(() => {
      quantityElement.style.transform = "scale(1)";
      quantityElement.style.color = "#632414";
    }, 200);
  }

  updatePrice();
}

function updatePrice() {
  const currentProduct =
    carouselProducts[currentSlide % carouselProducts.length];
  const priceElement = document.getElementById("product-price");

  if (priceElement && currentProduct) {
    const totalPrice = (currentProduct.price * currentQuantity).toFixed(2);
    priceElement.textContent = `${totalPrice.replace(".", ",")}€`;

    priceElement.style.transform = "scale(1.1)";
    priceElement.style.color = "#52190A";

    setTimeout(() => {
      priceElement.style.transform = "scale(1)";
      priceElement.style.color = "#632414";
    }, 300);
  }
}

function addCurrentProductToCart() {
  const currentProduct =
    carouselProducts[currentSlide % carouselProducts.length];

  const button = document.querySelector(".add-to-cart-btn");
  if (button) {
    button.style.transform = "scale(0.95)";
    button.textContent = "Added!";

    setTimeout(() => {
      button.style.transform = "scale(1)";
      button.textContent = "Add to Cart";
    }, 1000);
  }

  addToCart(currentProduct.id, currentQuantity);

  setTimeout(() => {
    currentQuantity = 1;
    updateQuantityDisplay();
  }, 1500);
}

function viewCart() {}

function handleKeyPress(event) {
  if (isAnimating) return;

  switch (event.key) {
    case "ArrowLeft":
      previousSlide();
      break;
    case "ArrowRight":
      nextSlide();
      break;
    case "+":
    case "=":
      increaseQuantity();
      break;
    case "-":
      decreaseQuantity();
      break;
    case "Enter":
      addCurrentProductToCart();
      break;
  }
}

let touchStartX = 0;
let touchEndX = 0;

function handleTouchStart(event) {
  touchStartX = event.changedTouches[0].screenX;
}

function handleTouchEnd(event) {
  touchEndX = event.changedTouches[0].screenX;
  handleSwipe();
}

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > swipeThreshold && !isAnimating) {
    if (diff > 0) {
      nextSlide();
    } else {
      previousSlide();
    }
  }
}

window.onload = function () {
  setResponsiveLink();
  updateCartCounter();
  loadCartFromStorage();

  setTimeout(() => {
    initializeCarousel();
    loadProductFromURL();
  }, 100);

  document.addEventListener("keydown", handleKeyPress);

  const carouselWrapper = document.getElementById("carousel-wrapper");
  if (carouselWrapper) {
    carouselWrapper.addEventListener("touchstart", handleTouchStart);
    carouselWrapper.addEventListener("touchend", handleTouchEnd);
  }
};

window.addEventListener("resize", setResponsiveLink);

function getURLParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

function loadProductFromURL() {
  const productId = getURLParameter("id");

  if (productId) {
    const productIndex = carouselProducts.findIndex((p) => p.id == productId);

    if (productIndex !== -1) {
      currentSlide = productIndex;
      updateCarousel();
      updateProductDetails();
      console.log(`Product loaded: ${carouselProducts[productIndex].name}`);
    } else {
      console.log("Product not found, loading first product");
      currentSlide = 0;
    }
  } else {
    console.log("No product ID in URL, loading first product");
    currentSlide = 0;
  }
}
