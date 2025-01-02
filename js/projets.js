document.addEventListener('DOMContentLoaded', function() {
    const projets = document.querySelectorAll('#projets article');
    const popup = document.querySelector('.projet_popup');
    const contentPopup = document.querySelector('.content_popup');
    const btnClosePopup = document.querySelector('.btn_close_popup');

    projets.forEach(projet => {
        projet.addEventListener('click', function() {
            const titre = projet.querySelector('h3').innerText;
            const description = projet.querySelector('p').innerText;

            contentPopup.innerHTML = `
                <h3>${titre}</h3>
                <p>${description}</p>
            `;
            popup.style.display = 'flex'; // Affiche le popup
        });
    });

    btnClosePopup.addEventListener('click', function() {
        popup.style.display = 'none'; // Masque le popup
    });
});