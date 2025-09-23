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
        this.init();
    }

    init() {

        if (this.counterTotal) {
            this.counterTotal.textContent = this.slides.length;
        }

        const nextBtn = document.querySelector('.next-button');
        const prevBtn = document.querySelector('.prev-button');
        
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextSlide());
        if (prevBtn) prevBtn.addEventListener('click', () => this.prevSlide());

        this.slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dotsCont.appendChild(dot);
            dot.addEventListener('click', () => this.goToSlide(index));
            
        });

        this.dots = document.querySelectorAll('.dot');


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

        this.dots.forEach(item => {
            item.classList.remove('active');
        });
        this.dots[index].classList.add('active');

        const note = this.slides[index].dataset.note;
        const date = this.slides[index].dataset.date;
        const pixelcount = this.slides[index].dataset.pixelcount;
        
        if (this.descContainer) {
            if (note) {
                noteElement.textContent = note;
            } else {
                noteElement.textContent = "—";
            }

            if (date) {
                dateElement.textContent = date;
            } else {
                dateElement.textContent = "—";
            }

            if (pixelcount) {
                pixelCountElement.textContent = "~" + pixelcount;
            } else {
                pixelCountElement.textContent = "—";
            }
        }

        this.currentIndex = index;
    }
    
    nextSlide() {
        if (this.currentIndex >= this.slides.length - 1) {
            this.goToSlide(0);
        }
        else {
            this.goToSlide(this.currentIndex + 1)
        }
    }
    
    prevSlide() {
        if (this.currentIndex <= 0) {
            this.goToSlide(this.slides.length - 1);
        }
        else {
            this.goToSlide(this.currentIndex - 1)
        }
    }
}

class ProjectManager {
    constructor() {
        this.sliders = new Map();
        this.init();
    }
    
    init() {
        document.querySelectorAll('.project').forEach(project => {
            if (project.querySelectorAll('.slide').length > 0) {
                const slider = new Slider(project);
                this.sliders.set(project.dataset.project, slider);
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
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    new ProjectManager();
});


