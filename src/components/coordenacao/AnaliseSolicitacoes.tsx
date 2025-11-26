import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import { CheckCircle, X, Eye, FileText, Clock } from 'lucide-react';

type Solicitacao = {
  id: number;
  aluno: string;
  titulo: string;
  ch: number;
  data: string;
  prazoRestante: number;
  status: 'pendente' | 'em_analise';
};

const solicitacoes: Solicitacao[] = [
  {
    id: 1,
    aluno: 'Maria Silva',
    titulo: 'Workshop de Design Thinking',
    ch: 16,
    data: '20/11/2024',
    prazoRestante: 2,
    status: 'pendente',
  },
  {
    id: 2,
    aluno: 'João Santos',
    titulo: 'Curso de React e TypeScript',
    ch: 40,
    data: '21/11/2024',
    prazoRestante: 4,
    status: 'pendente',
  },
  {
    id: 3,
    aluno: 'Ana Costa',
    titulo: 'Hackathon Regional',
    ch: 24,
    data: '22/11/2024',
    prazoRestante: 5,
    status: 'em_analise',
  },
  {
    id: 4,
    aluno: 'Pedro Almeida',
    titulo: 'Congresso de Tecnologia',
    ch: 20,
    data: '23/11/2024',
    prazoRestante: 7,
    status: 'pendente',
  },
];

type AnaliseSolicitacoesProps = {
  userRole: string | null;
};

export function AnaliseSolicitacoes({ userRole }: AnaliseSolicitacoesProps) {
  const [visualizarDialog, setVisualizarDialog] = useState<Solicitacao | null>(null);
  const [rejeitarDialog, setRejeitarDialog] = useState<Solicitacao | null>(null);
  const [parecer, setParecer] = useState('');

  const handleAprovar = (solicitacao: Solicitacao) => {
    alert(`Solicitação de ${solicitacao.aluno} aprovada! ${solicitacao.ch}h contabilizadas.`);
  };

  const handleRejeitar = () => {
    if (parecer.trim()) {
      alert(`Solicitação rejeitada com parecer.`);
      setRejeitarDialog(null);
      setParecer('');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>{userRole === 'COORDENACAO' ? 'Análise de Solicitações' : 'Solicitações para Análise'}</h1>
        <p className="text-muted-foreground">
          Aprove ou rejeite solicitações de aproveitamento de horas
        </p>
      </div>

      {userRole === 'COORDENACAO' && (
        <Alert className="border-blue-200 bg-blue-50">
          <Clock className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>Importante:</strong> A coordenação tem prazo de 10 dias úteis para responder
            cada solicitação. Solicitações próximas do prazo estão destacadas.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <Tabs defaultValue="pendente">
          <CardHeader>
            <TabsList>
              <TabsTrigger value="pendente">
                Pendentes ({solicitacoes.filter((s) => s.status === 'pendente').length})
              </TabsTrigger>
              <TabsTrigger value="em_analise">
                Em Análise ({solicitacoes.filter((s) => s.status === 'em_analise').length})
              </TabsTrigger>
            </TabsList>
          </CardHeader>

          <CardContent>
            <TabsContent value="pendente" className="space-y-4">
              {solicitacoes
                .filter((s) => s.status === 'pendente')
                .map((solicitacao) => (
                  <div
                    key={solicitacao.id}
                    className={`p-4 border rounded-lg ${
                      solicitacao.prazoRestante <= 3 ? 'border-red-300 bg-red-50' : ''
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <h4 className="font-medium">{solicitacao.aluno}</h4>
                          <Badge variant="secondary">{solicitacao.ch}h</Badge>
                          {solicitacao.prazoRestante <= 3 && (
                            <Badge variant="destructive">Urgente</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {solicitacao.titulo}
                        </p>
                        <div className="flex gap-4 text-xs text-muted-foreground">
                          <span>Enviado em {solicitacao.data}</span>
                          <span
                            className={
                              solicitacao.prazoRestante <= 3 ? 'text-red-600 font-medium' : ''
                            }
                          >
                            Prazo: {solicitacao.prazoRestante} dias
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setVisualizarDialog(solicitacao)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Visualizar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-green-600 hover:text-green-700"
                          onClick={() => handleAprovar(solicitacao)}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Aprovar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => setRejeitarDialog(solicitacao)}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Rejeitar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </TabsContent>

            <TabsContent value="em_analise" className="space-y-4">
              {solicitacoes
                .filter((s) => s.status === 'em_analise')
                .map((solicitacao) => (
                  <div key={solicitacao.id} className="p-4 border rounded-lg bg-blue-50">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <h4 className="font-medium">{solicitacao.aluno}</h4>
                          <Badge variant="secondary">{solicitacao.ch}h</Badge>
                          <Badge variant="default">Em Análise</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {solicitacao.titulo}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Enviado em {solicitacao.data}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setVisualizarDialog(solicitacao)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Visualizar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-green-600 hover:text-green-700"
                          onClick={() => handleAprovar(solicitacao)}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Aprovar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => setRejeitarDialog(solicitacao)}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Rejeitar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>

      {/* Dialog de Visualização */}
      <Dialog open={!!visualizarDialog} onOpenChange={() => setVisualizarDialog(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes da Solicitação</DialogTitle>
            <DialogDescription>
              {visualizarDialog?.aluno} • {visualizarDialog?.ch}h
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Título da Atividade</Label>
              <p className="mt-1">{visualizarDialog?.titulo}</p>
            </div>
            <div>
              <Label>Descrição</Label>
              <p className="mt-1 text-sm text-muted-foreground">
                Participação em workshop intensivo sobre metodologias ágeis e design thinking
                aplicadas ao desenvolvimento de produtos digitais. Atividades incluíram
                dinâmicas práticas, estudos de caso e projeto final em equipe.
              </p>
            </div>
            <div>
              <Label>Certificado Anexado</Label>
              <div className="mt-2 border rounded-lg p-4 flex items-center gap-3">
                <FileText className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="font-medium">certificado_workshop.pdf</p>
                  <p className="text-sm text-muted-foreground">Assinado digitalmente</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <Label>Data de Envio</Label>
                <p className="mt-1">{visualizarDialog?.data}</p>
              </div>
              <div>
                <Label>Prazo Restante</Label>
                <p className="mt-1">{visualizarDialog?.prazoRestante} dias</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setVisualizarDialog(null)}>
              Fechar
            </Button>
            <Button
              variant="outline"
              className="text-green-600 hover:text-green-700"
              onClick={() => {
                if (visualizarDialog) handleAprovar(visualizarDialog);
                setVisualizarDialog(null);
              }}
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Aprovar
            </Button>
            <Button
              variant="outline"
              className="text-red-600 hover:text-red-700"
              onClick={() => {
                setRejeitarDialog(visualizarDialog);
                setVisualizarDialog(null);
              }}
            >
              <X className="w-4 h-4 mr-1" />
              Rejeitar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
                placeholder="Descreva o motivo da rejeição de forma clara e objetiva..."
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
