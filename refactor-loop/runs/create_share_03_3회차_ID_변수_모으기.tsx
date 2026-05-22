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
