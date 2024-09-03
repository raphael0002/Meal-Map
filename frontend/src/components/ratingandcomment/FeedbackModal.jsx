import { useState } from "react";

const FeedbackModal = ({ show, onClose, onSubmit }) => {
  const [comment, setComment] = useState("");

  if (!show) return null;

  const handleSubmit = () => {
    onSubmit(comment);
    setComment("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-[#FFF5E4] rounded-lg p-6 w-[30rem]">
        <h2 className="text-xl mb-4">Leave a Comment</h2>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full h-24 p-2 border rounded bg-[#fffdf9]"
          placeholder="Your feedback..."
        />
        <div className="flex justify-end gap-4 mt-4">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
