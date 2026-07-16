import FoodCard from "./FoodCard";
import useFetch from "../../hooks/useFetch";

const PopularFoods = () => {
  const { data: foods, loading, error } = useFetch("/menu");

  if (loading) {
    return <div className="py-20 text-center">Loading foods...</div>;
  }

  if (error) {
    return (
      <div className="py-20 text-center text-red-500">Failed to load foods</div>
    );
  }

  return (
    <section
      className="
bg-white
py-20
"
    >
      <div
        className="
mx-auto
max-w-7xl
px-6
"
      >
        <h2
          className="
text-4xl
font-extrabold
text-gray-900
mb-12
"
        >
          Popular Foods
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {foods?.menus?.length > 0 ? (
            foods.menus.map((food) => <FoodCard key={food._id} food={food} />)
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No popular foods available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PopularFoods;
