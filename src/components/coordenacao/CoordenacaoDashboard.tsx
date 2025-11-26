import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Clock,
  AlertCircle,
  Briefcase,
  TrendingUp,
  Users,
} from 'lucide-react';

type CoordenacaoDashboardProps = {
  onNavigate: (page: string) => void;
};

const alunosDeficit = [
  { nome: 'Carlos Souza', deficit: 45, semestre: '2024.2' },
  { nome: 'Fernanda Lima', deficit: 38, semestre: '2024.2' },
  { nome: 'Roberto Dias', deficit: 30, semestre: '2024.2' },
];

const solicitacoesPrioritarias = [
  { aluno: 'Maria Silva', titulo: 'Workshop Design', prazo: '2 dias', ch: 16 },
  { aluno: 'João Santos', titulo: 'Curso React', prazo: '4 dias', ch: 40 },
  { aluno: 'Ana Costa', titulo: 'Hackathon Regional', prazo: '5 dias', ch: 24 },
];

export function CoordenacaoDashboard({ onNavigate }: CoordenacaoDashboardProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1>Dashboard da Coordenação</h1>
        <p className="text-muted-foreground">
          Visão geral das atividades de extensão
        </p>
      </div>

      {/* Cards de Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate('analise')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Pendências</CardTitle>
            <Clock className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">12</div>
            <p className="text-xs text-muted-foreground">solicitações aguardando</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Alunos com Déficit</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{alunosDeficit.length}</div>
            <p className="text-xs text-muted-foreground">precisam de atenção</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate('oportunidades')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Oportunidades</CardTitle>
            <Briefcase className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">18</div>
            <p className="text-xs text-muted-foreground">no semestre atual</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate('relatorios')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Taxa de Conclusão</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">78%</div>
            <p className="text-xs text-muted-foreground">dos alunos no prazo</p>
          </CardContent>
        </Card>
      </div>

      {/* Alertas Gerais */}
      <Card className="border-amber-200 bg-amber-50">
        <CardHeader>
          <CardTitle className="text-amber-900">Alertas Gerais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <p className="font-medium text-amber-900">
                5 solicitações próximas do prazo limite (10 dias)
              </p>
              <p className="text-sm text-amber-800">
                Priorize a análise para evitar atrasos
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <p className="font-medium text-amber-900">
                {alunosDeficit.length} alunos com déficit superior a 30 horas
              </p>
              <p className="text-sm text-amber-800">
                Considere notificar e oferecer oportunidades adicionais
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Solicitações Prioritárias */}
        <Card>
          <CardHeader>
            <CardTitle>Solicitações Prioritárias</CardTitle>
            <CardDescription>Ordenadas por prazo de resposta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {solicitacoesPrioritarias.map((solicitacao, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg gap-2"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium">{solicitacao.aluno}</p>
                    <Badge variant="secondary">{solicitacao.ch}h</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{solicitacao.titulo}</p>
                  <p className="text-xs text-red-600 mt-1">
                    Prazo: {solicitacao.prazo}
                  </p>
                </div>
                <Button size="sm" onClick={() => onNavigate('analise')}>
                  Analisar
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Alunos com Maior Déficit */}
        <Card>
          <CardHeader>
            <CardTitle>Alunos com Maior Déficit</CardTitle>
            <CardDescription>Prioridade de acompanhamento</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {alunosDeficit.map((aluno, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium">{aluno.nome}</p>
                    <p className="text-sm text-muted-foreground">
                      Semestre: {aluno.semestre}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-red-600">{aluno.deficit}h</p>
                  <p className="text-xs text-muted-foreground">faltantes</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Ações Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('analise')}>
          <CardHeader>
            <CardTitle className="text-base">Analisar Solicitações</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Acessar</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('relatorios')}>
          <CardHeader>
            <CardTitle className="text-base">Ver Relatórios</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">Acessar</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('grupos')}>
          <CardHeader>
            <CardTitle className="text-base">Gerenciar Grupos</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">Acessar</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
