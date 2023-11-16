context('Happy path', () => {
  beforeEach(() => {
    cy.visit('localhost:3000');
  });

  it('Admin', () => {
    // 1. Registers successfully
    cy.viewport(1920, 1080);
    const email = 'jane@gmail.com';
    const name = 'Jane Doe';
    const password = 'pw123';

    cy.get('button').find('img[alt="Profile Icon"]').click();
    cy.contains('button', 'Sign up').click();

    cy.get('input[name=email]').focus().type(email);
    cy.get('input[name=name]').focus().type(name);
    cy.get('input[name=password]').focus().type(password);
    cy.get('input[name=confirmPassword]').focus().type(password);

    cy.contains('button', 'Register').click();

    // 2. Creates a new listing successfully
    cy.get('button').find('img[alt="Profile Icon"]').click();
    cy.contains('button', 'View Listings').click();
    cy.contains('Add New Listing').click();

    const listingTitle = 'House';
    const propertyAmenitties = 'Rice cooker, air fryer, microwave';
    const streetAddress = '2547 Maple Avenue';
    const city = 'Springfield';
    const state = 'Illinois';
    const postalCode = '62704';
    const country = 'United States';
    const price = '300';
    const bathrooms = '2';
    const bedrooms = '2';

    cy.get('input[name=listingTitle]').focus().type(listingTitle);
    cy.contains('Select a type').click();
    cy.contains('Entire Place').click();
    cy.get('input[name=propertyAmenities]').focus().type(propertyAmenitties);
    cy.get('input[name=streetAddress]').focus().type(streetAddress);
    cy.get('input[name=city]').focus().type(city);
    cy.get('input[name=state]').focus().type(state);
    cy.get('input[name=postalCode]').focus().type(postalCode);
    cy.get('.country-input').focus().type(country);
    cy.contains(country).click();
    cy.get('input[name=price]').focus().type(price);
    cy.get('input[name=numBathrooms]').focus().type(bathrooms);
    cy.get('input[name=numBedrooms]').focus().type(bedrooms);
    cy.get('#bed_1').focus().type(bedrooms);
    cy.get('#bed_2').focus().type(bedrooms);

    cy.get('#file-upload').attachFile('/house.jpg');
    cy.contains('button', 'Create Listing').click();

    // 3. Updates the thumbnail and title of the listing successfully
    const newTitle = 'House with 2 bedrooms';
    const fromDate = '2024-01-15';
    const toDate = '2024-03-10';

    cy.contains('Edit Listing').click();
    cy.get('input[name=listingTitle]').clear()
    cy.get('input[name=listingTitle]').focus().type(newTitle);

    cy.get('#file-upload').attachFile('/house2.jpg');
    cy.contains('Save Changes').click();

    // 4. Publish a listing successfully
    cy.contains('Listings').click();
    cy.contains('Publish Listing').click();
    cy.get('input[name=fromDate]').focus().type(fromDate);
    cy.get('input[name=toDate]').focus().type(toDate);
    cy.get('.publish-btn').click();

    // 5. Unpublish a listing successfully
    cy.contains('Unpublish Listing').click();
    cy.get('.unpublish-btn').click();

    // 4. Publish again
    cy.contains('Listings').click();
    cy.contains('Publish Listing').click();
    cy.get('input[name=fromDate]').focus().type(fromDate);
    cy.get('input[name=toDate]').focus().type(toDate);
    cy.get('.publish-btn').click();

    // Log out and make a new account
    cy.get('button').find('img[alt="Profile Icon"]').click();
    cy.contains('button', 'Log out').click();

    // Sign up new account
    const anotherEmail = 'brucewayne@gmail.com';
    const anotherName = 'Bruce Wayne';
    const anotherPassword = 'batman';

    cy.get('button').find('img[alt="Profile Icon"]').click();
    cy.contains('button', 'Sign up').click({ force: true });

    cy.get('input[name=email]').focus().type(anotherEmail);
    cy.get('input[name=name]').focus().type(anotherName);
    cy.get('input[name=password]').focus().type(anotherPassword);
    cy.get('input[name=confirmPassword]').focus().type(anotherPassword);

    cy.contains('button', 'Register').click();

    // 6. Make a booking successfully
    cy.contains('House with 2 bedrooms').click();
    cy.get('input[name=checkin]').click().click();
    cy.get('input[name=checkin]').type('1/15/2024');

    cy.get('input[name=checkout]').click().click();
    cy.get('input[name=checkout]').type('1/18/2024');

    cy.contains('Book Now').click();
    // 7. Logs out of the application successfully
    cy.get('button').find('img[alt="Profile Icon"]').click();
    cy.contains('button', 'Log out').click();
    // 8. Logs back into the application successfully
    cy.get('button').find('img[alt="Profile Icon"]').click();
    cy.contains('button', 'Login').click({ force: true });

    cy.get('input[name=email]').focus().type(email);
    cy.get('input[name=password]').focus().type(password);

    cy.contains('button', 'Login').click();
  });
});
