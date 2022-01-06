import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { JobsComponent } from './components/jobs/jobs.component';
import { JobsListComponent } from './components/jobs-list/jobs-list.component';
import { JobFormComponent } from './components/job-form/job-form.component';
import { AclGuard } from '../guards/acl.guard';
import { CandidatesListComponent } from './components/candidates-list/candidates-list.component';

const routes: Route[] = [
  {
    path: '',
    component: JobsComponent,
    children: [
      {
        path: 'jobs',
        component: JobsListComponent
      },
      {
        path: 'jobs/edit',
        component: JobFormComponent,
        canActivate: [AclGuard]
      },
      {
        path: 'jobs/edit/:id',
        component: JobFormComponent,
        canActivate: [AclGuard]
      },
      {
        path: 'jobs/:id/candidates',
        component: CandidatesListComponent,
        canActivate: [AclGuard]
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'jobs'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class JobsRoutingModule {
}
