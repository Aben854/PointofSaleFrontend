describe("TC_2CART - Product Cart Testing", () => {
  const baseUrl = "https://pointofsalefrontend-086m.onrender.com";

  beforeEach(() => {
    // Visit the product page (must be accessible after sign-in)
    cy.visit(`${baseUrl}/Place%20an%20Order%20Page.html`);
  });

  it("should add items to the cart and update total correctly", () => {
    //
    // === STEP 1: Simulate adding a single item ===
    //
    cy.contains(/shirt/i).should("exist");
    cy.contains(/add to cart/i).first().click();

    // Verify cart shows the item and correct total
    cy.get("#cartItems li").should("have.length", 1);
    cy.get("#cartTotal").should("contain", "10"); // $10 item

    //
    // === STEP 2: Add 10 more items ===
    //
    for (let i = 0; i < 10; i++) {
      cy.contains(/add to cart/i).first().click();
    }

    // Expect 11 total items (1 original + 10 added)
    cy.get("#cartItems li").should("have.length", 11);

    //
    // === STEP 3: Verify total price calculation ===
    //
    cy.get("#cartTotal").invoke("text").then((text) => {
      const total = parseFloat(text);
      expect(total).to.equal(11 * 10); // 11 shirts at $10 each
    });

    //
    // === STEP 4: Verify individual item prices are displayed correctly ===
    //
    cy.get("#cartItems li").each(($el) => {
      cy.wrap($el).should("contain", "$10");
    });

    //
    // === STEP 5: Check that the checkout button is visible and works ===
    //
    cy.contains(/checkout items/i).should("be.visible").click();

    // Confirm navigation to order confirmation page
    cy.url({ timeout: 10000 }).should("include", "OrderConfirmationPage.html");
  });
});
