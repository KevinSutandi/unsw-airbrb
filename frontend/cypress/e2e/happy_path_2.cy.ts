/**
 * Happy Path 2
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

  it('User edits the listing', () => {
    cy.get('[data-cy="edit-listing"]').click();
    cy.url().should('include', '/listings/edit');
  })

  it('User changes the title', () => {
    cy.get('input[name="listingTitle"]').as('listingTitle');
    cy.get('@listingTitle').should('be.visible');
    cy.get('@listingTitle').clear();
    cy.get('@listingTitle').type('Cat House');
  })

  it('Add property images', () => {
    const fileName = 'src/assets/yers.jpeg'
    const fileName2 = 'src/assets/yes.jpg'

    // Get the file input and set the file
    cy.get('input[name="property-img-upload"]').as('image');
    cy.get('@image').should('be.visible');
    cy.get('@image').attachFile(fileName);
    // image should be visible in the page
    cy.get('[data-cy="property-image"]').should('have.length', 1);

    cy.get('@image').attachFile(fileName2);
    // image should be visible in the page
    cy.get('[data-cy="property-image"]').should('have.length', 2);
  })

  it('Add more bedrooms', () => {
    cy.get('input[name="numBedrooms"]').as('numBedrooms');
    cy.get('@numBedrooms').should('be.visible');
    cy.get('@numBedrooms').clear();
    cy.get('@numBedrooms').type('4');
  })

  it('Check that the number of beds is correct and input number of beds', () => {
    cy.get('[data-cy="bed-input-indiv"]').should('have.length', 4);

    cy.get('input[name="Bedroom 1"]').as('Bedroom 1');
    cy.get('input[name="Bedroom 2"]').as('Bedroom 2');

    cy.get('@Bedroom 1').should('have.value', '2');
    cy.get('@Bedroom 2').should('have.value', '1');

    // Set Number of Beds
    cy.get('input[name="Bedroom 3"]').as('Bedroom 3');
    cy.get('@Bedroom 3').should('be.visible');
    cy.get('@Bedroom 3').type('2');

    cy.get('input[name="Bedroom 4"]').as('Bedroom 4');
    cy.get('@Bedroom 4').should('be.visible');
    cy.get('@Bedroom 4').type('1');
  })

  it('User updates the listing', () => {
    cy.contains('Save Changes').click();
    // Check that save button does not redir to listings page
    cy.url().should('include', '/listings/edit');

    cy.get('a[href="/listings"]').click();
    cy.url().should('include', '/listings');
  })

  it('User publishes the listing', () => {
    cy.get('button[name="publish-listing"]').click();

    const fromDate = '2024-01-15';
    const toDate = '2024-01-20';

    const fromDate2 = '2024-01-25';
    const toDate2 = '2024-02-20';

    cy.get('[data-cy=fromDate-0]').focus().type(fromDate);
    cy.get('[data-cy=toDate-0]').focus().type(toDate);

    cy.contains('Add availability').click();

    cy.get('[data-cy=fromDate-1]').focus().type(fromDate2);
    cy.get('[data-cy=toDate-1]').focus().type(toDate2);

    cy.get('button[name="publish-button"]').click();

    cy.get('button[name="unpublish-listing"]').should('be.visible');
  })

  it('User unpublishes the listing to add more dates', () => {
    cy.get('button[name="unpublish-listing"]').click();

    cy.get('button[name="unpublish"]').should('be.visible');
    cy.get('button[name="unpublish"]').click();

    cy.get('button[name="publish-listing"]').should('be.visible');
  })

  it('User publishes the listing', () => {
    cy.get('button[name="publish-listing"]').click();

    const fromDate = '2024-01-15';
    const toDate = '2024-01-20';

    const fromDate2 = '2024-01-25';
    const toDate2 = '2024-02-20';

    const fromDate3 = '2023-11-01';
    const toDate3 = '2023-11-20';

    const fromDate4 = '2024-12-10';
    const toDate4 = '2024-12-20';

    cy.get('[data-cy=fromDate-0]').focus().type(fromDate);
    cy.get('[data-cy=toDate-0]').focus().type(toDate);

    cy.contains('Add availability').click();

    cy.get('[data-cy=fromDate-1]').focus().type(fromDate2);
    cy.get('[data-cy=toDate-1]').focus().type(toDate2);

    cy.contains('Add availability').click();

    cy.get('[data-cy=fromDate-2]').focus().type(fromDate3);
    cy.get('[data-cy=toDate-2]').focus().type(toDate3);

    cy.contains('Add availability').click();

    cy.get('[data-cy=fromDate-3]').focus().type(fromDate4);
    cy.get('[data-cy=toDate-3]').focus().type(toDate4);

    cy.get('button[name="publish-button"]').click();

    cy.get('button[name="unpublish-listing"]').should('be.visible');
  })

  it('logout user', () => {
    cy.get('[data-cy=profile-menu]').as('profileMenu');
    cy.get('@profileMenu').find('button') // Adjust the selector based on your actual HTML structure
      .click();

    cy.get('button[name="logout"]').click();
    cy.url().should('include', '/');
  });

  it('Other user registers lmao', () => {
    cy.get('button[name="register"]').click();

    // Make sure that all forms are there
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('input[name="confirmPassword"]').should('be.visible');
    cy.get('input[name="name"]').should('be.visible');

    // Fill out the form
    const email = 'welovecats@gmail.com';
    const password = 'catcatcatcat';
    const name = 'Superman Batman';
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="confirmPassword"]').type(password);
    cy.get('input[name="name"]').type(name);

    // Submit the form
    cy.get('button[name="submit-register"]').click();
  });

  it('Other user searchs for 17jan to 20jan', () => {
    cy.contains('Search by category').click();
    cy.get('#default-search').should('be.visible');
    cy.get('#default-search').type('Cat House');
    cy.get('button[name="search"]').click();
    cy.get('body').type('{esc}');
  })

  it('Other user clicks on cat house', () => {
    cy.contains('Cat House').click();
    cy.url().should('include', '/listings/view');
  })

  it('Other user searchs for 17jan to 20jan', () => {
    cy.get('input[name="checkin"]').should('be.visible');
    cy.get('input[name="checkout"]').should('be.visible');

    const fromDate = '01/17/2024';
    const toDate = '01/20/2024';

    cy.get('input[name="checkin"]').focus().type(fromDate);
    cy.get('body').type('{esc}');

    cy.get('input[name="checkout"]').focus().type(toDate);
    cy.get('body').type('{esc}');

    // Verify that price is $300 on screen
    cy.get('[data-cy="total-price"]').should('have.text', '$300 AUD');

    cy.get('button[name="bookNow"]').click();

    cy.contains('Hooray!!').should('be.visible');
  })

  it('Other user logs out', () => {
    cy.get('[data-cy=profile-menu]').as('profileMenu');
    cy.get('@profileMenu').find('button') // Adjust the selector based on your actual HTML structure
      .click();

    cy.get('button[name="logout"]').click();
    cy.url().should('include', '/');
  })

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

  it('User should be able to go to the listing page', () => {
    cy.get('[data-cy=profile-menu]').as('profileMenu');
    cy.get('@profileMenu').find('button') // Adjust the selector based on your actual HTML structure
      .click();

    cy.get('button[name="view-listings"]').click();
    cy.url().should('include', '/listings');
  });

  it('User should be able to go to view bookings page', () => {
    cy.get('button[name="view-bookings"]').click();
    cy.url().should('include', '/bookings');
  })

  it('User should be able to view booking from welovecats', () => {
    cy.contains('welovecats@gmail.com').should('be.visible');
    cy.contains('Cat House').should('be.visible');
    cy.contains('17 January 2024').should('be.visible');
    cy.contains('20 January 2024').should('be.visible');

    cy.get('button[name="accept-booking"]').should('be.visible');
    cy.get('button[name="decline-booking"]').should('be.visible');

    cy.get('button[name="accept-booking"]').click();

    cy.contains('Status: Accepted').should('be.visible');
  })

  it('user logs out', () => {
    cy.get('[data-cy=profile-menu]').as('profileMenu');
    cy.get('@profileMenu').find('button') // Adjust the selector based on your actual HTML structure
      .click();

    cy.get('button[name="logout"]').click();
    cy.url().should('include', '/');
  })

  it('User should be able to login to make a review', () => {
    cy.get('button[name="login"]').click();

    // Make sure that all forms are there
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');

    // Fill out the form
    const email = 'welovecats@gmail.com';
    const password = 'catcatcatcat';

    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);

    // Submit the form
    cy.get('button[name="submit-login"]').click();
  })

  it('Other user clicks on cat house', () => {
    cy.contains('Cat House').click();
    cy.url().should('include', '/listings/view');
  })

  it('user makes a review', () => {
    cy.contains('Leave a review').as('review');
    cy.get('@review').should('be.visible');
    cy.get('@review').click()

    cy.get('svg[data-testid="star-5"]').click();
    cy.get('textarea[placeholder="Leave a review"]').type('This is a fantastic review');

    cy.contains('Submit').click();
  })

  it('checks that review is there', () => {
    cy.contains('1 reviews').should('be.visible');
  });

  it('user logs out', () => {
    cy.get('[data-cy=profile-menu]').as('profileMenu');
    cy.get('@profileMenu').find('button') // Adjust the selector based on your actual HTML structure
      .click();

    cy.get('button[name="logout"]').click();
    cy.url().should('include', '/');
  })
});
