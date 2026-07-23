import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  MessageSquareText,
  ClipboardList,
  X,
  Utensils,
  CalendarDays,
  Store,
  Edit3,
  Trash2,
} from "lucide-react";


import { api } from "../../services/api";
import ReviewCard from "../../components/customer/ReviewCard";

const Reviews = () => {
  const [myReviews, setMyReviews] = useState([]);
  const [pending, setPending] = useState([]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [modalTarget, setModalTarget] = useState(null);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // =========================
  // FETCH REVIEWS
  // =========================
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);

      const [reviewsRes, pendingRes] = await Promise.all([
        api.get("/reviews/my"),
        api.get("/reviews/pending"),
      ]);

      setMyReviews(reviewsRes.data.reviews || []);
      setPending(pendingRes.data.pending || []);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // OPEN REVIEW MODAL
  // =========================
  const openReviewModal = (item) => {
    setModalTarget(item);
    setRating(item.rating || 0);
    setComment(item.comment || "");
  };

  // =========================
  // CLOSE MODAL
  // =========================
  const closeModal = () => {
    setModalTarget(null);
    setRating(0);
    setComment("");
  };

  // =========================
  // SUBMIT / UPDATE REVIEW
  // =========================
  const handleSubmit = async () => {
    if (!rating) {
      alert("Please select a rating.");
      return;
    }

    if (!comment.trim()) {
      alert("Please write a review.");
      return;
    }

    try {
      setSubmitting(true);

      // Edit existing review
      if (modalTarget._id) {
        await api.put(`/reviews/${modalTarget._id}`, {
          rating,
          comment,
        });
      }

      // Create new review
      else {
        await api.post("/reviews", {
          orderId: modalTarget.orderId,
          orderItemId: modalTarget.orderItemId,
          rating,
          comment,
        });
      }

      closeModal();
      await fetchReviews();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Something went wrong while submitting your review.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  // =========================
  // DELETE REVIEW
  // =========================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/reviews/${id}`);

      fetchReviews();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Something went wrong while deleting the review.",
      );
    }
  };

  // =========================
  // AVERAGE RATING
  // =========================
  const averageRating =
    myReviews.length > 0
      ? (
          myReviews.reduce((total, review) => total + review.rating, 0) /
          myReviews.length
        ).toFixed(1)
      : "—";

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500" />

            <p className="mt-4 font-medium text-gray-500">
              Loading your reviews...
            </p>
          </div>
        </div>
      
    );
  }

  return (
      <div className="space-y-8">
        {/* =================================
            HEADER
        ================================= */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 to-orange-400 p-8 text-white shadow-lg"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <Star size={38} className="fill-white" />

              <div>
                <h1 className="text-3xl font-bold">Your Reviews</h1>

                <p className="mt-1 text-orange-50">
                  Share your food experience and help others discover great
                  food.
                </p>
              </div>
            </div>
          </div>

          <Star
            size={180}
            className="absolute -bottom-12 -right-10 fill-white opacity-10"
          />
        </motion.div>

        {/* =================================
            SUMMARY
        ================================= */}
        <div className="grid gap-5 md:grid-cols-3">
          {/* Reviews Written */}
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-orange-100 p-4">
                <MessageSquareText size={25} className="text-orange-500" />
              </div>

              <div>
                <p className="text-sm text-gray-500">Reviews Written</p>

                <h2 className="mt-1 text-3xl font-bold text-gray-800">
                  {myReviews.length}
                </h2>
              </div>
            </div>
          </div>

          {/* Average Rating */}
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-yellow-100 p-4">
                <Star size={25} className="fill-yellow-500 text-yellow-500" />
              </div>

              <div>
                <p className="text-sm text-gray-500">Average Rating</p>

                <div className="mt-1 flex items-center gap-2">
                  <h2 className="text-3xl font-bold text-gray-800">
                    {averageRating}
                  </h2>

                  {myReviews.length > 0 && (
                    <Star
                      size={18}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Pending Reviews */}
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-purple-100 p-4">
                <ClipboardList size={25} className="text-purple-500" />
              </div>

              <div>
                <p className="text-sm text-gray-500">Awaiting Review</p>

                <h2 className="mt-1 text-3xl font-bold text-gray-800">
                  {pending.length}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* =================================
            PENDING REVIEWS
        ================================= */}
        <section>
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-gray-800">
              Awaiting Your Review
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Tell us about the food you recently ordered.
            </p>
          </div>

          {pending.length === 0 ? (
            <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
                <Utensils size={35} className="text-orange-500" />
              </div>

              <h3 className="mt-6 text-xl font-bold text-gray-800">
                You're all caught up!
              </h3>

              <p className="mx-auto mt-2 max-w-md text-gray-500">
                You don't have any completed orders waiting for a review.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {pending.map((item) => (
                <motion.div
                  key={item.orderItemId}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-3xl bg-white p-6 shadow-sm transition hover:shadow-md"
                >
                  {/* Order Header */}
                  <div className="flex flex-col justify-between gap-4 border-b border-gray-100 pb-5 sm:flex-row">
                    <div>
                      <div className="flex items-center gap-2">
                        <Store size={20} className="text-orange-500" />

                        <h3 className="text-lg font-bold text-gray-800">
                          {item.restaurantName}
                        </h3>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <CalendarDays size={15} />

                          {new Date(item.orderDate).toLocaleDateString()}
                        </span>

                        {item.orderId && (
                          <span>Order #{String(item.orderId).slice(-6)}</span>
                        )}
                      </div>
                    </div>

                    <span className="h-fit rounded-full bg-green-50 px-4 py-1.5 text-sm font-medium text-green-600">
                      Delivered
                    </span>
                  </div>

                  {/* Food Item */}
                  <div className="mt-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50">
                        <Utensils size={25} className="text-orange-500" />
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {item.foodName}
                        </h4>

                        <p className="mt-1 text-sm text-gray-500">
                          How was your experience with this food?
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => openReviewModal(item)}
                      className="rounded-xl bg-orange-500 px-5 py-2.5 font-semibold text-white transition hover:bg-orange-600"
                    >
                      Rate & Review
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* =================================
            MY REVIEWS
        ================================= */}
        <section>
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-gray-800">My Reviews</h2>

            <p className="mt-1 text-sm text-gray-500">
              Reviews and ratings you've shared with the community.
            </p>
          </div>

          {myReviews.length === 0 ? (
            <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100">
                <Star size={35} className="text-yellow-500" />
              </div>

              <h3 className="mt-6 text-xl font-bold text-gray-800">
                No reviews yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-gray-500">
                Once you review your completed orders, they'll appear here.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {myReviews.map((review) => (
                <div key={review._id} className="relative">
                  {/* Existing ReviewCard */}
                  <ReviewCard
                    review={review}
                    onEdit={() => openReviewModal(review)}
                    onDelete={() => handleDelete(review._id)}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>)

      {/* =================================
          REVIEW MODAL
      ================================= */}
      <AnimatePresence>
        {modalTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-3xl bg-white p-7 shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {modalTarget._id
                      ? "Edit Your Review"
                      : "Rate Your Experience"}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {modalTarget.foodName} ·{" "}
                    {modalTarget.restaurantName || modalTarget.restaurant?.name}
                  </p>
                </div>

                <button
                  onClick={closeModal}
                  className="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Rating */}
              <div className="mt-7 rounded-2xl bg-orange-50 p-6 text-center">
                <p className="mb-4 font-medium text-gray-700">
                  How would you rate your experience?
                </p>

                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="transition hover:scale-110"
                    >
                      <Star
                        size={38}
                        className={
                          star <= rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    </button>
                  ))}
                </div>

                <p className="mt-3 text-sm font-medium text-orange-600">
                  {rating === 0
                    ? "Select your rating"
                    : rating === 1
                      ? "Poor"
                      : rating === 2
                        ? "Fair"
                        : rating === 3
                          ? "Good"
                          : rating === 4
                            ? "Very Good"
                            : "Excellent"}
                </p>
              </div>

              {/* Review */}
              <div className="mt-6">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Your Review
                </label>

                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={5}
                  placeholder="Tell others about your food and delivery experience..."
                  className="w-full resize-none rounded-2xl border border-gray-200 p-4 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                />
              </div>

              {/* Actions */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 rounded-xl border border-gray-200 py-3 font-semibold text-gray-600 transition hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  disabled={submitting || rating === 0}
                  onClick={handleSubmit}
                  className="flex-1 rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting
                    ? "Saving..."
                    : modalTarget._id
                      ? "Update Review"
                      : "Submit Review"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
  
};

export default Reviews;
