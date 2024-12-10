import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResultatComponent } from './dashboard/resultat/resultat.component';
import { StatistiquesComponent } from './dashboard/statistiques/statistiques.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard/resultat', pathMatch: 'full' },
  {path:"dashboard",
    component:DashboardComponent,
    children:[
      {path:"resultat",component:ResultatComponent},
      {path:"stats",component:StatistiquesComponent}
    ]

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
