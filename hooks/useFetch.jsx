import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [res, setRes] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setRes(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { res, error, isLoading };
};

export default useFetch;
