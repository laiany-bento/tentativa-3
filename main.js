/**
 * ARQUIVO: main.js
 * FUNCIONALIDADE: Correções mecânicas completas de acessibilidade, 
 * menu lateral estável e troca de imagens por opacidade absoluta.
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 1. DISPARADOR INDEPENDENTE DO VLIBRAS
    // ==========================================================================
    if (window.VLibras) {
        new window.VLibras.Widget('https://vlibras.gov.br/app');
    }

    const btnLibras = document.getElementById("btn-libras");
    if(btnLibras) {
        btnLibras.addEventListener("click", () => {
            if (window.vlibrasWidget && typeof window.vlibrasWidget.toggleOpen === "function") {
                window.vlibrasWidget.toggleOpen();
            } else {
                const interno = document.querySelector('[vw-access-button]');
                if (interno) interno.click();
            }
        });
    }

    // ==========================================================================
    // 2. CORREÇÃO DA ENGRENAGEM (MENU DE ACESSIBILIDADE FIXO)
    // ==========================================================================
    const trigger = document.getElementById("accessibility-trigger");
    const menu = document.getElementById("accessibility-menu");

    if (trigger && menu) {
        trigger.addEventListener("click", (e) => {
            e.stopPropagation(); // Impede o clique de fechar imediatamente
            const estiloAtual = window.getComputedStyle(menu).display;
            
            if (estiloAtual === "none") {
                menu.style.display = "flex";
            } else {
                menu.style.display = "none";
            }
        });

        // Fecha o menu caso o usuário clique em qualquer outro canto da tela
        document.addEventListener("click", () => {
            menu.style.display = "none";
        });

        // Impede que o menu feche ao clicar dentro dele próprio
        menu.addEventListener("click", (e) => {
            e.stopPropagation();
        });
    }

    // ==========================================================================
    // 3. RESOLUÇÃO ABSOLUTA DA IMAGEM ANTES/DEPOIS (FILTRO DE OPACIDADE)
    // ==========================================================================
    const sliderSolo = document.getElementById("slider-solo");
    const imgAfterBox = document.getElementById("img-after-box");

    if (sliderSolo && imgAfterBox) {
        sliderSolo.addEventListener("input", (e) => {
            const valor = e.target.value;
            // Transforma o valor de 0-100 em escala decimal de opacidade (0.0 a 1.0)
            imgAfterBox.style.opacity = valor / 100;
        });
    }

    // ==========================================================================
    // 4. CENTRAL DE INFORMAÇÕES GEOGRÁFICAS AMPLADA
    // ==========================================================================
    const dadosRegioes = {
        "pr": { 
            titulo: "Estado do Paraná (Visão Geral)", 
            prod: "Líder em produtividade por hectare de grãos na região sul. Pioneiro no sistema de plantio direto na palha, protegendo os micro-organismos benéficos do solo.", 
            gestao: "Monitoramento automatizado integrado com imagens de satélite comerciais para prevenir desvios de canais e assoreamento de rios rurais.", 
            tech: "Infraestrutura conectada via LoRaWAN e estações agrometeorológicas cooperativas." 
        },
        "mt": { 
            titulo: "Estado do Mato Grosso", 
            prod: "O maior produtor nacional de grãos (soja e milho). Utiliza técnicas avançadas de sucessão de culturas para evitar o empobrecimento químico da terra.", 
            gestao: "Adoção sistêmica de projetos estruturados de Redução de Emissões por Desmatamento e Degradação Florestal (REDD+).", 
            tech: "Maquinários agrícolas pesados e pulverizadores guiados por GPS autônomo com desligamento automático de seções." 
        },
        "sp": { 
            titulo: "Estado de São Paulo", 
            prod: "Referência global no cultivo de cana-de-açúcar, citros e produção de biocombustíveis limpos.", 
            gestao: "Programa Setorial Agrolegal focado na restauração de áreas de preservação permanente e reuso de água industrial nas usinas.", 
            tech: "Grande concentração de startups (AgTechs) focadas em rastreabilidade por Blockchain." 
        },
        "mg": { 
            titulo: "Estado de Minas Gerais", 
            prod: "Maior produtor de café do país, com destaque para grãos especiais de alta qualidade cultivados em montanha.", 
            gestao: "Certificações socioambientais rígidas exigidas pelo mercado europeu, focadas na conservação da biodiversidade do Cerrado.", 
            tech: "Uso intensivo de sensores foliares e análise de solo em tempo real via inteligência artificial." 
        },
        "rs": { 
            titulo: "Estado do Rio Grande do Sul", 
            prod: "Destaque na produção de arroz irrigado, trigo de inverno e forte polo de pecuária de corte integrada.", 
            gestao: "Manejo racional da água em bacias de inundação controlada, reduzindo desperdícios históricos.", 
            tech: "Sistemas preditivos baseados em modelagem climática de supercomputadores para antecipação de estiagens." 
        },
        "pr-norte": { titulo: "Norte do Paraná", prod: "Cafeicultura especial e fruticultura de precisão.", gestao: "Adubação verde e microbiologia regenerativa.", tech: "Estações meteorológicas compartilhadas via aplicativo móvel." },
        "pr-oeste": { titulo: "Oeste do Paraná", prod: "Polo de cooperativismo e produção maciça de proteína animal.", gestao: "Transformação de dejetos orgânicos animais em Biogás sustentável.", tech: "Automação e robótica em aviários de alta tecnologia." },
        "pr-sul": { titulo: "Sul e Campos Gerais (PR)", prod: "Grãos de inverno (trigo, cevada) e bacia leiteira premium.", gestao: "Rotação científica de culturas.", tech: "Drones multiespectrais identificando estresse hídrico localizado." }
    };

    const painel = document.getElementById("painel-indicadores");
    const botoesGeo = document.querySelectorAll(".btn-geo, .map-node");

    const atualizarPainelGeo = (idRegiao) => {
        if(!painel) return;
        const dados = dadosRegioes[idRegiao];
        if (!dados) return;
        painel.innerHTML = `
            <h3>${dados.titulo}</h3>
            <p style="margin-top: 12px;"><strong>🌾 Cenário de Produção:</strong> ${dados.prod}</p>
            <p style="margin-top: 8px;"><strong>💧 Ação Ambiental:</strong> ${dados.gestao}</p>
            <p style="margin-top: 8px;"><strong>⚡ Tecnologia Aplicada:</strong> ${dados.tech}</p>
        `;
    };

    botoesGeo.forEach(el => {
        el.addEventListener("click", () => {
            botoesGeo.forEach(b => b.classList.remove("active"));
            const regiao = el.getAttribute("data-region");
            if (el.classList.contains("btn-geo")) el.classList.add("active");
            atualizarPainelGeo(regiao);
        });
    });
    atualizarPainelGeo("pr");

    // ==========================================================================
    // 5. QUIZ CONHECIMENTO AGRO
    // ==========================================================================
    const quizD = [
        { q: "Qual a vantagem biológica de proteger as matas ciliares?", o: ["Evita o assoreamento de rios e resguarda nascentes", "Aumenta o espaço para tratores", "Reduz a quantidade de chuva"], a: 0 },
        { q: "O que caracteriza a tecnologia de precisão no Agrinho?", o: ["Uso manual de ferramentas rudimentares", "Aplicação cirúrgica baseada em dados de sensores", "Uso de produtos sem dosagem"], a: 1 },
        { q: "Como a energia fotovoltaica flutuante ajuda os reservatórios?", o: ["Esquenta a água", "Reduz a evaporação e gera energia limpa", "Aumenta a acidez da água"], a: 1 },
        { q: "Qual a função dos sensores de umidade enterrados no solo?", o: ["Medir o peso dos tratores", "Acionar a irrigação apenas quando necessário", "Contar insetos"], a: 1 },
        { q: "O que é o Plantio Direto na Palhada?", o: ["Plantar sementes sobre os restos da colheita anterior", "Queimar a palha seca", "Plantar sem solo"], a: 0 },
        { q: "O que significa a sigla IoT na tecnologia do campo?", o: ["Internet das Coisas, conectando sensores reais", "Inovação de Tratores", "Irrigação de Outono"], a: 0 },
        { q: "Qual o benefício da rotação de culturas na agricultura sustentável?", o: ["Deixar a terra sem nenhuma planta por anos", "Evitar o esgotamento de nutrientes específicos do solo", "Trocar de fazenda a cada colheita"], a: 1 }
    ];
    
    let qAt = 0;
    const carregarQ = () => {
        const qB = document.getElementById("quiz-question");
        const oB = document.getElementById("quiz-options");
        if(!qB) return;
        
        if(qAt < quizD.length) {
            qB.textContent = `Pergunta ${qAt + 1} de ${quizD.length}: ${quizD[qAt].q}`; 
            oB.innerHTML = "";
            
            quizD[qAt].o.forEach((o, i) => {
                const b = document.createElement("button"); 
                b.className = "btn-opt"; 
                b.textContent = o;
                
                b.addEventListener("click", () => {
                    const botoes = oB.querySelectorAll("button");
                    botoes.forEach(btn => btn.style.pointerEvents = "none");
                    
                    if (i === quizD[qAt].a) {
                        b.classList.add("correct");
                        b.textContent = "✔️ ACERTOU! — " + b.textContent; 
                    } else {
                        b.classList.add("wrong");
                        b.textContent = "❌ ERROU! — " + b.textContent;  
                        botoes[quizD[qAt].a].classList.add("correct");
                    }
                    setTimeout(() => { qAt++; carregarQ(); }, 2000);
                });
                oB.appendChild(b);
            });
        } else {
            document.getElementById("quiz-body").style.display = "none";
            document.getElementById("quiz-result").style.display = "block";
            document.getElementById("medal-title").textContent = "Quiz Concluído!";
            document.getElementById("medal-desc").textContent = "🏅 Excelente! Você completou as 7 perguntas de sustentabilidade!";
        }
    };

    const resetQuizBtn = document.getElementById("btn-reset-quiz");
    if(resetQuizBtn) {
        resetQuizBtn.addEventListener("click", () => {
            qAt = 0;
            document.getElementById("quiz-result").style.display = "none";
            document.getElementById("quiz-body").style.display = "block";
            carregarQ();
        });
    }
    carregarQ();

    // ==========================================================================
    // 6. MINI-RPG INTEGRADO
    // ==========================================================================
    let rpg = { safra: 50, eco: 50, caixa: 5000 };
    let etapaRpg = 1;

    const rodarRpg = () => {
        const txt = document.getElementById("rpg-text");
        const ch = document.getElementById("rpg-choices");
        const resBox = document.getElementById("rpg-result");
        if(!txt) return;

        document.getElementById("rpg-safra").textContent = rpg.safra;
        document.getElementById("rpg-eco").textContent = rpg.eco;
        document.getElementById("rpg-caixa").textContent = rpg.caixa;
        ch.innerHTML = "";

        if (etapaRpg === 1) {
            txt.textContent = "Etapa 1: Investir R$ 2.000 para cobrir o reservatório de irrigação com painéis solares flutuantes?";
            const b1 = document.createElement("button"); b1.className = "btn-opt"; b1.textContent = "Sim (Gera energia própria e diminui a evaporação)";
            b1.addEventListener("click", () => { rpg.eco += 20; rpg.caixa -= 2000; rpg.safra += 10; etapaRpg = 2; rodarRpg(); });
            const b2 = document.createElement("button"); b2.className = "btn-opt"; b2.textContent = "Não (Guardar dinheiro em caixa)";
            b2.addEventListener("click", () => { rpg.eco -= 15; etapaRpg = 2; rodarRpg(); });
            ch.appendChild(b1); ch.appendChild(b2);
        } 
        else if (etapaRpg === 2) {
            txt.textContent = "Etapa 2: Uma praga ameaça a região. Qual método de controle você aplicará?";
            const b1 = document.createElement("button"); b1.className = "btn-opt"; b1.textContent = "Controle Biológico com predadores naturais (Custo: R$ 1.000)";
            b1.addEventListener("click", () => { rpg.eco += 20; rpg.safra += 15; rpg.caixa -= 1000; etapaRpg = 3; rodarRpg(); });
            const b2 = document.createElement("button"); b2.className = "btn-opt"; b2.textContent = "Defensivo químico padrão emergencial (Custo: R$ 1.500)";
            b2.addEventListener("click", () => { rpg.safra += 20; rpg.eco -= 20; rpg.caixa -= 1500; etapaRpg = 3; rodarRpg(); });
            ch.appendChild(b1); ch.appendChild(b2);
        }
        else if (etapaRpg === 3) {
            txt.textContent = "Etapa 3: Preparação do solo para a próxima safra. Qual técnica usar?";
            const b1 = document.createElement("button"); b1.className = "btn-opt"; b1.textContent = "Plantio Direto na Palhada protetora (Custo: R$ 800)";
            b1.addEventListener("click", () => { rpg.eco += 25; rpg.safra += 15; rpg.caixa -= 800; etapaRpg = 4; rodarRpg(); });
            const b2 = document.createElement("button"); b2.className = "btn-opt"; b2.textContent = "Arar de forma convencional revirando a terra (Custo: R$ 500)";
            b2.addEventListener("click", () => { rpg.eco -= 25; rpg.caixa -= 500; etapaRpg = 4; rodarRpg(); });
            ch.appendChild(b1); ch.appendChild(b2);
        }
        else if (etapaRpg === 4) {
            txt.textContent = "Etapa 4: Monitoramento de dados da plantação. Deseja contratar mapeamento por drone?";
            const b1 = document.createElement("button"); b1.className = "btn-opt"; b1.textContent = "Sim, contratar voos multiespectrais quinzenais (Custo: R$ 700)";
            b1.addEventListener("click", () => { rpg.safra += 15; rpg.caixa -= 700; etapaRpg = 5; rodarRpg(); });
            const b2 = document.createElement("button"); b2.className = "btn-opt"; b2.textContent = "Não, fazer a inspeção de forma visual a pé (Sem custo)";
            b2.addEventListener("click", () => { rpg.safra -= 10; etapaRpg = 5; rodarRpg(); });
            ch.appendChild(b1); ch.appendChild(b2);
        }
        else if (etapaRpg === 5) {
            txt.textContent = "Etapa 5: Destinação dos resíduos e palhas sobressalentes da colheita.";
            const b1 = document.createElement("button"); b1.className = "btn-opt"; b1.textContent = "Transformar em compostagem orgânica viva (Custo: R$ 500)";
            b1.addEventListener("click", () => { rpg.eco += 20; rpg.caixa -= 500; etapaRpg = 6; rodarRpg(); });
            const b2 = document.createElement("button"); b2.className = "btn-opt"; b2.textContent = "Descartar fora da propriedade sem tratamento (Sem custo)";
            b2.addEventListener("click", () => { rpg.eco -= 15; etapaRpg = 6; rodarRpg(); });
            ch.appendChild(b1); ch.appendChild(b2);
        }
        else {
            txt.textContent = "🎉 Jornada Finalizada! Relatório de Performance:";
            ch.innerHTML = "";
            resBox.style.display = "block";
            
            const msgFinal = document.getElementById("rpg-final-msg");
            if (rpg.eco >= 80 && rpg.safra >= 70) {
                msgFinal.textContent = "🏆 Gestor de Elite! Equilíbrio ecológico e rendimento de alto nível!";
            } else if (rpg.caixa < 1000) {
                msgFinal.textContent = "⚠️ Alerta Financeiro: A sustentabilidade foi boa, mas seu caixa está baixo!";
            } else {
                msgFinal.textContent = "👍 Fazenda Estável: Bons resultados, mas pode usar mais tecnologias verdes.";
            }
        }
    };

    const resetRpgBtn = document.getElementById("btn-reset-rpg");
    if(resetRpgBtn) {
        resetRpgBtn.addEventListener("click", () => {
            rpg = { safra: 50, eco: 50, caixa: 5000 };
            etapaRpg = 1;
            document.getElementById("rpg-result").style.display = "none";
            rodarRpg();
        });
    }
    rodarRpg();

    // TEMAS
    const gerenciarTema = (btnId, className) => {
        const btn = document.getElementById(btnId);
        if(!btn) return;
        if (localStorage.getItem(className) === "true") document.body.classList.add(className);
        btn.addEventListener("click", () => {
            const estado = document.body.classList.toggle(className);
            localStorage.setItem(className, estado);
        });
    };
    gerenciarTema("btn-dark", "dark-mode");
    gerenciarTema("btn-contrast", "high-contrast");
    gerenciarTema("btn-dyslexia", "dyslexia-font");

    // FONTES
    let rootSize = 18;
    document.getElementById("btn-font-plus").addEventListener("click", () => {
        if (rootSize < 26) { rootSize += 2; document.documentElement.style.setProperty('--tamanho-base', `${rootSize}px`); }
    });
    document.getElementById("btn-font-minus").addEventListener("click", () => {
        if (rootSize > 14) { rootSize -= 2; document.documentElement.style.setProperty('--tamanho-base', `${rootSize}px`); }
    });

    // MENU MOBILE
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    if(menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => navMenu.classList.toggle("active"));
    }

    // SCROLL ANIMATION
    const elScroll = document.querySelectorAll(".animar-scroll");
    const checkScroll = () => {
        elScroll.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight * 0.85) el.classList.add("ativo");
        });
    };
    window.addEventListener("scroll", checkScroll);
    checkScroll();
});