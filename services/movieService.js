
const axios = require("axios");
const moment = require("moment-timezone");

const getRecommendations = async (genre, time) => {
  try {
    const { data: movies } = await axios.get(
      "https://pastebin.com/raw/cVyp3McN"
    );

    const userTimezone = moment.tz.guess();
    const formattedTime = moment(time, "HH:mm")
      .add(30, "minutes")
      .tz(userTimezone)
      .format("HH:mm:ss");

    const suitableMovies = movies.filter((movie) => {
      const genreLower = genre.toLowerCase();
      const movieGenresLower = movie.genres.map((g) => g.toLowerCase());
      return (
        movieGenresLower.includes(genreLower) &&
        movie.showings.some((showing) => showing >= formattedTime)
      );
    });

    if (suitableMovies.length === 0) {
      return { success: false, message: "No movie recommendations found" };
    }

    const recommendedMovies = suitableMovies
      .sort((a, b) => b.rating - a.rating)
      .map((movie) => ({
        name: movie.name,
        showings: movie.showings.filter((showing) => showing >= formattedTime),
      }));

    return { success: true, data: recommendedMovies };
  } catch (error) {
    console.error("Error fetching movie data:", error.message);
    return { success: false, message: "Error fetching movie data" };
  }
};

module.exports = { getRecommendations };
