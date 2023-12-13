import { useEffect, useState } from 'react';

function useAsync<R>(promiseCreator: () => Promise<R>): [boolean, R | undefined, unknown | undefined] {
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState<R | undefined>(undefined);
  const [error, setError] = useState<unknown | undefined>(undefined);

  useEffect(() => {
    const process = async () => {
      setLoading(true);
      try {
        const result = await promiseCreator();
        setResolved(result);
      } catch (e: unknown) {
        setError(e);
      }
      setLoading(false);
    };
    process();
  }, [promiseCreator]);

  return [loading, resolved, error];
}

export default useAsync;
