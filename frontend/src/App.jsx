import useAuth from "./hooks/useAuth";

export default function App() {
  const { user, login, logout } = useAuth();

  const handleLogin = () => {
    const user = { username: "exampleuser" };
    login(user);
  };

  const handleLogout = () => logout();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-md">
        {user ? (
          <p className="text-center text-xl text-gray-800 mb-4">
            Logged in as {user.username}
          </p>
        ) : (
          <p className="text-center text-xl text-gray-800 mb-4">
            Not logged in
          </p>
        )}
        <div className="flex justify-center space-x-4">
          {user ? (
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleLogin}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
