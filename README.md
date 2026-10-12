# 🍽️ Sistema de Pedidos — Micro Frontends

Projeto desenvolvido como exercício prático do curso de Front-End da EBAC, com o objetivo de aplicar os conceitos de **Micro Frontends**, utilizando Webpack Module Federation para integrar aplicações React independentes.

O sistema simula uma aplicação de pedidos composta por três projetos: uma aplicação principal (Container), um Micro Cardápio e um Micro Pedido.

> **🚀 Projeto publicado em produção**
>
> As três aplicações foram configuradas para funcionar integradas por meio de deployments na Vercel. As URLs utilizadas nas configurações atuais apontam para os ambientes publicados.
>
> **Para visualizar o projeto, utilize os endereços de produção.** Não é necessário executar as aplicações localmente para testar a versão publicada.

## 📌 Objetivos do projeto

- Dividir uma aplicação em três projetos independentes.
- Implementar comunicação entre microfrontends.
- Configurar o Webpack Module Federation para expor e consumir componentes React.
- Integrar os micros em uma aplicação principal.
- Utilizar carregamento assíncrono com `React.lazy` e `Suspense`.
- Trabalhar com publicação e integração de aplicações independentes.

## 🏗️ Arquitetura

O repositório está organizado como um monorepo, contendo três aplicações Next.js separadas.

```text
MicroFrontEnds/
├── container/
│   └── Aplicação principal
│
├── micro-cardapio/
│   └── Lista de produtos e ação de adicionar
│
├── micro-pedido/
│   └── Exibição e gerenciamento dos itens do pedido
│
└── README.md
```

### 1. Container

É a aplicação principal responsável por integrar os dois microfrontends.

Suas responsabilidades incluem:

- Consumir os componentes remotos configurados no Module Federation.
- Carregar o Micro Cardápio e o Micro Pedido.
- Utilizar `React.lazy` e `Suspense` para carregamento assíncrono.
- Apresentar os dois micros em uma única interface.

### 2. Micro Cardápio

Apresenta uma lista estática de produtos, contendo nome, descrição, imagem e valor.

Cada item possui um botão para adicionar o produto ao pedido.

O componente é exposto para consumo pela aplicação principal por meio do Webpack Module Federation.

### 3. Micro Pedido

Responsável por apresentar os produtos selecionados no cardápio e permitir o gerenciamento das quantidades.

Esse microfrontend recebe os eventos de comunicação enviados pelo Micro Cardápio e atualiza sua interface conforme os itens adicionados.

## 🔗 Comunicação entre os microfrontends

A comunicação entre o Micro Cardápio e o Micro Pedido é realizada por meio de eventos globais do navegador, utilizando a API `CustomEvent`.

Quando o usuário clica no botão de adicionar um produto, o Micro Cardápio dispara o evento `adicionarPedido`, enviando os dados do produto no campo `detail`.

Exemplo utilizado no projeto:

```js
window.dispatchEvent(
  new CustomEvent("adicionarPedido", {
    detail: p
  })
);
```

O Micro Pedido escuta esse evento e utiliza os dados recebidos para atualizar os itens e as quantidades exibidos na interface.

Essa abordagem permite que os dois microfrontends se comuniquem sem depender diretamente da implementação interna um do outro.

## 🛠️ Tecnologias utilizadas

- **React 18** — construção dos componentes e interfaces.
- **Next.js 14** — estrutura das aplicações, utilizando Pages Router.
- **Webpack Module Federation** — exposição e consumo de módulos remotos.
- **`@module-federation/nextjs-mf`** — integração do Module Federation com Next.js.
- **JavaScript** — lógica e comunicação entre aplicações.
- **CSS Modules** — organização e isolamento dos estilos dos componentes.
- **Vercel** — hospedagem e publicação das aplicações.
- **Git e GitHub** — versionamento e organização do monorepo.

## 🌐 Ambiente de produção

O projeto já foi publicado na Vercel. As aplicações são integradas por meio das URLs públicas configuradas nos respectivos projetos.

- **Micro Cardápio:** https://micro-cardapio-frontend.vercel.app/
- **Micro Pedido:** https://micro-pedido-khaki.vercel.app
- **Container:** https://micro-frontends-container.vercel.app/

Os endereços acima correspondem às URLs utilizadas durante a configuração do projeto. Caso algum domínio seja alterado, as referências correspondentes também deverão ser atualizadas.

### 🖼️ Observação sobre o carregamento das imagens

Neste projeto, as imagens do cardápio são hospedadas no domínio público do Micro Cardápio e consumidas pela aplicação principal (Container).

Como os caminhos relativos, por exemplo `/Pizza.webp`, são resolvidos a partir da raiz do domínio que está exibindo a página, os endereços das imagens precisam apontar para o domínio que efetivamente hospeda os arquivos quando os componentes são integrados pelo Module Federation.

Por esse motivo, a configuração atual prioriza o funcionamento integrado em produção. Ao acessar o Micro Cardápio separadamente, as imagens podem não ser carregadas corretamente caso os caminhos utilizados dependam do domínio do Container ou de configurações específicas da integração.

Essa particularidade faz parte da configuração atual do ambiente de produção e deve ser considerada caso o projeto seja adaptado para execução local ou para funcionar de maneira independente em diferentes domínios.

## ⚠️ Executar o projeto localmente

**Atenção:** este repositório está configurado para integrar aplicações publicadas em produção. Clonar o repositório e iniciar os projetos localmente não garante que a integração funcione automaticamente.

Para executar e testar tudo localmente, é necessário revisar e ajustar as configurações de cada aplicação.

Entre os pontos que precisam ser verificados estão:

1. **URLs dos remotes:** atualizar os endereços de produção definidos no `next.config.js` do Container para os endereços locais das aplicações correspondentes.
2. **Portas locais:** garantir que cada aplicação utilize uma porta diferente e que os endereços dos remotes correspondam às portas configuradas.
3. **Imagens:** atualizar os caminhos das imagens para que apontem para o ambiente correto. Imagens hospedadas no domínio de produção não passam automaticamente a utilizar o servidor local.
4. **`images.remotePatterns`:** revisar a configuração de domínios permitidos pelo Next.js para o carregamento de imagens externas.
5. **Module Federation:** verificar as configurações de exposição, consumo e carregamento dos módulos remotos em cada projeto.
6. **Dependências e scripts:** instalar as dependências de cada aplicação e confirmar que os scripts de desenvolvimento e build estão configurados corretamente para o sistema operacional utilizado.

As configurações de produção devem ser mantidas coerentes entre as aplicações. Alterar apenas uma URL sem atualizar as referências relacionadas pode interromper o carregamento dos componentes ou das imagens.

### Instalação das dependências

Caso queira preparar os projetos para execução local, entre em cada pasta e instale suas dependências:

```bash
cd micro-cardapio
npm install

cd ../micro-pedido
npm install

cd ../container
npm install
```

Antes de iniciar os servidores, revise as URLs dos remotes, as portas e as configurações de imagens descritas acima.

## 📚 Aprendizados

Este projeto permitiu praticar conceitos importantes de arquitetura front-end, como:

- Separação de responsabilidades entre aplicações independentes.
- Exposição e consumo de componentes remotos.
- Comunicação entre microfrontends por eventos globais.
- Carregamento assíncrono de componentes React.
- Configuração de aplicações Next.js com Pages Router.
- Integração e publicação de múltiplos projetos em um monorepo.

## 🎯 Conclusão

O projeto demonstra a aplicação prática de Micro Frontends por meio da divisão de uma aplicação de pedidos em três projetos independentes, integrados com Webpack Module Federation.

A implementação explora a composição de interfaces, a comunicação entre micros e a publicação dos projetos em ambientes separados, aproximando o exercício de cenários encontrados no desenvolvimento de aplicações front-end de maior escala.

Projeto desenvolvido para fins educacionais como parte das atividades do curso de Front-End da EBAC.