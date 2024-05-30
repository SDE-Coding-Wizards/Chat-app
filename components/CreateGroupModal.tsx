import { ReactNode } from "react";

interface ModalProps {
    onClose: () => void;
    children: ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
            <div className=" p-6 rounded-md shadow-md">
                {children}
                <button
                    onClick={onClose}
                    className="absolute top-0 right-0 mt-2 mr-2 "
                >
                    &times;
                </button>
            </div>
        </div>
    );
}
