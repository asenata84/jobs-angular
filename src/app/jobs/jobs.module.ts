import { NgModule } from '@angular/core';
import { JobsListComponent } from './components/jobs-list/jobs-list.component';
import { JobItemComponent } from './components/job-item/job-item.component';
import { JobFormComponent } from './components/job-form/job-form.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JobsRoutingModule } from './jobs-routing.module';
import { CandidatesListComponent } from './components/candidates-list/candidates-list.component';
import { CandidatesItemComponent } from './components/candidates-item/candidates-item.component';
import { MyJobsListComponent } from './components/my-jobs-list/my-jobs-list.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    JobsRoutingModule
  ],
  declarations: [
    JobsListComponent,
    MyJobsListComponent,
    ProfileComponent,
    JobItemComponent,
    JobFormComponent,
    JobsComponent,
    CandidatesListComponent,
    CandidatesItemComponent,
  ]
})
export class JobsModule {
}
