# Micro Cardápio - Micro Frontend

Micro frontend desenvolvido com Next.js e Module Federation, responsável por exibir os itens do cardápio e permitir que o usuário adicione produtos ao pedido.

## Tecnologias utilizadas

- Next.js 14.2.33
- React 18.3.1
- React DOM 18.3.1
- Webpack 5.95.0
- Module Federation 8.8.76
- CSS Modules
- styled-jsx 5.1.6

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

A aplicação será executada na porta 3001.

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

## Integração com Module Federation

O componente `MicroCardapio` é disponibilizado por meio do Module Federation para ser consumido pelo container.

- **Nome do micro frontend:** `cardapio`
- **Componente exposto:** `./Cardapio`
- **Arquivo remoto:** `static/chunks/remoteEntry.js`
- **Porta de desenvolvimento:** `3001`

## Funcionalidades

- Exibição dos itens do cardápio.
- Apresentação de imagens, nomes e descrições dos produtos.
- Adição de produtos ao pedido por meio de um evento personalizado (`adicionarPedido`).

## Estilização

O projeto utiliza CSS Modules para manter os estilos isolados nos componentes.

