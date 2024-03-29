
import { useEffect, useState } from 'react';

const useAutoRefresh = (fetchDataFunction, interval = 10000) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAndSetData = async () => {
      const newData = await fetchDataFunction();
      setData(newData);
    };

    fetchAndSetData(); // Initial fetch
    const id = setInterval(fetchAndSetData, interval); // Periodic fetch

    return () => clearInterval(id); // Cleanup on component unmount
  }, [fetchDataFunction, interval]);

  return data;
};

export default useAutoRefresh;
