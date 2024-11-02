import { useState } from "react";
import { api } from "../api";

export const useLocalStorage = (keyName: string, defaultValue: string | null) => {
  
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
    
      if (value) {
        api.defaults.headers.authorization = `Bearer ${JSON.parse(value!)}`;
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }

  });
  const setValue = (newValue: string) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
      console.log(err);
    }
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};