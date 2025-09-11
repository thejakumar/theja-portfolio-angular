import { Component, HostListener } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title = 'theja-portfolio';
  isNavbarScrolled = false;
  private floatingInterval: any;

  constructor(
    private themeService: ThemeService,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.themeService.initializeTheme();
    this.startFloatingAnimation();
    this.setupScrollAnimations();
  }

  ngOnDestroy(): void {
    if (this.floatingInterval) {
      clearInterval(this.floatingInterval);
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.isNavbarScrolled = window.scrollY > 50;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  scrollToSection(sectionId: string): void {
    const element = document.querySelector(`#${sectionId}`);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  }

  onContactFormSubmit(formData: any): void {
    this.contactService.sendEmail(formData);
  }

  private startFloatingAnimation(): void {
    this.floatingInterval = setInterval(() => {
      const heroContent = document.querySelector('.hero-content') as HTMLElement;
      if (heroContent) {
        heroContent.style.transform = `translateY(${Math.sin(Date.now() / 2000) * 5}px)`;
      }
    }, 50);
  }

  private setupScrollAnimations(): void {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = entry.target as HTMLElement;
          
          if (section.classList.contains('hero')) {
            return;
          }
          
          const title = section.querySelector('.section-title') as HTMLElement;
          if (title) {
            title.classList.add('animate');
          }
          
          if (section.id === 'about') {
            setTimeout(() => {
              const aboutImage = section.querySelector('.about-image') as HTMLElement;
              const aboutText = section.querySelector('.about-text') as HTMLElement;
              const stats = section.querySelector('.stats') as HTMLElement;
              
              if (aboutImage) aboutImage.classList.add('animate');
              if (aboutText) aboutText.classList.add('animate');
              
              setTimeout(() => {
                if (stats) stats.classList.add('animate');
              }, 300);
            }, 200);
          }

          if (section.id === 'experience') {
            const timelineItems = section.querySelectorAll('.timeline-item');
            timelineItems.forEach((item: any, index) => {
              setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
              }, index * 200);
            });
          }
          
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    setTimeout(() => {
      document.querySelectorAll('.section, .hero').forEach(section => {
        observer.observe(section);
      });
    }, 100);
  }
}

