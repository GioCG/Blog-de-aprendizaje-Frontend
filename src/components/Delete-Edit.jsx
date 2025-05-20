import { useEditCommit } from "../shared/hooks/useEditCommit";
import { useDeleteCommit } from "../shared/hooks/useDeleteCommit";

export const Example = () => {
  const { edit, isLoading: editing } = useEditCommit();
  const { remove, isLoading: deleting } = useDeleteCommit();

  const handleEdit = async () => {
    const updated = await edit({ id: "commitId", textoprincipal: "Nuevo texto" });
    console.log("Commit actualizado:", updated);
  };

  const handleDelete = async () => {
    const success = await remove("commitId");
    if (success) console.log("Commit eliminado");
  };

  return (
    <>
      <button onClick={handleEdit} disabled={editing}>Editar</button>
      <button onClick={handleDelete} disabled={deleting}>Eliminar</button>
    </>
  );
};

