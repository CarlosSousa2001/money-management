# Money Management

**Money Management** é uma aplicação de controle financeiro baseada na entrada e saída de valores. O sistema permite um gerenciamento eficiente das finanças pessoais, oferecendo funcionalidades como cadastro de transações, controle de cartões de crédito, dashboards financeiros e emissão de relatórios.

![image](https://github.com/user-attachments/assets/782798ac-e7df-4818-9b48-ba522fb5d723)

## 📌 Funcionalidades

- 🔍 **Filtros de Busca**: Pesquise transações com base em diferentes critérios.
- 💳 **Gerenciamento de Cartões de Crédito**: Adicione e acompanhe seus cartões para melhor controle financeiro.
- 📋 **CRUD de Transações**: Registre pagamentos e divida valores entre diferentes formas de pagamento (ex: metade no cartão de crédito, metade no Pix).
- 📊 **Dashboard Financeiro**: Acompanhe a saúde da sua carteira em tempo real.
- 📑 **Geração de Relatórios**: Exporte e visualize suas finanças de forma detalhada.

## 🚀 Tecnologias Utilizadas

- **Next.js** ⚛️
- **TypeScript** 🟦
- **React Hook Form** 📜
- **Zod** ⚖️
- **tailwindcss** 🎨
- **Shadcn-ui** 📊

![mobile-img-money](https://github.com/user-attachments/assets/bc6a6563-6f38-4a0d-a4ce-c63b0fd5f54f)

## 🐳 Containerização com Docker

Este projeto utiliza **Docker** e **Docker Compose** para facilitar a configuração do ambiente de desenvolvimento e produção. Com isso, todas as dependências e configurações são gerenciadas dentro de containers, garantindo uma execução consistente.

### 🔹 Como rodar o projeto com Docker

Para iniciar a aplicação usando Docker, execute o seguinte comando:

```sh
docker-compose up --build
```

## 🌐 Integração com API em C#

O **Money Management** consome dados de uma **API desenvolvida em C# com .NET**, responsável por gerenciar as transações financeiras e fornecer as informações necessárias para a interface do usuário.

### 🔹 A API é utilizada para:

- 📡 **Buscar e registrar transações**
- 💳 **Gerenciar cartões de crédito**
- 📊 **Fornecer dados para os dashboards**
- 📑 **Gerar relatórios financeiros**

Essa arquitetura separada permite **escalabilidade** e **manutenção eficiente** entre o frontend e o backend.


