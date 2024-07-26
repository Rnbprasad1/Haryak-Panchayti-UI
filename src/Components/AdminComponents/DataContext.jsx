import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const initialFormDataArray = [
    {
      actionTakenDate: null,
      actionTakenBy: null,
      status: 'open',
      role: 'MRO',
      timer: null,
      iasResponse: null,
      isEscalated: false,
      adminComments: [],
      disabled: false,
    },

  ];

  const [formDataArray, setFormDataArray] = useState(initialFormDataArray);
  const [iasDataArray, setIasDataArray] = useState([]);

  useEffect(() => {
    console.log('Inside useEffect');
    const interval = setInterval(() => {
      setFormDataArray((prevData) => {
        return prevData.map((data) => {
          if (data.role === 'MRO' && data.status === 'open' && !data.isEscalated) {
            const newTimer = data.timer ? data.timer + 1 : 1;
            if (newTimer >= 60 && data.status !== 'complete') {
              const updatedIasDataArray = [
                ...iasDataArray,
                {
                  ...data,
                  isEscalated: true,
                  adminComments: [...data.adminComments],
                  disabled: true,
                },
              ];
              setIasDataArray(updatedIasDataArray);
              return {
                ...data,
                isEscalated: true,
                timer: null,
                adminComments: [...data.adminComments],
                disabled: true,
              };
            }
            return { ...data, timer: newTimer };
          }
          return data;
        });
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [iasDataArray]);

  const updateFormDataArray = (updatedFormDataArray) => {
    setFormDataArray(updatedFormDataArray);
  };

  const handleQuerySubmit = (data) => {
    const { selectedDistrict, selectedMandal, file, fileName, ...formData } = data;
    setFormDataArray((prevData) => [
      ...prevData,
      {
        ...formData,
        district: selectedDistrict,
        mandal: selectedMandal,
        file,
        fileName,
        role: 'MRO',
        status: 'open',
        timer: 0,
        isEscalated: false,
        adminComments: [],
        disabled: false,
      },
    ]);
  };

  const updateStatus = (index, newStatus, adminResponse, isIAS = false) => {
    setFormDataArray((prevData) => {
      const updatedData = [...prevData];
      updatedData[index].status = newStatus;
      updatedData[index].adminComments = updatedData[index].adminComments || [];

      if (
        !updatedData[index].adminComments.find(
          (comment) => comment.comment === adminResponse && comment.role === (isIAS ? 'IAS' : 'MRO')
        )
      ) {
        updatedData[index].adminComments.push({
          comment: adminResponse,
          role: isIAS ? 'IAS' : 'MRO',
          timestamp: new Date().toLocaleString(),
        });
      }

      if (newStatus === 'complete') {
        updatedData[index].disabled = true;
      }

      if (isIAS && updatedData[index].isEscalated && newStatus !== 'complete') {
        updatedData[index].isEscalated = false;
        updatedData[index].disabled = false;
      }

      return updatedData;
    });


    setIasDataArray((prevData) => {
      const updatedData = [...prevData];
      const iasIndex = updatedData.findIndex((item) => item.token === formDataArray[index].token);
      if (iasIndex !== -1) {
        updatedData[iasIndex] = {
          ...updatedData[iasIndex],
          status: newStatus,
          adminComments: [...formDataArray[index].adminComments],
        };
        if (newStatus === 'complete') {
          updatedData[iasIndex].disabled = true;
        }
      }
      return updatedData;
    });
  };

  const updateAdminResponse = (index, adminResponse, isIAS = false) => {
    setFormDataArray((prevData) => {
      const updatedData = [...prevData];
      updatedData[index].adminResponse = adminResponse;
      updatedData[index].adminComments = updatedData[index].adminComments || [];

      if (
        !updatedData[index].adminComments.find(
          (comment) => comment.comment === adminResponse && comment.role === (isIAS ? 'IAS' : 'MRO')
        )
      ) {
        updatedData[index].adminComments.push({
          comment: adminResponse,
          role: isIAS ? 'IAS' : 'MRO',
          timestamp: new Date().toLocaleString(),
        });

        if (updatedData[index].status === 'open') {
          updatedData[index].status = 'in progress';
        }
      }

      if (isIAS && updatedData[index].isEscalated && updatedData[index].status !== 'complete') {
        updatedData[index].isEscalated = false;
        updatedData[index].disabled = false;
      }

      return updatedData;
    });


    setIasDataArray((prevData) => {
      const updatedData = [...prevData];
      const iasIndex = updatedData.findIndex((item) => item.token === formDataArray[index].token);
      if (iasIndex !== -1) {
        updatedData[iasIndex] = {
          ...updatedData[iasIndex],
          adminResponse: adminResponse,
          adminComments: [...formDataArray[index].adminComments],
        };
        if (updatedData[iasIndex].status === 'open') {
          updatedData[iasIndex].status = 'in progress';
        }
      }
      return updatedData;
    });
  };

  const updateActionTakenDate = (index, actionTakenDate, isIAS = false) => {
    setFormDataArray((prevData) => {
      const updatedData = [...prevData];
      updatedData[index].actionTakenDate = actionTakenDate;
      return updatedData;
    });


    setIasDataArray((prevData) => {
      const updatedData = [...prevData];
      const iasIndex = updatedData.findIndex((item) => item.token === formDataArray[index].token);
      if (iasIndex !== -1) {
        updatedData[iasIndex].actionTakenDate = actionTakenDate;
      }
      return updatedData;
    });
  };

  const updateActionTakenBy = (index, actionTakenBy, isIAS = false) => {
    setFormDataArray((prevData) => {
      const updatedData = [...prevData];
      updatedData[index].actionTakenBy = actionTakenBy;
      return updatedData;
    });


    setIasDataArray((prevData) => {
      const updatedData = [...prevData];
      const iasIndex = updatedData.findIndex((item) => item.token === formDataArray[index].token);
      if (iasIndex !== -1) {
        updatedData[iasIndex].actionTakenBy = actionTakenBy;
      }
      return updatedData;
    });
  };

  const updateIASResponse = (index, iasResponse) => {
    setFormDataArray((prevData) => {
      const updatedData = [...prevData];
      updatedData[index].iasResponse = iasResponse;
      updatedData[index].adminComments = updatedData[index].adminComments || [];

      if (
        !updatedData[index].adminComments.find(
          (comment) => comment.comment === iasResponse && comment.role === 'IAS'
        )
      ) {
        updatedData[index].adminComments.push({
          comment: iasResponse,
          role: 'IAS',
          timestamp: new Date().toLocaleString(),
        });
      }

      updatedData[index].isEscalated = false;
      updatedData[index].disabled = false;

      return updatedData;
    });


    setIasDataArray((prevData) => {
      const updatedData = [...prevData];
      const iasIndex = updatedData.findIndex((item) => item.token === formDataArray[index].token);
      if (iasIndex !== -1) {
        updatedData[iasIndex] = {
          ...updatedData[iasIndex],
          iasResponse: iasResponse,
          adminComments: [...formDataArray[index].adminComments],
          isEscalated: false,
          disabled: false,
        };
      }
      return updatedData;
    });
  };

  return (
    <DataContext.Provider
      value={{
        formDataArray,
        iasDataArray,
        setIasDataArray,
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