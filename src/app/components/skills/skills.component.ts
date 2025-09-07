import { Component } from '@angular/core';

interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
skillCategories: SkillCategory[] = [
    {
      title: 'Languages',
      icon: 'fas fa-code',
      skills: ['C#', 'Python', 'JavaScript', 'TypeScript', 'SQL', 'Java']
    },
    {
      title: 'Frameworks',
      icon: 'fas fa-layer-group',
      skills: ['.NET Core', 'ASP.NET MVC', 'Angular', 'React', 'Web API', 'Microservices']
    },
    {
      title: 'Databases',
      icon: 'fas fa-database',
      skills: ['SQL Server', 'MySQL', 'PostgreSQL', 'MongoDB', 'Oracle PL/SQL']
    },
    {
      title: 'Cloud & DevOps',
      icon: 'fas fa-cloud',
      skills: ['Microsoft Azure', 'AWS', 'Docker', 'CI/CD', 'Azure DevOps', 'Git']
    },
    {
      title: 'Security',
      icon: 'fas fa-shield-alt',
      skills: ['Azure AD', 'OAuth 2.0', 'SAML SSO', 'OIDC']
    },
    {
      title: 'Tools & Testing',
      icon: 'fas fa-cogs',
      skills: ['Visual Studio', 'Postman', 'NUnit', 'Selenium', 'Jira', 'Power BI']
    }
  ];
}