import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
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
} from 'recharts';
import { Download, Filter } from 'lucide-react';

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

export function Relatorios() {
  const [semestre, setSemestre] = useState('2024.2');
  const [curso, setCurso] = useState('todos');

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

            <div className="flex items-end">
              <Button className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Exportar PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cards de Resumo */}
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
    </div>
  );
}
