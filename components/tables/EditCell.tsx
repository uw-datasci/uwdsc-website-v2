import { RootState } from "@/store/store";
import { User } from "@/types/types";
import { CellContext, Row, Table } from "@tanstack/react-table";
import React from "react";
import { useSelector } from "react-redux";

interface EditCellProps<TData> extends CellContext<TData, unknown> {
  row: Row<TData>;
  table: Table<TData>;
}

const EditCell = <TData,>({ row, table }: EditCellProps<TData>) => {
  const userRole = useSelector((state: RootState) => state.loginToken.role);

  const tableMeta = table.options.meta as any;
  const user = row.original as User;

  const handleEdit = () => {
    tableMeta.setEditedRowId(row.id);
    tableMeta.setEditFormData(user);
    tableMeta.setOldEditFormData(user);
  };

  const handleSave = async (): Promise<void> => {
    console.log(tableMeta.editFormData);
    try {
      await tableMeta.handleSaveClick();
    } catch (error) {
      console.log("Error during save:", error);
    }
  };

  const handleCancel = () => {
    tableMeta.handleCancelClick();
  };

  const handleDelete = () => {
    tableMeta.handleDeleteClick(user);
  };

  return (
    <div className="fixed-width whitespace-nowrap py-4 flex gap-4 justify-center">
      {tableMeta?.editedRowId === row.id ? (
        <>
          <button onClick={handleSave}>
            Save
          </button>
          <button onClick={handleCancel}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <button onClick={handleEdit}>
            Edit
          </button>
          {userRole === "admin" && (
            <button onClick={handleDelete}>
              Delete
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default EditCell;
