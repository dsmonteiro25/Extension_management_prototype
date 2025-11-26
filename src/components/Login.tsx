import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { GraduationCap, Mail, KeyRound } from 'lucide-react';
import type { User } from '../App';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl">Sistema de Extensão</CardTitle>
            <CardDescription className="mt-2">
              Acesso unificado para aluno, docente e coordenação
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email institucional ou matrícula</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="text"
                placeholder="seu.email@universidade.edu.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                disabled={codeSent}
              />
            </div>
          </div>

          {!codeSent ? (
            <Button onClick={handleSendCode} className="w-full" disabled={!email}>
              Enviar código
            </Button>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="code">Código recebido por email</Label>
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

              <Button onClick={handleLogin} className="w-full" disabled={code.length < 4}>
                Entrar
              </Button>

              <Button
                variant="ghost"
                onClick={() => {
                  setCodeSent(false);
                  setCode('');
                }}
                className="w-full"
              >
                Usar outro email
              </Button>
            </>
          )}

          <div className="pt-4 border-t text-center text-sm text-muted-foreground">
            <p>Para testar:</p>
            <p className="mt-1">
              <span className="font-medium">Aluno:</span> aluno@edu.br
            </p>
            <p>
              <span className="font-medium">Docente:</span> docente@edu.br
            </p>
            <p>
              <span className="font-medium">Coordenação:</span> coord@edu.br
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
