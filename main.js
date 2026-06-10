/**
 * ARQUIVO: main.js
 * FUNCIONALIDADE: Correção do Slider (Antes/Depois) via Clip-Path, Painel de Acessibilidade,
 * Libras integrado e simuladores agronômicos.
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 1. MENU EXPANSIVEL DE ACESSIBILIDADE (BOTÃO ENGRENAGEM COORDENADO)
    // ==========================================================================
    const trigger = document.getElementById("accessibility-trigger");
    const menu = document.getElementById("accessibility-menu");

    trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        const visivel = menu.style.display === "flex";
        menu.style.display = visivel ? "none" : "flex";
        trigger.setAttribute("aria-expanded", !visivel);
        menu.setAttribute("aria-hidden", visivel);
    });

    document.addEventListener("click", () => {
        menu.style.display = "none";
        trigger.setAttribute("aria-expanded", "false");
        menu.setAttribute("aria-hidden", "true");
    });
    menu.addEventListener("click", (e) => e.stopPropagation());

    // ==========================================================================
    // 2. TEMAS E LOCALSTORAGE
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
    // 3. CONTROLADOR DE TAMANHO DE FONTE (A+ / A-)
    // ==========================================================================
    const btnFontPlus = document.getElementById("btn-font-plus");
    const btnFontMinus = document.getElementById("btn-font-minus");
    let rootSize = 16;

    btnFontPlus.addEventListener("click", () => {
        if (rootSize < 24) {
            rootSize += 2;
            document.documentElement.style.setProperty('--tamanho-base', `${rootSize}px`);
        }
    });

    btnFontMinus.addEventListener("click", () => {
        if (rootSize > 12) {
            rootSize -= 2;
            document.documentElement.style.setProperty('--tamanho-base', `${rootSize}px`);
        }
    });

    // ==========================================================================
    // 4. CORREÇÃO CRÍTICA: FUNCIONAMENTO DO SLIDER (ANTES E DEPOIS)
    // ==========================================================================
    const sliderSolo = document.getElementById("slider-solo");
    const imgAfter = document.querySelector(".img-after");

    if (sliderSolo && imgAfter) {
        sliderSolo.addEventListener("input", (e) => {
            const valorSlider = e.target.value;
            // Modifica o recorte da imagem de cima (img-after) em tempo real
            // Inset(cima, direita, baixo, esquerda) -> Controlamos o corte na esquerda
            imgAfter.style.clipPath = `inset(0 0 0 ${valorSlider}%)`;
        });
    }

    // ==========================================================================
    // 5. BANCO DE DADOS FORMATIVO: CENTRAL DE INDICADORES DO MAPA
    // ==========================================================================
    const dadosRegioes = {
        "pr": { 
            titulo: "Estado do Paraná (Geral)", 
            prod: "Referência histórica na produção sustentável de grãos. O estado é pioneiro absoluto na técnica de Plantio Direto na Palhada, protegendo o solo contra o desgaste climático.", 
            gestao: "Implementação das diretrizes do Código Florestal através de monitoramento por satélite de rios, impedindo contaminações e assoreamento.", 
            tech: "Infraestrutura avançada de sensores IoT coletando dados de umidade e acidez em tempo real para cooperativas locais." 
        },
        "mt": { 
            titulo: "Estado do Mato Grosso", 
            prod: "Maior produtor nacional de biomassa vegetal, soja e milho safrinha de alta performance tecnológica.", 
            gestao: "Adoção pioneira de créditos de carbono no mercado internacional, certificando propriedades com desmatamento zero.", 
            tech: "Frotas pesadas de maquinários e tratores autônomos operando via georreferenciamento e GPS de precisão milimétrica." 
        },
        "sp": { 
            titulo: "Estado de São Paulo", 
            prod: "Líder global na cadeia produtiva do açúcar, da laranja e na produção de etanol limpo (Biocombustíveis).", 
            gestao: "Tratamento e reutilização de 100% da água industrial usada na lavagem e processamento dos insumos agrícolas nas usinas.", 
            tech: "Maior adensamento de AgTechs (startups agrícolas) desenvolvendo inteligências artificiais analíticas exclusivas." 
        },
        "pr-norte": { 
            titulo: "Macrorregião Norte do Paraná", 
            prod: "Polo tradicional de cafeicultura especial e produção frutífera integrada sob malhas de proteção estrutural.", 
            gestao: "Programas de recuperação biológica de solos arenosos por meio de adubação verde e microbiologia regenerativa.", 
            tech: "Estações meteorológicas compactas compartilhadas emitindo boletins instantâneos via aplicativos móveis aos pequenos produtores." 
        },
        "pr-oeste": { 
            titulo: "Macrorregião Oeste do Paraná", 
            prod: "Gigante econômico na produção de proteína animal e rações balanceadas de alta conversão alimentar.", 
            gestao: "Transformação de dejetos orgânicos animais em Biogás altamente rentável, gerando autossuficiência energética nas fazendas.", 
            tech: "Sistemas robotizados automáticos para climatização e alimentação precisa nos galpões de criação inteligente." 
        },
        "pr-sul": { 
            titulo: "Sul e Campos Gerais (PR)", 
            prod: "Excelência técnica na produção de grãos de inverno (trigo e cevada) e bacia leiteira de padrão internacional.", 
            gestao: "Rotação intensiva e científica de culturas agrícolas que impede o esgotamento químico dos nutrientes do solo.", 
            tech: "Uso de drones multiespectrais operando mapeamentos aéreos com relatórios automáticos gerados por IA." 
        }
    };

    const painel = document.getElementById("painel-indicadores");
    const botoesGeo = document.querySelectorAll(".btn-geo, .map-node");

    const atualizarPainelGeo = (idRegiao) => {
        const dados = dadosRegioes[idRegiao];
        if (!dados) return;
        painel.innerHTML = `
            <h3>${dados.titulo}</h3>
            <p style="margin-top: 12px; font-size:1.05rem;"><strong>🌾 Cenário de Produção:</strong> ${dados.prod}</p>
            <p style="margin-top: 8px; font-size:1.05rem;"><strong>💧 Ação e Gestão Ambiental:</strong> ${dados.gestao}</p>
            <p style="margin-top: 8px; font-size:1.05rem;"><strong>⚡ Tecnologia de Ponta Aplicada:</strong> ${dados.tech}</p>
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
    atualizarPainelGeo("pr"); // Carrega Paraná por padrão

    // ==========================================================================
    // 6. MENU RESPONSÍVEL MOBILE
    // ==========================================================================
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    menuToggle.addEventListener("click", () => {
        const exp = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", !exp);
        navMenu.classList.toggle("active");
    });

    // ==========================================================================
    // 7. ACCORDION EXPANSÍVEL
    // ==========================================================================
    document.querySelectorAll(".accordion-header").forEach(header => {
        header.addEventListener("click", () => {
            const content = header.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // ==========================================================================
    // 8. CALCULADORA DE BIOINSUMOS
    // ==========================================================================
    const btnCalcular = document.getElementById("btn-calcular");
    if (btnCalcular) {
        btnCalcular.addEventListener("click", () => {
            const ha = parseFloat(document.getElementById("calc-hec").value);
            const cult = document.getElementById("calc-cultura").value;
            const resultCalc = document.getElementById("result-calc");

            if(isNaN(ha) || ha <= 0) return alert("Por favor, digite um hectare válido.");

            let compostoFator = cult === "milho" ? 2.5 : (cult === "soja" ? 2.0 : 1.8);
            resultCalc.innerHTML = `
                <h4>Dosagem Recomendada para Substituição de NPK Químico:</h4>
                <p>📍 Área de Trabalho: <strong>${ha} Hectares</strong></p>
                <p>🪱 Composto Protetor Orgânico: <strong> ${(ha * compostoFator).toFixed(1)} Toneladas</strong></p>
                <p>🧪 Biofertilizantes de Bactérias Vivas: <strong> ${(ha * 15).toFixed(0)} Litros</strong></p>
            `;
            resultCalc.style.display = "block";
        });
    }

    // ==========================================================================
    // 9. SIMULADOR DE SENSOR DE UMIDADE DO SOLO
    // ==========================================================================
    const sliderUmidade = document.getElementById("slider-umidade");
    const valUmidade = document.getElementById("val-umidade");
    const sensorStatus = document.getElementById("sensor-status");

    const checarSensor = (val) => {
        valUmidade.textContent = val;
        sensorStatus.className = "sensor-display";
        if(val < 30) {
            sensorStatus.textContent = "Alerta Crítico: Solo Seco! Desencadeando liberação de válvulas automáticas por gotejamento."; 
            sensorStatus.classList.add("status-perigo");
        } else if(val > 70) {
            sensorStatus.textContent = "Alerta Hídrico: Solo Saturado/Alagado. Desligando todos os sistemas de aspersão."; 
            sensorStatus.classList.add("status-alerta");
        } else {
            sensorStatus.textContent = "Status: Umidade Perfeita detectada por IoT. Mantendo economia de água ativada."; 
            sensorStatus.classList.add("status-ideal");
        }
    };
    if (sliderUmidade) {
        sliderUmidade.addEventListener("input", (e) => checarSensor(e.target.value));
        document.getElementById("btn-calor").addEventListener("click", () => { sliderUmidade.value = 12; checarSensor(12); });
        document.getElementById("btn-chuva").addEventListener("click", () => { sliderUmidade.value = 88; checarSensor(88); });
    }

    // ==========================================================================
    // 10. QUIZ E RPG RURAL FORMATIVOS
    // ==========================================================================
    const quizD = [
        { q: "Qual a vantagem biológica de proteger as matas ciliares no entorno das fazendas?", o: ["Evita o assoreamento de rios e resguarda as nascentes d'água", "Aumenta o espaço para circulação de tratores grandes", "Impede o crescimento excessivo de mato selvagem"], a: 0 },
        { q: "O que caracteriza a tecnologia de precisão adotada no Agrinho 2026?", o: ["O uso manual de ferramentas rudimentares", "A aplicação de insumos de forma uniforme em toda a fazenda", "A aplicação cirúrgica baseada em dados reais de sensores e satélites"], a: 2 }
    ];
    let qAt = 0;
    const carregarQ = () => {
        const qB = document.getElementById("quiz-question");
        const oB = document.getElementById("quiz-options");
        if(!qB) return;
        if(qAt < quizD.length) {
            qB.textContent = quizD[qAt].q; oB.innerHTML = "";
            quizD[qAt].o.forEach((o, i) => {
                const b = document.createElement("button"); b.className = "btn-opt"; b.textContent = o;
                b.addEventListener("click", () => {
                    b.classList.add(i === quizD[qAt].a ? "correct" : "wrong");
                    setTimeout(() => { qAt++; carregarQ(); }, 1500);
                });
                oB.appendChild(b);
            });
        } else {
            document.getElementById("quiz-body").style.display = "none";
            const res = document.getElementById("quiz-result"); res.style.display = "block";
            document.getElementById("medal-title").textContent = "Quiz Concluído!";
            document.getElementById("medal-desc").textContent = "🏅 Excelente! Você dominou os fundamentos de Sustentabilidade do Agrinho!";
        }
    };
    carregarQ();

    let rpg = { safra: 50, eco: 50, caixa: 5000 };
    const rodarRpg = () => {
        const txt = document.getElementById("rpg-text");
        if(!txt) return;
        document.getElementById("rpg-safra").textContent = rpg.safra;
        document.getElementById("rpg-eco").textContent = rpg.eco;
        document.getElementById("rpg-caixa").textContent = rpg.caixa;
        
        txt.textContent = "Decisão de Gestão: Investir R$ 2.000 para cobrir o reservatório de irrigação com painéis solares flutuantes?";
        const ch = document.getElementById("rpg-choices"); ch.innerHTML = "";
        
        const b1 = document.createElement("button"); b1.className = "btn-opt"; b1.textContent = "Sim (Gera energia própria e diminui a perda de água por evaporação)";
        b1.addEventListener("click", () => { rpg.eco += 25; rpg.caixa -= 2000; rpg.safra += 10; txt.textContent = "Sucesso! Seus custos elétricos despencaram e sua reserva de água está protegida."; ch.innerHTML = ""; });
        
        const b2 = document.createElement("button"); b2.className = "btn-opt"; b2.textContent = "Não (Evitar gastos imediatos e manter caixa livre)";
        b2.addEventListener("click", () => { rpg.eco -= 15; txt.textContent = "A forte evaporação do verão reduziu drasticamente seu estoque de água disponível."; ch.innerHTML = ""; });
        
        ch.appendChild(b1); ch.appendChild(b2);
    };
    rodarRpg();

    // ==========================================================================
    // 11. ANIMAÇÃO DE SCROLL
    // ==========================================================================
    const elScroll = document.querySelectorAll(".animar-scroll");
    const checkScroll = () => {
        elScroll.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight * 0.85) el.classList.add("ativo");
        });
    };
    window.addEventListener("scroll", checkScroll);
    checkScroll();
});