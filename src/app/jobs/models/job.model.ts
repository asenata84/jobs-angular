export interface Job {
  id: number;
  title: string;
  description?: string;
  type: string;
  category: string;
  likes?: Like[]
  candidates?: Candidate[]
}

export interface Category {
  id: number;
  name: string;
}

export interface Type {
  id: number;
  name: string;
}

export interface Candidate {
  id?: number;
  status?: string;
  userId: number;
  jobId: number;
}

export interface Like {
  id?: number;
  userId: number;
  jobId: number;
}
