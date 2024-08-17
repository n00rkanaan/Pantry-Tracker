'use client';

import { useState, useEffect } from "react";
import { firestore } from "../firebase";
import { collection, query, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import React from 'react';

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
    if (!itemName.trim() || isNaN(itemQuantity) || itemQuantity <= 0) {
      alert("Please enter a valid item name and quantity.");
      return;
    }

    const existingItem = inventory.find(item => item.name.toLowerCase() === itemName.trim().toLowerCase());

    if (existingItem) {
      const itemRef = doc(firestore, "inventory", existingItem.id);
      await updateDoc(itemRef, {
        quantity: parseInt(existingItem.quantity) + parseInt(itemQuantity)
      });
    } else {
      await addDoc(collection(firestore, "inventory"), {
        name: itemName.trim(),
        quantity: parseInt(itemQuantity)
      });
    }

    setItemName("");
    setItemQuantity("");
    updateInventory();
  };

  const decrementItem = async (id, currentQuantity) => {
    const newQuantity = currentQuantity - 1;
    if (newQuantity > 0) {
      const itemRef = doc(firestore, "inventory", id);
      await updateDoc(itemRef, { quantity: newQuantity });
    } else {
      await deleteDoc(doc(firestore, "inventory", id));
    }
    updateInventory();
  };

  useEffect(() => {
    updateInventory();
  }, []);

  return (
    <div className="container"> {/* New class for outer container */}
      <div className="pantry-box"> {/* New class for inner box */}
        <h1 className="text-4xl font-bold mb-6">Pantry Tracking App</h1>
        <div className="flex flex-col items-center gap-4 mb-4">
          <div className="flex gap-4 w-full">
            <input
              type="text"
              placeholder="Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="border p-2 flex-1 rounded"
            />
            <input
              type="number"
              placeholder="Item Quantity"
              value={itemQuantity}
              onChange={(e) => setItemQuantity(e.target.value)}
              className="border p-2 flex-1 rounded"
            />
          </div>
          <button
            onClick={addItem}
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            Add Item
          </button>
        </div>
        <div className="w-full">
          {inventory.length === 0 ? (
            <p className="text-center text-gray-500">No items in pantry</p>
          ) : (
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Item</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4   
 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item.id} className="text-center">
                    <td className="border px-4 py-2">{item.name}</td>
                    <td className="border px-4 py-2">{item.quantity}</td>
                    <td className="border px-4 py-2">   

                      <button
                        onClick={() => decrementItem(item.id, item.quantity)}
                        className="bg-red-500 text-white p-1 rounded"
                      >
                        Remove 1
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
