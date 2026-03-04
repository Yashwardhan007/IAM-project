export type Role = 'Admin' | 'Manager' | 'Employee' | 'Intern';

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface RoleDefinition {
  role: Role;
  description: string;
  permissions: string[]; // IDs of permissions
}

export const PERMISSIONS: Permission[] = [
  { id: 'sys_config', name: 'System Configuration', description: 'Modify global system settings and security protocols.' },
  { id: 'user_mgmt', name: 'User Management', description: 'Create, delete, and modify user accounts and roles.' },
  { id: 'billing', name: 'Billing Access', description: 'View and manage company subscriptions and invoices.' },
  { id: 'proj_approve', name: 'Project Approval', description: 'Approve or reject project proposals and budgets.' },
  { id: 'code_write', name: 'Code Write Access', description: 'Push code changes to production repositories.' },
  { id: 'code_read', name: 'Code Read Access', description: 'View source code repositories.' },
  { id: 'docs_read', name: 'Documentation Read', description: 'Access internal company documentation and wikis.' },
  { id: 'logs_view', name: 'Audit Logs', description: 'View system access and change logs.' },
];

export const ROLE_DEFINITIONS: RoleDefinition[] = [
  {
    role: 'Admin',
    description: 'Full system access. Responsible for infrastructure and security.',
    permissions: ['sys_config', 'user_mgmt', 'billing', 'proj_approve', 'code_write', 'code_read', 'docs_read', 'logs_view'],
  },
  {
    role: 'Manager',
    description: 'Team lead responsible for project delivery and resource allocation.',
    permissions: ['proj_approve', 'code_read', 'docs_read', 'logs_view'],
  },
  {
    role: 'Employee',
    description: 'Core contributor (Developer/Engineer) building the product.',
    permissions: ['code_write', 'code_read', 'docs_read'],
  },
  {
    role: 'Intern',
    description: 'Learning role with limited access to prevent accidental damage.',
    permissions: ['code_read', 'docs_read'],
  },
];
