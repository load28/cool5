# create-share/index.tsx 루프 리팩토링 기록

초기 가중치: ID 변수 모으기 0.88, ChangeEvent 명시 import 0.98, 폼 상태/핸들러 일원화 0.96, 초기값 상수 분리 0.93
시작 점수: -16  {'useState': 4, 'handlers': 4, 'id_vars': 4, 'form_type': 0, 'initial_const': 0, 'React.ChangeEvent': 4}

[ 1] 폼 상태/핸들러 일원화           (미시도) 점수: -5 -> 개선됨
[ 2] 초기값 상수 분리              (미시도) 점수: -4 -> 개선됨
[ 3] ID 변수 모으기              (미시도) 점수:  0 -> 개선됨
[ 4] ChangeEvent 명시 import  (미시도) 점수:  1 -> 개선됨
[ 5] ID 변수 모으기              (가중치) 점수:  1 -> 변화없음 (정체 1/5)
[ 6] ChangeEvent 명시 import  (가중치) 점수:  1 -> 변화없음 (정체 2/5)
[ 7] 폼 상태/핸들러 일원화           (가중치) 점수:  1 -> 변화없음 (정체 3/5)
[ 8] ID 변수 모으기              (가중치) 점수:  1 -> 변화없음 (정체 4/5)
[ 9] ChangeEvent 명시 import  (가중치) 점수:  1 -> 변화없음 (정체 5/5)

>> 모든 fix 시도 후 5회 연속 정체. 멈춤.

9회차 종료 / 개선 4회
최종 점수: 1  {'useState': 1, 'handlers': 0, 'id_vars': 0, 'form_type': 1, 'initial_const': 1, 'React.ChangeEvent': 0}

## 회차별 스냅샷

### 시작

```tsx
import { useState } from 'react';
import { useUser } from '@hooks/useUser';
import useHTMLElementId from '../../utils/useHTMLElementId';

type CreateShareParams = {
  title: string;
  description: string;
  score: number;
  tag: string[];
  authorId: string;
};

const CreateShare: React.FC = () => {
  const id = useHTMLElementId('createShare-form');
  const titleId = `${id}-title`;
  const descriptionId = `${id}-description`;
  const scoreId = `${id}-score`;
  const tagId = `${id}-tag`;

  const { id: currentUserId } = useUser();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [score, setScore] = useState(0);
  const [tag, setTag] = useState('');

  const onChangeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onChangeDescriptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  const onChangeScoreHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScore(Number(e.target.value));
  };
  const onChangeTagHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  };
  const onSubmitHandler = () => {
    const params: CreateShareParams = {
      title,
      description,
      score,
      tag: [tag],
      authorId: currentUserId,
    };
    console.log(params);
  };

  return (
    <form>
      <label htmlFor={titleId}>Title</label>
      <input id={titleId} type="text" onChange={onChangeTitleHandler} />
      <label htmlFor={descriptionId}>Description</label>
      <input id={descriptionId} type="text" onChange={onChangeDescriptionHandler} />
      <label htmlFor={scoreId}>Score</label>
      <input id={scoreId} type="number" onChange={onChangeScoreHandler} />
      <label htmlFor={tagId}>Tag</label>
      <input id={tagId} type="text" onChange={onChangeTagHandler} />
      <button type="button" onClick={onSubmitHandler}>
        Submit
      </button>
    </form>
  );
};

export default CreateShare;
```

---

### 1회차: 폼 상태/핸들러 일원화

```tsx
import { useState } from 'react';
import { useUser } from '@hooks/useUser';
import useHTMLElementId from '../../utils/useHTMLElementId';

type CreateShareFormState = {
  title: string;
  description: string;
  score: number;
  tag: string;
};

type CreateShareParams = {
  title: string;
  description: string;
  score: number;
  tag: string[];
  authorId: string;
};

const CreateShare: React.FC = () => {
  const id = useHTMLElementId('createShare-form');
  const titleId = `${id}-title`;
  const descriptionId = `${id}-description`;
  const scoreId = `${id}-score`;
  const tagId = `${id}-tag`;

  const { id: currentUserId } = useUser();
  const [form, setForm] = useState<CreateShareFormState>({
    title: '',
    description: '',
    score: 0,
    tag: '',
  });

  const onChangeField =
    <K extends keyof CreateShareFormState>(field: K) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      const value = (field === 'score' ? Number(raw) : raw) as CreateShareFormState[K];
      setForm((prev) => ({ ...prev, [field]: value }));
    };
  const onSubmitHandler = () => {
    const params: CreateShareParams = {
      title: form.title,
      description: form.description,
      score: form.score,
      tag: [form.tag],
      authorId: currentUserId,
    };
    console.log(params);
  };

  return (
    <form>
      <label htmlFor={titleId}>Title</label>
      <input id={titleId} type="text" onChange={onChangeField('title')} />
      <label htmlFor={descriptionId}>Description</label>
      <input id={descriptionId} type="text" onChange={onChangeField('description')} />
      <label htmlFor={scoreId}>Score</label>
      <input id={scoreId} type="number" onChange={onChangeField('score')} />
      <label htmlFor={tagId}>Tag</label>
      <input id={tagId} type="text" onChange={onChangeField('tag')} />
      <button type="button" onClick={onSubmitHandler}>
        Submit
      </button>
    </form>
  );
};

export default CreateShare;
```

---

### 2회차: 초기값 상수 분리

```tsx
import { useState } from 'react';
import { useUser } from '@hooks/useUser';
import useHTMLElementId from '../../utils/useHTMLElementId';

type CreateShareFormState = {
  title: string;
  description: string;
  score: number;
  tag: string;
};

type CreateShareParams = {
  title: string;
  description: string;
  score: number;
  tag: string[];
  authorId: string;
};

const INITIAL_FORM_STATE: CreateShareFormState = {
  title: '',
  description: '',
  score: 0,
  tag: '',
};

const CreateShare: React.FC = () => {
  const id = useHTMLElementId('createShare-form');
  const titleId = `${id}-title`;
  const descriptionId = `${id}-description`;
  const scoreId = `${id}-score`;
  const tagId = `${id}-tag`;

  const { id: currentUserId } = useUser();
  const [form, setForm] = useState<CreateShareFormState>(INITIAL_FORM_STATE);

  const onChangeField =
    <K extends keyof CreateShareFormState>(field: K) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      const value = (field === 'score' ? Number(raw) : raw) as CreateShareFormState[K];
      setForm((prev) => ({ ...prev, [field]: value }));
    };
  const onSubmitHandler = () => {
    const params: CreateShareParams = {
      title: form.title,
      description: form.description,
      score: form.score,
      tag: [form.tag],
      authorId: currentUserId,
    };
    console.log(params);
  };

  return (
    <form>
      <label htmlFor={titleId}>Title</label>
      <input id={titleId} type="text" onChange={onChangeField('title')} />
      <label htmlFor={descriptionId}>Description</label>
      <input id={descriptionId} type="text" onChange={onChangeField('description')} />
      <label htmlFor={scoreId}>Score</label>
      <input id={scoreId} type="number" onChange={onChangeField('score')} />
      <label htmlFor={tagId}>Tag</label>
      <input id={tagId} type="text" onChange={onChangeField('tag')} />
      <button type="button" onClick={onSubmitHandler}>
        Submit
      </button>
    </form>
  );
};

export default CreateShare;
```

---

### 3회차: ID 변수 모으기

```tsx
import { useState } from 'react';
import { useUser } from '@hooks/useUser';
import useHTMLElementId from '../../utils/useHTMLElementId';

type CreateShareFormState = {
  title: string;
  description: string;
  score: number;
  tag: string;
};

type CreateShareParams = {
  title: string;
  description: string;
  score: number;
  tag: string[];
  authorId: string;
};

const INITIAL_FORM_STATE: CreateShareFormState = {
  title: '',
  description: '',
  score: 0,
  tag: '',
};

const CreateShare: React.FC = () => {
  const baseId = useHTMLElementId('createShare-form');
  const fieldIds = {
    title: `${baseId}-title`,
    description: `${baseId}-description`,
    score: `${baseId}-score`,
    tag: `${baseId}-tag`,
  };

  const { id: currentUserId } = useUser();
  const [form, setForm] = useState<CreateShareFormState>(INITIAL_FORM_STATE);

  const onChangeField =
    <K extends keyof CreateShareFormState>(field: K) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      const value = (field === 'score' ? Number(raw) : raw) as CreateShareFormState[K];
      setForm((prev) => ({ ...prev, [field]: value }));
    };
  const onSubmitHandler = () => {
    const params: CreateShareParams = {
      title: form.title,
      description: form.description,
      score: form.score,
      tag: [form.tag],
      authorId: currentUserId,
    };
    console.log(params);
  };

  return (
    <form>
      <label htmlFor={fieldIds.title}>Title</label>
      <input id={fieldIds.title} type="text" onChange={onChangeField('title')} />
      <label htmlFor={fieldIds.description}>Description</label>
      <input id={fieldIds.description} type="text" onChange={onChangeField('description')} />
      <label htmlFor={fieldIds.score}>Score</label>
      <input id={fieldIds.score} type="number" onChange={onChangeField('score')} />
      <label htmlFor={fieldIds.tag}>Tag</label>
      <input id={fieldIds.tag} type="text" onChange={onChangeField('tag')} />
      <button type="button" onClick={onSubmitHandler}>
        Submit
      </button>
    </form>
  );
};

export default CreateShare;
```

---

### 4회차: ChangeEvent 명시 import

```tsx
import { useState, ChangeEvent } from 'react';
import { useUser } from '@hooks/useUser';
import useHTMLElementId from '../../utils/useHTMLElementId';

type CreateShareFormState = {
  title: string;
  description: string;
  score: number;
  tag: string;
};

type CreateShareParams = {
  title: string;
  description: string;
  score: number;
  tag: string[];
  authorId: string;
};

const INITIAL_FORM_STATE: CreateShareFormState = {
  title: '',
  description: '',
  score: 0,
  tag: '',
};

const CreateShare: React.FC = () => {
  const baseId = useHTMLElementId('createShare-form');
  const fieldIds = {
    title: `${baseId}-title`,
    description: `${baseId}-description`,
    score: `${baseId}-score`,
    tag: `${baseId}-tag`,
  };

  const { id: currentUserId } = useUser();
  const [form, setForm] = useState<CreateShareFormState>(INITIAL_FORM_STATE);

  const onChangeField =
    <K extends keyof CreateShareFormState>(field: K) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      const value = (field === 'score' ? Number(raw) : raw) as CreateShareFormState[K];
      setForm((prev) => ({ ...prev, [field]: value }));
    };
  const onSubmitHandler = () => {
    const params: CreateShareParams = {
      title: form.title,
      description: form.description,
      score: form.score,
      tag: [form.tag],
      authorId: currentUserId,
    };
    console.log(params);
  };

  return (
    <form>
      <label htmlFor={fieldIds.title}>Title</label>
      <input id={fieldIds.title} type="text" onChange={onChangeField('title')} />
      <label htmlFor={fieldIds.description}>Description</label>
      <input id={fieldIds.description} type="text" onChange={onChangeField('description')} />
      <label htmlFor={fieldIds.score}>Score</label>
      <input id={fieldIds.score} type="number" onChange={onChangeField('score')} />
      <label htmlFor={fieldIds.tag}>Tag</label>
      <input id={fieldIds.tag} type="text" onChange={onChangeField('tag')} />
      <button type="button" onClick={onSubmitHandler}>
        Submit
      </button>
    </form>
  );
};

export default CreateShare;
```

