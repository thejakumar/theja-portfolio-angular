import { Component } from '@angular/core';

interface ExperienceItem {
  position: string;
  company: string;
  period: string;
  responsibilities: string[];
}

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent {
 experiences: ExperienceItem[] = [
    {
      position: 'Full Stack Developer',
      company: 'Augusta Hitech Soft Solutions',
      period: 'Aug 2025 - Present',
      responsibilities: [
        "Contributing to modernization of Paradigm's case management systems to support faster recovery and cost-saving outcomes in workers' compensation.",
        "Setting up secure authentication and access controls (SSO, Azure AD) to streamline login for nationwide case managers while ensuring HIPAA compliance.",
        "Working on automation of document intake and case workflows to reduce manual effort in telephonic and field case management.",
        "Collaborating with cross-functional teams to design reporting and analytics solutions that track ROI, release-to-work timelines, and claim costs.",
        "Supporting integration efforts between Paradigm's internal systems and external provider networks/telehealth services for seamless care coordination."
      ]
    },
    {
      position: 'Full Stack Developer',
      company: 'Devcare Solutions',
      period: 'Jan 2024 - Aug 2025',
      responsibilities: [
        "Improved certification processing by 60% by modernizing a legacy VB.NET system into a scalable .NET Core microservices-based Provider Certification platform handling high-volume workflows",
        "Secured new projects by leading successful PoCs in document automation, SSO, and legacy migration, directly contributing to contract wins.",
        "Reduced authentication errors by 80% by implementing centralized SSO across 10+ applications using SAML, JWT, and Azure AD (Microsoft Entra ID) for 5,000+ users.",
        "Cut document processing time from 30 days to less than 24 hours by automating metadata extraction using Azure OCR and building a full DMS with archival, merging, and tagging",
        "Automated payment processing and ticket routing via CBOSS and RabbitMQ, integrating credit card, PayPal, and eCheck workflows."
      ]
    },
    {
      position: 'Software Engineer',
      company: 'Tata Consultancy Services / ProVation Medical',
      period: 'Aug 2020 - Sep 2022',
      responsibilities: [
        "Scaled a microservices-based SaaS healthcare platform for 10K+ users across specialties (GI, Pulmonology, Surgery), processing 1M+ daily transactions for patient charting and procedure documentation.",
        "Reduced manual migration effort by 80% by automating legacy PVMD to Apex data transfer, ensuring zero data loss during platform transition.",
        "Increased retention by 15% and revenue by $1M+ annually by developing an ML-powered medication recommendation engine integrated into clinical workflows.",
        "Enabled USA–Canada rollout by implementing multi-tenant architecture and localization support for compliance with region-specific regulations.",
        "Ensured 99.9% uptime for mission-critical healthcare workflows by deploying to Azure App Services, integrating Service Bus, and monitoring via Application Insights."
      ]
    },
    {
      position: 'Software Engineer',
      company: 'Young Minds Technology Solutions',
      period: 'May 2019 - Apr 2020',
      responsibilities: [
        "Developed core modules for iLien, a UCC lien management SaaS used by Wolters Kluwer Lien Solutions clients including JPMorgan Chase and Bank of America, streamlining UCC search, filing, and tracking processes.",
        "Automated lien continuation and expiration workflows, cutting filing errors by 80% and strengthening regulatory compliance for Fortune 500 clients.",
        "Engineered high-performance portfolio and search engine using .NET Core, Oracle PL/SQL, and Angular micro frontends, optimizing multi-million record operations.",
        "Boosted customer retention by 15% by delivering real-time insights through analytics dashboards built with Power BI and Chart.js.",
        "Achieved 20-30% reduction in API response times during peak traffic"
      ]
    }
  ];
}
