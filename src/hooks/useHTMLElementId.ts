import { useId } from 'react';

const useHTMLElementId = (prefix: string) => {
  const id = useId();

  return `${prefix}-${id}`;
};

export default useHTMLElementId;
