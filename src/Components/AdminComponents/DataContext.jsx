import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const initialFormDataArray = [
    {
      // other properties
      actionTakenDate: null,
      actionTakenBy: null,
      status: 'open',
      role: 'MRO',
      timer: null,
      iasResponse: null,
    },
    // other objects
  ];

  const [formDataArray, setFormDataArray] = useState(initialFormDataArray);

  useEffect(() => {
    const interval = setInterval(() => {
      setFormDataArray((prevData) => {
        return prevData.map((data) => {
          if (data.role === 'MRO' && data.status === 'open') {
            const newTimer = data.timer ? data.timer + 1 : 1;
            if (newTimer >= 60) {
              return { ...data, role: 'IAS', timer: null };
            }
            return { ...data, timer: newTimer };
          }
          return data;
        });
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const updateFormDataArray = (updatedFormDataArray) => {
    setFormDataArray(updatedFormDataArray);
  };

  const handleQuerySubmit = (data) => {
    const { selectedDistrict, selectedMandal, file, fileName, ...formData } = data;
    setFormDataArray((prevData) => [
      ...prevData,
      { ...formData, district: selectedDistrict, mandal: selectedMandal, file, fileName, role: 'MRO', status: 'open', timer: 0 },
    ]);
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

  const updateIASResponse = (index, iasResponse) => {
    setFormDataArray((prevData) => {
      const updatedData = [...prevData];
      updatedData[index].iasResponse = iasResponse;
      return updatedData;
    });
  };

  return (
    <DataContext.Provider
      value={{
        formDataArray,
        handleQuerySubmit,
        updateStatus,
        updateAdminResponse,
        updateActionTakenDate,
        updateActionTakenBy,
        updateFormDataArray,
        updateIASResponse,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};