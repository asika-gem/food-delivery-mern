import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  MessageSquareText,
  ClipboardList,
  X,
  Utensils,
} from "lucide-react";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import customerMenu from "../../config/customerMenu";
import { api } from "../../services/api";
import ReviewCard from "../../components/customer/ReviewCard";

const StarPicker = ({ value, onChange }) => (
  <div className="flex items-center gap-2">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        type="button"
        key={star}
        onClick={() => onChange(star)}
        className="transition hover:scale-110"
      >
        <Star
          size={32}
          className={
            star <= value
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          }
        />
      </button>
    ))}
  </div>
);

const ReviewModal = ({ target, onClose, onSubmit, submitting }) => {
  const [rating, setRating] = useState(target?.rating || 0);
  const [comment, setComment] = useState(target?.comment || "");

  const isEdit = Boolean(target?._id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {isEdit ? "Edit Review" : "Rate & Review"}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {target?.foodName} · {target?.restaurantName || target?.restaurant?.name}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-6 flex flex-col items-center gap-3 rounded-2xl bg-orange-50 py-6">
          <StarPicker value={rating} onChange={setRating} />
          <span className="text-sm font-medium text-orange-600">
            {rating === 0
              ? "Tap a star to rate"
              : ["", "Poor", "Fair", "Good", "Very Good", "Excellent"][rating]}
          </span>
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tell others what you thought about this dish..."
          rows={4}
          className="w-full resize-none rounded-2xl border border-gray-200 p-4 text-sm outline-none focus:border-orange-400"
        />

        <button
          disabled={rating === 0 || submitting}
          onClick={() => onSubmit({ rating, comment })}
          className="mt-6 w-full rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "Submitting..." : isEdit ? "Update Review" : "Submit Review"}
        </button>
      </motion.div>
    </div>
  );
};

const Reviews = () => {
  const [tab, setTab] = useState("pending");
  const [myReviews, setMyReviews] = useState([]);
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalTarget, setModalTarget] = useState(null); // pending item OR existing review
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [reviewsRes, pendingRes] = await Promise.all([
        api.get("/reviews/my"),
        api.get("/reviews/pending"),
      ]);

      setMyReviews(reviewsRes.data.reviews || []);
      setPending(pendingRes.data.pending || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async ({ rating, comment }) => {
    setSubmitting(true);
    try {
      if (modalTarget._id) {
        // Editing an existing review
        await api.put(`/reviews/${modalTarget._id}`, { rating, comment });
      } else {
        // Creating a review from a pending item
        await api.post("/reviews", {
          orderId: modalTarget.orderId,
          orderItemId: modalTarget.orderItemId,
          rating,
          comment,
        });
      }

      setModalTarget(null);
      await fetchAll();
      if (!modalTarget._id) setTab("my");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this review?");
    if (!ok) return;

    try {
      await api.delete(`/reviews/${id}`);
      fetchAll();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong.");
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="Customer" menu={customerMenu}>
        <div className="pt-24 text-center text-lg font-medium text-gray-500">
          Loading reviews...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Customer" menu={customerMenu}>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 to-orange-400 p-8 text-white shadow-xl"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <Star size={40} className="fill-white" />
              <h1 className="text-4xl font-bold">Reviews & Ratings</h1>
            </div>
            <p className="mt-3 text-orange-50">
              Share your experience and help others pick great food 🍽️
            </p>
          </div>
          <Star size={160} className="absolute -right-10 -bottom-10 opacity-20" />
        </motion.div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-orange-100 p-3">
                <MessageSquareText className="text-orange-500" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">{myReviews.length}</h2>
                <p className="text-gray-500">Reviews Written</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-yellow-100 p-3">
                <Star className="text-yellow-500" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">
                  {myReviews.length === 0
                    ? "—"
                    : (
                        myReviews.reduce((sum, r) => sum + r.rating, 0) /
                        myReviews.length
                      ).toFixed(1)}
                </h2>
                <p className="text-gray-500">Average Rating Given</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-purple-100 p-3">
                <ClipboardList className="text-purple-500" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">{pending.length}</h2>
                <p className="text-gray-500">Pending Reviews</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-3">
          <button
            onClick={() => setTab("pending")}
            className={`rounded-full px-6 py-2 font-medium transition ${
              tab === "pending"
                ? "bg-orange-500 text-white"
                : "bg-white text-gray-600 shadow hover:bg-orange-50"
            }`}
          >
            Pending Reviews ({pending.length})
          </button>

          <button
            onClick={() => setTab("my")}
            className={`rounded-full px-6 py-2 font-medium transition ${
              tab === "my"
                ? "bg-orange-500 text-white"
                : "bg-white text-gray-600 shadow hover:bg-orange-50"
            }`}
          >
            My Reviews ({myReviews.length})
          </button>
        </div>

        {/* Pending Reviews */}
        {tab === "pending" &&
          (pending.length === 0 ? (
            <div className="rounded-3xl bg-white p-16 text-center shadow-xl">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-orange-100">
                <Utensils size={44} className="text-orange-500" />
              </div>
              <h2 className="mt-8 text-2xl font-bold text-gray-700">
                You're all caught up!
              </h2>
              <p className="mx-auto mt-3 max-w-md text-gray-500">
                No delivered items are waiting for a review right now.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {pending.map((item) => (
                <div
                  key={item.orderItemId}
                  className="flex flex-col justify-between rounded-3xl bg-white p-6 shadow-lg"
                >
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {item.foodName}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {item.restaurantName}
                    </p>
                    <p className="mt-2 text-xs text-gray-400">
                      Ordered on {new Date(item.orderDate).toLocaleDateString()}
                    </p>
                  </div>

                  <button
                    onClick={() => setModalTarget(item)}
                    className="mt-5 w-full rounded-xl bg-orange-500 py-2.5 font-semibold text-white transition hover:bg-orange-600"
                  >
                    Rate & Review
                  </button>
                </div>
              ))}
            </div>
          ))}

        {/* My Reviews */}
        {tab === "my" &&
          (myReviews.length === 0 ? (
            <div className="rounded-3xl bg-white p-16 text-center shadow-xl">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-orange-100">
                <Star size={44} className="text-orange-500" />
              </div>
              <h2 className="mt-8 text-2xl font-bold text-gray-700">
                No Reviews Yet
              </h2>
              <p className="mx-auto mt-3 max-w-md text-gray-500">
                Reviews you write will show up here.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {myReviews.map((review) => (
                <ReviewCard
                  key={review._id}
                  review={review}
                  onEdit={setModalTarget}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ))}
      </div>

      <AnimatePresence>
        {modalTarget && (
          <ReviewModal
            target={modalTarget}
            submitting={submitting}
            onClose={() => setModalTarget(null)}
            onSubmit={handleSubmit}
          />
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default Reviews;
