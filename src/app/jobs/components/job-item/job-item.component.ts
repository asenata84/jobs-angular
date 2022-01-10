import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Candidate, Job, Like } from '../../models/job.model';
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
  @Output() addLikeClicked = new EventEmitter<Like>();
  @Output() removeLikeClicked = new EventEmitter<number>();

  hasOrganizationPermissions: boolean;
  hasUserPermissions: boolean;
  candidate?: Candidate;
  loggedUser: User;
  likesCount: number = 0;
  isAlreadyLiked: boolean;
  likeId: number;

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
    this.likesCount = this.job?.likes?.length;
    this.likeId = this.job?.likes?.find((item) => item.userId?.toString() === this.loggedUser?.id?.toString())?.id;
    this.isAlreadyLiked = !!this.likeId
  }

  onDelete(): void {
    this.deleteClicked.emit(this.job.id);
  }

  onApply(): void {
    this.applyClicked.emit(this.job.id);
  }

  onRemoveApply(): void {
    this.removeApplyClicked.emit(this.job.id);
  }

  onAddLike(): void {
    this.addLikeClicked.emit({
      userId: this.loggedUser?.id,
      jobId: this.job?.id,
    });
  }

  onRemoveLike(): void {
    this.likeId && this.removeLikeClicked.emit(this.likeId);
  }
}
