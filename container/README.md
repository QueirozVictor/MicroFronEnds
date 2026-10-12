# Container - Micro Frontends

Projeto container desenvolvido com Next.js e Module Federation para integrar os micro frontends de cardápio e pedido em uma única aplicação.

## Tecnologias utilizadas

- Next.js 14.2.33
- React 18.3.1
- React DOM 18.3.1
- Webpack 5.95.0
- Module Federation 8.8.76

## Instalação

Instale as dependências do projeto:

```bash
npm install
```

## Executando o projeto

### Desenvolvimento

```bash
npm run dev
```

A aplicação será executada em modo de desenvolvimento.

### Build

```bash
npm run build
```

Gera a versão de produção da aplicação.

### Produção

```bash
npm run start
```

Inicia a aplicação após a geração do build.

## Micro Frontends integrados

O container utiliza Module Federation para carregar os seguintes projetos:

- **Cardápio:** `http://localhost:3001`
- **Pedido:** `http://localhost:3002`

Os dois micro frontends devem estar em execução para que a integração funcione corretamente.

## Configuração

A integração é configurada no arquivo `next.config.js`, utilizando o `NextFederationPlugin`, com suporte a carregamento dos módulos remotos no servidor e no cliente.

