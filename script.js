

// Nav and Dark Mode

const nav = document.querySelector(".navigations");
const menu = document.querySelector(".menu");
const light = document.querySelector(".light");
const dark = document.querySelector(".dark");
const darkMode = document.querySelector(".mode");

let state = 1;
menu.addEventListener("click",()=>{
  nav.classList.toggle("activeMenu");
  if(state == 1){
    menu.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    state = 0;
  }else{
    menu.innerHTML = `<i class="fa-solid fa-bars"></i>`;
    state = 1;
  }
})

let mode = "light";
darkMode.addEventListener("click", ()=>{
  if(mode === "light"){
    darkMode.innerHTML = `<i class="fa-solid fa-sun"></i>`;
    document.body.classList.toggle("dark-mode");
    mode = "dark";
  }else{
    darkMode.innerHTML = `<i class="fa-solid fa-moon"></i>`;
    document.body.classList.toggle("dark-mode");
    mode = "light";
  }
})

// Card display funcions

let forYouSection = document.querySelector("#for-you");
let newSection = document.querySelector("#new-products");
let allSection = document.querySelector(".all-products-container");
let productDetails = document.querySelector(".product-details");

function forYou(){
  let card = "";
  forYouItems.forEach(item =>{
    card += `
        <div class="card">
          <div class="favorite-btn">
            <i class="fa-regular fa-heart"></i>
          </div>
          <a href="details.html" onclick="showDetails(${item.id})" class="image">
            <img src=${item.image} alt="${item.nameItem}">
          </a>
          <div class="details">
            <h2>${item.nameItem}</h2>
            <span class="rating">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
            </span>
            <div class="price-cart">
              <span class="price">$${item.price}</span>
              <button onclick="addCart(${item.id})" class="add-to-cart"><i class="fa-solid fa-cart-plus"></i></button>
            </div>
          </div>
        </div>`;
  })
  forYouSection.innerHTML = card;
}

function newSections(){
  let card = "";
  newItems.forEach(item =>{
    card += `
        <div class="card">
          <div class="favorite-btn">
            <i class="fa-regular fa-heart"></i>
          </div>
          <a href="details.html" onclick="showDetails(${item.id})" class="image">
            <img src=${item.image} alt="${item.nameItem}">
          </a>
          <div class="details">
            <h2>${item.nameItem}</h2>
            <span class="rating">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
            </span>
            <div class="price-cart">
              <span class="price">$${item.price}</span>
              <button onclick="addCart(${item.id})" class="add-to-cart"><i class="fa-solid fa-cart-plus"></i></button>
            </div>
          </div>
        </div>`;
  })
  newSection.innerHTML = card;
}

function allProduct(){
  let card = "";
  allItems.forEach(item =>{
    card += `
        <div class="card">
          <div class="favorite-btn">
            <i class="fa-regular fa-heart"></i>
          </div>
          <a href="details.html" onclick="showDetails(${item.id})" class="image">
            <img src=${item.image} alt="${item.nameItem}">
          </a>
          <div class="details">
            <h2>${item.nameItem}</h2>
            <span class="rating">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
            </span>
            <div class="price-cart">
              <span class="price">$${item.price}</span>
              <button onclick="addCart(${item.id})" class="add-to-cart"><i class="fa-solid fa-cart-plus"></i></button>
            </div>
          </div>
        </div>`;
  })
  allSection.innerHTML = card;
}

if(allSection){
  forYou();
  newSections();
  allProduct();
}

let id = localStorage.getItem("id");

function showDetails(id){
  localStorage.setItem("id", id);
}

function displayDetails(){
  allItems.forEach(item =>{
    if(id == item.id){
      productDetails.innerHTML = `
      <div class="details-container">
      <div class="details-top">
        <div class="details-image">
          <img src=${item.image} alt="${item.nameItem}">
        </div>
        
      </div>
      <div class="bottom">
        <div class="name-price">
          <div class="name">
            <span>Name</span>
            <h2>${item.nameItem}</h2>
            <span>Rating</span>
          </div>
          <div class="price">
            <span class="price">$${item.price}</span>
          </div>
        </div>
        <div class="des-div">
          <span>Descriptions</span>
          <p>${item.des}</p>
        </div>
      </div>
      <div class="cart-box">
        <div class="heart"><i class="fa-regular fa-heart"></i></div>
        <button onclick="addCart(${item.id})" class="big-cart-btn">Add to Cart</button>
      </div>
    </div>`;
    }
  })
}

if(productDetails){
  displayDetails();
}


// cart functional

let itemList = document.querySelector(".items-list");
let cartCounter = document.querySelector(".cart-num");
let total = document.querySelector("#total-price");
let quantity = document.querySelector("#quantity");

let cartNum = localStorage.getItem("cartNum") || 0;
let cartItem = JSON.parse(localStorage.getItem("cartItems")) || [];
function addCart(itemId){
  allItems.forEach(item=>{
    if(item.id == itemId){
      cartItem.push(item);
      localStorage.setItem("cartItems", JSON.stringify(cartItem));
      JSON.parse(localStorage.getItem("cartItems"));
      cartNum++;
      localStorage.setItem("cartNum", cartNum);
      cartCounter.innerHTML = cartNum;
      totalPrice =+ item.price;
      localStorage.setItem("totalPrice", totalPrice);
      document.querySelector(".cart-notification").classList.add("show-alert");
      function hideTimer(){
        document.querySelector(".cart-notification").classList.remove("show-alert");
      }
      setTimeout(hideTimer, 2000);
    }
  })
}

function displayCart(){
  let card = "";
    cartItem.forEach((item)=>{
      card += `
        <div class="cart-items">
          <div class="image-cart">
            <img src=${item.image} alt="">
          </div>
          <h2>${item.nameItem}</h2>
          <div class="quantity">
            <button class="decrease">-</button>
            <span>0</span>
            <button class="increase">+</button>
          </div>
          <button onclick="removeItem(${item.id})" class="remove">X</button>
        </div>`;
    })
    itemList.innerHTML = card;
    quantity.innerHTML = cartNum;
    const calculate = cartItem.reduce((prev, curr)=>{
      return `${prev}+${curr.price}`;
    }, 0);
    let totalAmount = Math.floor(eval(calculate));
    total.innerHTML = totalAmount;
}

function removeItem(itemId){
  cartItem = cartItem.filter((x)=> x.id != itemId);
  cartNum = cartNum -= 1;
  localStorage.setItem("cartItems", JSON.stringify(cartItem));
  localStorage.setItem("cartNum", cartNum);
  cartCounter.innerHTML = cartNum;
  displayCart();
}

if(itemList){
  displayCart();
}
cartCounter.innerHTML = cartNum;

