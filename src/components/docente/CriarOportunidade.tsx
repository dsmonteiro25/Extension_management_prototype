import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { Upload, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';

export function CriarOportunidade() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [cargaHoraria, setCargaHoraria] = useState('');
  const [periodoInicio, setPeriodoInicio] = useState('');
  const [periodoFim, setPeriodoFim] = useState('');
  const [gerenciadaSistema, setGerenciadaSistema] = useState(true);
  const [criado, setCriado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCriado(true);
    setTimeout(() => {
      setCriado(false);
      setTitulo('');
      setDescricao('');
      setCargaHoraria('');
      setPeriodoInicio('');
      setPeriodoFim('');
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1>Criar Nova Oportunidade</h1>
        <p className="text-muted-foreground">
          Configure um novo projeto ou ação de extensão universitária
        </p>
      </div>

      {criado && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Oportunidade criada com sucesso! Os alunos já podem se inscrever.
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
            <CardDescription>Dados gerais da oportunidade</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="titulo">Título da Oportunidade</Label>
              <Input
                id="titulo"
                placeholder="Ex: Projeto de Extensão em Comunidades Rurais"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea
                id="descricao"
                placeholder="Descreva os objetivos, metodologia e resultados esperados..."
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                rows={6}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ch">Carga Horária (horas)</Label>
                <Input
                  id="ch"
                  type="number"
                  placeholder="Ex: 40"
                  value={cargaHoraria}
                  onChange={(e) => setCargaHoraria(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="inicio">Início</Label>
                <Input
                  id="inicio"
                  type="date"
                  value={periodoInicio}
                  onChange={(e) => setPeriodoInicio(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fim">Término</Label>
                <Input
                  id="fim"
                  type="date"
                  value={periodoFim}
                  onChange={(e) => setPeriodoFim(e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configurações</CardTitle>
            <CardDescription>Opções de gerenciamento da oportunidade</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="gerenciada"
                checked={gerenciadaSistema}
                onCheckedChange={(checked) => setGerenciadaSistema(checked as boolean)}
              />
              <div className="space-y-1">
                <Label htmlFor="gerenciada" className="cursor-pointer">
                  Gerenciada pelo sistema
                </Label>
                <p className="text-sm text-muted-foreground">
                  Permite registro de frequência, atividades e emissão automática de
                  certificados
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Participantes</CardTitle>
            <CardDescription>Selecione os alunos que participarão</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="vagas">Número de Vagas</Label>
              <Input id="vagas" type="number" placeholder="Ex: 10" />
            </div>

            <div className="space-y-2">
              <Label>Alunos Selecionados (opcional)</Label>
              <p className="text-sm text-muted-foreground mb-2">
                Deixe em branco para permitir inscrições abertas
              </p>
              <Button type="button" variant="outline" className="w-full">
                Selecionar Alunos
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Plano de Atividades</CardTitle>
            <CardDescription>
              Faça upload do plano detalhado da oportunidade
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-slate-50 transition-colors">
              <input type="file" id="plano" accept=".pdf" className="hidden" />
              <label htmlFor="plano" className="cursor-pointer">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                <p className="mt-2">Clique para fazer upload do plano</p>
                <p className="text-sm text-muted-foreground">PDF (máx. 10MB)</p>
              </label>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" size="lg" className="flex-1">
            Criar Oportunidade
          </Button>
          <Button type="button" variant="outline" size="lg">
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
