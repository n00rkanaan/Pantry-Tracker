'use client'

import { useState, useEffect } from "react";
import { firestore } from "../firebase";
import { collection, query, getDocs, addDoc } from "firebase/firestore";

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");

  const updateInventory = async () => {
    const q = query(collection(firestore, "inventory"));
    const snapshot = await getDocs(q);
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setInventory(items);
  };

  const addItem = async () => {
    if (itemName && itemQuantity) {
      await addDoc(collection(firestore, "inventory"), {
        name: itemName,
        quantity: itemQuantity
      });
      setItemName("");
      setItemQuantity("");
      updateInventory();
    }
  };

  useEffect(() => {
    updateInventory();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Pantry Tracking App</h1>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          className="border p-2 flex-1"
        />
        <input
          type="text"
          placeholder="Item Quantity"
          value={itemQuantity}
          onChange={(e) => setItemQuantity(e.target.value)}
          className="border p-2 flex-1"
        />
        <button
          onClick={addItem}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Item
        </button>
      </div>
      <div>
        {inventory.length === 0 ? (
          <p>No items in pantry</p>
        ) : (
          <ul className="list-disc pl-5">
            {inventory.map((item) => (
              <li key={item.id} className="mb-2">
                {item.name} - {item.quantity}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
