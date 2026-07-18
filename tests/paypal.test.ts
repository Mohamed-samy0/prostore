import { generateAccessToken } from "../lib/paypal";
import { expect, test } from "@jest/globals";

// test to generate access token from paypal
test("generates a PayPal access token", async () => {
  const tokenResponse = await generateAccessToken();
  console.log(tokenResponse);
  expect(typeof tokenResponse).toBe("string");
  expect(tokenResponse.length).toBeGreaterThan(0);
});
