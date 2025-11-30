import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Star, ThumbsUp, MessageSquare, Award } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

type Avaliacao = {
  id: number;
  oportunidade: string;
  avaliador: string;
  nota: number;
  comentario: string;
  data: string;
};

const avaliacoesRecebidas: Avaliacao[] = [
  {
    id: 1,
    oportunidade: 'Extensão Rural 2024',
    avaliador: 'Prof. Ana Costa',
    nota: 5,
    comentario: 'Excelente participação! Demonstrou grande comprometimento e proatividade.',
    data: '20/11/2024',
  },
  {
    id: 2,
    oportunidade: 'Oficinas de Programação',
    avaliador: 'Prof. Carlos Mendes',
    nota: 4,
    comentario: 'Bom desempenho nas atividades propostas. Continue assim!',
    data: '15/10/2024',
  },
];

export function AvaliacoesFeedback() {
  const [nota, setNota] = useState(0);
  const [comentario, setComentario] = useState('');

  const renderStars = (rating: number, interactive: boolean = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => interactive && setNota(star)}
            disabled={!interactive}
            className={`${interactive ? 'cursor-pointer' : 'cursor-default'}`}
          >
            <Star
              className={`w-5 h-5 ${
                star <= rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border-l-4 border-blue-900 p-4 rounded-r-lg shadow-sm">
        <h1 className="text-blue-900">Avaliações e Feedback</h1>
        <p className="text-muted-foreground">
          Avalie oportunidades e veja o feedback recebido (RF72)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Avaliações Recebidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{avaliacoesRecebidas.length}</div>
            <p className="text-xs text-muted-foreground">de docentes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Média Geral</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl">4.5</div>
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            </div>
            <p className="text-xs text-muted-foreground">de 5 estrelas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">2</div>
            <p className="text-xs text-muted-foreground">para avaliar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Destaques</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">3</div>
            <p className="text-xs text-muted-foreground">elogios recebidos</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="avaliar">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="avaliar">
            <MessageSquare className="w-4 h-4 mr-2" />
            Avaliar Oportunidades
          </TabsTrigger>
          <TabsTrigger value="recebidas">
            <Award className="w-4 h-4 mr-2" />
            Minhas Avaliações
          </TabsTrigger>
        </TabsList>

        {/* Avaliar Oportunidades */}
        <TabsContent value="avaliar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Oportunidades Concluídas</CardTitle>
              <CardDescription>
                Avalie as oportunidades que você participou
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { nome: 'Extensão em Comunidades Rurais', concluida: '15/11/2024', avaliada: false },
                { nome: 'Workshop de Inovação Social', concluida: '10/11/2024', avaliada: false },
                { nome: 'Oficinas de Programação', concluida: '05/10/2024', avaliada: true },
              ].map((oportunidade, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{oportunidade.nome}</h4>
                      <p className="text-sm text-muted-foreground">
                        Concluída em {oportunidade.concluida}
                      </p>
                    </div>
                    {oportunidade.avaliada && (
                      <Badge className="bg-green-600">Avaliada</Badge>
                    )}
                  </div>

                  {!oportunidade.avaliada && (
                    <div className="space-y-3 pt-3 border-t">
                      <div className="space-y-2">
                        <Label>Nota Geral</Label>
                        {renderStars(nota, true)}
                      </div>

                      <div className="space-y-2">
                        <Label>Comentários (opcional)</Label>
                        <Textarea
                          placeholder="Compartilhe sua experiência, pontos positivos e sugestões de melhoria..."
                          value={comentario}
                          onChange={(e) => setComentario(e.target.value)}
                          rows={4}
                        />
                      </div>

                      <div className="space-y-3">
                        <Label>Aspectos da Oportunidade</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {[
                            { label: 'Organização', value: 0 },
                            { label: 'Aprendizado', value: 0 },
                            { label: 'Impacto Social', value: 0 },
                            { label: 'Orientação Docente', value: 0 },
                          ].map((aspecto) => (
                            <div key={aspecto.label} className="space-y-1">
                              <p className="text-sm">{aspecto.label}</p>
                              {renderStars(aspecto.value, true)}
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full">
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        Enviar Avaliação
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Avaliações Recebidas */}
        <TabsContent value="recebidas" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Feedback dos Docentes</CardTitle>
              <CardDescription>
                Veja as avaliações que você recebeu
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {avaliacoesRecebidas.map((avaliacao) => (
                <div
                  key={avaliacao.id}
                  className="border rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{avaliacao.oportunidade}</h4>
                      <p className="text-sm text-muted-foreground">
                        Avaliado por {avaliacao.avaliador}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {renderStars(avaliacao.nota)}
                      <span className="font-medium">{avaliacao.nota}.0</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-900">{avaliacao.comentario}</p>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    {avaliacao.data}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Estatísticas */}
          <Card>
            <CardHeader>
              <CardTitle>Estatísticas de Desempenho</CardTitle>
              <CardDescription>
                Seu histórico de avaliações
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { aspecto: 'Participação', nota: 5, total: 5 },
                  { aspecto: 'Comprometimento', nota: 4.5, total: 5 },
                  { aspecto: 'Trabalho em Equipe', nota: 5, total: 5 },
                  { aspecto: 'Iniciativa', nota: 4, total: 5 },
                  { aspecto: 'Pontualidade', nota: 5, total: 5 },
                ].map((stat, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>{stat.aspecto}</span>
                      <span className="font-medium">{stat.nota}/{stat.total}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-blue-900 h-2 rounded-full"
                        style={{ width: `${(stat.nota / stat.total) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
