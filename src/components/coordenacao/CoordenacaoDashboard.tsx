import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import {
  AlertTriangle,
  Clock,
  Users,
  Briefcase,
  TrendingUp,
  FileText,
  CheckCircle,
  XCircle,
  BarChart3,
  Target,
  Activity,
} from 'lucide-react';
import { motion } from 'motion/react';

type CoordenacaoDashboardProps = {
  onNavigate: (page: string) => void;
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function CoordenacaoDashboard({ onNavigate }: CoordenacaoDashboardProps) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-gradient-to-r from-green-900 via-emerald-900 to-green-900 border-l-4 border-emerald-400 p-6 rounded-r-lg shadow-lg text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-2xl mb-2">Painel da Coordenação</h1>
            <p className="text-green-100">
              Visão geral das atividades de extensão universitária - UFMA
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-white/10 backdrop-blur rounded-full flex items-center justify-center">
              <BarChart3 className="w-10 h-10 text-emerald-400" />
            </div>
          </div>
        </div>
      </motion.div>

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
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">3</div>
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
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
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
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <p className="font-medium text-amber-900">
                3 alunos com déficit superior a 30 horas
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
            <div
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg gap-2"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-medium">Maria Silva</p>
                  <Badge variant="secondary">16h</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Workshop Design</p>
                <p className="text-xs text-red-600 mt-1">
                  Prazo: 2 dias
                </p>
              </div>
              <Button size="sm" onClick={() => onNavigate('analise')}>
                Analisar
              </Button>
            </div>
            <div
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg gap-2"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-medium">João Santos</p>
                  <Badge variant="secondary">40h</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Curso React</p>
                <p className="text-xs text-red-600 mt-1">
                  Prazo: 4 dias
                </p>
              </div>
              <Button size="sm" onClick={() => onNavigate('analise')}>
                Analisar
              </Button>
            </div>
            <div
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg gap-2"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-medium">Ana Costa</p>
                  <Badge variant="secondary">24h</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Hackathon Regional</p>
                <p className="text-xs text-red-600 mt-1">
                  Prazo: 5 dias
                </p>
              </div>
              <Button size="sm" onClick={() => onNavigate('analise')}>
                Analisar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Alunos com Maior Déficit */}
        <Card>
          <CardHeader>
            <CardTitle>Alunos com Maior Déficit</CardTitle>
            <CardDescription>Prioridade de acompanhamento</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="font-medium">Carlos Souza</p>
                  <p className="text-sm text-muted-foreground">
                    Semestre: 2024.2
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-red-600">45h</p>
                <p className="text-xs text-muted-foreground">faltantes</p>
              </div>
            </div>
            <div
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="font-medium">Fernanda Lima</p>
                  <p className="text-sm text-muted-foreground">
                    Semestre: 2024.2
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-red-600">38h</p>
                <p className="text-xs text-muted-foreground">faltantes</p>
              </div>
            </div>
            <div
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="font-medium">Roberto Dias</p>
                  <p className="text-sm text-muted-foreground">
                    Semestre: 2024.2
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-red-600">30h</p>
                <p className="text-xs text-muted-foreground">faltantes</p>
              </div>
            </div>
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