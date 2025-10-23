import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LearningMaterialsComponent } from './components/learning-materials/learning-materials.component';
import { HomeComponent } from './components/home/home.component';
import { DsaComponent } from './components/dsa/dsa.component';
import { DotnetAngularInterviewPrepComponent } from './components/dotnet-angular-interview-prep/dotnet-angular-interview-prep.component';

 const routes: Routes = [
      { path: '', component: HomeComponent }, 
      { path: 'learn', component: LearningMaterialsComponent },
      {path: 'dsa', component: DsaComponent},
      {path: 'interview-prep', component:DotnetAngularInterviewPrepComponent}
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

 
}
