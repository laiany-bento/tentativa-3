/**
 * ARQUIVO: main.js
 * FUNCIONALIDADE: Controle de acessibilidade avançada expansível, Libras, mini mapa e simuladores.
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 1. MENU FLUTUANTE DE ACESSIBILIDADE FIXO (BOTÃO ENGRENAGEM)
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

    // Fecha o menu ao clicar fora dele na tela
    document.addEventListener("click", () => {
        menu.style.display = "none";
        trigger.setAttribute("aria-expanded", "false");
        menu.setAttribute("aria-hidden", "true");
    });
    menu.addEventListener("click", (e) => e.stopPropagation());

    // ==========================================================================
    // 2. FUNÇÕES DO PAINEL: MODO CLARO/ESCURO, CONTRASTE, DISLEXIA
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
    // 3. DIMENSIONADOR DINÂMICO DE TAMANHO DE FONTE (A+ / A-)
    // ==========================================================================
    const btnFontPlus = document.getElementById("btn-font-plus");
    const btnFontMinus = document.getElementById("btn-font-minus");
    let rootSize = 16; // Tamanho base em pixels (16px)

    btnFontPlus.addEventListener("click", () => {
        if (rootSize < 24) { // Limite máximo seguro
            rootSize += 2;
            document.documentElement.style.setProperty('--tamanho-base', `${rootSize}px`);
        }
    });

    btnFontMinus.addEventListener("click", () => {
        if (rootSize > 12) { // Limite mínimo legível
            rootSize -= 2;
            document.documentElement.style.setProperty('--tamanho-base', `${rootSize}px`);
        }
    });

    // ==========================================================================
    // 4. BOTÃO FIXO DE LIBRAS
    // ==========================================================================
    const btnLibras = document.getElementById("btn-libras");
    btnLibras.addEventListener("click", () => {
        alert("Acessibilidade em Libras Ativada! Aqui você pode integrar um plugin oficial como o widget do VLibras para tradução automatizada de sinais.");
    });

    // ==========================================================================
    // 5. CONEXÃO DO MINI MAPA E BOTÕES REGIONAIS
    // ==========================================================================
    const dadosRegioes = {
        "pr": { titulo: "Paraná (Geral)", prod: "Líder em gerenciamento sustentável de bacias.", gestao: "Proteção de microbacias integradas.", tech: "Tecnologia de telemetria hídrica pura." },
        "mt": { titulo: "Mato Grosso", prod: "Expansão maciça de safras monitoradas.", gestao: "Uso otimizado de reservatórios solares.", tech: "Monitoramento de evapotranspiração por satélite." },
        "sp": { titulo: "São Paulo", prod: "Produção sucroalcoleira de ponta.", gestao: "Reuso total de água industrial.", tech: "Drones analíticos de alta performance." },
        "pr-norte": { titulo: "Norte do Paraná", prod: "Cultivos protegidos e fruticultura irrigada.", gestao: "Conservação estruturada de microtúneis de água.", tech: "Sensores de umidade conectados via rádio." },
        "pr-oeste": { titulo: "Oeste do Paraná", prod: "Referência em cooperativismo integrado.", gestao: "Uso de biodigestores para tratamento de resíduos.", tech: "Sistemas automáticos de distribuição hídrica." },
        "pr-sul": { titulo: "Sul / Campos Gerais (PR)", prod: "Grãos de inverno de alta qualidade.", gestao: "Rotação contínua e preservação orgânica.", tech: "Piloto automático em maquinário pesado de precisão." }
    };

    const painel = document.getElementById("painel-indicadores");
    const botoesGeo = document.querySelectorAll(".btn-geo, .map-node");

    const atualizarPainelGeo = (idRegiao) => {
        const dados = dadosRegioes[idRegiao];
        if (!dados) return;
        painel.innerHTML = `
            <h3>${dados.titulo}</h3>
            <p style="margin-top: 10px;"><strong>💎 Foco de Produção:</strong> ${dados.prod}</p>
            <p><strong>💧 Ação Ambiental:</strong> ${dados.gestao}</p>
            <p><strong>🌐 Infraestrutura Tech:</strong> ${dados.tech}</p>
        `;
    };

    botoesGeo.forEach(el => {
        el.addEventListener("click", () => {
            botoesGeo.forEach(b => b.classList.remove("active"));
            const regiao = el.getAttribute("data-region");
            // Se for um botão de texto, adiciona a classe active visual
            if (el.classList.contains("btn-geo")) el.classList.add("active");
            atualizarPainelGeo(regiao);
        });
    });
    atualizarPainelGeo("pr"); // Inicialização padrão

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
    // 7. COMPARAÇÃO ANTES E DEPOIS
    // ==========================================================================
    const sliderSolo = document.getElementById("slider-solo");
    const imgAfter = document.querySelector(".image-after");
    if (sliderSolo && imgAfter) {
        sliderSolo.addEventListener("input", (e) => {
            imgAfter.style.width = `${e.target.value}%`;
        });
    }

    // ==========================================================================
    // 8. ACCORDION EXPANSÍVEL
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
    // 9. CALCULADORA DE BIOINSUMOS
    // ==========================================================================
    const btnCalcular = document.getElementById("btn-calcular");
    if (btnCalcular) {
        btnCalcular.addEventListener("click", () => {
            const ha = parseFloat(document.getElementById("calc-hec").value);
            const cult = document.getElementById("calc-cultura").value;
            const resultCalc = document.getElementById("result-calc");

            if(isNaN(ha) || ha <= 0) return alert("Digite uma área válida.");

            let composto = cult === "milho" ? 2.5 : 2.0;
            resultCalc.innerHTML = `
                <h4>Dosagem Estimada:</h4>
                <p>📍 Área: <strong>${ha} ha</strong></p>
                <p>🪱 Composto Protetor: <strong> ${(ha * composto).toFixed(1)} T</strong></p>
                <p>🧪 Biofertilizantes: <strong> ${(ha * 15).toFixed(0)} Litros</strong></p>
            `;
            resultCalc.style.display = "block";
        });
    }

    // ==========================================================================
    // 10. SIMULADOR DE SENSOR DE UMIDADE
    // ==========================================================================
    const sliderUmidade = document.getElementById("slider-umidade");
    const valUmidade = document.getElementById("val-umidade");
    const sensorStatus = document.getElementById("sensor-status");

    const checarSensor = (val) => {
        valUmidade.textContent = val;
        sensorStatus.className = "sensor-display";
        if(val < 30) {
            sensorStatus.textContent = "Alerta: Solo Seco!"; sensorStatus.classList.add("status-perigo");
        } else if(val > 70) {
            sensorStatus.textContent = "Alerta: Solo Saturado!"; sensorStatus.classList.add("status-alerta");
        } else {
            sensorStatus.textContent = "Status: Umidade Ideal."; sensorStatus.classList.add("status-ideal");
        }
    };
    if (sliderUmidade) {
        sliderUmidade.addEventListener("input", (e) => checarSensor(e.target.value));
        document.getElementById("btn-calor").addEventListener("click", () => { sliderUmidade.value = 15; checarSensor(15); });
        document.getElementById("btn-chuva").addEventListener("click", () => { sliderUmidade.value = 85; checarSensor(85); });
    }

    // ==========================================================================
    // 11. QUIZ E RPG RURAL
    // ==========================================================================
    const quizD = [{ q: "Qual a vantagem de proteger matas ciliares?", o: ["Evita assoreamento e protege rios", "Gera mais área limpa de grãos", "Aumenta o vento local"], a: 0 }];
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
                    setTimeout(() => { qAt++; carregarQ(); }, 1200);
                });
                oB.appendChild(b);
            });
        } else {
            document.getElementById("quiz-body").style.display = "none";
            const res = document.getElementById("quiz-result"); res.style.display = "block";
            document.getElementById("medal-title").textContent = "Quiz Concluído!";
            document.getElementById("medal-desc").textContent = "🏅 Você demonstrou pleno conhecimento ecológico!";
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
        
        txt.textContent = "Decisão: Instalar captação de energia solar flutuante na represa principal por R$ 1.500?";
        const ch = document.getElementById("rpg-choices"); ch.innerHTML = "";
        
        const b1 = document.createElement("button"); b1.className = "btn-opt"; b1.textContent = "Sim (Economiza água e gera energia)";
        b1.addEventListener("click", () => { rpg.eco += 20; rpg.caixa -= 1500; txt.textContent = "Ótima escolha! Sua fazenda agora é autossustentável."; ch.innerHTML = ""; });
        
        const b2 = document.createElement("button"); b2.className = "btn-opt"; b2.textContent = "Não (Guardar dinheiro em caixa)";
        b2.addEventListener("click", () => { rpg.eco -= 10; txt.textContent = "O nível da represa baixou devido à evaporação alta."; ch.innerHTML = ""; });
        
        ch.appendChild(b1); ch.appendChild(b2);
    };
    rodarRpg();

    // ==========================================================================
    // 12. EFEITO DE SURGIMENTO AO ROLAR (SCROLL ANIMATION)
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