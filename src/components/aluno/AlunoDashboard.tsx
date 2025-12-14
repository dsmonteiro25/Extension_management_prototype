import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import { Alert, AlertDescription } from '../ui/alert';
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
  Users,
  MapPin,
  Info,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

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

  const [selectedOportunidade, setSelectedOportunidade] = useState<any>(null);
  const [inscricoes, setInscricoes] = useState<number[]>([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const oportunidades = [
    {
      id: 1,
      titulo: 'Extensão em Comunidades Rurais',
      docente: 'Prof. Ana Costa',
      cargaHoraria: 40,
      periodo: 'Jan - Abr 2025',
      vagas: 5,
      descricao: 'Projeto de extensão voltado para o desenvolvimento sustentável de comunidades rurais, com foco em educação ambiental e práticas agroecológicas.',
      requisitos: 'Disponibilidade aos sábados, interesse em questões ambientais',
      local: 'Comunidades rurais de São Luís - MA',
      dataInicio: '15/01/2025',
    },
    {
      id: 2,
      titulo: 'Oficinas de Programação para Jovens',
      docente: 'Prof. Carlos Mendes',
      cargaHoraria: 30,
      periodo: 'Fev - Mai 2025',
      vagas: 8,
      descricao: 'Ensino de programação básica e desenvolvimento de jogos educativos para jovens de escolas públicas, visando inclusão digital.',
      requisitos: 'Conhecimento básico em programação, didática',
      local: 'Escolas públicas de São Luís - MA',
      dataInicio: '01/02/2025',
    },
    {
      id: 3,
      titulo: 'Projeto Saúde na Comunidade',
      docente: 'Profa. Maria Santos',
      cargaHoraria: 35,
      periodo: 'Mar - Jun 2025',
      vagas: 3,
      descricao: 'Ações de promoção à saúde, prevenção de doenças e educação em saúde em comunidades carentes, com palestras e atendimentos básicos.',
      requisitos: 'Curso na área de saúde, empatia, trabalho em equipe',
      local: 'Unidades Básicas de Saúde - São Luís - MA',
      dataInicio: '10/03/2025',
    },
  ];

  const handleInscrever = (oportunidade: any) => {
    setSelectedOportunidade(oportunidade);
  };

  const confirmarInscricao = () => {
    if (selectedOportunidade) {
      setInscricoes([...inscricoes, selectedOportunidade.id]);
      setSelectedOportunidade(null);
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 5000);
    }
  };

  const isInscrito = (id: number) => inscricoes.includes(id);

  return (
    <div className="space-y-6">
      {/* Alert de Sucesso */}
      {showSuccessAlert && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Inscrição realizada com sucesso! Você receberá mais informações por email.
          </AlertDescription>
        </Alert>
      )}
      
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
              <Button
                onClick={() => handleInscrever(oportunidade)}
                disabled={isInscrito(oportunidade.id)}
              >
                {isInscrito(oportunidade.id) ? 'Inscrito' : 'Inscrever-se'}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Dialog de Inscrição */}
      <Dialog open={selectedOportunidade !== null} onOpenChange={() => setSelectedOportunidade(null)}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-900" />
              {selectedOportunidade?.titulo}
            </DialogTitle>
            <DialogDescription>
              Confira as informações da oportunidade e confirme sua inscrição
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Informações Principais */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="text-xs text-muted-foreground">Coordenador</span>
                </div>
                <p className="text-sm font-medium">{selectedOportunidade?.docente}</p>
              </div>
              
              <div className="bg-slate-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="h-4 w-4 text-amber-600" />
                  <span className="text-xs text-muted-foreground">Carga Horária</span>
                </div>
                <p className="text-sm font-medium">{selectedOportunidade?.cargaHoraria} horas</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="h-4 w-4 text-green-600" />
                  <span className="text-xs text-muted-foreground">Período</span>
                </div>
                <p className="text-sm font-medium">{selectedOportunidade?.periodo}</p>
              </div>
              
              <div className="bg-slate-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="h-4 w-4 text-purple-600" />
                  <span className="text-xs text-muted-foreground">Vagas</span>
                </div>
                <p className="text-sm font-medium">{selectedOportunidade?.vagas} disponíveis</p>
              </div>
            </div>

            {/* Local */}
            <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Local</span>
              </div>
              <p className="text-sm text-blue-800">{selectedOportunidade?.local}</p>
            </div>

            {/* Descrição */}
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Info className="h-4 w-4 text-blue-900" />
                Descrição do Projeto
              </h4>
              <p className="text-sm text-muted-foreground bg-slate-50 p-3 rounded-lg">
                {selectedOportunidade?.descricao}
              </p>
            </div>

            {/* Requisitos */}
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                Requisitos
              </h4>
              <p className="text-sm text-muted-foreground bg-green-50 border border-green-100 p-3 rounded-lg">
                {selectedOportunidade?.requisitos}
              </p>
            </div>

            {/* Aviso */}
            <Alert className="border-amber-200 bg-amber-50">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800 text-sm">
                Ao confirmar a inscrição, você será contatado pelo docente responsável com as próximas instruções.
              </AlertDescription>
            </Alert>
          </div>
          
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setSelectedOportunidade(null)}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={confirmarInscricao}
              className="bg-blue-900 hover:bg-blue-800"
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Confirmar Inscrição
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}