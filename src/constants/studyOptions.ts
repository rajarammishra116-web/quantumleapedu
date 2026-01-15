export const BOARDS = ["CBSE", "Odisha Board"] as const;

export const CLASSES = ["9", "10"] as const;

export const SUBJECTS = [
  "Physics",
  "Chemistry",
  "Mathematics",
  "Biology",
  "History",
  "Geography",
  "Political Science",
  "Economics",
] as const;

export const SIMULATION_SUBJECTS = SUBJECTS.filter((s) =>
  !["History", "Political Science", "Economics"].includes(s)
);
