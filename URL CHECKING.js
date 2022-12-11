// create a form to accept the input URL
var form = document.createElement("form");
form.method = "GET";
form.action = "#";

// create a text field to enter the URL
var input = document.createElement("input");
input.type = "text";
input.name = "url";
input.placeholder = "Enter URL...";

// create a description for the text field
var description = document.createElement("p");
description.textContent =
  "Enter the URL you want to track and receive alerts for when it is clicked.";

// create a submit button
var button = document.createElement("button");
button.type = "submit";
button.textContent = "Submit";

// add the form elements to the page
form.appendChild(input);
form.appendChild(description);
form.appendChild(button);
document.body.appendChild(form);

// create a set to track unique clicks
var uniqueClicks = new Set();

// add a submit event listener to the form
form.addEventListener("submit", function (event) {
  // prevent the default submit action
  event.preventDefault();

  // get the value of the input field
  var url = input.value;

  // create a link element
  var link = document.createElement("a");
  link.href = url;

  // add a click event listener to the link
  link.addEventListener("click", function (event) {
    // prevent the default click action
    event.preventDefault();

    // add the current click to the set of unique clicks
    uniqueClicks.add(event.timeStamp);

    // redirect the user to the target URL
    window.location = link.href;
  });

  // check for clicks every 60 minutes
  setInterval(function () {
    // check if there are any unique clicks in the set
    if (uniqueClicks.size > 0) {
      // create a date object from the latest click
      var date = new Date(Math.max(...uniqueClicks));

      // format the date and time as a string
      var dateString =
        date.toLocaleDateString() + " " + date.toLocaleTimeString();

      // send an email using the built-in email API
      email.send({
        to: "user@example.com",
        subject: "Unique URL clicked",
        body: "A unique URL was clicked at " + dateString,
      });

      // clear the set of unique clicks
      uniqueClicks.clear();
    }
  }, 60 * 60 * 1000); // 60 minutes in milliseconds

  // add the link to the page
  document.body.appendChild(link);
});
