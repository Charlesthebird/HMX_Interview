
## Nicholas Bucher - HMX Interview

### Design Decisions

* I first used a whiteboard to draw how the graphic elements would look on desktop and mobile devices, using mobile-first design principles. For desktop devices, I followed the given design precisely, and for mobile devices I separated the design elements into layout groups that would form the basis of the HTML design. If I had been using Angular 6 to develop this application, these layout groups would become Angular components later in the design process.

* In order for the design to behave as outlined on the whiteboard, I used the Bootstrap CSS library's grid layout classes to organize the design elements into a table. I designed this table to be responsive such that page resize events moved each of the elements to their correct new locations, and I tested this behaviour on mobile screen sizes using the Google Chrome developer tools.

* I used Google Fonts to find the 'Roboto' font used in the graphic, and followed the hexadecimal color codes from the graphic when writing the CSS rules.


### Development Decisions


*  The code design of the interactive follows the object-oriented programming model, with the program logic being contained within the `solution` object in 'js/main.js'. This decision to use object-oriented programming allows for the program logic of this interactive to be separate from other logic that may be added to the same webpage. Containing the logic for the interactive in this way is important because of the separation of concerns software engineering principle. In this principle, each code module is solely concerned with its separate, individual responsibilities. Successfully applying the separation of concerns principle to a project results in increased cohesion and decreased coupling in code modules, leading to increased modularity, fewer bugs, and improved maintainability. 
 

* For the JavaScript implementation, I first gathered and cached HTML element references in the `solution` object using JQuery. Next, I initialized the state of the interactive using the 'Yy' and 'Yy' genotype options, and set up event handling for window resize and button press events through the `solution` object. Event handling is set up such that new events trigger the `solution.prototype.handleEvents(event)` function. Window resize events result in the `solution.prototype.onResize()` function being called, and click events on the Punnett Square buttons result in the `solution.prototype.punnettButtonPressed(event)` function being called. If a button is presseed, the state of the visualization is updated, and if the browser window is resized, the styles of certain HTML elements are updated to reflect the new window size.

* I used ChartJS for the Phenotypic Ratio Chart. ChartJS contains sufficient options to replicate the design of the chart element from the graphic, and it is also the chart library with which I am the most familiar.



### Future Improvement

* For this interview, I chose to develop the interactive with HTML, CSS, and JavaScript so that it may run locally without a server. As a future improvement, I would port this interactive to Angular 6 or a similar framework in order to reduce code repetition and enhance code readability. 

* This interactive is meant to visualize the concept of inheritance using the Punnett Square. For a future improvement, I would consider researching and developing other visualizations to demonstrate more complicated inheritance structures. For example, if the user was able to choose descendants in the Punnett Square, then a list of ancestors must be maintained and the visualization updated accordingly. It may be also useful to create a tree structure to visualize sequences of inheritance over generations in this case.


