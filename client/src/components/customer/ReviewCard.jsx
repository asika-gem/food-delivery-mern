import { Star, Pencil, Trash2 } from "lucide-react";

const ReviewCard = ({ review, onEdit, onDelete }) => {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg transition hover:shadow-xl">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800">
            {review.restaurant?.name || "Restaurant"}
          </h3>

          <p className="mt-1 text-sm text-gray-500">{review.foodName}</p>
        </div>

        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={18}
              className={
                star <= review.rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }
            />
          ))}
        </div>
      </div>

      {review.comment && (
        <p className="mt-4 rounded-2xl bg-gray-50 p-4 text-sm text-gray-600">
          {review.comment}
        </p>
      )}

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-gray-400">
          Reviewed on {new Date(review.createdAt).toLocaleDateString()}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(review)}
            className="flex items-center gap-1 rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-orange-50 hover:text-orange-600"
          >
            <Pencil size={14} />
            Edit
          </button>

          <button
            onClick={() => onDelete(review._id)}
            className="flex items-center gap-1 rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
