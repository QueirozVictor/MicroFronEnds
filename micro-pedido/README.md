# Micro Pedido - Micro Frontend

Micro frontend desenvolvido com Next.js e Module Federation, responsável por gerenciar os itens adicionados ao pedido, permitindo controlar quantidades e calcular o valor total.

## Tecnologias utilizadas

- Next.js 14.2.33
- React 18.3.1
- React DOM 18.3.1
- Webpack 5.95.0
- Module Federation 8.8.76
- CSS Modules

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

A aplicação será executada na porta 3002.

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

O componente `MicroPedido` é disponibilizado por meio do Module Federation para ser consumido pelo container.

- **Nome do micro frontend:** `pedido`
- **Componente exposto:** `./Pedido`
- **Arquivo remoto:** `static/chunks/remoteEntry.js`
- **Porta de desenvolvimento:** `3002`

## Funcionalidades

- Recebimento de produtos adicionados pelo cardápio.
- Gerenciamento da quantidade de cada item.
- Cálculo automático do valor total do pedido.

## Código e lógica

As funções, os estados e os métodos utilizados na lógica do componente estão explicados por meio de comentários diretamente no código-fonte, facilitando o estudo e a compreensão do funcionamento da aplicação.

## Estilização

O projeto utiliza CSS Modules para manter os estilos isolados dos demais micro frontends.
