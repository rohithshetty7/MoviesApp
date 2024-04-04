const axios = require("axios");
const { getRecommendations } = require("../services/movieService");

// Mocking axios get method
jest.mock("axios");

describe("getRecommendations function", () => {
  // Test case for successful retrieval of movie data
  test("fetches movie data successfully", async () => {
    const mockData = [
      {
        name: "Moonlight",
        rating: 98,
        genres: ["Drama"],
        showings: ["18:30:00+11:00", "20:30:00+11:00"],
      },
      {
        name: "Zootopia",
        rating: 92,
        genres: ["Action & Adventure", "Animation", "Comedy"],
        showings: ["19:00:00+11:00", "21:00:00+11:00"],
      },
      {
        name: "The Martian",
        rating: 92,
        genres: ["Science Fiction & Fantasy"],
        showings: ["17:30:00+11:00", "19:30:00+11:00"],
      },
      {
        name: "Shaun The Sheep",
        rating: 80,
        genres: ["Animation", "Comedy"],
        showings: ["19:00:00+11:00"],
      },
    ];

    axios.get.mockResolvedValue({ data: mockData });

    const result = await getRecommendations("Science Fiction & Fantasy", "10:10");

    expect(axios.get).toHaveBeenCalledWith("https://pastebin.com/raw/cVyp3McN");
    expect(result.success).toBe(true);
    expect(result.data.length).toBeGreaterThan(0);
  });

  // Test case for no movie recommendations found
  test("returns no movie recommendations found", async () => {
    const mockData = [];

    axios.get.mockResolvedValue({ data: mockData });

    const result = await getRecommendations("Horror", "10:10");

    expect(result.success).toBe(false);
    expect(result.message).toBe("No movie recommendations found");
  });

  // Test case for filtering movies based on genre and time
  test("returns recommended movies with correct genre and showings", async () => {
    const mockData = [
      {
        name: "Moonlight",
        rating: 98,
        genres: ["Drama"],
        showings: ["18:30:00+11:00", "20:30:00+11:00"],
      },
      {
        name: "Zootopia",
        rating: 92,
        genres: ["Action & Adventure", "Animation", "Comedy"],
        showings: ["19:00:00+11:00", "21:00:00+11:00"],
      },
      {
        name: "The Martian",
        rating: 92,
        genres: ["Science Fiction & Fantasy"],
        showings: ["17:30:00+11:00", "19:30:00+11:00"],
      },
      {
        name: "Shaun The Sheep",
        rating: 80,
        genres: ["Animation", "Comedy"],
        showings: ["19:00:00+11:00"],
      },
    ];

    axios.get.mockResolvedValue({ data: mockData });

    const result = await getRecommendations("Science Fiction & Fantasy", "10:10");

    // Asserting recommended movies
    expect(result.success).toBe(true);
    expect(result.data.length).toBe(1); // Only "The Martian" should be recommended
    expect(result.data[0].name).toBe("The Martian");
    expect(result.data[0].showings.length).toBe(2); // Two showings of "The Martian"
  });

  // Test case for error handling when fetching movie data fails
  test("handles error when fetching movie data fails", async () => {
    const errorMessage = "Failed to fetch data";

    axios.get.mockRejectedValue(new Error(errorMessage));

    const result = await getRecommendations("Comedy", "10:10");

    expect(result.success).toBe(false);
    expect(result.message).toBe("Error fetching movie data");
  });
});
