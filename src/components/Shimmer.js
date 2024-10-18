const Shimmer = () => {
  const shimmerCards = Array.from({ length: 12 }); // Adjust the number of shimmer cards

  return (
    <div className="res-container">
      {shimmerCards.map((_, index) => (
        <div className="shimmer-card" key={index}>
          <div className="shimmer-image"></div>
          <div className="shimmer-title"></div>
          <div className="shimmer-text"></div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
