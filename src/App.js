import React from "react";
import "./App.css";
import { accessTokenLocalstorageKey } from "./constants";
import axios from "./Services/axios";

function App() {
  const [stocksResults, setStockResults] = React.useState([]);

  React.useEffect(() => {
    axios.defaults.headers.common["user-access-token"] = localStorage.getItem(
      accessTokenLocalstorageKey
    );
  }, []);

  return (
    <div className="App">
      <StockFinderInput onSearch={setStockResults} debounceMs={500} />
      {stocksResults.map((data) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              padding: 20,
              borderRadius: 10,
              margin: 10,
              boxShadow: '0px 0px 10px rgba(0,0,0,0.2)'
            }}
          >
            <div>{data[0]}</div>
            <div>{data[1]}</div>
            <div>{data[2]}</div>
          </div>
        );
      })}
    </div>
  );
}

const StockFinderInput = ({ onSearch, debounceMs }) => {
  const [search, setSearch] = React.useState("");
  const debounceRef = React.useRef(undefined);
  React.useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    if (search !== "") {
      setTimeout(() => {
        axios.get(`/api/data?search_string=${search}`).then(({ data }) => {
          onSearch(data);
        });
      }, debounceMs);
    }
    if (search === "") {
      onSearch([]);
    }
  }, [search, debounceMs, onSearch]);
  return (
    <div>
      <input
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      ></input>
    </div>
  );
};

export default App;
