# SIGEX - Sistema Integrado de Gestão de Extensão 🎓

> Protótipo de alta fidelidade para o sistema de gestão de extensão universitária (UFMA), desenvolvido com foco em experiência do usuário e arquitetura moderna.

![Status do Projeto](https://img.shields.io/badge/Status-Protótipo%20Funcional-orange)
![Tech](https://img.shields.io/badge/Tech-React%20%7C%20Vite%20%7C%20Tailwind-blue)

## 📋 Sobre o Projeto

O **SIGEX** é uma solução proposta para modernizar e centralizar os processos de extensão universitária. O sistema cobre todo o ciclo de vida das atividades de extensão, desde a submissão de propostas por docentes até a emissão de certificados para alunos.

O design e a estrutura inicial deste projeto foram acelerados utilizando **Figma AI**, garantindo uma interface consistente e responsiva, posteriormente exportada e refatorada em **React**.

## 🚀 Tecnologias Utilizadas

* **Core:** [React](https://react.dev/) + [Vite](https://vitejs.dev/)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
* **Componentes UI:** [Shadcn/ui](https://ui.shadcn.com/) (Radix UI)
* **Ícones:** [Lucide React](https://lucide.dev/)
* **Navegação:** React Router (SPA)

## ✨ Funcionalidades Principais

O sistema implementa Controle de Acesso Baseado em Papéis (RBAC), oferecendo visões distintas para cada perfil:

### 👨‍🎓 Aluno
* **Dashboard Personalizado:** Visão geral de horas e atividades.
* **Minhas Participações:** Histórico completo de projetos.
* **Certificados:** Emissão e validação de certificados digitais.
* **Inscrições:** Busca e inscrição em novas oportunidades.

### 👨‍🏫 Docente
* **Gestão de Propostas:** Submissão e edição de projetos de extensão.
* **Equipes:** Gerenciamento de discentes e planos de trabalho.
* **Acompanhamento:** Monitoramento do status das submissões.

### 📋 Coordenação
* **Análise de Solicitações:** Aprovação ou recusa de projetos.
* **Relatórios Gerenciais:** Dados consolidados sobre a extensão.
* **Pareceres:** Emissão de feedbacks técnicos.

### ⚙️ Administrador
* **Gestão de Usuários:** Controle de permissões e acessos.
* **Logs de Auditoria:** Rastreabilidade de ações no sistema.
* **Configurações do Sistema:** Parametrização global.

## 🔧 Como Executar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/nome-do-repo.git](https://github.com/seu-usuario/nome-do-repo.git)
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

4.  **Acesse no navegador:**
    O projeto estará rodando em `http://localhost:5173`

## 📂 Estrutura de Pastas

src/ ├── components/ │ ├── admin/ # Telas do Administrador │ ├── aluno/ # Telas do Aluno │ ├── coordenacao/ # Telas da Coordenação │ ├── docente/ # Telas do Docente │ ├── ui/ # Componentes reutilizáveis (Botões, Inputs, etc.) │ └── DashboardLayout.tsx # Layout principal com Sidebar dinâmica ├── assets/ # Imagens e recursos estáticos ├── guidelines/ # Diretrizes do projeto └── App.tsx # Configuração de rotas e lógica principal


## 🚧 Próximos Passos (Roadmap)

- [x] Interface (Frontend) completa e responsiva.
- [x] Navegação entre páginas (SPA).
- [x] Lógica de simulação de perfis (Mock).
- [ ] Integração com Backend (API REST).
- [ ] Conexão com Banco de Dados.
- [ ] Testes automatizados (Unitários e E2E).

## 📄 Licença

Este projeto é um protótipo educacional/acadêmico.

---
*Desenvolvido com apoio de ferramentas de IA Generativa para Design e Código.
