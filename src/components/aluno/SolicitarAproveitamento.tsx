import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Upload, FileText, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';

export function SolicitarAproveitamento() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [cargaHoraria, setCargaHoraria] = useState('');
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => {
      setTitulo('');
      setDescricao('');
      setCargaHoraria('');
      setArquivo(null);
      setEnviado(false);
    }, 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1>Solicitar Aproveitamento de Horas</h1>
        <p className="text-muted-foreground">
          Envie certificados de atividades externas para validação
        </p>
      </div>

      {enviado && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Solicitação enviada com sucesso! Você será notificado quando houver uma resposta.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Informações da Atividade</CardTitle>
          <CardDescription>
            Preencha os dados da atividade que deseja ter as horas aproveitadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="titulo">Título da Atividade</Label>
              <Input
                id="titulo"
                placeholder="Ex: Workshop de Inovação Social"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea
                id="descricao"
                placeholder="Descreva a atividade realizada, objetivos, aprendizados..."
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                rows={5}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ch">Carga Horária Solicitada</Label>
              <Input
                id="ch"
                type="number"
                placeholder="Ex: 20"
                value={cargaHoraria}
                onChange={(e) => setCargaHoraria(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Informe a carga horária conforme consta no certificado
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="certificado">Certificado (PDF)</Label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-slate-50 transition-colors">
                <input
                  type="file"
                  id="certificado"
                  accept=".pdf"
                  onChange={(e) => setArquivo(e.target.files?.[0] || null)}
                  className="hidden"
                  required
                />
                <label htmlFor="certificado" className="cursor-pointer">
                  {arquivo ? (
                    <div className="flex items-center justify-center gap-2">
                      <FileText className="h-8 w-8 text-green-600" />
                      <div>
                        <p>{arquivo.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Clique para alterar
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="mt-2">
                        Clique para fazer upload do certificado
                      </p>
                      <p className="text-sm text-muted-foreground">
                        PDF assinado digitalmente (máx. 5MB)
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <Alert>
              <AlertDescription>
                <strong>Importante:</strong> O certificado deve estar assinado digitalmente e
                conter informações claras sobre a carga horária. A análise será realizada em até
                10 dias úteis.
              </AlertDescription>
            </Alert>

            <Button type="submit" className="w-full" size="lg">
              Enviar Solicitação
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
