import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Job, Category, Type } from '../../models/job.model';
import { JobsService } from '../../services/jobs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { title } from '../../validators/title.validator';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  categories: Category[];
  types: Type[];
  destroy$ = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private jobsService: JobsService
  ) {
  }

  ngOnInit(): void {
    this.buildForm();

    this.jobsService.getCategories$().subscribe({
      next: (response) => {
        this.categories = response;
      }
    });

    this.jobsService.getTypes$().subscribe({
      next: (response) => {
        this.types = response;
        this.buildForm();
      }
    });

    this.route.params.pipe(
      switchMap((params) => {
        const id = params.id;

        if (id) {
          return this.jobsService.getJob$(id);
        }

        return of(null);
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        this.buildForm(response);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit(): void {
    const job = this.formGroup.value as Job;

    let request$;

    if (!job.id) {
      request$ = this.jobsService.postJob$(job);
    } else {
      request$ = this.jobsService.putJob$(job);
    }

    request$.subscribe({
      next: () => {
        this.router.navigate(['/main', 'jobs']);
      }
    });
  }

  private buildForm(job?: Job): void {
    this.formGroup = this.fb.group({
      id: job?.id,
      title: [job?.title || '', [Validators.required]],
      description: [job?.description || '', [Validators.required]],
      type: [job?.type || this.types && this.types[0]?.name, [Validators.required]],
      category: [job?.category || this.categories && this.categories[0]?.name, [Validators.required]]
    });
  }
}
