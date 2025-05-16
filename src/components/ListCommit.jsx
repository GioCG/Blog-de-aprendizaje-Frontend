import React from "react";
import { useGetCommit } from "../shared/hooks/useGetCommit"; 

export const CommitDetail = ({ commitId }) => {
  const { data, isLoading, refetch } = useGetCommit(commitId);

  if (isLoading) return <p>Cargando commit...</p>;

  if (!data) return <p>No se encontró el commit.</p>;

  return (
    <div>
      <h2>Commit: {data.id}</h2>
      <p>Mensaje: {data.message}</p>
      <p>Autor: {data.author}</p>
      <button onClick={refetch}>Recargar</button>
    </div>
  );
};
