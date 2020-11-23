import { useState, useEffect, useRef } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import './App.css';

const getSuggestions = debounce(
  ({ q, limit = 10, API_URL }, cb) =>
    axios.get(API_URL, { params: { q, limit } })
      .then(({ data }) => cb(null, data))
      .catch(cb)
, 250);

const SeachInput = ({ API_URL, onSelect, first_name_field, last_name_field }) => {
  const [ q, setQ ] = useState("");
  const [ suggestions, setSuggestions ] = useState([]);
  const [ selectedUser, setSelectedUser ] = useState(null);
  const inputRef = useRef();
  const inputWidth = inputRef.current?.offsetWidth;

  window.inputRef = inputRef;

  useEffect(() => {
    if(!!q) {
      getSuggestions({ q, API_URL }, (err, results) => {
        if(err) return console.error('Error trying to get suggestions: ', err);
        if(results.length > 0) setSuggestions(results);
      });
    }
  }, [q, API_URL]);

  useEffect(() => {
    if(selectedUser && onSelect) {
      onSelect(selectedUser);
      setSuggestions([]);
      setQ(`${selectedUser[first_name_field]} ${selectedUser[last_name_field]}`)
    };
  }, [selectedUser, onSelect, first_name_field, last_name_field]);

  const _handleInput = ({ target: { value } }) => {
    setQ(value);
  };

  const _handleClick = suggestion => () => {
    setSelectedUser(suggestion);
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
                <li
                  key={ `${s.first_name} ${s.last_name}` }
                  onClick={_handleClick(s)}
                >
                  { `${s[first_name_field]} ${s[last_name_field]}` }
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