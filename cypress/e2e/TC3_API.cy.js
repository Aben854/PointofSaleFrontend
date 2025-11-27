describe("TC_3API - Verify API endpoint payment scenarios", () => {
  const baseUrl = "https://pointofsale-bhvj.onrender.com";

  // Helper to verify each API response
  function verifyApiResponse(endpoint, expectedStatus, expectedMessagePart) {
    cy.request({
      url: `${baseUrl}${endpoint}`,
      failOnStatusCode: false, // let Cypress handle error codes manually
    }).then((response) => {
      cy.log(`Response from ${endpoint}:`, JSON.stringify(response.body));

      expect(response.status).to.eq(expectedStatus);
      expect(JSON.stringify(response.body).toLowerCase()).to.include(
        expectedMessagePart.toLowerCase()
      );
    });
  }

  it("should return correct responses for all payment outcomes", () => {
    //
    // 1️⃣ SUCCESS CASE (60%)
    //
    verifyApiResponse("/success", 200, "success");

    //
    // 2️⃣ INCORRECT CARD DETAILS (17%)
    //
    verifyApiResponse("/incorrect-card", 200, "card details incorrect");

    //
    // 3️⃣ INSUFFICIENT FUNDS (17%)
    //
    verifyApiResponse("/insufficient-funds", 200, "insufficient");

    //
    // 4️⃣ SERVER ERROR (6%)
    //
    verifyApiResponse("/error500", 500, "internal server");
  });
});
