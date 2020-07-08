import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { QuestionComponent } from './question/question.component';
import { ScoreComponent } from './score/score.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'question',
    loadChildren: () => import('./question/question.module').then( m => m.QuestionPageModule)
  },
  {
    path: 'score',
    loadChildren: () => import('./score/score.module').then( m => m.ScorePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
