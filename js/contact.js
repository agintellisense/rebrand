$(document).ready(function() {
    // Generate initial captcha
    generateCaptcha();

    // Handle form submission
    $('.agileits_mail_grid_right1 form').submit(function(e) {
        e.preventDefault();
        
        // Get form values
        var name = $('[name="Name"]').val();
        var email = $('[name="Email"]').val();
        var subject = $('[name="Subject"]').val();
        var message = $('[name="Message"]').val();
        var captchaAnswer = $('[name="captcha"]').val();
        var correctAnswer = $('#captchaQuestion').data('answer');

        // Validate captcha
        if (parseInt(captchaAnswer) !== parseInt(correctAnswer)) {
            showMessage('Incorrect captcha answer. Please try again.', 'error');
            generateCaptcha();
            $('[name="captcha"]').val('');
            return;
        }

        // Validate email
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Here you would typically send the data to your server
        // For now, we'll just show a success message
        showMessage('Thank you for your message! We will get back to you soon.', 'success');
        
        // Reset form
        this.reset();
        generateCaptcha();
    });
});

// Generate captcha numbers
function generateCaptcha() {
    var num1 = Math.floor(Math.random() * 10);
    var num2 = Math.floor(Math.random() * 10);
    var captchaQuestion = $('#captchaQuestion');
    
    captchaQuestion.text(num1 + ' + ' + num2 + ' = ?');
    captchaQuestion.data('answer', num1 + num2);
}

// Validate email format
function isValidEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Show message function
function showMessage(message, type) {
    var messageDiv = $('#formMessage');
    messageDiv.text(message)
              .removeClass('success error')
              .addClass(type)
              .show();
    
    setTimeout(function() {
        messageDiv.fadeOut();
    }, 5000);
}