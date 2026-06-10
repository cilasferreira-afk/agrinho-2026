// Banco de dados corrigido (sem espaços no nome da variável)
const perguntasOnePiece = [
    {
        pergunta: "[Ilha dos Tritões] A tripulação precisa proteger os corais e a água da ilha. Qual técnica agrícola do nosso mundo evita a contaminação dos rios e do lençol freático?",
        alternativas: [
            "A) Uso excessivo de fertilizantes químicos industriais para acelerar as mudas.",
            "B) O Manejo Integrado de Pragas (MIP), usando inimigos naturais em vez de venenos químicos.",
            "C) Desviar os rios inteiros para regar a plantação de uma só vez.",
            "D) Jogar os resíduos da criação de animais diretamente nas praias."
        ],
        correta: 1
    },
    {
        pergunta: "[Ilha de Alabasta] Como o povo do deserto de Alabasta poderia produzir alimentos mantendo o solo produtivo e economizando a preciosa água?",
        alternativas: [
            "A) Plantando apenas espécies que consomem muita água e cobrindo a areia com asfalto.",
            "B) Praticando a queima da terra seca para limpar o terreno.",
            "C) Usando irrigação por gotejamento de precisão e plantio direto para manter a umidade do solo.",
            "D) Esperando chover uma vez por ano sem fazer nenhuma ação técnica."
        ],
        correta: 2
    },
    {
        pergunta: "[Ilha de Skypiea] Sanji precisa cozinhar para o bando usando energia limpa que não polua o ar do céu. Qual fonte de energia é ideal para uma fazenda moderna e sustentável?",
        alternativas: [
            "A) Energia Solar (painéis fotovoltaicos) e Biogás gerado de dejetos orgânicos.",
            "B) Motores a diesel antigos gerando fumaça preta constantemente.",
            "C) Queima de carvão vegetal vindo de matas nativas derrubadas.",
            "D) Energia baseada em pilhas descartáveis comuns jogadas na terra."
        ],
        correta: 0
    },
    {
        pergunta: "[Ilha de Zou] Chopper quer garantir que o solo da floresta continue rico para gerar plantas medicinais. Qual prática protege a estrutura física e biológica do solo?",
        alternativas: [
            "A) Passar o trator revirando a terra dezenas de vezes até ela perder a umidade.",
            "B) A Rotação de Culturas combinada com o Plantio Direto sobre a palhada anterior.",
            "C) Deixar a terra completamente nua e exposta ao sol forte e à chuva.",
            "D) Substituir toda a vegetação local por grama sintética artificial."
        ],
        correta: 1
    },
    {
        pergunta: "[Wano Country] Para restaurar as terras poluídas pelas fábricas antigas de Wano, o que o Shogun Momonosuke deve incentivar no novo Agro da ilha?",
        alternativas: [
            "A) O abandono total da tecnologia e a volta da produção rudimentar com baixa eficiência.",
            "B) O desmatamento das florestas sagradas para abrir mais pastos.",
            "C) O Agro Forte e Tecnológico: drones monitorando a saúde das plantas e reflorestamento de Áreas de Preservação.",
            "D) A importação de alimentos de outras ilhas sem produzir nada localmente."
        ],
        correta: 2
    }
];

let perguntaAtual = 0;
let pontuacao = 0;

// Inicialização segura dos elementos do DOM
const telaInicial = document.getElementById('tela-inicial');
const telaJogo = document.getElementById('tela-jogo');
const telaResultado = document.getElementById('tela-resultado');

const contadorPerguntas = document.getElementById('contador-perguntas');
const pontuacaoAtual = document.getElementById('pontuacao-atual');
const progressoNavio = document.getElementById('progresso-navio');
const textoPergunta = document.getElementById('texto-pergunta');
const opcoesContainer = document.getElementById('opcoes-container');
const feedback = document.getElementById('feedback');
const btnProxima = document.getElementById('btn-proxima');
const valorBerries = document.getElementById('valor-berries');
const mensagemFinal = document.getElementById('mensagem-final');

function iniciarQuiz() {
    telaInicial.classList.add('escondido');
    telaJogo.classList.remove('escondido');
    perguntaAtual = 0;
    pontuacao = 0;
    mostrarPergunta();
}

function mostrarPergunta() {
    feedback.classList.add('escondido');
    btnProxima.classList.add('escondido');
    opcoesContainer.innerHTML = '';

    contadorPerguntas.innerText = `Ilha ${perguntaAtual + 1} de ${perguntasOnePiece.length}`;
    pontuacaoAtual.innerText = `Recompensa: ${pontuacao.toLocaleString()} ฿`;
    
    // Calcula o movimento do navio ⛵ pela barra
    const porcentagem = (perguntaAtual / perguntasOnePiece.length) * 100;
    progressoNavio.style.left = `calc(${porcentagem}% - 15px)`;

    const dados = perguntasOnePiece[perguntaAtual];
    textoPergunta.innerText = dados.pergunta;

    dados.alternativas.forEach((alternativa, indice) => {
        const botao = document.createElement('button');
        botao.innerText = alternativa;
        botao.classList.add('btn-opcao');
        botao.onclick = () => validarEscolha(indice, botao);
        opcoesContainer.appendChild(botao);
    });
}

function validarEscolha(indiceSelecionado, botaoClicado) {
    const dados = perguntasOnePiece[perguntaAtual];
    const botoes = opcoesContainer.querySelectorAll('.btn-opcao');

    botoes.forEach(b => b.disabled = true);

    if (indiceSelecionado === dados.correta) {
        botaoClicado.classList.add('correta');
        pontuacao += 20000000; 
        pontuacaoAtual.innerText = `Recompensa: ${pontuacao.toLocaleString()} ฿`;
        
        feedback.innerText = "⭐ SUGEEE! Resposta certa! Luffy sorriu e o meio ambiente agradece!";
        feedback.className = "feedback sucesso";
    } else {
        botaoClicado.classList.add('incorreta');
        botoes[dados.correta].classList.add('correta');
        
        feedback.innerText = "💥 Que sufoco! Essa ação prejudica a ilha. Nami te deu um cascudo por errar o mapa!";
        feedback.className = "feedback erro";
    }

    feedback.classList.remove('escondido');
    btnProxima.classList.remove('escondido');
}

function proximaPergunta() {
    perguntaAtual++;
    if (perguntaAtual < perguntasOnePiece.length) {
        mostrarPergunta();
    } else {
        finalizarJornada();
    }
}

function finalizarJornada() {
    telaJogo.classList.add('escondido');
    telaResultado.classList.remove('escondido');
    
    valorBerries.innerText = `${pontuacao.toLocaleString()} Berries`;

    let comentario = "";
    if (pontuacao === 100000000) {
        comentario = "GÊNIO DO MAR! Com 100 Milhões de recompensa, você provou que o Agro Forte e o Futuro Sustentável caminham juntos! O bando te aceitou como o Diretor Ecológico do Thousand Sunny! 🏴‍☠️🌾";
    } else if (pontuacao >= 60000000) {
        comentario = "ÓTIMO PIRATA! Você navegou muito bem pelas ilhas e escolheu boas práticas para defender o planeta. Robin achou seus conhecimentos fascinantes! 📜🌱";
    } else {
        comentario = "VOLTE PARA O EAST BLUE! Sua pontuação foi baixa. É hora de estudar mais os guias do Agrinho para entender como equilibrar produção e natureza! 🌊📚";
    }

    mensagemFinal.innerHTML = comentario;
}

function reiniciarQuiz() {
    telaResultado.classList.add('escondido');
    telaInicial.classList.remove('escondido');
}