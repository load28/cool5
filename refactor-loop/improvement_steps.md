# 코드 개선 단계별 기록

미민님 루프(우연 선택 -> 평가 -> 가중치 갱신 -> 잠시 쉼 -> 멈춤)가 복잡한 함수를 단계별로 변형한 기록입니다.

## 시작

```javascript
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

```

---

## 1회차: 함수 역할별 분리

```javascript
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

function handleCheckout(cart, customer, coupons, config) {
  let subtotal = calcSubtotal(cart);
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

```

---

## 2회차: 함수 역할별 분리

```javascript
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

function handleCheckout(cart, customer, coupons, config) {
  let subtotal = calcSubtotal(cart);
  let discount = calcDiscount(subtotal, coupons, customer);
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

```

---

## 3회차: 매직넘버 상수화

```javascript
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

function handleCheckout(cart, customer, coupons, config) {
  let subtotal = calcSubtotal(cart);
  let discount = calcDiscount(subtotal, coupons, customer);
  let afterDiscount = subtotal - discount;
  let shipping = 0;
  if (afterDiscount < 30000) {
    shipping = 3000;
  }
  if (customer.region == "island") {
    shipping = shipping + ISLAND_SHIPPING_FEE;
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

```

---

## 4회차: 입출력·계산 분리

```javascript
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

function handleCheckout(cart, customer, coupons, config) {
  let subtotal = calcSubtotal(cart);
  let discount = calcDiscount(subtotal, coupons, customer);
  let afterDiscount = subtotal - discount;
  let shipping = 0;
  if (afterDiscount < 30000) {
    shipping = 3000;
  }
  if (customer.region == "island") {
    shipping = shipping + ISLAND_SHIPPING_FEE;
  }
  let tax = afterDiscount * 0.1;
  let total = afterDiscount + shipping + tax;
  emitCheckoutLogs(customer, subtotal, discount, total);
  saveOrderToDatabase(customer.id, cart, total);
  sendConfirmationEmail(customer.email, total);
  updateInventory(cart);
  return total;
}

```

---

## 5회차: 함수 역할별 분리

```javascript
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

function handleCheckout(cart, customer, coupons, config) {
  let subtotal = calcSubtotal(cart);
  let discount = calcDiscount(subtotal, coupons, customer);
  let afterDiscount = subtotal - discount;
  let shipping = calcShipping(afterDiscount, customer);
  let tax = afterDiscount * 0.1;
  let total = afterDiscount + shipping + tax;
  emitCheckoutLogs(customer, subtotal, discount, total);
  saveOrderToDatabase(customer.id, cart, total);
  sendConfirmationEmail(customer.email, total);
  updateInventory(cart);
  return total;
}

```

---

## 6회차: 입출력·계산 분리

```javascript
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

function handleCheckout(cart, customer, coupons, config) {
  let subtotal = calcSubtotal(cart);
  let discount = calcDiscount(subtotal, coupons, customer);
  let afterDiscount = subtotal - discount;
  let shipping = calcShipping(afterDiscount, customer);
  let tax = afterDiscount * 0.1;
  let total = afterDiscount + shipping + tax;
  emitCheckoutLogs(customer, subtotal, discount, total);
  persistCheckout(customer, cart, total);
  return total;
}

```

---

## 7회차: 타입 선언 추가

```javascript
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
  let tax = afterDiscount * 0.1;
  let total = afterDiscount + shipping + tax;
  emitCheckoutLogs(customer, subtotal, discount, total);
  persistCheckout(customer, cart, total);
  return total;
}

```

---

## 8회차: 매직넘버 상수화

```javascript
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

```

