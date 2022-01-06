import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Candidate, Job } from '../../models/job.model';
import { AuthService } from '../../../auth/services/auth.service';
import { JobsService } from '../../services/jobs.service';
import { User } from 'src/app/auth/models/user.model';

@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.scss']
})
export class JobItemComponent implements OnInit {

  @Input() job: Job;

  @Output() deleteClicked = new EventEmitter<number>();
  @Output() applyClicked = new EventEmitter<number>();
  @Output() removeApplyClicked = new EventEmitter<number>();

  hasOrganizationPermissions: boolean;
  hasUserPermissions: boolean;
  candidate?: Candidate;
  loggedUser: User;

  constructor(
    private authService: AuthService,
    private jobsService: JobsService
  ) {
  }

  checkIsCandidate(): void {
    this.jobsService.checkIsUserCandidate$(this.job.id, this.loggedUser.id).subscribe({
      next: (response) => {
        this.candidate = response && response[0];
      }
    });
  }

  ngOnInit(): void {
    this.hasOrganizationPermissions = this.authService.hasPermissions('organization');
    this.hasUserPermissions = this.authService.hasPermissions('user');
    this.loggedUser = this.authService.getLoggedUserFromLocalStorage();
    this.checkIsCandidate();
  }

  onDelete(): void {
    this.deleteClicked.emit(this.job.id);
  }

  onApply(): void {
    this.applyClicked.emit(this.job.id);
  }

  onRemoveApply(): void {
    this.removeApplyClicked.emit(this.candidate?.id);
  }
}
