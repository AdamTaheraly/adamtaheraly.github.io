document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-button');
    const contentSections = document.querySelectorAll('.content-section');

    function switchToSection(targetSectionId) {
        contentSections.forEach(section => {
            section.classList.remove('active-section');
        });

        navButtons.forEach(button => {
            button.classList.remove('active-tab');
        });

        const targetSection = document.getElementById(targetSectionId);
        if (targetSection) {
            targetSection.classList.add('active-section');
        }

        const activeButton = document.querySelector(`[data-section="${targetSectionId}"]`);
        if (activeButton) {
            activeButton.classList.add('active-tab');
        }

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        try {
            window.history.pushState({section: targetSectionId}, '', `#${targetSectionId}`);
        } catch (e) {
            console.log('History API not available');
        }
    }

    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionToShow = this.getAttribute('data-section');
            switchToSection(sectionToShow);
        });
    });

    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.section) {
            switchToSection(event.state.section);
        }
    });

    const currentHash = window.location.hash.substring(1);
    if (currentHash && document.getElementById(currentHash)) {
        switchToSection(currentHash);
    }
});
