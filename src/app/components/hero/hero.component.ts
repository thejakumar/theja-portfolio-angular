import { Component, EventEmitter, Output } from '@angular/core';

interface SocialLink {
  href: string;
  icon: string;
  title: string;
  target?: string;
}

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
 @Output() scrollToContact = new EventEmitter<string>();

  socialLinks: SocialLink[] = [
    {
      href: 'mailto:theja.moolinti@gmail.com',
      icon: 'fas fa-envelope',
      title: 'Email'
    },
    {
      href: 'https://www.linkedin.com/in/theja-moolinti-tkm/',
      icon: 'fab fa-linkedin-in',
      title: 'LinkedIn',
      target: '_blank'
    },
    {
      href: 'https://github.com/thejakumar',
      icon: 'fab fa-github',
      title: 'GitHub',
      target: '_blank'
    },
    {
      href: 'tel:9899331202',
      icon: 'fas fa-phone',
      title: 'Phone'
    }
  ];

  onGetInTouchClick(): void {
    this.scrollToContact.emit('contact');
  }
}