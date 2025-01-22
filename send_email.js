document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch('/', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            alert('Votre message a été envoyé avec succès!');
            document.getElementById('contact-form').reset();
        } else {
            alert('Une erreur est survenue. Veuillez réessayer.');
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
    });
});
