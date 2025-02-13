document.addEventListener('DOMContentLoaded', function() {
    const skills = document.querySelectorAll('.skill');

    skills.forEach(skill => {
        skill.addEventListener('click', function() {
            this.classList.add('animate-skill');
            setTimeout(() => {
                this.classList.remove('animate-skill');
            }, 1000); // Adjust the duration to match your animation
        });
    });
});

