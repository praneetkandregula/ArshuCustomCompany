function checkoutList(name, cost, quantity){
  let prodList = document.querySelector('.prodList');
  let total = cost*quantity;
  let div = document.createElement('div');
  prodList.append(div);
  div.outerHTML = `<p> <span class="prodName">${name}</span> <span class="price">Rs ${total}</span> </p>`
}

let z = JSON.parse(localStorage.getItem("CartItem"));
let total = 0;
for( let k = 0; k < z.length; k++) {
  checkoutList(
    z[k].name,
    z[k].cost,
    z[k].quantity
  )
  total = total + z[k].cost*z[k].quantity;
}
document.querySelector('.price.bold').innerHTML = `Rs ${total}`;
