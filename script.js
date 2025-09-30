// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Animation des compétences au clic
    const skills = document.querySelectorAll('.skill-item');
    skills.forEach(skill => {
        skill.addEventListener('click', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.3s ease';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);
        });
    });

    // 2. Animation des cartes de projet au survol
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        });
    });

    // 3. Smooth scroll pour la navigation
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // 4. Animation d'apparition au scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'all 0.6s ease-out';
            }
        });
    }, observerOptions);

    // Observer tous les éléments qui doivent apparaître
    const elementsToAnimate = document.querySelectorAll('.card, .project-card, .school-item');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });

    // 5. Effet de typing pour le titre principal
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid white';
        heroTitle.style.animation = 'blink 1s infinite';
        
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                    heroTitle.style.animation = 'none';
                }, 500);
            }
        }
        
        setTimeout(typeWriter, 500);
    }

    // 6. Popup de confirmation pour le CV
    const downloadButton = document.querySelector('#download-button');
    if (downloadButton) {
        downloadButton.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Créer un popup personnalisé plus joli
            const modal = document.createElement('div');
            modal.innerHTML = `
                <div style="
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 10000;
                    animation: fadeIn 0.3s ease;
                ">
                    <div style="
                        background: white;
                        padding: 2rem;
                        border-radius: 15px;
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                        text-align: center;
                        max-width: 400px;
                        transform: scale(0.9);
                        animation: popIn 0.3s ease forwards;
                    ">
                        <h3 style="margin-bottom: 1rem; color: #4a90e2;">📄 Télécharger le CV</h3>
                        <p style="margin-bottom: 1.5rem; color: #666;">Voulez-vous télécharger le CV d'Emma Morgenstern ?</p>
                        <div style="display: flex; gap: 1rem; justify-content: center;">
                            <button id="confirm-download" style="
                                background: linear-gradient(45deg, #4a90e2, #7cf0d7);
                                color: white;
                                border: none;
                                padding: 0.75rem 1.5rem;
                                border-radius: 8px;
                                cursor: pointer;
                                font-weight: 500;
                                transition: transform 0.2s ease;
                            ">Oui, télécharger</button>
                            <button id="cancel-download" style="
                                background: #f0f0f0;
                                color: #666;
                                border: none;
                                padding: 0.75rem 1.5rem;
                                border-radius: 8px;
                                cursor: pointer;
                                font-weight: 500;
                                transition: transform 0.2s ease;
                            ">Annuler</button>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Ajouter les animations CSS
            const style = document.createElement('style');
            style.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes popIn {
                    to { transform: scale(1); }
                }
                button:hover {
                    transform: translateY(-2px) !important;
                }
            `;
            document.head.appendChild(style);
            
            // Gestion des clics
            modal.querySelector('#confirm-download').onclick = function() {
                window.open('cv/CV_EmmaMorgenstern.pdf', '_blank');
                document.body.removeChild(modal);
            };
            
            modal.querySelector('#cancel-download').onclick = function() {
                document.body.removeChild(modal);
            };
            
            // Fermer en cliquant à l'extérieur
            modal.onclick = function(e) {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                }
            };
        });
    }

    // 7. Parallax léger pour l'image de profil
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            if (scrolled < window.innerHeight) {
                profileImage.style.transform = `translateY(${scrolled * 0.1}px)`;
            }
        });
    }
});

// 8. Animation CSS pour le curseur qui clignote
const style = document.createElement('style');
style.textContent = `
    @keyframes blink {
        0%, 50% { border-color: white; }
        51%, 100% { border-color: transparent; }
    }
`;
document.head.appendChild(style);