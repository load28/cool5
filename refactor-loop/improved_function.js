const TAX_RATE = 0.1;
function persistCheckout(customer, cart, total) {
  saveOrderToDatabase(customer.id, cart, total);
  sendConfirmationEmail(customer.email, total);
  updateInventory(cart);
}

function calcShipping(afterDiscount, customer) {
  let shipping = 0;
  if (afterDiscount < FREE_SHIPPING_THRESHOLD) {
    shipping = BASE_SHIPPING_FEE;
  }
  if (customer.region == "island") {
    shipping = shipping + ISLAND_SHIPPING_FEE;
  }
  return shipping;
}

function emitCheckoutLogs(customer, subtotal, discount, total) {
  console.log("checkout for " + customer.name);
  console.log("subtotal=" + subtotal + " discount=" + discount);
  console.log("total=" + total);
}

const ISLAND_SHIPPING_FEE = 5000;
function calcDiscount(subtotal, coupons, customer) {
  let discount = 0;
  for (let j = 0; j < coupons.length; j++) {
    if (coupons[j].type == "percent") {
      discount = discount + subtotal * (coupons[j].value / 100);
    } else {
      discount = discount + coupons[j].value;
    }
  }
  if (customer.grade == "vip") {
    discount = discount + subtotal * VIP_DISCOUNT_RATE;
  }
  return discount;
}

function calcSubtotal(cart) {
  let subtotal = 0;
  for (let i = 0; i < cart.length; i++) {
    let line = cart[i].price * cart[i].quantity;
    if (cart[i].category == "electronics") {
      line = line * ELECTRONICS_SURCHARGE;
    }
    subtotal = subtotal + line;
  }
  return subtotal;
}

function handleCheckout(cart: CartItem[], customer: Customer, coupons: Coupon[], config: Config): number {
  let subtotal = calcSubtotal(cart);
  let discount = calcDiscount(subtotal, coupons, customer);
  let afterDiscount = subtotal - discount;
  let shipping = calcShipping(afterDiscount, customer);
  let tax = afterDiscount * TAX_RATE;
  let total = afterDiscount + shipping + tax;
  emitCheckoutLogs(customer, subtotal, discount, total);
  persistCheckout(customer, cart, total);
  return total;
}
