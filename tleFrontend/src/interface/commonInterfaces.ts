/* eslint-disable @typescript-eslint/no-explicit-any */

export interface UnifiedContest {
    id?: number; 
    title: string;
    titleSlug?: string; 
    startTimeSeconds?: number; 
    startTime?: number; 
    originStartTime?: number; 
    cardImg?: string | null; 
    sponsors?: any[];
    pcdLink?:string;
    platform: "Codeforces" | "LeetCode" | "CodeChef"; 
    status: "Available for Registration" | "Not Available";
  }

