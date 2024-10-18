import { CDN_URL } from "../utils/constants";

const RestaurantCard = ({ resData }) => {
  const {
    cloudinaryImageId = "",
    name = "Unknown Restaurant",
    cuisines = [],
    avgRating = "N/A",
    locality = "Unknown Location",
  } = resData;

  const imageUrl = cloudinaryImageId
    ? `${CDN_URL}${cloudinaryImageId}`
    : "https://via.placeholder.com/300x200?text=Image+Not+Available";

  return (
    <div className="restaurant-card">
      <img
        src={imageUrl}
        alt={name}
        className="res-logo"
        onError={(e) => {
          e.target.src =
            "https://via.placeholder.com/300x200?text=Image+Not+Available";
        }}
      />
      <h2>{name}</h2>
      <p>{cuisines.join(", ")}</p>
      <p>Rating: {avgRating}</p>
      <p>Location: {locality}</p>
    </div>
  );
};

export default RestaurantCard;
