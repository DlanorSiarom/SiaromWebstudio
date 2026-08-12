import React, { useState, useEffect } from 'react';
import { 
  AdminSection, 
  AdminUser, 
  UserSession, 
  ClientItem, 
  ProjectItem, 
  CMSPage, 
  MediaFile, 
  MarketingCampaign, 
  LeadItem, 
  SystemLog, 
  BackupItem, 
  SecurityThreat, 
  NotificationItem 
} from './adminTypes';

import {
  INITIAL_ADMIN_USERS,
  INITIAL_USER_SESSIONS,
  INITIAL_CLIENTS,
  INITIAL_PROJECTS,
  INITIAL_CMS_PAGES,
  INITIAL_MEDIA_FILES,
  INITIAL_MARKETING_CAMPAIGNS,
  INITIAL_LEADS,
  INITIAL_SYSTEM_LOGS,
  INITIAL_BACKUPS,
  INITIAL_SECURITY_THREATS,
  INITIAL_NOTIFICATIONS
} from './adminMockData';

import { AdminLogin } from './AdminLogin';
import { AdminSidebar } from './components/AdminSidebar';
import { AdminHeader } from './components/AdminHeader';
import { CommandPalette } from './components/CommandPalette';
import { NotificationDrawer } from './components/NotificationDrawer';
import { ToastContainer, ToastMessage } from './components/Toast';

import { DashboardView } from './views/DashboardView';
import { ClientsView } from './views/ClientsView';
import { ProjectsView } from './views/ProjectsView';
import { ContentView } from './views/ContentView';
import { MediaView } from './views/MediaView';
import { MarketingView } from './views/MarketingView';
import { AnalyticsView } from './views/AnalyticsView';
import { UsersView } from './views/UsersView';
import { SecurityView } from './views/SecurityView';
import { BackupsView } from './views/BackupsView';
import { LogsView } from './views/LogsView';
import { SettingsView } from './views/SettingsView';

interface AdminLayoutProps {
  onGoToPublicSite: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onGoToPublicSite }) => {
  // Auth state - Default false to force login via authorized admin email
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('siarom_admin_auth');
      if (saved) {
        const parsed = JSON.parse(saved);
        return Boolean(parsed.authenticated);
      }
    } catch {
      // ignore
    }
    return false;
  });

  const [currentSection, setCurrentSection] = useState<AdminSection>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // System State Data
  const [users, setUsers] = useState<AdminUser[]>(INITIAL_ADMIN_USERS);
  const [sessions, setSessions] = useState<UserSession[]>(INITIAL_USER_SESSIONS);
  const [clients, setClients] = useState<ClientItem[]>(INITIAL_CLIENTS);
  const [projects, setProjects] = useState<ProjectItem[]>(INITIAL_PROJECTS);
  const [cmsPages, setCmsPages] = useState<CMSPage[]>(INITIAL_CMS_PAGES);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>(INITIAL_MEDIA_FILES);
  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>(INITIAL_MARKETING_CAMPAIGNS);
  const [leads, setLeads] = useState<LeadItem[]>(INITIAL_LEADS);
  const [logs, setLogs] = useState<SystemLog[]>(INITIAL_SYSTEM_LOGS);
  const [backups, setBackups] = useState<BackupItem[]>(INITIAL_BACKUPS);
  const [threats, setThreats] = useState<SecurityThreat[]>(INITIAL_SECURITY_THREATS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, type: ToastMessage['type'] = 'info', message?: string) => {
    const newToast: ToastMessage = {
      id: `toast-${Date.now()}-${Math.random()}`,
      title,
      type,
      message
    };
    setToasts(prev => [...prev.slice(-3), newToast]);
  };

  const handleDismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem('siarom_admin_auth');
    setIsAuthenticated(false);
  };

  // Quick Action Handler
  const handleQuickAction = () => {
    if (currentSection === 'clients') {
      addToast('Utilize o botão "Cadastrar Novo Cliente" no painel', 'info');
    } else if (currentSection === 'projects') {
      addToast('Utilize o botão "Novo Projeto" no painel', 'info');
    } else {
      setIsCommandPaletteOpen(true);
    }
  };

  // Handlers for state updates
  const handleAddClient = (client: ClientItem) => {
    setClients([client, ...clients]);
    const log: SystemLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleString('pt-BR'),
      userId: 'usr-admin',
      userName: 'Administrador Siarom',
      actionType: 'create',
      severity: 'info',
      description: `Cliente criado: ${client.name}`,
      ip: '127.0.0.1',
      browser: 'Chrome',
      os: 'Linux',
      location: 'Brasil'
    };
    setLogs([log, ...logs]);
  };

  const handleUpdateClient = (updated: ClientItem) => {
    setClients(clients.map(c => c.id === updated.id ? updated : c));
  };

  const handleDeleteClient = (id: string) => {
    setClients(clients.filter(c => c.id !== id));
  };

  const handleAddProject = (project: ProjectItem) => {
    setProjects([project, ...projects]);
  };

  const handleUpdateProject = (updated: ProjectItem) => {
    setProjects(projects.map(p => p.id === updated.id ? updated : p));
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const handleUpdateCMSPage = (updated: CMSPage) => {
    setCmsPages(cmsPages.map(p => p.id === updated.id ? updated : p));
  };

  const handleAddMediaFile = (file: MediaFile) => {
    setMediaFiles([file, ...mediaFiles]);
  };

  const handleDeleteMediaFile = (id: string) => {
    setMediaFiles(mediaFiles.map(f => f.id === id ? { ...f, trashed: true } : f));
  };

  const handleRestoreMediaFile = (id: string) => {
    setMediaFiles(mediaFiles.map(f => f.id === id ? { ...f, trashed: false } : f));
  };

  const handleUpdateLeadStatus = (id: string, status: LeadItem['status']) => {
    setLeads(leads.map(l => l.id === id ? { ...l, status } : l));
  };

  const handleAddUser = (user: AdminUser) => {
    setUsers([user, ...users]);
  };

  const handleUpdateUser = (updated: AdminUser) => {
    setUsers(users.map(u => u.id === updated.id ? updated : u));
  };

  const handleKillSession = (sessionId: string) => {
    setSessions(sessions.filter(s => s.id !== sessionId));
  };

  const handleAddBackup = (backup: BackupItem) => {
    setBackups([backup, ...backups]);
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  // Render Login if not authenticated
  if (!isAuthenticated) {
    return (
      <AdminLogin
        onLoginSuccess={() => setIsAuthenticated(true)}
        onGoToPublicSite={onGoToPublicSite}
      />
    );
  }

  return (
    <div className={`min-h-screen bg-neutral-950 text-slate-100 font-sans flex ${darkMode ? 'dark' : ''}`}>
      
      {/* Sidebar Navigation */}
      <AdminSidebar
        currentSection={currentSection}
        onSelectSection={setCurrentSection}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onGoToPublicSite={onGoToPublicSite}
        onLogout={handleLogout}
        clientsCount={clients.length}
        projectsCount={projects.length}
        leadsCount={leads.length}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Sticky Header */}
        <AdminHeader
          currentSection={currentSection}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          unreadNotificationsCount={unreadNotificationsCount}
          onGoToPublicSite={onGoToPublicSite}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          onQuickAction={handleQuickAction}
        />

        {/* View Container */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {currentSection === 'dashboard' && (
            <DashboardView
              clients={clients}
              projects={projects}
              logs={logs}
              onNavigateToSection={setCurrentSection}
              onAddToast={addToast}
            />
          )}

          {currentSection === 'clients' && (
            <ClientsView
              clients={clients}
              onAddClient={handleAddClient}
              onUpdateClient={handleUpdateClient}
              onDeleteClient={handleDeleteClient}
              onAddToast={addToast}
            />
          )}

          {currentSection === 'projects' && (
            <ProjectsView
              projects={projects}
              clients={clients}
              onAddProject={handleAddProject}
              onUpdateProject={handleUpdateProject}
              onDeleteProject={handleDeleteProject}
              onAddToast={addToast}
            />
          )}

          {currentSection === 'content' && (
            <ContentView
              cmsPages={cmsPages}
              onUpdateCMSPage={handleUpdateCMSPage}
              onAddToast={addToast}
            />
          )}

          {currentSection === 'media' && (
            <MediaView
              mediaFiles={mediaFiles}
              onAddMediaFile={handleAddMediaFile}
              onDeleteMediaFile={handleDeleteMediaFile}
              onRestoreMediaFile={handleRestoreMediaFile}
              onAddToast={addToast}
            />
          )}

          {currentSection === 'marketing' && (
            <MarketingView
              campaigns={campaigns}
              leads={leads}
              onUpdateLeadStatus={handleUpdateLeadStatus}
              onAddToast={addToast}
            />
          )}

          {currentSection === 'analytics' && (
            <AnalyticsView onAddToast={addToast} />
          )}

          {currentSection === 'users' && (
            <UsersView
              users={users}
              sessions={sessions}
              onAddUser={handleAddUser}
              onUpdateUser={handleUpdateUser}
              onKillSession={handleKillSession}
              onAddToast={addToast}
            />
          )}

          {currentSection === 'security' && (
            <SecurityView
              threats={threats}
              onAddToast={addToast}
            />
          )}

          {currentSection === 'backups' && (
            <BackupsView
              backups={backups}
              onAddBackup={handleAddBackup}
              onAddToast={addToast}
            />
          )}

          {currentSection === 'logs' && (
            <LogsView
              logs={logs}
              onAddToast={addToast}
            />
          )}

          {currentSection === 'settings' && (
            <SettingsView onAddToast={addToast} />
          )}
        </main>

      </div>

      {/* Floating Modals / Drawers / Toasts */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectSection={setCurrentSection}
      />

      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllRead={() => {
          setNotifications(notifications.map(n => ({ ...n, read: true })));
          addToast('Notificações marcadas como lidas', 'info');
        }}
        onClearAll={() => {
          setNotifications([]);
          addToast('Notificações limpas', 'info');
        }}
      />

      <ToastContainer
        toasts={toasts}
        onDismiss={handleDismissToast}
      />

    </div>
  );
};
