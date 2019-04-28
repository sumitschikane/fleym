$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var contact = $("input#contact").val();
            var message = $("input#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "././mail/contact_me.php",
                type: "POST",
                data: {
                    name: name,
                    contact: contact,
                    email: email,
                    message: message
                },
                cache: false,
                dataType: "json",
                success: function(response) {
                    console.log(response);
                    if(response){
                        // Success message
                        $('#success').html("<div class='alert alert-success'>");
                        $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                        $('#success > .alert-success')
                            .append("<strong>Your message has been sent. </strong>");
                        $('#success > .alert-success')
                            .append('</div>');
                    }
                    else{
                        // Fail message
                        $('#success').html("<div class='alert alert-danger'>");
                        $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                        $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                        $('#success > .alert-danger').append('</div>');
                    }

                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function() {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});


$('#file').change(function(){
    $("#uploadimage").submit();
});


$(document).ready(function (e) {
$("#uploadimage").on('submit',(function(e) {
e.preventDefault();
    $("#message").empty();
    $('#loading').show();
    $.ajax({
        url: "././mail/ajax_php_file.php", // Url to which the request is send
        type: "POST",             // Type of request to be send, called as method
        data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
        contentType: false,       // The content type used when sending data to the server.
        cache: false,             // To unable request pages to be cached
        processData:false,        // To send DOMDocument or non processed data file it is set to false
        success: function(response)   // A function to be called if request succeeds
        {
           response = jQuery.parseJSON(response);
            if(response.status == 'success'){
                $('#myModal').modal('toggle');
                // Success message
                $('#uploadsuccess').html("<div class='alert alert-success'>");
                $('#uploadsuccess > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true' style='width:20px;'>&times;")
                    .append("</button>");
                $('#uploadsuccess > .alert-success')
                    .append("<strong>Thanks for uploading your resume! We will get back to you shortly.</strong>");
                $('#uploadsuccess > .alert-success')
                    .append('</div>');
            }
            else{
                 $('#myModal').modal('toggle');
                // Fail message
                $('#uploadsuccess').html("<div class='alert alert-danger'>");
                $('#uploadsuccess > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true' style='width:20px;'>&times;")
                    .append("</button>");
                $('#uploadsuccess > .alert-danger').append("<strong>Please upload valid file!");
                $('#uploadsuccess > .alert-danger').append('</div>');
            }
        }
    });
}));
});