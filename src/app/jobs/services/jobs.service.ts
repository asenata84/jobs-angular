import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidate, Category, Job, Like } from '../models/job.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(
    private http: HttpClient
  ) {
  }

  getJobs$(): Observable<Job[]> {
    return this.http.get<Job[]>(`${environment.apiUrl}/jobs?_embed=likes`);
  }

  getCategories$(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiUrl}/cats`);
  }

  getCandidates$(id: number): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(`${environment.apiUrl}/jobs/${id}/candidates`);
  }

  checkIsUserCandidate$(jobId: number, userId: number): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(`${environment.apiUrl}/candidates?userId=${userId}&jobId=${jobId}`);
  }


  postCandidates$(candidate: Candidate): Observable<Candidate> {
    return this.http.post<Candidate>(`${environment.apiUrl}/candidates`, candidate);
  }

  patchCandidate$(id: number, data: any): Observable<Candidate> {
    return this.http.patch<Candidate>(`${environment.apiUrl}/candidates/${id}`, data);
  }

  getLikes$(): Observable<Like[]> {
    return this.http.get<Like[]>(`${environment.apiUrl}/likes`);
  }

  postLikes$(data: any): Observable<Like> {
    return this.http.post<Like>(`${environment.apiUrl}/likes`, data);
  }

  deleteLike$(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/likes/${id}`);
  }

  deleteCandidate$(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/candidates/${id}`);
  }

  getTypes$(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiUrl}/types`);
  }

  getJob$(id: number): Observable<Job> {
    return this.http.get<Job>(`${environment.apiUrl}/jobs/${id}`);
  }

  postJob$(job: Job): Observable<Job> {
    return this.http.post<Job>(`${environment.apiUrl}/jobs`, job);
  }

  putJob$(job: Job): Observable<Job> {
    return this.http.put<Job>(`${environment.apiUrl}/jobs/${job.id}`, job);
  }

  deleteJob$(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/jobs/${id}`);
  }
}
