import React, { useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // auto close after 3s
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-5 right-5 px-4 py-2 rounded-lg shadow-lg text-white
        ${type === "success" ? "bg-green-500" : "bg-red-500"}
        transition-transform duration-300 ease-out
        translate-x-0 animate-[slideIn_0.3s_ease-out]
      `}
      style={{
        animation: "slideIn 0.3s ease-out",
      }}
    >
      {message}

      {/* Define keyframes inline */}
      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(120%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Toast;
