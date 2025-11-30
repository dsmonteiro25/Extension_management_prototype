import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { Search, Download, FileText, HelpCircle, Book } from 'lucide-react';

const faqItems = [
  {
    categoria: 'Geral',
    perguntas: [
      {
        pergunta: 'O que é o SIGEX-UFMA?',
        resposta: 'O SIGEX é o Sistema Integrado de Gestão de Extensão da UFMA, criado para facilitar o gerenciamento de atividades de extensão universitária, incluindo cadastro de oportunidades, aproveitamento de horas e emissão de certificados.',
      },
      {
        pergunta: 'Como faço para acessar o sistema?',
        resposta: 'Use sua matrícula ou email institucional (@discente.ufma.br, @ufma.br). Um código de verificação será enviado para seu email. Digite o código para fazer login.',
      },
    ],
  },
  {
    categoria: 'Solicitações',
    perguntas: [
      {
        pergunta: 'Como solicitar aproveitamento de horas?',
        resposta: 'Acesse "Solicitar Aproveitamento" no menu, preencha o formulário com título, descrição e carga horária, e anexe o certificado em PDF assinado digitalmente. A análise leva até 10 dias úteis.',
      },
      {
        pergunta: 'Minha solicitação foi rejeitada. O que fazer?',
        resposta: 'Leia atentamente o parecer fornecido pelo avaliador. Você pode reenviar a solicitação após corrigir os problemas apontados (exemplo: obter certificado com assinatura digital válida).',
      },
      {
        pergunta: 'Qual o prazo para análise de solicitações?',
        resposta: 'A coordenação tem prazo de 10 dias úteis para analisar cada solicitação. Você pode acompanhar o status em "Minhas Solicitações".',
      },
    ],
  },
  {
    categoria: 'Oportunidades',
    perguntas: [
      {
        pergunta: 'Como me inscrever em uma oportunidade?',
        resposta: 'No dashboard, visualize as oportunidades disponíveis e clique em "Inscrever-se". Verifique se você atende aos pré-requisitos antes de se candidatar.',
      },
      {
        pergunta: 'Posso cancelar minha inscrição?',
        resposta: 'Sim, você pode cancelar sua inscrição em oportunidades antes do início das atividades. Após o início, consulte o docente responsável.',
      },
      {
        pergunta: 'O que é lista de espera?',
        resposta: 'Se uma oportunidade estiver com vagas esgotadas, você pode entrar na lista de espera. Caso alguém desista, você será notificado automaticamente.',
      },
    ],
  },
  {
    categoria: 'Certificados',
    perguntas: [
      {
        pergunta: 'Como obter meu certificado?',
        resposta: 'Certificados são emitidos automaticamente pelo docente responsável após a conclusão da oportunidade e registro de frequência mínima de 75%. Você pode baixar em "Minhas Participações".',
      },
      {
        pergunta: 'O certificado tem validade legal?',
        resposta: 'Sim, todos os certificados são assinados digitalmente pela UFMA e possuem código de autenticidade verificável.',
      },
    ],
  },
  {
    categoria: 'Docentes',
    perguntas: [
      {
        pergunta: 'Como criar uma oportunidade?',
        resposta: 'Acesse "Criar Oportunidade", preencha título, descrição, carga horária e período. Configure se será gerenciada pelo sistema e faça upload do plano de atividades.',
      },
      {
        pergunta: 'Como avaliar solicitações de alunos?',
        resposta: 'Acesse "Análise de Solicitações" e visualize as pendentes. Você pode aprovar com um clique ou rejeitar fornecendo um parecer obrigatório.',
      },
    ],
  },
];

const documentos = [
  { nome: 'Manual do Discente', tipo: 'PDF', tamanho: '2.5 MB' },
  { nome: 'Manual do Docente', tipo: 'PDF', tamanho: '3.1 MB' },
  { nome: 'Regulamento de Extensão UFMA', tipo: 'PDF', tamanho: '1.8 MB' },
  { nome: 'Template de Certificado', tipo: 'DOCX', tamanho: '450 KB' },
  { nome: 'Formulário de Aproveitamento', tipo: 'PDF', tamanho: '320 KB' },
];

export function FAQ() {
  const [busca, setBusca] = useState('');

  const perguntasFiltradas = faqItems.map(cat => ({
    ...cat,
    perguntas: cat.perguntas.filter(
      p =>
        p.pergunta.toLowerCase().includes(busca.toLowerCase()) ||
        p.resposta.toLowerCase().includes(busca.toLowerCase())
    ),
  })).filter(cat => cat.perguntas.length > 0);

  return (
    <div className="space-y-6">
      <div className="bg-white border-l-4 border-blue-900 p-4 rounded-r-lg shadow-sm">
        <h1 className="text-blue-900">Central de Ajuda</h1>
        <p className="text-muted-foreground">
          Perguntas frequentes e documentação do sistema (RF44, RF45)
        </p>
      </div>

      {/* Busca */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Buscar na ajuda..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </CardContent>
      </Card>

      {/* Atalhos Rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="pt-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <HelpCircle className="h-6 w-6 text-blue-900" />
            </div>
            <h3 className="font-medium mb-1">Como Começar</h3>
            <p className="text-sm text-muted-foreground">
              Guia rápido para novos usuários
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="pt-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Book className="h-6 w-6 text-blue-900" />
            </div>
            <h3 className="font-medium mb-1">Tutoriais em Vídeo</h3>
            <p className="text-sm text-muted-foreground">
              Aprenda com vídeos passo a passo
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="pt-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText className="h-6 w-6 text-blue-900" />
            </div>
            <h3 className="font-medium mb-1">Documentação</h3>
            <p className="text-sm text-muted-foreground">
              Manuais e normas completas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle>Perguntas Frequentes</CardTitle>
          <CardDescription>
            {busca ? `${perguntasFiltradas.reduce((acc, cat) => acc + cat.perguntas.length, 0)} resultado(s) encontrado(s)` : 'Encontre respostas para as dúvidas mais comuns'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {perguntasFiltradas.map((categoria, catIndex) => (
            <div key={catIndex} className="mb-6 last:mb-0">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline">{categoria.categoria}</Badge>
                <span className="text-sm text-muted-foreground">
                  {categoria.perguntas.length} pergunta(s)
                </span>
              </div>

              <Accordion type="single" collapsible className="space-y-2">
                {categoria.perguntas.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`${catIndex}-${index}`}
                    className="border rounded-lg px-4"
                  >
                    <AccordionTrigger className="hover:no-underline">
                      {item.pergunta}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.resposta}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}

          {perguntasFiltradas.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>Nenhum resultado encontrado para "{busca}"</p>
              <p className="text-sm mt-1">Tente usar outros termos de busca</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Documentos */}
      <Card>
        <CardHeader>
          <CardTitle>Documentos e Formulários</CardTitle>
          <CardDescription>
            Baixe manuais, normas e templates oficiais
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {documentos.map((doc, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-900" />
                  </div>
                  <div>
                    <p className="font-medium">{doc.nome}</p>
                    <p className="text-sm text-muted-foreground">
                      {doc.tipo} • {doc.tamanho}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Baixar
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Suporte */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-900">Não encontrou o que procura?</CardTitle>
          <CardDescription>
            Entre em contato com o suporte técnico
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-2">
            <span className="font-medium min-w-[80px]">Email:</span>
            <span className="text-muted-foreground">sigex.suporte@ufma.br</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-medium min-w-[80px]">Telefone:</span>
            <span className="text-muted-foreground">(98) 3272-8000</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-medium min-w-[80px]">Horário:</span>
            <span className="text-muted-foreground">Segunda a Sexta, 8h às 18h</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
