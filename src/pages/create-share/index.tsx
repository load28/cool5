import { useState } from 'react';
import useHTMLElementId from '../../hooks/useHTMLElementId';
import { useUserStore } from '../../stores/user';

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

  const currentUserId = useUserStore((state) => state.user?.id);
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
      authorId: currentUserId!,
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
