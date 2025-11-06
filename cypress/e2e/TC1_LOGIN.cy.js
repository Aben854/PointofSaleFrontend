describe("TC_1LOGIN - Verify customer can sign up, sign out, and log back in", () => {
  // Generate random credentials for each run
  const randomUsername = `user_${Math.floor(Math.random() * 100000)}`;
  const randomPassword = `Pass*${Math.floor(Math.random() * 100000)}`;
  const baseUrl = "https://pointofsalefrontend-086m.onrender.com";

  it("should sign up, reload to simulate sign out, and sign back in", () => {
    //
    // === STEP 1: SIGN UP ===
    //
    cy.visit(`${baseUrl}/Create%20an%20account%20page.html`);

    cy.get('input[name="fName"]').type("Test");
    cy.get('input[name="lName"]').type("User");
    cy.get('input[name="email"]').type(`${randomUsername}@example.com`);
    cy.get('input[name="user_id"]').type(randomUsername);
    cy.get('input[name="password"]').type(randomPassword);
    cy.get('input[name="state"]').type("CA");
    cy.get('input[name="city"]').type("Los Angeles");
    cy.get('input[name="zip_code"]').type("90001");
    cy.get('input[name="address_line1"]').type("123 Main St");
    cy.get('input[name="address_line2"]').type("Apt 4B");

    // Click to sign up
    cy.contains(/verify email and sign up/i).click();

    // Confirm navigation to "Place an Order" page
    cy.url({ timeout: 10000 }).should("include", "Place%20an%20Order%20Page.html");

    //
    // === STEP 2: SIMULATE SIGN OUT ===
    //
    cy.wait(2000);
    cy.reload(); // mimic logging out
    cy.visit(`${baseUrl}/index.html`);

    //
    // === STEP 3: SIGN BACK IN ===
    // Usea IDs instead of name selectors
    cy.get('#username').type(randomUsername);
    cy.get('#password').type(randomPassword);
    cy.get("form").contains("Sign In").click();

    //
    // === STEP 4: VERIFY LOGIN SUCCESS ===
    //
    cy.url({ timeout: 10000 }).should("include", "Place%20an%20Order%20Page.html");
  });
});
