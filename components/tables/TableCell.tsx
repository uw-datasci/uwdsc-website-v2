import React, { useState, useEffect, ChangeEvent } from "react";
import { CellContext, Column } from "@tanstack/react-table";
import { User } from "@/types/types";
import { ColumnType } from "./AdminTable";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { backfillUserEvents, removeUserFromEvents } from "@/utils/apiCalls";

interface TableCellProps<TData> extends CellContext<TData, unknown> {
  column: Column<TData, unknown>;
  tableMeta?: {
    editFormData: User | null;
    setEditFormData: (data: User | null | ((prevData: User | null) => User | null)) => void;
    updateCellData: (rowId: string, columnId: string, value: string) => void;
    editedRowId?: string;
  };
}

const TableCell = <TData extends User>({
  getValue,
  row,
  column,
  table,
}: TableCellProps<TData>) => {
  const initialValue = getValue() as any;
  const columnMeta = column.columnDef.meta;
  const tableMeta = table.options.meta as TableCellProps<TData>["tableMeta"];
  const [value, setValue] = useState<any>(initialValue);
  const adminName = useSelector((state: RootState) => state.loginToken.name);
  const userRole = useSelector((state: RootState) => state.loginToken.role);

  const handleEdit = (e: ChangeEvent<any>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (!tableMeta) return;

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

      // If payment status is changed to "True", backfill events
      if (newValue === "True") {
        backfillUserEvents(row.original._id)
          .then((response) => {
            console.log(`Backfill successful: ${response.data.message}`);
            console.log(`Number of events registered: ${response.data.eventsRegistered}`);
            console.log('Registered Events:');
            response.data.events.forEach((event: { id: string; name: string; startTime: string }) => {
              console.log(`- ${event.name} (ID: ${event.id})`);
              console.log(`  Start Time: ${new Date(event.startTime).toLocaleString()}`);
            });
          })
          .catch((error) => {
            console.error("Error backfilling user events:", error);
          });
      } 
      // If payment status is changed to "False", remove from all events
      else if (newValue === "False") {
        removeUserFromEvents(row.original._id)
          .then((response) => {
            console.log(`Removal successful: ${response.data.message}`);
            console.log(`Number of events removed from: ${response.data.eventsRemoved}`);
          })
          .catch((error) => {
            console.error("Error removing user from events:", error);
          });
      }
    } else {
      tableMeta.setEditFormData((prevData: User | null) =>
        prevData ? { ...prevData, [column.id]: newValue } : null,
      );
    }
  };

  if (tableMeta?.editedRowId === row.id) {
    // Only allow editing userStatus if userRole is admin
    if (
      column.id === "userStatus" &&
      userRole !== "admin"
    ) {
      return <span>{initialValue}</span>;
    }


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
        type={columnMeta?.type || "text"}
        name={column.id || "placeholder"}
        className="rounded h-fit w-fit rounded-sm border p-1"
      />
    );
  }

  return <span>{column.id == "password" ? "********" : initialValue}</span>;
};

export default TableCell;
