const pages = {
    home: `
        <h6 class="mb-3"><i class="bi bi-mortarboard-fill"></i> Education</h6>

        <div class="mb-3">
            <strong>Ph.D. in Computer Science</strong> · University of Debrecen<br>
            <span class="text-muted">Debrecen, Hungary</span>
            <span class="text-muted float-end">Sep 2025 – Present</span>
        </div>

        <div class="mb-3">
            <strong>M.Sc. in Software Engineering</strong> · VNU – University of Engineering and Technology<br>
            <span class="text-muted">Ha Noi, Viet Nam</span>
            <span class="text-muted float-end">Sep 2023 – Jun 2025</span>
            <ul class="mt-1 mb-0">
                <li>GPA: 3.21/4.00</li>
            </ul>
        </div>

        <div class="mb-3">
            <strong>B.Sc. in Computer Science</strong> · VNU – University of Engineering and Technology<br>
            <span class="text-muted">Ha Noi, Viet Nam</span>
            <span class="text-muted float-end">Sep 2019 – Jun 2023</span>
            <ul class="mt-1 mb-0">
                <li>GPA: 3.32/4.00</li>
            </ul>
        </div>

        <hr>
        <h6 class="mb-3"><i class="bi bi-briefcase-fill"></i> Work Experience</h6>

        <div class="mb-3">
            <strong>AI Engineer</strong> · Big Data Dept. - Mobifone IT<br>
            <span class="text-muted">Ha Noi, Viet Nam</span>
            <span class="text-muted float-end">May 2025 – Aug 2025</span>
            <ul class="mt-1 mb-0">
                <li>Maintaining and developing AI Camera for traffic analyze purposes.</li>
                <li>Upgrading and maintaining existing image-processing model.</li>
                <li>Developing VMS/CMS for AI Camera Systems.</li>
            </ul>
        </div>

        <div class="mb-3">
            <strong>Expert</strong> · Information Technology Dept. - Viet Nam General Department of Taxation<br>
            <span class="text-muted">Ha Noi, Viet Nam</span>
            <span class="text-muted float-end">Jan 2024 – Apr 2025</span>
            <ul class="mt-1 mb-0">
                <li>Maintaining and developing HTKK application - application for end-users to create tax forms.</li>
                <li>Upgrading and maintaining applications for the Vietnamese tax sector.</li>
                <li>Developing test cases and writing requirement analysis documentation.</li>
            </ul>
        </div>

        <div class="mb-3">
            <strong>Lecturer</strong> · MindX Technology School<br>
            <span class="text-muted">Ha Noi, Viet Nam</span>
            <span class="text-muted float-end">Sep 2022 – Dec 2022</span>
            <ul class="mt-1 mb-0">
                <li>Mentor over 20 secondary students interested in coding, logic and technology.</li>
                <li>Provide digital skills training roadmaps for students upon graduation.</li>
                <li>Summarizing students' learning outcomes and constructing a report on the progress of each learning session.</li>
            </ul>
        </div>
    `,
    research: `
        <h6 class="mb-3"><i class="bi bi-search"></i> Research Experience</h6>

        <div class="mb-3">
            <strong>Software Developer Intern</strong> · University of Engineering and Technology – Software Quality Assurance Lab<br>
            <span class="text-muted">Ha Noi, Viet Nam</span>
            <span class="text-muted float-end">Feb 2021 – May 2023</span>
            <ul class="mt-1 mb-0">
                <li>Master thesis titled: "Development of a Mobile Application for Real-Time Traffic State Prediction in Viet Nam Based on Big Data and Edge Computing"; Grade: 8.0/10</li>
                <li>Bachelor thesis titled: "Development Of A Signal Traceability Support Tool For MATLAB Simulink-Based Automotive Projects"; Grade: 9.1/10</li>
                <li>Researching MATLAB Simulink models for automobiles to analyze and generalize data.</li>
            </ul>
        </div>

        <div class="mb-3">
            <strong>Remote Undergraduate Research Assistant</strong> · GAIO Technology, Japan<br>
            <span class="text-muted">Tokyo, Japan</span>
            <span class="text-muted float-end">Feb 2021 – May 2023</span>
            <ul class="mt-1 mb-0">
                <li>Working in collaboration with the Software Quality Assurance Laboratory (SQA Lab) from Viet Nam National University – University of Engineering and Technology and enterprise to analyze the models and develop tools for automobile designs using MATLAB Simulink.</li>
                <li>Utilizing C#, ASP.NET, JavaScript and the MVC model to develop an internal data processing tool for enterprise-level automobile engine design.</li>
                <li>Developing the user interface of the system software.</li>
            </ul>
        </div>
    `,
    awards: `
        <h6 class="mb-3"><i class="bi bi-award-fill"></i> Awards & Achievements</h6>

        <div class="mb-3">
            <strong>Ranked 3rd</strong> · Scientific Research Conference for Undergraduates 2023<br>
            <span class="text-muted">VNU – University of Engineering and Technology (School-level award)</span>
            <span class="text-muted float-end">2023</span>
            <ul class="mt-1 mb-0">
                <li>Project: "Developing a Visualization and Analysis System for Automobile Design Models"</li>
            </ul>
        </div>

        <div class="mb-3">
            <strong>Ranked 2nd</strong> · Scientific Research Conference for Undergraduates 2023<br>
            <span class="text-muted">UET – FIT (Faculty-level award)</span>
            <span class="text-muted float-end">2023</span>
            <ul class="mt-1 mb-0">
                <li>Project: "Developing a Visualization and Analysis System for Automobile Design Models"</li>
            </ul>
        </div>

        <div class="mb-3">
            <strong>Excellent student of the course</strong> · VNU – University of Engineering and Technology<br>
            <span class="text-muted">Ha Noi, Viet Nam</span>
            <span class="text-muted float-end">2019 – 2023</span>
        </div>

        <div class="mb-3">
            <strong>Excellent student of the academic year</strong> · VNU – University of Engineering and Technology<br>
            <span class="text-muted">Ha Noi, Viet Nam</span>
            <span class="text-muted float-end">2020 – 2023</span>
            <ul class="mt-1 mb-0">
                <li>Achieved in: 2020–2021, 2021–2022, 2022–2023</li>
            </ul>
        </div>
    `,
    contact: `
        <h6 class="mb-3"><i class="bi bi-chat-dots-fill"></i> Contact</h6>

        <div class="mb-3">
            <strong><i class="bi bi-envelope-fill me-2"></i> Email</strong><br>
            <span class="text-muted">hoangphi.works@gmail.com</span>
            <ul class="mt-1 mb-0">
                <li><a href="mailto:hoangphi.works@gmail.com">hoangphi.works@gmail.com</a></li>
            </ul>
        </div>

        <div class="mb-3">
            <strong><i class="bi bi-linkedin me-2"></i> LinkedIn</strong><br>
            <span class="text-muted">Professional profile</span>
            <ul class="mt-1 mb-0">
                <li><a href="https://www.linkedin.com/in/hoangphi01/" target="_blank">linkedin.com/in/hoangphi01</a></li>
            </ul>
        </div>

        <div class="mb-3">
            <strong><i class="bi bi-github me-2"></i> GitHub</strong><br>
            <span class="text-muted">Code repository</span>
            <ul class="mt-1 mb-0">
                <li><a href="https://github.com/hoangphi01" target="_blank">github.com/hoangphi01</a></li>
            </ul>
        </div>

        <div class="mb-3">
            <strong><i class="bi bi-geo-alt-fill me-2"></i> Location</strong><br>
            <span class="text-muted">Current residence</span>
            <ul class="mt-1 mb-0">
                <li>Debrecen, Hungary</li>
            </ul>
        </div>
    `,
    tools: `
        <h6 class="mb-3"><i class="bi bi-wrench-adjustable"></i> My Tools</h6>

        <div class="mb-3">
            <strong>Cryptography Calculator</strong> · Web Application<br>
            <span class="text-muted">Crypto and Number Toolkit</span>
            <ul class="mt-1 mb-0">
                <li>Modular arithmetic, Euclidean algorithms, number theory tools, cipher helpers.</li>
                <li><a href="calculation.html" class="btn btn-sm btn-primary mt-1"><i class="bi bi-box-arrow-up-right me-1"></i>Open Tool</a></li>
            </ul>
        </div>
    `
};

const content = document.getElementById('page-content');
const navLinks = document.querySelectorAll('.nav-link[data-page]');

let currentPage = null;

function saveScrollPos() {
    if (currentPage) {
        localStorage.setItem('scroll_tab_' + currentPage, content.scrollTop);
    }
}

function loadPage(page) {
    saveScrollPos();
    content.classList.remove('fade-in');
    content.classList.add('fade-out');

    setTimeout(() => {
        content.innerHTML = pages[page] || 'Page not found';
        content.classList.remove('fade-out');
        content.classList.add('fade-in');
        currentPage = page;
        localStorage.setItem('active_tab', page);

        const saved = parseInt(localStorage.getItem('scroll_tab_' + page));
        if (saved) content.scrollTop = saved;

        navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.page === page);
        });
    }, 150);
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

const initialPage = location.hash.slice(1) || 'home';
loadPage(initialPage);
