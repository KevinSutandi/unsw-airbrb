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

    // cy.get('button').find('img[alt="Profile Icon"]').click();
    // cy.contains('button', 'Sign up').click();

    // cy.get('input[name=email]').focus().type(email);
    // cy.get('input[name=name]').focus().type(name);
    // cy.get('input[name=password]').focus().type(password);
    // cy.get('input[name=confirmPassword]').focus().type(password);

    // cy.contains('button', 'Register').click();

    // 1.2 Login
    cy.get('button').find('img[alt="Profile Icon"]').click();
    cy.contains('button', 'Login').click();

    cy.get('input[name=email]').focus().type(email);
    cy.get('input[name=password]').focus().type(password);

    cy.contains('button', 'Login').click();

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
    const thumbnail = 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg'

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


    // 3. Updates the thumbnail and title of the listing successfully
    // 4. Publish a listing successfully
    // 5. Unpublish a listing successfully
    // 6. Make a booking successfully
    // 7. Logs out of the application successfully
    // 8. Logs back into the application successfully
  });
});
