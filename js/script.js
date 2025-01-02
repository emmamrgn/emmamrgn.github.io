// // Fonction pour le défilement fluide
// document.querySelectorAll('nav ul li a').forEach(anchor => {
//     anchor.addEventListener('click', function(e) {
//         e.preventDefault();

//         const targetId = this.getAttribute('href');
//         const targetElement = document.querySelector(targetId);

//         // Défilement fluide vers la section cible
//         targetElement.scrollIntoView({
//             behavior: 'smooth',
//             block: 'start'
//         });
//     });
// });

// // Ajout d'effets de survol sur les projets
// const projets = document.querySelectorAll('.projet');

// projets.forEach(projet => {
//     projet.addEventListener('mouseenter', () => {
//         projet.style.transform = 'scale(1.05)';
//         projet.style.transition = 'transform 0.3s ease';
//     });

//     projet.addEventListener('mouseleave', () => {
//         projet.style.transform = 'scale(1)';
//     });
// });


document.addEventListener('DOMContentLoaded', () => {
    // Sélection des éléments
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    const contactForm = document.querySelector('.contact-form');

    // Fonction pour afficher une section
    function showSection(sectionId) {
        // Cacher toutes les sections et retirer les classes active
        sections.forEach(section => {
            section.classList.remove('active');
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Afficher la section cible et activer le lien correspondant
        const targetSection = document.getElementById(sectionId);
        const targetLink = document.querySelector(`a[href="#${sectionId}"]`);
        
        if (targetSection) {
            targetSection.classList.add('active');
        }
        if (targetLink) {
            targetLink.classList.add('active');
        }

        // Scroll en douceur vers la section
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Gestion du clic sur les liens de navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = e.target.getAttribute('href').substring(1);
            showSection(sectionId);
        });
    });

    // Gestion du formulaire de contact
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Récupération des valeurs du formulaire
        const formData = {
            nom: document.getElementById('nom').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        // Simulation d'envoi de formulaire
        console.log('Données du formulaire :', formData);
        alert('Message envoyé avec succès !');
        contactForm.reset();
    });

    // Gestion de la navigation avec les touches du clavier
    document.addEventListener('keydown', (e) => {
        const sections = ['accueil', 'competences', 'projets', 'formation', 'contact'];
        const currentSection = document.querySelector('.section.active').id;
        const currentIndex = sections.indexOf(currentSection);

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            const nextIndex = (currentIndex + 1) % sections.length;
            showSection(sections[nextIndex]);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            const prevIndex = (currentIndex - 1 + sections.length) % sections.length;
            showSection(sections[prevIndex]);
        }
    });
});