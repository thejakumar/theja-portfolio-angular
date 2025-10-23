import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ContactComponent } from './components/contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LearningMaterialsComponent } from './components/learning-materials/learning-materials.component';
import { HomeComponent } from './components/home/home.component';
import { DsaComponent } from './components/dsa/dsa.component';
import { CommonModule } from '@angular/common';
import { DotnetAngularInterviewPrepComponent } from './components/dotnet-angular-interview-prep/dotnet-angular-interview-prep.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ExperienceComponent,
    ContactComponent,
    LearningMaterialsComponent,
    HomeComponent,
    DsaComponent,
    DotnetAngularInterviewPrepComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
