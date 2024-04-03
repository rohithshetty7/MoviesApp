const movieService = require("../services/movieService");

const getRecommendations = async (req, res) => {
  const { genre, time } = req.body;
  try {
    const recommendations = await movieService.getRecommendations(genre, time);
    console.log(recommendations);
    res.status(200).json({ data: recommendations });
    
  } catch (error) {
    console.error("Error fetching movie recommendations:", error.message);
    res.status(500).json({ error: "Error fetching movie recommendations" });
  }
};

module.exports = { getRecommendations };
