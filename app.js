document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-link:not(.has-submenu)");
    const pages = document.querySelectorAll(".page-view");
    const adminToggle = document.getElementById("adminToggle");
    const adminSubmenu = document.getElementById("adminSubmenu");

    function navigateTo(pageId) {
        // Hide all pages
        pages.forEach(p => p.classList.remove('active'));
        // Remove active from nav links
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

        // Show selected page
        const selectedPage = document.getElementById(`page-${pageId}`);
        if(selectedPage) selectedPage.classList.add('active');

        // Set active in nav
        const targetLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
        if(targetLink) {
            targetLink.classList.add('active');
            // If it's a submenu link, make sure parent is expanded
            if(targetLink.classList.contains('submenu-link')) {
                adminSubmenu.classList.add('expanded');
                document.querySelector('.submenu-icon').classList.add('rotated');
            }
        }
        
        // Update URL
        history.pushState(null, null, `#${pageId}`);
        window.scrollTo(0,0);
    }

    // Event Listeners for Navigation
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", (e) => {
            if(link.classList.contains('has-submenu')) return; // handled separately
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            navigateTo(pageId);
        });
    });

    // Admin Toggle
    if(adminToggle) {
        adminToggle.addEventListener("click", (e) => {
            e.preventDefault();
            const isClickingOnSubmenu = e.target.closest('.submenu-link');
            if(isClickingOnSubmenu) return;
            
            adminSubmenu.classList.toggle('expanded');
            adminToggle.querySelector('.submenu-icon').classList.toggle('rotated');
            
            // Also navigate to admin page
            const adminLink = adminToggle.querySelector('.nav-link');
            if(adminLink && e.target.closest('.has-submenu')) {
                 navigateTo('admin');
            }
        });
    }

    // Initialize from URL or default to home
    const hash = window.location.hash.replace('#', '');
    const initialPage = hash || 'home';
    navigateTo(initialPage);

    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        const hash = window.location.hash.replace('#', '');
        navigateTo(hash || 'home');
    });
});
