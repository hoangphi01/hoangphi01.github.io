const content = document.getElementById('page-content');
const navLinks = document.querySelectorAll('.nav-link[data-page]');
const tabPages = document.querySelectorAll('.tab-page');

let currentPage = null;

function lsGet(key) { try { return localStorage.getItem(key); } catch(e) { return null; } }
function lsSet(key, val) { try { localStorage.setItem(key, val); } catch(e) {} }

function saveScrollPos() {
    if (currentPage) {
        lsSet('scroll_tab_' + currentPage, content.scrollTop);
    }
}

function loadPage(page) {
    saveScrollPos();

    // Hide all tab pages
    tabPages.forEach(tab => {
        tab.style.display = 'none';
        tab.setAttribute('aria-hidden', 'true');
    });

    // Show selected tab
    const target = document.getElementById('tab-' + page);
    if (target) {
        target.style.display = '';
        target.removeAttribute('aria-hidden');
    }

    currentPage = page;
    lsSet('active_tab', page);

    const saved = parseInt(lsGet('scroll_tab_' + page));
    if (saved) content.scrollTop = saved;

    navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.page === page);
    });
}

content.addEventListener('scroll', () => { saveScrollPos(); });

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.dataset.page;
        history.pushState(null, '', '#' + page);
        loadPage(page);
    });
});

window.addEventListener('popstate', () => {
    const page = location.hash.slice(1) || 'home';
    loadPage(page);
});

const initialPage = location.hash.slice(1) || lsGet('active_tab') || 'home';
loadPage(initialPage);
