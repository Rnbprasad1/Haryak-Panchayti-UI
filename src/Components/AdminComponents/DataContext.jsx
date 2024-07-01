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
      cmResponse: null,
      isEscalated: false,
      isCmEsclated: false,
      iasAssignedTime: null,
      adminComments: [],
      disabled: false,
    },
    // Additional objects can be added here
  ];

  const [formDataArray, setFormDataArray] = useState(initialFormDataArray);
  const [iasDataArray, setIasDataArray] = useState([]);
  const [cmDataArray, setCmDataArray] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFormDataArray((prevData) => {
        return prevData.map((data) => {
          if (['MRO'].includes(data.role) && data.status === 'open' && !data.isEscalated) {
            const newTimer = data.timer ? data.timer + 1 : 1;
            const timeLimit = data.role === 'MRO' ? 60 : 120; // 1 minute for MRO, 2 minutes for IAS
            const currentTime = new Date();

            if (newTimer >= timeLimit && data.status !== 'complete') {
              if (data.role === 'MRO') {
                const updatedIasDataArray = [
                  ...iasDataArray,
                  {
                    ...data,
                    role: 'IAS',
                    isEscalated: true,
                    isCmEsclated: false,
                    iasAssignedTime: currentTime,
                    adminComments: [...data.adminComments],
                    disabled: false,
                  },
                ];
                setIasDataArray(updatedIasDataArray);
                return {
                  ...data,
                  role: 'IAS',
                  isEscalated: true,
                  timer: null,
                  isCmEsclated: false,
                  iasAssignedTime: currentTime,
                  adminComments: [...data.adminComments],
                  disabled: true,
                };
              }
            }
            return { ...data, timer: newTimer };
          } else {
            if (['IAS'].includes(data.role) && data.status === 'open' && !data.isCmEsclated) {
              const endTime = new Date();
              const timeDifferenceMs = endTime - data.iasAssignedTime;

              if (timeDifferenceMs >= 60000 && data.status !== 'complete') {
                if (data.role === 'IAS') {
                  const updatedCmDataArray = [
                    ...cmDataArray,
                    {
                      ...data,
                      role: 'CM',
                      isEscalated: true,
                      isCmEsclated: true,
                      iasAssignedTime: data.iasAssignedTime,
                      adminComments: [...data.adminComments],
                      disabled: false,
                    },
                  ];
                  setCmDataArray(updatedCmDataArray);
                  return {
                    ...data,
                    role: 'CM',
                    isEscalated: true,
                    timer: null,
                    isCmEsclated: true,
                    iasAssignedTime: data.iasAssignedTime,
                    adminComments: [...data.adminComments],
                    disabled: true,
                  };
                }
              }
              return { ...data, timer: data.iasAssignedTime };
            }
            // thiru
          }
          return data;
        });
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [iasDataArray, cmDataArray]);

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

  const updateStatus = (index, newStatus, adminResponse, isIAS = false, isCM = false) => {
    setFormDataArray((prevData) => {
      const updatedData = [...prevData];
      const role = isIAS ? 'IAS' : isCM ? 'CM' : 'MRO';
      updatedData[index].status = newStatus;
      updatedData[index].adminComments = updatedData[index].adminComments || [];

      const existingComment = updatedData[index].adminComments.find(
        (comment) => comment.comment === adminResponse && comment.role === role
      );

      if (!existingComment) {
        updatedData[index].adminComments.push({
          comment: adminResponse,
          role,
          timestamp: new Date().toLocaleString(),
        });
      }

      if (newStatus === 'complete') {
        updatedData[index].disabled = true;
      }

      if ((isIAS || isCM) && updatedData[index].isEscalated && newStatus !== 'complete') {
        updatedData[index].isEscalated = false;
        updatedData[index].disabled = false;
      }

      return updatedData;
    });

    if (isIAS || isCM) {
      const targetArray = isIAS ? setIasDataArray : setCmDataArray;
      const role = isIAS ? 'IAS' : 'CM';
      targetArray((prevData) => {
        const updatedData = [...prevData];
        const targetIndex = updatedData.findIndex((item) => item.token === formDataArray[index].token);
        if (targetIndex !== -1) {
          updatedData[targetIndex].status = newStatus;

          const existingComment = updatedData[targetIndex].adminComments.find(
            (comment) => comment.comment === adminResponse && comment.role === role
          );

          if (!existingComment) {
            updatedData[targetIndex].adminComments.push({
              comment: adminResponse,
              role,
              timestamp: new Date().toLocaleString(),
            });
          }

          if (newStatus === 'complete') {
            updatedData[targetIndex].disabled = true;
          }
        }
        return updatedData;
      });
    }
  };

  const updateAdminResponse = (index, adminResponse, isIAS = false, isCM = false) => {
    setFormDataArray((prevData) => {
      const updatedData = [...prevData];
      const role = isIAS ? 'IAS' : isCM ? 'CM' : 'MRO';
      updatedData[index].adminResponse = adminResponse;
      updatedData[index].adminComments = updatedData[index].adminComments || [];

      const existingComment = updatedData[index].adminComments.find(
        (comment) => comment.comment === adminResponse && comment.role === role
      );

      if (!existingComment) {
        updatedData[index].adminComments.push({
          comment: adminResponse,
          role,
          timestamp: new Date().toLocaleString(),
        });
      }

      if ((isIAS || isCM) && updatedData[index].isEscalated && updatedData[index].status !== 'complete') {
        updatedData[index].isEscalated = false;
        updatedData[index].disabled = false;
      }

      return updatedData;
    });

    if (isIAS || isCM) {
      const targetArray = isIAS ? setIasDataArray : setCmDataArray;
      const role = isIAS ? 'IAS' : 'CM';
      targetArray((prevData) => {
        const updatedData = [...prevData];
        const targetIndex = updatedData.findIndex((item) => item.token === formDataArray[index].token);
        if (targetIndex !== -1) {
          updatedData[targetIndex].adminResponse = adminResponse;

          const existingComment = updatedData[targetIndex].adminComments.find(
            (comment) => comment.comment === adminResponse && comment.role === role
          );

          if (!existingComment) {
            updatedData[targetIndex].adminComments.push({
              comment: adminResponse,
              role,
              timestamp: new Date().toLocaleString(),
            });
          }
        }
        return updatedData;
      });
    }
  };

  const updateActionTakenDate = (index, actionTakenDate, isIAS = false, isCM = false) => {
    setFormDataArray((prevData) => {
      const updatedData = [...prevData];
      updatedData[index].actionTakenDate = actionTakenDate;
      return updatedData;
    });

    if (isIAS || isCM) {
      const targetArray = isIAS ? setIasDataArray : setCmDataArray;
      targetArray((prevData) => {
        const updatedData = [...prevData];
        const targetIndex = updatedData.findIndex((item) => item.token === formDataArray[index].token);
        if (targetIndex !== -1) {
          updatedData[targetIndex].actionTakenDate = actionTakenDate;
        }
        return updatedData;
      });
    }
  };

  const updateActionTakenBy = (index, actionTakenBy, isIAS = false, isCM = false) => {
    setFormDataArray((prevData) => {
      const updatedData = [...prevData];
      updatedData[index].actionTakenBy = actionTakenBy;
      return updatedData;
    });

    if (isIAS || isCM) {
      const targetArray = isIAS ? setIasDataArray : setCmDataArray;
      targetArray((prevData) => {
        const updatedData = [...prevData];
        const targetIndex = updatedData.findIndex((item) => item.token === formDataArray[index].token);
        if (targetIndex !== -1) {
          updatedData[targetIndex].actionTakenBy = actionTakenBy;
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

      const existingComment = updatedData[index].adminComments.find(
        (comment) => comment.comment === iasResponse && comment.role === 'IAS'
      );

      if (!existingComment) {
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
        updatedData[iasIndex].iasResponse = iasResponse;

        const existingComment = updatedData[iasIndex].adminComments.find(
          (comment) => comment.comment === iasResponse && comment.role === 'IAS'
        );

        if (!existingComment) {
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

  const updateCMResponse = (index, cmResponse) => {
    setFormDataArray((prevData) => {
      const updatedData = [...prevData];
      updatedData[index].cmResponse = cmResponse;
      updatedData[index].adminComments = updatedData[index].adminComments || [];

      const existingComment = updatedData[index].adminComments.find(
        (comment) => comment.comment === cmResponse && comment.role === 'CM'
      );

      if (!existingComment) {
        updatedData[index].adminComments.push({
          comment: cmResponse,
          role: 'CM',
          timestamp: new Date().toLocaleString(),
        });
      }

      updatedData[index].isEscalated = false;
      updatedData[index].disabled = false;

      return updatedData;
    });

    setCmDataArray((prevData) => {
      const updatedData = [...prevData];
      const cmIndex = updatedData.findIndex((item) => item.token === formDataArray[index].token);
      if (cmIndex !== -1) {
        updatedData[cmIndex].cmResponse = cmResponse;

        const existingComment = updatedData[cmIndex].adminComments.find(
          (comment) => comment.comment === cmResponse && comment.role === 'CM'
        );

        if (!existingComment) {
          updatedData[cmIndex].adminComments.push({
            comment: cmResponse,
            role: 'CM',
            timestamp: new Date().toLocaleString(),
          });
        }
      }
      return updatedData;
    });
  };

  const updateIasDataArray = (updatedIasDataArray) => {
    setIasDataArray(updatedIasDataArray);
  };

  return (
    <DataContext.Provider
      value={{
        formDataArray,
        iasDataArray,
        cmDataArray,
        setIasDataArray,
        setCmDataArray,
        handleQuerySubmit,
        updateStatus,
        updateAdminResponse,
        updateActionTakenDate,
        updateActionTakenBy,
        updateFormDataArray,
        updateIASResponse,
        updateCMResponse,
        updateIasDataArray,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
