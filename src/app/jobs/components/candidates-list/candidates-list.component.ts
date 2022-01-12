import { Component, OnInit } from '@angular/core';
import { Candidate } from '../../../jobs/models/job.model';
import { JobsService } from '../../../jobs/services/jobs.service';
import { AuthService } from '../../../auth/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';

@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.scss']
})
export class CandidatesListComponent implements OnInit {

  candidates: Candidate[];
  hasPermissions: boolean;
  hasApprovedCandidate: boolean;
  destroy$ = new Subject<boolean>();

  constructor(
    private authService: AuthService,
    private jobsService: JobsService,
    private route: ActivatedRoute,
  ) {
  }

  getCandidates() {
    this.route.params.pipe(
      switchMap((params) => {
        const id = params.id;

        if (id) {
          return this.jobsService.getCandidates$(id);
        }

        return of(null);
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        this.candidates = response;
        this.hasApprovedCandidate = !!this.candidates?.find((item) => item?.status === 'approved')
      }
    });
  }

  ngOnInit(): void {
    this.hasPermissions = this.authService.hasPermissions('organization');

    this.getCandidates();
  }

  onUpdateStatus({ id, status }: { id: number, status: string }): void {
    this.jobsService.patchCandidate$(id, { status }).subscribe({
      next: () => {
        this.getCandidates();
      }
    });
  }
}
