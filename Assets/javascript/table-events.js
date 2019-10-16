$(document).ready(function () {

    console.log("table-events.js is connected to the page")

    // Click function that creates a <tr>
    $("#map-submit-button").click(function (event) {
        event.preventDefault();
        console.log("Submit button clicked!")

        var destinationName = $("#destination-name").val().trim();
        var destinationState = $("#destination-state").val().trim();
        var durationStay = $("#duration-value").val().trim();
        var getInfoButton = $('<button type="button" class="btn btn-info get-info-button">Get Info!</button>');
        getInfoButton.attr("data-name", destinationName);
        getInfoButton.attr("data-state", destinationState);
        getInfoButton.attr("data-duration", durationStay);
        var removeButton = ('<button type="button" class="btn btn-danger remove-button">Remove</button>');

        console.log("Destination Name: " + destinationName);
        console.log("Destination State: " + destinationState);
        console.log("Duration of stay: " + durationStay + " days");


        var newTablerow = $("<tr>").append(
            $("<td>").text(destinationName),
            $("<td>").text(destinationState),
            $("<td>").text(durationStay + " days"),
            $("<td>").html(getInfoButton),
            $("<td>").html(removeButton),
        );

        $(".table").append(newTablerow);
    });

    // Function that captures the inputs of the <tr> and stores them as variables
    $(document).on("click", ".get-info-button", function () {
        event.preventDefault();
        console.log("Get Info Button clicked!");

        var destination = $(this).attr("data-name");
        var state = $(this).attr("data-state");
        var duration = $(this).attr("data-duration");

        console.log("Table Destination: " + destination);
        console.log("Table State: " + state);
        console.log("Table Duration: " + duration);

        var searchQuery = destination;

        // Wikipedia call here
        fetchResults(searchQuery);

        // Weather call here
        weatherResults(destination);


    });


    //function that fetches the wikipedia result from the search query using wikipedia api call
    function fetchResults(searchQuery) {
        const queryUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=3&srsearch=${searchQuery}`;
        console.log(queryUrl);
        fetch(queryUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const results = data.query.search;
                displayResults(results);
            })
            .catch(() => console.log('An error occurred'));
    }

    function displayResults(results) {
        // Store a reference to `.searchResults`
        const searchResults = document.getElementById('wikipedia-results-div');
        // Remove all child elements
        searchResults.innerHTML = '';
        // Loop over results array
        results.forEach(result => {
            const url = encodeURI(`https://en.wikipedia.org/wiki/${result.title}`);

            searchResults.insertAdjacentHTML('beforeend',
                `<div class="resultItem">
              <h3 class="resultItem-title">
                <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
              </h3>
              <span class="resultItem-snippet">${result.snippet}</span><br>
              <a href="${url}" class="resultItem-link" target="_blank" rel="noopener">${url}</a>
            </div>`
            );
        });
    }

    // Click funtion that removes a <tr>
    // $(".remove-button").live('click', function () {
    //     $(this).closest('tr').remove();
    // });
    function weatherResults(destination) {
        console.log("the ajax is working")

        //var APIKey = "&appid=f6d21d14434f0b6e5decd7507719d5bff";
        var APIKey = "&appid=6d21d14434f0b6e5decd7507719d5bff";
        var endpoint = "/data/2.5/weather?q=";
        // Here we are building the URL we need to query the database
        var URL = "https://api.openweathermap.org";
        var queryURL = URL + endpoint + destination + APIKey;
        console.log(queryURL);
        //  Ajax call for weather API

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // console.log(queryURL);
            console.log(response);
            $(".destination").html("<h1>" + response.name + " Weather Details</h1>");
            $(".wind").text("Wind Speed: " + response.wind.speed);
            $(".humidity").text("Humidity: " + response.main.humidity);

            var cTemp = fToCelsius(response.main.temp);
            $(".temp").text("Temperature (C) " + cTemp);

            console.log("Wind Speed: " + response.wind.speed);
            console.log("Humidity: " + response.main.humidity);
            console.log("Temperature (F): " + response.main.temp);
        });
    };

    // We then created an AJAX call



    // fToCelsius();

    function fToCelsius(responseTemp) {
        var K = responseTemp;
        var c = K - 273.15;
        c = Math.round(c);
        return c;
    }


});
