export default function AddFriend({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Friend</h2>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="friend-email"
                  className="block text-sm font-medium text-gray-700"
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
                  className="mr-4 p-2 bg-gray-200 rounded-md transition duration-300 ease-in-out transform hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="p-2 bg-blue-500 text-white rounded-md transition duration-300 ease-in-out transform hover:bg-blue-600"
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
