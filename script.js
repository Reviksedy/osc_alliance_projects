const circleContainer = document.getElementById('circle-container');
const dotsCont = document.getElementById('dots-cont');
const noteElement = document.getElementById('current-note');
const dateElement = document.getElementById('current-date');
const pixelCountElement = document.getElementById('current-pixel-count');

const colors = [
    'radial-gradient(circle, rgba(255, 100, 255, 0.4), transparent 70%)',
    'radial-gradient(circle, rgba(180, 100, 255, 0.4), transparent 70%)'
];

for (let i = 0; i < 12; i++) {
    const circle = document.createElement('div');
    circle.classList.add('blur-circle');
    
    const size = Math.random() * 1000;
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    
    circle.style.left = `${0 + Math.random() * 80}vw`;
    circle.style.top = `${0 + Math.random() * 80}vh`;
    
    const opacity = 0.02 + (size / 1000);
    circle.style.opacity = `${Math.min(opacity, 0.2)}`;
    
    circle.style.background = colors[i % colors.length];
    
    circleContainer.appendChild(circle);
}

document.addEventListener('mousemove', function(e) {
    const circles = document.querySelectorAll('.blur-circle');
    
    circles.forEach((circle) => {
        const circleSize = parseInt(circle.style.width);
        
        const sizeFactor = circleSize / 200; 
        
        const circleRect = circle.getBoundingClientRect();
        
        const circleCenterX = circleRect.left + circleRect.width / 2;
        const circleCenterY = circleRect.top + circleRect.height / 2;
        
        const deltaX = e.clientX - circleCenterX;
        const deltaY = e.clientY - circleCenterY;
        
        const xMove = deltaX * 0.01 * sizeFactor;
        const yMove = deltaY * 0.01 * sizeFactor;
        
        circle.style.transform = `translate(${xMove}px, ${yMove}px)`;
    });
});

class Slider {
    constructor(container) {
        this.container = container;
        this.slides = container.querySelectorAll('.slide');
        this.dotsCont = container.querySelector('.dots');
        this.descContainer = container.querySelector('.image-description-container');
        this.counterCurrent = container.querySelector('.current-slide');
        this.counterTotal = container.querySelector('.total-slides');
        
        this.noteElement = this.descContainer?.querySelector('#current-note');
        this.dateElement = this.descContainer?.querySelector('#current-date');
        this.pixelCountElement = this.descContainer?.querySelector('#current-pixel-count');
        
        this.init();
    }

    init() {
        if (this.counterTotal) {
            this.counterTotal.textContent = this.slides.length;
        }

        const nextBtn = this.container.querySelector('.next-button');
        const prevBtn = this.container.querySelector('.prev-button');
        
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextSlide());
        if (prevBtn) prevBtn.addEventListener('click', () => this.prevSlide());

        if (this.dotsCont) {
            this.dotsCont.innerHTML = '';
            
            this.slides.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                this.dotsCont.appendChild(dot);
                dot.addEventListener('click', () => this.goToSlide(index));
            });

            this.dots = this.dotsCont.querySelectorAll('.dot');
        }

        document.addEventListener('keydown', (e) => {
            const activeProject = document.querySelector('.project.active');
            if (activeProject === this.container.closest('.project')) {
                if (e.key === 'ArrowLeft') this.prevSlide();
                if (e.key === 'ArrowRight') this.nextSlide();
            }
        });

        this.goToSlide(0);
    }
    
    goToSlide(index) {
        this.slides.forEach(item => {
            item.classList.remove('active');
        });
        this.slides[index].classList.add('active');

        if (this.counterCurrent) {
            this.counterCurrent.textContent = index + 1;
        }

        if (this.dots) {
            this.dots.forEach(item => {
                item.classList.remove('active');
            });
            this.dots[index].classList.add('active');
        }

        const note = this.slides[index].dataset.note;
        const date = this.slides[index].dataset.date;
        const pixelcount = this.slides[index].dataset.pixelcount;
        
        if (this.descContainer) {
            if (this.noteElement) {
                this.noteElement.textContent = note || "—";
            }
            if (this.dateElement) {
                this.dateElement.textContent = date || "—";
            }
            if (this.pixelCountElement) {
                this.pixelCountElement.textContent = pixelcount ? "~" + pixelcount : "—";
            }
        }

        this.currentIndex = index;
    }
    
    nextSlide() {
        if (this.currentIndex >= this.slides.length - 1) {
            this.goToSlide(0);
        } else {
            this.goToSlide(this.currentIndex + 1);
        }
    }
    
    prevSlide() {
        if (this.currentIndex <= 0) {
            this.goToSlide(this.slides.length - 1);
        } else {
            this.goToSlide(this.currentIndex - 1);
        }
    }
}

class ProjectManager {
    constructor() {
        this.sliders = new Map();
        this.contributorManagers = new Map();
        this.currentProject = null;
        this.init();
    }
    
    init() {
        document.querySelectorAll('.project').forEach(project => {
            if (project.querySelectorAll('.slide').length > 0) {
                const slider = new Slider(project);
                this.sliders.set(project.dataset.project, slider);
            }
            
            if (project.querySelector('.contributor-box')) {
                const contributorManager = new ContributorManager(project);
                this.contributorManagers.set(project.dataset.project, contributorManager);
            }
        });

        const btns = document.querySelectorAll('.project-button');
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.showProject(btn.dataset.showProject);
            });
        });
    }
    
    showProject(projectId) {
        document.querySelectorAll('.project').forEach(project => {
            project.classList.remove('active');
        });
        
        const project = document.querySelector(`[data-project="${projectId}"]`);
        if (project) {
            project.classList.add('active');
            this.currentProject = projectId;
        }
    }
}


class ContributorManager {
    constructor(projectContainer) {
        this.projectContainer = projectContainer;
        this.contributorsContainer = projectContainer.querySelector('.contributor-box');
        this.contributors = this.getContributorsForProject(projectContainer.dataset.project);
        this.init();
    }
    
    getContributorsForProject(projectId) {
        const contributorsByProject = {
            'huge-firey': [
                "Reviksedy",
                "Simurated",
                "AnalyticalTomato",
                "BlueStevie64",
                "Matheuspixel",
                "Frenkizaba1",
                "Awsomazing_neil",
                "theonlylizard",
                "PizzaGuy25_a",
                "Nythic",
                "akaSandwich",
                "Sam_Studios",
                "clampity",
                "Fananan",
                "cometztarz",
                "b100rulez",
                "justhanniehere",
                "brightcarp",
                "FernieLeaflen",
                "Legitbeatle",
                "995qa",
                "AiryAiryAiry",
                "Amireal71",
                "Fifi"
            ],
            'default': [
                "None"
            ]
        };
        
        return contributorsByProject[projectId] || contributorsByProject.default;
    }
    
    init() {
        this.shuffleContributors();
        this.renderContributors();
    }
    
    shuffleContributors() {
        for (let i = this.contributors.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.contributors[i], this.contributors[j]] = [this.contributors[j], this.contributors[i]];
        }
    }
    
    renderContributors() {
        if (!this.contributorsContainer) return;
        
        this.contributorsContainer.innerHTML = '';
        
        this.contributors.forEach(contributor => {
            const contributorElement = document.createElement('div');
            contributorElement.className = 'contributor';
            contributorElement.textContent = contributor;
            this.contributorsContainer.appendChild(contributorElement);
        });
        
        this.centerSingleItemsInRows();
    }
    
    centerSingleItemsInRows() {
        const contributors = this.contributorsContainer.querySelectorAll('.contributor');
        const totalContributors = contributors.length;
        const itemsPerRow = window.innerWidth > 600 ? 3 : (window.innerWidth > 400 ? 2 : 1);
        
        if (itemsPerRow === 1) return;
        
        const fullRows = Math.floor(totalContributors / itemsPerRow);
        const itemsInLastRow = totalContributors % itemsPerRow;
        
        if (itemsInLastRow === 1) {
            const lastRowStartIndex = fullRows * itemsPerRow;
            contributors[lastRowStartIndex].style.gridColumn = `2 / span 1`;
        }
    }
    
    addContributor(name) {
        this.contributors.push(name);
        this.shuffleContributors();
        this.renderContributors();
    }
}


document.addEventListener('DOMContentLoaded', function() {
    new ProjectManager();
    new ContributorManager();
});