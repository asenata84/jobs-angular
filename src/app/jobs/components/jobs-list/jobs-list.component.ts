import { Component, OnInit } from '@angular/core';
import { Job, Like } from '../../models/job.model';
import { JobsService } from '../../services/jobs.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from 'src/app/auth/models/user.model';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit {

  jobs: Job[];

  hasPermissions: boolean;
  loggedUser: User;

  constructor(
    private authService: AuthService,
    private jobsService: JobsService,
  ) {
  }

  getJobs() {
    this.jobsService.getJobs$().subscribe({
      next: (response: Job[]) => {
        this.jobs = response;
      },
      error: (response: HttpErrorResponse) => {
        console.log(response);
      }
    });
  }

  ngOnInit(): void {
    this.hasPermissions = this.authService.hasPermissions('organization');
    this.loggedUser = this.authService.getLoggedUserFromLocalStorage();

    this.getJobs();
  }

  onDelete(id: number): void {
    this.jobsService.deleteJob$(id).subscribe({
      next: () => {
        this.jobs = this.jobs.filter(job => job.id !== id);
      }
    });
  }

  onApply(id: number): void {
    this.jobsService.postCandidates$({
      userId: this.loggedUser?.id,
      jobId: id,
      status: null,
    }).subscribe({
      next: () => {
        this.getJobs();
      }
    });
  }

  onRemoveApply(id: number): void {
    this.jobsService.deleteCandidate$(id).subscribe({
      next: () => {
        this.getJobs();
      }
    });
  }

  onAddLike(data: Like): void {
    this.jobsService.postLikes$(data).subscribe({
      next: () => {
        this.getJobs();
      }
    });
  }

  onRemoveLike(id: number): void {
    this.jobsService.deleteLike$(id).subscribe({
      next: () => {
        this.getJobs();
      }
    });
  }
}
