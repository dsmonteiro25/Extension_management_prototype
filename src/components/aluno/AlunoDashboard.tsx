import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import {
  Clock,
  CheckCircle,
  FileText,
  Briefcase,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';

type AlunoDashboardProps = {
  onNavigate: (page: string) => void;
};

const oportunidades = [
  {
    id: 1,
    titulo: 'Projeto de Extensão em Comunidades Rurais',
    docente: 'Prof. Ana Costa',
    cargaHoraria: 40,
    periodo: 'Março a Junho/2025',
    vagas: 5,
  },
  {
    id: 2,
    titulo: 'Oficinas de Programação para Jovens',
    docente: 'Prof. Carlos Mendes',
    cargaHoraria: 30,
    periodo: 'Abril a Maio/2025',
    vagas: 10,
  },
  {
    id: 3,
    titulo: 'Assessoria Jurídica Popular',
    docente: 'Profa. Julia Santos',
    cargaHoraria: 60,
    periodo: 'Todo o semestre',
    vagas: 8,
  },
];

export function AlunoDashboard({ onNavigate }: AlunoDashboardProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white border-l-4 border-blue-900 p-4 rounded-r-lg shadow-sm">
        <h1 className="text-blue-900">Painel do Discente</h1>
        <p className="text-muted-foreground">
          Acompanhe suas horas e participe de oportunidades de extensão universitária
        </p>
      </div>

      {/* Alertas */}
      <Alert className="border-amber-200 bg-amber-50">
        <AlertCircle className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800">
          Atenção! Você ainda precisa completar <strong>25 horas</strong> neste semestre para
          cumprir os requisitos de extensão.
        </AlertDescription>
      </Alert>

      {/* Cards de Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Horas Concluídas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">35h</div>
            <p className="text-xs text-muted-foreground">de 60h necessárias</p>
            <div className="mt-2 w-full bg-slate-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '58%' }} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Horas Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">25h</div>
            <p className="text-xs text-muted-foreground">para completar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Solicitações em Análise</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">2</div>
            <p className="text-xs text-muted-foreground">aguardando aprovação</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Oportunidades Abertas</CardTitle>
            <Briefcase className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{oportunidades.length}</div>
            <p className="text-xs text-muted-foreground">disponíveis agora</p>
          </CardContent>
        </Card>
      </div>

      {/* Ações Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('solicitar')}>
          <CardHeader>
            <CardTitle>Solicitar Aproveitamento</CardTitle>
            <CardDescription>
              Envie certificados de atividades externas para aprovação
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              Nova Solicitação
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('solicitacoes')}>
          <CardHeader>
            <CardTitle>Acompanhar Solicitações</CardTitle>
            <CardDescription>
              Verifique o status das suas solicitações enviadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Ver Solicitações
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Oportunidades Disponíveis */}
      <Card>
        <CardHeader>
          <CardTitle>Oportunidades Disponíveis</CardTitle>
          <CardDescription>
            Inscreva-se em projetos e ações de extensão
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {oportunidades.map((oportunidade) => (
            <div
              key={oportunidade.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors gap-4"
            >
              <div className="flex-1">
                <h4 className="font-medium">{oportunidade.titulo}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {oportunidade.docente} • {oportunidade.cargaHoraria}h • {oportunidade.periodo}
                </p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary">{oportunidade.vagas} vagas</Badge>
                </div>
              </div>
              <Button>Inscrever-se</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}