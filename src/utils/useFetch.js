/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import axios from 'axios';
import ACCESS_TOKEN from '../data/secret';

export default function useFetch(dataUrl, configUrl) {
  const [data, setData] = useState(null);
  const [config, setConfig] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // // Funkcja tworząca brakujące pola w obiektachh do sortowania
  // const ceateNestedObject = (path, obj) => {
  //   const reversedPath = path.split('.').reverse();
  //   const iter = ([head, ...tail], object) => {
  //     if (!head) {
  //       return object;
  //     }
  //     const newObject = { [head]: { ...object } };
  //     return iter(tail, newObject);
  //   };
  //   return iter(reversedPath, obj);
  // };

  useEffect(() => {
    if (!dataUrl) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${dataUrl}?page=1&page_size=30`, {
          headers: {
            Authorization: `Token ${ACCESS_TOKEN}`,
          },
        });
        setLoading(false);
        setError(null);
        setData(response.data);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [dataUrl]);

  useEffect(() => {
    if (!configUrl) return;
    const fetchConfig = async () => {
      setLoading(true);
      try {
        const response = await axios.get(configUrl, {
          headers: {
            Authorization: `Token ${ACCESS_TOKEN}`,
          },
        });
        setLoading(false);
        setError(null);
        setConfig(response.data);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchConfig();
  }, [configUrl]);

  return [data, config, isLoading, error];
}
