const LoadingIndicator = () => {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-700"></div>
    </div>
  );
};

export default LoadingIndicator;
