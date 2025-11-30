import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';
import { Shield, Save } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

type Permission = {
  module: string;
  actions: {
    criar: boolean;
    editar: boolean;
    visualizar: boolean;
    excluir: boolean;
    aprovar: boolean;
    publicar: boolean;
  };
};

type Role = {
  id: string;
  name: string;
  description: string;
  permissions: Record<string, Permission['actions']>;
};

const initialRoles: Role[] = [
  {
    id: 'discente',
    name: 'Discente',
    description: 'Aluno da universidade',
    permissions: {
      'Solicitações': { criar: true, editar: true, visualizar: true, excluir: false, aprovar: false, publicar: false },
      'Oportunidades': { criar: false, editar: false, visualizar: true, excluir: false, aprovar: false, publicar: false },
      'Certificados': { criar: false, editar: false, visualizar: true, excluir: false, aprovar: false, publicar: false },
    },
  },
  {
    id: 'docente',
    name: 'Docente',
    description: 'Professor orientador',
    permissions: {
      'Solicitações': { criar: false, editar: false, visualizar: true, excluir: false, aprovar: true, publicar: false },
      'Oportunidades': { criar: true, editar: true, visualizar: true, excluir: true, aprovar: false, publicar: true },
      'Certificados': { criar: true, editar: true, visualizar: true, excluir: false, aprovar: false, publicar: true },
    },
  },
  {
    id: 'coordenacao',
    name: 'Coordenação',
    description: 'Coordenador de extensão',
    permissions: {
      'Solicitações': { criar: false, editar: true, visualizar: true, excluir: false, aprovar: true, publicar: false },
      'Oportunidades': { criar: true, editar: true, visualizar: true, excluir: true, aprovar: true, publicar: true },
      'Certificados': { criar: true, editar: true, visualizar: true, excluir: true, aprovar: true, publicar: true },
    },
  },
];

const modules = ['Solicitações', 'Oportunidades', 'Certificados', 'Grupos', 'Relatórios'];
const actions = ['criar', 'editar', 'visualizar', 'excluir', 'aprovar', 'publicar'];

export function GestaoPermissoes() {
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [selectedRole, setSelectedRole] = useState<string>('discente');

  const handlePermissionChange = (module: string, action: string, value: boolean) => {
    setRoles(roles.map(role => {
      if (role.id === selectedRole) {
        return {
          ...role,
          permissions: {
            ...role.permissions,
            [module]: {
              ...role.permissions[module],
              [action]: value,
            },
          },
        };
      }
      return role;
    }));
  };

  const currentRole = roles.find(r => r.id === selectedRole);

  return (
    <div className="space-y-6">
      <div className="bg-white border-l-4 border-blue-900 p-4 rounded-r-lg shadow-sm">
        <h1 className="text-blue-900">Gestão de Perfis e Permissões</h1>
        <p className="text-muted-foreground">
          Configure permissões por perfil de usuário (RF47, RF48)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Perfis Cadastrados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{roles.length}</div>
            <p className="text-xs text-muted-foreground">perfis ativos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Módulos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{modules.length}</div>
            <p className="text-xs text-muted-foreground">módulos configuráveis</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Ações por Perfil</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{actions.length}</div>
            <p className="text-xs text-muted-foreground">tipos de ações</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Última Atualização</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm">29/11/2024</div>
            <p className="text-xs text-muted-foreground">às 14:30</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <Tabs value={selectedRole} onValueChange={setSelectedRole}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Configuração de Permissões</CardTitle>
                <CardDescription>
                  Selecione um perfil para editar suas permissões
                </CardDescription>
              </div>
              <Button>
                <Save className="w-4 h-4 mr-2" />
                Salvar Alterações
              </Button>
            </div>
            <TabsList className="grid w-full grid-cols-3 mt-4">
              {roles.map(role => (
                <TabsTrigger key={role.id} value={role.id}>
                  <Shield className="w-4 h-4 mr-2" />
                  {role.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </CardHeader>

          <CardContent>
            {roles.map(role => (
              <TabsContent key={role.id} value={role.id} className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-medium text-blue-900">{role.name}</h3>
                  <p className="text-sm text-blue-700 mt-1">{role.description}</p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-7 gap-4 pb-3 border-b font-medium text-sm">
                    <div className="col-span-1">Módulo</div>
                    {actions.map(action => (
                      <div key={action} className="text-center capitalize">
                        {action}
                      </div>
                    ))}
                  </div>

                  {modules.map(module => (
                    <div key={module} className="grid grid-cols-7 gap-4 items-center p-3 border rounded-lg hover:bg-slate-50">
                      <div className="col-span-1 font-medium">{module}</div>
                      {actions.map(action => (
                        <div key={action} className="flex justify-center">
                          <Checkbox
                            checked={role.permissions[module]?.[action as keyof Permission['actions']] || false}
                            onCheckedChange={(checked) =>
                              handlePermissionChange(module, action, checked as boolean)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm">
                  <p className="font-medium text-amber-900">⚠️ Atenção</p>
                  <p className="text-amber-800 mt-1">
                    Alterações nas permissões afetarão todos os usuários com o perfil "{role.name}".
                    As mudanças entram em vigor imediatamente após salvar.
                  </p>
                </div>
              </TabsContent>
            ))}
          </CardContent>
        </Tabs>
      </Card>

      {/* Resumo de Permissões */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo Comparativo</CardTitle>
          <CardDescription>Visão geral de permissões por perfil</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Ação</th>
                  {roles.map(role => (
                    <th key={role.id} className="text-center py-2">{role.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 font-medium">Criar Oportunidades</td>
                  {roles.map(role => (
                    <td key={role.id} className="text-center py-2">
                      {role.permissions['Oportunidades']?.criar ? (
                        <Badge className="bg-green-600">Permitido</Badge>
                      ) : (
                        <Badge variant="secondary">Negado</Badge>
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-medium">Aprovar Solicitações</td>
                  {roles.map(role => (
                    <td key={role.id} className="text-center py-2">
                      {role.permissions['Solicitações']?.aprovar ? (
                        <Badge className="bg-green-600">Permitido</Badge>
                      ) : (
                        <Badge variant="secondary">Negado</Badge>
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-medium">Emitir Certificados</td>
                  {roles.map(role => (
                    <td key={role.id} className="text-center py-2">
                      {role.permissions['Certificados']?.publicar ? (
                        <Badge className="bg-green-600">Permitido</Badge>
                      ) : (
                        <Badge variant="secondary">Negado</Badge>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
