import React, { useState, useEffect, Fragment } from 'react';
import http from 'axios';

// https://www.robinwieruch.de/react-hooks-fetch-data

function App() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState('redux');
  const [search, setSearch] = useState('redux');
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

  return (
    <Fragment>
      <form
        onSubmit={event => {
          setSearch(query);
          event.preventDefault();
        }}
      >
        <input type="text" value={query} onChange={event => setQuery(event.target.value)} />
        <button type="submit">Search</button>
      </form>

      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>loading ...</div>
      ) : (
        <ul>
          {data.hits.map(item => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
}

export default App;
