import { useState, useMemo } from 'react';

const collator = new Intl.Collator('pl', {
  numeric: true,
  sensitivity: 'base',
});

export default function useSortableData(data, config) {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    const sortableItems = { ...data };
    if (sortConfig !== null) {
      const sorted = sortConfig.columns.find(
        (column) => 'sort_by' in column && column.sorted === true
      );
      const fields = sorted.sort_by.split('.');
      let { direction } = sorted;
      if (!direction) {
        direction = 'ASC';
      }
      const multi = direction === 'ASC' ? 1 : -1;
      // eslint-disable-next-line consistent-return
      const sorter = (a, b) => {
        if (fields.length === 1) {
          if (!a[fields[0]] && !b[fields[0]]) {
            return 0;
          }
          if (!a[fields[0]]) {
            return 1;
          }
          if (!b[fields[0]]) {
            return -1;
          }
          return collator.compare(a[fields[0]], b[fields[0]]) * multi;
        }
        if (fields.length === 2) {
          if (!a[fields[0]] && !b[fields[0]]) {
            return 0;
          }
          if (!a[fields[0]]) {
            return 1;
          }
          if (!b[fields[0]]) {
            return -1;
          }
          return (
            collator.compare(a[fields[0]][fields[1]], b[fields[0]][fields[1]]) *
            multi
          );
        }
      };
      const newResults = data.results.sort(sorter);
      sortableItems.results = newResults;
    }
    return sortableItems;
  }, [data, sortConfig]);

  const handleSorting = (key) => {
    const sorted = sortConfig.columns.find(
      (column) => 'sort_by' in column && column.sorted === true
    );
    const newConfig = { ...config };
    let direction = 'ASC';
    if (newConfig && sorted.sort_by === key && sorted.direction === 'ASC') {
      direction = 'DESC';
    } else {
      sorted.direction = 'ASC';
      sorted.sorted = false;
      newConfig.columns.find(
        (column) => column.sort_by.toLowerCase() === key.toLowerCase()
      ).sorted = true;
    }
    newConfig.columns.find(
      (column) => column.sort_by.toLowerCase() === key.toLowerCase()
    ).direction = direction;
    setSortConfig({ ...newConfig });
  };

  return { sortedData: sortedItems, sortConfig, handleSorting };
}
