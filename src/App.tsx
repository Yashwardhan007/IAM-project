import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Users, 
  Lock, 
  Key, 
  CheckCircle2, 
  XCircle, 
  Info, 
  ChevronRight,
  ShieldCheck,
  ShieldAlert,
  FileText,
  LayoutDashboard
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Role, ROLE_DEFINITIONS, PERMISSIONS } from './types';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [activeRole, setActiveRole] = useState<Role>('Intern');
  const [showDoc, setShowDoc] = useState(false);

  const currentRoleDef = ROLE_DEFINITIONS.find(r => r.role === activeRole)!;

  const hasPermission = (permId: string) => currentRoleDef.permissions.includes(permId);

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-zinc-200 bg-white flex items-center justify-between px-6 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Shield className="text-white w-5 h-5" />
          </div>
          <h1 className="font-semibold text-lg tracking-tight">IAM Role Explorer</h1>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowDoc(!showDoc)}
            className="flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-indigo-600 transition-colors"
          >
            <FileText className="w-4 h-4" />
            {showDoc ? 'View Dashboard' : 'View Assignment Doc'}
          </button>
          <div className="h-8 w-px bg-zinc-200" />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">System Active</span>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {showDoc ? (
            <motion.div
              key="doc"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <section className="glass-panel p-8">
                <h2 className="text-3xl font-bold mb-4">User & Role Identification Document</h2>
                <p className="text-zinc-600 mb-8 max-w-3xl">
                  This document outlines the Identity & Access Management (IAM) strategy for <strong>CloudScale IT Solutions</strong>, 
                  focusing on the Principle of Least Privilege (PoLP) and Role-Based Access Control (RBAC).
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                        <Users className="w-5 h-5 text-indigo-600" />
                        1. User Types & Roles
                      </h3>
                      <ul className="space-y-4">
                        {ROLE_DEFINITIONS.map(r => (
                          <li key={r.role} className="border-l-2 border-indigo-100 pl-4">
                            <span className="font-bold text-indigo-900">{r.role}</span>
                            <p className="text-sm text-zinc-600">{r.description}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                        <ShieldCheck className="w-5 h-5 text-indigo-600" />
                        2. Role Separation Importance
                      </h3>
                      <div className="bg-indigo-50/50 p-4 rounded-xl space-y-3 text-sm text-zinc-700 leading-relaxed">
                        <p>
                          <strong>Prevention of Insider Threats:</strong> By limiting access, we reduce the blast radius if an account is compromised or if a user acts maliciously.
                        </p>
                        <p>
                          <strong>Error Mitigation:</strong> Interns and junior employees cannot accidentally delete production databases or change critical system configs.
                        </p>
                        <p>
                          <strong>Compliance & Auditing:</strong> Clear role definitions make it easier to track who performed what action, satisfying regulatory requirements (SOC2, GDPR).
                        </p>
                        <p>
                          <strong>Principle of Least Privilege:</strong> Users are granted only the minimum level of access necessary to perform their job functions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid lg:grid-cols-12 gap-6"
            >
              {/* Sidebar - Role Selector */}
              <div className="lg:col-span-4 space-y-6">
                <div className="glass-panel p-6">
                  <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Key className="w-4 h-4" />
                    Select Identity
                  </h3>
                  <div className="space-y-2">
                    {ROLE_DEFINITIONS.map((r) => (
                      <button
                        key={r.role}
                        onClick={() => setActiveRole(r.role)}
                        className={cn(
                          "w-full flex items-center justify-between p-4 rounded-xl transition-all group",
                          activeRole === r.role 
                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" 
                            : "hover:bg-zinc-100 text-zinc-700"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center",
                            activeRole === r.role ? "bg-white/20" : "bg-zinc-200"
                          )}>
                            <Users className="w-5 h-5" />
                          </div>
                          <div className="text-left">
                            <div className="font-bold">{r.role}</div>
                            <div className={cn(
                              "text-xs truncate max-w-[150px]",
                              activeRole === r.role ? "text-indigo-100" : "text-zinc-500"
                            )}>
                              {r.description}
                            </div>
                          </div>
                        </div>
                        <ChevronRight className={cn(
                          "w-4 h-4 transition-transform",
                          activeRole === r.role ? "translate-x-1" : "opacity-0 group-hover:opacity-100"
                        )} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="glass-panel p-6 bg-indigo-900 text-white border-none">
                  <div className="flex items-center gap-3 mb-4">
                    <ShieldAlert className="w-6 h-6 text-indigo-300" />
                    <h3 className="font-semibold">IAM Security Tip</h3>
                  </div>
                  <p className="text-sm text-indigo-100 leading-relaxed">
                    Always review permissions quarterly. Over time, "permission creep" occurs where users accumulate access they no longer need.
                  </p>
                </div>
              </div>

              {/* Main Content - Permission Matrix */}
              <div className="lg:col-span-8 space-y-6">
                <div className="glass-panel p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold">Permission Matrix</h2>
                      <p className="text-zinc-500 text-sm">Current Context: <span className="text-indigo-600 font-semibold">{activeRole}</span></p>
                    </div>
                    <div className="flex items-center gap-2 bg-zinc-100 px-3 py-1.5 rounded-full">
                      <LayoutDashboard className="w-4 h-4 text-zinc-500" />
                      <span className="text-xs font-medium text-zinc-600">RBAC Visualization</span>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {PERMISSIONS.map((perm) => {
                      const allowed = hasPermission(perm.id);
                      return (
                        <motion.div
                          layout
                          key={perm.id}
                          className={cn(
                            "p-4 rounded-xl border transition-all duration-300",
                            allowed 
                              ? "bg-emerald-50/50 border-emerald-200" 
                              : "bg-zinc-50/50 border-zinc-200 opacity-60 grayscale"
                          )}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className={cn(
                              "font-semibold",
                              allowed ? "text-emerald-900" : "text-zinc-700"
                            )}>
                              {perm.name}
                            </h4>
                            {allowed ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                            ) : (
                              <XCircle className="w-5 h-5 text-zinc-300 shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-zinc-500 leading-relaxed">
                            {perm.description}
                          </p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Audit Log Simulation */}
                <div className="glass-panel p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Info className="w-4 h-4 text-indigo-600" />
                    Recent Activity Log
                  </h3>
                  <div className="space-y-3">
                    {[
                      { user: 'Admin', action: 'Modified System Config', time: '2 mins ago' },
                      { user: 'Manager', action: 'Approved Project "Alpha"', time: '15 mins ago' },
                      { user: 'Employee', action: 'Pushed code to production', time: '1 hour ago' },
                    ].map((log, i) => (
                      <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-zinc-100 last:border-0">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[10px] bg-zinc-100 px-2 py-0.5 rounded text-zinc-500">{log.time}</span>
                          <span className="font-medium text-zinc-700">{log.user}</span>
                          <span className="text-zinc-400">→</span>
                          <span className="text-zinc-600">{log.action}</span>
                        </div>
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-6 px-6 border-t border-zinc-200 bg-white text-center">
        <p className="text-xs text-zinc-400 font-medium uppercase tracking-widest">
          IAM Intern Assignment 1 • CloudScale IT Solutions • 2024
        </p>
      </footer>
    </div>
  );
}
