import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'public-search',
    loadChildren: () => import('./components/public-search/public-search.module').then(m => m.PublicSearchModule)
  },
  {
    path: 'process-informations',
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
  },
  {
    path: 'process-information',
    loadChildren: () => import('./components/process-information/process-information.module').then(m => m.ProcessInformationModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./components/payment/payment.module').then(m => m.PaymentModule)
  },
  {
    path: 'payment-card',
    loadChildren: () => import('./components/payment/payment-card/payment-card.module').then(m => m.PaymentCardModule)
  },
  {
    path: 'pix',
    loadChildren: () => import('./components/payment/pix/pix.module').then(m => m.PixModule)
  },
  {
    path: 'ticket',
    loadChildren: () => import('./components/payment/ticket/ticket.module').then(m => m.TicketModule)
  },
  {
    path: 'import-voucher',
    loadChildren: () => import('./components/payment/import-voucher/import-voucher.module').then(m => m.ImportVoucherModule)
  },
  {
    path: 'payment-confirmed',
    loadChildren: () => import('./components/payment/payment-confirmed/payment-confirmed.module').then( m => m.PaymentConfirmedPageModule)
  },
  {
    path: 'schedule-shipping',
    loadChildren: () => import('./components/schedule-shipping/schedule-shipping.module').then( m => m.ScheduleShippingPageModule)
  },
  {
    path: 'scheduling-confirmed',
    loadChildren: () => import('./components/scheduling-confirmed/scheduling-confirmed.module').then( m => m.SchedulingConfirmedPageModule)
  },
  {
    path: 'order-status',
    loadChildren: () => import('./components/order-status/order-status.module').then( m => m.OrderStatusPageModule)
  },
  {
    path: 'documents',
    loadChildren: () => import('./components/documents/documents.module').then( m => m.DocumentsPageModule)
  },
  {
    path: 'face-picture',
    loadChildren: () => import('./components/face-picture/face-picture.module').then( m => m.FacePicturePageModule)
  },
  {
    path: 'loading-picture',
    loadChildren: () => import('./components/loading-picture/loading-picture.module').then( m => m.LoadingPicturePageModule)
  },
  {
    path: 'try-again',
    loadChildren: () => import('./components/try-again/try-again.module').then( m => m.TryAgainPageModule)
  },
  {
    path: 'term-acception',
    loadChildren: () => import('./components/term-acception/term-acception.module').then( m => m.TermAcceptionPageModule)
  },
  {
    path: 'query',
    loadChildren: () => import('./components/query/query.module').then( m => m.QueryModule)
  },
  {
    path: 'complete',
    loadChildren: () => import('./components/complete/complete.module').then( m => m.CompleteModule)
  },
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
