import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

window.searchInput = ({ api_url, onSelect, first_name_field, last_name_field }, root) => {
  ReactDOM.render(
    <React.StrictMode>
      <App
        API_URL={api_url}
        onSelect={onSelect}
        first_name_field={first_name_field}
        last_name_field={last_name_field}
      />
    </React.StrictMode>,
    typeof(root) === 'object' ? root : document.getElementById(root)
  );
};

const parent = document.getElementById('root');

if(parent) {
  window.searchInput({ 
    api_url: "/api",
    onSelect: (obj) => console.log("Desde afuera!", obj),
    first_name_field: "first_name", last_name_field: "last_name" },
    "root"
  );
}

reportWebVitals();