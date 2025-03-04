import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-carousel',
    standalone: true,
    imports: [FormsModule, CommonModule],
    template: `
    <div class="carousel-container">
        <div #carouselSlide class="carousel-slide">
            <img *ngFor="let image of images" [src]="image" alt="Carousel Image">
        </div>
        <div class="carousel-nav">
            <button #prevBtn>&#10094;</button>
            <button #nextBtn>&#10095;</button>
        </div>
        <div #carouselDots class="carousel-dots"></div>
    </div>`
})
export class CarouselComponent {
    @ViewChild('carouselSlide') carouselSlide: ElementRef | undefined;
    @ViewChild('prevBtn') prevBtn: ElementRef | undefined;
    @ViewChild('nextBtn') nextBtn: ElementRef | undefined;
    @ViewChild('carouselDots') carouselDotsContainer: ElementRef | undefined;

    images = [
        'assets/1.jpg',
        'assets/2.png',
        'assets/3.jpg'
    ];

    counter = 0;
    size = 0;
    dots: HTMLElement[] = [];

    ngAfterViewInit() {
        if (!this.carouselSlide || !this.prevBtn || !this.nextBtn || !this.carouselDotsContainer) {
            console.error('Carousel elements not found.');
            return;
        }

        this.size = this.carouselSlide.nativeElement.querySelector('img').clientWidth;
        this.carouselSlide.nativeElement.style.transform = `translateX(${-this.size * this.counter}px)`;

        this.images.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            if (index === 0) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => this.goToSlide(index));
            this.carouselDotsContainer!.nativeElement.appendChild(dot);
            this.dots.push(dot);
        });

        this.prevBtn.nativeElement.addEventListener('click', () => this.prevSlide());
        this.nextBtn.nativeElement.addEventListener('click', () => this.nextSlide());
    }

    nextSlide() {
        if (!this.carouselSlide) return;
        if (this.counter >= this.images.length - 1) return;
        this.carouselSlide.nativeElement.style.transition = 'transform 0.5s ease-in-out';
        this.counter++;
        this.carouselSlide.nativeElement.style.transform = `translateX(${-this.size * this.counter}px)`;
        this.updateDots();
    }

    prevSlide() {
        if (!this.carouselSlide) return;
        if (this.counter <= 0) return;
        this.carouselSlide.nativeElement.style.transition = 'transform 0.5s ease-in-out';
        this.counter--;
        this.carouselSlide.nativeElement.style.transform = `translateX(${-this.size * this.counter}px)`;
        this.updateDots();
    }

    goToSlide(index: number) {
        if (!this.carouselSlide) return;
        this.counter = index;
        this.carouselSlide.nativeElement.style.transition = 'transform 0.5s ease-in-out';
        this.carouselSlide.nativeElement.style.transform = `translateX(${-this.size * this.counter}px)`;
        this.updateDots();
    }

    updateDots() {
        this.dots.forEach((dot, index) => {
            if (index === this.counter) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
}
