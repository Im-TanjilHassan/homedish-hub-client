const GlobalLoader = () => {
  return (
    <div className="fixed inset-0 bg-base-200 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="space-y-10">
        <h1 className=" text-4xl font-bold">Welcome to Our HomeDish-Hub</h1>
        <div className="w-20 h-20 mx-auto border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default GlobalLoader;
