import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Upload, Download, CheckCircle, AlertCircle, FileSpreadsheet } from 'lucide-react';

type ImportStatus = 'idle' | 'uploading' | 'processing' | 'complete' | 'error';

export function ImportarUsuarios() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<ImportStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [resultado, setResultado] = useState<{
    total: number;
    sucesso: number;
    erros: number;
    detalhes: string[];
  } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatus('idle');
      setResultado(null);
    }
  };

  const handleImport = () => {
    if (!file) return;

    setStatus('uploading');
    setProgress(0);

    // Simular upload
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatus('processing');
          
          // Simular processamento
          setTimeout(() => {
            setStatus('complete');
            setResultado({
              total: 150,
              sucesso: 145,
              erros: 5,
              detalhes: [
                'Linha 23: Email já cadastrado - aluno123@discente.ufma.br',
                'Linha 45: Matrícula inválida - formato incorreto',
                'Linha 67: Campo obrigatório ausente - nome',
                'Linha 89: CPF já existe no sistema',
                'Linha 120: Curso não encontrado - código inválido',
              ],
            });
          }, 2000);
          
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const downloadTemplate = () => {
    // Simular download do template
    alert('Download do template CSV iniciado!');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border-l-4 border-blue-900 p-4 rounded-r-lg shadow-sm">
        <h1 className="text-blue-900">Importação de Usuários</h1>
        <p className="text-muted-foreground">
          Importe usuários em lote via arquivo CSV ou Excel (RF04)
        </p>
      </div>

      {/* Instruções */}
      <Card>
        <CardHeader>
          <CardTitle>Instruções de Importação</CardTitle>
          <CardDescription>
            Siga os passos abaixo para importar usuários com sucesso
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-900 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">
                1
              </div>
              <div>
                <p className="font-medium">Baixe o template</p>
                <p className="text-sm text-muted-foreground">
                  Use o modelo oficial para garantir a compatibilidade
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-900 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">
                2
              </div>
              <div>
                <p className="font-medium">Preencha os dados</p>
                <p className="text-sm text-muted-foreground">
                  Campos obrigatórios: Nome, Email, Matrícula, CPF, Perfil, Curso
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-900 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">
                3
              </div>
              <div>
                <p className="font-medium">Faça upload do arquivo</p>
                <p className="text-sm text-muted-foreground">
                  Formatos aceitos: .csv, .xlsx, .xls (máximo 1000 registros)
                </p>
              </div>
            </div>
          </div>

          <Button variant="outline" onClick={downloadTemplate}>
            <Download className="w-4 h-4 mr-2" />
            Baixar Template CSV
          </Button>
        </CardContent>
      </Card>

      {/* Upload de Arquivo */}
      <Card>
        <CardHeader>
          <CardTitle>Upload de Arquivo</CardTitle>
          <CardDescription>
            Selecione o arquivo com os dados dos usuários
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-slate-50 transition-colors">
            <input
              type="file"
              id="import-file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileChange}
              className="hidden"
              disabled={status === 'uploading' || status === 'processing'}
            />
            <label htmlFor="import-file" className="cursor-pointer">
              {file ? (
                <div className="flex flex-col items-center gap-2">
                  <FileSpreadsheet className="h-12 w-12 text-green-600" />
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                  {status === 'idle' && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Clique para alterar o arquivo
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="mt-2 font-medium">
                    Clique para selecionar o arquivo
                  </p>
                  <p className="text-sm text-muted-foreground">
                    CSV, XLSX ou XLS (máx. 5MB)
                  </p>
                </div>
              )}
            </label>
          </div>

          {status === 'uploading' || status === 'processing' ? (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>
                  {status === 'uploading' ? 'Enviando arquivo...' : 'Processando dados...'}
                </span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
          ) : null}

          {file && status === 'idle' && (
            <Button onClick={handleImport} className="w-full" size="lg">
              <Upload className="w-4 h-4 mr-2" />
              Iniciar Importação
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Resultado da Importação */}
      {resultado && status === 'complete' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Importação Concluída
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-medium text-blue-900">{resultado.total}</p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground">Importados</p>
                <p className="text-2xl font-medium text-green-900">{resultado.sucesso}</p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground">Erros</p>
                <p className="text-2xl font-medium text-red-900">{resultado.erros}</p>
              </div>
            </div>

            {resultado.erros > 0 && (
              <Alert className="border-amber-200 bg-amber-50">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <AlertDescription className="text-amber-800">
                  <p className="font-medium mb-2">
                    {resultado.erros} registro(s) não foram importados:
                  </p>
                  <ul className="space-y-1 text-sm">
                    {resultado.detalhes.map((detalhe, index) => (
                      <li key={index}>• {detalhe}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Baixar Relatório Completo
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setFile(null);
                  setStatus('idle');
                  setResultado(null);
                }}
              >
                Nova Importação
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Histórico Recente */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Importações</CardTitle>
          <CardDescription>Últimas importações realizadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { data: '29/11/2024 15:30', usuario: 'Admin Sistema', total: 200, sucesso: 198, erros: 2 },
              { data: '25/11/2024 10:15', usuario: 'Coord. João Santos', total: 85, sucesso: 85, erros: 0 },
              { data: '20/11/2024 14:20', usuario: 'Admin Sistema', total: 150, sucesso: 145, erros: 5 },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{item.data}</p>
                  <p className="text-sm text-muted-foreground">Por {item.usuario}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right text-sm">
                    <p>
                      <span className="text-green-600 font-medium">{item.sucesso}</span> /{' '}
                      {item.total}
                    </p>
                    {item.erros > 0 && (
                      <p className="text-red-600">{item.erros} erros</p>
                    )}
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
