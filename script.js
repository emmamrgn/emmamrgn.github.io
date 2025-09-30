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

    // 6. Popup avec lecteur PDF intégré pour le CV
    const downloadButton = document.querySelector('#download-button');
    if (downloadButton) {
        downloadButton.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Créer un popup avec lecteur PDF intégré
            const modal = document.createElement('div');
            modal.innerHTML = `
                <div style="
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 10000;
                    animation: fadeIn 0.3s ease;
                    padding: 20px;
                    box-sizing: border-box;
                ">
                    <div style="
                        background: white;
                        border-radius: 15px;
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                        width: 90%;
                        max-width: 900px;
                        height: 90%;
                        max-height: 800px;
                        display: flex;
                        flex-direction: column;
                        transform: scale(0.9);
                        animation: popIn 0.3s ease forwards;
                        overflow: hidden;
                    ">
                        <!-- Header du popup -->
                        <div style="
                            padding: 1.5rem;
                            border-bottom: 1px solid #eee;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            background: linear-gradient(45deg, #4a90e2, #7cf0d7);
                            color: white;
                        ">
                            <div>
                                <h3 style="margin: 0; font-size: 1.2rem;">📄 CV - Emma Morgenstern</h3>
                                <p style="margin: 0.5rem 0 0 0; opacity: 0.9; font-size: 0.9rem;">Visualisation et téléchargement</p>
                            </div>
                            <button id="close-modal" style="
                                background: rgba(255, 255, 255, 0.2);
                                border: none;
                                color: white;
                                font-size: 1.5rem;
                                width: 40px;
                                height: 40px;
                                border-radius: 50%;
                                cursor: pointer;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                transition: background 0.2s ease;
                            " onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'">×</button>
                        </div>
                        
                        <!-- Contenu PDF -->
                        <div style="flex: 1; position: relative; background: #f5f5f5;">
                            <iframe 
                                src="cv/CV_EmmaMorgenstern.pdf#toolbar=1&navpanes=1&scrollbar=1&page=1&view=FitH" 
                                style="
                                    width: 100%;
                                    height: 100%;
                                    border: none;
                                    background: white;
                                "
                                title="CV Emma Morgenstern"
                            ></iframe>
                            <div id="pdf-loading" style="
                                position: absolute;
                                top: 50%;
                                left: 50%;
                                transform: translate(-50%, -50%);
                                text-align: center;
                                color: #666;
                                font-size: 1.1rem;
                            ">
                                <div style="
                                    width: 40px;
                                    height: 40px;
                                    border: 4px solid #f3f3f3;
                                    border-top: 4px solid #4a90e2;
                                    border-radius: 50%;
                                    animation: spin 1s linear infinite;
                                    margin: 0 auto 1rem auto;
                                "></div>
                                Chargement du CV...
                            </div>
                        </div>
                        
                        <!-- Footer avec boutons -->
                        <div style="
                            padding: 1rem 1.5rem;
                            border-top: 1px solid #eee;
                            display: flex;
                            gap: 1rem;
                            justify-content: center;
                            background: #fafafa;
                        ">
                            <button id="download-pdf" style="
                                background: linear-gradient(45deg, #4a90e2, #7cf0d7);
                                color: white;
                                border: none;
                                padding: 0.75rem 1.5rem;
                                border-radius: 8px;
                                cursor: pointer;
                                font-weight: 500;
                                transition: all 0.2s ease;
                                display: flex;
                                align-items: center;
                                gap: 0.5rem;
                            " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(74,144,226,0.3)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                                📥 Télécharger le PDF
                            </button>
                            <button id="open-new-tab" style="
                                background: #f8f9fa;
                                color: #495057;
                                border: 2px solid #dee2e6;
                                padding: 0.75rem 1.5rem;
                                border-radius: 8px;
                                cursor: pointer;
                                font-weight: 500;
                                transition: all 0.2s ease;
                                display: flex;
                                align-items: center;
                                gap: 0.5rem;
                            " onmouseover="this.style.borderColor='#4a90e2'; this.style.color='#4a90e2'; this.style.transform='translateY(-2px)'" onmouseout="this.style.borderColor='#dee2e6'; this.style.color='#495057'; this.style.transform='translateY(0)'">
                                🔗 Ouvrir dans un nouvel onglet
                            </button>
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
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
            
            // Cacher l'indicateur de chargement après un délai
            setTimeout(() => {
                const loadingIndicator = modal.querySelector('#pdf-loading');
                if (loadingIndicator) {
                    loadingIndicator.style.display = 'none';
                }
            }, 2000);
            
            // Gestion des clics
            modal.querySelector('#close-modal').onclick = function() {
                document.body.removeChild(modal);
            };
            
            modal.querySelector('#download-pdf').onclick = function() {
                const link = document.createElement('a');
                link.href = 'cv/CV_EmmaMorgenstern.pdf';
                link.download = 'CV_Emma_Morgenstern.pdf';
                link.click();
            };
            
            modal.querySelector('#open-new-tab').onclick = function() {
                window.open('cv/CV_EmmaMorgenstern.pdf', '_blank');
            };
            
            // Fermer en cliquant à l'extérieur
            modal.onclick = function(e) {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                }
            };
            
            // Fermer avec la touche Échap
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && document.body.contains(modal)) {
                    document.body.removeChild(modal);
                }
            });
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