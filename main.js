/**
 * ARQUIVO: main.js
 * FUNCIONALIDADE: Sistema interativo mapeado com os textos oficiais e slider profissional por largura.
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 1. DISPARADOR INTEGRADO DO VLIBRAS
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
    // 2. CONTROLE DO MENU DA ENGRENAGEM (ACESSIBILIDADE)
    // ==========================================================================
    const trigger = document.getElementById("accessibility-trigger");
    const menu = document.getElementById("accessibility-menu");

    if (trigger && menu) {
        trigger.addEventListener("click", (e) => {
            e.stopPropagation();
            const estiloAtual = window.getComputedStyle(menu).display;
            menu.style.display = (estiloAtual === "none") ? "flex" : "none";
        });

        document.addEventListener("click", () => { menu.style.display = "none"; });
        menu.addEventListener("click", (e) => { e.stopPropagation(); });
    }

    // ==========================================================================
    // 3. SLIDER ANTES/DEPOIS PROFISSIONAL (MÉTODO DE RECORTE POR LARGURA)
    // ==========================================================================
    const sliderSolo = document.getElementById("slider-solo");
    const imgAfterBox = document.getElementById("img-after-box");

    if (sliderSolo && imgAfterBox) {
        // Inicializa o recorte em 50% acompanhando o valor nativo do HTML
        imgAfterBox.style.width = sliderSolo.value + "%";

        // Atualiza a largura em tempo real conforme o usuário arrasta
        sliderSolo.addEventListener("input", (e) => {
            imgAfterBox.style.width = e.target.value + "%";
        });
    }

    // ==========================================================================
    // 4. FUNCIONALIDADE DO ACORDION (ABAS DA SEÇÃO TECNOLOGIA)
    // ==========================================================================
    const triggersAccordion = document.querySelectorAll(".accordion-trigger");
    triggersAccordion.forEach(trigger => {
        trigger.addEventListener("click", function() {
            const item = this.parentElement;
            item.classList.toggle("active");
        });
    });

    // ==========================================================================
    // 5. CENTRAL DE RELATÓRIOS GEOGRÁFICOS
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
            gestao: "Programa Setorial Agrolegal focado na restauracão de áreas de preservação permanente e reuso de água industrial nas usinas.", 
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
            <p style="margin-top: 15px;"><strong>🌾 Cenário de Produção:</strong> ${dados.prod}</p>
            <p style="margin-top: 10px;"><strong>💧 Ação Ambiental:</strong> ${dados.gestao}</p>
            <p style="margin-top: 10px;"><strong>⚡ Tecnologia Aplicada:</strong> ${dados.tech}</p>
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
    // 6. SIMULADORES DO LABORATÓRIO DIGITAL
    // ==========================================================================
    const btnCalcular = document.getElementById("btn-calcular");
    if(btnCalcular) {
        btnCalcular.addEventListener("click", () => {
            const hec = parseFloat(document.getElementById("calc-hec").value) || 0;
            const cultura = document.getElementById("calc-cultura").value;
            const resBox = document.getElementById("result-calc");
            
            let dose = cultura === "soja" ? hec * 15 : hec * 22;
            resBox.style.display = "block";
            resBox.innerHTML = `✅ Dosagem Recomendada: <strong>${dose} Litros</strong> de biofertilizante ativo diluído para aplicação foliar estável.`;
        });
    }

    const sliderUmidade = document.getElementById("slider-umidade");
    const valUmidade = document.getElementById("val-umidade");
    const sensorStatus = document.getElementById("sensor-status");

    const atualizarSensorStatus = (valor) => {
        if(!sliderUmidade) return;
        valUmidade.textContent = valor;
        if(valor < 35) {
            sensorStatus.className = "sensor-display";
            sensorStatus.style.backgroundColor = "#f8d7da";
            sensorStatus.style.color = "#721c24";
            sensorStatus.textContent = "Alerta: Solo Seco. Válvulas automáticas abertas por gotejamento.";
        } else if (valor > 75) {
            sensorStatus.className = "sensor-display";
            sensorStatus.style.backgroundColor = "#fff3cd";
            sensorStatus.style.color = "#856404";
            sensorStatus.textContent = "Aviso: Saturação Detectada. Sensores bloqueando novas irrigações.";
        } else {
            sensorStatus.className = "sensor-display status-ideal";
            sensorStatus.style.backgroundColor = ""; 
            sensorStatus.style.color = "";
            sensorStatus.textContent = "Status: Umidade Ideal. Válvulas de água fechadas para economia.";
        }
    };

    if(sliderUmidade) {
        sliderUmidade.addEventListener("input", (e) => atualizarSensorStatus(e.target.value));
        document.getElementById("btn-calor").addEventListener("click", () => { sliderUmidade.value = 15; atualizarSensorStatus(15); });
        document.getElementById("btn-chuva").addEventListener("click", () => { sliderUmidade.value = 85; atualizarSensorStatus(85); });
    }

    // ==========================================================================
    // 7. QUIZ DE CONHECIMENTO
    // ==========================================================================
    const quizD = [
        { q: "Qual a vantagem biológica de proteger as matas ciliares?", o: ["Evita o assoreamento de rios e resguarda nascentes", "Aumenta o espaço para tratores", "Reduz a quantidade de chuva"], a: 0 },
        { q: "O que caracteriza a tecnologia de precisão no Agrinho?", o: ["Uso manual de ferramentas rudimentares", "Aplicação cirúrgica baseada em dados de sensores", "Uso de produtos sem dosagem"], a: 1 },
        { q: "Como a energia fotovoltaica flutuante ajuda os reservatórios?", o: ["Esquenta a água", "Reduz a evaporação e gera energia limpa", "Aumenta a acidez da água"], a: 1 }
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
                    } else {
                        b.classList.add("wrong");
                        botoes[quizD[qAt].a].classList.add("correct");
                    }
                    setTimeout(() => { qAt++; carregarQ(); }, 1800);
                });
                oB.appendChild(b);
            });
        } else {
            document.getElementById("quiz-body").style.display = "none";
            document.getElementById("quiz-result").style.display = "block";
            document.getElementById("medal-title").textContent = "Quiz Concluído!";
            document.getElementById("medal-desc").textContent = "🏆 Excelente! Você completou todas as perguntas de sustentabilidade!";
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
    // 8. MINI-RPG ESTRATÉGICO
    // ==========================================================================
    let rpg = { safra: 50, eco: 50, caixa: 5000 };
    let etapaRpg = 1;

    const rodarRpg = () => {
        const txt = document.getElementById("rpg-text");
        const ch = document.getElementById("rpg-choices");
        const resBox = document.getElementById("rpg-result");
        if(!txt) return;

        document.getElementById("rpg-safra").textContent = rpg.safra + "%";
        document.getElementById("rpg-eco").textContent = rpg.eco + "%";
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
            txt.textContent = "Etapa 2: Uma praga ameaça as plantações da divisa. Qual será sua estratégia?";
            const b1 = document.createElement("button"); b1.className = "btn-opt"; b1.textContent = "Aplicar defensivo microbiológico seletivo (Custo: R$ 1.000)";
            b1.addEventListener("click", () => { rpg.eco += 15; rpg.safra += 15; rpg.caixa -= 1000; etapaRpg = 3; rodarRpg(); });
            const b2 = document.createElement("button"); b2.className = "btn-opt"; b2.textContent = "Usar pulverização química em massa tradicional (Custo: R$ 800)";
            b2.addEventListener("click", () => { rpg.safra += 20; rpg.eco -= 20; rpg.caixa -= 800; etapaRpg = 3; rodarRpg(); });
            ch.appendChild(b1); ch.appendChild(b2);
        }
        else {
            txt.textContent = "Jornada Finalizada com sucesso!";
            ch.innerHTML = "";
            resBox.style.display = "block";
            const msgFinal = document.getElementById("rpg-final-msg");
            msgFinal.textContent = (rpg.eco >= 65 && rpg.safra >= 60) ? "🏆 Sucesso Absoluto! Você alcançou o equilíbrio perfeito de produção verde!" : "👍 Ciclo Encerrado! Analise suas escolhas e tente otimizar seu caixa.";
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

    // GERENCIADOR DE TEMAS ACESSIBILIDADE
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

    // RESIZER DE FONTE
    let rootSize = 18;
    document.getElementById("btn-font-plus").addEventListener("click", () => {
        if (rootSize < 24) { rootSize += 2; document.documentElement.style.setProperty('--tamanho-base', `${rootSize}px`); }
    });
    document.getElementById("btn-font-minus").addEventListener("click", () => {
        if (rootSize > 14) { rootSize -= 2; document.documentElement.style.setProperty('--tamanho-base', `${rootSize}px`); }
    });

    // MOBILE TOGGLE
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    if(menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => navMenu.classList.toggle("active"));
    }

    // ANIMATION SCROLL
    const elScroll = document.querySelectorAll(".animar-scroll");
    const checkScroll = () => {
        elScroll.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight * 0.9) el.classList.add("ativo");
        });
    };
    window.addEventListener("scroll", checkScroll);
    checkScroll();
});