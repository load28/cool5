"""create-share/index.tsx 전용 루프식 리팩토링.

원본 refactor_loop.py 와 같은 사이클(우연 선택 -> 점수 평가 ->
가중치 갱신 -> 잠시 쉼 -> 정체 시 멈춤)을 그대로 쓰되, fix 후보 4개를
이 파일 구조에 맞춰 새로 정의했다.
"""

import os
import random
import re


TARGET = os.path.join(
    os.path.dirname(__file__), "..", "src", "pages", "create-share", "index.tsx"
)
SNAPSHOT_DIR = os.path.join(os.path.dirname(__file__), "runs")
LOG_FILE = os.path.join(os.path.dirname(__file__), "create_share_steps.md")


FIXES = ["collect_ids", "import_change_event", "consolidate_form", "extract_initial_state"]

LABEL = {
    "collect_ids": "ID 변수 모으기",
    "import_change_event": "ChangeEvent 명시 import",
    "consolidate_form": "폼 상태/핸들러 일원화",
    "extract_initial_state": "초기값 상수 분리",
}

RANDOM_RATIO = 0.05
WEIGHT_STEP = 0.05
REST_ROUNDS = 3
STOP_PATIENCE = 5
MAX_ROUNDS = 80


def measure(code):
    state_count = len(re.findall(r"useState\s*[<(]", code))
    handler_count = len(re.findall(r"const\s+onChange\w*Handler\s*=", code))
    id_var_count = len(re.findall(r"const\s+\w+Id\s*=\s*`\$\{", code))
    has_form_state_type = 1 if "type CreateShareFormState" in code else 0
    has_initial_const = 1 if "INITIAL_FORM_STATE" in code else 0
    react_change_event = len(re.findall(r"React\.ChangeEvent", code))

    score = (
        -state_count
        - handler_count
        - id_var_count
        + has_form_state_type
        + has_initial_const
        - react_change_event
    )

    detail = {
        "useState": state_count,
        "handlers": handler_count,
        "id_vars": id_var_count,
        "form_type": has_form_state_type,
        "initial_const": has_initial_const,
        "React.ChangeEvent": react_change_event,
    }
    return score, detail


def fix_collect_ids(code):
    pattern = (
        r"  const id = useHTMLElementId\('createShare-form'\);\n"
        r"  const titleId = `\$\{id\}-title`;\n"
        r"  const descriptionId = `\$\{id\}-description`;\n"
        r"  const scoreId = `\$\{id\}-score`;\n"
        r"  const tagId = `\$\{id\}-tag`;\n"
    )
    replacement = (
        "  const baseId = useHTMLElementId('createShare-form');\n"
        "  const fieldIds = {\n"
        "    title: `${baseId}-title`,\n"
        "    description: `${baseId}-description`,\n"
        "    score: `${baseId}-score`,\n"
        "    tag: `${baseId}-tag`,\n"
        "  };\n"
    )
    new_code, n = re.subn(pattern, replacement, code, count=1)
    if n == 0:
        return code
    for field in ("title", "description", "score", "tag"):
        old_var = f"{field}Id"
        new_code = re.sub(
            r"(\b(?:htmlFor|id)=)\{" + old_var + r"\}",
            r"\1{fieldIds." + field + "}",
            new_code,
        )
    return new_code


def fix_import_change_event(code):
    if "React.ChangeEvent" not in code:
        return code
    if re.search(r"import\s+\{[^}]*\bChangeEvent\b[^}]*\}\s+from\s+'react'", code):
        new_code = code
    else:
        new_code, n = re.subn(
            r"import\s+\{\s*useState\s*\}\s+from\s+'react';",
            "import { useState, ChangeEvent } from 'react';",
            code,
            count=1,
        )
        if n == 0:
            return code
    new_code = new_code.replace("React.ChangeEvent", "ChangeEvent")
    return new_code


def fix_consolidate_form(code):
    if "const [title, setTitle]" not in code:
        return code

    if "type CreateShareFormState" not in code:
        type_block = (
            "type CreateShareFormState = {\n"
            "  title: string;\n"
            "  description: string;\n"
            "  score: number;\n"
            "  tag: string;\n"
            "};\n\n"
        )
        code = re.sub(
            r"(type CreateShareParams = \{)",
            type_block + r"\1",
            code,
            count=1,
        )

    state_block = (
        r"  const \[title, setTitle\] = useState\(''\);\n"
        r"  const \[description, setDescription\] = useState\(''\);\n"
        r"  const \[score, setScore\] = useState\(0\);\n"
        r"  const \[tag, setTag\] = useState\(''\);\n"
    )
    state_replacement = (
        "  const [form, setForm] = useState<CreateShareFormState>({\n"
        "    title: '',\n"
        "    description: '',\n"
        "    score: 0,\n"
        "    tag: '',\n"
        "  });\n"
    )
    code = re.sub(state_block, state_replacement, code, count=1)

    event_type = "React.ChangeEvent<HTMLInputElement>"
    if "ChangeEvent<HTMLInputElement>" in code and "React.ChangeEvent" not in code:
        event_type = "ChangeEvent<HTMLInputElement>"

    handler_block = re.compile(
        r"  const onChangeTitleHandler = \(e: (?:React\.)?ChangeEvent<HTMLInputElement>\) => \{\n"
        r"    setTitle\(e\.target\.value\);\n"
        r"  \};\n"
        r"  const onChangeDescriptionHandler = \(e: (?:React\.)?ChangeEvent<HTMLInputElement>\) => \{\n"
        r"    setDescription\(e\.target\.value\);\n"
        r"  \};\n"
        r"  const onChangeScoreHandler = \(e: (?:React\.)?ChangeEvent<HTMLInputElement>\) => \{\n"
        r"    setScore\(Number\(e\.target\.value\)\);\n"
        r"  \};\n"
        r"  const onChangeTagHandler = \(e: (?:React\.)?ChangeEvent<HTMLInputElement>\) => \{\n"
        r"    setTag\(e\.target\.value\);\n"
        r"  \};\n"
    )
    factory = (
        "  const onChangeField =\n"
        "    <K extends keyof CreateShareFormState>(field: K) =>\n"
        "    (e: " + event_type + ") => {\n"
        "      const raw = e.target.value;\n"
        "      const value = (field === 'score' ? Number(raw) : raw) as CreateShareFormState[K];\n"
        "      setForm((prev) => ({ ...prev, [field]: value }));\n"
        "    };\n"
    )
    code = handler_block.sub(factory, code, count=1)

    submit_old = (
        "    const params: CreateShareParams = {\n"
        "      title,\n"
        "      description,\n"
        "      score,\n"
        "      tag: [tag],\n"
        "      authorId: currentUserId,\n"
        "    };\n"
    )
    submit_new = (
        "    const params: CreateShareParams = {\n"
        "      title: form.title,\n"
        "      description: form.description,\n"
        "      score: form.score,\n"
        "      tag: [form.tag],\n"
        "      authorId: currentUserId,\n"
        "    };\n"
    )
    code = code.replace(submit_old, submit_new)

    for field in ("title", "description", "score", "tag"):
        code = code.replace(
            f"onChange={{onChange{field.capitalize()}Handler}}",
            f"onChange={{onChangeField('{field}')}}",
        )
    return code


def fix_extract_initial_state(code):
    if "INITIAL_FORM_STATE" in code:
        return code
    if "useState<CreateShareFormState>({" not in code:
        return code

    inline_block = (
        "  const [form, setForm] = useState<CreateShareFormState>({\n"
        "    title: '',\n"
        "    description: '',\n"
        "    score: 0,\n"
        "    tag: '',\n"
        "  });\n"
    )
    if inline_block not in code:
        return code

    code = code.replace(
        inline_block,
        "  const [form, setForm] = useState<CreateShareFormState>(INITIAL_FORM_STATE);\n",
    )
    const_block = (
        "const INITIAL_FORM_STATE: CreateShareFormState = {\n"
        "  title: '',\n"
        "  description: '',\n"
        "  score: 0,\n"
        "  tag: '',\n"
        "};\n\n"
    )
    code = re.sub(
        r"(const CreateShare: React\.FC = \(\) => \{)",
        const_block + r"\1",
        code,
        count=1,
    )
    return code


FIX_FUNCS = {
    "collect_ids": fix_collect_ids,
    "import_change_event": fix_import_change_event,
    "consolidate_form": fix_consolidate_form,
    "extract_initial_state": fix_extract_initial_state,
}


def make_initial_weights():
    return {f: 1.0 + random.uniform(-0.15, 0.15) for f in FIXES}


def choose(weights, resting):
    available = [f for f in FIXES if resting.get(f, 0) == 0]
    if not available:
        available = FIXES
    if random.random() < RANDOM_RATIO:
        return random.choice(available), "우연"
    total = sum(weights[f] for f in available)
    point = random.uniform(0, total)
    upto = 0.0
    for f in available:
        upto += weights[f]
        if point <= upto:
            return f, "가중치"
    return available[-1], "가중치"


def run(code):
    weights = make_initial_weights()
    resting = {}
    tried = set()
    snapshots = [("시작", code)]

    score0, detail0 = measure(code)
    log = []
    log.append(
        "초기 가중치: "
        + ", ".join(f"{LABEL[f]} {w:.2f}" for f, w in weights.items())
    )
    log.append(f"시작 점수: {score0}  {detail0}")
    log.append("")

    good = 0
    streak = 0
    stopped = None

    for r in range(1, MAX_ROUNDS + 1):
        for f in list(resting.keys()):
            if resting[f] > 0:
                resting[f] -= 1

        untried = [f for f in FIXES if f not in tried]
        if untried:
            fix = random.choice(untried)
            how = "미시도"
        else:
            fix, how = choose(weights, resting)
        tried.add(fix)

        before, _ = measure(code)
        new_code = FIX_FUNCS[fix](code)
        after, after_detail = measure(new_code)
        improved = after > before

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

        log.append(
            f"[{r:2d}] {LABEL[fix]:<22} ({how}) 점수:{after:>3} -> {mark}"
        )

        if streak >= STOP_PATIENCE and len(tried) == len(FIXES):
            stopped = r
            log.append(f"\n>> 모든 fix 시도 후 {STOP_PATIENCE}회 연속 정체. 멈춤.")
            break

    score1, detail1 = measure(code)
    log.append("")
    log.append(f"{stopped or MAX_ROUNDS}회차 종료 / 개선 {good}회")
    log.append(f"최종 점수: {score1}  {detail1}")
    return "\n".join(log), snapshots, code


def safe_filename(title):
    return re.sub(r"[^0-9A-Za-z가-힣_-]+", "_", title)


def main():
    with open(TARGET, encoding="utf-8") as fp:
        original = fp.read()

    logtext, snaps, final = run(original)
    print(logtext)

    os.makedirs(SNAPSHOT_DIR, exist_ok=True)
    for old in os.listdir(SNAPSHOT_DIR):
        if old.startswith("create_share_") and old.endswith(".tsx"):
            os.remove(os.path.join(SNAPSHOT_DIR, old))
    for i, (title, snap) in enumerate(snaps):
        path = os.path.join(SNAPSHOT_DIR, f"create_share_{i:02d}_{safe_filename(title)}.tsx")
        with open(path, "w", encoding="utf-8") as fp:
            fp.write(snap)

    with open(LOG_FILE, "w", encoding="utf-8") as fp:
        fp.write("# create-share/index.tsx 루프 리팩토링 기록\n\n")
        fp.write(logtext)
        fp.write("\n\n## 회차별 스냅샷\n\n")
        for i, (title, snap) in enumerate(snaps):
            fp.write(f"### {title}\n\n```tsx\n{snap}```\n\n")
            if i < len(snaps) - 1:
                fp.write("---\n\n")

    with open(TARGET, "w", encoding="utf-8") as fp:
        fp.write(final)


if __name__ == "__main__":
    main()
