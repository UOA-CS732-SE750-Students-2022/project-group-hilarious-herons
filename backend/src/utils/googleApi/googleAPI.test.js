const { getReivewfromGoogle, getNearbyPlace } = require("./googleAPI");

require("dotenv").config();

test("do return nearby place", async () => {
  const result = await getNearbyPlace(-36.852191, 174.763975);
  expect(result.results.length).not.toEqual(0);
});

test("do return nearby place detail", async () => {
  const result = await getReivewfromGoogle(-36.852191, 174.763975);
  expect(result.length).not.toEqual(0);
});
