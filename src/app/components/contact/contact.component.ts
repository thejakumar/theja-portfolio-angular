import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


interface ContactInfo {
  icon: string;
  title: string;
  value: string;
  href?: string;
  target?: string;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
 @Output() formSubmit = new EventEmitter<any>();
  
  contactForm!: FormGroup;

  contactInfo: ContactInfo[] = [
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      value: 'theja.moolinti@gmail.com'
    },
    {
      icon: 'fas fa-phone',
      title: 'Phone',
      value: '(989) 933-1202'
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Location',
      value: 'Columbus, OH'
    },
    {
      icon: 'fab fa-linkedin',
      title: 'LinkedIn',
      value: 'theja-moolinti-tkm',
      href: 'https://www.linkedin.com/in/theja-moolinti-tkm/',
      target: '_blank'
    },
    {
      icon: 'fab fa-github',
      title: 'GitHub',
      value: 'thejakumar',
      href: 'https://github.com/thejakumar',
      target: '_blank'
    }
  ];

  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.formSubmit.emit(this.contactForm.value);
      this.contactForm.reset();
    }
  }
}
