import {
  Star,
  Clock3,
  MapPin,
  Phone,
  CheckCircle,
  XCircle,
} from "lucide-react";

const RestaurantBanner = ({ restaurant }) => {
  if (!restaurant) return null;

  return (
    <section className="bg-gray-50">
      {/* Cover Image */}
      <div className="relative h-72 md:h-96">
        <img
          src={restaurant.coverImage}
          alt={restaurant.name}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Restaurant Card */}
      <div className="mx-auto -mt-24 max-w-7xl px-6 relative z-10">
        <div className="rounded-3xl bg-white p-8 shadow-xl">
          <div className="flex flex-col gap-8 md:flex-row">
            {/* Profile Image */}
            <img
              src={restaurant.profileImage}
              alt={restaurant.name}
              className="h-40 w-40 rounded-3xl border-4 border-white object-cover shadow-lg"
            />

            {/* Restaurant Details */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-4">
                <h1 className="text-4xl font-bold">{restaurant.name}</h1>

                {restaurant.isOpen ? (
                  <span className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-green-700 font-semibold">
                    <CheckCircle size={18} />
                    Open
                  </span>
                ) : (
                  <span className="flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-red-700 font-semibold">
                    <XCircle size={18} />
                    Closed
                  </span>
                )}
              </div>

              <p className="mt-4 text-gray-600">{restaurant.description}</p>

              {/* Info */}
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-3">
                  <Star className="fill-yellow-400 text-yellow-400" size={20} />
                  <span>4.8 Rating</span>
                </div>

                <div className="flex items-center gap-3">
                  <Clock3 size={20} />
                  <span>{restaurant.deliveryTime}</span>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin size={20} />
                  <span>{restaurant.address}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone size={20} />
                  <span>{restaurant.phone}</span>
                </div>
              </div>

              {/* Cuisine */}
              <div className="mt-8">
                <h3 className="mb-3 text-lg font-semibold">Cuisine</h3>

                <div className="flex flex-wrap gap-3">
                  {restaurant.cuisine?.map((item, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RestaurantBanner;
