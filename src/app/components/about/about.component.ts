import { Component } from '@angular/core';

interface Stat {
  number: string;
  label: string;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
stats: Stat[] = [
    { number: '5+', label: 'Years Experience' },
    { number: '15+', label: 'Projects Completed' },
    { number: '3.96', label: 'Graduate GPA' }
  ];

  aboutText = [
    "I'm a passionate Full Stack .NET Developer with over 5 years of experience in creating innovative solutions that drive business success. My expertise spans across the entire software development lifecycle, from architecture design to deployment and maintenance.",
    "I specialize in building scalable, high-performance applications using modern technologies like .NET Core, Angular, and cloud platforms (Azure & AWS). My experience includes developing mission-critical healthcare systems, enterprise solutions, and financial applications for Fortune 500 companies.",
    "Currently based in Columbus, OH, I'm always eager to take on new challenges and contribute to projects that make a meaningful impact."
  ];
}
