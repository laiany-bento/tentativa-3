/**
 * ARQUIVO: main.js
 * FUNCIONALIDADE: Sistema interativo mapeado com os textos oficiais, slider profissional por largura,
 * quiz expandido (7 perguntas) e Mini-RPG de tomada de decisão estruturado com 3 vias de escolha.
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
        imgAfterBox.style.width = sliderSolo.value + "%";
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
    // 7. QUIZ DE CONHECIMENTO COMPLETO (7 PERGUNTAS)
    // ==========================================================================
    const quizD = [
        { q: "Qual a vantagem biológica de proteger as matas ciliares?", o: ["Evita o assoreamento de rios e resguarda nascentes", "Aumenta o espaço útil para tratores", "Reduz a quantidade total de chuva anual"], a: 0 },
        { q: "O que caracteriza a tecnologia de precisão no projeto Agrinho?", o: ["Uso manual e empírico de ferramentas rudimentares", "Aplicação cirúrgica de insumos baseada em dados de sensores", "Uso massivo de produtos sem dosagem controlada"], a: 1 },
        { q: "Como a energia fotovoltaica flutuante ajuda os reservatórios?", o: ["Esquenta a água para acelerar microrganismos", "Reduz a evaporação e gera eletricidade limpa para bombas", "Aumenta a acidez da água de forma artificial"], a: 1 },
        { q: "Qual o principal objetivo do sistema de Plantio Direto na palha?", o: ["Manter o solo limpo e totalmente exposto ao sol", "Proteger a biologia do solo contra erosões e reter umidade", "Acelerar a compactação do terreno agrícola"], a: 1 },
        { q: "Os sensores de umidade enterrados atuam enviando dados via qual tecnologia?", o: ["Cabos de fibra ótica subterrâneos", "Sinais de fumaça digitais", "Ondas de rádio de longo alcance (IoT/LoRaWAN)"], a: 2 },
        { q: "Qual é o benefício dos bioinsumos frente aos defensivos químicos tradicionais?", o: ["Atuam regenerando o solo sem deixar resíduos tóxicos nocivos", "São produzidos sinteticamente em refinarias de petróleo", "Eliminam 100% de qualquer vida vegetal ao redor"], a: 0 },
        { q: "As câmeras multiespectrais acopladas em drones servem para capturar o quê?", o: ["Vídeos institucionais para redes sociais rurais", "Índices de estresse hídrico e saúde da biomassa vegetal", "A velocidade exata do vento na copa das árvores"], a: 1 }
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
            document.getElementById("medal-desc").textContent = "🏆 Excelente! Você dominou com sucesso os 7 pilares de sustentabilidade do Agrinho 2026!";
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
    // 8. MINI-RPG ESTRATÉGICO REFORMULADO (4 ETAPAS E 3 ALTERNATIVAS DETALHADAS)
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

        // ETAPA 1: IRRIGAÇÃO
        if (etapaRpg === 1) {
            txt.textContent = "Etapa 1: Como planejará o sistema hídrico da lavoura para este ciclo climático?";
            
            const b1 = document.createElement("button"); b1.className = "btn-opt"; 
            b1.textContent = "Opção A: Instalar painéis solares flutuantes e gotejamento automatizado (Custo: R$ 2.000).";
            b1.addEventListener("click", () => { rpg.eco += 25; rpg.safra += 15; rpg.caixa -= 2000; etapaRpg = 2; rodarRpg(); });
            
            const b2 = document.createElement("button"); b2.className = "btn-opt"; 
            b2.textContent = "Opção B: Irrigação por microaspersão convencional sem sensores (Custo: R$ 1.000).";
            b2.addEventListener("click", () => { rpg.safra += 15; rpg.eco += 0; rpg.caixa -= 1000; etapaRpg = 2; rodarRpg(); });
            
            const b3 = document.createElement("button"); b3.className = "btn-opt"; 
            b3.textContent = "Opção C: Não investir em tecnologia hídrica e depender 100% da chuva (Custo: R$ 0).";
            b3.addEventListener("click", () => { rpg.safra -= 20; rpg.eco -= 10; etapaRpg = 2; rodarRpg(); });
            
            ch.appendChild(b1); ch.appendChild(b2); ch.appendChild(b3);
        } 
        // ETAPA 2: TRATAMENTO DE PRAGAS
        else if (etapaRpg === 2) {
            txt.textContent = "Etapa 2: Uma infestação de pragas biológicas ameaça a fronteira oeste da sua cultura:";
            
            const b1 = document.createElement("button"); b1.className = "btn-opt"; 
            b1.textContent = "Opção A: Aplicar defensivo microbiológico e vespas predadoras naturais (Custo: R$ 1.200).";
            b1.addEventListener("click", () => { rpg.eco += 20; rpg.safra += 20; rpg.caixa -= 1200; etapaRpg = 3; rodarRpg(); });
            
            const b2 = document.createElement("button"); b2.className = "btn-opt"; 
            b2.textContent = "Opção B: Utilizar pulverização química em massa tradicional (Custo: R$ 700).";
            b2.addEventListener("click", () => { rpg.safra += 15; rpg.eco -= 25; rpg.caixa -= 700; etapaRpg = 3; rodarRpg(); });
            
            const b3 = document.createElement("button"); b3.className = "btn-opt"; 
            b3.textContent = "Opção C: Retardar a aplicação para observar a evolução natural da área (Custo: R$ 0).";
            b3.addEventListener("click", () => { rpg.safra -= 25; rpg.eco -= 5; etapaRpg = 3; rodarRpg(); });
            
            ch.appendChild(b1); ch.appendChild(b2); ch.appendChild(b3);
        }
        // ETAPA 3: CONSERVAÇÃO DO SOLO
        else if (etapaRpg === 3) {
            txt.textContent = "Etapa 3: Chegou o período de entresafra. Qual o seu plano de manejo para o solo exposto?";
            
            const b1 = document.createElement("button"); b1.className = "btn-opt"; 
            b1.textContent = "Opção A: Plantio direto com braquiária para palhada e rotação de culturas (Custo: R$ 800).";
            b1.addEventListener("click", () => { rpg.eco += 20; rpg.safra += 15; rpg.caixa -= 800; etapaRpg = 4; rodarRpg(); });
            
            const b2 = document.createElement("button"); b2.className = "btn-opt"; 
            b2.textContent = "Opção B: Gradeamento mecânico pesado tradicional do solo (Custo: R$ 500).";
            b2.addEventListener("click", () => { rpg.safra += 5; rpg.eco -= 15; rpg.caixa -= 500; etapaRpg = 4; rodarRpg(); });
            
            const b3 = document.createElement("button"); b3.className = "btn-opt"; 
            b3.textContent = "Opção C: Deixar o solo em pousio completo sem cobertura vegetal ativa (Custo: R$ 0).";
            b3.addEventListener("click", () => { rpg.eco -= 20; rpg.safra -= 10; etapaRpg = 4; rodarRpg(); });
            
            ch.appendChild(b1); ch.appendChild(b2); ch.appendChild(b3);
        }
        // ETAPA 4: SENSORIAMENTO E GESTÃO
        else if (etapaRpg === 4) {
            txt.textContent = "Etapa 4: Como você coletará dados para o relatório final de certificação agroecológica?";
            
            const b1 = document.createElement("button"); b1.className = "btn-opt"; 
            b1.textContent = "Opção A: Contratar imageamento multiespectral por satélite e nós IoT (Custo: R$ 1.000).";
            b1.addEventListener("click", () => { rpg.safra += 20; rpg.eco += 15; rpg.caixa -= 1000; etapaRpg = 5; rodarRpg(); });
            
            const b2 = document.createElement("button"); b2.className = "btn-opt"; 
            b2.textContent = "Opção B: Fazer inspeção visual por caminhada amostral em pontos isolados (Custo: R$ 300).";
            b2.addEventListener("click", () => { rpg.safra += 5; rpg.caixa -= 300; etapaRpg = 5; rodarRpg(); });
            
            const b3 = document.createElement("button"); b3.className = "btn-opt"; 
            b3.textContent = "Opção C: Não realizar relatórios de inspeção técnica neste ciclo (Custo: R$ 0).";
            b3.addEventListener("click", () => { rpg.safra -= 15; rpg.eco -= 15; etapaRpg = 5; rodarRpg(); });
            
            ch.appendChild(b1); ch.appendChild(b2); ch.appendChild(b3);
        }
        // RESULTADO FINAL
        else {
            txt.textContent = "Jornada Estratégica Finalizada!";
            ch.innerHTML = "";
            resBox.style.display = "block";
            const msgFinal = document.getElementById("rpg-final-msg");
            
            if (rpg.eco >= 75 && rpg.safra >= 70 && rpg.caixa > 0) {
                msgFinal.style.color = "#155724";
                msgFinal.textContent = `🏆 Produtor Elite de Inovação Azul! Safra: ${rpg.safra}%, Eco: ${rpg.eco}%, Saldo: R$ ${rpg.caixa}. Você alcançou a máxima eficiência ecológica internacional!`;
            } else if (rpg.caixa < 0) {
                msgFinal.style.color = "#721c24";
                msgFinal.textContent = `🚨 Falência Financeira! Apesar das suas decisões, seu caixa ficou negativo (R$ ${rpg.caixa}). Ajuste seus investimentos técnicos de forma equilibrada.`;
            } else {
                msgFinal.style.color = "#856404";
                msgFinal.textContent = `👍 Ciclo Completo! Safra: ${rpg.safra}%, Eco: ${rpg.eco}%, Saldo: R$ ${rpg.caixa}. Sua fazenda opera de modo produtivo, mas você pode melhorar a harmonia dos recursos sustentáveis!`;
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