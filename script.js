const skills = document.querySelectorAll('.skill');

skills.forEach(skill => {
    skill.addEventListener('click', function() {
        this.classList.add('animate-skill');
        setTimeout(() => {
            this.classList.remove('animate-skill');
        }, 1000); // Adjust the duration to match your animation
    });
})



document.querySelector('#download-button').addEventListener('click', function(event) {
    event.preventDefault();
    
    // Afficher un popup de confirmation
    if (confirm('Voulez-vous télécharger le CV d\'Emma Morgenstern ?')) {
        window.open('cv/CV_EmmaMorgenstern.pdf', '_blank');
    }
});