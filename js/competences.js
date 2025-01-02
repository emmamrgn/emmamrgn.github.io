document.addEventListener('DOMContentLoaded', function() {
    const competences = document.querySelectorAll('#competences .competence');

    competences.forEach(competence => {
        competence.addEventListener('mouseover', function() {
            competence.classList.add('highlight'); // Ajoute une classe pour le survol
        });

        competence.addEventListener('mouseout', function() {
            competence.classList.remove('highlight'); // Retire la classe
        });
    });
});