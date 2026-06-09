iStudent Project 2.0
========


The core structure and functionality of the website is complete.

The project includes a homepage with a hero slider,a products page showcasing PC hardware, a games page featuring Game of the Year winners, and a cart page for reviewing orders.

Each page is styled with CSS and populated with data using JavaScript.

The navigation bar is implemented as a reusable component across all pages.


Issues i cannot solve
========

1) On the homepage, the hero slider's "View All Parts" button is not functioning as intended. When clicked, it should navigate to the products page, but currently it does not respond.

2) When the add to cart button is clicked it adds more than one item to the cart. It should only add one item per click, but it seems to be adding multiple items at once.

3) The filter buttons on the products and games pages are not working. When a filter button is clicked, it should update the displayed items to match the selected category, but currently it does not change the displayed items at all.

4) The navigation bar is not displaying correctly on mobile devices. It should collapse into a hamburger menu, but currently it remains in its desktop layout, making it difficult to navigate on smaller screens.

Things i still need to add
========

1) I need to add images for all products and games. Currently, the product and game cards are populated with placeholder images, but I need to replace these with actual images of the hardware and games.

2) Navigation to each page from different page, there is no navigation menu on some of the pages. Using the back and forth buttons on the browser is the only way to navigate between pages, which is not ideal.
   I need to implement a consistent navigation bar across all pages to allow users to easily access different sections of the website.

3) I need to implement the functionality for the filter buttons on the products and games pages. Currently, the buttons are present but do not perform any filtering action.
   I need to write JavaScript code that listens for clicks on these buttons and updates the displayed items accordingly.

Sources
========

- For the hero slider on the homepage, I referred to various online tutorials and documentation on implementing sliders using HTML, CSS, and JavaScript. I also looked at examples of similar sliders on other websites for design inspiration.
- For the add to cart functionality, I researched how to manage state in JavaScript and how to update the cart contents dynamically. I also looked at examples of shopping cart implementations on e-commerce websites.
- For the filter buttons, I studied how to manipulate the DOM using JavaScript to show and hide elements based on user interactions. I also looked at examples of filtering systems on product listing pages.
- For the responsive navigation bar, I researched how to create a hamburger menu using CSS and JavaScript. I also looked at examples of responsive navigation bars on various websites to understand best practices for mobile design.
