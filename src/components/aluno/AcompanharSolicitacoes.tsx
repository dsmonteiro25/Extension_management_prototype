import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Eye, RefreshCw } from 'lucide-react';

type Solicitacao = {
  id: number;
  titulo: string;
  ch: number;
  data: string;
  status: 'enviado' | 'em_analise' | 'aprovado' | 'rejeitado';
  parecer?: string;
};

const solicitacoes: Solicitacao[] = [
  {
    id: 1,
    titulo: 'Workshop de Inovação Social',
    ch: 20,
    data: '15/11/2024',
    status: 'aprovado',
  },
  {
    id: 2,
    titulo: 'Curso de Python Avançado',
    ch: 40,
    data: '20/11/2024',
    status: 'em_analise',
  },
  {
    id: 3,
    titulo: 'Palestra sobre Sustentabilidade',
    ch: 4,
    data: '22/11/2024',
    status: 'rejeitado',
    parecer:
      'O certificado apresentado não possui assinatura digital válida. Por favor, solicite uma segunda via autenticada à instituição promotora.',
  },
  {
    id: 4,
    titulo: 'Hackathon Universitário',
    ch: 30,
    data: '25/11/2024',
    status: 'enviado',
  },
];

export function AcompanharSolicitacoes() {
  const [parecerDialog, setParecerDialog] = useState<Solicitacao | null>(null);

  const getStatusBadge = (status: Solicitacao['status']) => {
    const variants = {
      enviado: { variant: 'secondary' as const, label: 'Enviado' },
      em_analise: { variant: 'default' as const, label: 'Em Análise' },
      aprovado: { variant: 'default' as const, label: 'Aprovado', className: 'bg-green-600' },
      rejeitado: { variant: 'destructive' as const, label: 'Rejeitado' },
    };

    const config = variants[status];
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Minhas Solicitações</h1>
        <p className="text-muted-foreground">
          Acompanhe o status das suas solicitações de aproveitamento
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Solicitações</CardTitle>
          <CardDescription>
            {solicitacoes.length} solicitação(ões) no total
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Desktop Table */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead className="text-center">CH</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {solicitacoes.map((solicitacao) => (
                  <TableRow key={solicitacao.id}>
                    <TableCell>{solicitacao.titulo}</TableCell>
                    <TableCell className="text-center">{solicitacao.ch}h</TableCell>
                    <TableCell>{solicitacao.data}</TableCell>
                    <TableCell>{getStatusBadge(solicitacao.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        {solicitacao.status === 'rejeitado' && solicitacao.parecer && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setParecerDialog(solicitacao)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Ver Parecer
                            </Button>
                            <Button size="sm" variant="outline">
                              <RefreshCw className="w-4 h-4 mr-1" />
                              Reenviar
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {solicitacoes.map((solicitacao) => (
              <div key={solicitacao.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">{solicitacao.titulo}</h4>
                  {getStatusBadge(solicitacao.status)}
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Carga Horária: {solicitacao.ch}h</p>
                  <p>Data: {solicitacao.data}</p>
                </div>
                {solicitacao.status === 'rejeitado' && solicitacao.parecer && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => setParecerDialog(solicitacao)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Ver Parecer
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Reenviar
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Parecer Dialog */}
      <Dialog open={!!parecerDialog} onOpenChange={() => setParecerDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Parecer da Análise</DialogTitle>
            <DialogDescription>{parecerDialog?.titulo}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Motivo da Rejeição:</p>
              <p className="text-sm text-muted-foreground">{parecerDialog?.parecer}</p>
            </div>
            <Button className="w-full" onClick={() => setParecerDialog(null)}>
              Fechar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
