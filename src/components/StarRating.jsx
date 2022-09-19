export const StarRating = ({ rating: { rate, count } }) => {
  return (
    <p>
      {Array(Math.round(rate))
        .fill(0)
        .map((rate) => (
          <span>⭐️</span>
        ))}
      <span>{count}rating</span>
    </p>
  );
};
