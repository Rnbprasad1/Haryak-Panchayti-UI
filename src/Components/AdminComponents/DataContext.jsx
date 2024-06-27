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
      disabled: false, // Add disabled property
    },
    // other objects
  ];

  const [formDataArray, setFormDataArray] = useState(initialFormDataArray);
  const [iasDataArray, setIasDataArray] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFormDataArray((prevData) => {
        return prevData.map((data) => {
          if (data.role === 'MRO' && data.status === 'open' && !data.isEscalated) {
            const newTimer = data.timer ? data.timer + 1 : 1;
            if (newTimer >= 60) {
              const updatedIasDataArray = [
                ...iasDataArray,
                {
                  ...data,
                  isEscalated: true,
                  adminComments: [],
                  disabled: true, // Set disabled to true on escalation
                },
              ];
              setIasDataArray(updatedIasDataArray);
              return {
                ...data,
                isEscalated: true,
                timer: null,
                adminComments: [],
                disabled: true, // Set disabled to true on escalation
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
    if (newStatus === undefined) {
      console.error('Invalid status provided');
      return;
    }

    setFormDataArray((prevData) => {
      const updatedData = [...prevData];
      updatedData[index].status = newStatus;
      updatedData[index].adminComments = updatedData[index].adminComments || [];

      // Check if the comment already exists
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

      return updatedData;
    });

    if (isIAS) {
      setIasDataArray((prevData) => {
        const updatedData = [...prevData];
        const iasIndex = updatedData.findIndex((item) => item.token === formDataArray[index].token);
        if (iasIndex !== -1) {
          updatedData[iasIndex].status = newStatus;

          // Check if the comment already exists
          if (
            !updatedData[iasIndex].adminComments.find(
              (comment) => comment.comment === adminResponse && comment.role === 'IAS'
            )
          ) {
            updatedData[iasIndex].adminComments.push({
              comment: adminResponse,
              role: 'IAS',
              timestamp: new Date().toLocaleString(),
            });
          }
        }
        return updatedData;
      });
    }
  };

  const updateAdminResponse = (index, adminResponse, isIAS = false) => {
    setFormDataArray((prevData) => {
      const updatedData = [...prevData];
      updatedData[index].adminResponse = adminResponse;
      updatedData[index].adminComments = updatedData[index].adminComments || [];

      // Check if the comment already exists
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

      return updatedData;
    });

    if (isIAS) {
      setIasDataArray((prevData) => {
        const updatedData = [...prevData];
        const iasIndex = updatedData.findIndex((item) => item.token === formDataArray[index].token);
        if (iasIndex !== -1) {
          updatedData[iasIndex].adminResponse = adminResponse;

          // Check if the comment already exists
          if (
            !updatedData[iasIndex].adminComments.find(
              (comment) => comment.comment === adminResponse && comment.role === 'IAS'
            )
          ) {
            updatedData[iasIndex].adminComments.push({
              comment: adminResponse,
              role: 'IAS',
              timestamp: new Date().toLocaleString(),
            });
          }
        }
        return updatedData;
      });
    }
  };

  const updateActionTakenDate = (index, actionTakenDate, isIAS = false) => {
    setFormDataArray((prevData) => {
      const updatedData = [...prevData];
      updatedData[index].actionTakenDate = actionTakenDate;
      return updatedData;
    });

    if (isIAS) {
      setIasDataArray((prevData) => {
        const updatedData = [...prevData];
        const iasIndex = updatedData.findIndex((item) => item.token === formDataArray[index].token);
        if (iasIndex !== -1) {
          updatedData[iasIndex].actionTakenDate = actionTakenDate;
        }
        return updatedData;
      });
    }
  };

  const updateActionTakenBy = (index, actionTakenBy, isIAS = false) => {
    setFormDataArray((prevData) => {
      const updatedData = [...prevData];
      updatedData[index].actionTakenBy = actionTakenBy;
      return updatedData;
    });

    if (isIAS) {
      setIasDataArray((prevData) => {
        const updatedData = [...prevData];
        const iasIndex = updatedData.findIndex((item) => item.token === formDataArray[index].token);
        if (iasIndex !== -1) {
          updatedData[iasIndex].actionTakenBy = actionTakenBy;
        }
        return updatedData;
      });
    }
  };

  const updateIASResponse = (index, iasResponse) => {
    setFormDataArray((prevData) => {
      const updatedData = [...prevData];
      updatedData[index].iasResponse = iasResponse;
      updatedData[index].adminComments = updatedData[index].adminComments || [];

      // Check if the comment already exists
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

      return updatedData;
    });

    setIasDataArray((prevData) => {
      const updatedData = [...prevData];
      const iasIndex = updatedData.findIndex((item) => item.token === formDataArray[index].token);
      if (iasIndex !== -1) {
        updatedData[iasIndex].iasResponse = iasResponse;

        // Check if the comment already exists
        if (
          !updatedData[iasIndex].adminComments.find(
            (comment) => comment.comment === iasResponse && comment.role === 'IAS'
          )
        ) {
          updatedData[iasIndex].adminComments.push({
            comment: iasResponse,
            role: 'IAS',
            timestamp: new Date().toLocaleString(),
          });
        }
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