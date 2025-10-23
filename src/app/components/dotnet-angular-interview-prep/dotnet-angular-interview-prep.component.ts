import { Component } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';



interface Question {
  q: string;
  a: string[];
}

interface Section {
  id: string;
  title: string;
  questions: Question[];
}

@Component({
  selector: 'app-dotnet-angular-interview-prep',
  templateUrl: './dotnet-angular-interview-prep.component.html',
  styleUrls: ['./dotnet-angular-interview-prep.component.scss']
})
export class DotnetAngularInterviewPrepComponent {
searchTerm: string = '';
  expandedSections: { [key: string]: boolean } = {};
  expandedQuestions: { [key: string]: boolean } = {};
  filteredSections: Section[] = [];

  sections: Section[] = [
    {
      id: 'dotnet',
      title: 'Part 1: .NET Core & C# Fundamentals',
      questions: [
        {
          q: 'What are the key differences between .NET Framework and .NET Core?',
          a: [
            '.NET Framework: The original, Windows-only framework. It\'s considered legacy and is in maintenance mode.',
            '.NET Core: The modern, open-source, and cross-platform (Windows, Mac, Linux) successor. It\'s built for high-performance, cloud-native applications, and microservices.',
            'From Your Experience: "My recent projects, like the one at the State of Ohio, are built on .NET Core 8.0. We chose it for its performance benefits, container support, and its ability to run on Azure App Services, which aligns with our microservices architecture."'
          ]
        },
        {
          q: 'What is the difference between managed and unmanaged code?',
          a: [
            'Managed Code: Code that runs under the .NET Common Language Runtime (CLR). The CLR handles memory management (via the Garbage Collector), type safety, and exception handling.',
            'Unmanaged Code: Code that runs outside the CLR, like C++ or a third-party library. With unmanaged code, the developer is responsible for all memory management.'
          ]
        },
        {
          q: 'How does .NET handle memory? How do you dispose of unused objects?',
          a: [
            '.NET uses a Garbage Collector (GC) to automatically manage the memory for managed objects. It periodically checks for objects that are no longer referenced and reclaims their memory.',
            'For unmanaged resources (like database connections, file streams, or HttpClient), we must explicitly release them using the IDisposable interface and using statement.',
            'From Your Experience: "In my data access layers, I always wrap my DbContext in a using statement (or register it as Scoped in DI) to ensure the database connection is properly disposed of."'
          ]
        }
      ]
    },
    {
      id: 'solid',
      title: 'Part 2: OOPS & SOLID Principles',
      questions: [
        {
          q: 'Can you briefly explain the SOLID principles?',
          a: [
            'S - Single Responsibility Principle: A class should have only one reason to change. Example: Create a UserService for user logic and a separate EmailService for emails.',
            'O - Open/Closed Principle: Software should be open for extension but closed for modification. Example: Use IReportExport interface instead of modifying ReportGenerator class.',
            'L - Liskov Substitution Principle: Subtypes must be substitutable for their base types. Example: CreditCardPayment and PayPalPayment must work wherever BasePayment is used.',
            'I - Interface Segregation Principle: A client should not be forced to depend on interfaces it does not use. Example: Create ICanCode and ICanManage instead of one giant IWorker interface.',
            'D - Dependency Inversion Principle: High-level modules should depend on abstractions. Example: OrderService depends on IOrderRepository interface, not SqlOrderRepository concrete class.'
          ]
        }
      ]
    },
    {
      id: 'debugging',
      title: 'Part 3: Debugging, Error Handling, & Logging',
      questions: [
        {
          q: 'How do you resolve a production defect?',
          a: [
            'Replicate: Try to replicate the bug in non-production using logs and defect information.',
            'Analyze & Isolate: Use Azure Application Insights to trace failed requests, check exceptions, and isolate the failing component.',
            'Debug: Run code locally in Visual Studio with breakpoints and inspect variables.',
            'Fix: Develop the fix after identifying root cause.',
            'Test: Write a NUnit unit test targeting the bug to prevent regression.',
            'Deploy: Commit fix, create PR for review, merge, and deploy via CI/CD pipeline.'
          ]
        },
        {
          q: 'How do you handle exceptions in a .NET Core application?',
          a: [
            'Use try-catch blocks for specific, expected exceptions where clear action can be taken.',
            'Implement custom exception handling middleware for global, unhandled exceptions.',
            'Middleware logs to App Insights and returns standardized JSON error response to client.'
          ]
        },
        {
          q: 'How do you handle logging?',
          a: [
            'Use built-in ILogger interface, injected via DI.',
            'Configure in Program.cs to send logs to multiple providers.',
            'Write to console and Azure Application Insights for distributed tracing, real-time monitoring, and centralized searchable logs.'
          ]
        }
      ]
    },
    {
      id: 'internals',
      title: 'Part 4: .NET Core Internals (Middleware, DI, JWT)',
      questions: [
        {
          q: 'What is Dependency Injection (DI) and what are its benefits?',
          a: [
            'DI is a design pattern where a class receives its dependencies from an external source via constructor injection.',
            'Benefits: Loose Coupling, Easy Testing with Moq, Better Maintainability.',
            'Example: OrderService depends on IOrderRepository interface, not concrete implementation.'
          ]
        },
        {
          q: 'What are the DI service lifetimes?',
          a: [
            'Singleton: One instance for entire application lifetime. Best for stateless services.',
            'Scoped: One instance per client request (e.g., per HTTP request). Default for DbContext.',
            'Transient: New instance every time requested. Best for lightweight, stateless services.'
          ]
        },
        {
          q: 'What are Middlewares and how do they work?',
          a: [
            'Middleware components form a pipeline to handle HTTP requests and responses.',
            'Order is critical: UseRouting() → UseCors() → UseAuthentication() → UseAuthorization() → UseEndpoints()',
            'Each component can inspect, act on, or pass the request to the next component.'
          ]
        },
        {
          q: 'How do you implement security with JWT tokens?',
          a: [
            'Authentication: API generates JWT with claims when user logs in.',
            'Storage: Client stores token in localStorage/sessionStorage.',
            'Authorization: Client adds token to Authorization header as Bearer token.',
            'Validation: API middleware validates signature and expiration, populates User.Identity.'
          ]
        },
        {
          q: 'What\'s the difference between SAML and OIDC?',
          a: [
            'SAML: Older, XML-based standard. Common in enterprise SSO.',
            'OIDC (OpenID Connect): Modern standard built on OAuth 2.0. Uses JSON and JWTs. Lightweight for modern web/mobile apps.',
            'From Your Experience: "At State of Ohio, we use Azure Active Directory with OAuth 2.0/OIDC to secure internal applications."'
          ]
        }
      ]
    },
    {
      id: 'database',
      title: 'Part 5: Database & Entity Framework Core',
      questions: [
        {
          q: 'How do you optimize Entity Framework Core performance?',
          a: [
            'AsNoTracking(): For read-only queries to speed up performance.',
            'Projection: Use .Select() to query only needed columns.',
            'Avoid N+1 Problems: Use .Include() and .ThenInclude() for eager loading.',
            'Async/Await: Use async methods like ToListAsync() for better scalability.',
            'Indexing: Ensure properties in Where() clauses are indexed in SQL.'
          ]
        },
        {
          q: 'What is the difference between SingleOrDefault, FirstOrDefault, and Find?',
          a: [
            'FirstOrDefault(): Returns first item or null. Safe when duplicates possible.',
            'SingleOrDefault(): Returns only item or null. Throws exception if multiple matches. Use for unique results.',
            'Find(): Checks change tracker first before querying database. Fastest for retrieving by primary key.'
          ]
        }
      ]
    },
    {
      id: 'architecture',
      title: 'Part 6: Architecture & Design Patterns',
      questions: [
        {
          q: 'Explain Repository and Factory patterns',
          a: [
            'Repository Pattern: Abstracts data access logic. Create IUserRepository interface with methods, then concrete SqlUserRepository using EF Core. Business logic depends only on interface.',
            'Factory Pattern: Creates objects without specifying exact class. Example: ReportFactory returns PdfGenerator or CsvGenerator based on request.'
          ]
        },
        {
          q: 'What is the Facade pattern?',
          a: [
            'Provides simplified, high-level interface to complex subsystem.',
            'Example: OrderProcessing Facade for frontend. SubmitOrder() internally calls PaymentService, InventoryService, ShippingService, hiding complex orchestration.'
          ]
        },
        {
          q: 'Have you implemented caching? How?',
          a: [
            'In-memory caching: Use IMemoryCache for server-specific data like state lists.',
            'Distributed caching: Use Redis or Azure Cache for Redis in distributed systems to share cache across instances.'
          ]
        }
      ]
    },
    {
      id: 'azure',
      title: 'Part 7: Azure, DevOps, & Microservices',
      questions: [
        {
          q: 'How do you connect to Azure Blob Storage?',
          a: [
            'Use Azure.Storage.Blobs NuGet package.',
            'Get Connection String from Azure Key Vault via configuration.',
            'Create BlobServiceClient, then BlobContainerClient, then BlobClient.',
            'Perform operations like UploadAsync() or DownloadToAsync().'
          ]
        },
        {
          q: 'What is an Azure App Service?',
          a: [
            'Azure\'s PaaS for hosting web applications and APIs.',
            'Manages infrastructure, OS patching, and scaling automatically.',
            'Supports Deployment Slots for zero-downtime deployments (staging → production swap).'
          ]
        },
        {
          q: 'Describe your CI/CD pipeline experience',
          a: [
            'CI (Continuous Integration): YAML build pipeline triggers on commits. Restores dependencies, builds solution, runs NUnit tests. Build fails if tests fail.',
            'CD (Continuous Deployment): Successful build publishes artifact, triggers Release Pipeline to deploy to Azure App Services (Dev → Staging → Production).'
          ]
        },
        {
          q: 'What is RabbitMQ or Azure Service Bus?',
          a: [
            'Message Brokers for asynchronous communication between services.',
            'Producer sends message to Queue, Consumer listens and processes at own pace.',
            'From Your Experience: "When Intake filed, Intake service publishes IntakeSubmitted event to Service Bus. Screening and Notification services listen and start their processes asynchronously. Decouples services."'
          ]
        }
      ]
    },
    {
      id: 'angular',
      title: 'Part 8: Angular',
      questions: [
        {
          q: 'What is the Angular component lifecycle?',
          a: [
            'ngOnChanges: Called when @Input() property changes.',
            'ngOnInit: Called once after initialization. Make initial API calls here.',
            'ngDoCheck: Called during every change detection cycle.',
            'ngAfterContentInit: Called after ng-content projected.',
            'ngAfterViewInit: Called after component view initialized.',
            'ngOnDestroy: Called before component destroyed. Cleanup and unsubscribe from Observables.'
          ]
        },
        {
          q: 'What are Services and Directives in Angular?',
          a: [
            'Service: Singleton class for sharing logic/data across components via DI. Example: HttpClient for API calls.',
            'Directive: Class that modifies DOM.',
            '  - Structural Directives: Change DOM layout (*ngIf, *ngFor)',
            '  - Attribute Directives: Change appearance/behavior ([ngStyle], [ngClass])'
          ]
        },
        {
          q: 'How do you handle state management in Angular?',
          a: [
            'Simple component state: Use @Input() and @Output() properties.',
            'Cross-component state: Use RxJS with BehaviorSubject in services.',
            'Complex application-wide state: Use NgRx for centralized Redux-pattern store.'
          ]
        },
        {
          q: 'What is an HTTP Interceptor?',
          a: [
            'Service that intercepts every HttpClient request and response.',
            'Use for Auth: Automatically attach JWT token to Authorization header.',
            'Use for Error Handling: Catch global HTTP errors (401, 404, 500) and show notifications or redirect.'
          ]
        },
        {
          q: 'What are AuthGuards in Angular?',
          a: [
            'Services that tell router whether user can navigate to/from a route.',
            'CanActivate: Check if user logged in before accessing protected route. Redirect to login if not.',
            'CanDeactivate: Prevent leaving route with unsaved changes.'
          ]
        }
      ]
    },
    {
      id: 'sql',
      title: 'Part 9: Database (SQL)',
      questions: [
        {
          q: 'What is the difference between Clustered and Non-Clustered Index?',
          a: [
            'Clustered Index: IS the table. Defines physical order of data on disk. One per table (usually primary key).',
            'Non-Clustered Index: Separate B-Tree structure pointing to data rows. Like book index. Multiple per table for different WHERE clauses.'
          ]
        },
        {
          q: 'Why use Stored Procedures? What are the benefits?',
          a: [
            'Performance: Execution plan cached by SQL Server.',
            'Security: Grant EXECUTE permission without SELECT/UPDATE on tables.',
            'Reduced Network Traffic: Complex logic executes on database server.',
            'Encapsulation: Bundles complex SQL into reusable, named unit.'
          ]
        },
        {
          q: 'How do you handle errors in a Stored Procedure?',
          a: [
            'Use BEGIN TRY...END TRY and BEGIN CATCH...END CATCH blocks.',
            'In CATCH block: Log error to table using ERROR_NUMBER(), ERROR_MESSAGE(), ERROR_LINE().',
            'ROLLBACK TRANSACTION if one is open.'
          ]
        }
      ]
    },
    {
      id: 'agile',
      title: 'Part 10: Agile & Team Dynamics',
      questions: [
        {
          q: 'Walk me through your typical Agile (Scrum) sprint',
          a: [
            'Two-week sprints.',
            'Sprint Planning: Pull high-priority items from Backlog, estimate using planning poker.',
            'Daily Work: Pick task from Azure DevOps, code, write NUnit tests, update docs.',
            'Daily Standup: 15-minute meeting discussing yesterday, today, blockers.',
            'Code Reviews: Create PR for teammate review before merge.',
            'Sprint Retrospective: Discuss what went well, what didn\'t, improvements for next sprint.'
          ]
        },
        {
          q: 'Describe your approach to code reviews',
          a: [
            'Be constructive and collaborative, not critical.',
            'Check correctness: Does code meet requirements?',
            'Check maintainability: Clean, readable, follows standards and SOLID principles?',
            'Check testing: Sufficient NUnit tests for new logic and edge cases?',
            'Mentoring: Use reviews as teaching opportunity. Ask guiding questions like "Have you considered using Repository pattern here?"'
          ]
        }
      ]
    }
  ];

  constructor(private themeService: ThemeService) {
    this.filteredSections = [...this.sections];
  }

  onSearchChange(): void {
    if (!this.searchTerm) {
      this.filteredSections = [...this.sections];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredSections = this.sections
      .map(section => ({
        ...section,
        questions: section.questions.filter(q =>
          q.q.toLowerCase().includes(term) ||
          q.a.some(answer => answer.toLowerCase().includes(term))
        )
      }))
      .filter(section => section.questions.length > 0);
  }

  toggleSection(sectionId: string): void {
    this.expandedSections[sectionId] = !this.expandedSections[sectionId];
  }

  toggleQuestion(sectionId: string, questionIndex: number): void {
    const key = `${sectionId}-${questionIndex}`;
    this.expandedQuestions[key] = !this.expandedQuestions[key];
  }

  isQuestionExpanded(sectionId: string, questionIndex: number): boolean {
    const key = `${sectionId}-${questionIndex}`;
    return !!this.expandedQuestions[key];
  }

  expandAll(): void {
    this.filteredSections.forEach(section => {
      this.expandedSections[section.id] = true;
      section.questions.forEach((_, idx) => {
        this.expandedQuestions[`${section.id}-${idx}`] = true;
      });
    });
  }

  collapseAll(): void {
    this.expandedSections = {};
    this.expandedQuestions = {};
  }
    toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
