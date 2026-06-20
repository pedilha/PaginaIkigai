---
name: Agência Ikigai
description: Marketing digital com propósito e autenticidade
colors:
  ember-orange: "#D96E30"
  ember-hover: "#C05A20"
  warm-night: "#1C1814"
  deep-stage: "#222028"
  midnight-card: "#272A30"
  warm-parchment: "#F0EDE6"
  aged-cream: "#E8E4DC"
  soft-cream: "#FAF8F4"
  light-text: "#EDE9E0"
  warm-ink: "#2C261E"
  muted-ash: "#9A9488"
  warm-muted: "#6B6358"
  check-green: "#3A8A5C"
  error-red: "#C04030"
  border-charcoal: "#3A3530"
  border-sand: "#D4CFC6"
typography:
  display:
    fontFamily: "Literata, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2.5rem, 1.5rem + 4.5vw, 5rem)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Literata, Georgia, serif"
    fontSize: "clamp(2rem, 1.4rem + 3vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.12
  body:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "clamp(1rem, 0.93rem + 0.35vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)"
    fontWeight: 600
    letterSpacing: "0.15em"
rounded:
  sm: "6px"
  md: "12px"
  lg: "20px"
  pill: "100px"
spacing:
  xs: "clamp(0.5rem, 1vw, 0.75rem)"
  sm: "clamp(0.75rem, 2vw, 1.25rem)"
  md: "clamp(1.5rem, 3vw, 2.5rem)"
  lg: "clamp(3rem, 6vw, 5rem)"
  xl: "clamp(5rem, 10vw, 9rem)"
components:
  button-primary:
    backgroundColor: "{colors.ember-orange}"
    textColor: "{colors.warm-night}"
    rounded: "{rounded.pill}"
    padding: "0.9rem 2.2rem"
  button-primary-hover:
    backgroundColor: "{colors.ember-hover}"
  button-outline:
    textColor: "{colors.light-text}"
    rounded: "{rounded.pill}"
    padding: "0.9rem 2.2rem"
  button-outline-hover:
    backgroundColor: "{colors.light-text}"
    textColor: "{colors.warm-night}"
  service-arrow:
    backgroundColor: "{colors.ember-orange}"
    textColor: "{colors.warm-night}"
    rounded: "50%"
    size: "48px"
  fan-card:
    backgroundColor: "{colors.midnight-card}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
  lang-switch:
    backgroundColor: "oklch(0.18 0.005 50)"
    rounded: "{rounded.pill}"
    padding: "3px"
---

# Design System: Agência Ikigai

## 1. Overview

**Creative North Star: "O Selo de Propósito"**

Inspirado no hanko japonês, o selo pessoal que autentica com intenção. O sistema visual da Ikigai trata cada marca como um selo: singular, deliberado, impresso com peso. O laranja brasa é a tinta; o dark é a superfície que recebe a impressão. Cada elemento carrega autoridade sem excesso.

A estética é dark-premium com acento laranja committed. Não é dark por tendência; é dark porque a Ikigai opera entre Brasil e Japão, e a escuridão é o palco onde a autenticidade de cada marca se destaca. O warm aparece como contraponto rítmico (seções de portfólio, formulário), quebrando a monotonia sem abandonar a sobriedade.

O sistema rejeita explicitamente: marketing genérico, gradientes neon, glassmorphism decorativo, layouts de template SaaS, paletas roxo/azul de IA. A Ikigai é uma agência com nome japonês que vive entre dois mundos; o visual reflete essa ponte, não copia nenhum dos lados.

**Key Characteristics:**
- Dark committed com laranja como cor de autoridade (30-40% da superfície em momentos-chave)
- Tipografia serif editorial (Literata) para headlines, sans humanista (Manrope) para corpo
- Ritmo de seções alternando dark/warm para respiração visual
- Animações com easing exponencial (ease-out-quart), sem bounce
- Ícones thin-line (stroke-width 1.5), consistentes em todo o sistema

## 2. Colors: A Paleta Brasa

A paleta opera em dois modos: dark (a base) e warm (o contraponto). O laranja nunca é decorativo; é a marca de autoridade que sela cada ação.

### Primary
- **Ember Orange** (`oklch(0.62 0.18 55)` / #D96E30 approx): A cor do selo. Botões CTA, setas de ação, indicadores ativos, footer inteiro. Committed: aparece como superfície completa no footer, não só como acento pontual.
- **Ember Hover** (`oklch(0.55 0.2 48)` / #C05A20 approx): Estado hover. Mais profundo, mais saturado. Acompanha glow sutil (`oklch(0.62 0.18 55 / 0.2)`).

### Neutral — Dark Mode
- **Warm Night** (`oklch(0.12 0.008 50)` / #1C1814 approx): Background principal. Tintado warm, nunca preto puro.
- **Deep Stage** (`oklch(0.15 0.01 50)` / #222028 approx): Surface variant. Usado na seção de serviços para separação sutil.
- **Midnight Card** (`oklch(0.17 0.012 240)` / #272A30 approx): Cards, containers elevados. Leve tint azulado para profundidade.
- **Border Charcoal** (`oklch(0.25 0.005 50)` / #3A3530 approx): Divisores, bordas sutis sobre dark.

### Neutral — Warm Mode
- **Warm Parchment** (`oklch(0.95 0.012 80)` / #F0EDE6 approx): Background da seção portfólio e formulário.
- **Soft Cream** (`oklch(0.98 0.006 80)` / #FAF8F4 approx): Inputs, campos de formulário.
- **Border Sand** (`oklch(0.85 0.01 80)` / #D4CFC6 approx): Bordas sobre warm.

### Text
- **Light Text** (`oklch(0.93 0.005 80)` / #EDE9E0 approx): Texto principal sobre dark. Tintado warm.
- **Warm Ink** (`oklch(0.18 0.008 50)` / #2C261E approx): Texto principal sobre warm.
- **Muted Ash** (`oklch(0.78 0.013 91)` / #9A9488 approx): Texto secundário sobre dark.
- **Warm Muted** (`oklch(0.42 0.01 50)` / #6B6358 approx): Texto secundário sobre warm.

### Semantic
- **Check Green** (`oklch(0.55 0.16 150)`): Checklists de serviços.
- **Error Red** (`oklch(0.55 0.2 25)`): Validação de formulário.

### Named Rules
**The Seal Rule.** Ember Orange é reservado para ações e afirmações. Nunca aparece como background de texto corrido, nunca como borda decorativa, nunca diluído em gradiente. Quando aparece, é deliberado.

## 3. Typography

**Display Font:** Literata (with Georgia, 'Times New Roman' fallback)
**Body Font:** Manrope (with system-ui fallback)

**Character:** Literata traz peso editorial sem ser pretensiosa; suas serifa variável e optical sizing dão caráter em qualquer tamanho. Manrope é a voz pragmática: humanista, legível, sem personalidade excessiva. O contraste serif/sans cria hierarquia imediata sem depender de peso ou cor.

### Hierarchy
- **Display** (400, `clamp(2.5rem, 1.5rem + 4.5vw, 5rem)`, 1.08): Hero headline. Peso leve, tamanho dominante. Itálico para ênfase em palavras-chave.
- **Headline** (700, `clamp(2rem, 1.4rem + 3vw, 3.75rem)`, 1.12): Títulos de seção. Bold, menor que display. Tracking -0.02em.
- **Title** (400, `clamp(1.5rem, 1.15rem + 1.75vw, 2.5rem)`, 1.2): Nomes de serviço, cards. Peso regular para não competir com headlines.
- **Body** (400, `clamp(1rem, 0.93rem + 0.35vw, 1.125rem)`, 1.6): Texto corrido. Manrope. Max 52ch para legibilidade.
- **Label** (600, `clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)`, tracking 0.15em, uppercase): Section labels, CTAs, nav links. Sempre Manrope, sempre uppercase.

### Named Rules
**The Weight Gap Rule.** Display é 400 (leve); Headline é 700 (bold). Nunca usar 500 ou 600 em headlines Literata; o contraste binário é intencional.

## 4. Elevation

O sistema é predominantemente flat. Profundidade é comunicada por cor (dark → surface → card) e opacidade, não por sombras. As únicas sombras são funcionais.

### Shadow Vocabulary
- **CTA Glow** (`0 10px 40px oklch(0.62 0.18 55 / 0.2)`): Hover de botões primários. Não é decorativa; é feedback tátil.
- **Service Arrow Glow** (`0 6px 24px oklch(0.62 0.18 55 / 0.2)`): Hover na seta do serviço.

### Named Rules
**The Flat Stage Rule.** Superfícies são flat por padrão. Glow aparece exclusivamente como resposta a interação (hover, focus). Nenhuma sombra em estado de repouso.

## 5. Components

### Buttons
- **Shape:** Pill (100px radius), padding generoso (0.9rem 2.2rem)
- **Primary (Ember):** Background `{colors.ember-orange}`, texto `{colors.warm-night}`. Confiante e direto. No hover: escurece para `{colors.ember-hover}`, lift -2px, glow laranja.
- **Outline:** Borda 1.5px `{colors.light-text}`, transparente. No hover: fill com texto invertido, lift -2px.
- **Active:** scale(0.96) para feedback tátil de pressão.
- **Focus:** Outline 2px `{colors.ember-orange}`, offset 3px.

### Service Item
- **Layout:** Grid de 3 colunas (número + corpo + CTA), separados por border-bottom 1px.
- **Número:** Literata 2xl, Ember Orange a 15% opacidade. Ícone SVG thin-line acima.
- **Hover:** Background sutil (`oklch(0.18 0.01 50)`), padding expande, número fica a 40%, descrição revela-se de `max-height: 0`, texto "Ver mais" surge com slide-in.
- **Seta:** Círculo 48px, Ember Orange sólido. Hover: rotação -45deg + scale 1.08 + glow.

### Fan Carousel (Depoimentos)
- **Cards:** Background `{colors.midnight-card}`, radius 20px, padding `{spacing.md}`. Dispostos em leque com rotação e escala decrescentes do centro.
- **Foto:** `aspect-ratio: 4/3`, `object-fit: cover`, radius 12px.
- **Quote:** Literata italic, aspas tipográficas em Ember Orange como `::before`.
- **Navegação:** Botões circulares 44px com border e backdrop-blur. Dots com escala animada no ativo.

### Sticky Gallery (Portfólio)
- **Layout:** Grid 3 colunas. Centro sticky (`top: var(--header-h)`, `height: calc(100vh - header)`). Laterais scrollam.
- **Imagens:** Radius 12px, hover scale 1.04. Alt text descritivo obrigatório.
- **Mobile:** 2 colunas, terceira escondida. Sticky mantido.

### Language Switcher
- **Shape:** Pill container com 3 botões internos. Ativo: Ember Orange fill. Inativo: transparente, texto muted.

### Navigation
- **Desktop:** Grid centralizado. Links uppercase, label size, tracking 0.1em. Underline laranja 2px no hover/active.
- **Mobile:** Overlay fullscreen com backdrop-blur 40px. Links em Literata xl bold. Hamburger com morphing X animado.
- **Header scroll:** Transparente → blur + border-bottom animado ao scrollar.

## 6. Do's and Don'ts

### Do:
- **Do** usar OKLCH para todas as cores. Tint neutrals com chroma 0.005-0.01 na direção do hue 50 (warm).
- **Do** alternar seções dark/warm para criar ritmo visual. Nunca mais de 2 seções dark consecutivas sem quebra.
- **Do** usar easing `cubic-bezier(0.16, 1, 0.3, 1)` para transições de saída e `cubic-bezier(0.32, 0.72, 0, 1)` para hover.
- **Do** manter ícones em stroke-width 1.5, sem fill, consistentes com Feather/Lucide-style.
- **Do** respeitar `prefers-reduced-motion` com fallback estático em todas as animações.
- **Do** usar `clamp()` para tipografia e espaçamento. Nunca breakpoints para font-size.

### Don't:
- **Don't** usar `#000000` ou `#FFFFFF`. Todo neutro é tintado warm.
- **Don't** usar gradient text (`background-clip: text`). Ênfase via cor sólida, peso ou itálico.
- **Don't** usar `border-left` ou `border-right` como stripe decorativa. Substituir por aspas tipográficas, números, ícones.
- **Don't** usar glassmorphism decorativo. Blur apenas em header scrollado e overlay de menu mobile.
- **Don't** usar bounce, elastic ou spring easing. Exponential out apenas.
- **Don't** usar gradientes neon, paletas roxo/azul de IA, ou estéticas genéricas de SaaS.
- **Don't** usar cards idênticos repetidos em grid. Variar layout, tamanho, ou usar lista com separadores.
- **Don't** usar Inter, Roboto, Poppins, DM Sans. A tipografia é Literata + Manrope; sem substituições.
- **Don't** animar `width`, `height`, `top`, `left`. Apenas `transform` e `opacity`.
