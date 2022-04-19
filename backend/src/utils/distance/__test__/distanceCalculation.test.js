const { distanceCalcultion } = require("../distanceCalculation");

test("test distance", async () => {
  const result = await distanceCalcultion(
    -36.91042,
    174.76936,
    -36.9112826,
    174.7698112
  );
  expect(result).toBe(0.1);
});
