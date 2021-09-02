var arr = [];
let cartStorage = JSON.parse(localStorage.getItem("CartItem"));
for (let i = 0; i < cartStorage.length; i++) {
  arr.push(cartStorage[i]);
}

//store cart item to storage
function storeItem(a = "My T-shirt", b = "99.00", c = "../img/background.jpg", d = "L", e = "1") {
  //name, cost, img, size, quantity --> plz pass in this order
  let item;
  item = {
    name: a,
    cost: b,
    img: c,
    size: d,
    quantity: e
  };
  for (let a = 0; a < arr.length; a++) {
    if (arr[a].name == item.name) {
      arr[a].quantity++;
      localStorage.setItem("CartItem", JSON.stringify(arr));
      return;
    }
  }
  arr.push(item);
  localStorage.setItem("CartItem", JSON.stringify(arr));
}

//get cart items
function getCartItem() {
  let getArr = JSON.parse(localStorage.getItem("CartItem"));
  for (let i = 0; i < getArr.length; i++) {
    addItem(getArr[i]);
  }
}

//paste item to cart
function addItem(dum) {
  let box = document.querySelector(".item-container");

  let new_item = document.createElement("div");
  box.append(new_item);

  let totalCost = Number(dum.cost) * dum.quantity;
  new_item.outerHTML = `<div class="item" >
  <div class="imageIcon">
    <img src="${dum.img}" alt="">
  </div>
  <p class="name bold">${dum.name}</p>
  <p><b>Cost:</b> Rs <span class="cost">${dum.cost}</span></p>
  <p><b>Size:</b> <span class="size">${dum.size}</span><br>
<span><b>Quantity:</b> &nbsp;&nbsp;&nbsp;<input style="width:60px" type="number" id="quantity" value="${dum.quantity}"></span></p>
<button class="breadcrumb remBtn">Remove</button>
</div>`;
}

//remove item from cart & storage
function removeItem(item) {
  item.remove();
  let z = JSON.parse(localStorage.getItem("CartItem"));
  arr = [];
  for (let k = 0; k < Object.keys(z).length; k++) {
    if (z[k].name == item.children[1].innerText) continue;
    else arr.push(z[k]);
  }
  localStorage.setItem("CartItem", JSON.stringify(arr));
  emptyCheck();
}

//check if cart is empty
function emptyCheck() {
  let z = JSON.parse(localStorage.getItem("CartItem"));
  if (z == null) {
    document.getElementsByClassName("container")[0].style.display = "none";
    document.getElementsByClassName("emptyCart")[0].style.display = "block";
    return false;
  }
  let itemLength = Object.keys(z).length;
  if (itemLength < 1) {
    document.getElementsByClassName("container")[0].style.display = "none";
    document.getElementsByClassName("emptyCart")[0].style.display = "block";
  } else {
    document.getElementsByClassName("container")[0].style.display = "block";
    document.getElementsByClassName("emptyCart")[0].style.display = "none";
  }
}

//update cart items quantity on input change
function updateQuantity() {
  let prod = this.closest(".item");

  let z = JSON.parse(localStorage.getItem("CartItem"));
  arr = [];
  for (let k = 0; k < Object.keys(z).length; k++) {
    if (z[k].name == prod.children[1].innerText) {
      z[k].quantity = this.value;
    }
    arr.push(z[k]);
  }
  localStorage.setItem("CartItem", JSON.stringify(arr));
}
