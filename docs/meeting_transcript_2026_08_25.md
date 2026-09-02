# Meeting Transcript: Plínio Benfica & Iágora Nogueira (Laboratório da Sobriedade)

**Date:** August 25, 2026  
**Duration:** 62 minutes  
**Host:** Daniel Queiroga (nhn.one.daniel.queiroga@gmail.com)  
**Participants:** Iágora Nogueira, Daniel Queiroga, Plinio Benfica  

---

## Executive Summary

- **Project Vision:** Digital platform for addiction recovery tracking and relapse prevention ("Prevenção de Recaída"), transitioning from fragmented Google Forms to an intelligent Web App with AI-driven SWOT and clinical analytics.
- **Target Audience:** Patients in addiction recovery (specifically focused on the critical first 8–12 months, with extensible long-term models).
- **Pilot Cohort:** Sabrina, Amanda, Emanuel (with 1+ month of historical data).

---

## Core Clinical Psychology & Methodology

### 1. Routine Patterns ("Padrões de Rotina")
- **Standard Normal Range:** 3 to 4 distinct routine patterns per week (e.g., Pattern A on Mon/Thu/Fri, Pattern B on Tue/Wed, Pattern C/D on weekends).
- **Risk Indicators:**
  - **Too Many (>5-6):** Sign of chaotic, disorganized life; high vulnerability to relapse.
  - **Too Few (<1-2 / identical daily):** Rigidity, stagnation, or lack of healthy stimulation.
- **Routine Drift / Rupture:** Adding unapproved tasks or dropping planned activities is a major predictor of relapse.
- **Planned vs Executed ("As-Built"):** The routine is co-created with the therapist, while the app tracks the real-world executed routine.

### 2. Pleasure vs Duty Scale ("Escala Prazer x Dever")
Measured across 3 daily shifts: **Manhã (Morning)**, **Tarde (Afternoon)**, **Noite (Night)**.
- **1, 2, 3:** Prazer (Pleasure - done because they enjoy it; 3 is maximum pleasure)
- **4:** Misto (Mixed Pleasure & Duty)
- **5, 6, 7:** Dever (Duty / Obligation - done out of necessity; 7 is maximum duty)
- **Clinical Trigger:** Severe skew towards Duty (5-7) without adequate Pleasure balance, or sudden perception flips of identical routine activities.

### 3. Analytics & AI Engine
- **SWOT Analysis:** Auto-generated weekly/monthly assessment of Strengths, Weaknesses, Opportunities, and Threats for the patient's routine stability.
- **Flexible Timeframes:** Dynamic filtering by 7 days, 15 days, 30 days, or custom ranges.
- **AI-Assisted Logging & Reflection:** Multi-model support (Gemini / Claude / Top Tier) for clinical reasoning and conversational data capture.

---

## Full Transcript

```
**Iágora Nogueira** (00:39)  
E aí.

**Daniel Queiroga** (01:12)  
E aí e aí Não, não.

**Daniel Queiroga** (03:10)  
E aí E aí Hey Fireflies.

**Daniel Queiroga** (03:54)  
Hey Fireflies.

**Daniel Queiroga** (03:58)  
Hey Fireflies, are you listening?

**Daniel Queiroga** (04:07)  
Are you there?

**Daniel Queiroga** (04:15)  
Hey Fireflies, are you there?

**Daniel Queiroga** (04:32)  
Hey Fireflies, are you listening?

**Daniel Queiroga** (04:39)  
Hey Fireflies.

**Daniel Queiroga** (05:03)  
Hey, Fireflies, are you there?

**Daniel Queiroga** (07:06)  
Legendas pela comunidade Amara.org E aí meu amigo, tá me ouvindo?

**Daniel Queiroga** (08:08)  
Tô.

**Plinio Benfica** (08:10)  
Tu mandou pro Iágora?

**Daniel Queiroga** (08:13)  
Mandei.

**Daniel Queiroga** (08:14)  
Mandei o link.

**Daniel Queiroga** (08:15)  
Mas hoje deu problema aqui na internet.

**Daniel Queiroga** (08:17)  
A gente não tá conseguindo nem trabalhar.

**Daniel Queiroga** (08:18)  
A gente tá só de vim e vim pro outro lugar.

**Plinio Benfica** (08:23)  
Porra, que onda.

**Daniel Queiroga** (08:25)  
Mas eu já coloquei o note taker aqui.

**Daniel Queiroga** (08:28)  
E ele tá anotando tudo agora que a gente tá conversando.

**Daniel Queiroga** (08:31)  
Pra gente depois não ter que revisar...

**Daniel Queiroga** (08:34)  
Voltar nos mesmos assuntos, já está tudo registrado, aí eu te passo uma cópia da arte de tudo.

**Plinio Benfica** (08:40)  
Tá bom.

**Daniel Queiroga** (08:43)  
Mas vamos lá, você quer construir, cara, uma infraestrutura para evoluir a forma de coleta de dados que está sendo feita hoje?

**Plinio Benfica** (08:55)  
Pois é, a gente começou a fazer isso numa coleta de dados no Google Forms, Só que depois descobrimos que o Google Forms não coletava os dados individualmente.

**Plinio Benfica** (09:21)  
Por exemplo, ele coleta de todas as segundas-feiras, de todas as terças, mas o nosso interesse é que ele colete de uma semana.

**Plinio Benfica** (09:30)  
Em dias separados, segunda, terça, quarta, quinta, sexta, sábado e domingo.

**Daniel Queiroga** (09:36)  
Entendi, o cara preenche o Google Form e ele cai como a data, se não fosse, ele não tá levando em consideração as datas, né?

**Plinio Benfica** (09:47)  
É, é isso.

**Plinio Benfica** (09:50)  
E o Iágora pode até te explicar melhor, mas deixa eu passar uma mensagem aqui pra ele rapidinho.

**Daniel Queiroga** (09:58)  
É, vê se ele entra online aí que a gente Coleta todos os juices, todos os dumps.

**Daniel Queiroga** (10:07)  
Cara, mas isso tá muito fantástico, Plinio.

**Daniel Queiroga** (10:12)  
Pelo amor de Deus.

**Daniel Queiroga** (10:13)  
Coloca uma IA na reunião e ela anota tudo, irmão.

**Plinio Benfica** (10:17)  
Sim.

**Daniel Queiroga** (10:17)  
Aí depois tu pega só a anotação e já transfere pra produção, a produção já entra.

**Daniel Queiroga** (10:23)  
Fantástico.

**Plinio Benfica** (10:24)  
Inclusive, a ideia é que, com os dados uma vez coletados, a gente faça um tratamento na IA.

**Daniel Queiroga** (10:33)  
Essa é a visão.

**Daniel Queiroga** (10:35)  
Justamente.

**Daniel Queiroga** (10:37)  
Pegar esses dados e a primeira camada é a capilaridade da percepção, ou seja, coleto dos dados.

**Daniel Queiroga** (10:46)  
Você vai coletar aqueles dados.

**Daniel Queiroga** (10:48)  
A segunda camada é a relação entre eles.

**Daniel Queiroga** (10:51)  
Como é que eu vou relacionar esses dados?

**Daniel Queiroga** (10:52)  
Que tipo de...

**Daniel Queiroga** (10:54)  
De análise a gente vai gerar a partir dessas coletas?

**Plinio Benfica** (10:58)  
Pois é, a gente bolou já uma análise, uma análise SWOT, para pegar os dados.

**Plinio Benfica** (11:06)  
Esse material todinho é, na verdade, prevenção de arrecaída.

**Plinio Benfica** (11:14)  
Então, a gente tem dividido em duas grandes partes.

**Plinio Benfica** (11:18)  
A primeira parte é relacionada a medir diariamente qual é a quantidade de prazer e dever que a pessoa tem de manhã, de tarde e de noite.

**Plinio Benfica** (11:35)  
Esse prazer é medido com uma pontuação, claro, e ele tem...

**Plinio Benfica** (11:44)  
Ele tem como parâmetro a rotina individual, quer dizer, nenhuma é igual à outra.

**Plinio Benfica** (11:56)  
Então, o que você faz de maneira?

**Plinio Benfica** (11:58)  
Eu acordo, aí vou trabalhar, vou deixar os meninos no colégio.

**Plinio Benfica** (12:02)  
Então, geralmente, as pessoas em recuperação têm...

**Plinio Benfica** (12:07)  
Isso aí foi uma coisa que descobri empiricamente, trabalhando há anos com dependência.

**Plinio Benfica** (12:13)  
As pessoas têm, em média, uma média que seria dentro de uma normalidade, três, no máximo quatro, padrões de rotina por semana.

**Plinio Benfica** (12:27)  
Então, o que ela faz segunda-feira?

**Plinio Benfica** (12:30)  
Ela pode repetir na quinta-feira e pode repetir na sexta.

**Plinio Benfica** (12:37)  
Terça-feira, ela faz uma coisa que talvez ela repita na quarta.

**Plinio Benfica** (12:43)  
E, assim, você tem rotinas individualizadas.

**Plinio Benfica** (12:49)  
Quando você tem um paciente.

**Daniel Queiroga** (12:51)  
Essa rotina, desculpa de interromper, essa rotina é declarada, a pessoa declara e ela atualiza o sistema, dizendo, ó, hoje eu fiz isso, aquilo outro, ela vai dizendo para o sistema o que ela está fazendo.

**Plinio Benfica** (13:04)  
Declarada, ela é construída numa reunião com o paciente.

**Plinio Benfica** (13:10)  
Ela vai sendo prospectada pelo terapeuta.

**Plinio Benfica** (13:16)  
E...

**Plinio Benfica** (13:17)  
Pessoas que têm muitas rotinas acima de 5, 6, vamos lá, é indício de uma vida desorganizada.

**Plinio Benfica** (13:29)  
Pessoas que têm muito poucas rotinas abaixo, 2, 1, ou uma rotina, todo dia é igual ao outro praticamente, só tem um dia que é diferente.

**Plinio Benfica** (13:39)  
Então, são rotinas que têm problemas também.

**Plinio Benfica** (13:45)  
Então, a gente tenta ver...

**Plinio Benfica** (13:46)  
Essa é a primeira parte da agenda, estabilizar a rotina.

**Daniel Queiroga** (13:52)  
Então, um pouco de rotina é um sinal negativo.

**Daniel Queiroga** (13:56)  
Muita rotina também é um sinal negativo.

**Plinio Benfica** (13:58)  
Exatamente.

**Daniel Queiroga** (13:59)  
Tem um ponto de equilíbrio, um sweet spot, como fala.

**Plinio Benfica** (14:03)  
E quando tem dentro de uma mesma rotina um excesso de dever, porque, por exemplo, deixar o filho no colégio num dia numa segunda-feira, pode ser um prazer.

**Plinio Benfica** (14:18)  
Na próxima segunda-feira a mesma atividade, deixar o filho no colégio, pode ser um dever.

**Daniel Queiroga** (14:26)  
Mas então ele vai declarar esse dever e prazer depois do executado?

**Plinio Benfica** (14:31)  
Depois do executado, diariamente, ele vai dando nota para aquela rotina que ele construiu.

**Daniel Queiroga** (14:37)  
Certo.

**Plinio Benfica** (14:38)  
E a segunda coisa é ver quando é que ele quebra essa rotina.

**Plinio Benfica** (14:43)  
Quando ele começa a fazer coisas a mais ou a menos daquilo que ele construiu, que também é um preditor de recaídas.

**Plinio Benfica** (14:54)  
Então, é em cima dessas duas vertentes que rola essa agenda.

**Daniel Queiroga** (15:02)  
A análise, não é?

**Daniel Queiroga** (15:03)  
Então, o primeiro passo agora era fazer uma análise dessa estrutura e colocá-la em funcionamento.

**Plinio Benfica** (15:11)  
Sim, acho que o Iágora te mandou, não sei se ele te mandou, um modelo que a gente fez.

**Plinio Benfica** (15:18)  
O que a gente estava usando, está usando com os pacientes.

**Plinio Benfica** (15:26)  
Até agora, isso tem ajudado os pacientes, mesmo sem a utilização da análise, porque eles vão entrando em contato diariamente com a rotina deles.

**Plinio Benfica** (15:39)  
E aí eles vão vendo.

**Plinio Benfica** (15:40)  
Pô, hoje eu não fiz isso.

**Plinio Benfica** (15:42)  
Não, hoje está legal.

**Plinio Benfica** (15:44)  
Eu fiz tudo da minha rotina.

**Plinio Benfica** (15:45)  
Tudo que eu planejei, eu cumpri.

**Plinio Benfica** (15:47)  
Então, nesse ponto ela funciona, mas ela não vai além disso.

**Plinio Benfica** (15:52)  
E se a gente...

**Plinio Benfica** (15:54)  
Uma coisa que.

**Daniel Queiroga** (15:55)  
A gente identificou aqui no laboratório, quando a gente está desenvolvendo o nosso tutor e mentor, é o planejado e o executado, entendeu?

**Plinio Benfica** (16:05)  
Exatamente.

**Daniel Queiroga** (16:06)  
Então, o que a gente está...

**Daniel Queiroga** (16:08)  
Trabalhando agora é pra capturar, pra registrar o executado e o planejado ele ficar em paralelo porque a gente entendeu que no ser humano especialmente quando a gente fala de estrutura social e arquitetura social e coloca o elemento ser humano, né?

**Daniel Queiroga** (16:28)  
A maior parte da nossa vida não é planejada, é simplesmente vivida, entendeu?

**Daniel Queiroga** (16:33)  
E aí a gente tá se esforçando agora pra que o sistema Entenda o que está sendo vivido.

**Daniel Queiroga** (16:40)  
Registre o vivido, entendeu?

**Daniel Queiroga** (16:42)  
Tipo como tem o RAS Build, eu não sei se você já viu essa expressão.

**Daniel Queiroga** (16:46)  
Quando a gente constrói um software, a gente faz o planejamento, mas tem o RAS Build.

**Daniel Queiroga** (16:51)  
Na construção civil também tem o RAS Build, né?

**Daniel Queiroga** (16:53)  
Como foi planejado e como foi construído.

**Daniel Queiroga** (16:56)  
Então a gente percebeu a necessidade agora, e a gente está trabalhando nisso, de tokenizar essa existência toda e passar a ter uma percepção dessas rotinas de uma forma, vamos dizer assim, automática, o sistema automaticamente vai percebendo o que você está fazendo e já vai entregando essa formulação, e por isso que eu te perguntei se era declarado, já sem a necessidade da declaração, porque ele já conseguiu, por alguma forma que a gente deu de câmera, áudio, acesso ao sistema, saber o que foi executado por aquela pessoa.

**Daniel Queiroga** (17:33)  
Lógico que o declarado vai entrar nessa mistura também, e aí a gente vai fazer eles se conversarem de uma forma mais eficiente entre aquilo que a gente planejou e aquilo que a gente realizou, porque é em cima do realizado que a gente pode criar os novos planejamentos e ajustes que a gente julga necessários.

**Plinio Benfica** (17:55)  
Pois é, e em cima do realizado é que ele pode avaliar, que é uma coisa que eu acho que não dá para ser automatizada, em cima do realizado é que dá para ele avaliar o tanto que ele teve de prazer, se aquela atividade foi prazer ou dever.

**Plinio Benfica** (18:13)  
Só que eu me esqueci de falar, a definição de atividade de prazer é uma atividade que você faz porque gosta, e atividade de dever é aquela atividade que você faz porque tem que fazer.

**Daniel Queiroga** (18:26)  
Mas ele pode declarar isso antes ou depois, entendeu?

**Plinio Benfica** (18:29)  
E tem o misto também, uma atividade que às vezes é o misto.

**Plinio Benfica** (18:32)  
Ele tem que declarar isso diariamente.

**Daniel Queiroga** (18:38)  
E seria interessante ele declarar níveis também, né?

**Daniel Queiroga** (18:41)  
Tipo, prazer, nível de 0 a 1 ou de 0 a 10.

**Plinio Benfica** (18:45)  
Isso já está definido.

**Plinio Benfica** (18:47)  
A gente já tem essa...

**Plinio Benfica** (18:49)  
1, 2, 3, Prazer.

**Plinio Benfica** (18:53)  
4 É misto, prazer e dever.

**Plinio Benfica** (18:56)  
5, 6, 7, DV.

**Plinio Benfica** (19:00)  
Tá?

**Plinio Benfica** (19:01)  
O máximo de DV é 7, o máximo de prazer é 3.

**Plinio Benfica** (19:04)  
E 4 é o misto entre os dois.

**Plinio Benfica** (19:07)  
A gente já tem isso definido.

**Plinio Benfica** (19:10)  
Isso foi até pego de um trabalho de prevenção de...

**Plinio Benfica** (19:15)  
De regularidade que elas são.

**Plinio Benfica** (19:18)  
Deixa eu dar um cutucado aqui no...

**Plinio Benfica** (19:28)  
Vou mandar esse link pra ele.

**Daniel Queiroga** (19:32)  
Pode mandar.

**Daniel Queiroga** (19:37)  
Hey Fireflies, como tá a reunião até agora?

**Daniel Queiroga** (19:48)  
Mandei.

**Plinio Benfica** (20:02)  
Então é isso, o que tu acha?

**Daniel Queiroga** (20:04)  
Eu acho que a gente tá bem no momento agora de fazer isso porque a tecnologia virou e tá na hora de fazer, ok?

**Daniel Queiroga** (20:12)  
Vamos fazer, colocar em produção e já ir fazendo os ajustes de acordo com o andamento da coletiva dos dados, entendeu?

**Daniel Queiroga** (20:22)  
A possibilidade que a gente tem hoje...

**Daniel Queiroga** (20:24)  
E aí agora, tudo bom, mano?

**Daniel Queiroga** (20:26)  
A possibilidade...

**Daniel Queiroga** (20:28)  
Beleza.

**Daniel Queiroga** (20:29)  
A possibilidade que a gente tem hoje são imensas.

**Daniel Queiroga** (20:32)  
A capacidade de produzir um sistema bem mais ativo e mais participativo no quadro geral é real, é entregável já.

**Daniel Queiroga** (20:46)  
Não há tecnologia que vai surgir, já existe.

**Daniel Queiroga** (20:50)  
É só a gente ir construindo e fazendo essa lapidação, esse moldar dessa estrutura, ir testando e validando.

**Daniel Queiroga** (20:57)  
Isso mesmo.

**Plinio Benfica** (20:58)  
E com a parte, por exemplo, a gente pega os dados coletados, a gente pensa em trabalhar com dados semanais.

**Daniel Queiroga** (21:15)  
Para coleta ou para análise?

**Plinio Benfica** (21:20)  
Para análise.

**Daniel Queiroga** (21:22)  
Para coleta tem que ser, não é?

**Plinio Benfica** (21:23)  
Análise de um período de tempo semanal.

**Daniel Queiroga** (21:28)  
Sim, mas lá dentro a gente vai poder filtrar por semana, por duas semanas, por quinze dias, por sete, por oito dias.

**Daniel Queiroga** (21:36)  
A gente vai ter uma possibilidade de filtrar de N formas esse dado e fazer essa análise e consolidar ela para que ela vire um registro consolidado dentro do sistema.

**Daniel Queiroga** (21:45)  
Então, assim, vai ser possível fazer de uma semana, de um mês, de quinze dias.

**Daniel Queiroga** (21:50)  
Não vai ter nenhuma limitação com relação a isso, já que o registro é diário.

**Daniel Queiroga** (21:56)  
E a consulta é por nossa conta, a gente vai lá e paga a consulta.

**Plinio Benfica** (22:01)  
A gente fez um teste, pegando...

**Plinio Benfica** (22:05)  
A gente tem a limitação do Google Meet, do Google...

**Plinio Benfica** (22:10)  
Forms.

**Plinio Benfica** (22:12)  
Forms, que ele só manda os dias definidos, não é, Iágora?

**Plinio Benfica** (22:19)  
Ele só manda só segunda-feira, ele manda todas as segundas-feiras, só as segundas feiras de todos os pacientes, não é isso?

**Iágora Nogueira** (22:30)  
Todas as respostas de segunda-feira.

**Iágora Nogueira** (22:33)  
Então, se o paciente respondeu durante seis meses a segunda-feira ele vai dar um documento, todas essas respostas durante esses seis meses.

**Daniel Queiroga** (22:46)  
Na nossa plataforma não vai ter esse problema, porque a gente vai ter a temporalidade lá e o recurso pra filtro, né?

**Daniel Queiroga** (22:55)  
Dizer pra ele, olha, eu quero analisar do período selecionado, que a gente chama, né?

**Daniel Queiroga** (22:59)  
Então a gente vai dar um período selecionado e ele vai fazer análise em cima daquele período.

**Daniel Queiroga** (23:05)  
A gente vai poder fazer uma análise de uma semana e fazer uma análise logo em seguida de um mês ou fazer análise de um dia, do período que a gente selecionar pra análise.

**Daniel Queiroga** (23:15)  
O sistema já vai entregar esse filtro, essa segmentação do dado.

**Daniel Queiroga** (23:21)  
Vamos analisar esse período específico.

**Daniel Queiroga** (23:23)  
Não vai ser um problema porque o Google Forms não tem uma inteligência integrada.

**Daniel Queiroga** (23:28)  
Apesar de ele registrar tudo, ele deixa disponível para consulta posterior, para quem criou o formulário, mas ele não entrega nenhuma inteligência agregada.

**Daniel Queiroga** (23:39)  
Acredito eu que hoje o Gemini já esteja integrado, de alguma forma, com o Google Forms, eu teria que validar, mas, para o que a gente vai fazer, as inteligências que a gente...

**Daniel Queiroga** (23:51)  
São indicadas, são as top tiers, né?

**Daniel Queiroga** (23:54)  
Tipo um iCloud, um chat GPT da vida, para a gente ter o melhor resultado, entendeu?

**Plinio Benfica** (24:00)  
Ok, a gente pegou os resultados parciais que a gente coletou, por um período, E a gente jogou em cima do Maia, do Gemi, do Gemini e fez um prompt daquilo que a gente queria e o resultado foi excelente, cara.

**Plinio Benfica** (24:25)  
Muito bom.

**Daniel Queiroga** (24:26)  
É, muito bom.

**Daniel Queiroga** (24:27)  
O resultado é fantástico.

**Daniel Queiroga** (24:29)  
É fantástico.

**Daniel Queiroga** (24:30)  
Eles estão cada vez melhores, entendeu?

**Daniel Queiroga** (24:32)  
O Gemini já entrega muito, entrega bastante.

**Daniel Queiroga** (24:36)  
Mas a Cláudia é chata, irmão.

**Daniel Queiroga** (24:39)  
Ela te questiona, ela te diz, olha, tá errado aqui, tá errado ali, isso aqui vai dar ruim ali.

**Daniel Queiroga** (24:44)  
E aí tem a hora que eu até falo, não vou mandar pra Cláudia que ela já vai me arrumar mais trabalho, entendeu?

**Daniel Queiroga** (24:50)  
Porque o que ela fala tem uma coerência epistemológica muito forte, entende?

**Daniel Queiroga** (24:56)  
E eles são muito...

**Daniel Queiroga** (24:58)  
A equipe dela é muito pautada em paper científico, no trabalho científico.

**Daniel Queiroga** (25:06)  
Tudo deles é bem no detalhe da ciência.

**Daniel Queiroga** (25:09)  
Então, se a gente quer um negócio legal, eu não diria nem para a gente limitar a uma inteligência, a plataforma.

**Daniel Queiroga** (25:17)  
Mas a cloud, ela tem que estar ali dentro do nosso ambiente para a gente ter, às vezes, a opinião de uma, duas ou três inteligências.

**Daniel Queiroga** (25:26)  
A gente está construindo uma mesa agora com oito inteligências integradas, entendeu?

**Plinio Benfica** (25:32)  
Porra, top.

**Plinio Benfica** (25:33)  
Agora...

**Plinio Benfica** (25:35)  
Me dá um passo a passo, me dá uma ideia de custos disso?

**Daniel Queiroga** (25:43)  
Cara, é custo de hora, técnica de trabalho, né?

**Daniel Queiroga** (25:48)  
Ali eu vou ter que fazer uma estimativa de quantas horas a gente vai dedicar para o projeto, mas inicialmente a gente pode fazer um esboço para chegar nesse número, né?

**Daniel Queiroga** (25:58)  
Eu não teria um número imediato para te falar agora aqui de bate-pronto, porque demanda a gente abrir um pouco o projeto e já trabalhar um pouco nele para ver como é que isso vai se desdobrar nesse consumo de horas, entendeu?

**Daniel Queiroga** (26:11)  
Dentro do laboratório.

**Daniel Queiroga** (26:14)  
Então, a gente precisaria primeiro fazer essa primeira camada de uma prototipagem inicial para a partir disso começar a falar de valores, entendeu?

**Plinio Benfica** (26:25)  
Entendo.

**Daniel Queiroga** (26:26)  
Porque aí a gente tem dois caminhos, né?

**Daniel Queiroga** (26:28)  
A gente pode executar ou a gente pode instruir.

**Daniel Queiroga** (26:34)  
Num, você vai gastar mais horas ali no início para aprender, mas vai ficar livre para fazer os trabalhos de vocês.

**Daniel Queiroga** (26:41)  
No outro, a gente vai entregar mais rápido, mas as autenticações, as alterações e tudo vão ficar na dependência de nossas horas diretas investidas.

**Daniel Queiroga** (26:51)  
Eu acho que talvez um híbrido dos dois seja um cenário interessante, mas levar isso para decupar, para desmontar dentro do laboratório e ver o que é estruturalmente e como se desdobra, é o primeiro passo para a gente poder chegar a falar de números financeiros sobre isso.

**Plinio Benfica** (27:14)  
Entendi, entendi.

**Daniel Queiroga** (27:16)  
Entendeu?

**Daniel Queiroga** (27:17)  
Então, dessa reunião agora que a gente está fazendo, eu já vou fazer um protótipo inicial, vou te mostrar, e aí a gente consegue falar de quanto seria investido e de que forma seria esse investimento, para vocês absorverem logo.

**Daniel Queiroga** (27:33)  
A operação ou se a gente vai fazendo uma operação em conjunto até o momento que vocês tomam autonomia e já conduzem as atividades, entende?

**Daniel Queiroga** (27:41)  
Porque é possível, não é nada muito fora da caixa, é só mais uma questão de mudança de percepção, porque a tecnologia já está disponível, é só fazer o chaveamento mental, entendido?

**Plinio Benfica** (27:57)  
Entendo.

**Plinio Benfica** (28:00)  
Perfeito.

**Plinio Benfica** (28:02)  
Perfeito.

**Plinio Benfica** (28:02)  
Quer falar alguma coisa, Iágora?

**Iágora Nogueira** (28:04)  
Eu não peguei o começo, mas seria algo parecido com um aplicativo?

**Daniel Queiroga** (28:13)  
Hoje a gente chama de plataforma web.

**Daniel Queiroga** (28:16)  
A gente começa construindo uma web app, que a gente chama, para você ir logo para a parte do aplicativo.

**Daniel Queiroga** (28:23)  
O aplicativo demanda uma segunda camada de autorizações mais burocrática, entendeu?

**Daniel Queiroga** (28:31)  
Um aplicativo autorizado na Apple Store ou na Play Store tem que passar por um processo de autorização para publicação.

**Daniel Queiroga** (28:40)  
A gente pode fazer os aplicativos que não precisa publicar, que instala o APK que chama, né, de direto, o arquivo, dá para fazer, mas só atende Android, entendeu?

**Daniel Queiroga** (28:51)  
Então, se a pessoa for usar um iPhone, ela não vai conseguir ter esse acesso.

**Daniel Queiroga** (28:56)  
Então, a gente acha mais prudente iniciar todo o projeto e dar vida a ele na estrutura de webapp.

**Daniel Queiroga** (29:03)  
E como é que é a estrutura de webapp?

**Daniel Queiroga** (29:05)  
É só um URL.

**Daniel Queiroga** (29:06)  
O cara entrou na URL, o universo tá ali dentro, entendeu?

**Daniel Queiroga** (29:09)  
Logo ele vê o navegador e aí ele já começa a trabalhar.

**Daniel Queiroga** (29:13)  
Quando chegar na maturidade, que a gente fala, beleza, isso aqui tá um stable version, né, como diz.

**Daniel Queiroga** (29:20)  
Aí a gente já vai pra fazer um aplicativo, pra transformar aquilo num aplicativo, mas ele já tá com a maturidade suficiente pra gente não ter que ficar dando um update novo toda semana, entendeu?

**Iágora Nogueira** (29:32)  
Perfeito, entendi.

**Iágora Nogueira** (29:34)  
Uma outra questão, Daniel, é a questão do envio, tá sendo manual hoje em dia, né?

**Iágora Nogueira** (29:42)  
Todo final de dia eu encaminho o link do Formis pra cada paciente, aí nesse projeto seria automatizado?

**Daniel Queiroga** (29:49)  
Totalmente, totalmente.

**Daniel Queiroga** (29:51)  
Ele vai falar com a IA, ele não vai...

**Daniel Queiroga** (29:53)  
Ele vai ter a parte onde ele preenche, e esse preenchimento ele vai poder fazer diretamente no diálogo com a IA.

**Daniel Queiroga** (30:03)  
A questão é que ele teria algum.

**Iágora Nogueira** (30:06)  
Estímulo para ser lembrado durante o dia?

**Daniel Queiroga** (30:10)  
Pois é, aí nesse ponto que o aplicativo tem um papel muito forte, porque o aplicativo permite que a gente faça essas notificações.

**Daniel Queiroga** (30:21)  
O web app não vai te dar esse recurso.

**Daniel Queiroga** (30:24)  
Mas o que a gente faz?

**Daniel Queiroga** (30:25)  
A gente conecta na agenda do cara, entendeu?

**Daniel Queiroga** (30:28)  
Então, a notificação vem pela agenda dele.

**Daniel Queiroga** (30:32)  
Ele faz toda a interação ali.

**Daniel Queiroga** (30:35)  
A ligação com a agenda manda os compromissos lá.

**Daniel Queiroga** (30:38)  
Quando for duas horas da tarde, no dia tal, ele já recebe aquela notificação dentro dos parâmetros da agenda dele de pré-anúncio, né?

**Daniel Queiroga** (30:47)  
Tipo, uma hora antes, 30 minutos antes, ele já vai ser notificado.

**Daniel Queiroga** (30:51)  
Então essa ligação com a agenda, ela vai servir para o sistema como um todo, na operação geral, e ela serve para a gente nessa etapa de web app como função de notificação, para notificar o cara das atividades que ele tem que fazer, entendeu?

**Iágora Nogueira** (31:09)  
Precisa fazer, né?

**Iágora Nogueira** (31:10)  
Ah, então perfeito.

**Iágora Nogueira** (31:12)  
Perfeito.

**Plinio Benfica** (31:13)  
Sim, perfeito.

**Iágora Nogueira** (31:16)  
Aí, para a gente fazer uma avaliação atual, por exemplo, acabou amanhã mesmo, ele é notificado.

**Iágora Nogueira** (31:25)  
Acabou a tarde, notificado, acalmado.

**Plinio Benfica** (31:27)  
Em vez de fazer só no final do dia.

**Iágora Nogueira** (31:29)  
Agora, no final do dia, fica retrospectivo, uma coisa mais atual.

**Daniel Queiroga** (31:33)  
Sim, a gente deixa o recurso lá da inteligência e ele vai fazendo o que a gente chama de dumping, porque o que acontece?

**Daniel Queiroga** (31:44)  
Então você tem que preencher formulário e escrever tudo certinho, de um jeito e tal.

**Daniel Queiroga** (31:48)  
Dá mais trabalho do que você só falar com a inteligência, né?

**Daniel Queiroga** (31:52)  
Você fala assim, ó, eu fui lá de manhã, levei meu filho pra escola às oito horas, depois eu tomei um café, depois eu fiz não sei o quê.

**Daniel Queiroga** (31:58)  
Ah, mas antes disso eu fui no mercado e depois daquilo...

**Daniel Queiroga** (32:02)  
E aí você vai falando, né?

**Daniel Queiroga** (32:03)  
E ela vai anotando tudo.

**Daniel Queiroga** (32:05)  
E aí ela pega e organiza, entendeu?

**Daniel Queiroga** (32:07)  
Fala, ó, belezinha, pega e organiza.

**Plinio Benfica** (32:08)  
Tem que digitar, né?

**Daniel Queiroga** (32:10)  
É, e aí logo...

**Daniel Queiroga** (32:13)  
No web app, quando ele entrar no ambiente, se ele já tem um compromisso de responder de acordo com horários específicos, já vai estar lá se ele está em dias ou se ele está em débito, entendeu?

**Daniel Queiroga** (32:26)  
E aí, se ele está em débito, ele vai lá e aperta e responde e faz os registros manuais, vamos dizer assim, os registros Como foi aquela palavra que eu te falei?

**Daniel Queiroga** (32:44)  
O registro que a pessoa faz manualmente, né?

**Daniel Queiroga** (32:46)  
Que ela vai lá e insere manualmente os dados pra dizer o que tá acontecendo.

**Daniel Queiroga** (32:50)  
Porque eu tava explicando pro Plínio, Iágora, antes de tu chegar, que a gente tá desenvolvendo uma estrutura de tutoria e mentoria.

**Daniel Queiroga** (33:01)  
E quando a gente chegou na fase do planejamento, a gente percebeu que a maior parte do dia da pessoa não é planejado, entendeu?

**Daniel Queiroga** (33:11)  
E mesmo quando você planeja, muitas coisas saem fora do que você planejou.

**Daniel Queiroga** (33:17)  
Então a gente chama isso de o executado.

**Daniel Queiroga** (33:19)  
Dentro da construção civil, eles chamam de hass build, né?

**Daniel Queiroga** (33:24)  
É como foi construído.

**Daniel Queiroga** (33:26)  
A gente vê como foi planejado e como foi construído, então a inteligência passar a perceber o que está sendo executado, está sendo o nosso desafio agora.

**Daniel Queiroga** (33:36)  
A gente está dando câmera, áudio e agora vai dar a percepção de tela, né?

**Plinio Benfica** (33:40)  
A gente tem uma diferença para esse outro projeto que está fazendo, Daniel, porque, na verdade, o fato do paciente se esforçar para manter uma agenda previamente planejada, faz parte do próprio tratamento.

**Daniel Queiroga** (34:11)  
Sim, eu entendo.

**Daniel Queiroga** (34:12)  
Na realidade, o que a gente está conversando aqui é uma dinâmica, e a gente vai utilizar essa dinâmica.

**Daniel Queiroga** (34:19)  
Isso vai ser respeitado, não é um mal.

**Daniel Queiroga** (34:22)  
Mas é porque o nosso projeto já está numa realidade mais ampla, ele não é só para adictos, entendeu?

**Daniel Queiroga** (34:27)  
Ele é para qualquer pessoa que queira...

**Daniel Queiroga** (34:29)  
Eu acho que o adicto também vai poder se servir dessa plataforma, mas vocês estão criando dentro dela como uma espécie de função que é para uma atividade específica.

**Daniel Queiroga** (34:47)  
Então, a gente construir essa função dentro da atividade específica de que você já tem mapeada, faz total sentido para a gente alcançar o resultado, já que a nossa proposta é uma granularidade que vai ser pessoa por pessoa, indivíduo por indivídua, entendido?

**Plinio Benfica** (35:05)  
Sim, é verdade.

**Plinio Benfica** (35:07)  
É bem muito mais individualizado.

**Plinio Benfica** (35:11)  
A proposta é que isso sirva basicamente para pessoas no primeiro ano de recuperação.

**Plinio Benfica** (35:19)  
8 Meses no primeiro ano desse período.

**Daniel Queiroga** (35:26)  
Mas aí depois não dá para continuar de outra forma depois desse período?

**Plinio Benfica** (35:30)  
Pois é, depois desse período talvez a gente utilize o que tu já está montando aí, o que tu foi e é uma coisa mais aberta.

**Plinio Benfica** (35:39)  
Mais flexível, porque, na verdade, é o processo de recuperação, ele começa um pouco mais engessado e vai abrindo, porque a vida vai abrindo.

**Daniel Queiroga** (35:54)  
Sim, ele vai mudando.

**Daniel Queiroga** (35:55)  
E aí tem um outro ponto que é interessante, né, Plinio?

**Daniel Queiroga** (35:58)  
A gente criar as métricas, e as métricas gerarem os números da análise, e o cara não vai só simplesmente ele vai performar pelo tempo que ele tá no sistema, ele vai performar pelos números que ele gerou ali no sistema também.

**Plinio Benfica** (36:16)  
Sim, por outros parâmetros que não seja só um tempo.

**Plinio Benfica** (36:20)  
Não é porque eu tenho 8 meses, não é porque eu tô há 9 meses, não é porque o meu padrão de de rotina, e foi se alterando.

**Plinio Benfica** (36:34)  
Passei na faculdade, arranjei um emprego, tenho uma namorada, ou deixei, ou separei.

**Plinio Benfica** (36:43)  
Enfim, são as mudanças que...

**Plinio Benfica** (36:46)  
E aí.

**Daniel Queiroga** (36:46)  
Você consegue pôr em conta.

**Daniel Queiroga** (36:48)  
Um vai levar os escolhes e vai relacioná-los.

**Daniel Queiroga** (36:52)  
Essa é a maravilha da ciência de dados.

**Daniel Queiroga** (36:57)  
Ciência de análise de dados.

**Plinio Benfica** (36:58)  
A vida, né?

**Plinio Benfica** (36:59)  
Ela se aproxima mais da vida.

**Daniel Queiroga** (37:03)  
É, mas a questão é que a gente vai encontrar padrões diversos, né?

**Daniel Queiroga** (37:07)  
E a partir desses padrões encontrados, a gente vai teorizar formas distintas de modelos novos.

**Daniel Queiroga** (37:14)  
E esses modelos, eles estão intrinsecamente embasados na resolução dos dados que a gente consegue coletar.

**Daniel Queiroga** (37:23)  
Então, se hoje a gente consegue coletar 10 elementos de dados, isso vai ser uma base para um modelo.

**Daniel Queiroga** (37:30)  
Se daqui a três meses a gente consegue coletar 100 elementos de dados, aí já vai ser base para um outro modelo.

**Plinio Benfica** (37:37)  
É uma coisa que eu, pelo menos, tenho uma janela de observação já de 30 anos.

**Plinio Benfica** (37:49)  
Quanto mais tempo a pessoa passa em recuperação, mais diversas são as possibilidades, mais diversa é a vida que a pessoa tem.

**Plinio Benfica** (37:58)  
Viver em recuperação por muito tempo é uma diversidade, não existe um parâmetro.

**Daniel Queiroga** (38:05)  
Não existe um one-size-fits-all, um tamanho que serves para todo mundo.

**Plinio Benfica** (38:10)  
Não é uma coisa assim.

**Plinio Benfica** (38:12)  
Exatamente.

**Plinio Benfica** (38:14)  
Pelo contrário, são fórmulas muito mais individualizadas.

**Daniel Queiroga** (38:19)  
E hoje a inteligência permite que a gente alcance essa individualização, porque ela vai se manifestar para o Iágora, por exemplo, de uma forma, e para mim, de outra forma, de acordo com a vivência de cada um.

**Daniel Queiroga** (38:35)  
E o tácito que você carrega desse aprendido ao longo desses 30 anos tem uma grande oportunidade, um grande momento em que você pode transformar isso em conhecimento catalogado para ensinar para as outras pessoas que trabalham junto com você.

**Plinio Benfica** (38:53)  
Pois é, vou morrer e isso vai ficar para...

**Daniel Queiroga** (38:55)  
É.

**Daniel Queiroga** (38:57)  
Pessoa morre, entra de férias, e aí morre todo o projeto.

**Daniel Queiroga** (39:01)  
Quando a gente coloca isso dentro dele...

**Plinio Benfica** (39:03)  
E agora é que assumi, olha aí a cara dele.

**Daniel Queiroga** (39:05)  
E agora é que assume.

**Daniel Queiroga** (39:10)  
Em caso de ausência, procurar Iágora, né?

**Plinio Benfica** (39:15)  
Tomara que ele não fuja.

**Plinio Benfica** (39:18)  
Da raia!

**Plinio Benfica** (39:20)  
Eu falei água e ele não ficou muito contente, não.

**Plinio Benfica** (39:25)  
Tu viu que a cara dele...

**Plinio Benfica** (39:27)  
Que maldito foi tu, Daniel.

**Plinio Benfica** (39:28)  
Não foi ele.

**Iágora Nogueira** (39:29)  
Outro dia eu tava dando reunião, aí eu falei, não...

**Iágora Nogueira** (39:32)  
Passou um pouco do horário.

**Iágora Nogueira** (39:34)  
Aí eu falei, não, o dono do ambulatório permite que seja ultrapassado o tempo.

**Iágora Nogueira** (39:40)  
Falei, mas o dono do ambulatório não tá aqui?

**Iágora Nogueira** (39:42)  
Alguém falou.

**Iágora Nogueira** (39:43)  
Aí eu respondi, é, mas o representante dele está aqui, então a gente pode continuar.

**Plinio Benfica** (39:48)  
É isso aí, tá vendo?

**Daniel Queiroga** (39:49)  
E essa é a norma do laboratório, é a ela que a gente evoca, não é mais o autor dela, mas aquele que deu a ela a responsabilidade de guardiã dessas regras, dessas formas de fazer as coisas.

**Plinio Benfica** (40:05)  
Uma coisa interessante que eu descobri, ano passado eu resolvi fazer uma palestra com um tema que estava me perturbando a cabeça, que era o tema das recaídas com pessoas que tinham longo período de tempo de recuperação.

**Plinio Benfica** (40:23)  
Porque várias pessoas com 15 anos, com 18 anos, com vários anos, múltiplos anos, como o Enia chama, estavam recaindo.

**Plinio Benfica** (40:37)  
E achei isso um fenômeno incrível.

**Plinio Benfica** (40:40)  
Digo, por quê?

**Plinio Benfica** (40:43)  
Por que esses caras conseguiram vencer a pior fase, teoricamente, que é o início da recuperação?

**Plinio Benfica** (40:49)  
Eles vão recair lá depois de 10 anos.

**Plinio Benfica** (40:53)  
E o que eu consegui prospectar foi o seguinte, é que os caras recaem com longos períodos, justamente porque eles ficam usando fórmulas de recuperação que funcionam muito bem para o começo da recuperação, mas que param de funcionar para quando eles já têm 10 anos, 15 anos.

**Plinio Benfica** (41:15)  
Aquilo que funciona para o começo não necessariamente vai funcionar tão bem para múltiplos anos.

**Plinio Benfica** (41:25)  
E aí é sobre isso que a gente...

**Daniel Queiroga** (41:28)  
É interessante a gente observar que da mesma forma que a gente tem que observar os dados de quem recai com múltiplos anos, a gente tem que observar os dados de quem não recai com.

**Plinio Benfica** (41:40)  
Múltiplos anos para ver a diferença, o.

**Daniel Queiroga** (41:43)  
Que está havendo de diferença de um e outro que a gente pode adicionar no modelo.

**Daniel Queiroga** (41:48)  
Porque existem duas formas de fazer as coisas.

**Daniel Queiroga** (41:53)  
Que é, uma, a gente levar uma tese e falar assim, a tese é essa, vamos coletar os dados pra validar a tese, pra ver se ela é coerente, pra ver se ela se conecta com a realidade.

**Daniel Queiroga** (42:04)  
A outra é, olha, aqueles caras já têm um resultado assim, vamos coletá os dados deles pra ver por que que eles têm esse resultado, entendeu?

**Daniel Queiroga** (42:14)  
Tanto seja um resultado positivo ou negativo ou neutro, essa observação já de quem tem um resultado na ponta, É como tentar fazer o labirinto de trás pra frente, entende?

**Plinio Benfica** (42:28)  
É como tu atirar a flecha e depois tu tentar o alvo, né?

**Daniel Queiroga** (42:34)  
É, eu não diria...

**Daniel Queiroga** (42:35)  
É como ver o cara que já tá acertando a flecha, entende?

**Daniel Queiroga** (42:39)  
Ele já tá acertando.

**Daniel Queiroga** (42:40)  
Ele tá fazendo tacitamente ali, na habilidade dele.

**Daniel Queiroga** (42:44)  
Talvez ele nem tenha consciência daquilo, mas de alguma forma ele conseguiu se equilibrar dentro daquela estrutura, que ele mire e atire a flecha de uma forma que a gente não entende.

**Plinio Benfica** (42:56)  
É uma coisa muito bem considerada.

**Plinio Benfica** (42:58)  
Tive muita dificuldade para encontrar material para ler sobre o que eles chamam de recuperação de sucesso, as que dão certo ao longo de mais de 10 anos.

**Plinio Benfica** (43:10)  
Por que tem pessoas que conseguem e outras que não conseguem?

**Daniel Queiroga** (43:16)  
Por que tem essa diferença?

**Plinio Benfica** (43:18)  
São duas análises diferentes.

**Daniel Queiroga** (43:19)  
Ter uma URL que colete os dados desse povo e distribuir no pessoal do N.A.

**Daniel Queiroga** (43:26)  
Pedindo pra eles fazerem essa coleta de dados deles, entendeu?

**Daniel Queiroga** (43:30)  
Então aí a gente fala, explica, que até a gente tá procurando assim, assim, assim, e dispara a inteligência pra coletar os dados com eles.

**Daniel Queiroga** (43:39)  
Aí eles vão lá, informam que identificado ou não identificado é uma coisa que a gente tem que decidir.

**Daniel Queiroga** (43:46)  
Se um pouco dos dois, o cara se quiser se identificar, se identifica, se não quiser fica no anonimato e ele vai lá e faz os registros dos relatos dentro das perguntas que a gente imaginar que fazem sentido pra gente coletar aquela dinâmica daquela pessoa, entendeu?

**Daniel Queiroga** (44:02)  
E aí você conhece o pessoal de DNA, dispara isso a nível nacional e a gente consegue coletar um monte de dados pra fazer análise.

**Daniel Queiroga** (44:11)  
A nossa grande risco nesse processo todo que a gente está trabalhando é confidencialidade e segurança dos dados, porque se vazar alguma coisa nossa, a gente perde credibilidade e as pessoas ficam inibidas de querer participar, entendeu?

**Plinio Benfica** (44:28)  
Sim, é isso mesmo.

**Plinio Benfica** (44:32)  
Bem, e agora, pergunta, quer falar alguma coisa?

**Iágora Nogueira** (44:37)  
Não, eu estou achando promissor a ideia e principalmente para a gente ter o objetivo inicial, que é gerenciar a agenda com a prevenção de recaídas de sexta-feira.

**Iágora Nogueira** (44:51)  
Acho que esse objetivo está mais do que alcançável com essa proposta.

**Iágora Nogueira** (44:58)  
E essa questão de análise a longo prazo, de individual, coletivo, já é um.

**Plinio Benfica** (45:06)  
Projeto.

**Daniel Queiroga** (45:10)  
É, o além.

**Daniel Queiroga** (45:11)  
É o que a gente chama de diferencial.

**Daniel Queiroga** (45:15)  
A gente precisa logo desenhar o projeto e às vezes a gente já desenha ele com o norte lá na frente.

**Daniel Queiroga** (45:21)  
Mas o que a gente precisa construir de imediato é esse modelo base.

**Daniel Queiroga** (45:25)  
É o que já está funcionando, é onde a gente já tem alcance.

**Daniel Queiroga** (45:29)  
Porque se a gente for construir tudo de uma vez, é muita coisa, entendeu?

**Daniel Queiroga** (45:32)  
Não que é o sistema, que para o sistema seja muita coisa para ele construir.

**Daniel Queiroga** (45:37)  
Mas é muita coisa pra gente digerir, assimilar e colocar em teste, entende?

**Daniel Queiroga** (45:42)  
Então a gente vai construindo logo as camadas que a gente vai conseguindo colocar em produção.

**Daniel Queiroga** (45:47)  
E essa de coletar os dados da semana do cara, que vocês já fazem conforme, tá pronta pra gente fazer.

**Daniel Queiroga** (45:54)  
Só a gente pegar esses forms, transformar isso numa inteligência dinâmica, e ela vai fazer essa coleta de dados e fazer os formulários quando forem os casos específicos pra fazer, os coletores de índice, né?

**Daniel Queiroga** (46:07)  
Ah, eu quero só coletar índice.

**Daniel Queiroga** (46:09)  
Aí é melhor, às vezes, numa tela de coleta de índice, uma estrutura de barras que o cara só vai colocando os índices e apertando o save, ao invés de ter que estar falando diretamente com a inteligência.

**Daniel Queiroga** (46:20)  
E aí a gente vai saber dizer quando usar uma, quando usar outra e como fazer essa transição entre elas de uma forma que fique suave para o usuário, que não fique um monte de telas, que ele se perca, que seja fluido.

**Daniel Queiroga** (46:34)  
E que seja, qual é a expressão que a gente usa, auto-explicativo, intuitivo.

**Daniel Queiroga** (46:44)  
Que a pessoa intuitivamente já veja o sistema e já entenda mais ou menos do que se trata, sem ter que estar lendo muito manual para poder fazer a operação.

**Iágora Nogueira** (46:55)  
Agora, esses dados coletados pelo FORMIS, acho que tem três pacientes, Talvez de um mês.

**Iágora Nogueira** (47:03)  
A gente vai conseguir integrar esses dados nesse projeto inicial?

**Daniel Queiroga** (47:08)  
Eles são máquinas de digerir dados, irmão.

**Daniel Queiroga** (47:12)  
Então, eles anseiam por dados desse tipo.

**Daniel Queiroga** (47:15)  
O tipo de coisa que tu dá pra eles é como se tu tivesse vendo uma pizza pra eles comerem.

**Daniel Queiroga** (47:20)  
Eles se maravilham.

**Daniel Queiroga** (47:21)  
Então, a inteligência, ela chega num platô onde ela aprende o que ela tem que aprender, mas agora ela precisa de novos dados.

**Daniel Queiroga** (47:29)  
E o que a gente tá dando pra ela é justamente esses novos dados para ela exigir, porque se ela só ficar insistindo nos dados que ela já tem, ela só performa o que ela já sabe, mas quando a gente dá novas informações para ela, ela fala, olha, tem essa novidade aqui, tem mais esse dado, e ela fica feliz da vida digerindo e é do útil.

**Iágora Nogueira** (47:49)  
Perfeito, acho que é isso então.

**Plinio Benfica** (47:55)  
Perfeito, quando é que a gente se reúne de novo?

**Daniel Queiroga** (47:59)  
Cara, me passem logo os dados do Forms que vocês têm, deixa eu já fazer um trabalho hoje, e amanhã eu já passo a URL para vocês darem uma olhada no que eu imaginei a partir da nossa conversa, e aí a gente já começa a falar em cima do produto, já em cima da interface, em cima do sistema, entendeu?

**Iágora Nogueira** (48:21)  
Seria melhor eu te entregar o e-mail e a senha para tu ter acesso total ao Forms?

**Daniel Queiroga** (48:30)  
Pode ser, mas eu não acho muito salutar dentro do nosso sistema de segurança, não é bom ter muito assim um do outro, não.

**Daniel Queiroga** (48:37)  
Passar só os dados mesmo fica mais tranquilo, os dados relevantes, né?

**Daniel Queiroga** (48:41)  
Porque lá deve ter um monte de coisa, além do que, dos principais.

**Iágora Nogueira** (48:46)  
Cara, tem.

**Iágora Nogueira** (48:48)  
O desafio principal, Daniel, eu tava explicando pro Plínio, vou te explicar agora aqui, rapidinho, eu só vou espelhar Aqui a tela?

**Daniel Queiroga** (49:02)  
Tá vendo aí a tela?

**Daniel Queiroga** (49:12)  
Tô.

**Iágora Nogueira** (49:14)  
Vou ampliar.

**Iágora Nogueira** (49:17)  
Certo?

**Daniel Queiroga** (49:19)  
Tô vendo aqui.

**Iágora Nogueira** (49:21)  
Olha aqui, ó.

**Iágora Nogueira** (49:22)  
Vamos pegar o Emanuel.

**Iágora Nogueira** (49:25)  
Com certeza é o que tem mais.

**Daniel Queiroga** (49:27)  
Respostas, o Manoel Sábado.

**Iágora Nogueira** (49:31)  
Eu abro as respostas dele, ele tem quantas respostas?

**Iágora Nogueira** (49:35)  
Duas respostas, por exemplo.

**Iágora Nogueira** (49:37)  
Aqui eu vou no individual.

**Iágora Nogueira** (49:40)  
Só que ele, na hora que eu vou imprimir a resposta, é uma impressão para cada resposta, entendeu?

**Daniel Queiroga** (49:49)  
Entendi.

**Daniel Queiroga** (49:51)  
Talvez se não tudo bem passar o usuário atento, É copiar e colar, mas tu também pode só simplesmente chegar nessa tela aí e copiar o conteúdo num arquivo de Word, que seja, e colar tudo lá, entendeu?

**Daniel Queiroga** (50:08)  
Porque...

**Daniel Queiroga** (50:09)  
Mostra lá a tua área de lista.

**Daniel Queiroga** (50:13)  
Tem muita lista ali, não tem?

**Iágora Nogueira** (50:15)  
De pacientes?

**Daniel Queiroga** (50:17)  
É.

**Iágora Nogueira** (50:18)  
Aqui, ó, tem.

**Iágora Nogueira** (50:19)  
Tem bastante.

**Iágora Nogueira** (50:21)  
É um fórum para cada dia, para cada paciente ali.

**Daniel Queiroga** (50:28)  
Entendi.

**Daniel Queiroga** (50:31)  
Pega o que tiver, pega um paciente desse que a gente escolher para modelar em cima dele e traz os dados deles, coloca num arquivo de texto e passa para a gente, que eu acho que fica melhor do que tentar imprimir.

**Daniel Queiroga** (50:48)  
Primeiro tu vai gerar pdf, pdf pra digestão de dados não é tão bom Se gerar um txt com tudo isso, já é suficiente, entendeu?

**Daniel Queiroga** (50:59)  
Aí tu vai gerar um txt, tu vai ter que clicar ali e copiar.

**Iágora Nogueira** (51:03)  
E colar A possibilidade que ele dá é planilha, aqui ele pega aqui as respostas, né?

**Daniel Queiroga** (51:11)  
Vê aí como fica na planilha Aí.

**Iágora Nogueira** (51:13)  
Ele, eu gero uma planilha ele gera uma planilha, aí tem todas as respostas aqui, todos os cinco dias, exatamente.

**Daniel Queiroga** (51:26)  
É, suficiente a planilha, a gente conseguiu deparar a parte dela.

**Iágora Nogueira** (51:33)  
É porque assim, deixa eu tirar aqui, esse e-mail, Daniel, ele é exclusivo para esse trabalho, não tem mais nada nele.

**Daniel Queiroga** (51:43)  
Tá, se você quiser compartilhar a senha também não tem problema não, ele tá com o 2FA?

**Daniel Queiroga** (51:48)  
Ou ele tá livre?

**Iágora Nogueira** (51:51)  
O que seria o 2FA?

**Daniel Queiroga** (51:53)  
2FA é a autenticação no telefone, ele pede pra...

**Daniel Queiroga** (51:56)  
Autorizar o número no telefone.

**Iágora Nogueira** (51:58)  
Não coloquei, não coloquei.

**Daniel Queiroga** (52:01)  
Tá, então faça a senha que a gente pode analisar, tá?

**Daniel Queiroga** (52:04)  
Mas é só...

**Daniel Queiroga** (52:06)  
Com cuidado, não vou passar pra ninguém aqui não, só eu que vou mexer nela, porque a gente...

**Plinio Benfica** (52:09)  
Não, Daniel.

**Plinio Benfica** (52:11)  
Tá louco, eu te conheço desde criança.

**Daniel Queiroga** (52:15)  
Não é por maldade, pô, é porque às vezes o cara comete um erro, entendeu?

**Daniel Queiroga** (52:19)  
Então não é uma coisa do cara, ah, pô, lá, por maldade eu fiz, mas aí o cara tá ligado numa conta que ele equiliga com a outra e aí a IA vai lá e cava e vê que tem autenticação e entra lá dentro e ela pode simplesmente deletar os dados por um erro, entende?

**Daniel Queiroga** (52:36)  
É sobre esses erros que a gente fica um pouco cuidadoso.

**Daniel Queiroga** (52:40)  
Mas se hoje só vocês tão mexendo nessa conta e dá pra gente acessar, coletar os lados diretos de lá, a gente pode...

**Daniel Queiroga** (52:48)  
Quantas pessoas tem lá dentro hoje, mais ou menos?

**Iágora Nogueira** (52:52)  
Nos formes?

**Daniel Queiroga** (52:55)  
É.

**Iágora Nogueira** (52:59)  
Num ambulatório como um todo, Daniel?

**Daniel Queiroga** (53:03)  
Dentro da conta, dentro da...

**Iágora Nogueira** (53:07)  
Não entendi, não cortou.

**Daniel Queiroga** (53:09)  
Dentro da conta, dentro da conta de...

**Daniel Queiroga** (53:12)  
Do Gmail que vocês criaram, quantos tem lá naquela lista?

**Daniel Queiroga** (53:17)  
A gente faria todos logo ou só alguns?

**Iágora Nogueira** (53:20)  
Não, teria o...

**Iágora Nogueira** (53:22)  
Três, três pessoas.

**Daniel Queiroga** (53:24)  
Três, pronto, vamos fazer esses três, tá?

**Daniel Queiroga** (53:27)  
Excelente, pra gente fazer de amostra.

**Daniel Queiroga** (53:30)  
Quem seriam os três?

**Plinio Benfica** (53:33)  
Qual o nome dos três?

**Iágora Nogueira** (53:39)  
É a Sabrina, Amanda e Emanuel.

**Daniel Queiroga** (53:46)  
Tá, Sabrina, Amanda e Emanuel.

**Daniel Queiroga** (53:49)  
E eles estão preenchendo agora nas semanas, eles estão preenchendo diariamente.

**Iágora Nogueira** (53:54)  
Diariamente.

**Iágora Nogueira** (53:55)  
O Emanuel mais tempo.

**Daniel Queiroga** (54:00)  
Beleza.

**Daniel Queiroga** (54:02)  
Então, se conseguir extrair os dados de lá, desses três e organizar, Passa pra gente, se não, passa o usuário e senha que a gente puxa os dados lá dentro.

**Iágora Nogueira** (54:12)  
Tá bom.

**Daniel Queiroga** (54:13)  
Tá bom?

**Daniel Queiroga** (54:16)  
Aí pra compartilhar, só coloca lá o teu e-mail, manda a senha também, que aí a gente entra, se eu tiver alguma dificuldade no acesso, eu te aviso.

**Iágora Nogueira** (54:26)  
Perfeito.

**Iágora Nogueira** (54:29)  
Pra mim tá tranquilo.

**Plinio Benfica** (54:31)  
Por mim também tá ótimo.

**Daniel Queiroga** (54:34)  
Aí os questionamentos que eu tiver das planilhas, eu te pergunto lá Só como é que tá o teu horário à noite?

**Daniel Queiroga** (54:41)  
Dá pra...

**Daniel Queiroga** (54:41)  
Consegue se comunicar à noite também, Iágora?

**Iágora Nogueira** (54:44)  
Hoje à noite, cara...

**Iágora Nogueira** (54:47)  
Até...

**Iágora Nogueira** (54:48)  
Consigo, consigo Eu vou estar na aula, mas não consigo Eu consigo ter uma...

**Iágora Nogueira** (54:53)  
Uma aula que dá pra gerenciar ali.

**Daniel Queiroga** (54:57)  
Tá, tranquilo, eu só vou, porque eu vou acessar os dados aí, pode ser que surjam questionamentos, eu vou te dar os prints e falar, ó, isso aqui...

**Iágora Nogueira** (55:03)  
Tranquilo, dá pra...

**Iágora Nogueira** (55:07)  
Anunciar.

**Plinio Benfica** (55:09)  
Tá bom, não querem criar um grupo não, no WhatsApp?

**Daniel Queiroga** (55:11)  
...E o consolidado que vocês conseguirem.

**Daniel Queiroga** (55:14)  
Desses três.

**Plinio Benfica** (55:16)  
Vocês querem criar um grupo no WhatsApp?

**Daniel Queiroga** (55:18)  
É bom, é bom, porque a gente centraliza os assuntos lá dentro.

**Iágora Nogueira** (55:23)  
Perfeito.

**Daniel Queiroga** (55:24)  
Querem fazer a criação aí, Plinio?

**Plinio Benfica** (55:28)  
Qual o nome do grupo?

**Daniel Queiroga** (55:30)  
Qual o nome do grupo?

**Daniel Queiroga** (55:31)  
Grupo de estudo.

**Plinio Benfica** (55:33)  
Coloca Leiliane.

**Daniel Queiroga** (55:36)  
Grupo de estudo.

**Daniel Queiroga** (55:37)  
Não, esquece a Leiliane, meu irmão.

**Daniel Queiroga** (55:39)  
A história do passado ficou para trás.

**Plinio Benfica** (55:40)  
E aí ele não esquece o nome do grupo.

**Plinio Benfica** (55:43)  
Se for procurar.

**Daniel Queiroga** (55:46)  
Aí a minha mulher vem.

**Daniel Queiroga** (55:47)  
O que é que tu está falando com a Leiliane aí?

**Plinio Benfica** (55:49)  
Fica mais marcante ainda.

**Daniel Queiroga** (55:52)  
Outro dia, outro dia.

**Daniel Queiroga** (55:54)  
A Leiliane lançou o livro, né?

**Daniel Queiroga** (55:57)  
Não sei se tu está sabendo.

**Daniel Queiroga** (55:58)  
Aí eu peguei o livro dela que tava lá na casa da minha mãe e comecei a olhar e ler, assim, o frente e o verso, né?

**Daniel Queiroga** (56:05)  
Aí, quando a gente entrou no carro, a outra...

**Daniel Queiroga** (56:07)  
É, por quê?

**Daniel Queiroga** (56:09)  
Melhor tu voltar pra tua ex, porque tu fica vendo livro dela, que não sei o quê...

**Daniel Queiroga** (56:13)  
Ah, mulher, meu irmão, mulher, bicho...

**Daniel Queiroga** (56:16)  
Que não dá, né?

**Daniel Queiroga (56:17)  
Elas...

**Daniel Queiroga** (56:18)  
Falam, falam, falam...

**Daniel Queiroga** (56:19)  
Ficam colocando a gente em teste de fogo pra ver o que a gente fala, né?

**Daniel Queiroga** (56:23)  
Aí eu fiquei calado, deixei ela falar e falei...

**Daniel Queiroga** (56:25)  
Tu não sabe do que tu tá falando, meu irmão.

**Daniel Queiroga** (56:28)  
Terei que viver com aquela fera para saber como é que era a dificuldade.

**Daniel Queiroga** (56:33)  
Então coloque aí.

**Plinio Benfica** (56:36)  
Batiza aí, Iágora.

**Daniel Queiroga** (56:37)  
Não, eu estou preocupado aí de grupo de pesquisa e desenvolvimento, sei lá, a gente vai dar um nome ainda, porque as coisas aqui a gente nem se preocupa tanto em dar nome, a gente primeiro se preocupa com a função, entendeu?

**Daniel Queiroga** (56:50)  
Depois do processo da função acontecendo, a gente consegue É, colocar o nome, mas seria um grupo de pesquisa e...

**Daniel Queiroga** (56:58)  
De estudo, pesquisa e desenvolvimento, né?

**Daniel Queiroga** (57:02)  
É...

**Daniel Queiroga** (57:03)  
P...

**Daniel Queiroga** (57:04)  
D...

**Daniel Queiroga** (57:05)  
P&D, né?

**Daniel Queiroga** (57:06)  
Pesquisa e Desenvolvimento.

**Daniel Queiroga** (57:08)  
A gente poderia colocar o nome de...

**Daniel Queiroga** (57:13)  
Laboratório da Sobriedade, alguma coisa desse tipo, entendeu?

**Plinio Benfica** (57:17)  
Porra, Laboratório da Sobriedade tá legal.

**Iágora Nogueira** (57:20)  
É.

**Plinio Benfica** (57:21)  
Tá aí, água.

**Iágora Nogueira** (57:22)  
Tá bom, vou criar aqui já.

**Plinio Benfica** (57:23)  
Tá legal.

**Daniel Queiroga** (57:26)  
Pronto, aí faz o dump de tudo lá, senha, usuário, e os materiais que você tiver, planilha, conteúdo que não tiver ainda dentro da conta, que já coloca lá pra gente poder trabalhar com esse material.

**Daniel Queiroga** (57:41)  
Fundamental agora é a gente ter as estruturas do form, o entendimento das perguntas.

**Daniel Queiroga** (57:48)  
Uma coisa que vocês precisam entregar pra gente, como já é um modelo desenhado por vocês, se já tá ativo, o porquê de cada uma daquelas perguntas, entendeu?

**Daniel Queiroga** (58:01)  
Essa pergunta por isso, essa pergunta por aquilo, o objetivo dessa pergunta é esse, aquilo e outro, pra gente poder alimentar a inteligência, não dizer pra ela só simplesmente assim, ó, faz essa pergunta aqui, mas dizer pra ela assim, olha, faz essa pergunta aqui porque a gente tá tentando encontrar esses dados, essas informações, cruzar esses dados e foca nessa coleta.

**Daniel Queiroga** (58:27)  
Aí ela olha de outra forma.

**Daniel Queiroga** (58:28)  
Ela já não olha mais como alguém que vai pegar uma pergunta simples ali.

**Daniel Queiroga** (58:33)  
Ela já olha com um olhar de que se o cara responder X, ela vai perguntar Y pra ele.

**Daniel Queiroga** (58:39)  
Se ele responder W, ela vai pergunta H.

**Daniel Queiroga** (58:44)  
Então ela vai ter uma dinâmica a partir desse entendimento do motivo das perguntas que a gente tá fazendo diariamente pra eles, entendeu?

**Daniel Queiroga** (58:52)  
Perfeito.

**Daniel Queiroga** (58:53)  
Perfeito, então.

**Plinio Benfica** (58:57)  
Então é isso.

**Daniel Queiroga** (58:58)  
Combinado.

**Daniel Queiroga** (58:59)  
Eu fico no aguardo então de vocês colocarem os conteúdos lá no grupo e já tento ver se hoje eu consigo trazer a primeira versão, mas se não, no mais tardar amanhã até o final do dia a gente tem uma versão inicial pra gente poder já fazer uma segunda reunião com base nesse conteúdo publicado.

**Iágora Nogueira** (59:20)  
Perfeito, perfeito então.

**Daniel Queiroga** (59:22)  
E aí vamos fazer tudo entre nós, a publicação entre nós, não mostrar tanto para as outras pessoas fora ainda, para a gente chegar num ponto de maturação que a gente fale, beleza, agora dá para colocar em produção, dá para chamar outras pessoas para entrarem.

**Iágora Nogueira** (59:39)  
Perfeito, bom.

**Plinio Benfica** (59:42)  
Ótima reunião.

**Daniel Queiroga** (59:46)  
Beleza.

**Daniel Queiroga** (59:47)  
O Firefly já anotou tudo aqui.

**Daniel Queiroga** (59:50)  
Daqui a pouco ele vai terminar de gerir a nossa reunião.

**Daniel Queiroga** (59:54)  
Quando ele tiver terminado, eu vou botar lá no grupo o link com a ATA e aí vocês podem consultar.

**Daniel Queiroga** (59:59)  
Se tiverem que fazer alguma consideração, se ele entendeu alguma coisa errada, a gente já pontua lá pra gente poder usar ela também como base pra alimentar o sistema.

**Iágora Nogueira** (01:00:09)  
Perfeito.

**Iágora Nogueira** (01:00:10)  
Perfeito, Daniel.

**Plinio Benfica** (01:00:12)  
Ok, Álvaro.

**Plinio Benfica** (01:00:15)  
Um abraço.

**Iágora Nogueira** (01:00:16)  
Um abraço.

**Daniel Queiroga** (01:00:18)  
O Cosses foi bom e agora vamos colocar em URL, o linkzinho.

**Daniel Queiroga** (01:00:24)  
O cara clica, outro universo.

**Iágora Nogueira** (01:00:29)  
Perfeito.

**Iágora Nogueira** (01:00:31)  
Vai ser capitulado.

**Plinio Benfica** (01:00:32)  
Um abraço, Daniel.

**Iágora Nogueira** (01:00:35)  
Valeu, falou, tchau.

**Daniel Queiroga** (01:00:38)  
Até mais, Deus abençoe.

**Daniel Queiroga** (01:00:40)  
Tchau, tchau.
```
