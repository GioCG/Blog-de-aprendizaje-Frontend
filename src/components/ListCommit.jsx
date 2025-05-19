import React from "react";
import { useGetCommitsByUsername } from "../shared/hooks";

export const CommitsList = ({ username }) => {
  const { commits, isLoading, refetch } = useGetCommitsByUsername(username);

  if (isLoading) return <p>Cargando commits...</p>;
  if (!commits.length) return <p>No se encontraron commits para {username}.</p>;

  return (
    <div className="commits-list-container">
      <h2 className="commits-list-title">Commits de {username}</h2>
      <ul className="commits-list-ul">
        {commits.map((c) => (
          <li key={c._id} className="commits-list-item">
            <p><strong>Mensaje:</strong> {c.textoprincipal}</p>
            <p><strong>Autor:</strong> {c.user.username}</p>
            <p><strong>Fecha:</strong> {new Date(c.createdAt).toLocaleString()}</p>
            {c.parentCommit && (
              <p className="parent-commit">
                Respuesta a: {c.parentCommit.user.username} — "{c.parentCommit.textoprincipal}"
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
