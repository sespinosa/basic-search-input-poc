import { useState, useEffect, useRef } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import './App.css';

const getSuggestions = debounce(
  ({ q, limit = 10 }, cb) =>
    axios.get('/api', { params: { q, limit } })
      .then(({ data }) => cb(null, data))
      .catch(cb)
, 250, { trailing: true });

const SeachInput = () => {
  const [ q, setQ ] = useState("");
  const [ suggestions, setSuggestions ] = useState([]);
  const inputRef = useRef();
  const inputWidth = inputRef.current?.offsetWidth;
  console.log(inputWidth)

  window.inputRef = inputRef;

  useEffect(() => {
    if(!!q) {
      getSuggestions({ q }, (err, results) => {
        if(err) return console.error('Error trying to get suggestions: ', err);
        if(results.length > 0) setSuggestions(results);
      });
    }
  }, [q]);

  const _handleInput = ({ target: { value } }) => {
    setQ(value);
  };

  const extended = suggestions.length > 0 && q.length > 0;

  return (
    <div className="search-bar">
      <input
        type="text"
        value={q}
        onChange={_handleInput}
        className={`search-input ${extended && 'extended'}`}
        ref={inputRef}
      />
      {
        extended
        &&
        <section>
          <ul
            className='suggestion-list'
            style={{ width: inputWidth }}
          >
            {
              suggestions.map(s =>
                <li key={ `${s.first_name} ${s.last_name}` }>
                  { `${s.first_name} ${s.last_name}` }
                </li>
              )
            }
          </ul>
        </section>
      }
    </div>
  );
}

export default SeachInput;