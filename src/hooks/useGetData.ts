import { useState, useEffect } from 'react';

const useGetData = (code:string) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'http://localhost/apps/sysgd/api.php?action=get_data&code='+code
        console.log(url)
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const data = await response.json();
        console.log(data)
        setData(data);
        setLoading(false)
      } catch (error) {
        setError(JSON.stringify(error));
        setLoading(false)
      }
    };

    fetchData();
  }, []);

  return { data, error, loading };
};

export default useGetData;