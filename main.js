/**
 * ARQUIVO: main.js
 * FUNCIONALIDADE: Correção absoluta do VLibras, Slider de Imagem via clip-path reativo,
 * expansão do Quiz de 5 etapas com suporte a daltonismo e RPG expansivo reajustável.
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 1. INICIALIZAÇÃO DE SEGURANÇA DO PLUGIN DE LIBRAS (GOVERNO FEDERAL)
    // ==========================================================================
    window.addEventListener('load', () => {
        if (window.VLibras) {
            new window.VLibras.Widget('https://vlibras.gov.br/app');
        }
    });

    const btnLibras = document.getElementById("btn-libras");
    btnLibras.addEventListener("click", () => {
        // Dispara a janela interna nativa ou emite aviso de carregamento de rede
        const nativeBtn = document.querySelector('[vw-access-button]');
        if (nativeBtn) {
            nativeBtn.click();
        } else if (window.vlibrasWidget) {
            window.vlibrasWidget.toggleOpen();
        } else {
            alert("O sistema do VLibras está se conectando com o servidor. Aguarde 3 segundos e tente novamente!");
        }
    });

    // ==========================================================================
    // 2. CORREÇÃO DEFINITIVA DO SLIDER ANTES/DEPOIS VIA PROPRIEDADE CLIP-PATH
    // ==========================================================================
    const sliderSolo = document.getElementById("slider-solo");
    const imgAfterBox = document.getElementById("img-after-box");
    const separatorLine = document.getElementById("slider-separator-line");

    if (sliderSolo && imgAfterBox && separatorLine) {
        sliderSolo.addEventListener("input", (e) => {
            const valor = e.target.value;
            // Aplica o percentual de corte perfeitamente de forma retilínea
            imgAfterBox.style.setProperty('--posicao-corte', `${valor}%`);
            separatorLine.style.left = `${valor}%`;
        });
    }

    // ==========================================================================
    // 3. MENU EXPANSÍVEL DE CONFIGURAÇÕES DE ACESSIBILIDADE
    // ==========================================================================
    const trigger = document.getElementById("accessibility-trigger");
    const menu = document.getElementById("accessibility-menu");

    trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        const visivel = menu.style.display === "flex";
        menu.style.display = visivel ? "none" : "flex";
    });

    document.addEventListener("click", () => { menu.style.display = "none"; });
    menu.addEventListener("click", (e) => e.stopPropagation());

    // ==========================================================================
    // 4. CHANGER DE TEMAS (MODO ESCURO, CONTRASTE, DISLEXIA)
    // ==========================================================================
    const gerenciarTema = (btnId, className) => {
        const btn = document.getElementById(btnId);
        if (localStorage.getItem(className) === "true") {
            document.body.classList.add(className);
        }
        btn.addEventListener("click", () => {
            const estado = document.body.classList.toggle(className);
            localStorage.setItem(className, estado);
        });
    };
    gerenciarTema("btn-dark", "dark-mode");
    gerenciarTema("btn-contrast", "high-contrast");
    gerenciarTema("btn-dyslexia", "dyslexia-font");

    // ==========================================================================
    // 5. REDIMENSIONADOR DE TEXTOS (A+ / A-)
    // ==========================================================================
    let rootSize = 18;
    document.getElementById("btn-font-plus").addEventListener("click", () => {
        if (rootSize < 26) { rootSize += 2; document.documentElement.style.setProperty('--tamanho-base', `${rootSize}px`); }
    });
    document.getElementById("btn-font-minus").addEventListener("click", () => {
        if (rootSize > 14) { rootSize -= 2; document.documentElement.style.setProperty('--tamanho-base', `${rootSize}px`); }
    });

    // ==========================================================================
    // 6. EXPANSÃO DO QUIZ (5 PERGUNTAS) COM AJUSTES DE TEXTO PARA DALTONISMO
    // ==========================================================================
    const quizD = [
        { q: "Qual a vantagem biológica de proteger as matas ciliares no entorno das fazendas?", o: ["Evita o assoreamento de rios e resguarda as nascentes d'água", "Aumenta o espaço para circulação de tratores grandes", "Impede o crescimento excessivo de mato selvagem"], a: 0 },
        { q: "O que caracteriza a tecnologia de precisão adotada no Agrinho 2026?", o: ["O uso manual de ferramentas rudimentares", "A aplicação de insumos de forma uniforme em toda a fazenda", "A aplicação cirúrgica baseada em dados reais de sensores e satélites"], a: 2 },
        { q: "Como a energia fotovoltaica flutuante ajuda o reservatório de água?", o: ["Esquenta a água para os peixes crescerem rápido", "Reduz a evaporação da água e gera energia elétrica limpa", "Aumenta o volume de chuva artificial na fazenda"], a: 1 },
        { q: "Qual a função dos sensores de umidade enterrados no solo?", o: ["Medir o peso dos tratores na lavoura", "Informar o nível de poluição do ar", "Enviar dados em tempo real para acionar a irrigação apenas quando necessário"], a: 2 },
        { q: "O que é o Plantio Direto na Palhada, técnica muito usada no Paraná?", o: ["Plantar sementes sem retirar os restos vegetais da colheita anterior", "Queimar a palha velha antes de colocar novas plantas", "Cultivar alimentos usando apenas água, sem terra"], a: 0 }
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
                    // Impede cliques múltiplos nas opções
                    const botoes = oB.querySelectorAll("button");
                    botoes.forEach(btn => btn.style.pointerEvents = "none");
                    
                    if (i === quizD[qAt].a) {
                        b.classList.add("correct");
                        b.textContent = "✔️ ACERTOU! - " + b.textContent; /* Inserção de texto explícito para daltonismo */
                    } else {
                        b.classList.add("wrong");
                        b.textContent = "❌ ERROU! - " + b.textContent;  /* Inserção de texto explícito para daltonismo */
                        botoes[quizD[qAt].a].classList.add("correct");
                    }
                    setTimeout(() => { qAt++; carregarQ(); }, 2000);
                });
                oB.appendChild(b);
            });
        } else {
            document.getElementById("quiz-body").style.display = "none";
            const res = document.getElementById("quiz-result"); 
            res.style.display = "block";
            document.getElementById("medal-title").textContent = "Quiz Finalizado!";
            document.getElementById("medal-desc").textContent = "🏅 Parabéns! Você completou toda a trilha pedagógica de sustentabilidade do Agrinho!";
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
    // 7. MINI-RPG EXPANDIDO E REINICIÁVEL (JORNADA EM 3 ETAPAS)
    // ==========================================================================
    let rpg = { safra: 50, eco: 50, caixa: 5000 };
    let etapaRpg = 1;

    const rodarRpg = () => {
        const txt = document.getElementById("rpg-text");
        const ch = document.getElementById("rpg-choices");
        const resBox = document.getElementById("rpg-result");
        if(!txt) return;

        // Atualiza a interface de status
        document.getElementById("rpg-safra").textContent = rpg.safra;
        document.getElementById("rpg-eco").textContent = rpg.eco;
        document.getElementById("rpg-caixa").textContent = rpg.caixa;
        ch.innerHTML = "";

        if (etapaRpg === 1) {
            txt.textContent = "Etapa 1: Investir R$ 2.000 para cobrir o reservatório de irrigação com painéis solares flutuantes?";
            
            const b1 = document.createElement("button"); b1.className = "btn-opt"; b1.textContent = "Sim (Gera energia limpa e diminui a evaporação da água)";
            b1.addEventListener("click", () => { rpg.eco += 20; rpg.caixa -= 2000; rpg.safra += 10; etapaRpg = 2; rodarRpg(); });
            
            const b2 = document.createElement("button"); b2.className = "btn-opt"; b2.textContent = "Não (Evitar despesas imediatas para guardar dinheiro em caixa)";
            b2.addEventListener("click", () => { rpg.eco -= 15; etapaRpg = 2; rodarRpg(); });
            
            ch.appendChild(b1); ch.appendChild(b2);
        } 
        else if (etapaRpg === 2) {
            txt.textContent = "Etapa 2: Foi detectada uma praga na lavoura vizinha. Qual será sua ação protetiva?";
            
            const b1 = document.createElement("button"); b1.className = "btn-opt"; b1.textContent = "Aplicar defensivo químico pesado imediatamente (Custo: R$ 1.500)";
            b1.addEventListener("click", () => { rpg.safra += 20; rpg.eco -= 25; rpg.caixa -= 1500; etapaRpg = 3; rodarRpg(); });
            
            const b2 = document.createElement("button"); b2.className = "btn-opt"; b2.textContent = "Utilizar controle biológico com vespas predadoras naturais (Custo: R$ 1.000)";
            b2.addEventListener("click", () => { rpg.eco += 20; rpg.safra += 15; rpg.caixa -= 1000; etapaRpg = 3; rodarRpg(); });
            
            ch.appendChild(b1); ch.appendChild(b2);
        }
        else if (etapaRpg === 3) {
            txt.textContent = "Etapa 3: Chegou a época de preparar o solo para o plantio de inverno. Como proceder?";
            
            const b1 = document.createElement("button"); b1.className = "btn-opt"; b1.textContent = "Arar e revirar toda a terra para limpar o campo rapidamente (Custo: R$ 500)";
            b1.addEventListener("click", () => { rpg.eco -= 20; rpg.caixa -= 500; etapaRpg = 4; rodarRpg(); });
            
            const b2 = document.createElement("button"); b2.className = "btn-opt"; b2.textContent = "Adotar o Plantio Direto mantendo a palha protetora do solo (Custo: R$ 800)";
            b2.addEventListener("click", () => { rpg.eco += 25; rpg.safra += 15; rpg.caixa -= 800; etapaRpg = 4; rodarRpg(); });
            
            ch.appendChild(b1); ch.appendChild(b2);
        }
        else {
            // Tela final de encerramento do RPG
            txt.textContent = "🎉 Jornada Finalizada! Veja o desempenho da sua fazenda:";
            ch.innerHTML = "";
            resBox.style.display = "block";
            
            const msgFinal = document.getElementById("rpg-final-msg");
            if (rpg.eco >= 75 && rpg.safra >= 60) {
                msgFinal.textContent = "🏆 Excelente Gestor! Sua propriedade alcançou o equilíbrio perfeito entre alta produção e preservação ecológica total!";
            } else if (rpg.caixa < 1000) {
                msgFinal.textContent = "⚠️ Alerta Financeiro: Suas decisões protegeram a natureza, mas o caixa ficou muito baixo. Cuidado com as dívidas!";
            } else {
                msgFinal.textContent = "👍 Fazenda Operacional: Você conseguiu colher, mas pode melhorar o uso de tecnologias sustentáveis na próxima rodada.";
            }
        }
    };

    // Botão de Reiniciar o RPG redefinindo os dados originais
    document.getElementById("btn-reset-rpg").addEventListener("click", () => {
        rpg = { safra: 50, eco: 50, caixa: 5000 };
        etapaRpg = 1;
        document.getElementById("rpg-result").style.display = "none";
        rodarRpg();
    });
    rodarRpg();

    // ==========================================================================
    // 8. MONITORAMENTO GEO DO MINI MAPA E SIMULADORES (MANTIDOS)
    // ==========================================================================
    const dadosRegioes = {
        "pr": { titulo: "Estado do Paraná (Geral)", prod: "Referência na produção sustentável de grãos. O estado é pioneiro absoluto na técnica de Plantio Direto.", gestao: "Monitoramento por satélite de rios, impedindo contaminações e assoreamento.", tech: "Infraestrutura avançada de sensores IoT coletando dados para cooperativas locais." },
        "mt": { titulo: "Estado do Mato Grosso", prod: "Maior produtor nacional de biomassa vegetal, soja e milho safrinha de alta performance.", gestao: "Adoção pioneira de créditos de carbono no mercado internacional.", tech: "Frotas pesadas de maquinários e tratores autônomos operando via georreferenciamento." },
        "sp": { titulo: "Estado de São Paulo", prod: "Líder global na cadeia produtiva do açúcar, da laranja e na produção de etanol limpo.", gestao: "Tratamento e reutilização de 100% da água industrial usada no processamento.", tech: "Maior adensamento de AgTechs desenvolvendo inteligências artificiais analíticas." },
        "pr-norte": { titulo: "Região Norte do Paraná", prod: "Polo tradicional de cafeicultura especial e produção frutífera integrada.", gestao: "Programas de recuperação biológica de solos arenosos por meio de adubação verde.", tech: "Estações meteorológicas compactas compartilhadas emitindo boletins instantâneos." },
        "pr-oeste": { titulo: "Região Oeste do Paraná", prod: "Gigante econômico na produção de proteína animal e rações balanceadas.", gestao: "Transformação de dejetos orgânicos animais em Biogás altamente rentável.", tech: "Sistemas robotizados automáticos para climatização nos galpões inteligentes." },
        "pr-sul": { titulo: "Sul e Campos Gerais (PR)", prod: "Excelência técnica na produção de grãos de inverno e bacia leiteira de padrão internacional.", gestao: "Rotação intensiva de culturas que impede o esgotamento químico do solo.", tech: "Uso de drones multiespectrais operando mapeamentos aéreos automatizados." }
    };

    const painel = document.getElementById("painel-indicadores");
    const botoesGeo = document.querySelectorAll(".btn-geo, .map-node");

    const atualizarPainelGeo = (idRegiao) => {
        const dados = dadosRegioes[idRegiao];
        if (!dados) return;
        painel.innerHTML = `
            <h3>${dados.titulo}</h3>
            <p style="margin-top: 12px;"><strong>🌾 Cenário de Produção:</strong> ${dados.prod}</p>
            <p style="margin-top: 8px;"><strong>💧 Gestão Ambiental:</strong> ${dados.gestao}</p>
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

    // LÓGICA DO MENU MOBILE
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
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
            if(isNaN(ha) || ha <= 0) return alert("Digite um valor válido.");
            let fator = cult === "milho" ? 2.5 : (cult === "soja" ? 2.0 : 1.8);
            resultCalc.innerHTML = `
                <h4>Dosagem Recomendada:</h4>
                <p>📍 Área: <strong>${ha} Hectares</strong></p>
                <p>🪱 Composto Orgânico: <strong> ${(ha * fator).toFixed(1)} Toneladas</strong></p>
                <p>🧪 Biofertilizantes: <strong> ${(ha * 15).toFixed(0)} Litros</strong></p>
            `;
            resultCalc.style.display = "block";
        });
    }

    // SENSOR DE UMIDADE
    const sliderUmidade = document.getElementById("slider-umidade");
    const valUmidade = document.getElementById("val-umidade");
    const sensorStatus = document.getElementById("sensor-status");

    const checarSensor = (val) => {
        valUmidade.textContent = val;
        sensorStatus.className = "sensor-display";
        if(val < 30) {
            sensorStatus.textContent = "Alerta Crítico: Solo Seco! Abrindo gotejamento automático."; 
            sensorStatus.classList.add("status-perigo");
        } else if(val > 70) {
            sensorStatus.textContent = "Alerta Hídrico: Solo Saturado. Desligando aspersores."; 
            sensorStatus.classList.add("status-alerta");
        } else {
            sensorStatus.textContent = "Status: Umidade Perfeita. Economia ativa."; 
            sensorStatus.classList.add("status-ideal");
        }
    };
    if (sliderUmidade) {
        sliderUmidade.addEventListener("input", (e) => checarSensor(e.target.value));
        document.getElementById("btn-calor").addEventListener("click", () => { sliderUmidade.value = 12; checarSensor(12); });
        document.getElementById("btn-chuva").addEventListener("click", () => { sliderUmidade.value = 88; checarSensor(88); });
    }

    // ANIMAÇÃO DE SCROLL
    const elScroll = document.querySelectorAll(".animar-scroll");
    const checkScroll = () => {
        elScroll.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight * 0.85) el.classList.add("ativo");
        });
    };
    window.addEventListener("scroll", checkScroll);
    checkScroll();
});