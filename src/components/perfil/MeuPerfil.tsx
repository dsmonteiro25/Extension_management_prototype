import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Alert, AlertDescription } from '../ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { User, Mail, Phone, Book, Upload, CheckCircle, Shield, Monitor } from 'lucide-react';
import type { User as UserType } from '../../App';

type MeuPerfilProps = {
  user: UserType;
};

export function MeuPerfil({ user }: MeuPerfilProps) {
  const [nome, setNome] = useState(user.name);
  const [telefone, setTelefone] = useState('(98) 98765-4321');
  const [biografia, setBiografia] = useState('');
  const [salvo, setSalvo] = useState(false);

  const handleSave = () => {
    setSalvo(true);
    setTimeout(() => setSalvo(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border-l-4 border-blue-900 p-4 rounded-r-lg shadow-sm">
        <h1 className="text-blue-900">Meu Perfil</h1>
        <p className="text-muted-foreground">
          Gerencie suas informações pessoais e configurações (RF05, RF46)
        </p>
      </div>

      {salvo && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Perfil atualizado com sucesso!
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="dados">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dados">
            <User className="w-4 h-4 mr-2" />
            Dados Pessoais
          </TabsTrigger>
          <TabsTrigger value="seguranca">
            <Shield className="w-4 h-4 mr-2" />
            Segurança
          </TabsTrigger>
          <TabsTrigger value="sessoes">
            <Monitor className="w-4 h-4 mr-2" />
            Sessões Ativas
          </TabsTrigger>
        </TabsList>

        {/* Dados Pessoais */}
        <TabsContent value="dados" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Foto de Perfil</CardTitle>
              <CardDescription>
                Adicione ou altere sua foto de perfil
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarFallback className="bg-blue-900 text-white text-2xl">
                    {user.name.split(' ').map((n) => n[0]).join('').substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <input
                    type="file"
                    id="photo-upload"
                    accept="image/*"
                    className="hidden"
                  />
                  <label htmlFor="photo-upload">
                    <Button variant="outline" asChild>
                      <span>
                        <Upload className="w-4 h-4 mr-2" />
                        Alterar Foto
                      </span>
                    </Button>
                  </label>
                  <p className="text-sm text-muted-foreground">
                    JPG, PNG ou GIF (máx. 2MB)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>
                Atualize seus dados cadastrais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Institucional</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    value={user.email}
                    disabled
                    className="pl-10 bg-slate-50"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Email institucional não pode ser alterado
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="telefone"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    className="pl-10"
                    placeholder="(98) 98765-4321"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="biografia">Mini-Biografia</Label>
                <div className="relative">
                  <Book className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Textarea
                    id="biografia"
                    value={biografia}
                    onChange={(e) => setBiografia(e.target.value)}
                    placeholder="Conte um pouco sobre você, seus interesses e áreas de atuação..."
                    rows={4}
                    className="pl-10 pt-3"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Máximo de 500 caracteres
                </p>
              </div>

              <Button onClick={handleSave}>Salvar Alterações</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Segurança */}
        <TabsContent value="seguranca" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Alterar Senha</CardTitle>
              <CardDescription>
                Mantenha sua conta segura com uma senha forte
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="senha-atual">Senha Atual</Label>
                <Input id="senha-atual" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nova-senha">Nova Senha</Label>
                <Input id="nova-senha" type="password" />
                <p className="text-xs text-muted-foreground">
                  Mínimo 8 caracteres, incluindo maiúsculas, minúsculas e números
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmar-senha">Confirmar Nova Senha</Label>
                <Input id="confirmar-senha" type="password" />
              </div>

              <Button>Alterar Senha</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Autenticação em Dois Fatores</CardTitle>
              <CardDescription>
                Adicione uma camada extra de segurança
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertDescription>
                  A autenticação em dois fatores está <strong>desativada</strong>.
                  Ative para proteger melhor sua conta.
                </AlertDescription>
              </Alert>

              <Button variant="outline">Configurar 2FA</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sessões Ativas */}
        <TabsContent value="sessoes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Dispositivos Conectados</CardTitle>
              <CardDescription>
                Gerencie os dispositivos com acesso à sua conta (RF50)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  dispositivo: 'Chrome - Windows',
                  ip: '192.168.1.100',
                  localizacao: 'São Luís, MA',
                  ultimoAcesso: 'Agora',
                  atual: true,
                },
                {
                  dispositivo: 'Safari - iPhone',
                  ip: '192.168.1.105',
                  localizacao: 'São Luís, MA',
                  ultimoAcesso: 'Há 2 horas',
                  atual: false,
                },
                {
                  dispositivo: 'Firefox - Linux',
                  ip: '192.168.1.110',
                  localizacao: 'São Luís, MA',
                  ultimoAcesso: 'Ontem às 18:30',
                  atual: false,
                },
              ].map((sessao, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Monitor className="h-6 w-6 text-blue-900" />
                    </div>
                    <div>
                      <p className="font-medium flex items-center gap-2">
                        {sessao.dispositivo}
                        {sessao.atual && (
                          <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded">
                            Atual
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {sessao.ip} • {sessao.localizacao}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Último acesso: {sessao.ultimoAcesso}
                      </p>
                    </div>
                  </div>
                  {!sessao.atual && (
                    <Button variant="outline" size="sm">
                      Encerrar
                    </Button>
                  )}
                </div>
              ))}

              <Button variant="destructive" className="w-full">
                Encerrar Todas as Outras Sessões
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
