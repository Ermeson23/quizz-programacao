//Declaração de Variáveis
const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ["a", "b", "c", "d"];
let points = 0;
let actualQuestion = 0;

//Perguntas
const questions = [
    {
        "question": "PHP foi desenvolvido para ser utilizado em(no):",
        "answers": [
            {
                "answers": "Back-End",
                "correct": true
            },
            {
                "answers": "Front-End",
                "correct": false
            },
            {
                "answers": "Sistema Operacional",
                "correct": false
            },
            {
                "answers": "Banco de Dados",
                "correct": false
            }
        ]
    },
    {
        "question": "Uma forma de declarar variável em JavaScript:",
        "answers": [
            {
                "answers": "$var",
                "correct": false
            },
            {
                "answers": "var",
                "correct": true
            },
            {
                "answers": "@var",
                "correct": false
            },
            {
                "answers": "#let",
                "correct": false
            }
        ]
    },
    {
        "question": "O seletor de id no CSS é:",
        "answers": [
            {
                "answers": ".",
                "correct": false
            },
            {
                "answers": "@",
                "correct": false
            },
            {
                "answers": "/",
                "correct": false
            },
            {
                "answers": "#",
                "correct": true
            }
        ]
    },
    {
        "question": "O seletor de class no CSS é:",
        "answers": [
            {
                "answers": ".",
                "correct": true
            },
            {
                "answers": "@",
                "correct": false
            },
            {
                "answers": "/",
                "correct": false
            },
            {
                "answers": "#",
                "correct": false
            }
        ]
    },
    {
        "question": "Alternativa em que todas as TAGS pertencem ao HTML 5:",
        "answers": [
            {
                "answers": "Header, Span, Section, Table",
                "correct": false
            },
            {
                "answers": "Head, Article, Div, Body",
                "correct": false
            },
            {
                "answers": "Header, Nav, Section, Footer",
                "correct": true
            },
            {
                "answers": "Section, Nav, Input, Footer",
                "correct": false
            }
        ]
    },
    {
        "question": "Pode-se inferir sobre variáveis booleanas:",
        "answers": [
            {
                "answers": "Que elas não aceitam valores com casas decimais",
                "correct": false
            },
            {
                "answers": "São formadas por um vetor de caracteres",
                "correct": false
            },
            {
                "answers": "Aceitam como valores ou 0(falso) ou 1(verdadeiro)",
                "correct": true
            },
            {
                "answers": "Não têm importância alguma para laços de repetição",
                "correct": false
            }
        ]
    }

]

//Substituição do Quizz para a primeira pergunta
function init() {
    //Cria a primeira pergunta
    createQuestion(0);
}

//Cria uma pergunta
function createQuestion(i) {
    //Limpa a questão anterior
    const oldButtons = answersBox.querySelectorAll("button");

    oldButtons.forEach(function(btn) {
        btn.remove();
    });

//Alterar o texto da pergunta
const questionText = question.querySelector("#question-text");
const questionNumber = question.querySelector("#question-number");

questionText.textContent = questions[i].question;
questionNumber.textContent = i + 1;

//Insere as alternativas
questions[i].answers.forEach(function(answer, i) {

    //Cria o template do botão do Quizz
    const answerTemplate = document.querySelector(".answer-template").cloneNode(true);

    const letterBtn = answerTemplate.querySelector(".btn-letter");
    const answerText = answerTemplate.querySelector(".question-answer");
    
    letterBtn.textContent = letters[i];
    answerText.textContent = answer['answers'];

    answerTemplate.setAttribute("correct-answer", answer["correct"]);

    //Remover hide e template class
    answerTemplate.classList.remove("hide");
    answerTemplate.classList.remove("answer-template");

    //Inserir a alternativa na tela
    answersBox.appendChild(answerTemplate);

    //Inserir um evento de click no botão
    answerTemplate.addEventListener("click", function() {
        checkAnswer(this);
    });
});

//Incrementar o número da questão
actualQuestion++;

}

//Verificando a resposta do usuário
function checkAnswer(btn) {

    //Selecionar todos os botões
    const buttons = answersBox.querySelectorAll("button");

    //Verifica se a resposta está correta e adiciona classes nos botões
    buttons.forEach(function(button) {

        if(button.getAttribute("correct-answer") === "true") {
            button.classList.add("correct-answer");

            //Checa se o usuário acertou a pergunta
            if(btn === button ) {
                points++;
            }

        } else {
            button.classList.add("wrong-answer");
        }
    });

    //Exibe a próxima pergunta
    nextQuestion();

}

//Exibe a próxima pergunta do quizz
function nextQuestion() {

    //Timer para usuário ver as respostas
    setTimeout(function() {

        //Verifica se ainda há perguntas
        if(actualQuestion >= questions.length) {
            //Apresenta a mensagem de sucesso
            showSuccessMessage();
            return;
        }

        createQuestion(actualQuestion);

    }, 1500);
}

//Exibe a tela final
function showSuccessMessage() {

hideOrShowQuizz();

//Trocar dados da tela de sucesso

//Calcular o score
const score = ((points / questions.length) * 100).toFixed(2);

const displayScore = document.querySelector("#display-score");

displayScore.textContent = score.toString();

//Alterar o número de perguntas corretas
const correctAnswers = document.querySelector("#correct-answers");
correctAnswers.textContent = points;

//Alterar o total de perguntas
const totalQuestions = document.querySelector("#questions-qty");
totalQuestions.textContent = questions.length;

}

//Mostra ou esconde o score
function hideOrShowQuizz() {
    quizzContainer.classList.toggle("hide");
    scoreContainer.classList.toggle("hide");
}

//Reiniciar o Quizz
const restartBtn = document.querySelector("#restart");

restartBtn.addEventListener("click", function() {
   
    //Zerar o jogo
    actualQuestion = 0;
    points = 0;
    hideOrShowQuizz();
    init();
    
});

//Inicialização do Quizz
init();