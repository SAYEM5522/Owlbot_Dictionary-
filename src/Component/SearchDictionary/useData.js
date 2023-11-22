import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

const useData = () => {
  const [wordData, setWordData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchWordData = async (word) => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}${word}`);
      setWordData(response.data);
      setLoading(false)
    } catch (error) {
      console.error('Error fetching word data:', error);
      setError(error);
      setLoading(false);
    }
  };


  return { wordData, loading, error,fetchWordData };
};

export default useData;
