export const Role = {
  User: 'user',
  System: 'system',
} as const;

export type Role = typeof Role[keyof typeof Role];

export type Message = {
  message: string;
  role: Role;
  timestamp: Date;
};

