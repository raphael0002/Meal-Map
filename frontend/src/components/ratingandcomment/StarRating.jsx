const StarRating = ({ rating, onRatingClick }) => (
  <div className="flex gap-1 mr-5">
    {[...Array(5)].map((_, index) => (
      <span
        key={index}
        onClick={() => onRatingClick(index + 1)}
        className={`cursor-pointer text-3xl ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ))}
  </div>
);

export default StarRating;
