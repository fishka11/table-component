/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ascending, descending } from '../data/data';
import ACCESS_TOKEN from '../data/secret';

export default function useFetchData(data, config) {
  const [sortConfig, setSortConfig] = useState();
  const [sortedData, setSortedData] = useState();
  const [columnName, setColumnName] = useState('');
  const [direction, setDirection] = useState('');
  const [searchQuery, setsearchQuery] = useState('');
  const [buttonGroupFilter, setbuttonGroupFilter] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!config) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(config, {
          headers: {
            Authorization: `Token ${ACCESS_TOKEN}`,
          },
        });
        setLoading(false);
        setError(null);
        setSortConfig(response.data);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [config]);

  useEffect(() => {
    if (!data) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${data}?page=${sortConfig.pagination.page}&page_size=${sortConfig.pagination.page_size}&ordering=${direction}${columnName}&q=${searchQuery}&status=${buttonGroupFilter}`,
          {
            headers: {
              Authorization: `Token ${ACCESS_TOKEN}`,
            },
          }
        );
        setLoading(false);
        setError(null);
        setSortedData(response.data);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [direction, columnName, sortConfig, searchQuery, buttonGroupFilter, data]);

  const handleSorting = (key) => {
    const newConfig = { ...sortConfig };
    const currentlySorted = sortConfig.columns.find(
      (column) => 'sorted' in column && column.sorted === true
    );
    const toSort = newConfig.columns.find(
      (column) => column.sort_by.toLowerCase() === key.toLowerCase()
    );
    let dir = ascending;
    if (
      currentlySorted.sort_by === key &&
      currentlySorted.direction === ascending
    ) {
      dir = descending;
    } else {
      currentlySorted.direction = ascending;
      currentlySorted.sorted = false;
      toSort.sorted = true;
    }
    toSort.direction = dir;
    setSortConfig({ ...newConfig });
    setColumnName(key.split('.').join('_'));
    if (direction === '') {
      setDirection('-');
    } else {
      setDirection('');
    }
  };

  const handlePagination = (newPagination) => {
    const newConfig = { ...sortConfig };
    newConfig.pagination.page_size = newPagination.page_size;
    const pages = Math.ceil(sortedData.count / newPagination.page_size);
    if (newPagination.page === undefined) {
      newConfig.pagination.page = 1;
    } else {
      newConfig.pagination.page =
        newPagination.page > pages ? pages : newPagination.page;
    }
    setSortConfig({ ...newConfig });
  };

  const handleSearch = (query) => {
    const newConfig = { ...sortConfig };
    newConfig.pagination.page = 1;
    newConfig.filters.find(
      (filter) => filter.widget === 'keyword-search'
    ).value = query;
    setSortConfig({ ...newConfig });
    setsearchQuery(query);
  };

  const handleButtonGroupFilter = (value) => {
    const newConfig = { ...sortConfig };
    newConfig.pagination.page = 1;
    const widget = newConfig.filters.find(
      (filter) => filter.widget === 'button-group'
    );
    widget.options.forEach((option) => (option.selected = false));
    widget.options.find((option) => option.value === value).selected = true;
    setSortConfig({ ...newConfig });
    setbuttonGroupFilter(value);
  };

  return {
    sortedData,
    sortConfig,
    handleSorting,
    handlePagination,
    handleSearch,
    handleButtonGroupFilter,
    isLoading,
    error,
  };
}
