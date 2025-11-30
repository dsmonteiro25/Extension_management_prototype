import { useState } from 'react';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Users,
  BarChart3,
  Menu,
  LogOut,
  X,
  Award,
  CheckCircle,
  PlusCircle,
  GraduationCap,
  Shield,
  UserCircle,
  MessageCircle,
  Star,
  AlertCircle,
  HelpCircle,
  Settings,
} from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import type { User } from '../App';
import logoUfma from 'figma:asset/16a018f002fbeb5508e0814ec34593c255b2ec3d.png';

// Dashboards
import { AlunoDashboard } from './aluno/AlunoDashboard';
import { DocenteDashboard } from './docente/DocenteDashboard';
import { CoordenacaoDashboard } from './coordenacao/CoordenacaoDashboard';

// Aluno pages
import { SolicitarAproveitamento } from './aluno/SolicitarAproveitamento';
import { AcompanharSolicitacoes } from './aluno/AcompanharSolicitacoes';
import { MinhasParticipacoes } from './aluno/MinhasParticipacoes';

// Docente pages
import { CriarOportunidade } from './docente/CriarOportunidade';
import { AcompanhamentoOportunidade } from './docente/AcompanhamentoOportunidade';
import { GruposDiscentes } from './shared/GruposDiscentes';

// Coordenação pages
import { AnaliseSolicitacoes } from './coordenacao/AnaliseSolicitacoes';
import { Relatorios } from './coordenacao/Relatorios';

// Admin pages
import { GestaoPermissoes } from './admin/GestaoPermissoes';
import { LogsAuditoria } from './admin/LogsAuditoria';
import { ImportarUsuarios } from './admin/ImportarUsuarios';

// Perfil pages
import { MeuPerfil } from './perfil/MeuPerfil';

// Comunicação pages
import { ComunicacaoInterna } from './comunicacao/ComunicacaoInterna';
import { AvaliacoesFeedback } from './comunicacao/AvaliacoesFeedback';
import { Ouvidoria } from './comunicacao/Ouvidoria';

// Ajuda
import { FAQ } from './ajuda/FAQ';

// Shared
import { BotaoAcessibilidade } from './shared/BotaoAcessibilidade';

type DashboardLayoutProps = {
  user: User;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
};

type NavItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  roles: string[];
};

const navigationItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />,
    roles: ['ALUNO', 'DOCENTE', 'COORDENACAO'],
  },
  {
    id: 'solicitar',
    label: 'Solicitar Aproveitamento',
    icon: <PlusCircle className="w-5 h-5" />,
    roles: ['ALUNO'],
  },
  {
    id: 'solicitacoes',
    label: 'Minhas Solicitações',
    icon: <FileText className="w-5 h-5" />,
    roles: ['ALUNO'],
  },
  {
    id: 'participacoes',
    label: 'Minhas Participações',
    icon: <Award className="w-5 h-5" />,
    roles: ['ALUNO'],
  },
  {
    id: 'criar-oportunidade',
    label: 'Criar Oportunidade',
    icon: <PlusCircle className="w-5 h-5" />,
    roles: ['DOCENTE'],
  },
  {
    id: 'oportunidades',
    label: 'Minhas Oportunidades',
    icon: <Briefcase className="w-5 h-5" />,
    roles: ['DOCENTE', 'COORDENACAO'],
  },
  {
    id: 'grupos',
    label: 'Grupos de Discentes',
    icon: <Users className="w-5 h-5" />,
    roles: ['DOCENTE', 'COORDENACAO'],
  },
  {
    id: 'analise',
    label: 'Análise de Solicitações',
    icon: <CheckCircle className="w-5 h-5" />,
    roles: ['COORDENACAO', 'DOCENTE'],
  },
  {
    id: 'relatorios',
    label: 'Relatórios',
    icon: <BarChart3 className="w-5 h-5" />,
    roles: ['COORDENACAO'],
  },
  {
    id: 'gestao-permissoes',
    label: 'Gestão de Permissões',
    icon: <Shield className="w-5 h-5" />,
    roles: ['ADMIN'],
  },
  {
    id: 'logs-auditoria',
    label: 'Logs de Auditoria',
    icon: <AlertCircle className="w-5 h-5" />,
    roles: ['ADMIN'],
  },
  {
    id: 'importar-usuarios',
    label: 'Importar Usuários',
    icon: <UserCircle className="w-5 h-5" />,
    roles: ['ADMIN'],
  },
  {
    id: 'meu-perfil',
    label: 'Meu Perfil',
    icon: <Settings className="w-5 h-5" />,
    roles: ['ALUNO', 'DOCENTE', 'COORDENACAO', 'ADMIN'],
  },
  {
    id: 'comunicacao-interna',
    label: 'Comunicação Interna',
    icon: <MessageCircle className="w-5 h-5" />,
    roles: ['ALUNO', 'DOCENTE', 'COORDENACAO', 'ADMIN'],
  },
  {
    id: 'avaliacoes-feedback',
    label: 'Avaliações e Feedback',
    icon: <Star className="w-5 h-5" />,
    roles: ['ALUNO', 'DOCENTE', 'COORDENACAO', 'ADMIN'],
  },
  {
    id: 'ouvidoria',
    label: 'Ouvidoria',
    icon: <HelpCircle className="w-5 h-5" />,
    roles: ['ALUNO', 'DOCENTE', 'COORDENACAO', 'ADMIN'],
  },
  {
    id: 'faq',
    label: 'FAQ',
    icon: <HelpCircle className="w-5 h-5" />,
    roles: ['ALUNO', 'DOCENTE', 'COORDENACAO', 'ADMIN'],
  },
];

export function DashboardLayout({ user, currentPage, onNavigate, onLogout }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredNav = navigationItems.filter((item) =>
    item.roles.includes(user.role || '')
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        if (user.role === 'ALUNO') return <AlunoDashboard onNavigate={onNavigate} />;
        if (user.role === 'DOCENTE') return <DocenteDashboard onNavigate={onNavigate} />;
        if (user.role === 'COORDENACAO') return <CoordenacaoDashboard onNavigate={onNavigate} />;
        return null;
      case 'solicitar':
        return <SolicitarAproveitamento />;
      case 'solicitacoes':
        return <AcompanharSolicitacoes />;
      case 'participacoes':
        return <MinhasParticipacoes />;
      case 'criar-oportunidade':
        return <CriarOportunidade />;
      case 'oportunidades':
        return <AcompanhamentoOportunidade />;
      case 'grupos':
        return <GruposDiscentes userRole={user.role} />;
      case 'analise':
        return <AnaliseSolicitacoes userRole={user.role} />;
      case 'relatorios':
        return <Relatorios />;
      case 'gestao-permissoes':
        return <GestaoPermissoes />;
      case 'logs-auditoria':
        return <LogsAuditoria />;
      case 'importar-usuarios':
        return <ImportarUsuarios />;
      case 'meu-perfil':
        return <MeuPerfil user={user} />;
      case 'comunicacao-interna':
        return <ComunicacaoInterna />;
      case 'avaliacoes-feedback':
        return <AvaliacoesFeedback />;
      case 'ouvidoria':
        return <Ouvidoria />;
      case 'faq':
        return <FAQ />;
      default:
        return <div>Página não encontrada</div>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-blue-900 border-b border-blue-800 z-40">
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-blue-800"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1.5">
                <img src={logoUfma} alt="UFMA" className="w-full h-full object-contain" />
              </div>
              <div className="hidden sm:block">
                <p className="text-white font-medium text-sm">SIGEX - UFMA</p>
                <p className="text-blue-200 text-xs">Sistema de Gestão de Extensão</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:block text-right">
              <p className="text-sm text-white">{user.name}</p>
              <p className="text-xs text-blue-200">
                {user.role === 'ALUNO' && 'Discente'}
                {user.role === 'DOCENTE' && 'Docente'}
                {user.role === 'COORDENACAO' && 'Coordenação'}
                {user.role === 'ADMIN' && 'Admin'}
              </p>
            </div>
            <Avatar>
              <AvatarFallback className="bg-blue-700 text-white">
                {user.name.split(' ').map((n) => n[0]).join('').substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="icon" onClick={onLogout} className="text-white hover:bg-blue-800">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 bottom-0 w-64 bg-white border-r border-slate-200 z-30 transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <nav className="p-4 space-y-1">
          {filteredNav.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentPage === item.id
                  ? 'bg-blue-900 text-white'
                  : 'text-slate-700 hover:bg-blue-50 hover:text-blue-900'
              }`}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="pt-16 lg:pl-64">
        <div className="p-6 lg:p-8">{renderPage()}</div>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Botão de Acessibilidade (RF45) */}
      <BotaoAcessibilidade />
    </div>
  );
}