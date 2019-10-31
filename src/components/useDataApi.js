import React, { useState, useEffect } from 'react';

import http from 'axios';

const useDataApi = (initialSearch, initialData) => {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState(initialSearch);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsError(false);
      setIsLoading(true);
      try {
        const response = await http(`https://hn.algolia.com/api/v1/search?query=${search}`);

        setData(response.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    }
    fetchData();
  }, [search]);

  return [{ data, isLoading, isError }, setSearch];
};

export default useDataApi;
