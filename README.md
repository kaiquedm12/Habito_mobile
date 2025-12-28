<div align="center">
  <h1>🏆 Habito Mobile</h1>
  <p><strong>Aplicativo de controle de hábitos com gamificação e tracking de produtividade</strong></p>
  
  <p>
    <img src="https://img.shields.io/badge/React_Native-0.81.5-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React Native" />
    <img src="https://img.shields.io/badge/Expo-~54.0.0-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
    <img src="https://img.shields.io/badge/TypeScript-5.3.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  </p>
</div>

---

## 📖 Sobre o Projeto

**Habito Mobile** é um aplicativo moderno de rastreamento de hábitos que combina produtividade com gamificação. Construído com tecnologias mobile de última geração, o app permite que usuários criem, monitorem e evoluam seus hábitos através de um sistema de níveis e conquistas.

### ✨ Principais Funcionalidades

- 📝 **Gestão Completa de Hábitos**: Crie, edite e remova hábitos personalizados com ícones, cores e categorias
- ⏱️ **Timer Integrado**: Cronômetro por hábito com controles de iniciar, pausar, retomar e finalizar
- ➕ **Entrada Manual**: Adicione tempo manualmente quando necessário
- 📊 **Estatísticas Detalhadas**: Visualize progresso diário, semanal e mensal com gráficos intuitivos
- 🎮 **Sistema de Gamificação**: Progrida através dos níveis Bronze, Prata, Ouro e Pro
- 🏅 **Recordes e Conquistas**: Acompanhe suas maiores sessões e hábitos mais praticados
- 🌗 **Tema Claro/Escuro**: Interface adaptável com suporte a modo claro e escuro
- 🔐 **Autenticação**: Sistema de login e registro de usuários
- 💾 **Persistência Local**: Dados salvos localmente com AsyncStorage

---

## 🛠️ Tecnologias Utilizadas

### Core
- **[React Native](https://reactnative.dev/)** - Framework para desenvolvimento mobile
- **[Expo](https://expo.dev/)** - Plataforma e toolchain para React Native
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática
- **[Expo Router](https://expo.github.io/router/)** - Navegação file-based baseada em rotas

### UI & UX
- **[Expo Linear Gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/)** - Gradientes visuais
- **[@expo/vector-icons](https://docs.expo.dev/guides/icons/)** - Biblioteca de ícones
- **React Native Safe Area Context** - Gerenciamento de áreas seguras
- **React Native SVG** - Suporte para gráficos vetoriais

### Persistência & Estado
- **[@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/)** - Armazenamento local
- **[Expo Secure Store](https://docs.expo.dev/versions/latest/sdk/securestore/)** - Armazenamento seguro de dados sensíveis
- **React Context API** - Gerenciamento de estado global

### Desenvolvimento
- **ESLint** - Linter para manutenção de código
- **TypeScript ESLint** - Plugin ESLint para TypeScript

---

## 🚀 Começando

### Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão LTS recomendada)
- **npm** ou **yarn**
- **Expo CLI**: `npm install -g expo-cli` (opcional, pode usar `npx expo`)
- **Expo Go** no celular (Android/iOS) ou emulador configurado

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/kaiquedm12/Habito_mobile.git
   cd Habito_mobile
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Inicie o aplicativo**
   ```bash
   npm start
   # ou
   expo start
   ```

4. **Execute no dispositivo/emulador**
   - Escaneie o QR code com o app **Expo Go** (Android/iOS)
   - Ou pressione `a` para Android, `i` para iOS no terminal

### Scripts Disponíveis

```bash
npm start              # Inicia o Metro Bundler
npm run android        # Abre no emulador/dispositivo Android
npm run ios            # Abre no simulador iOS
npm run web            # Abre no navegador web
npm run lint           # Executa o linter ESLint
```

---

## 📁 Estrutura do Projeto

```
Habito_mobile/
├── app/                          # Rotas do Expo Router
│   ├── (tabs)/                   # Navegação em abas
│   │   ├── index.tsx            # Tela Home
│   │   ├── stats.tsx            # Tela de Estatísticas
│   │   └── records.tsx          # Tela de Recordes
│   ├── habit/                    # Rota de detalhes do hábito
│   ├── login.tsx                # Tela de Login
│   ├── register.tsx             # Tela de Registro
│   └── _layout.tsx              # Layout raiz
├── src/
│   ├── components/              # Componentes reutilizáveis
│   │   ├── Badge.tsx           # Componente de badge
│   │   ├── Fab.tsx             # Botão flutuante de ação
│   │   ├── HabitCard.tsx       # Card de hábito
│   │   ├── HabitForm.tsx       # Formulário de hábito
│   │   ├── IconPicker.tsx      # Seletor de ícones
│   │   ├── ProgressBar.tsx     # Barra de progresso
│   │   ├── PrimaryButton.tsx   # Botão primário
│   │   ├── Screen.tsx          # Container de tela
│   │   ├── StatCard.tsx        # Card de estatística
│   │   ├── StatsChart.tsx      # Gráfico de estatísticas
│   │   └── TimerControls.tsx   # Controles do timer
│   ├── hooks/                   # Hooks customizados
│   │   ├── AuthContext.tsx     # Contexto de autenticação
│   │   ├── HabitsContext.tsx   # Contexto de hábitos
│   │   ├── useHabits.ts        # Hook de hábitos
│   │   ├── useStats.ts         # Hook de estatísticas
│   │   └── useTimer.ts         # Hook do timer
│   ├── screens/                 # Telas principais
│   │   ├── HomeScreen.tsx      # Tela principal
│   │   ├── HabitDetailScreen.tsx  # Detalhes do hábito
│   │   ├── LoginScreen.tsx     # Tela de login
│   │   ├── RecordsScreen.tsx   # Tela de recordes
│   │   ├── RegisterScreen.tsx  # Tela de registro
│   │   └── StatsScreen.tsx     # Tela de estatísticas
│   ├── services/                # Lógica de negócio
│   │   └── rankingService.ts   # Serviço de ranking/níveis
│   ├── storage/                 # Camada de persistência
│   │   ├── authStorage.ts      # Armazenamento de autenticação
│   │   └── habitStorage.ts     # Armazenamento de hábitos
│   ├── theme/                   # Sistema de temas
│   │   ├── theme.ts            # Definições de tema
│   │   ├── ThemeProvider.tsx   # Provider de tema
│   │   └── types.ts            # Tipos do tema
│   ├── types/                   # Definições TypeScript
│   │   └── habit.ts            # Tipos de hábito
│   └── utils/                   # Utilitários
│       ├── icons.ts            # Mapa de ícones
│       ├── mockData.ts         # Dados mock iniciais
│       └── time.ts             # Funções de tempo
├── assets/                      # Recursos estáticos
├── app.json                     # Configuração do Expo
├── package.json                 # Dependências do projeto
└── tsconfig.json               # Configuração TypeScript
```

---

## 🎮 Sistema de Gamificação

O app possui um sistema de níveis progressivos baseado em horas acumuladas:

| Nível | Horas Necessárias | Descrição |
|-------|-------------------|-----------|
| 🥉 **Bronze** | 0 - 20h | Iniciante |
| 🥈 **Prata** | 20 - 25h | Muito Bom |
| 🥇 **Ouro** | 25 - 30h | Excelente |
| 👑 **Pro** | 30h+ | Nível Máximo |

---

## 🎨 Temas

O aplicativo suporta dois temas:

- **Tema Claro**: Interface clara e moderna
- **Tema Escuro**: Interface com fundo escuro para melhor visualização noturna

Troque entre temas através do botão no canto superior da tela Home.

---

## 🔄 Fluxo de Uso

1. **Registro/Login**: Crie uma conta ou faça login
2. **Criar Hábito**: Adicione um novo hábito com nome, ícone, cor e categoria
3. **Iniciar Timer**: Entre no detalhe do hábito e inicie o cronômetro
4. **Acompanhar Progresso**: Visualize estatísticas e progresso de nível
5. **Conquistar Recordes**: Acumule horas e desbloqueie novos níveis

---

## 🔮 Próximas Funcionalidades

- 🔔 Notificações push com lembretes personalizados
- ☁️ Sincronização com backend e armazenamento em nuvem
- 📱 Compartilhamento de conquistas
- 🌐 Suporte multilíngue (i18n)
- ♿ Melhorias de acessibilidade
- 🧪 Testes E2E e unitários
- 📈 Gráficos mais avançados e análises

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commitar suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abrir um Pull Request

---

## 📄 Licença

Este projeto é de código aberto e está disponível para uso pessoal e educacional.

---

## 👨‍💻 Autor

Desenvolvido com ❤️ por **Kaique DM**

---

<div align="center">
  <p>⭐ Se este projeto foi útil para você, considere dar uma estrela!</p>
</div>