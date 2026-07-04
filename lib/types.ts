export type Role = "Cleaner" | "Manager";
export type JobType = "deep" | "standard";
export type ProfileId = "sophie" | "james" | "amara" | "manager";

export interface Profile {
  id: ProfileId;
  initials: string;
  name: string;
  role: Role;
  phone: string;
  email: string;
  zone: string;
  since: string;
  completed: number;
  pending: number;
  rate: string;
  jobs: string[];
}

export interface HistoryEntry {
  name: string;
  date: string;
  pct: number;
  done: boolean;
}

export interface Job {
  id: string;
  name: string;
  address: string;
  date: string;
  cleaner: string;
  type: JobType;
}

/** room name -> ordered list of task labels */
export type TaskTemplate = Record<string, string[]>;

/** jobId -> room name -> array of booleans (done state), aligned to TaskTemplate order */
export type TaskState = Record<string, Record<string, boolean[]>>;

export type Screen = "login" | "home" | "checklist" | "profile";
