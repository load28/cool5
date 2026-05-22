import random
import re


FIXES = ["add_types", "extract_consts", "separate_io", "split_roles"]

LABEL = {
    "add_types": "타입 선언 추가",
    "extract_consts": "매직넘버 상수화",
    "separate_io": "입출력·계산 분리",
    "split_roles": "함수 역할별 분리",
}

RANDOM_RATIO = 0.05
WEIGHT_STEP = 0.05
REST_ROUNDS = 3
STOP_PATIENCE = 3
MAX_ROUNDS = 60


def measure(code):
    lines = code.split("\n")
    body_lines = [ln for ln in lines if not ln.strip().startswith("const ")]
    body = "\n".join(body_lines)

    params = re.findall(r'function\s+\w+\s*\(([^)]*)\)', code)
    untyped_params = 0
    for p in params:
        for one in p.split(','):
            one = one.strip()
            if one and ':' not in one:
                untyped_params += 1

    magic = len(re.findall(r'[*+\-/]\s*\d+\.?\d*', body))

    io_in_main = 0
    main_match = re.search(r'function handleCheckout[\s\S]*?\n\}', code)
    if main_match:
        io_in_main = len(re.findall(
            r'(console\.log|saveOrderToDatabase|'
            r'sendConfirmationEmail|updateInventory)', main_match.group()))

    helper_funcs = len(re.findall(r'function\s+\w+', code)) - 1
    role_excess = max(0, 8 - helper_funcs * 2)

    explicit = -untyped_params - magic
    separation = -io_in_main - role_excess
    return explicit, separation, {
        "untyped_params": untyped_params, "magic": magic,
        "io_in_main": io_in_main, "role_excess": role_excess,
    }


def fix_add_types(code):
    if "cart, customer, coupons, config" in code:
        return code.replace(
            "handleCheckout(cart, customer, coupons, config)",
            "handleCheckout(cart: CartItem[], customer: Customer, "
            "coupons: Coupon[], config: Config): number")
    return code


def fix_extract_consts(code):
    consts = [
        ("1.05", "ELECTRONICS_SURCHARGE"),
        ("0.07", "VIP_DISCOUNT_RATE"),
        ("30000", "FREE_SHIPPING_THRESHOLD"),
        ("3000", "BASE_SHIPPING_FEE"),
        ("5000", "ISLAND_SHIPPING_FEE"),
        ("0.1", "TAX_RATE"),
    ]
    for value, name in consts:
        if name not in code and re.search(r'[*+\-]\s*' + re.escape(value) + r'\b', code):
            header = f"const {name} = {value};\n"
            code = header + code
            code = re.sub(r'([*+\-]\s*)' + re.escape(value) + r'\b',
                          r'\1' + name, code, count=1)
            return code
    return code


def fix_separate_io(code):
    if "function emitCheckoutLogs" not in code and "console.log" in code:
        helper = (
            "function emitCheckoutLogs(customer, subtotal, discount, total) {\n"
            "  console.log(\"checkout for \" + customer.name);\n"
            "  console.log(\"subtotal=\" + subtotal + \" discount=\" + discount);\n"
            "  console.log(\"total=\" + total);\n"
            "}\n\n")
        code = re.sub(
            r'  console\.log\("checkout for " \+ customer\.name\);\n'
            r'  console\.log\("subtotal=" \+ subtotal \+ " discount=" \+ discount\);\n'
            r'  console\.log\("total=" \+ total\);\n',
            '  emitCheckoutLogs(customer, subtotal, discount, total);\n',
            code)
        return helper + code
    if "function persistCheckout" not in code and "saveOrderToDatabase" in code:
        helper = (
            "function persistCheckout(customer, cart, total) {\n"
            "  saveOrderToDatabase(customer.id, cart, total);\n"
            "  sendConfirmationEmail(customer.email, total);\n"
            "  updateInventory(cart);\n"
            "}\n\n")
        code = re.sub(
            r'  saveOrderToDatabase\(customer\.id, cart, total\);\n'
            r'  sendConfirmationEmail\(customer\.email, total\);\n'
            r'  updateInventory\(cart\);\n',
            '  persistCheckout(customer, cart, total);\n',
            code)
        return helper + code
    return code


def fix_split_roles(code):
    if "function calcSubtotal" not in code and "let subtotal = 0;" in code:
        helper = (
            "function calcSubtotal(cart) {\n"
            "  let subtotal = 0;\n"
            "  for (let i = 0; i < cart.length; i++) {\n"
            "    let line = cart[i].price * cart[i].quantity;\n"
            "    if (cart[i].category == \"electronics\") {\n"
            "      line = line * ELECTRONICS_SURCHARGE;\n"
            "    }\n"
            "    subtotal = subtotal + line;\n"
            "  }\n"
            "  return subtotal;\n"
            "}\n\n")
        code = re.sub(
            r'  let subtotal = 0;\n'
            r'  for \(let i = 0; i < cart\.length; i\+\+\) \{\n'
            r'    let line = cart\[i\]\.price \* cart\[i\]\.quantity;\n'
            r'    if \(cart\[i\]\.category == "electronics"\) \{\n'
            r'      line = line \* [\w.]+;\n'
            r'    \}\n'
            r'    subtotal = subtotal \+ line;\n'
            r'  \}\n',
            '  let subtotal = calcSubtotal(cart);\n',
            code)
        return helper + code
    if "function calcDiscount" not in code and "let discount = 0;" in code:
        helper = (
            "function calcDiscount(subtotal, coupons, customer) {\n"
            "  let discount = 0;\n"
            "  for (let j = 0; j < coupons.length; j++) {\n"
            "    if (coupons[j].type == \"percent\") {\n"
            "      discount = discount + subtotal * (coupons[j].value / 100);\n"
            "    } else {\n"
            "      discount = discount + coupons[j].value;\n"
            "    }\n"
            "  }\n"
            "  if (customer.grade == \"vip\") {\n"
            "    discount = discount + subtotal * VIP_DISCOUNT_RATE;\n"
            "  }\n"
            "  return discount;\n"
            "}\n\n")
        code = re.sub(
            r'  let discount = 0;\n'
            r'  for \(let j = 0; j < coupons\.length; j\+\+\) \{\n'
            r'    if \(coupons\[j\]\.type == "percent"\) \{\n'
            r'      discount = discount \+ subtotal \* \(coupons\[j\]\.value / [\w.]+\);\n'
            r'    \} else \{\n'
            r'      discount = discount \+ coupons\[j\]\.value;\n'
            r'    \}\n'
            r'  \}\n'
            r'  if \(customer\.grade == "vip"\) \{\n'
            r'    discount = discount \+ subtotal \* [\w.]+;\n'
            r'  \}\n',
            '  let discount = calcDiscount(subtotal, coupons, customer);\n',
            code)
        return helper + code
    if "function calcShipping" not in code and "let shipping = 0;" in code:
        helper = (
            "function calcShipping(afterDiscount, customer) {\n"
            "  let shipping = 0;\n"
            "  if (afterDiscount < FREE_SHIPPING_THRESHOLD) {\n"
            "    shipping = BASE_SHIPPING_FEE;\n"
            "  }\n"
            "  if (customer.region == \"island\") {\n"
            "    shipping = shipping + ISLAND_SHIPPING_FEE;\n"
            "  }\n"
            "  return shipping;\n"
            "}\n\n")
        code = re.sub(
            r'  let shipping = 0;\n'
            r'  if \(afterDiscount < [\w.]+\) \{\n'
            r'    shipping = [\w.]+;\n'
            r'  \}\n'
            r'  if \(customer\.region == "island"\) \{\n'
            r'    shipping = shipping \+ [\w.]+;\n'
            r'  \}\n',
            '  let shipping = calcShipping(afterDiscount, customer);\n',
            code)
        return helper + code
    return code


FIX_FUNCS = {
    "add_types": fix_add_types,
    "extract_consts": fix_extract_consts,
    "separate_io": fix_separate_io,
    "split_roles": fix_split_roles,
}


def make_initial_weights():
    return {f: 1.0 + random.uniform(-0.15, 0.15) for f in FIXES}


def choose(weights, resting):
    available = [f for f in FIXES if resting.get(f, 0) == 0]
    if not available:
        available = FIXES
    if random.random() < RANDOM_RATIO:
        return random.choice(available), "uyeon"
    total = sum(weights[f] for f in available)
    point = random.uniform(0, total)
    upto = 0.0
    for f in available:
        upto += weights[f]
        if point <= upto:
            return f, "gajungchi"
    return available[-1], "gajungchi"


def run(code):
    weights = make_initial_weights()
    resting = {}
    snapshots = [("시작", code)]

    e0, s0, d0 = measure(code)
    log = []
    log.append("초기 가중치: " + ", ".join(
        f"{LABEL[f]} {w:.2f}" for f, w in weights.items()))
    log.append(f"시작 상태  명시성:{e0} 분리:{s0}  "
               f"(타입없음 {d0['untyped_params']}, 매직넘버 {d0['magic']}, "
               f"입출력 {d0['io_in_main']}, 역할과다 {d0['role_excess']})")
    log.append("")

    good = 0
    streak = 0
    stopped = None

    for r in range(1, MAX_ROUNDS + 1):
        for f in list(resting.keys()):
            if resting[f] > 0:
                resting[f] -= 1

        fix, how = choose(weights, resting)
        be, bs, _ = measure(code)
        new_code = FIX_FUNCS[fix](code)
        ae, asep, _ = measure(new_code)
        before_score = 0.3 * be + 0.7 * bs
        after_score = 0.3 * ae + 0.7 * asep
        improved = after_score > before_score

        if improved:
            code = new_code
            weights[fix] += WEIGHT_STEP
            good += 1
            streak = 0
            mark = "개선됨"
            snapshots.append((f"{r}회차: {LABEL[fix]}", code))
        else:
            weights[fix] = max(0.05, weights[fix] - WEIGHT_STEP)
            resting[fix] = REST_ROUNDS
            streak += 1
            mark = f"변화없음 (정체 {streak}/{STOP_PATIENCE})"

        src = "우연" if how == "uyeon" else "가중치"
        log.append(f"[{r:2d}] {LABEL[fix]:<12} ({src}) "
                   f"명시성:{ae:>3} 분리:{asep:>3} -> {mark}")

        if streak >= STOP_PATIENCE:
            stopped = r
            log.append(f"\n>> {STOP_PATIENCE}회 연속 정체. 다 됐다고 보고 멈춤.")
            break

    e1, s1, d1 = measure(code)
    log.append("")
    log.append(f"{stopped or MAX_ROUNDS}회차 종료 / 개선 {good}회")
    log.append(f"최종 상태  명시성:{e1} 분리:{s1}  "
               f"(타입없음 {d1['untyped_params']}, 매직넘버 {d1['magic']}, "
               f"입출력 {d1['io_in_main']}, 역할과다 {d1['role_excess']})")
    return "\n".join(log), snapshots, code


if __name__ == "__main__":
    with open("complex_function.js") as fp:
        original = fp.read()

    logtext, snaps, final = run(original)
    print(logtext)

    with open("improved_function.js", "w") as fp:
        fp.write(final)

    with open("improvement_steps.md", "w") as fp:
        fp.write("# 코드 개선 단계별 기록\n\n")
        fp.write("미민님 루프(우연 선택 -> 평가 -> 가중치 갱신 -> "
                 "잠시 쉼 -> 멈춤)가 복잡한 함수를 단계별로 변형한 기록입니다.\n\n")
        for i, (title, snap) in enumerate(snaps):
            fp.write(f"## {title}\n\n```javascript\n{snap}\n```\n\n")
            if i < len(snaps) - 1:
                fp.write("---\n\n")
