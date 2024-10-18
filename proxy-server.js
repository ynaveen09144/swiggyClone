const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/swiggy", async (req, res) => {
  try {
    const response = await axios.get(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.89960&lng=80.22090&collection=80435&tags=layout_CCS_PureVeg&sortBy=&filters=&type=rcv2&offset=0&page_type=null",
      {
        headers: {
          "User-Agent": "Mozilla/5.0", // Avoid being blocked as a bot
          Accept: "application/json", // Ensure correct response format
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching data from Swiggy:", error.message);
    console.error("Detailed error:", error.response?.data || error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
