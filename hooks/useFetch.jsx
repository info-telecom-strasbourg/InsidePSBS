import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url, headers) => {
  console.log("useFetch", url, headers);
  const [res, setRes] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch(url, headers);
  }, [url]);

  const fetch = (url, headers) => {
    setIsLoading(true);
    setRes(null);
    setError(false);

    const source = axios.CancelToken.source();

    axios
      .get(url, { cancelToken: source.token, headers })
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
