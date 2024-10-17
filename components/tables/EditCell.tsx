import { User } from "@/types/types";
import { CellContext, Row, Table } from "@tanstack/react-table";
import React from "react";

interface EditCellProps<TData> extends CellContext<TData, unknown> {
  row: Row<TData>;
  table: Table<TData>;
}

const EditCell = <TData,>({ row, table }: EditCellProps<TData>) => {
  const tableMeta = table.options.meta as any;
  const user = row.original as User;

  const handleEdit = () => {
    tableMeta.setEditedRowId(row.id);
    tableMeta.setEditFormData(user);
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
    tableMeta.setEditedRowId(null);
    tableMeta.setEditFormData(null);
  };

  const handleDelete = () => {
    tableMeta.handleDeleteClick(user);
  };

  return (
    <div className="fixed-width whitespace-nowrap py-4">
      {tableMeta?.editedRowId === row.id ? (
        <>
          <button onClick={handleSave} className="">
            Save
          </button>
          <button onClick={handleCancel} className="ml-4">
            Cancel
          </button>
        </>
      ) : (
        <>
          <button onClick={handleEdit} className="">
            Edit
          </button>
          <button onClick={handleDelete} className="ml-4">
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default EditCell;
