"use cline  ";

export default function Pending({
  isOpen,
  onClose,
  requests,
  onAccept,
  onReject,
}: {
  isOpen: boolean;
  onClose: () => void;
  requests: { id: number; email: string }[];
  onAccept: (id: number) => void;
  onReject: (id: number) => void;
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
            className="bg-base-200 p-8 rounded-md shadow-lg w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Pending Requests</h2>
            {requests.length > 0 ? (
              <ul>
                {requests.map((request) => (
                  <li
                    key={request.id}
                    className="mb-4 flex justify-between items-center"
                  >
                    <span>{request.email}</span>
                    <div>
                      <button
                        onClick={() => onAccept(request.id)}
                        className="mr-2 p-2 bg-green-500 rounded-md transition duration-300 ease-in-out transform hover:bg-green-600"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => onReject(request.id)}
                        className="p-2 bg-red-500 rounded-md transition duration-300 ease-in-out transform hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No pending requests.</p>
            )}
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={onClose}
                className="p-2 bg-gray-200 rounded-md transition duration-300 ease-in-out transform hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
