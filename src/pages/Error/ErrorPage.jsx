import { Link, useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-red-500">404</h1>

      <p className="mt-4 text-xl font-semibold">Page Not Found</p>

      <p className="mt-2 text-gray-500 max-w-md">
        The page you are trying to access does not exist or may have been moved.
      </p>

      {error && (
        <p className="mt-2 text-sm text-gray-400">
          {error.statusText || error.message}
        </p>
      )}

      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-primary text-white rounded-lg font-semibold"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
