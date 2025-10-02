import React from "react";
import { X, AlertTriangle } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  type?: "danger" | "warning" | "info";
  isLoading?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  type = "danger",
  isLoading = false,
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getTypeStyles = () => {
    switch (type) {
      case "danger":
        return {
          iconColor: "text-red-600",
          iconBg: "bg-red-100",
          confirmButton: "btn-modern-danger",
        };
      case "warning":
        return {
          iconColor: "text-yellow-600",
          iconBg: "bg-yellow-100",
          confirmButton: "btn-modern-warning",
        };
      case "info":
        return {
          iconColor: "text-blue-600",
          iconBg: "bg-blue-100",
          confirmButton: "btn-modern-primary",
        };
      default:
        return {
          iconColor: "text-red-600",
          iconBg: "bg-red-100",
          confirmButton: "btn-modern-danger",
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

      <div className="relative bg-white rounded-[2rem] shadow-xl max-w-xs w-auto mx-4 transform transition-all duration-300 ease-out">
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200">
          <div className="flex items-center space-x-1">
            <div className={`p-1 rounded-full ${styles.iconBg}`}>
              <AlertTriangle className={`h-3 w-3 ${styles.iconColor}`} />
            </div>
            <h3 className="text-xs font-semibold text-gray-900">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 bg-transparent border-none outline-none"
            disabled={isLoading}
          >
            <X className="h-3 w-3" />
          </button>
        </div>

        <div className="px-3 py-2">
          <p className="text-xs text-gray-600 leading-relaxed">{message}</p>
        </div>

        <div className="flex items-center justify-end px-3 py-2 border-t border-gray-200 bg-gray-50 rounded-b-[2rem]">
          <button
            onClick={onConfirm}
            className={`${styles.confirmButton} text-xs px-2 py-1`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center space-x-1">
                <div className="animate-spin rounded-full h-2 w-2 border-b-2 border-white"></div>
                <span>Processing...</span>
              </div>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
