import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Users, Plus, Pencil, Trash2 } from 'lucide-react';

type Grupo = {
  id: number;
  nome: string;
  docente: string;
  alunos: string[];
  dataCriacao: string;
};

const gruposIniciais: Grupo[] = [
  {
    id: 1,
    nome: 'Grupo Extensão Rural',
    docente: 'Prof. Ana Costa',
    alunos: ['Maria Silva', 'João Santos', 'Pedro Almeida'],
    dataCriacao: '10/03/2024',
  },
  {
    id: 2,
    nome: 'Grupo Tecnologia Social',
    docente: 'Prof. Carlos Mendes',
    alunos: ['Ana Costa', 'Julia Martins', 'Roberto Dias', 'Fernanda Lima'],
    dataCriacao: '15/03/2024',
  },
];

type GruposDiscentesProps = {
  userRole: string | null;
};

export function GruposDiscentes({ userRole }: GruposDiscentesProps) {
  const [grupos, setGrupos] = useState<Grupo[]>(gruposIniciais);
  const [criarDialog, setCriarDialog] = useState(false);
  const [editarDialog, setEditarDialog] = useState<Grupo | null>(null);
  const [nomeGrupo, setNomeGrupo] = useState('');
  const [docenteResponsavel, setDocenteResponsavel] = useState('');

  const handleCriarGrupo = () => {
    if (nomeGrupo && docenteResponsavel) {
      const novoGrupo: Grupo = {
        id: grupos.length + 1,
        nome: nomeGrupo,
        docente: docenteResponsavel,
        alunos: [],
        dataCriacao: new Date().toLocaleDateString('pt-BR'),
      };
      setGrupos([...grupos, novoGrupo]);
      setCriarDialog(false);
      setNomeGrupo('');
      setDocenteResponsavel('');
    }
  };

  const handleRemoverGrupo = (id: number) => {
    if (confirm('Tem certeza que deseja remover este grupo?')) {
      setGrupos(grupos.filter((g) => g.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Grupos de Discentes</h1>
          <p className="text-muted-foreground">
            Organize alunos em grupos para projetos de extensão
          </p>
        </div>
        {(userRole === 'COORDENACAO' || userRole === 'DOCENTE') && (
          <Button onClick={() => setCriarDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Criar Grupo
          </Button>
        )}
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total de Grupos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{grupos.length}</div>
            <p className="text-xs text-muted-foreground">grupos ativos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total de Alunos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">
              {grupos.reduce((acc, g) => acc + g.alunos.length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">em grupos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Docentes Envolvidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">
              {new Set(grupos.map((g) => g.docente)).size}
            </div>
            <p className="text-xs text-muted-foreground">coordenando grupos</p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Grupos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {grupos.map((grupo) => (
          <Card key={grupo.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    {grupo.nome}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    Coordenado por {grupo.docente}
                  </CardDescription>
                </div>
                {(userRole === 'COORDENACAO' || userRole === 'DOCENTE') && (
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setEditarDialog(grupo)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleRemoverGrupo(grupo.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-xs text-muted-foreground">Alunos ({grupo.alunos.length})</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {grupo.alunos.length > 0 ? (
                    grupo.alunos.map((aluno, index) => (
                      <Badge key={index} variant="secondary">
                        {aluno}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">Nenhum aluno adicionado</p>
                  )}
                </div>
              </div>

              {(userRole === 'COORDENACAO' || userRole === 'DOCENTE') && (
                <Button variant="outline" size="sm" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Alunos
                </Button>
              )}

              <div className="pt-3 border-t text-xs text-muted-foreground">
                Criado em {grupo.dataCriacao}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog Criar Grupo */}
      <Dialog open={criarDialog} onOpenChange={setCriarDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Novo Grupo</DialogTitle>
            <DialogDescription>
              Preencha as informações básicas do grupo
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome do Grupo</Label>
              <Input
                id="nome"
                placeholder="Ex: Grupo Extensão Rural"
                value={nomeGrupo}
                onChange={(e) => setNomeGrupo(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="docente">Docente Responsável</Label>
              <Input
                id="docente"
                placeholder="Ex: Prof. Ana Costa"
                value={docenteResponsavel}
                onChange={(e) => setDocenteResponsavel(e.target.value)}
              />
            </div>

            <p className="text-sm text-muted-foreground">
              Você poderá adicionar alunos após criar o grupo.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCriarDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCriarGrupo} disabled={!nomeGrupo || !docenteResponsavel}>
              Criar Grupo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Editar Grupo */}
      <Dialog open={!!editarDialog} onOpenChange={() => setEditarDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Grupo</DialogTitle>
            <DialogDescription>{editarDialog?.nome}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-nome">Nome do Grupo</Label>
              <Input
                id="edit-nome"
                defaultValue={editarDialog?.nome}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-docente">Docente Responsável</Label>
              <Input
                id="edit-docente"
                defaultValue={editarDialog?.docente}
              />
            </div>

            <div className="space-y-2">
              <Label>Alunos do Grupo</Label>
              <div className="border rounded-lg p-4 min-h-[100px]">
                <div className="flex flex-wrap gap-2">
                  {editarDialog?.alunos.map((aluno, index) => (
                    <Badge key={index} variant="secondary">
                      {aluno}
                      <button className="ml-2 hover:text-red-600">×</button>
                    </Badge>
                  ))}
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Aluno
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditarDialog(null)}>
              Cancelar
            </Button>
            <Button onClick={() => setEditarDialog(null)}>
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
