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
