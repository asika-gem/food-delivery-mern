import { Star, CalendarDays, Utensils, Pencil, Trash2 } from "lucide-react";

const ReviewCard = ({ review, onEdit, onDelete }) => {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Food Icon */}
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50">
            <Utensils size={22} className="text-orange-500" />
          </div>

          <div>
            <h3 className="font-bold text-gray-800">
              {review.foodName || review.menuItem?.name || "Food Item"}
            </h3>

            <p className="text-sm text-gray-500">
              {review.restaurantName || review.restaurant?.name || "Restaurant"}
            </p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-3 py-1">
          <Star size={15} className="fill-yellow-400 text-yellow-400" />

          <span className="text-sm font-bold text-yellow-600">
            {review.rating}
          </span>
        </div>
      </div>

      {/* Stars */}
      <div className="mt-5 flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={18}
            className={
              star <= review.rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-200"
            }
          />
        ))}
      </div>

      {/* Comment */}
      <div className="mt-4 rounded-2xl bg-gray-50 p-4">
        <p className="text-sm leading-6 text-gray-600">"{review.comment}"</p>
      </div>

      {/* Date */}
      <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
        <CalendarDays size={14} />

        <span>
          {new Date(review.createdAt || review.updatedAt).toLocaleDateString(
            undefined,
            {
              year: "numeric",
              month: "short",
              day: "numeric",
            },
          )}
        </span>
      </div>

      {/* Actions */}
      <div className="mt-5 flex gap-3 border-t border-gray-100 pt-5">
        <button
          onClick={() => onEdit(review)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-600 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
        >
          <Pencil size={16} />
          Edit
        </button>

        <button
          onClick={() => onDelete(review._id)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
