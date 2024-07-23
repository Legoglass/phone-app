import React, { useState, useEffect } from "react";
import "./index.css";
export default function App() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [items, setItems] = useState([]);

  function handleRemoveItem(itemId) {
    const storedItems = JSON.parse(localStorage.getItem("items")) || [];
    const updatedItems = storedItems.filter((item) => item.id !== itemId);
    localStorage.setItem("items", JSON.stringify(updatedItems));
    setItems(updatedItems);
  }

  function handelAddItems(item) {
    const storedItems = JSON.parse(localStorage.getItem("items")) || [];
    const updateItems = [...storedItems, item];
    localStorage.setItem("items", JSON.stringify(updateItems));
    setItems(updateItems);
  }

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("items")) || [];
    setItems(storedItems);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (!number || !name) return;

    const newItem = { name, number, id: Date.now() };
    console.log(newItem);
    handelAddItems(newItem);

    setNumber("");

    setName("");
  }

  return (
    <div className="container">
      <div className="input-container">
        <div className="input-field">
          {" "}
          Enter the phone number :
          <input
            type="text"
            className="show-number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <div className="input-field">
          Enter the name :
          <input
            type="text"
            className="show-number"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      <button className="btn" onClick={handleSubmit}>
        Add number
      </button>

      <List classNam="list" items={items} onDelete={handleRemoveItem} />
    </div>
  );
}

function List({ items, onDelete }) {
  return (
    <div>
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDelete }) {
  return (
    <li>
      <span className="item-container">
        <button className="btn-delete" onClick={() => onDelete(item.id)}>
          ❌
        </button>
        <div className="item">
          <div className="name">{item.name}</div>
          <div className="number">{item.number}</div>
        </div>
      </span>
    </li>
  );
}
