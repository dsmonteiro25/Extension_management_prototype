import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Alert, AlertDescription } from '../ui/alert';
import { Badge } from '../ui/badge';
import { AlertCircle, CheckCircle, Shield, Send } from 'lucide-react';

type Denuncia = {
  id: string;
  tipo: string;
  status: 'aberta' | 'em_analise' | 'resolvida';
  data: string;
  anonima: boolean;
};

const minhasDenuncias: Denuncia[] = [
  {
    id: '#OUV-2024-001',
    tipo: 'Problema com oportunidade',
    status: 'em_analise',
    data: '25/11/2024',
    anonima: false,
  },
  {
    id: '#OUV-2024-002',
    tipo: 'Sugestão de melhoria',
    status: 'resolvida',
    data: '10/11/2024',
    anonima: true,
  },
];

export function Ouvidoria() {
  const [tipo, setTipo] = useState('denuncia');
  const [descricao, setDescricao] = useState('');
  const [anonimo, setAnonimo] = useState(false);
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleEnviar = () => {
    if (tipo && descricao) {
      setEnviado(true);
      setTimeout(() => {
        setEnviado(false);
        setTipo('denuncia');
        setDescricao('');
        setEmail('');
      }, 3000);
    }
  };

  const getStatusBadge = (status: Denuncia['status']) => {
    const variants = {
      aberta: { variant: 'secondary' as const, label: 'Aberta' },
      em_analise: { variant: 'default' as const, label: 'Em Análise' },
      resolvida: { variant: 'default' as const, label: 'Resolvida', className: 'bg-green-600' },
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
      <div className="bg-white border-l-4 border-blue-900 p-4 rounded-r-lg shadow-sm">
        <h1 className="text-blue-900">Ouvidoria e Denúncias</h1>
        <p className="text-muted-foreground">
          Canal seguro para reportar problemas e sugestões (RF69)
        </p>
      </div>

      {enviado && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Sua mensagem foi enviada com sucesso! Você receberá um protocolo por email.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Minhas Solicitações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{minhasDenuncias.length}</div>
            <p className="text-xs text-muted-foreground">registros</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Em Análise</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">
              {minhasDenuncias.filter(d => d.status === 'em_analise').length}
            </div>
            <p className="text-xs text-muted-foreground">aguardando resposta</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Resolvidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">
              {minhasDenuncias.filter(d => d.status === 'resolvida').length}
            </div>
            <p className="text-xs text-muted-foreground">concluídas</p>
          </CardContent>
        </Card>
      </div>

      {/* Formulário de Nova Denúncia */}
      <Card>
        <CardHeader>
          <CardTitle>Nova Solicitação</CardTitle>
          <CardDescription>
            Relate problemas, denúncias ou envie sugestões de forma segura
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert className="border-blue-200 bg-blue-50">
            <Shield className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Confidencialidade garantida:</strong> Todas as informações são tratadas
              com sigilo. Denúncias anônimas são igualmente investigadas.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="tipo">Tipo de Solicitação</Label>
            <Select value={tipo} onValueChange={setTipo}>
              <SelectTrigger id="tipo">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="denuncia">Denúncia</SelectItem>
                <SelectItem value="reclamacao">Reclamação</SelectItem>
                <SelectItem value="sugestao">Sugestão de Melhoria</SelectItem>
                <SelectItem value="elogio">Elogio</SelectItem>
                <SelectItem value="duvida">Dúvida/Informação</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição Detalhada</Label>
            <Textarea
              id="descricao"
              placeholder="Descreva sua solicitação de forma clara e objetiva. Inclua detalhes como datas, nomes e situações específicas..."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows={6}
            />
            <p className="text-xs text-muted-foreground">
              Quanto mais detalhes você fornecer, mais rápida será a análise
            </p>
          </div>

          <div className="flex items-start space-x-3 p-4 border rounded-lg bg-slate-50">
            <Checkbox
              id="anonimo"
              checked={anonimo}
              onCheckedChange={(checked) => setAnonimo(checked as boolean)}
            />
            <div className="space-y-1">
              <Label htmlFor="anonimo" className="cursor-pointer font-medium">
                Enviar de forma anônima
              </Label>
              <p className="text-sm text-muted-foreground">
                Sua identidade não será revelada em nenhuma hipótese. Você poderá acompanhar
                o andamento através do número de protocolo.
              </p>
            </div>
          </div>

          {!anonimo && (
            <div className="space-y-2">
              <Label htmlFor="email">Email para Contato</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu.email@discente.ufma.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Você receberá atualizações sobre sua solicitação neste email
              </p>
            </div>
          )}

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm">
            <p className="font-medium text-amber-900 mb-1">⚠️ Aviso Importante</p>
            <p className="text-amber-800">
              Denúncias falsas ou caluniosas podem resultar em medidas disciplinares.
              Use este canal de forma responsável e ética.
            </p>
          </div>

          <Button
            onClick={handleEnviar}
            disabled={!tipo || !descricao}
            size="lg"
            className="w-full"
          >
            <Send className="w-4 h-4 mr-2" />
            Enviar Solicitação
          </Button>
        </CardContent>
      </Card>

      {/* Histórico */}
      <Card>
        <CardHeader>
          <CardTitle>Minhas Solicitações</CardTitle>
          <CardDescription>
            Acompanhe o status das suas solicitações anteriores
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {minhasDenuncias.length > 0 ? (
            minhasDenuncias.map((denuncia) => (
              <div
                key={denuncia.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{denuncia.id}</span>
                    {denuncia.anonima && (
                      <Badge variant="outline" className="text-xs">
                        Anônima
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{denuncia.tipo}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Enviado em {denuncia.data}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(denuncia.status)}
                  <Button variant="outline" size="sm">
                    Ver Detalhes
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <AlertCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>Você ainda não fez nenhuma solicitação</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}