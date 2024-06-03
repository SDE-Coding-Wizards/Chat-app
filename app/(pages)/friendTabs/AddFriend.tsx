export default function AddFriend({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const handleBackdropClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          onClick={handleBackdropClick}
        >
          <div
            className=" bg-base-200 p-8 rounded-md shadow-lg w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Add Friend</h2>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="friend-email"
                  className="block text-sm font-medium "
                >
                  Friend's Email
                </label>
                <input
                  type="email"
                  id="friend-email"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="mr-4 p-2 bg-red-500 rounded-md transition duration-300 ease-in-out transform hover:bg-red-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="p-2 bg-green-500 rounded-md transition duration-300 ease-in-out transform hover:bg-green-600"
                >
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
