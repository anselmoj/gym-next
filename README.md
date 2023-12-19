# Sistema de Controle de Acesso para Atletas em Academia

O objetivo é a criação de um sistema de controle de acesso para atletas em uma academia.
O sistema deve permitir a liberação de entrada e de saída de atletas, garantindo a segurança das instalações e o registro preciso das atividades dos membros.

### Stack a ser utilizada
Fazer sistema utilizado a stack [NextJS](https://nextjs.org/) + [Tailwind](https://tailwindcss.com/) + requisições utilizando a própria [Fetch API](https://nextjs.org/docs/app/api-reference/functions/fetch).

### Requisitos
- O sistema deve cadastrar atleta;
- O sistema deve editar atleta;
- O sistema deve ativar o cadastro de atleta;
- O sistema deve desativar o cadastro de atleta;
- O sistema deve listar os cadastros de atletas;
- O sistema deve liberar a entrada de um atleta;
- O sistema deve liberar a saída de um atleta;
- O sistema deve listar todas as entradas/saídas de atletas;

### Regras de negócio
- O formulário de cadastro/edição do atleta deve ser feita em uma página;
- O formulário de cadastro deve conter validações antes de enviar a requisição para o back-end;
- A listagem de atletas deve conter:
  - ID do atleta;
  - Nome do atleta;
  - Gênero do atleta;
  - Situação do atleta;
- Para desativar ou ativar o cadastro de um atleta deve abrir um modal de alerta para confirmar a ação;
- A listagem de acessos deve conter:
  - Nome do atleta;
  - Se foi entrada ou saída;
  - Horário da liberação;
- O formulário de liberação de entrada deve estar dentro de um modal;
- O formulário de liberação deve fazer a verificação se o atleta está liberado no sistema (apenas quando for liberação de entrada);

### Informações do backend
#### Dados do atleta:
- id - ID (number)
- name - Nome (string) - Obrigatório | Máximo de 255 caracteres
- gender - Gênero (string) - Obrigatório | F = Feminino e M = Masculino
- is_active - Situação (boolean) - Obrigatório

#### Dados da liberação:
- id - ID (number)
- user_id - ID do atleta (number)
- date_time - Data/hora da liberação do atleta (date)
- type - Tipo da liberação (string) - Obrigatório | E = Entrada e S = Saída
