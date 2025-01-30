import { Dialog as HeadlessDialog } from "@headlessui/react";
import React from "react";

type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  closeIcon?: boolean,
  children: React.ReactNode;
};

export default function Dialog({ isOpen, onClose, title, children, closeIcon = true }: DialogProps) {
  const renderSlot = (slotName: string) => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.props.slot === slotName) {
        return child;
      }
      return null;
    });
  };

  return (
    <HeadlessDialog open={isOpen} onClose={onClose} className="relative z-10">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-gray-500/75" aria-hidden="true" onClick={onClose} />

      {/* Dialog Content */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <HeadlessDialog.Panel className="relative bg-white rounded shadow-xl  p-4">
          {closeIcon && <span
            className="absolute top-0 right-0 px-4 py-3 cursor-pointer"
            onClick={onClose}
          >
            <svg
              className="fill-current h-6 w-6 text-gray-400"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>}
          {/* Title Slot */}
          {title && <HeadlessDialog.Title className="text-lg font-bold">{title}</HeadlessDialog.Title>}
          {renderSlot("header")}

          {/* Main Content Slot */}
          <div className="mt-4">{renderSlot("body")}</div>

          {/* Footer Slot */}
          <div className="mt-6">{renderSlot("footer")}</div>
        </HeadlessDialog.Panel>
      </div>
    </HeadlessDialog>
  );
}
