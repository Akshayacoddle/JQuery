$(document).ready(function () {
    for (let i = 1; i < 100; i += 1) {
        $('<option>', { value: i, text: i }).appendTo('select');
    }
    const form = $("#form");
    const name = $("#name");
    const address = $("#address");
    const dob = $("#dob");
    const age = $("#age");
    const agree = $("term");
    $("#submit").click(function (e) {
        e.preventDefault();
        validateInput();
    })
    const validateInput = () => {
        const nameVal = name.val();
        $(".error").remove();

        if (nameVal === '') {
            name.after('<div class="error">Name field is required</div>');
        }
        if (address.val().trim() === '') {
            address.after('<div class="error">Address field is required</div>');
        }
        if (dob.val() === '') {
            dob.after('<div class="error">DOB field is required</div>');
        }
        if ($('#age option:selected').val().length < 1) {
            $('#age').after('<div class="error">Age field is required</div>');
        }
        if ($("input[type='radio']:checked").length < 1) {
            $('#radioerror').after('<div class="error">Please select gender</div>');
        }

        if (!($('#term').is(':checked'))) {
            $('#checkerror').after('<div class="error">please confirm</div>');
        }
    }
})
