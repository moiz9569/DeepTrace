export default function VideoModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-87.5 text-center">
        <h2 className="text-xl text-gray-800 2xl:text-red-500 font-bold mb-3">Video Analysis</h2>
        <p className="text-gray-600 mb-4">
          Upload a video to detect deepfakes.
        </p>
        <button
          onClick={onClose}
          className="bg-teal-600 cursor-pointer text-white px-4 py-2 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
}
