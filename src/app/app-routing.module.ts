import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LearningMaterialsComponent } from './components/learning-materials/learning-materials.component';
import { HomeComponent } from './components/home/home.component';
import { DsaComponent } from './components/dsa/dsa.component';

 const routes: Routes = [
      { path: '', component: HomeComponent }, 
      { path: 'learn', component: LearningMaterialsComponent },
      {path: 'dsa', component: DsaComponent}
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

 
}
