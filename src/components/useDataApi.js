import React, { useState, useEffect, useReducer } from 'react';

import http from 'axios';

/*
  The object being send with the dispatch function has a mandatory type property and an optional payload property.
  The type tells the reducer function which state transition needs to be applied and the payload can additionally
  be used by the reducer to distill the new state.
*/
const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, isLoading: true, isError: false };
    case 'FETCH_SUCCESS':
      return { ...state, isLoading: false, isError: false, data: action.payload };
    case 'FETCH_FAILURE':
      return { ...state, isLoading: false, isError: true };
    default:
      throw new Error();
  }
};

const useDataApi = (initialSearch, initialData) => {
  const [search, setSearch] = useState(initialSearch);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData
  });

  useEffect(() => {
    let didCancel = false;

    async function fetchData() {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const response = await http(`https://hn.algolia.com/api/v1/search?query=${search}`);

        if (!didCancel) dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
      } catch (error) {
        if (!didCancel) dispatch({ type: 'FETCH_FAILURE' });
      }
    }
    fetchData();

    return () => {
      didCancel = true;
    };
  }, [search]);

  return [state, setSearch];
};

export default useDataApi;
