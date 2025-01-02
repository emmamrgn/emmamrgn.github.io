// Fonction pour le défilement fluide
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        // Défilement fluide vers la section cible
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Ajout d'effets de survol sur les projets
const projets = document.querySelectorAll('.projet');

projets.forEach(projet => {
    projet.addEventListener('mouseenter', () => {
        projet.style.transform = 'scale(1.05)';
        projet.style.transition = 'transform 0.3s ease';
    });

    projet.addEventListener('mouseleave', () => {
        projet.style.transform = 'scale(1)';
    });
});