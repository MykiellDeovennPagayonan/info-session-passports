"use client"

import React, { useEffect, useState } from 'react';
import { collection, getDocs } from '@firebase/firestore';
import { db } from '@/firebase-config';

const ViewVoyagers = () => {
  const [voyagers, setVoyagers] = useState<any[]>([]);

  useEffect(() => {
    const fetchVoyagers = async () => {
      const voyagersCollectionRef = collection(db, 'voyagers');
      const voyagersSnapshot = await getDocs(voyagersCollectionRef);
      const voyagersData = voyagersSnapshot.docs.map((doc: { id: any; data: () => any; }) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVoyagers(voyagersData);
    };

    fetchVoyagers();
  }, []);

  return (
    <div className='h-screen'>
      <h2 className="text-xl font-semibold mb-4">Voyagers List</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">Course</th>
            <th className="p-2">Year</th>
            <th className="p-2">Secret Number</th>
          </tr>
        </thead>
        <tbody>
          {voyagers.map((voyager) => (
            <tr key={voyager.id}>
              <td className="p-2 border">{voyager.name}</td>
              <td className="p-2 border">{voyager.course}</td>
              <td className="p-2 border">{voyager.year}</td>
              <td className="p-2 border">{voyager.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewVoyagers;