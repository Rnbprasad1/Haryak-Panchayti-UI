import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const initialFormDataArray = [
    {
      // other properties
      actionTakenDate: null,
      actionTakenBy: null,
    },
    // other objects
  ];

  const [formDataArray, setFormDataArray] = useState(initialFormDataArray);

  // In the DataContext
  const updateFormDataArray = (updatedFormDataArray) => {
    setFormDataArray(updatedFormDataArray);
  };

  const handleQuerySubmit = (data) => {
    const { selectedDistrict, selectedMandal, file, fileName, ...formData } = data;
    setFormDataArray((prevData) => [...prevData, { ...formData, district: selectedDistrict, mandal: selectedMandal, file, fileName }]);
  };

  const updateStatus = (index, newStatus, adminResponse) => {
    setFormDataArray((prevData) => {
      const updatedData = [...prevData];
      if (newStatus === 'completed' && adminResponse) {
        updatedData[index].status = newStatus;
        updatedData[index].adminResponse = adminResponse;
      } else {
        updatedData[index].status = newStatus;
      }
      return updatedData;
    });
  };

  const updateAdminResponse = (index, adminResponse) => {
    setFormDataArray((prevData) => {
      const updatedData = [...prevData];
      updatedData[index].adminResponse = adminResponse;
      return updatedData;
    });
  };

  const updateActionTakenDate = (index, actionTakenDate) => {
    setFormDataArray((prevData) => {
      const updatedData = [...prevData];
      updatedData[index].actionTakenDate = actionTakenDate;
      return updatedData;
    });
  };

  const updateActionTakenBy = (index, actionTakenBy) => {
    setFormDataArray((prevData) => {
      const updatedData = [...prevData];
      updatedData[index].actionTakenBy = actionTakenBy;
      return updatedData;
    });
  };

  return (
    <DataContext.Provider value={{ formDataArray, handleQuerySubmit, updateStatus, updateAdminResponse, updateActionTakenDate, updateActionTakenBy, updateFormDataArray }}>
      {children}
    </DataContext.Provider>
  );
};
