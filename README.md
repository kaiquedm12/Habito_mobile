## Habito Mobile

App de controle de hábitos focado em tempo, produtividade e gamificação. Criado com Expo + React Native + TypeScript e Expo Router.

### Requisitos
- Node.js LTS
- npm ou yarn
- Expo CLI (`npx expo`)

### Rodando
1. Instale dependências: `npm install`
2. Inicie: `npm start`
3. Abra com Expo Go (Android/iOS) ou emulador.

### Estrutura
- app/: rotas Expo Router
- src/components: UI reutilizável
- src/screens: telas (Home, Stats, Records, Detalhe)
- src/hooks: lógica (hábitos, timer, stats)
- src/services: regras de ranking
- src/storage: persistência via AsyncStorage
- src/theme: tema light/dark
- src/utils: helpers e mocks

### Funcionalidades
- Criar/editar/remover hábitos com cor, ícone, categoria e meta de horas
- Timer por hábito (iniciar/pausar/retomar/finalizar) + entrada manual
- Histórico e estatísticas (diário/semanal/mensal) com gráficos simples
- Gamificação com níveis (Bronze/Prata/Ouro/Pro) e badges
- Aba de recordes: maior sessão, hábito mais praticado, totais
- Persistência local (AsyncStorage) e mock inicial

### Próximos passos sugeridos
- Habilitar notificações (expo-notifications)
- Sincronização com backend / login
- Melhorias de acessibilidade e testes E2E
# Habito_mobile