import React, { useState } from "react";

export default function AddFriend({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");

  const handleBackdropClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted email:", email);
    // Add any other actions you want to perform on form submission
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          onClick={handleBackdropClick}
        >
          <div
            className="bg-base-200 p-8 rounded-md shadow-lg w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Add Friend</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="friend-email"
                  className="block text-sm font-medium"
                >
                  Friend's Email
                </label>
                <input
                  type="email"
                  id="friend-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                  required
                />
              </div>
              <div className="flex justify-end gap-5">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-warning"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
