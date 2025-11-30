import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Send, MessageCircle, Pin, Paperclip } from 'lucide-react';

type Message = {
  id: number;
  autor: string;
  perfil: 'Docente' | 'Discente' | 'Coordenação';
  mensagem: string;
  timestamp: string;
  fixada?: boolean;
};

const mensagensIniciais: Message[] = [
  {
    id: 1,
    autor: 'Prof. Ana Costa',
    perfil: 'Docente',
    mensagem: 'Atenção! Nossa próxima reunião será dia 05/12 às 14h no Laboratório 3.',
    timestamp: '29/11/2024 10:30',
    fixada: true,
  },
  {
    id: 2,
    autor: 'Maria Silva',
    perfil: 'Discente',
    mensagem: 'Bom dia! Onde posso encontrar o material da última oficina?',
    timestamp: '29/11/2024 11:15',
  },
  {
    id: 3,
    autor: 'Prof. Ana Costa',
    perfil: 'Docente',
    mensagem: 'Maria, o material está disponível na área de documentos da oportunidade.',
    timestamp: '29/11/2024 11:20',
  },
  {
    id: 4,
    autor: 'João Santos',
    perfil: 'Discente',
    mensagem: 'Pessoal, consegui contato com a comunidade. Eles toparam receber nossa visita!',
    timestamp: '30/11/2024 09:45',
  },
];

export function ComunicacaoInterna() {
  const [mensagens, setMensagens] = useState<Message[]>(mensagensIniciais);
  const [novaMensagem, setNovaMensagem] = useState('');

  const handleEnviar = () => {
    if (novaMensagem.trim()) {
      const nova: Message = {
        id: mensagens.length + 1,
        autor: 'Pedro Almeida',
        perfil: 'Discente',
        mensagem: novaMensagem,
        timestamp: new Date().toLocaleString('pt-BR'),
      };
      setMensagens([...mensagens, nova]);
      setNovaMensagem('');
    }
  };

  const mensagensFixadas = mensagens.filter(m => m.fixada);
  const mensagensNormais = mensagens.filter(m => !m.fixada);

  return (
    <div className="space-y-6">
      <div className="bg-white border-l-4 border-blue-900 p-4 rounded-r-lg shadow-sm">
        <h1 className="text-blue-900">Comunicação Interna</h1>
        <p className="text-muted-foreground">
          Projeto: Extensão em Comunidades Rurais (RF71)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Mensagens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{mensagens.length}</div>
            <p className="text-xs text-muted-foreground">total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Fixadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{mensagensFixadas.length}</div>
            <p className="text-xs text-muted-foreground">avisos importantes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Participantes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">8</div>
            <p className="text-xs text-muted-foreground">ativos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Última Atividade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm">Hoje</div>
            <p className="text-xs text-muted-foreground">às 09:45</p>
          </CardContent>
        </Card>
      </div>

      {/* Mensagens Fixadas */}
      {mensagensFixadas.length > 0 && (
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-900">
              <Pin className="h-5 w-5" />
              Avisos Fixados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mensagensFixadas.map((mensagem) => (
              <div
                key={mensagem.id}
                className="flex gap-3 p-3 bg-white border border-amber-200 rounded-lg"
              >
                <Avatar>
                  <AvatarFallback className="bg-amber-600 text-white">
                    {mensagem.autor.split(' ').map((n) => n[0]).join('').substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{mensagem.autor}</span>
                    <Badge variant="outline" className="text-xs">{mensagem.perfil}</Badge>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {mensagem.timestamp}
                    </span>
                  </div>
                  <p className="text-sm">{mensagem.mensagem}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Chat */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Histórico de Mensagens
          </CardTitle>
          <CardDescription>
            Comunicação em tempo real com todos os participantes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4 max-h-96 overflow-y-auto p-4 border rounded-lg bg-slate-50">
            {mensagensNormais.map((mensagem) => (
              <div key={mensagem.id} className="flex gap-3">
                <Avatar>
                  <AvatarFallback className="bg-blue-900 text-white">
                    {mensagem.autor.split(' ').map((n) => n[0]).join('').substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{mensagem.autor}</span>
                    <Badge variant="secondary" className="text-xs">{mensagem.perfil}</Badge>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {mensagem.timestamp}
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border">
                    <p className="text-sm">{mensagem.mensagem}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Campo de Nova Mensagem */}
          <div className="space-y-3">
            <Textarea
              placeholder="Digite sua mensagem..."
              value={novaMensagem}
              onChange={(e) => setNovaMensagem(e.target.value)}
              rows={3}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleEnviar();
                }
              }}
            />
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Paperclip className="w-4 h-4 mr-2" />
                Anexar
              </Button>
              <Button onClick={handleEnviar} className="ml-auto">
                <Send className="w-4 h-4 mr-2" />
                Enviar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Participantes */}
      <Card>
        <CardHeader>
          <CardTitle>Participantes Ativos</CardTitle>
          <CardDescription>Membros do projeto</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { nome: 'Prof. Ana Costa', perfil: 'Docente', status: 'online' },
              { nome: 'Maria Silva', perfil: 'Discente', status: 'online' },
              { nome: 'João Santos', perfil: 'Discente', status: 'online' },
              { nome: 'Pedro Almeida', perfil: 'Discente', status: 'offline' },
              { nome: 'Ana Costa', perfil: 'Discente', status: 'online' },
              { nome: 'Julia Martins', perfil: 'Discente', status: 'offline' },
              { nome: 'Roberto Dias', perfil: 'Discente', status: 'online' },
              { nome: 'Fernanda Lima', perfil: 'Discente', status: 'offline' },
            ].map((participante, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 border rounded-lg hover:bg-slate-50"
              >
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-blue-900 text-white text-xs">
                      {participante.nome.split(' ').map((n) => n[0]).join('').substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                      participante.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{participante.nome}</p>
                  <p className="text-xs text-muted-foreground">{participante.perfil}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
