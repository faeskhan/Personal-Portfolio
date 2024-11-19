export const GradientMesh = ({ isDarkMode }) => {
  return (
    <div className="fixed inset-0 z-0">
      <div className={`absolute inset-0 opacity-30 ${
        isDarkMode 
          ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.3),rgba(0,0,0,0)_50%)]'
          : 'bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.3),rgba(0,0,0,0)_50%)]'
      }`} />
      <div className={`absolute inset-0 opacity-30 ${
        isDarkMode 
          ? 'bg-[radial-gradient(circle_at_80%_20%,rgba(167,139,250,0.3),rgba(0,0,0,0)_50%)]'
          : 'bg-[radial-gradient(circle_at_80%_20%,rgba(251,146,60,0.3),rgba(0,0,0,0)_50%)]'
      }`} />
    </div>
  );
}; 