"use client"

import React, { useState } from 'react';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/firebase-config';

const generateRandomNumber = () => {
  return Math.floor(100000000 + Math.random() * 900000000); // Generate a random 9-digit number
};

const AddVoyager = () => {
  const [formData, setFormData] = useState({
    name: '',
    course: '',
    year: '',
    id: generateRandomNumber(),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddVoyager = async () => {
    try {
      const voyagersCollectionRef = collection(db, 'voyagers');
      const secretNumberQuery = query(
        voyagersCollectionRef,
        where('id', '==', formData.id)
      );

      const existingVoyagers = await getDocs(secretNumberQuery);

      if (existingVoyagers.empty) {
        await addDoc(voyagersCollectionRef, formData);
        setFormData({
          name: '',
          course: '',
          year: '',
          id: generateRandomNumber(), // Generate a new random number after adding
        });
        console.log('New data added to Firestore.');
      } else {
        console.error('id already exists in the database.');
      }
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg h-screen">
      <h2 className="text-lg font-semibold mb-4">Add New Voyager</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Course:</label>
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleInputChange}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Year:</label>
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <label className="block text-gray-700">Id:</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleInputChange}
            className="border border-gray-300 rounded px-2 py-1 w-full"
            readOnly
          />
        </div>
        <button
          type="button"
          onClick={handleAddVoyager}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
        >
          Add Voyager
        </button>
      </form>
    </div>
  );
};

export default AddVoyager;