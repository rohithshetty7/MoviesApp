

// const axios = require("axios");
// const moment = require("moment-timezone");
// const getRecommendations = async (genre, time) => {
//   try {
//     const { data: movies } = await axios.get(
//       "https://pastebin.com/raw/cVyp3McN"
//     );

//     // Parse the time string to construct a valid date object
//     const userTimezone = moment.tz.guess();
//     const currentTime = moment().tz(userTimezone); // Get current time in user's timezone
//     let formattedTime = moment(time, "HH:mm")
//       .add(30, "minutes") // Add 30 minutes to the provided time
//       .tz(userTimezone);
//     formattedTime = moment(formattedTime);
//     formattedTime=formattedTime.format("HH:mm:ss")
//     console.log("formattedTime",formattedTime);
//     const suitableMovies = movies.filter((movie) => {
//       // Convert both genre and movie genres to lowercase for case-insensitive comparison
//       const genreLower = genre.toLowerCase();
//       const movieGenresLower = movie.genres.map((g) => g.toLowerCase());
//       const isGenreMatch = movieGenresLower.includes(genreLower);
//       const hasLaterShowing = movie.showings.some((showing) => {
//         const isAfterTime = showing >= formattedTime; // Direct comparison without formatting
//         return isAfterTime;
//       });
//       return isGenreMatch && hasLaterShowing;
//     });
//     // console.log("Suitable movies:", suitableMovies);
//     if (suitableMovies.length === 0) {
//       return { success: false, message: "No movie recommendations found" };
//     }
//     const sortedMovies = suitableMovies.sort((a, b) => b.rating - a.rating);

//     console.log("sortedMovies",sortedMovies);
//     const recommendedMovies = sortedMovies.map((movie) => ({
//       name: movie.name,
//       showings: movie.showings.filter(showing => showing >= formattedTime),
//     }));
//     // console.log("Recommended movies:", recommendedMovies);
//     return { success: true, data: recommendedMovies };
//   } catch (error) {
//     console.error("Error fetching movie data:", error.message);
//     return "error fetching movie data";
//   }
// };
// module.exports = { getRecommendations };



const axios = require("axios");
const moment = require("moment-timezone");

const getRecommendations = async (genre, time) => {
  try {
    const { data: movies } = await axios.get(
      "https://pastebin.com/raw/cVyp3McN"
    );

    const userTimezone = moment.tz.guess();
    const currentTime = moment().tz(userTimezone);
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
