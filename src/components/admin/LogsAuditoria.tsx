import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { FileText, Download, Search, Filter } from 'lucide-react';

type AuditLog = {
  id: number;
  timestamp: string;
  usuario: string;
  perfil: string;
  acao: 'criar' | 'editar' | 'aprovar' | 'rejeitar' | 'excluir' | 'login' | 'logout';
  modulo: string;
  descricao: string;
  ip: string;
  detalhes?: string;
};

const logs: AuditLog[] = [
  {
    id: 1,
    timestamp: '30/11/2024 14:35:22',
    usuario: 'Coord. João Santos',
    perfil: 'Coordenação',
    acao: 'aprovar',
    modulo: 'Solicitações',
    descricao: 'Aprovou solicitação de Maria Silva (20h)',
    ip: '192.168.1.100',
  },
  {
    id: 2,
    timestamp: '30/11/2024 14:30:15',
    usuario: 'Prof. Ana Costa',
    perfil: 'Docente',
    acao: 'criar',
    modulo: 'Oportunidades',
    descricao: 'Criou oportunidade "Extensão Rural 2025"',
    ip: '192.168.1.101',
  },
  {
    id: 3,
    timestamp: '30/11/2024 14:25:08',
    usuario: 'Pedro Almeida',
    perfil: 'Discente',
    acao: 'criar',
    modulo: 'Solicitações',
    descricao: 'Enviou solicitação de aproveitamento (16h)',
    ip: '192.168.1.102',
  },
  {
    id: 4,
    timestamp: '30/11/2024 14:20:45',
    usuario: 'Admin Sistema',
    perfil: 'Administrador',
    acao: 'editar',
    modulo: 'Permissões',
    descricao: 'Alterou permissões do perfil Docente',
    ip: '192.168.1.1',
  },
  {
    id: 5,
    timestamp: '30/11/2024 14:15:30',
    usuario: 'Prof. Carlos Mendes',
    perfil: 'Docente',
    acao: 'rejeitar',
    modulo: 'Solicitações',
    descricao: 'Rejeitou solicitação de João Santos',
    ip: '192.168.1.103',
    detalhes: 'Certificado sem assinatura digital válida',
  },
  {
    id: 6,
    timestamp: '30/11/2024 14:10:12',
    usuario: 'Maria Silva',
    perfil: 'Discente',
    acao: 'login',
    modulo: 'Autenticação',
    descricao: 'Login realizado com sucesso',
    ip: '192.168.1.104',
  },
];

export function LogsAuditoria() {
  const [filtroUsuario, setFiltroUsuario] = useState('');
  const [filtroAcao, setFiltroAcao] = useState('todas');
  const [filtroModulo, setFiltroModulo] = useState('todos');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  const getAcaoBadge = (acao: AuditLog['acao']) => {
    const variants = {
      criar: { variant: 'default' as const, className: 'bg-blue-600' },
      editar: { variant: 'default' as const, className: 'bg-amber-600' },
      aprovar: { variant: 'default' as const, className: 'bg-green-600' },
      rejeitar: { variant: 'destructive' as const, className: '' },
      excluir: { variant: 'destructive' as const, className: '' },
      login: { variant: 'secondary' as const, className: '' },
      logout: { variant: 'secondary' as const, className: '' },
    };

    const config = variants[acao];
    return (
      <Badge variant={config.variant} className={config.className}>
        {acao.charAt(0).toUpperCase() + acao.slice(1)}
      </Badge>
    );
  };

  const logsFiltrados = logs.filter(log => {
    if (filtroUsuario && !log.usuario.toLowerCase().includes(filtroUsuario.toLowerCase())) {
      return false;
    }
    if (filtroAcao !== 'todas' && log.acao !== filtroAcao) {
      return false;
    }
    if (filtroModulo !== 'todos' && log.modulo !== filtroModulo) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white border-l-4 border-blue-900 p-4 rounded-r-lg shadow-sm">
        <h1 className="text-blue-900">Logs de Auditoria</h1>
        <p className="text-muted-foreground">
          Registro completo de ações críticas no sistema (RF49)
        </p>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total de Registros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{logs.length}</div>
            <p className="text-xs text-muted-foreground">nas últimas 24h</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Ações Críticas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">
              {logs.filter(l => ['aprovar', 'rejeitar', 'excluir'].includes(l.acao)).length}
            </div>
            <p className="text-xs text-muted-foreground">hoje</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Usuários Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{new Set(logs.map(l => l.usuario)).size}</div>
            <p className="text-xs text-muted-foreground">usuários diferentes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Módulos Acessados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{new Set(logs.map(l => l.modulo)).size}</div>
            <p className="text-xs text-muted-foreground">módulos distintos</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros de Pesquisa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label>Usuário</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar usuário..."
                  value={filtroUsuario}
                  onChange={(e) => setFiltroUsuario(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Ação</Label>
              <Select value={filtroAcao} onValueChange={setFiltroAcao}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas as Ações</SelectItem>
                  <SelectItem value="criar">Criar</SelectItem>
                  <SelectItem value="editar">Editar</SelectItem>
                  <SelectItem value="aprovar">Aprovar</SelectItem>
                  <SelectItem value="rejeitar">Rejeitar</SelectItem>
                  <SelectItem value="excluir">Excluir</SelectItem>
                  <SelectItem value="login">Login</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Módulo</Label>
              <Select value={filtroModulo} onValueChange={setFiltroModulo}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Módulos</SelectItem>
                  <SelectItem value="Solicitações">Solicitações</SelectItem>
                  <SelectItem value="Oportunidades">Oportunidades</SelectItem>
                  <SelectItem value="Permissões">Permissões</SelectItem>
                  <SelectItem value="Autenticação">Autenticação</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Data Início</Label>
              <Input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Data Fim</Label>
              <Input type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Limpar Filtros
            </Button>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Exportar Logs
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Registros de Auditoria</CardTitle>
          <CardDescription>
            {logsFiltrados.length} registro(s) encontrado(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data/Hora</TableHead>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Perfil</TableHead>
                  <TableHead>Ação</TableHead>
                  <TableHead>Módulo</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>IP</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logsFiltrados.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="text-nowrap">{log.timestamp}</TableCell>
                    <TableCell>{log.usuario}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{log.perfil}</Badge>
                    </TableCell>
                    <TableCell>{getAcaoBadge(log.acao)}</TableCell>
                    <TableCell>{log.modulo}</TableCell>
                    <TableCell className="max-w-md">
                      <div>
                        {log.descricao}
                        {log.detalhes && (
                          <p className="text-xs text-muted-foreground mt-1">{log.detalhes}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-nowrap text-muted-foreground text-sm">
                      {log.ip}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
