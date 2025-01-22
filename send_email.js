// Remplacez ces valeurs par vos informations
const userId = 'BhEU4R5KeG4pjCUHjCLYW';          // Votre User ID EmailJS
const serviceId = 'service_w506dcc';    // Votre Service ID EmailJS
const templateId = 'template_topi5kb';  // Votre Template ID EmailJS

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),   
        message: formData.get('message')
    };

    emailjs.send(serviceId, templateId, data, userId)
        .then(function(response) {
            alert('Votre message a été envoyé avec succès!');
            document.getElementById('contact-form').reset();
        }, function(error) {
            alert('Erreur lors de l\'envoi du message.');
            console.log(error);
        });
});
