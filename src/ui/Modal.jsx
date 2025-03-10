import { useEffect, useRef } from "react";
import Button from "./Button";

function Modal({ children, onCancel, onConfirm }) {
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onCancel();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onCancel]);

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-72"
        ref={modalRef}
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          {children}
        </h2>
        <div className="flex justify-center gap-5">
          <Button type="secondary" className="p-2 w-1/3" action={onCancel}>
            Cancel
          </Button>
          <Button type="primary" className="p-2 w-1/3" action={onConfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
