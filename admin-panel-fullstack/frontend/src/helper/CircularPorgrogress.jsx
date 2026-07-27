const CircularProgress = ({ percentage }) => {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      <svg className="w-full h-full" viewBox="0 0 50 50">
        <circle
          className="text-gray-200"
          strokeWidth="5"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="25"
          cy="25"
        />
        <circle
          className="text-green-500"
          strokeWidth="5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="25"
          cy="25"
          transform="rotate(-90 25 25)"
        />
      </svg>
      <span className="absolute text-sm font-medium text-gray-700">
        {percentage}%
      </span>
    </div>
  );
};
export default CircularProgress;
