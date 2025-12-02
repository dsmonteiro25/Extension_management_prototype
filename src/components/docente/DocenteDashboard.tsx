import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  AlertCircle,
  CheckCircle,
  Clock,
  X,
  Users,
  Briefcase,
  TrendingUp,
  Award,
  Calendar,
  Activity,
  ArrowRight,
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { motion } from 'motion/react';

type DocenteDashboardProps = {
  onNavigate: (page: string) => void;
};

type Solicitacao = {
  id: number;
  aluno: string;
  titulo: string;
  cargaHoraria: number;
  data: string;
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

export function DocenteDashboard({ onNavigate }: DocenteDashboardProps) {
  const [rejeitarDialog, setRejeitarDialog] = useState<Solicitacao | null>(null);
  const [parecer, setParecer] = useState('');

  const solicitacoesPendentes: Solicitacao[] = [
    { id: 1, aluno: 'Maria Silva', titulo: 'Oficina de Inovação Social', cargaHoraria: 20, data: '20/11/2024' },
    { id: 2, aluno: 'João Santos', titulo: 'Congresso de Extensão', cargaHoraria: 16, data: '22/11/2024' },
    { id: 3, aluno: 'Ana Costa', titulo: 'Projeto Comunitário', cargaHoraria: 12, data: '25/11/2024' },
  ];

  const handleAprovar = (id: number) => {
    alert(`Solicitação ${id} aprovada!`);
  };

  const handleRejeitar = () => {
    if (parecer.trim()) {
      alert(`Solicitação ${rejeitarDialog?.id} rejeitada com parecer.`);
      setRejeitarDialog(null);
      setParecer('');
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 border-l-4 border-purple-400 p-6 rounded-r-lg shadow-lg text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-2xl mb-2">Painel do Docente</h1>
            <p className="text-blue-100">
              Gerencie solicitações, oportunidades e grupos de discentes
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-white/10 backdrop-blur rounded-full flex items-center justify-center">
              <Activity className="w-10 h-10 text-purple-400" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Cards de Status */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate('analise')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Solicitações Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">3</div>
            <p className="text-xs text-muted-foreground">aguardando análise</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate('oportunidades')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Oportunidades</CardTitle>
            <Briefcase className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">5</div>
            <p className="text-xs text-muted-foreground">em andamento</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate('oportunidades')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Ações Coordenadas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">3</div>
            <p className="text-xs text-muted-foreground">projetos ativos</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate('grupos')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Grupos de Discentes</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">2</div>
            <p className="text-xs text-muted-foreground">grupos gerenciados</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Ação Rápida */}
      <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <CardHeader>
          <CardTitle>Criar Nova Oportunidade</CardTitle>
          <CardDescription className="text-blue-100">
            Configure um novo projeto ou ação de extensão
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="secondary"
            className="w-full sm:w-auto"
            onClick={() => onNavigate('criar-oportunidade')}
          >
            Criar Oportunidade
          </Button>
        </CardContent>
      </Card>

      {/* Solicitações Pendentes */}
      <Card>
        <CardHeader>
          <CardTitle>Solicitações Aguardando Análise</CardTitle>
          <CardDescription>
            Aprove ou rejeite solicitações de aproveitamento de horas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {solicitacoesPendentes.map((solicitacao) => (
              <div
                key={solicitacao.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-medium">{solicitacao.aluno}</h4>
                    <Badge variant="secondary">{solicitacao.cargaHoraria}h</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {solicitacao.titulo}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Enviado em {solicitacao.data}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 sm:flex-none"
                    onClick={() => handleAprovar(solicitacao.id)}
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Aprovar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 sm:flex-none text-red-600 hover:text-red-700"
                    onClick={() => setRejeitarDialog(solicitacao)}
                  >
                    <X className="w-4 h-4 mr-1" />
                    Rejeitar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dialog de Rejeição */}
      <Dialog open={!!rejeitarDialog} onOpenChange={() => setRejeitarDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rejeitar Solicitação</DialogTitle>
            <DialogDescription>
              É obrigatório fornecer um parecer justificando a rejeição
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm">
                <strong>Aluno:</strong> {rejeitarDialog?.aluno}
              </p>
              <p className="text-sm">
                <strong>Atividade:</strong> {rejeitarDialog?.titulo}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="parecer">Parecer (obrigatório)</Label>
              <Textarea
                id="parecer"
                placeholder="Descreva o motivo da rejeição..."
                value={parecer}
                onChange={(e) => setParecer(e.target.value)}
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejeitarDialog(null)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleRejeitar}
              disabled={!parecer.trim()}
            >
              Rejeitar Solicitação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}