import { useState, useCallback } from 'react';

export function useData<T>() {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (requestFn: () => Promise<T>) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await requestFn();
      setData(result);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'An unknown error occurred'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, error, fetchData };
}
