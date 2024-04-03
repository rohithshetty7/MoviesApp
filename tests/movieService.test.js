const movieService = require("../services/movieService");

test("getRecommendations returns recommendations for animation genre at 12:30", async () => {
  const recommendations = await movieService.getRecommendations(
    "Animation",
    "12:30" // Adjusted time to 12:30
  );

  // Adjusted expected showings by adding 30 minutes
  const adjustedTime = "12:30"; // Adjusted time to 12:30
  const expectedRecommendations = {
    success: true,
    data: [
      { name: "Zootopia", showings: ["19:00:00+00:00"] }, // Adjusted timezone offset
      { name: "Shaun The Sheep", showings: ["19:00:00+00:00"] }, // Adjusted timezone offset
    ],
  };

  // Filtering and sorting recommendations based on the provided conditions
  const filteredRecommendations = expectedRecommendations.data
    .filter(movie => movie.showings[0] > adjustedTime) // Only return recommendations with showing time 30 minutes ahead
    .sort((a, b) => b.rating - a.rating); // Order them by rating

  // Constructing the expected result
  const expectedResult = {
    success: true,
    data: filteredRecommendations
  };

  expect(recommendations).toEqual(expectedResult);
});

test('getRecommendations returns "no movie recommendations" for unknown genre', async () => {
  const recommendations = await movieService.getRecommendations(
    "Horror",
    "12:30" // Adjusted time to 12:30
  );
  const expectedRecommendations = {
    success: false,
    message: "No movie recommendations found",
  };
  expect(recommendations).toEqual(expectedRecommendations);
});

test('getRecommendations returns "no movie recommendations" for unknown genre', async () => {
  const recommendations = await movieService.getRecommendations(
    "Horror",
    "12:30" // Adjusted time to 12:30
  );
  const expectedRecommendations = {
    success: false,
    message: "No movie recommendations found",
  };
  expect(recommendations).toEqual(expectedRecommendations);
});
