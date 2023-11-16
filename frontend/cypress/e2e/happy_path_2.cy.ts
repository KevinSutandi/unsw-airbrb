/**
 * Happy Path 2
 * Flow - First the user goes through the website, registers as a user, and then they want to go the listing page
 * after the listing page they want to create a listing and then they want to go to the profile page
 */

import 'cypress-file-upload';

context('Happy Path User Testing 2', () => {
  it('Redirects to the homepage', () => {
    cy.visit('http://localhost:3000');
    cy.url().should('include', '/');
  });

  it('User should open the profile modal and make sure sidebar is open', () => {
    cy.get('[data-cy=profile-menu]').as('profileMenu');
    cy.get('@profileMenu').find('button') // Adjust the selector based on your actual HTML structure
      .click();
    // Make sure that the text log in and sign up is there
    cy.get('button[name="login"]').should('be.visible');
    cy.get('button[name="register"]').should('be.visible');
  });

  /* ONLY TO BE USED WHEN TESTING FIRST TIME
  it('User should register as a user', () => {
    cy.get('button[name="register"]').click();

    // Make sure that all forms are there
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('input[name="confirmPassword"]').should('be.visible');
    cy.get('input[name="name"]').should('be.visible');

    // Fill out the form
    const email = 'example@gmeil.com';
    const password = 'password';
    const name = 'John Doe';
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="confirmPassword"]').type(password);
    cy.get('input[name="name"]').type(name);

    // Submit the form
    cy.get('button[name="submit-register"]').click();
  });
  */

  it('User should be able to login', () => {
    cy.get('button[name="login"]').click();

    // Make sure that all forms are there
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');

    // Fill out the form
    const email = 'example@gmeil.com';
    const password = 'password';

    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);

    // Submit the form
    cy.get('button[name="submit-login"]').click();
  })

  it('User should be logged in by checking the buttons', () => {
    cy.get('[data-cy=profile-menu]').as('profileMenu');
    cy.get('@profileMenu').find('button') // Adjust the selector based on your actual HTML structure
      .click();

    // Make sure that the text View Listings and Log Out is there
    cy.get('button[name="view-listings"]').should('be.visible');
    cy.get('button[name="logout"]').should('be.visible');
  });

  it('User should be able to go to the listing page', () => {
    cy.get('button[name="view-listings"]').click();
    cy.url().should('include', '/listings');
  });

  it('User should be able to navigate to create listing', () => {
    cy.get('[data-cy=create-listing]').as('createListingNavLink');
    // Click on the NavLink
    cy.get('@createListingNavLink').click();
    cy.url().should('include', 'listings/create');
  })

  it('User puts in title', () => {
    // Title Listing
    cy.get('input[name="listingTitle"]').as('listingTitle');
    cy.get('@listingTitle').should('be.visible');
    cy.get('@listingTitle').type('Test Listing');
  })

  it('User puts in property type', () => {
    // Set Property Type
    cy.get('[data-cy=property-type]').as('typeList');
    cy.get('@typeList').find('.ring-1').click();
    cy.get('@typeList').contains('Room').click();
    cy.get('@typeList').find('.truncate').should('have.text', 'Room');
  })

  it('User puts in property Amenities', () => {
    // Set Property Amenities
    cy.get('input[name="propertyAmenities"]').as('amenitiesList');
    cy.get('@amenitiesList').should('be.visible');
    cy.get('@amenitiesList').type('Wifi, Electricity, Water, Parking');
  })

  it('User puts in street Address', () => {
    // Set Street Address
    cy.get('input[name="streetAddress"]').as('streetAddress');
    cy.get('@streetAddress').should('be.visible');
    cy.get('@streetAddress').type('123 Test Street');
  })

  it('User puts in city', () => {
    // Set City
    cy.get('input[name="city"]').as('city');
    cy.get('@city').should('be.visible');
    cy.get('@city').type('Test City');
  })

  it('User puts in state', () => {
    // Set State
    cy.get('input[name="state"]').as('state');
    cy.get('@state').should('be.visible');
    cy.get('@state').type('Test State');
  })

  it('User puts in zip code', () => {
    // Set Zip Code
    cy.get('input[name="postalCode"]').as('zipCode');
    cy.get('@zipCode').should('be.visible');
    cy.get('@zipCode').type('12345');
  })

  it('User puts in country', () => {
    // Set Country
    cy.get('[data-cy=country]').as('countryList');
    cy.get('@countryList').find('.border-none').type('Australia');
    // Wait for a moment to allow the API call and rendering
    cy.wait(2000);
    // Click on the first option in the dropdown pl-10 is the class name
    cy.get('@countryList').find('.pl-10').first().click();
    cy.get('@countryList').find('.truncate').should('have.text', 'Australia');
  });

  it('User puts in price', () => {
    // Set Price
    cy.get('input[name="price"]').as('price');
    cy.get('@price').should('be.visible');
    cy.get('@price').type('100');
  })

  it('User puts in bathrooms', () => {
    // Set Number of Bathrooms
    cy.get('input[name="numBathrooms"]').as('numBathrooms');
    cy.get('@numBathrooms').should('be.visible');
    cy.get('@numBathrooms').type('3');
  })

  it('User puts in bedrooms', () => {
    // Set Number of Bedrooms
    cy.get('input[name="numBedrooms"]').as('numBedrooms');
    cy.get('@numBedrooms').should('be.visible');
    cy.get('@numBedrooms').type('2');
  })

  it('Check that the number of beds is correct and input number of beds', () => {
    cy.get('[data-cy="bed-input-indiv"]').should('have.length', 2);

    // Set Number of Beds
    cy.get('input[name="Bedroom 1"]').as('Bedroom 1');
    cy.get('@Bedroom 1').should('be.visible');
    cy.get('@Bedroom 1').type('2');

    cy.get('input[name="Bedroom 2"]').as('Bedroom 2');
    cy.get('@Bedroom 2').should('be.visible');
    cy.get('@Bedroom 2').type('1');
  })

  it('User uploads a thumbnail', () => {
    const fileName = 'src/assets/logo.jpeg'; // Update with your actual fixture file name

    // Get the file input and set the file
    cy.get('input[name="file-upload"]').as('image');
    cy.get('@image').should('be.visible');
    cy.get('@image').attachFile(fileName);
    // file name shoule be visible in the page
    cy.get('[data-cy="file-name"]').should('have.text', 'Selected file: logo.jpeg');
  });

  it('User creates the listing', () => {
    cy.get('button[name="create-listing-button"]').click();
    cy.url().should('include', '/listings');
  })
});
