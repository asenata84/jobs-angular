export interface Job {
  id: number;
  title: string;
  description?: string;
  typeId: string;
  catId: number;
  likes?: Like[]
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
