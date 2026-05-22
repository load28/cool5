function handleCheckout(cart, customer, coupons, config) {
  let subtotal = 0;
  for (let i = 0; i < cart.length; i++) {
    let line = cart[i].price * cart[i].quantity;
    if (cart[i].category == "electronics") {
      line = line * 1.05;
    }
    subtotal = subtotal + line;
  }
  let discount = 0;
  for (let j = 0; j < coupons.length; j++) {
    if (coupons[j].type == "percent") {
      discount = discount + subtotal * (coupons[j].value / 100);
    } else {
      discount = discount + coupons[j].value;
    }
  }
  if (customer.grade == "vip") {
    discount = discount + subtotal * 0.07;
  }
  let afterDiscount = subtotal - discount;
  let shipping = 0;
  if (afterDiscount < 30000) {
    shipping = 3000;
  }
  if (customer.region == "island") {
    shipping = shipping + 5000;
  }
  let tax = afterDiscount * 0.1;
  let total = afterDiscount + shipping + tax;
  console.log("checkout for " + customer.name);
  console.log("subtotal=" + subtotal + " discount=" + discount);
  console.log("total=" + total);
  saveOrderToDatabase(customer.id, cart, total);
  sendConfirmationEmail(customer.email, total);
  updateInventory(cart);
  return total;
}
