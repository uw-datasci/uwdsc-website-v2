import React from "react";
import { AlertTriangle, X } from "lucide-react";
import Button from "./Button";

interface WarningDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
}

export default function WarningDialog({
  isOpen,
  onClose,
  title = "Error",
  message,
}: WarningDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative z-10 mx-4 w-full max-w-md rounded-lg border border-grey3 bg-darkBlue p-6 shadow-xl">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <AlertTriangle className="mr-2 h-6 w-6 text-red" />
            <h3 className="text-lg font-semibold text-white">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-grey1 transition-colors hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Message */}
        <p className="mb-6 leading-relaxed text-grey1">{message}</p>

        {/* Actions */}
        <div className="flex justify-end">
          <Button
            type="button"
            hierarchy="secondary"
            rounded="rounded-md"
            onClick={onClose}
            classes="transition-all duration-300 px-6 hover:bg-grey3"
          >
            OK
          </Button>
        </div>
      </div>
    </div>
  );
}
