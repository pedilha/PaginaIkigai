---
target: quem-somos.html
total_score: 27
p0_count: 1
p1_count: 1
timestamp: 2026-07-01T03-51-20Z
slug: quem-somos-html
---
#### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | O único affordance interativo real da página (hover cinza→cor nas fotos da equipe) nunca dispara porque não há `<img>` em nenhum dos 4 cards, só `<div>` placeholder. |
| 2 | Match System / Real World | 1 | "Membro da Equipe" / "Cargo" é copy literal de placeholder de dev, em produção. Timeline usa "O início" / "A filosofia" / "Hoje" em vez de anos reais — uma seção chamada `.timeline` não comunica cronologia nenhuma. |
| 3 | User Control and Freedom | 4 | n/a — sem formulários ou modais-armadilha; menu mobile abre/fecha limpo. |
| 4 | Consistency and Standards | 2 | `.hero__gradient` (linha 53) não tem nenhuma regra CSS correspondente em `style.css` — markup morto. O `index.html` usa o tratamento completo (`.hero__circles`/`.hero__glow`/`.hero__grid`); esta página e `servicos.html` não. O `.lang-switch` do header também some nesta página. |
| 5 | Error Prevention | 1 | Nada no processo impediu que duas bios placeholder duplicadas fossem ao ar. |
| 6 | Recognition Rather Than Recall | 4 | n/a — estado `.active` no nav, padrão consistente de section-label e footer tornam a navegação previsível. |
| 7 | Flexibility and Efficiency | 3 | `prefers-reduced-motion` implementado corretamente. Mas `data-i18n` e `.lang-switch` existem só no `index.html` — zero ocorrências em `quem-somos.html`/`servicos.html`. |
| 8 | Aesthetic and Minimalist Design | 3 | Ritmo de seções (dark→warm→dark→dark→laranja) respeita a regra de "nunca mais de 2 seções dark consecutivas". Confirmado por captura de tela: os 4 boxes "Foto" são retângulos escuros de baixo contraste sobre fundo dark — quase somem, mais um "buraco" no layout do que um placeholder óbvio. |
| 9 | Error Recovery | 4 | n/a — página estática de conteúdo, sem estados de erro possíveis. |
| 10 | Help and Documentation | 3 | Sem UI de ajuda dedicada necessária; link de WhatsApp no footer é um canal de suporte sempre visível e culturalmente adequado. |
| **Total** | | **27/40** | **Faixa: mediana-baixa — sistema visual disciplinado, execução de conteúdo inacabada** |

#### Anti-Patterns Verdict

**Parece "feito por IA"?** Não pelo sistema visual — pela lacuna de conteúdo, sim.

**Avaliação qualitativa (design director)**: Verificado via grep no CSS: zero `border-left`/`border-right` decorativos, zero gradient-text (`background-clip: text`), zero hero-metric template genérico ("10+ anos / 500 clientes"), zero bounce/elastic easing, glassmorphism restrito corretamente a header-scrolled e overlay mobile. Este é um sistema de design que **passa em todos os banimentos absolutos** do skill. O que quebra a credibilidade não é estética genérica — é que 2 dos 4 cards da equipe têm nome/cargo/bio literalmente placeholder duplicados (`"Membro da Equipe"` / `"Cargo"` / mesma frase genérica nos dois), e nenhum dos 4 cards — nem os dos fundadores reais — tem foto de fato. Numa página cujo propósito único é "conheça a equipe", isso lê como protótipo entregue sem terminar, independente de quão disciplinado seja o resto do sistema.

**Scan determinístico**: **Falhou, não por falta de tentativa.** `node detect.mjs --json quem-somos.html` retornou exit code 1 com `Error: bundled detector not found`. Investigação confirmou: o motor de detecção (`detect-antipatterns.mjs`) não existe em nenhum dos caminhos esperados nesta instalação do skill impeccable — é uma dependência ausente do pacote, não um problema da página. O mesmo motor ausente também quebrou a injeção do overlay `/detect.js` no navegador (404 "Not available"). Sem esse componente, não há achados automatizados nem overlay visual `[Human]` disponíveis nesta rodada — reportando isso como sinal de fallback, não como "página limpa".

**Evidência visual (screenshots capturados)**: Confirmado em desktop 1440px: sem overflow horizontal, sem erros de console, seções renderizam na ordem esperada (hero dark → "Nossa História" warm → "Nossa Equipe" dark → faixa CTA → footer laranja). Os 4 boxes "Foto" são de fato caixas escuras quase-pretas com texto "Foto" pequeno e claro centralizado — confirmando e agravando o achado de conteúdo inacabado: em vez de um placeholder óbvio, elas quase se camuflam no fundo dark. Em mobile (390px), a captura revelou um problema **não visível na leitura estática do código**: um vão vazio de aproximadamente 270px de preto entre o header e o headline do hero, antes do texto "QUEM SOMOS" aparecer. A captura da seção de equipe em mobile não pôde ser concluída (timeout da ferramenta de screenshot após 3 tentativas), então o comportamento mobile dos boxes "Foto" fica sem confirmação visual direta.

#### Overall Impression

O sistema de design está genuinely bem executado e autoral — a Ikigai não caiu em nenhum dos clichês de "agência genérica feita por IA". O problema real é que esta página específica foi publicada num estado de rascunho: metade da equipe é placeholder copiado e colado, nenhum dos fundadores reais tem foto, e o hero mais importante do site (a página que um cliente em potencial mais provavelmente usa para avaliar credibilidade) herdou um `div` de gradiente sem CSS correspondente enquanto a home ganhou o tratamento completo. A maior oportunidade não é redesenhar — é terminar o que já foi desenhado.

#### What's Working

1. **Ênfase tipográfica em vez de truque barato**: o headline do hero usa itálico Literata + laranja-brasa (`traduzir o <em>seu</em> ikigai... com <em>autenticidade</em>`) exatamente como a regra de ênfase do DESIGN.md manda — e evita o gradient-text banido. O próprio wordplay carrega a narrativa de ponte cultural em vez de copy genérica de agência.
2. **Disciplina de ritmo de seções**: confirmado tanto por leitura de código quanto por screenshot — a alternância dark→warm→dark→dark→laranja respeita a regra de nunca mais de 2 seções dark seguidas, e profundidade vem inteiramente de cor/opacidade, nunca de sombra, fiel à "Flat Stage Rule".
3. **Evitou o clichê óbvio de agência**: sem barra de estatísticas fake ("10+ anos / 500 clientes", o padrão mais comum de slop de agência), e o banner de fechamento usa uma citação de 3 linhas discreta em vez de um CTA genérico de banco de imagens — de fato alinhado com "confiança sóbria sobre efeito fácil".

#### Priority Issues

**[P0] Dois dos quatro cards da equipe são placeholder idêntico em produção**
**Por que importa**: contradiz diretamente a promessa central do PRODUCT.md de que cada cliente será tratado como "uma história única, não... mais um cliente" — se a agência não terminou a própria página da equipe, o argumento de credibilidade desmorona exatamente na página que existe para construí-lo.
**Fix**: publicar só os 2 cards completos e reais até que as próximas contratações estejam prontas. Um grid de 2 cards completo bate um grid de 4 cards que é 50% falso.
**Comando sugerido**: `/impeccable harden` (estados de conteúdo incompleto/edge cases de produção) ou `/impeccable clarify` (copy).

**[P1] Nenhuma foto funcional da equipe, incluindo os dois fundadores reais**
**Por que importa**: confirmado por screenshot — os 4 boxes "Foto" são retângulos escuros de baixo contraste que quase somem no fundo dark, em vez de placeholders óbvios. Numa página cujo propósito único é "conheça a equipe", zero rostos humanos reais é uma lacuna de credibilidade severa, exatamente para a persona que o PRODUCT.md nomeia (cliente avaliando credibilidade antes de pedir orçamento). O hover cinza→cor desenhado no CSS para as fotos nunca dispara, porque não há `<img>` nenhum.
**Fix**: adicionar fotos reais de Júlia e Luiz imediatamente — isso deveria bloquear o lançamento, diferente do problema de nome placeholder.
**Comando sugerido**: `/impeccable harden`.

**[P2] Hero quebrado em duas frentes: CSS morto no desktop, vão vazio no mobile**
**Por que importa**: `<div class="hero__gradient">` (linha 53) não tem nenhuma regra CSS correspondente em `style.css` — é markup morto, enquanto o `index.html` usa o tratamento visual de assinatura da marca (círculos animados laranja, glow radial, grid). Em mobile, a captura de tela mostrou ~270px de espaço preto vazio entre o header e o headline antes de qualquer conteúdo aparecer — um vão que a leitura estática do código não revelou. Duas das quatro páginas do site, incluindo a mais provável primeira parada real de um cliente em potencial, perdem o visual mais distintivo da marca.
**Fix**: dar ao `.hero__gradient` uma implementação real (variante mais discreta do glow) ou reaproveitar o markup de círculos/glow em heros de página interna; investigar e corrigir o vão vazio mobile (provavelmente `min-height: 75vh` combinado com padding/flow do conteúdo em telas estreitas).
**Comando sugerido**: `/impeccable adapt` (comportamento mobile) seguido de `/impeccable polish` (CSS morto/consistência visual).

**[P2] Nenhum CTA na página até o footer genérico**
**Por que importa**: diferente de `servicos.html` (CTA no hero + seção de CTA antes do footer), o hero de `quem-somos.html` não tem nenhum botão, e os únicos convites ("Fale com a gente" / "Solicite um orçamento") vivem no footer genérico da página, depois de história + equipe + banner. A página constrói confiança e nunca pede a ação no momento em que o interesse está no pico.
**Fix**: adicionar um bloco de CTA específico da página após o grid da equipe ou o banner (ex.: "Gostou da nossa história? Vamos criar a sua."), espelhando o padrão de CTA no meio da página já usado em `servicos.html`.
**Comando sugerido**: `/impeccable clarify` ou `/impeccable craft` (seção de CTA nova).

**[P3] i18n existe só na homepage**
**Por que importa**: zero atributos `data-i18n` e nenhum `.lang-switch` em `quem-somos.html`/`servicos.html`; nenhuma das duas carrega `js/i18n.js`. Um visitante que troca para EN na Home perde esse estado em toda outra página, sem forma de trocar de volta inline.
**Fix**: estender i18n para o site inteiro, ou remover o seletor de idioma da homepage até que o suporte completo exista — i18n parcial passa a impressão de mais quebrado do que nenhum.
**Comando sugerido**: `/impeccable harden`.

#### Persona Red Flags

**Cliente em potencial avaliando credibilidade antes de pedir orçamento**:
- O 3º e 4º card do `team-grid` ("Membro da Equipe" / "Cargo") leem como evidência de que o site — e por extensão a própria equipe da agência — não está terminado, exatamente no momento em que essa persona faz sua checagem de credibilidade.
- Os 4 boxes `team-member__photo` mostram texto placeholder "Foto" em caixas escuras de baixíssimo contraste — confirmado por screenshot — em vez de rostos reais; uma agência de marketing que não consegue mostrar as próprias fotos da equipe mina suas alegações de portfólio/produção.
- Os rótulos `.timeline__year` ("O início", "A filosofia", "Hoje") não dão nenhum ano concreto de fundação para quem tenta avaliar "há quanto tempo eles estão no mercado".
- Não existe nenhum botão "Solicite um orçamento" perto da seção de equipe — no momento em que a confiança atinge o pico, não há nada para clicar.

**Visitante mobile chegando de um link na bio do Instagram**:
- Confirmado por screenshot: ~270px de vazio preto antes do headline aparecer — um visitante de alta intenção e baixa paciência já perde parte do scroll inicial sem ver conteúdo algum.
- Em telas ≤480px (`.team-grid { grid-template-columns: 1fr }`), a ordem de leitura é Júlia → Luiz → "Membro da Equipe/Cargo" → um segundo bloco quase idêntico "Membro da Equipe/Cargo" logo em seguida — duplicação maximamente visível num scroll mobile de coluna única.
- O hero desta página não tem nenhum botão de CTA (diferente do hero de `servicos.html`), então esse visitante só recebe um headline e precisa rolar a página inteira antes de qualquer link acionável aparecer.
- O header desta página não tem `.lang-switch`, nem o overlay do menu mobile — um visitante vindo da home em EN volta silenciosamente para português sem forma de trocar.

**Visitante recorrente checando equipe/credenciais antes de uma call**:
- Como 2 dos 4 cards da equipe são placeholders não-funcionais, uma segunda visita semanas depois não traz informação nova — a página parece sem manutenção se os placeholders continuarem lá.
- Nenhuma data em lugar nenhum (rótulos vagos na timeline, `© 2026` fixo no footer desta página vs. `document.write(new Date().getFullYear())` dinâmico no `index.html`) torna impossível julgar se o conteúdo está atualizado ou parado no tempo.

#### Minor Observations

- Copyright do footer é fixo (`© 2026`) em `quem-somos.html`/`servicos.html`, mas gerado dinamicamente (`document.write(new Date().getFullYear())`) no `index.html` — vai ficar desatualizado silenciosamente nas páginas internas no próximo ano, enquanto a Home permanece correta.
- Divs decorativas do hero (`.hero__gradient`, `.hero__noise`) não têm `aria-hidden="true"`, diferente do equivalente em `index.html` (`.hero__grid`, `.hero__circles`, `.hero__glow` todos têm `aria-hidden="true"`) — pequena inconsistência de higiene de acessibilidade.
- Os 4 placeholders de `team-member__photo` usam `style="..."` inline duplicado em vez de uma classe CSS compartilhada — não é algo visível ao usuário, mas facilita que exatamente esse tipo de estado inacabado passe despercebido.
- O texto do banner ("Olhar para fora da janela. / Criar com autenticidade. / Impactar com propósito.") duplica verbatim o marquee da homepage — consistente com a marca, mas perceptível para quem navega as duas páginas em sequência.
- Sem overflow horizontal ou erros de console detectados em desktop 1440px durante a inspeção visual.

#### Questions to Consider
- Se dois dos quatro cards de "equipe" ainda são placeholder, um grid de 4 é realmente mais persuasivo que 2 pessoas reais e completas, com fotos e voz própria? O que "cada marca é tratada como um selo: singular, deliberado" significa se a própria página de equipe da agência publica bios duplicadas estilo Lorem Ipsum?
- A homepage ganhou o hero com direção de arte completa e o único seletor de idioma funcional; esta página ganhou uma `div` de gradiente morta e nenhum i18n. Foi um corte de escopo deliberado, ou o polimento simplesmente parou depois da Home? Dado que o PRODUCT.md diz que clientes avaliam credibilidade *antes* de pedir orçamento, "Quem Somos" não deveria ser tratada como a página norte, e não a Home?
- O melhor momento emocional da página é uma citação de fechamento discreta, bem onde a confiança atinge o pico — e depois ela entrega o leitor ao mesmo footer genérico usado em toda página. Como seria deixar "As pessoas" ou o banner *serem* o convite — um pedido específico e caloroso de Júlia e Luiz — em vez de adiar todo momento de conversão para os mesmos botões laranja repetidos em todo lugar?
