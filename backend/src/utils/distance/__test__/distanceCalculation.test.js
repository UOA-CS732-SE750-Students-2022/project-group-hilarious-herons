const { distanceCalculation } = require("../distanceCalculation");

test("test distance", async () => {
  const result = await distanceCalculation(
    -36.91042,
    174.76936,
    -36.9112826,
    174.7698112
  );
  expect(result).toBe(0.1);
});

test("test not valide distance", async () => {
  try {
    const result = await distanceCalculation(
      "aaaa",
      174.76936,
      -36.9112826,
      174.7698112
    );
  } catch (e) {
    expect(e);
  }
});

test("test not valide distance", async () => {
  try {
    const result = await distanceCalculation(
      174.76936,
      -36.9112826,
      174.7698112
    );
  } catch (e) {
    expect(e);
  }
});
