import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Download, FileText, CheckCircle } from 'lucide-react';

const participantes = [
  { id: 1, nome: 'Maria Silva', presencas: 8, faltas: 1, percentual: 89 },
  { id: 2, nome: 'João Santos', presencas: 9, faltas: 0, percentual: 100 },
  { id: 3, nome: 'Ana Costa', presencas: 7, faltas: 2, percentual: 78 },
  { id: 4, nome: 'Pedro Almeida', presencas: 9, faltas: 0, percentual: 100 },
];

const atividades = [
  { id: 1, titulo: 'Reunião de Planejamento', data: '15/03/2024', concluida: true },
  { id: 2, titulo: 'Visita à Comunidade', data: '22/03/2024', concluida: true },
  { id: 3, titulo: 'Oficina 1 - Sustentabilidade', data: '05/04/2024', concluida: true },
  { id: 4, titulo: 'Oficina 2 - Empreendedorismo', data: '19/04/2024', concluida: false },
];

export function AcompanhamentoOportunidade() {
  const [tabActive, setTabActive] = useState('plano');

  return (
    <div className="space-y-6">
      <div>
        <h1>Acompanhamento de Oportunidade</h1>
        <p className="text-muted-foreground">
          Projeto de Extensão em Comunidades Rurais
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Participantes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{participantes.length}</div>
            <p className="text-xs text-muted-foreground">alunos inscritos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Frequência Média</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">92%</div>
            <p className="text-xs text-muted-foreground">presença geral</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Atividades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">
              {atividades.filter((a) => a.concluida).length}/{atividades.length}
            </div>
            <p className="text-xs text-muted-foreground">concluídas</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <Tabs value={tabActive} onValueChange={setTabActive}>
          <CardHeader>
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
              <TabsTrigger value="plano">Plano</TabsTrigger>
              <TabsTrigger value="frequencia">Frequência</TabsTrigger>
              <TabsTrigger value="atividades">Atividades</TabsTrigger>
              <TabsTrigger value="certificacao">Certificação</TabsTrigger>
            </TabsList>
          </CardHeader>

          <CardContent>
            <TabsContent value="plano" className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Plano de Atividades</h3>
                <p className="text-sm text-muted-foreground">
                  Documento detalhado com objetivos, metodologia e cronograma
                </p>
              </div>
              <div className="border rounded-lg p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="font-medium">plano_atividades.pdf</p>
                    <p className="text-sm text-muted-foreground">Enviado em 10/03/2024</p>
                  </div>
                </div>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Baixar
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="frequencia" className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Registro de Frequência</h3>
                  <p className="text-sm text-muted-foreground">
                    Controle de presença dos participantes
                  </p>
                </div>
                <Button>Registrar Presença</Button>
              </div>

              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Aluno</TableHead>
                      <TableHead className="text-center">Presenças</TableHead>
                      <TableHead className="text-center">Faltas</TableHead>
                      <TableHead className="text-center">Percentual</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {participantes.map((participante) => (
                      <TableRow key={participante.id}>
                        <TableCell>{participante.nome}</TableCell>
                        <TableCell className="text-center">{participante.presencas}</TableCell>
                        <TableCell className="text-center">{participante.faltas}</TableCell>
                        <TableCell className="text-center">{participante.percentual}%</TableCell>
                        <TableCell className="text-center">
                          {participante.percentual >= 75 ? (
                            <Badge className="bg-green-600">Aprovado</Badge>
                          ) : (
                            <Badge variant="destructive">Reprovado</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="md:hidden space-y-4">
                {participantes.map((participante) => (
                  <div key={participante.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{participante.nome}</h4>
                      {participante.percentual >= 75 ? (
                        <Badge className="bg-green-600">Aprovado</Badge>
                      ) : (
                        <Badge variant="destructive">Reprovado</Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Presenças</p>
                        <p>{participante.presencas}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Faltas</p>
                        <p>{participante.faltas}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Percentual</p>
                        <p>{participante.percentual}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="atividades" className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Atividades Executadas</h3>
                  <p className="text-sm text-muted-foreground">
                    Registro do cronograma e execução
                  </p>
                </div>
                <Button>Adicionar Atividade</Button>
              </div>

              <div className="space-y-3">
                {atividades.map((atividade) => (
                  <div
                    key={atividade.id}
                    className="flex items-center gap-3 p-4 border rounded-lg"
                  >
                    <Checkbox checked={atividade.concluida} />
                    <div className="flex-1">
                      <p className={atividade.concluida ? 'line-through text-muted-foreground' : ''}>
                        {atividade.titulo}
                      </p>
                      <p className="text-sm text-muted-foreground">{atividade.data}</p>
                    </div>
                    {atividade.concluida && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="certificacao" className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Emissão de Certificados</h3>
                <p className="text-sm text-muted-foreground">
                  Certificados autenticados digitalmente pelo sistema
                </p>
              </div>

              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-base">Pronto para Certificação</CardTitle>
                  <CardDescription>
                    {participantes.filter((p) => p.percentual >= 75).length} aluno(s) cumpriram
                    os requisitos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button size="lg" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Emitir Certificados (PDF)
                  </Button>
                </CardContent>
              </Card>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Alunos Elegíveis</h4>
                {participantes
                  .filter((p) => p.percentual >= 75)
                  .map((participante) => (
                    <div
                      key={participante.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <p>{participante.nome}</p>
                        <p className="text-sm text-muted-foreground">
                          Frequência: {participante.percentual}%
                        </p>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                  ))}
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}
