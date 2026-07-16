import { useAuth } from "../../context/AuthContext";

const Topbar = () => {
  const { currentUser } = useAuth();

  return (
    <header className="flex items-center justify-between bg-white px-8 py-5 shadow">
      <h1 className="text-2xl font-bold">Welcome, {currentUser?.name}</h1>

      <img
        src={
          currentUser?.avatar ||
          "https://ui-avatars.com/api/?name=" + currentUser?.name
        }
        alt="avatar"
        className="h-12 w-12 rounded-full"
      />
    </header>
  );
};

export default Topbar;
