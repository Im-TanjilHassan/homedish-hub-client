const StatCard = ({ title, value }) => {
  return (
    <div className="bg-base-100 p-6 rounded-xl shadow text-center">
      <h4 className="text-sm font-medium text-neutral-content">{title}</h4>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
};
export default StatCard;