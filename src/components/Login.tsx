import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Mail, KeyRound } from 'lucide-react';
import type { User } from '../App';
import logoUfma from '../assets/ufma.png';

type LoginProps = {
  onLogin: (user: User) => void;
};

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);

  const handleSendCode = () => {
    if (email) {
      setCodeSent(true);
    }
  };

  const handleLogin = () => {
    // Simular login baseado no email
    let role: 'ALUNO' | 'DOCENTE' | 'COORDENACAO' = 'ALUNO';
    let name = 'Usuário';

    if (email.includes('docente') || email.includes('prof')) {
      role = 'DOCENTE';
      name = 'Prof. Maria Silva';
    } else if (email.includes('coord')) {
      role = 'COORDENACAO';
      name = 'Coord. João Santos';
    } else {
      name = 'Pedro Almeida';
    }

    onLogin({
      id: '1',
      name,
      email,
      role,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-4 text-center pb-6">
          <div className="mx-auto w-24 h-24 bg-white rounded-full flex items-center justify-center p-2 shadow-lg">
            <img src={logoUfma} alt="UFMA" className="w-full h-full object-contain" />
          </div>
          <div>
            <CardTitle className="text-2xl text-blue-900">SIGEX - UFMA</CardTitle>
            <p className="text-base mt-2">Sistema Integrado de Gestão de Extensão</p>
            <CardDescription className="mt-3">
              Universidade Federal do Maranhão
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Matrícula ou Email Institucional</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="text"
                placeholder="123456789 ou usuario@discente.ufma.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                disabled={codeSent}
              />
            </div>
          </div>

          {!codeSent ? (
            <Button onClick={handleSendCode} className="w-full bg-blue-900 hover:bg-blue-800" disabled={!email}>
              Enviar código
            </Button>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="code">Código de Verificação</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="code"
                    type="text"
                    placeholder="Digite o código de 6 dígitos"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="pl-10"
                    maxLength={6}
                  />
                </div>
              </div>

              <Button onClick={handleLogin} className="w-full bg-blue-900 hover:bg-blue-800" disabled={code.length < 4}>
                Entrar no Sistema
              </Button>

              <Button
                variant="ghost"
                onClick={() => {
                  setCodeSent(false);
                  setCode('');
                }}
                className="w-full"
              >
                Usar outra matrícula
              </Button>
            </>
          )}

          <div className="pt-4 border-t text-center text-sm text-muted-foreground space-y-2">
            <p className="font-medium">Acesso unificado para:</p>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="p-2 bg-slate-50 rounded">
                <p className="font-medium">Discente</p>
                <p className="text-muted-foreground">aluno@edu.br</p>
              </div>
              <div className="p-2 bg-slate-50 rounded">
                <p className="font-medium">Docente</p>
                <p className="text-muted-foreground">docente@edu.br</p>
              </div>
              <div className="p-2 bg-slate-50 rounded">
                <p className="font-medium">Coordenação</p>
                <p className="text-muted-foreground">coord@edu.br</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}