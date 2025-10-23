import { Component } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';


interface LearningMaterial {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  tags: string[];
  type: 'video' | 'article' | 'tutorial' | 'course' | 'documentation';
  link?: string;
  downloadUrl?: string;
  thumbnail?: string;
  isNew?: boolean;
  isFeatured?: boolean;
  rating?: number;
  views?: number;
}

interface Category {
  name: string;
  icon: string;
  count: number;
}

@Component({
  selector: 'app-learning-materials',
  templateUrl: './learning-materials.component.html',
  styleUrls: ['./learning-materials.component.scss']
})
export class LearningMaterialsComponent {
 learningMaterials: LearningMaterial[] = [
    {
      id: '1',
      title: '.NET Angular Interview Guide',
      description: 'Complete guide to .NET and Angular developer quick interview prep',
      category: '.NET Core',
      difficulty: 'Intermediate',
      duration: '30 Minutes',
      tags: ['.NET Core', 'Angular', 'C#', 'Agile', 'SQL'],
      type: 'course',
      link: '/interview-prep',
      thumbnail: 'assets/images/learning/dotnet-microservices.jpg',
      isNew: true,
      isFeatured: true,
      rating: 4.8,
      views: 1250
    }
    // {
    //   id: '2',
    //   title: 'bv nv ',
    //   description: 'Master state management in Angular applications using NgRx. Learn actions, reducers, effects, and selectors with real-world examples.',
    //   category: 'Angular',
    //   difficulty: 'Intermediate',
    //   duration: '1.8 hours',
    //   tags: ['Angular', 'NgRx', 'State Management', 'RxJS', 'TypeScript'],
    //   type: 'tutorial',
    //   link: '#',
    //   thumbnail: 'assets/images/learning/angular-ngrx.jpg',
    //   isFeatured: true,
    //   rating: 4.6,
    //   views: 890
    // },
    // {
    //   id: '3',
    //   title: 'Azure DevOps CI/CD Pipeline Setup',
    //   description: 'Step-by-step guide to setting up continuous integration and deployment pipelines using Azure DevOps for .NET applications.',
    //   category: 'DevOps',
    //   difficulty: 'Intermediate',
    //   duration: '45 mins',
    //   tags: ['Azure DevOps', 'CI/CD', 'YAML', 'Deployment', 'Automation'],
    //   type: 'video',
    //   link: '#',
    //   thumbnail: 'assets/images/learning/azure-devops.jpg',
    //   rating: 4.7,
    //   views: 654
    // },
    // {
    //   id: '4',
    //   title: 'Entity Framework Core Best Practices',
    //   description: 'Learn EF Core optimization techniques, performance tuning, and common pitfalls to avoid in production applications.',
    //   category: 'Database',
    //   difficulty: 'Advanced',
    //   duration: '1.2 hours',
    //   tags: ['Entity Framework', 'Performance', 'SQL Server', 'Optimization'],
    //   type: 'article',
    //   link: '#',
    //   downloadUrl: '#',
    //   thumbnail: 'assets/images/learning/ef-core.jpg',
    //   rating: 4.9,
    //   views: 432
    // },
    // {
    //   id: '5',
    //   title: 'JavaScript ES6+ Modern Features',
    //   description: 'Complete overview of modern JavaScript features including async/await, destructuring, modules, and arrow functions.',
    //   category: 'JavaScript',
    //   difficulty: 'Beginner',
    //   duration: '1 hour',
    //   tags: ['JavaScript', 'ES6', 'Modern JS', 'Async/Await', 'Modules'],
    //   type: 'tutorial',
    //   link: '#',
    //   thumbnail: 'assets/images/learning/js-es6.jpg',
    //   isNew: true,
    //   rating: 4.5,
    //   views: 1100
    // },
    // {
    //   id: '6',
    //   title: 'Azure AD Authentication Implementation',
    //   description: 'Implement secure authentication using Azure Active Directory in .NET Core applications with OAuth 2.0 and OpenID Connect.',
    //   category: 'Security',
    //   difficulty: 'Advanced',
    //   duration: '2 hours',
    //   tags: ['Azure AD', 'OAuth 2.0', 'OIDC', 'Security', 'Authentication'],
    //   type: 'course',
    //   link: '#',
    //   thumbnail: 'assets/images/learning/azure-ad.jpg',
    //   rating: 4.8,
    //   views: 765
    // }
  ];


  /**
   *
   */
  constructor(private themeService: ThemeService) {
    
  }

  categories: Category[] = [
    { name: 'All', icon: 'fas fa-th-large', count: 0 },
    { name: '.NET Core', icon: 'fas fa-code', count: 0 },
    { name: 'Angular', icon: 'fab fa-angular', count: 0 },
    { name: 'JavaScript', icon: 'fab fa-js-square', count: 0 },
    { name: 'DevOps', icon: 'fas fa-cogs', count: 0 },
    { name: 'Database', icon: 'fas fa-database', count: 0 },
    { name: 'Security', icon: 'fas fa-shield-alt', count: 0 }
  ];

  filteredMaterials: LearningMaterial[] = [];
  selectedCategory = 'All';
  selectedDifficulty = 'All';
  searchTerm = '';

  ngOnInit(): void {
    this.updateCategoryCounts();
    this.filteredMaterials = [...this.learningMaterials];
  }

  private updateCategoryCounts(): void {
    this.categories.forEach(category => {
      if (category.name === 'All') {
        category.count = this.learningMaterials.length;
      } else {
        category.count = this.learningMaterials.filter(material => 
          material.category === category.name
        ).length;
      }
    });
  }

  filterByCategory(categoryName: any): void {
    this.selectedCategory = categoryName;
    this.applyFilters();
  }

  filterByDifficulty(difficulty: any): void {
    this.selectedDifficulty = difficulty.target.value;
    this.applyFilters();
  }

  onSearchChange(event: any): void {
    this.searchTerm = event.target.value.toLowerCase();
    this.applyFilters();
  }
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  private applyFilters(): void {
    this.filteredMaterials = this.learningMaterials.filter(material => {
      const matchesCategory = this.selectedCategory === 'All' || 
                            material.category === this.selectedCategory;
      
      const matchesDifficulty = this.selectedDifficulty === 'All' || 
                              material.difficulty === this.selectedDifficulty;
      
      const matchesSearch = this.searchTerm === '' ||
                          material.title.toLowerCase().includes(this.searchTerm) ||
                          material.description.toLowerCase().includes(this.searchTerm) ||
                          material.tags.some(tag => tag.toLowerCase().includes(this.searchTerm));

      return matchesCategory && matchesDifficulty && matchesSearch;
    });
  }

  getTypeIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'video': 'fas fa-play-circle',
      'article': 'fas fa-file-alt',
      'tutorial': 'fas fa-graduation-cap',
      'course': 'fas fa-university',
      'documentation': 'fas fa-book'
    };
    return icons[type] || 'fas fa-file';
  }

  getDifficultyClass(difficulty: string): string {
    const classes: { [key: string]: string } = {
      'Beginner': 'difficulty-beginner',
      'Intermediate': 'difficulty-intermediate',
      'Advanced': 'difficulty-advanced'
    };
    return classes[difficulty] || '';
  }

  generateStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  openMaterial(material: LearningMaterial): void {
    if (material.link) {
      window.open(material.link, '_blank');
    }
  }

  downloadMaterial(material: LearningMaterial, event: Event): void {
    event.stopPropagation();
    if (material.downloadUrl) {
      // In a real app, this would trigger a download
      console.log('Downloading:', material.title);
      // window.open(material.downloadUrl, '_blank');
    }
  }
}
