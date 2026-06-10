/**
 * ARQUIVO: main.js
 * FUNCIONALIDADE: Ajuste estável e definitivo do VLibras e Slider Físico.
 * Expansão profunda de dados geográficos e ampliação de probabilidade nos jogos.
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 1. INICIALIZAÇÃO CORRETA E IMEDIATA DO PLUGIN VLIBRAS
    // ==========================================================================
    if (window.VLibras) {
        new window.VLibras.Widget('https://vlibras.gov.br/app');
    }

    const btnLibras = document.getElementById("btn-libras");
    btnLibras.addEventListener("click", () => {
        if (window.vlibrasWidget && typeof window.vlibrasWidget.toggleOpen === "function") {
            window.vlibrasWidget.toggleOpen();
        } else {
            // Gatilho secundário de segurança emulando o clique interno
            const interno = document.querySelector('[vw-access-button]');
            if (interno) interno.click();
        }
    });

    // ==========================================================================
    // 2. CORREÇÃO DE ACORDO COM O SLIDER FÍSICO (LARGURA DO CONTÊINER)
    // ==========================================================================
    const sliderSolo = document.getElementById("slider-solo");
    const imgAfterBox = document.getElementById("img-after-box");
    const imgDinamica = document.getElementById("img-after-dinamica");
    const separatorLine = document.getElementById("slider-separator-line");
    const containerBlock = document.getElementById("slider-container-block");

    if (sliderSolo && imgAfterBox && imgDinamica && separatorLine && containerBlock) {
        const recalcularLarguraImagem = () => {
            const larguraAtual = containerBlock.offsetWidth;
            imgDinamica.style.width = `${larguraAtual}px`;
        };

        recalcularLarguraImagem();
        window.addEventListener("resize", recalcularLarguraImagem);

        sliderSolo.addEventListener("input", (e) => {
            const pct = e.target.value;
            imgAfterBox.style.width = `${pct}%`;
            separatorLine.style.left = `${pct}%`;
        });
    }

    // ==========================================================================
    // 3. CENTRAL DE INFORMAÇÕES GEOGRÁFICAS AMPLADA (5 ESTADOS + 3 REGIOES)
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
            titulo: "Estado de Minas Gerais (Novo)", 
            prod: "Maior produtor de café do país, com destaque para grãos especiais de alta qualidade cultivados em montanha.", 
            gestao: "Certificações socioambientais rígidas exigidas pelo mercado europeu, focadas na conservação da biodiversidade do Cerrado.", 
            tech: "Uso intensivo de sensores foliares e análise de solo em tempo real via inteligência artificial." 
        },
        "rs": { 
            titulo: "Estado do Rio Grande do Sul (Novo)", 
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
    // 4. QUIZ EXPANDIDO PARA 7 PERGUNTAS (COM IDENTIFICAÇÃO VISUAL DALTONISMO)
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
                        botoes[quizD[qAt].a].textContent = "✔️ RESPOSTA CORRETA — " + botoes[quizD[qAt].a].textContent;
                    }
                    setTimeout(() => { qAt++; carregarQ(); }, 2000);
                });
                oB.appendChild(b);
            });
        } else {
            document.getElementById("quiz-body").style.display = "none";
            document.getElementById("quiz-result").style.display = "block";
            document.getElementById("medal-title").textContent = "Quiz Concluído!";
            document.getElementById("medal-desc").textContent = "🏅 Excelente! Você completou todas as 7 perguntas de sustentabilidade!";
        }
    };

    document.getElementById("btn-reset-quiz").addEventListener("click", () => {
        qAt = 0;
        document.getElementById("quiz-result").style.display = "none";
        document.getElementById("quiz-body").style.display = "block";
        carregarQ();
    });
    carregarQ();

    // ==========================================================================
    // 5. MINI-RPG EXPANDIDO PARA 5 JORNADAS COM BOTÃO REINICIAR
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
            txt.textContent = "Etapa 4 (Nova): Monitoramento de dados da plantação. Deseja contratar mapeamento por drone?";
            const b1 = document.createElement("button"); b1.className = "btn-opt"; b1.textContent = "Sim, contratar voos multiespectrais quinzenais (Custo: R$ 700)";
            b1.addEventListener("click", () => { rpg.safra += 15; rpg.caixa -= 700; etapaRpg = 5; rodarRpg(); });
            const b2 = document.createElement("button"); b2.className = "btn-opt"; b2.textContent = "Não, fazer a inspeção de forma visual a pé (Sem custo)";
            b2.addEventListener("click", () => { rpg.safra -= 10; etapaRpg = 5; rodarRpg(); });
            ch.appendChild(b1); ch.appendChild(b2);
        }
        else if (etapaRpg === 5) {
            txt.textContent = "Etapa 5 (Nova): Destinação dos resíduos e palhas sobressalentes da colheita.";
            const b1 = document.createElement("button"); b1.className = "btn-opt"; b1.textContent = "Transformar em compostagem orgânica viva (Custo: R$ 500)";
            b1.addEventListener("click", () => { rpg.eco += 20; rpg.caixa -= 500; etapaRpg = 6; rodarRpg(); });
            const b2 = document.createElement("button"); b2.className = "btn-opt"; b2.textContent = "Descartar fora da propriedade sem tratamento (Sem custo)";
            b2.addEventListener("click", () => { rpg.eco -= 15; etapaRpg = 6; rodarRpg(); });
            ch.appendChild(b1); ch.appendChild(b2);
        }
        else {
            txt.textContent = "🎉 Jornada Finalizada! Relatório de Performance da Fazenda:";
            ch.innerHTML = "";
            resBox.style.display = "block";
            
            const msgFinal = document.getElementById("rpg-final-msg");
            if (rpg.eco >= 80 && rpg.safra >= 70) {
                msgFinal.textContent = "🏆 Gestor de Elite! Sua fazenda obteve pontuações máximas em preservação ecológica e rendimento produtivo sustentável!";
            } else if (rpg.caixa < 1000) {
                msgFinal.textContent = "⚠️ Crise de Caixa: A sustentabilidade foi boa, mas sua reserva financeira ficou perigosamente baixa!";
            } else {
                msgFinal.textContent = "👍 Fazenda Estável: Sua produção operou de maneira segura, mas com margem para maior uso de tecnologias verdes.";
            }
        }
    };

    document.getElementById("btn-reset-rpg").addEventListener("click", () => {
        rpg = { safra: 50, eco: 50, caixa: 5000 };
        etapaRpg = 1;
        document.getElementById("rpg-result").style.display = "none";
        rodarRpg();
    });
    rodarRpg();

    // MENU MOBILE
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    if(menuToggle) {
        menuToggle.addEventListener("click", () => navMenu.classList.toggle("active"));
    }

    // ACESSABILIDADE BASICA
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

    // FONT ADJUST
    let rootSize = 18;
    document.getElementById("btn-font-plus").addEventListener("click", () => {
        if (rootSize < 26) { rootSize += 2; document.documentElement.style.setProperty('--tamanho-base', `${rootSize}px`); }
    });
    document.getElementById("btn-font-minus").addEventListener("click", () => {
        if (rootSize > 14) { rootSize -= 2; document.documentElement.style.setProperty('--tamanho-base', `${rootSize}px`); }
    });

    // ACCORDIONS
    document.querySelectorAll(".accordion-header").forEach(header => {
        header.addEventListener("click", () => {
            const content = header.nextElementSibling;
            content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + "px";
        });
    });

    // CALCULADORA
    const btnCalcular = document.getElementById("btn-calcular");
    if (btnCalcular) {
        btnCalcular.addEventListener("click", () => {
            const ha = parseFloat(document.getElementById("calc-hec").value);
            const cult = document.getElementById("calc-cultura").value;
            const resultCalc = document.getElementById("result-calc");
            let fator = cult === "milho" ? 2.5 : (cult === "soja" ? 2.0 : 1.8);
            resultCalc.innerHTML = `
                <h4>Dosagem:</h4>
                <p>📍 Área: <strong>${ha} Hectares</strong></p>
                <p>🪱 Orgânico: <strong> ${(ha * fator).toFixed(1)} Toneladas</strong></p>
            `;
            resultCalc.style.display = "block";
        });
    }

    // SENSOR
    const sliderUmidade = document.getElementById("slider-umidade");
    const valUmidade = document.getElementById("val-umidade");
    const sensorStatus = document.getElementById("sensor-status");
    if (sliderUmidade) {
        sliderUmidade.addEventListener("input", (e) => {
            valUmidade.textContent = e.target.value;
            if(e.target.value < 30) {
                sensorStatus.textContent = "Alerta: Solo Seco!"; sensorStatus.className = "sensor-display status-perigo";
            } else {
                sensorStatus.textContent = "Status: Ideal."; sensorStatus.className = "sensor-display status-ideal";
            }
        });
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