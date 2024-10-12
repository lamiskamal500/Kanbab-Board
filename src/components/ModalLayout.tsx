import React from "react";

interface ModalLayoutProps {
  isOpen: boolean;
  title?: string;
  children: React.ReactNode;
}

const ModalLayout: React.FC<ModalLayoutProps> = ({
  isOpen,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96 text-gray-700 shadow-lg">
        <h2 className="text-lg font-bold mb-4">{title}</h2>

        <div className="flex flex-col gap-2">{children}</div>
      </div>
    </div>
  );
};

export default ModalLayout;
