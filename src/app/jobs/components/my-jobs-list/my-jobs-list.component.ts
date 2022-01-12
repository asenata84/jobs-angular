import { Component, OnInit } from '@angular/core';
import { Job, Like, Candidate } from '../../models/job.model';
import { JobsService } from '../../services/jobs.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from 'src/app/auth/models/user.model';

@Component({
  selector: 'app-my-jobs-list',
  templateUrl: './my-jobs-list.component.html',
  styleUrls: ['./my-jobs-list.component.scss']
})
export class MyJobsListComponent implements OnInit {

  jobs: Job[];

  hasPermissions: boolean;
  loggedUser: User;

  constructor(
    private authService: AuthService,
    private jobsService: JobsService,
  ) {
  }

  getMyJobs() {
    this.jobsService.getMyJobs$().subscribe({
      next: (response: Job[]) => {
        this.jobs = response?.filter((item) => item.candidates?.find((candidate) => candidate?.userId?.toString() === this.loggedUser?.id?.toString()));
      },
      error: (response: HttpErrorResponse) => {
        console.log(response);
      }
    });
  }

  ngOnInit(): void {
    this.hasPermissions = this.authService.hasPermissions('organization');
    this.loggedUser = this.authService.getLoggedUserFromLocalStorage();

    this.getMyJobs();
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
        this.getMyJobs();
      }
    });
  }

  onRemoveApply(id: number): void {
    this.jobsService.deleteCandidate$(id).subscribe({
      next: () => {
        this.getMyJobs();
      }
    });
  }

  onAddLike(data: Like): void {
    this.jobsService.postLikes$(data).subscribe({
      next: () => {
        this.getMyJobs();
      }
    });
  }

  onRemoveLike(id: number): void {
    this.jobsService.deleteLike$(id).subscribe({
      next: () => {
        this.getMyJobs();
      }
    });
  }
}
