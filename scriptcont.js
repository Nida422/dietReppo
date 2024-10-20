function sendmail(){
    var params={
        from_name: document.getElementById('completeName').value,
        subject:document.getElementById('subject').value,
        message: document.getElementById('message').value,
        number:document.getElementById('number').value,
        email: subject = document.getElementById('email').value,
    }
    emailjs.send('service_atm86wj', 'template_s5p35pb', params)
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        alert('Message sent successfully!');
        location.reload();
    }, function(error) {
        console.log('FAILED...', error);
        alert('Failed to send the message. Please try again later.');
    });
    
}