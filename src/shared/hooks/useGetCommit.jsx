import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getCommit } from "../../services"; 

export const useGetCommit = (commitId) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCommit = async () => {
    setIsLoading(true);
    try {
      const response = await getCommit(commitId);
      if (response.error) {
        toast.error(response.error?.response?.data || "Error al cargar commit");
      } else {
        setData(response.data);
      }
    } catch (error) {
      toast.error("Error al cargar commit");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (commitId) {
      fetchCommit();
    }
  }, [commitId]);

  return { data, isLoading, refetch: fetchCommit };
};
