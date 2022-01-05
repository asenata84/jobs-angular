import { NgModule } from '@angular/core';
import { JobsListComponent } from './components/jobs-list/jobs-list.component';
import { JobItemComponent } from './components/job-item/job-item.component';
import { JobFormComponent } from './components/job-form/job-form.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JobsRoutingModule } from './jobs-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    JobsRoutingModule
  ],
  declarations: [
    JobsListComponent,
    JobItemComponent,
    JobFormComponent,
    JobsComponent
  ]
})
export class JobsModule {
}
