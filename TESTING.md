<h1>Component Testing with Jest</h1>

**Strategy**
Our component testing strategy involves writing tests for different components to ensure they function correctly in isolation and interact properly with given props and state. We focus on testing components that are composed of primitive components and accept more than two props, ensuring a broad coverage of different scenarios and edge cases.

**Selection of Components**
- Components chosen are those that play a critical role in the application, have complex logic, or are reused across different parts of the application.
- Components chosen : Sign in modal, Sign up modal, Review modal, Profile Icon, Sign out button, Price Filter Selector, Country Combobox Dropdown, Calendar Form for Published Modal

**Testing Methodologies**
- Mocking Local Storage: For components that require authentication or rely on token-based mechanisms, we create a mock local storage to simulate user authentication states.
- Mocking API Calls: Components that make API calls are tested with mocked API responses to ensure that they can handle various response scenarios (success and error states)
- Edge Case Consideration: We thoroughly test edge cases to ensure the robustness of components under various unexpected conditions.
- Props and State Testing: Each component is tested with different sets of props and state to ensure they react and render correctly.
- Functionality Testing: Each component undergoes testing that simulates real-world usage scenarios to ensure they perform as expected.

<h1>Second UI Testing with Cypress</h1>

**Rationale**

The testing that i went and undergoed was testing the other functionalities that the first ui test did not use, the first one being adding more availabities (up to 4 dates) and making sure that they all work. The second thing that i felt had to be different was to check if the search functionality works, we used the normal search function (check by title or city), the third one was for the owner of the property to accept the booking and let the user staying at the AirBRB to leave a review to check if our review systems were working. Another one that we decided to do was to check if adding more property images are working as realistically if we were to host an airbnb we don't want to see a listing with just one photo.
