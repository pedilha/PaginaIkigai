# Agência Ikigai

Site institucional da **Agência Ikigai**, uma agência boutique de branding e conteúdo que atua entre Brasil, Japão, Itália e Estados Unidos.

**🔗 [ikigaiagencia.com](https://ikigaiagencia.com)**

![Agência Ikigai](assets/og-image.png)

## Sobre o projeto

Site multilíngue (PT/EN/IT), com formulário de contato funcional, animações de scroll e uma identidade visual construída em torno do conceito "O Selo de Propósito", inspirado no hanko japonês — o selo pessoal que autentica com intenção.

Construído com HTML, CSS e JavaScript puros, sem framework e sem processo de build: uma escolha deliberada para um site institucional que não precisa de reatividade complexa, priorizando performance e simplicidade de manutenção.

## Stack

- **HTML/CSS/JavaScript** vanilla, sem framework nem bundler
- **i18n próprio**: traduções em arquivos JSON (`i18n/pt.json`, `en.json`, `it.json`), carregadas dinamicamente pelo JS, com paridade total de chaves entre os três idiomas
- **[Web3Forms](https://web3forms.com)**: backend do formulário de contato (o site é 100% estático, hospedado no GitHub Pages)
- **GitHub Pages** com domínio próprio, via `CNAME`

## Funcionalidades

- **Formulário de contato real**: envio via Web3Forms com estado de carregamento, tratamento de erro (com retry sem perder os dados digitados) e proteção anti-spam via honeypot
- **Multilíngue**: PT/EN/IT trocáveis em tempo real, sem recarregar a página
- **Animações**: scroll reveal via `IntersectionObserver`, headline com entrada palavra por palavra, marquee, cards com spotlight que segue o cursor — tudo respeitando `prefers-reduced-motion`
- **Responsivo**: cada seção da página de Serviços foi ajustada para caber numa tela de notebook sem precisar rolar; layout se reorganiza no mobile sem perder hierarquia
- **Imagens otimizadas**: `.webp` com fallback `.jpg` via `<picture>`, `lazy loading` onde faz sentido

## Design

Sistema de cores em OKLCH, tipografia editorial (Literata para títulos, Manrope para o corpo), paleta dark-premium com laranja brasa reservado para ações e afirmações. Documentado em [`DESIGN.md`](DESIGN.md) e [`PRODUCT.md`](PRODUCT.md).

## Estrutura

```
├── index.html            # Home
├── quem-somos.html       # Sobre / equipe
├── servicos.html         # Serviços
├── contato.html          # Contato (formulário)
├── css/style.css         # Estilos e design tokens
├── js/
│   ├── main.js           # Interações, animações, formulário
│   └── i18n.js           # Sistema de tradução
├── i18n/                 # Traduções (pt/en/it)
├── assets/                # Imagens e ícones
├── DESIGN.md              # Design system
└── PRODUCT.md             # Contexto de produto e marca
```

## Rodando localmente

Como não há build step, qualquer servidor estático funciona:

```bash
npx serve .
```

Depois é só abrir `http://localhost:3000`.

## Sobre este repositório

Projeto real de cliente, publicado aqui como peça de portfólio. Não é um template de uso livre.

---

Desenvolvido por [Pedro Wilian](mailto:pedrowilian13@gmail.com)
