import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Download, Clock, CheckCircle } from 'lucide-react';

type Participacao = {
  id: number;
  titulo: string;
  docente: string;
  ch: number;
  periodo: string;
  status: 'em_andamento' | 'finalizada';
  certificado?: boolean;
};

const participacoes: Participacao[] = [
  {
    id: 1,
    titulo: 'Projeto de Extensão em Comunidades Rurais',
    docente: 'Prof. Ana Costa',
    ch: 40,
    periodo: 'Março a Junho/2024',
    status: 'finalizada',
    certificado: true,
  },
  {
    id: 2,
    titulo: 'Oficinas de Programação para Jovens',
    docente: 'Prof. Carlos Mendes',
    ch: 30,
    periodo: 'Outubro/2024 - Em andamento',
    status: 'em_andamento',
  },
  {
    id: 3,
    titulo: 'Assessoria Jurídica Popular',
    docente: 'Profa. Julia Santos',
    ch: 60,
    periodo: '2023.2',
    status: 'finalizada',
    certificado: true,
  },
];

export function MinhasParticipacoes() {
  return (
    <div className="space-y-6">
      <div>
        <h1>Minhas Participações</h1>
        <p className="text-muted-foreground">
          Oportunidades em que você está inscrito ou participou
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Participações Ativas</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">
              {participacoes.filter((p) => p.status === 'em_andamento').length}
            </div>
            <p className="text-xs text-muted-foreground">projetos em andamento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Participações Concluídas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">
              {participacoes.filter((p) => p.status === 'finalizada').length}
            </div>
            <p className="text-xs text-muted-foreground">projetos finalizados</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Participações</CardTitle>
          <CardDescription>
            {participacoes.length} participação(ões) no total
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {participacoes.map((participacao) => (
            <div
              key={participacao.id}
              className="border rounded-lg p-4 space-y-3 hover:bg-slate-50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-start gap-2 flex-wrap">
                    <h4 className="font-medium">{participacao.titulo}</h4>
                    {participacao.status === 'em_andamento' ? (
                      <Badge variant="default" className="bg-blue-600">
                        Em Andamento
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Finalizada</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {participacao.docente} • {participacao.ch}h
                  </p>
                  <p className="text-sm text-muted-foreground">{participacao.periodo}</p>
                </div>
                {participacao.certificado && (
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Certificado
                  </Button>
                )}
              </div>

              {participacao.status === 'em_andamento' && (
                <div className="pt-3 border-t">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progresso</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: '75%' }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
