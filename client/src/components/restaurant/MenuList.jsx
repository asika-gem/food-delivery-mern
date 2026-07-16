import MenuCard from "./MenuCard";

const MenuList = ({ menus }) => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-8">Restaurant Menu</h2>

      {menus.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No menu items available.
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {menus.map((menu) => (
            <MenuCard key={menu._id} menu={menu} />
          ))}
        </div>
      )}
    </section>
  );
};

export default MenuList;
