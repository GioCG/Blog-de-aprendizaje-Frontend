import React, { useState, useEffect } from "react";
import { useCreateCommit } from "../shared/hooks/useCreateCommit";

export const CrearCommitForm = ({ titulo = "", parentCommitId = null, onCancel }) => {
  const [textoprincipal, setTextoPrincipal] = useState("");
  const { create, isLoading } = useCreateCommit();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.username) {
      setUsername(user.username);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await create({
      textoprincipal,
      username,
      titulo,
      parentCommitId,
    });

    setTextoPrincipal("");
    if (onCancel) onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 space-y-2">
      <textarea
        placeholder="Escribe un comentario..."
        value={textoprincipal}
        onChange={(e) => setTextoPrincipal(e.target.value)}
        required
        className="w-full border rounded p-2"
        rows={2}
      />
      <div className="flex gap-2">
        <button type="submit" disabled={isLoading} className="bg-blue-500 text-white px-3 py-1 rounded">
          {isLoading ? "Respondiendo..." : "Responder"}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="text-red-500">
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};
