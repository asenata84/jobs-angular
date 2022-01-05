import { Component, OnInit } from '@angular/core';
import { Job } from '../../models/job.model';
import { JobsService } from '../../services/jobs.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit {

  jobs: Job[];

  hasPermissions: boolean;

  constructor(
    private authService: AuthService,
    private jobsService: JobsService
  ) {
  }

  ngOnInit(): void {
    this.hasPermissions = this.authService.hasPermissions('admin');

    this.jobsService.getJobs$().subscribe({
      next: (response: Job[]) => {
        this.jobs = response;
      },
      error: (response: HttpErrorResponse) => {
        console.log(response);
      }
    });
  }

  onDelete(id: number): void {
    this.jobsService.deleteJob$(id).subscribe({
      next: () => {
        this.jobs = this.jobs.filter(job => job.id !== id);
      }
    });
  }
}
