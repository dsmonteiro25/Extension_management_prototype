import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import {
  Clock,
  FileText,
  Briefcase,
  Award,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Target,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'motion/react';

type AlunoDashboardProps = {
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

export function AlunoDashboard({ onNavigate }: AlunoDashboardProps) {
  const horasConcluidas = 45;
  const horasObrigatorias = 100;
  const progressoPercentual = (horasConcluidas / horasObrigatorias) * 100;

  const oportunidades = [
    {
      id: 1,
      titulo: 'Extensão em Comunidades Rurais',
      docente: 'Prof. Ana Costa',
      cargaHoraria: 40,
      periodo: 'Jan - Abr 2025',
      vagas: 5,
    },
    {
      id: 2,
      titulo: 'Oficinas de Programação para Jovens',
      docente: 'Prof. Carlos Mendes',
      cargaHoraria: 30,
      periodo: 'Fev - Mai 2025',
      vagas: 8,
    },
    {
      id: 3,
      titulo: 'Projeto Saúde na Comunidade',
      docente: 'Profa. Maria Santos',
      cargaHoraria: 35,
      periodo: 'Mar - Jun 2025',
      vagas: 3,
    },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 border-l-4 border-yellow-400 p-6 rounded-r-lg shadow-lg text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-2xl mb-2">Painel do Discente</h1>
            <p className="text-blue-100">
              Acompanhe suas horas e participe de oportunidades de extensão universitária
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-white/10 backdrop-blur rounded-full flex items-center justify-center">
              <Target className="w-10 h-10 text-yellow-400" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Progresso de Horas - Destaque */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-blue-900" />
                  Progresso de Horas de Extensão
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  Acompanhe seu progresso em tempo real
                </CardDescription>
              </div>
              <Badge className="bg-blue-900 text-white text-lg px-4 py-2">
                {progressoPercentual.toFixed(0)}%
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-5xl font-bold text-blue-900">{horasConcluidas}h</p>
                <p className="text-muted-foreground">concluídas</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-slate-400">{horasObrigatorias}h</p>
                <p className="text-muted-foreground">obrigatórias</p>
              </div>
            </div>

            <div className="space-y-3">
              <Progress value={progressoPercentual} className="h-4" />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Faltam {horasObrigatorias - horasConcluidas}h</span>
                <span className="font-medium text-blue-900">Meta: {horasObrigatorias}h</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-900">Aprovadas</span>
                </div>
                <p className="text-2xl font-bold text-green-900">30h</p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-amber-600" />
                  <span className="font-medium text-amber-900">Pendentes</span>
                </div>
                <p className="text-2xl font-bold text-amber-900">15h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Cards de Estatísticas */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <Card variants={item}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Horas Concluídas</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">35h</div>
            <p className="text-xs text-muted-foreground">de 60h necessárias</p>
            <div className="mt-2 w-full bg-slate-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '58%' }} />
            </div>
          </CardContent>
        </Card>

        <Card variants={item}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Horas Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">25h</div>
            <p className="text-xs text-muted-foreground">para completar</p>
          </CardContent>
        </Card>

        <Card variants={item}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Solicitações em Análise</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">2</div>
            <p className="text-xs text-muted-foreground">aguardando aprovação</p>
          </CardContent>
        </Card>

        <Card variants={item}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Oportunidades Abertas</CardTitle>
            <Briefcase className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{oportunidades.length}</div>
            <p className="text-xs text-muted-foreground">disponíveis agora</p>
          </CardContent>
        </Card>
      </motion.div>

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