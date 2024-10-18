import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

app.get("/api/menu/:restaurantId", async (req, res) => {
  const { restaurantId } = req.params; // Extracting the restaurantId from the route

  try {
    console.log(`Fetching menu for restaurant ID: ${restaurantId}`);

    const response = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.89960&lng=80.22090&restaurantId=${restaurantId}&catalog_qa=undefined&submitAction=ENTER`,
      {
        method: "GET",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          Accept: "application/json, text/plain, */*",
          "Accept-Language": "en-US,en;q=0.5",
          "Cache-Control": "no-cache",
        },
      }
    );

    console.log("Response Status:", response.status);

    if (!response.ok) {
      throw new Error(`Swiggy API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Menu data fetched successfully:", data);
    res.json(data);
  } catch (error) {
    console.error("Error fetching menu:", error.message);
    res
      .status(500)
      .json({ error: "Failed to fetch menu", details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server is running at http://localhost:${PORT}`);
});
