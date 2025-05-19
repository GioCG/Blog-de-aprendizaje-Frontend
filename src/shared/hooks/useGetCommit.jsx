
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { getCommitsByUsername } from "../../services/api";

export const useGetCommitsByUsername = (username) => {
  const [commits, setCommits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCommits = useCallback(async () => {
    if (!username) return;
    setIsLoading(true);
    const { data: resp, error } = await getCommitsByUsername(username);
    if (error) {
      const msg = error.response?.data?.message || "Error al cargar commits";
      toast.error(msg);
    } else if (!resp.success) {
      toast.error(resp.message || "No fue posible obtener commits");
    } else {
      setCommits(resp.commits);
    }
    setIsLoading(false);
  }, [username]);

  useEffect(() => {
    fetchCommits();
  }, [fetchCommits]);

  return { commits, isLoading, refetch: fetchCommits };
};
