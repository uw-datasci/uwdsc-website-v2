import React, { useState, useEffect, CSSProperties } from "react";
import { User } from "@/types/types";
import {
  Column,
  RowData,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  PaginationState,
  getFacetedUniqueValues,
  getFacetedRowModel,
  ColumnDef,
  FilterFn,
} from "@tanstack/react-table";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import UserFormCard from "../cards/UserFormCard";
import { deleteUser, fetchUsers, createUser, editUser } from "@/utils/apiCalls";
import TableCell from "./TableCell";
import EditCell from "./EditCell";
import Pagination from "./Pagination";
import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import { MdRefresh, MdOutlineAddCircleOutline } from "react-icons/md";
import { roleOptions, ROLES } from "@/constants/roles";
import { facultyOptions, paymentMethodOptions } from "@/constants/member";

require("dotenv").config();

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    revertData?: (rowIndex: number, revert: boolean) => void;
    editedRowId?: string | null;
    setEditedRowId?: (rowId: string | null) => void;
    testToggle?: boolean;
    setTestToggle?: (toggle: boolean) => void;
    editFormData?: User | null;
    setEditFormData?: (data: User | null) => void;
    oldEditFormData?: User | null;
    setOldEditFormData?: (data: User | null) => void;
    handleSaveClick?: () => Promise<void>;
    handleCancelClick?: () => void;
    handleDeleteClick?: (user: User) => Promise<any>;
    updateCellData: (rowId: string, colId: string, value: any) => void;
  }
}

export enum ColumnType {
  Text = "text",
  Select = "select",
}

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    type?: ColumnType;
    hideFilter?: boolean;
    options?: string[];
  }
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({
    itemRank,
  });
  return itemRank.passed;
};

const getCommonPinningStyles = (column: Column<User>): CSSProperties => {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRightPinnedColumn =
    isPinned === "right" && column.getIsFirstColumn("right");

  const isBig = (window.innerWidth >= 768) as boolean; // Tailwind's 'md' breakpoint is 768px

  if (!isBig) {
    return {}; // apply no styles
  }

  // TODO: This wouldn't update when the window is resized, might have to manage state in Table component or useEffect

  return {
    boxShadow: isLastLeftPinnedColumn
      ? "-4px 0 4px -4px gray inset"
      : isFirstRightPinnedColumn
      ? "4px 0 4px -4px gray inset"
      : undefined,
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    position: isPinned ? "sticky" : "relative",
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  };
};

const AdminTable = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [editFormData, setEditFormData] = useState<User | null>(null);
  const [oldEditFormData, setOldEditFormData] = useState<User | null>(null);
  const [showAddUserForm, setShowAddUserForm] = useState<boolean>(false);
  const [editedRowId, setEditedRowId] = useState<string | null>(null);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  const handleSaveClick = async () => {
    if (!editFormData) {
      return;
    }

    const { password, hasPaid, paymentMethod, verifier, paymentLocation } =
      editFormData;

    if (
      hasPaid == "True" &&
      (!paymentMethod || !verifier || !paymentLocation)
    ) {
      alert(
        "If member has paid, you need to fill out the method, verifier, and location.",
      );
      return;
    }

    if (hasPaid == "False" && (paymentMethod || verifier || paymentLocation)) {
      alert(
        "If member has not paid, the payment method, verifier, and location should be empty.",
      );
      return;
    }

    await editUser({
      token: token,
      userId: editFormData._id,
      newUser: editFormData,
    });
    setEditedRowId(null);
    setEditFormData(null);
    setOldEditFormData(null);
    fetchUserData();
  };

  const restoreOriginalUser = () => {
    // only restore fields that were previously updated for the table in edit
    updateCellData(
      editedRowId!,
      "paymentMethod",
      oldEditFormData?.paymentMethod || "",
    );
    updateCellData(editedRowId!, "verifier", oldEditFormData?.verifier || "");
    updateCellData(
      editedRowId!,
      "paymentLocation",
      oldEditFormData?.paymentLocation || "",
    );
  };

  const handleCancelClick = () => {
    restoreOriginalUser();
    setEditedRowId(null);
    setEditFormData(null);
    setOldEditFormData(null);
  };

  const handleDeleteClick = async (user: User) => {
    const userId = user._id;
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (isConfirmed) {
      setLoading(true);
      try {
        console.log("Deleting user with ID:", userId);
        const response = await deleteUser({ token: token, userId: userId });
        console.log("Done Deleted user with ID:", userId);
        await fetchUserData(); // TODO: refetching the table data again, maybe not ideal
        return response;
      } catch (error) {
        console.error("Error Deleting user:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const updateCellData = (rowId: string, colId: string, value: any) => {
    skipAutoResetPageIndex();
    setData((prevData) =>
      prevData.map((row, index) =>
        index === Number(rowId) ? { ...row, [colId]: value } : row,
      ),
    );
  };

  const columns = React.useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "email",
        header: "Email",
        cell: TableCell,
        meta: {
          type: ColumnType.Text,
        },
      },
      {
        accessorKey: "username",
        header: "Name",
        cell: TableCell,
        meta: {
          type: ColumnType.Text,
        },
      },
      {
        accessorKey: "password",
        header: "Password",
        cell: TableCell,
        meta: {
          type: ColumnType.Text,
          hideFilter: true,
        },
      },
      {
        accessorKey: "faculty",
        header: "Faculty",
        cell: TableCell,
        meta: {
          type: ColumnType.Text,
          options: [...facultyOptions],
        },
      },
      {
        accessorKey: "userStatus",
        header: "Status",
        cell: TableCell,
        meta: {
          type: ColumnType.Select,
          options: [...roleOptions],
        },
      },
      {
        accessorKey: "isEmailVerified",
        header: "Email Verified",
        cell: TableCell,
        meta: {
          type: ColumnType.Select,
          options: ["True", "False"],
        },
      },
      {
        accessorKey: "hasPaid",
        header: "Paid Member",
        cell: TableCell,
        meta: {
          type: ColumnType.Select,
          options: ["True", "False"],
        },
      },
      {
        accessorKey: "paymentMethod",
        header: "Payment Method",
        cell: TableCell,
        meta: {
          type: ColumnType.Select,
          options: [...paymentMethodOptions, ""],
        },
      },
      {
        accessorKey: "verifier",
        header: "Verified By",
        cell: TableCell,
        meta: {
          type: ColumnType.Text,
        },
      },
      {
        accessorKey: "paymentLocation",
        header: "Payment Location",
        cell: TableCell,
        meta: {
          type: ColumnType.Text,
        },
      },
      {
        header: "Action",
        accessorKey: "action",
        cell: EditCell,
        meta: {
          hideFilter: true,
        },
      },
    ],
    [],
  );

  const token = useSelector((state: RootState) => state.loginToken.token);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination,
      globalFilter,
    },
    autoResetPageIndex,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedRowModel: getFacetedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    initialState: {
      columnPinning: {
        left: ["email"], // TODO: username pinning left as it causes alignment issues
        right: ["action"],
      },
    },
    meta: {
      editedRowId,
      setEditedRowId,
      editFormData,
      setEditFormData,
      oldEditFormData,
      setOldEditFormData,
      handleSaveClick,
      handleCancelClick,
      handleDeleteClick,
      updateCellData,
    },
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    defaultColumn: {
      size: 200, // TODO: This isn't right because it's not returning DOM width, not a priority
      minSize: 50,
      maxSize: 500,
    },
  });

  useEffect(() => {
    fetchUserData();
  }, [token]);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await fetchUsers({ token: token });
      setData(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (newUser: User) => {
    setLoading(true);
    try {
      console.log("Creating user: ", newUser);
      const response = await createUser({ token: token, newUser: newUser });
      console.log("Created user:");
      setShowAddUserForm(false);
      await fetchUserData();
      return response;
    } catch (error) {
      console.error("Error Creating user:", error);
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-white border-opacity-75"></div>
      </div>
    );
  }

  return (
    <div>
      {showAddUserForm && (
        <UserFormCard
          onFormSubmit={handleCreateUser}
          onCancel={() => setShowAddUserForm(false)}
        />
      )}
      {/* Filter + Refresh + Add */}
      <div className="mb-5 flex w-full justify-between gap-3">
        <DebouncedInput
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          className="h-10 grow rounded-sm border p-2"
          placeholder="Search all columns..."
        />
        <button
          onClick={fetchUserData}
          className="flex h-10 w-10 items-center justify-center rounded-sm bg-grey2 p-2"
        >
          <MdRefresh />
        </button>
        <button
          onClick={() => setShowAddUserForm(true)}
          className="flex h-10 w-10 items-center justify-center rounded-sm bg-grey2 p-2"
        >
          <MdOutlineAddCircleOutline />
        </button>
      </div>
      {/* Table Component */}
      <div className="mx-auto flex flex-col overflow-x-auto rounded-md border text-sm">
        <table>
          <thead>
            <tr>
              {table.getHeaderGroups().map((headerGroup) =>
                headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={getCommonPinningStyles(header.column)}
                    className="whitespace-nowrap bg-grey2 px-6 py-3 font-medium uppercase tracking-wider"
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex flex-col">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {!header.column.columnDef.meta?.hideFilter && (
                          <Filter column={header.column} />
                        )}
                      </div>
                    )}
                  </th>
                )),
              )}
            </tr>
          </thead>
          <tbody className="divide-gray-200 divide-y">
            {table.getRowModel().rows.map((row, index) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="whitespace-nowrap bg-white px-6 py-4"
                    style={{ ...getCommonPinningStyles(cell.column) }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Component */}
      <Pagination table={table} />
    </div>
  );
};

// Used to filter data
function Filter({ column }: { column: Column<any, unknown> }) {
  const { type } = column.columnDef.meta ?? {};
  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = React.useMemo(() => {
    return Array.from(column.getFacetedUniqueValues().keys()).sort();
  }, [column.getFacetedUniqueValues()]);

  return type === ColumnType.Select ? (
    <select
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
      className="rounded mt-1 w-full rounded-sm border p-2"
    >
      <option value="">All</option>
      {sortedUniqueValues.map((value) => (
        <option value={value} key={value}>
          {value === "" ? "N/A" : value}
        </option>
      ))}
    </select>
  ) : (
    <input
      type="text"
      value={(columnFilterValue ?? "") as string}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder="Search..."
      className="rounded mt-1 w-full rounded-sm border p-2"
    />
  );
}

// Used to skip pagination reset temporarily
function useSkipper() {
  const shouldSkipRef = React.useRef(true);
  const shouldSkip = shouldSkipRef.current;

  const skip = React.useCallback(() => {
    shouldSkipRef.current = false;
  }, []);

  React.useEffect(() => {
    shouldSkipRef.current = true;
  });

  return [shouldSkip, skip] as const;
}

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export default AdminTable;
