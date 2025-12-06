import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { Download, Filter, User, FileText, Calendar, Award } from 'lucide-react';

const horasPorAluno = [
  { aluno: 'Maria Silva', concluidas: 45, pendentes: 15 },
  { aluno: 'João Santos', concluidas: 60, pendentes: 0 },
  { aluno: 'Ana Costa', concluidas: 35, pendentes: 25 },
  { aluno: 'Pedro Almeida', concluidas: 50, pendentes: 10 },
  { aluno: 'Julia Martins', concluidas: 25, pendentes: 35 },
];

const statusGeral = [
  { name: 'Concluídas', value: 215, color: '#16a34a' },
  { name: 'Pendentes', value: 85, color: '#f59e0b' },
];

const oportunidadesPorDocente = [
  { docente: 'Prof. Ana Costa', oportunidades: 5 },
  { docente: 'Prof. Carlos Mendes', oportunidades: 4 },
  { docente: 'Profa. Julia Santos', oportunidades: 3 },
  { docente: 'Prof. Roberto Silva', oportunidades: 3 },
  { docente: 'Profa. Fernanda Lima', oportunidades: 3 },
];

const topAlunos = [
  { aluno: 'João Santos', horas: 60 },
  { aluno: 'Pedro Almeida', horas: 50 },
  { aluno: 'Maria Silva', horas: 45 },
  { aluno: 'Ana Costa', horas: 35 },
  { aluno: 'Julia Martins', horas: 25 },
];

// Dados dos alunos para relatórios individuais
const alunosDetalhados = [
  {
    id: '1',
    nome: 'Maria Silva',
    matricula: '2021001234',
    curso: 'Ciência da Computação',
    periodo: '6º período',
    email: 'maria.silva@aluno.ufma.br',
    horasConcluidas: 45,
    horasPendentes: 15,
    horasTotal: 60,
    taxaConclusao: 75,
    atividades: [
      { titulo: 'Projeto Inclusão Digital', tipo: 'Projeto', horas: 20, status: 'Concluída', data: '2024-06-15' },
      { titulo: 'Extensão Comunitária', tipo: 'Evento', horas: 15, status: 'Concluída', data: '2024-05-20' },
      { titulo: 'Workshop Tecnologia Social', tipo: 'Curso', horas: 10, status: 'Concluída', data: '2024-04-10' },
      { titulo: 'Hackathon Social', tipo: 'Evento', horas: 15, status: 'Em Andamento', data: '2024-12-01' },
    ],
    evolucaoMensal: [
      { mes: 'Jan', horas: 0 },
      { mes: 'Fev', horas: 0 },
      { mes: 'Mar', horas: 0 },
      { mes: 'Abr', horas: 10 },
      { mes: 'Mai', horas: 25 },
      { mes: 'Jun', horas: 45 },
    ],
  },
  {
    id: '2',
    nome: 'João Santos',
    matricula: '2021001235',
    curso: 'Engenharia Civil',
    periodo: '7º período',
    email: 'joao.santos@aluno.ufma.br',
    horasConcluidas: 60,
    horasPendentes: 0,
    horasTotal: 60,
    taxaConclusao: 100,
    atividades: [
      { titulo: 'Construção Sustentável', tipo: 'Projeto', horas: 30, status: 'Concluída', data: '2024-06-20' },
      { titulo: 'Curso de AutoCAD Social', tipo: 'Curso', horas: 20, status: 'Concluída', data: '2024-05-15' },
      { titulo: 'Consultoria Comunitária', tipo: 'Projeto', horas: 10, status: 'Concluída', data: '2024-04-05' },
    ],
    evolucaoMensal: [
      { mes: 'Jan', horas: 0 },
      { mes: 'Fev', horas: 0 },
      { mes: 'Mar', horas: 0 },
      { mes: 'Abr', horas: 10 },
      { mes: 'Mai', horas: 30 },
      { mes: 'Jun', horas: 60 },
    ],
  },
  {
    id: '3',
    nome: 'Ana Costa',
    matricula: '2021001236',
    curso: 'Direito',
    periodo: '5º período',
    email: 'ana.costa@aluno.ufma.br',
    horasConcluidas: 35,
    horasPendentes: 25,
    horasTotal: 60,
    taxaConclusao: 58,
    atividades: [
      { titulo: 'Advocacia Popular', tipo: 'Projeto', horas: 25, status: 'Concluída', data: '2024-06-10' },
      { titulo: 'Palestra Direitos Humanos', tipo: 'Evento', horas: 10, status: 'Concluída', data: '2024-05-05' },
      { titulo: 'Atendimento Jurídico', tipo: 'Projeto', horas: 25, status: 'Em Andamento', data: '2024-12-15' },
    ],
    evolucaoMensal: [
      { mes: 'Jan', horas: 0 },
      { mes: 'Fev', horas: 0 },
      { mes: 'Mar', horas: 0 },
      { mes: 'Abr', horas: 0 },
      { mes: 'Mai', horas: 10 },
      { mes: 'Jun', horas: 35 },
    ],
  },
  {
    id: '4',
    nome: 'Pedro Almeida',
    matricula: '2021001237',
    curso: 'Ciência da Computação',
    periodo: '6º período',
    email: 'pedro.almeida@aluno.ufma.br',
    horasConcluidas: 50,
    horasPendentes: 10,
    horasTotal: 60,
    taxaConclusao: 83,
    atividades: [
      { titulo: 'Programação para Jovens', tipo: 'Curso', horas: 25, status: 'Concluída', data: '2024-06-18' },
      { titulo: 'Robótica Educacional', tipo: 'Projeto', horas: 15, status: 'Concluída', data: '2024-05-25' },
      { titulo: 'Game Jam Social', tipo: 'Evento', horas: 10, status: 'Concluída', data: '2024-04-20' },
      { titulo: 'Mentoria Tech', tipo: 'Projeto', horas: 10, status: 'Em Andamento', data: '2024-12-10' },
    ],
    evolucaoMensal: [
      { mes: 'Jan', horas: 0 },
      { mes: 'Fev', horas: 0 },
      { mes: 'Mar', horas: 0 },
      { mes: 'Abr', horas: 10 },
      { mes: 'Mai', horas: 25 },
      { mes: 'Jun', horas: 50 },
    ],
  },
  {
    id: '5',
    nome: 'Julia Martins',
    matricula: '2021001238',
    curso: 'Engenharia Civil',
    periodo: '4º período',
    email: 'julia.martins@aluno.ufma.br',
    horasConcluidas: 25,
    horasPendentes: 35,
    horasTotal: 60,
    taxaConclusao: 42,
    atividades: [
      { titulo: 'Projeto Habitação Social', tipo: 'Projeto', horas: 15, status: 'Concluída', data: '2024-05-30' },
      { titulo: 'Workshop Infraestrutura', tipo: 'Evento', horas: 10, status: 'Concluída', data: '2024-04-25' },
      { titulo: 'Consultoria em Construção', tipo: 'Projeto', horas: 35, status: 'Em Andamento', data: '2024-12-20' },
    ],
    evolucaoMensal: [
      { mes: 'Jan', horas: 0 },
      { mes: 'Fev', horas: 0 },
      { mes: 'Mar', horas: 0 },
      { mes: 'Abr', horas: 10 },
      { mes: 'Mai', horas: 25 },
      { mes: 'Jun', horas: 25 },
    ],
  },
];

export function Relatorios() {
  const [semestre, setSemestre] = useState('2024.2');
  const [curso, setCurso] = useState('todos');
  const [alunoSelecionado, setAlunoSelecionado] = useState<string>('todos');
  
  // Filtros para o histórico de atividades
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [filtroPeriodo, setFiltroPeriodo] = useState('todos');
  const [filtroStatus, setFiltroStatus] = useState('todos');
  
  const alunoDetalhes = alunosDetalhados.find(a => a.id === alunoSelecionado);

  // Função para filtrar atividades
  const filtrarAtividades = (atividades: typeof alunosDetalhados[0]['atividades']) => {
    return atividades.filter((atividade) => {
      // Filtro por tipo
      if (filtroTipo !== 'todos' && atividade.tipo !== filtroTipo) {
        return false;
      }
      
      // Filtro por status
      if (filtroStatus !== 'todos' && atividade.status !== filtroStatus) {
        return false;
      }
      
      // Filtro por período
      if (filtroPeriodo !== 'todos') {
        const dataAtividade = new Date(atividade.data);
        const mesAtividade = dataAtividade.getMonth();
        const anoAtividade = dataAtividade.getFullYear();
        
        switch (filtroPeriodo) {
          case 'mes_atual':
            const hoje = new Date();
            if (mesAtividade !== hoje.getMonth() || anoAtividade !== hoje.getFullYear()) {
              return false;
            }
            break;
          case 'ultimo_trimestre':
            const tresMesesAtras = new Date();
            tresMesesAtras.setMonth(tresMesesAtras.getMonth() - 3);
            if (dataAtividade < tresMesesAtras) {
              return false;
            }
            break;
          case 'semestre_atual':
            const seisMesesAtras = new Date();
            seisMesesAtras.setMonth(seisMesesAtras.getMonth() - 6);
            if (dataAtividade < seisMesesAtras) {
              return false;
            }
            break;
        }
      }
      
      return true;
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Relatórios e Estatísticas</h1>
        <p className="text-muted-foreground">
          Visualize e exporte dados sobre as atividades de extensão
        </p>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Semestre</Label>
              <Select value={semestre} onValueChange={setSemestre}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024.2">2024.2</SelectItem>
                  <SelectItem value="2024.1">2024.1</SelectItem>
                  <SelectItem value="2023.2">2023.2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Curso</Label>
              <Select value={curso} onValueChange={setCurso}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Cursos</SelectItem>
                  <SelectItem value="ciencia">Ciência da Computação</SelectItem>
                  <SelectItem value="engenharia">Engenharia</SelectItem>
                  <SelectItem value="direito">Direito</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Aluno (Relatório Individual)</Label>
              <Select value={alunoSelecionado} onValueChange={setAlunoSelecionado}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os alunos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os alunos</SelectItem>
                  {alunosDetalhados.map((aluno) => (
                    <SelectItem key={aluno.id} value={aluno.id}>
                      {aluno.nome} - {aluno.matricula}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Button className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              {alunoSelecionado !== 'todos' ? 'Exportar Relatório Individual' : 'Exportar Relatório Geral'}
            </Button>
            {alunoSelecionado !== 'todos' && (
              <Button variant="outline" onClick={() => setAlunoSelecionado('todos')}>
                Limpar Seleção
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Cards de Resumo */}
      {alunoSelecionado === 'todos' ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Total de Horas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">300h</div>
                <p className="text-xs text-muted-foreground">registradas no semestre</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Alunos Ativos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">52</div>
                <p className="text-xs text-muted-foreground">participando de extensão</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Oportunidades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">18</div>
                <p className="text-xs text-muted-foreground">projetos ativos</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Taxa de Aprovação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">85%</div>
                <p className="text-xs text-muted-foreground">das solicitações</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Horas Concluídas vs Pendentes */}
            <Card>
              <CardHeader>
                <CardTitle>Horas por Aluno</CardTitle>
                <CardDescription>Concluídas vs Pendentes</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={horasPorAluno}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="aluno" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="concluidas" fill="#16a34a" name="Concluídas" />
                    <Bar dataKey="pendentes" fill="#f59e0b" name="Pendentes" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Status Geral */}
            <Card>
              <CardHeader>
                <CardTitle>Status Geral de Horas</CardTitle>
                <CardDescription>Distribuição total</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusGeral}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}h`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusGeral.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Oportunidades por Docente */}
            <Card>
              <CardHeader>
                <CardTitle>Oportunidades por Docente</CardTitle>
                <CardDescription>Projetos coordenados</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={oportunidadesPorDocente} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="docente" type="category" width={120} />
                    <Tooltip />
                    <Bar dataKey="oportunidades" fill="#3b82f6" name="Oportunidades" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Top Alunos */}
            <Card>
              <CardHeader>
                <CardTitle>Top Alunos por CH Concluída</CardTitle>
                <CardDescription>Ranking do semestre</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topAlunos.map((aluno, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-medium">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{aluno.aluno}</p>
                        <div className="w-full bg-slate-200 rounded-full h-2 mt-1">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(aluno.horas / 60) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{aluno.horas}h</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        alunoDetalhes && (
          <>
            {/* Cabeçalho do Relatório Individual */}
            <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white">
                      <User className="w-8 h-8" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{alunoDetalhes.nome}</CardTitle>
                      <CardDescription className="text-base mt-1">
                        Matrícula: {alunoDetalhes.matricula} | {alunoDetalhes.curso}
                      </CardDescription>
                      <p className="text-sm text-muted-foreground mt-1">
                        {alunoDetalhes.periodo} | {alunoDetalhes.email}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    className={
                      alunoDetalhes.taxaConclusao === 100 
                        ? 'bg-green-100 text-green-800 border-green-300' 
                        : alunoDetalhes.taxaConclusao >= 60 
                        ? 'bg-blue-100 text-blue-800 border-blue-300'
                        : 'bg-amber-100 text-amber-800 border-amber-300'
                    }
                  >
                    {alunoDetalhes.taxaConclusao}% Concluído
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            {/* Cards de Resumo Individual */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border-green-200 bg-green-50/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Award className="w-4 h-4 text-green-600" />
                    Horas Concluídas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl text-green-700">{alunoDetalhes.horasConcluidas}h</div>
                  <p className="text-xs text-muted-foreground">de {alunoDetalhes.horasTotal}h obrigatórias</p>
                </CardContent>
              </Card>

              <Card className="border-amber-200 bg-amber-50/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-600" />
                    Horas Pendentes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl text-amber-700">{alunoDetalhes.horasPendentes}h</div>
                  <p className="text-xs text-muted-foreground">faltam para completar</p>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-blue-50/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    Atividades
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl text-blue-700">{alunoDetalhes.atividades.length}</div>
                  <p className="text-xs text-muted-foreground">participações registradas</p>
                </CardContent>
              </Card>

              <Card className="border-indigo-200 bg-indigo-50/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <BarChart className="w-4 h-4 text-indigo-600" />
                    Taxa de Conclusão
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl text-indigo-700">{alunoDetalhes.taxaConclusao}%</div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all"
                      style={{ width: `${alunoDetalhes.taxaConclusao}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Gráficos do Aluno */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Evolução Mensal */}
              <Card>
                <CardHeader>
                  <CardTitle>Evolução de Horas</CardTitle>
                  <CardDescription>Acumulado por mês</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={alunoDetalhes.evolucaoMensal}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mes" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="horas" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        name="Horas Acumuladas"
                        dot={{ fill: '#3b82f6', r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Status das Atividades */}
              <Card>
                <CardHeader>
                  <CardTitle>Status das Atividades</CardTitle>
                  <CardDescription>Distribuição de horas</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Concluídas', value: alunoDetalhes.horasConcluidas, color: '#16a34a' },
                          { name: 'Pendentes', value: alunoDetalhes.horasPendentes, color: '#f59e0b' },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}h`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        <Cell fill="#16a34a" />
                        <Cell fill="#f59e0b" />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Histórico de Atividades */}
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Atividades</CardTitle>
                <CardDescription>Todas as participações em atividades de extensão</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Filtros Avançados */}
                <div className="mb-6 p-4 bg-slate-50 rounded-lg border">
                  <div className="flex items-center gap-2 mb-3">
                    <Filter className="w-4 h-4 text-slate-600" />
                    <h3 className="font-medium">Filtros Avançados</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="space-y-2">
                      <Label className="text-xs">Tipo de Atividade</Label>
                      <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                        <SelectTrigger className="h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todos">Todos os Tipos</SelectItem>
                          <SelectItem value="Projeto">Projeto</SelectItem>
                          <SelectItem value="Evento">Evento</SelectItem>
                          <SelectItem value="Curso">Curso</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Período</Label>
                      <Select value={filtroPeriodo} onValueChange={setFiltroPeriodo}>
                        <SelectTrigger className="h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todos">Todos os Períodos</SelectItem>
                          <SelectItem value="mes_atual">Mês Atual</SelectItem>
                          <SelectItem value="ultimo_trimestre">Último Trimestre</SelectItem>
                          <SelectItem value="semestre_atual">Semestre Atual</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Status</Label>
                      <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                        <SelectTrigger className="h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todos">Todos os Status</SelectItem>
                          <SelectItem value="Concluída">Concluída</SelectItem>
                          <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Indicador de filtros ativos */}
                  {(filtroTipo !== 'todos' || filtroPeriodo !== 'todos' || filtroStatus !== 'todos') && (
                    <div className="mt-3 pt-3 border-t flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <span>
                          Mostrando {filtrarAtividades(alunoDetalhes.atividades).length} de {alunoDetalhes.atividades.length} atividades
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setFiltroTipo('todos');
                          setFiltroPeriodo('todos');
                          setFiltroStatus('todos');
                        }}
                        className="h-8"
                      >
                        Limpar Filtros
                      </Button>
                    </div>
                  )}
                </div>

                {/* Lista de Atividades Filtradas */}
                <div className="space-y-4">
                  {filtrarAtividades(alunoDetalhes.atividades).length > 0 ? (
                    filtrarAtividades(alunoDetalhes.atividades).map((atividade, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow bg-white"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold">{atividade.titulo}</h4>
                            <Badge variant="outline" className="text-xs">
                              {atividade.tipo}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(atividade.data).toLocaleDateString('pt-BR')}
                            </span>
                            <span>{atividade.horas}h</span>
                          </div>
                        </div>
                        <Badge
                          className={
                            atividade.status === 'Concluída'
                              ? 'bg-green-100 text-green-800 border-green-300'
                              : 'bg-blue-100 text-blue-800 border-blue-300'
                          }
                        >
                          {atividade.status}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p>Nenhuma atividade encontrada com os filtros selecionados</p>
                      <Button
                        variant="link"
                        onClick={() => {
                          setFiltroTipo('todos');
                          setFiltroPeriodo('todos');
                          setFiltroStatus('todos');
                        }}
                        className="mt-2"
                      >
                        Limpar Filtros
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Observações e Recomendações */}
            <Card className="border-blue-200 bg-blue-50/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Observações
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alunoDetalhes.taxaConclusao === 100 ? (
                    <p className="text-green-700 font-medium">
                      ✅ Parabéns! Aluno completou todas as horas obrigatórias de extensão.
                    </p>
                  ) : alunoDetalhes.taxaConclusao >= 60 ? (
                    <p className="text-blue-700">
                      ℹ️ Aluno está no caminho certo. Restam {alunoDetalhes.horasPendentes}h para completar os requisitos.
                    </p>
                  ) : (
                    <p className="text-amber-700">
                      ⚠️ Atenção: Aluno precisa acelerar o ritmo. Restam {alunoDetalhes.horasPendentes}h para completar.
                    </p>
                  )}
                  
                  <div className="pt-3 border-t">
                    <p className="text-sm text-muted-foreground">
                      <strong>Total de atividades:</strong> {alunoDetalhes.atividades.length} participações
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Média de horas por atividade:</strong>{' '}
                      {(alunoDetalhes.horasConcluidas / alunoDetalhes.atividades.filter(a => a.status === 'Concluída').length).toFixed(1)}h
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )
      )}
    </div>
  );
}