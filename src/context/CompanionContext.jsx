import React, { createContext, useContext, useState, useEffect } from 'react';

const CompanionContext = createContext();

export const CompanionProvider = ({ children }) => {
  const [companion, setCompanion] = useState(() => {
    return localStorage.getItem('petson-companion') || null;
  });
  
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [introSeen, setIntroSeen] = useState(() => {
    return sessionStorage.getItem('introSeen') === 'true';
  });

  useEffect(() => {
    if (companion) {
      localStorage.setItem('petson-companion', companion);
    } else {
      localStorage.removeItem('petson-companion');
    }
  }, [companion]);

  const markIntroSeen = () => {
    sessionStorage.setItem('introSeen', 'true');
    setIntroSeen(true);
  };

  const selectCompanion = (type) => {
    setCompanion(type);
  };

  const toggleAudio = () => {
    setAudioEnabled(prev => !prev);
  };

  return (
    <CompanionContext.Provider value={{
      companion,
      selectCompanion,
      audioEnabled,
      toggleAudio,
      introSeen,
      markIntroSeen
    }}>
      {children}
    </CompanionContext.Provider>
  );
};

export const useCompanion = () => useContext(CompanionContext);
