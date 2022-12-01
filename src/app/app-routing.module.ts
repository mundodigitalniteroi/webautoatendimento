import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'public-search',
    loadChildren: () => import('./components/public-search/public-search.module').then(m => m.PublicSearchModule)
  },
  {
    path: 'process-information',
    loadChildren: () => import('./components/process-informations/process-informations.module').then(m => m.ProcessInformationsModule)
  },
  {
    path: 'how-liberation',
    loadChildren: () => import('./components/how-liberation/how-liberation.module').then(m => m.HowLiberationModule)
  },
  {
    path: 'step',
    loadChildren: () => import('./components/steps/steps.module').then(m => m.StepModule)
  },
  {
    path: 'facial-recognition',
    loadChildren: () => import('./components/facial-recognition/facial-recognition.module').then(m => m.FacialRecognitionModule)
  },
  {
    path: 'document-upload',
    loadChildren: () => import('./components/document-upload/document-upload.module').then(m => m.DocumentUploadModule)
  }
  // {
  //   path: '',
  //   loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  // }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
