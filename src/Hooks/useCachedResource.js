import { useState, useCallback } from "react";

export default function useCachedResource({
  fetcher,
  transform,
  cacheTime = 5 * 60 * 1000,
}) {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null,
    timestamp: null,
  });

  const fetchData = useCallback(
    async (forceRefresh = false) => {
      const now = Date.now();

      if (
        !forceRefresh &&
        state.data &&
        state.timestamp &&
        now - state.timestamp < cacheTime
      ) {
        return state.data;
      }

      if (state.loading) {
        return state.data;
      }

      setState((prev) => ({
        ...prev,
        loading: true,
        error: null,
      }));

      try {
        const response = await fetcher();
        const transformed = transform(response);

        setState({
          data: transformed,
          loading: false,
          error: null,
          timestamp: now,
        });

        return transformed;
      } catch (err) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: err.message || "Failed to load data",
        }));

        return null;
      }
    },
    [fetcher, transform, cacheTime, state]
  );

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    get: () => fetchData(false),
    refresh: () => fetchData(true),
  };
}
