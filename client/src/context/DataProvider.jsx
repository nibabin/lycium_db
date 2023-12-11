import React, { createContext, useContext, useEffect, useState } from 'react';
import SpecimenAPI from '../../services/SpecimenAPI';

const DataContext = createContext({
  specimenData: [],
  setSpecimenData: () => {},
  specimenLoading: true,
  setSpecimenLoading: () => {}
});

export function useDataContext() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [specimenData, setSpecimenData] = useState([]);
  const [specimenLoading, setSpecimenLoading] = useState(true);

  useEffect(() => {
    const handleInitialDataFetch = async () => {
      try {
        if (specimenData.length === 0){
          const response = await SpecimenAPI.getAllSpecimen();
          console.log(response)
          setSpecimenData(response);
          
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setSpecimenLoading(false);
    };  
    handleInitialDataFetch();
  }, [])
  

  return (
    <DataContext.Provider value={{ specimenData, setSpecimenData, specimenLoading, setSpecimenLoading }}>
      {children}
    </DataContext.Provider>
  );
}
