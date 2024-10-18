import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Importing useParams to get restaurantId from the route
import Shimmer from "./Shimmer";

const RestaurantMenu = () => {
  const { restaurantId } = useParams(); // Getting restaurantId from the route
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    if (restaurantId) {
      fetchMenu();
    }
  }, [restaurantId]);

  const fetchMenu = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/menu/${restaurantId}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }

      const json = await response.json();

      // Extract the correct restaurant info from the 4th card (index 3)
      const restaurantCard = json?.data?.cards?.find(
        (card) => card?.card?.card?.info?.name
      );

      if (restaurantCard) {
        setResInfo(restaurantCard?.card?.card?.info);
      }

      // Find the menu items in the nested data
      const itemCards =
        json?.data?.cards?.find((card) => card.groupedCard)?.groupedCard
          ?.cardGroupMap?.REGULAR?.cards || [];

      const extractedItems = itemCards
        .map((group) => group?.card?.card?.itemCards || [])
        .flat()
        .map((item) => item?.card?.info);

      setMenuItems(extractedItems);
    } catch (err) {
      console.error("Error fetching menu:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Shimmer />;

  if (error) return <h1>Error: {error}</h1>;

  return (
    <div className="menu">
      {/* Display the restaurant name */}
      <h1>{resInfo?.name || "Restaurant"}</h1>
      <h2>{resInfo?.cuisines?.join(", ") || "Cuisines not available"}</h2>
      <ul>
        {menuItems.length > 0 ? (
          menuItems.map((item, index) => (
            <li key={index}>
              {item.name} - ₹{item.price / 100 || "N/A"}
            </li>
          ))
        ) : (
          <li>No items available</li>
        )}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
