import React, { createContext, useContext, useEffect, useState } from 'react';
import SpecimenAPI from '../../services/SpecimenAPI';

const DataContext = createContext({
  specimenData: [],
  setSpecimenData: () => {},
});

export function useDataContext() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [specimenData, setSpecimenData] = useState([]);

  useEffect(() => {
    const handleInitialDataFetch = async () => {
      try {
        if (specimenData.length === 0){
          const response = await SpecimenAPI.getAllSpecimen();
          setSpecimenData(response);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };  
    handleInitialDataFetch();
  }, [])
  

  return (
    <DataContext.Provider value={{ specimenData, setSpecimenData }}>
      {children}
    </DataContext.Provider>
  );
}
