import React, { useState, Fragment } from 'react';

import useDataApi from './components/useDataApi';

// https://www.robinwieruch.de/react-hooks-fetch-data

function App() {
  const [query, setQuery] = useState('redux');
  const [{ data, isLoading, isError }, doFetch] = useDataApi('redux', { hits: [] });

  return (
    <Fragment>
      <form
        onSubmit={event => {
          doFetch(query);
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
