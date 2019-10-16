
$(document).ready(function () {

    console.log("table-events.js is connected to the page")

    // Click function that creates a <tr>
    $("#map-submit-button").click(function (event) {
        event.preventDefault();
        console.log("Submit button clicked!")

        var destinationName = $("#destination-name").val().trim();
        var destinationState = $("#destination-state").val().trim();
        var durationStay = $("#duration-value").val().trim();
        var getInfoButton = ('<button type="button" class="btn btn-info get-info-button">Get Info!</button>');
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
    $(".get-info-button").click(function () {
        // event.preventDefault();
        console.log("Get Info Button clicked!");

        // var destinationName = $("#destination-name").val().trim();
        // var destinationState = $("#destination-state").val().trim();
        // var durationStay = $("#duration-value").val().trim();

    });

    // Click funtion that removes a <tr>
    // $(".remove-button").live('click', function () {
    //     $(this).closest('tr').remove();
    // });
});
