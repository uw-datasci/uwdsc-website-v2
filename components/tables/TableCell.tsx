import React, { useState, useEffect, ChangeEvent } from "react";
import { CellContext, Column } from "@tanstack/react-table";
import { User } from "@/types/types";
import { ColumnType } from "./AdminTable";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface TableCellProps<TData> extends CellContext<TData, unknown> {
  column: Column<TData, unknown>;
}

const TableCell = <TData,>({
  getValue,
  row,
  column,
  table,
}: TableCellProps<TData>) => {
  const initialValue = getValue() as any;
  const columnMeta = column.columnDef.meta;
  const tableMeta = table.options.meta as any;
  const [value, setValue] = useState<any>(initialValue);
  const adminName = useSelector((state: RootState) => state.loginToken.name);

  useEffect(() => {
    if (column.id === "password") {
      setValue(""); // so it does not change password
    } else {
      setValue(initialValue);
    }
  }, [initialValue]);

  const handleEdit = (e: ChangeEvent<any>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (column.id === "hasPaid") {
      if (
        newValue == "True" &&
        tableMeta.editFormData?.paymentMethod == "" &&
        tableMeta.editFormData.verifier == "" &&
        tableMeta.editFormData.paymentLocation == ""
      ) {
        tableMeta.setEditFormData((prevData: User | null) =>
          prevData
            ? {
                ...prevData,
                ["hasPaid"]: newValue,
                ["verifier"]: adminName,
              }
            : null,
        );
        tableMeta.updateCellData(row.id, "verifier", adminName);
      } else if (newValue == "True") {
        tableMeta.setEditFormData((prevData: User | null) =>
          prevData ? { ...prevData, ["hasPaid"]: newValue } : null,
        );
      } else {
        tableMeta.setEditFormData((prevData: User | null) =>
          prevData
            ? {
                ...prevData,
                ["hasPaid"]: newValue,
                ["paymentMethod"]: "",
                ["verifier"]: "",
                ["paymentLocation"]: "",
              }
            : null,
        );
        tableMeta.updateCellData(row.id, "paymentMethod", "");
        tableMeta.updateCellData(row.id, "verifier", "");
        tableMeta.updateCellData(row.id, "paymentLocation", "");
      }
    } else {
      tableMeta.setEditFormData((prevData: User | null) =>
        prevData ? { ...prevData, [column.id]: newValue } : null,
      );
    }
  };

  const user = row.original as User;

  if (tableMeta?.editedRowId === row.id) {
    return columnMeta?.type === ColumnType.Select ? (
      <select
        onChange={handleEdit}
        value={value}
        className="rounded h-fit w-fit rounded-sm border p-1"
      >
        {columnMeta?.options?.map((option: string) => (
          <option key={option} value={option}>
            {option ? option : "N/A"}
          </option>
        ))}
      </select>
    ) : (
      <input
        value={value}
        onChange={handleEdit}
        type={columnMeta?.type || "text"} // TODO: change default to email/password/etc
        name={column.id || "placeholder"} // TODO: change placeholder to actual value in better way
        className="rounded h-fit w-fit rounded-sm border p-1"
      />
    );
  }

  return <span>{initialValue}</span>;
};

export default TableCell;
