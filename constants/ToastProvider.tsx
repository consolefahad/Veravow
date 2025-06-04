import CustomToast, { ToastType } from "@/components/CustomToast";
import React, { createContext, useContext, useState } from "react";

interface ToastOptions {
  type?: ToastType;
  text1: string;
  text2?: string;
  duration?: number;
  useModal?: boolean;
}

interface ToastContextType {
  showToast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toastConfig, setToastConfig] = useState<{
    visible: boolean;
    message: string;
    type: ToastType;
    duration: number;
  }>({
    visible: false,
    message: "",
    type: "error",
    duration: 3000,
  });

  const showToast = (options: ToastOptions) => {
    const { text1, text2, type = "error", duration = 3000 } = options;

    // Combine text1 and text2 for the message
    const message = text2 ? `${text1}. ${text2}` : text1;

    setToastConfig({
      visible: true,
      message,
      type,
      duration,
    });
  };

  const hideToast = () => {
    setToastConfig((prev) => ({ ...prev, visible: false }));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <CustomToast
        visible={toastConfig.visible}
        message={toastConfig.message}
        type={toastConfig.type}
        duration={toastConfig.duration}
        onHide={hideToast}
      />
    </ToastContext.Provider>
  );
};
