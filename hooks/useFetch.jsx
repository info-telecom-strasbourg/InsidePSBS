import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [res, setRes] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch(url);
  }, [url]);

  const fetch = (url) => {
    setIsLoading(true);
    setRes(null);
    setError(false);

    const source = axios.CancelToken.source();

    axios
      .get(url, { cancelToken: source.token })
      .then((res) => res.data && setRes(res.data))
      .catch((err) => {
        setError(true);
        console.error(err);
      })
      .finally(() => setIsLoading(false));
    return () => source.cancel;
  };

  return { res, error, isLoading, fetch };
};

export default useFetch;
