//Tela 1 Principal
//difinições
const API = "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes";
const main = document.querySelector("main");
const elementoQueQueroQueApareca = document.querySelector("ul");
let lista_quizz_usuario = [];
let lista_quizz_api = [];
let lista_post_quizz = [];
let title_usuario_quizz;
let url_usuario_quizz;
let questions_usuario_quizz;
let levels_usuario_quizz;
let quizz;
let img_quizz;
let r = -1;
let texto_pergunta
let cor_pergunta
let resp_correta
let url_correta
let resp_errada1
let url_errada1
let resp_errada2
let url_errada2
let resp_errada3
let url_errada3
let contadorNota = 0;
let nota = 0;
let asc = 0;
//Parte da pagina do quizz

//funções
function iniciar_site() {
    lista_quizz_api = [];
    main.innerHTML = `
        <div class="tela_1">
            <div class="superior">
            </div>
            <div class="lista-quizz">
                <div class="titulo-lista-quizz">
                    <h2>Todos os Quizzes</h2>
                </div>
                <ul>
                </ul>
            </div>
        </div>  
    `;
    lista_quizz();
    selecionar_tela_quizzusuario();
}

function lista_quizz() {
    axios.get(`${API}`).then(implementar_quizz);
}

function implementar_quizz(promisse) {
    const contain_ul = document.querySelector("ul");
    for (let i = 0; i < 12; i++) {
        let listar_img_quizz = promisse.data[i].image;
        let listar_title_quizz = promisse.data[i].title;
        let listar_id_quizz = promisse.data[i].id;
        lista_quizz_api[i] = promisse.data[i];
        contain_ul.innerHTML += `
                <div id="quizz_${listar_id_quizz}" class="quizz" onClick = Mudar_tela_quizz(this) style="
                background:linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%),
                    url(${listar_img_quizz});
                    background-size: cover;
                    background-position: center;
                ">
                    <h3>${listar_title_quizz}</h3>
                </div>
            `;
    }
}

function selecionar_tela_quizzusuario() {
    if (lista_quizz_usuario[0] == !undefined) {
        com_quizz_usuario();
    } else {
        sem_quizz_usuario();
    }
}

function sem_quizz_usuario() {
    const contain_semQuizz = document.querySelector(".superior");
    contain_semQuizz.innerHTML += `
    <div class="criar-quizz">
          <div class="texto">
            <span> Você nâo criou nenhum quizz ainda :(</span> 
          </div>
          <div class="botao" onClick= Mudar_tela_criar()>Criar Quizz</div>
        </div>
    `;
}
// coloca o quizz do cliente na tela inicial,
//precisa ser mudada
function com_quizz_usuario() {
    const contain_comQuiz = document.querySelector(".superior");
    contain_comQuiz.innerHTML += `
    <div class="quizz_usuario">
          <h2>Seus Quizzes</h2>
          <span>
            <ion-icon name="add-circle-sharp" onclick="Mudar_tela_criar()"></ion-icon>
          </span>
            <div id="a8097" class="quizz" onclick="Mudar_tela_quizz(this)">
              <h3>League of Legends: O teste definitivo</h3>
            </div>
            <div id="a8097" class="quizz" onclick="Mudar_tela_quizz(this)">
              <h3>League of Legends: O teste definitivo</h3>
            </div>
           
            
        </div>
    `;
}

function resetar_tela1_style() {
    const tela_1 = document.querySelector(".tela_1");
    if (tela_1.parentNode) {
        tela_1.parentNode.removeChild(tela_1);
    }
}

function resetar_tela2_style() {
    const tela_2 = document.querySelector(".tela_2");
    if (tela_2.parentNode) {
        tela_2.parentNode.removeChild(tela_2);
    }
}

function resetar_tela3_style() {
    const tela_3 = document.querySelector(".tela_3");
    if (tela_3.parentNode) {
        tela_3.parentNode.removeChild(tela_3);
    }
}

//Tela 2 - Quizz


function selecionarResposta(elemento) {
    console.log(elemento.querySelector(".true"));


    elemento.classList.remove("auxiliar");
    elemento.querySelector(".opcao-resposta").classList.remove("oculta");

    elemento.querySelector(".opcao-resposta").classList.add("clicada");

    const pai = elemento.parentNode.parentNode;
    console.log(pai);

    if (elemento.querySelector(".true") !== null) {
        contadorNota++;
    }
    console.log(contadorNota);

    for (let i = 0; i < 3; i++) {
        let aux = pai.querySelector(".auxiliar");
        if (aux !== null) {
            aux.classList.remove("auxiliar");
            aux.classList.add("naoclicada");
            aux.querySelector(".opcao-resposta").classList.remove("oculta");
        }
    }
    if (asc <= quizz.questions.length) {
        setTimeout(scrollar, 2000);

        function scrollar() {
            let scrolll = document.querySelector(`.caixa-quizz:nth-child(${asc})`).scrollIntoView();
            asc++;
        }
    } else {
        implementar_finalizador();
        setTimeout(scrollar, 2000);

        function scrollar() {
            let scrolll = document.querySelector(".finalizador").scrollIntoView();
        }
    }


}

function comparador() {
    return Math.random() - 0.5;
}

function Mudar_tela_quizz(paramentro) {
    resetar_tela1_style();
    let id_quizz_selecionado = paramentro.id
    console.log(id_quizz_selecionado)


    for (let i = 0; i < lista_quizz_api.length; i++) {
        let id_quizz = "quizz_" + lista_quizz_api[i].id
        if (id_quizz === id_quizz_selecionado) {
            quizz = lista_quizz_api[i]
            console.log(quizz.questions.length)
        }
    }

    asc = quizz.questions.length - (quizz.questions.length - 2);
    implementar_tela_2()
}


function implementar_tela_2() {
    main.innerHTML = `
  <div class="tela_2">
        <div class="img-topo" style="
            background: linear-gradient(to bottom, rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)), 
            url(${quizz.image});
            background-size: cover;
            background-position: center;">
            <h4>
                ${quizz.title}
            </h4>
        </div>
        <div class="caixa-auxiliar">
        </div>
        <div class="finalizador">
        </div>
    </div>
  `;
    questoes_quizz();
}

function questoes_quizz() {
    let adicionarQuizz = document.querySelector(".caixa-auxiliar");
    
    for (j = 0; j < quizz.questions.length; j++) {
        let sorteador = quizz.questions;
        sorteador[j].answers.sort(comparador)
        adicionarQuizz.innerHTML +=
            `<div id="a${j}" class="caixa-quizz">        
        <div class="caixa-pergunta corum" style = "background-color:${sorteador[j].color} ;"><h2>${sorteador[j].title}</h2></div>
        <div class="caixa-duas-opcoes um">      
        </div>
        <div class="caixa-duas-opcoes dois">  
        </div>
        </div>`;

        let adicionarPerguntasum = adicionarQuizz.querySelector(`#a${j} .um`);

        for (let i = 0; i < sorteador[j].answers.length; i++) {
            adicionarPerguntasum.innerHTML += `<div class="caixa-opcao auxiliar" onclick="selecionarResposta(this)">
        <img src=${sorteador[j].answers[i].image}>
        <p class="opcao-resposta ${sorteador[j].answers[i].isCorrectAnswer} oculta">${sorteador[j].answers[i].text}</p>`;
    }
}
console.log(quizz.levels);
scrollar();

function scrollar() {
    let scrolll = document.querySelector(".tela_2").scrollIntoView();
}
}

function implementar_finalizador() {

    nota = Math.round((contadorNota * 100) / quizz.questions.length);
    console.log(nota);
    for (let i = (quizz.levels.length - 1); i >= 0; i = i - 1) {
        if (nota >= quizz.levels[i].minValue) {
            let addFim = document.querySelector(".finalizador");
            addFim.innerHTML = `      
            <div class="img-topo-fim">
                <h2> ${nota}% de acerto: ${quizz.levels[i].title} </h2>
            </div>
            <div class="conteudo-fim">
            <img src=${quizz.levels[i].image}>
            <p class="texto-fim">${quizz.levels[i].text}</p>          
            </div>
            </div>        
            `;
        }        
    }
    let addBotao = document.querySelector("footer");
    addBotao.innerHTML = `<div class="botao-reiniciar" onclick="reiniciarQuizz()"><p> Reiniciar Quizz<p></div>
    <div class="botao-voltarinicial" onclick="voltarInicial()"><p>Voltar pra home</p></div>`
}

function reiniciarQuizz() {
    contadorNota = 0;
    nota = 0;
    asc = quizz.questions.length - (quizz.questions.length - 2);
    let addBotao = document.querySelector("footer");
        addBotao.innerHTML = ``;
    resetar_tela2_style();
    implementar_tela_2();
    console.log(asc);
}

function voltarInicial() {
    contadorNota = 0;
    nota = 0;
    asc = quizz.questions.length - (quizz.questions.length - 2);
    let addBotao = document.querySelector("footer");
        addBotao.innerHTML = ``;
    resetar_tela2_style();
    iniciar_site();
    let scrolll = document.querySelector(".tela_1").scrollIntoView();
    console.log(asc);
}

// Tela 3 - Montar quizz do Usuario
function Mudar_tela_criar() {
    resetar_tela1_style();
    implementar_tela_3();
}
// coloca a tela 3 parte 1 para ser preenchida
function implementar_tela_3() {
    main.innerHTML = `
        <div class="tela_3">
        <ul class="comeco">
          <h2>Comece pelo começo</h2>
          <div class="comeco_box">
            <input type="text" id="i_0" placeholder="Título do seu quizz">
            <input type="url" id="i_1" placeholder="URL da imagem do seu quizz">
            <input type="number" id="i_2" placeholder="Quantidade de perguntas do quizz">
            <input type="number" id="i_3" placeholder="Quantidade de niveis do quizz">
          </div>
          <button type="submit" class="prosseguir" onClick= criar_quizz()> <p>Prosseguir para criar perguntas</p> </button>
        </ul>
        
      </div>
      `;
}
 // Inicio do processo de ciração
 //difinições da lista que sera postada no servidor
function criar_quizz() {
    title_usuario_quizz = document.querySelector(".tela_3 #i_0").value;
    url_usuario_quizz = document.querySelector(".tela_3 #i_1").value;
    questions_usuario_quizz = Number(
        document.querySelector(".tela_3 #i_2").value
    );
    levels_usuario_quizz = Number(document.querySelector(".tela_3 #i_3").value);

    if (title_usuario_quizz.length >= 20 && title_usuario_quizz.length <= 60) {
        if (url_usuario_quizz) { //nao consegui achar um jeito para validar o url
            if (questions_usuario_quizz >= 3) {
                if (levels_usuario_quizz >= 2) {
                    lista_post_quizz = {
                        title: `${title_usuario_quizz}`,
                        image: `${url_usuario_quizz}`,
                        questions: [],
                        levels: [],
                    };

                    quantidade_questions_usuario();
                    quantidade_levels_usuario();
                    console.log(questions_usuario_quizz);
                    console.log(lista_post_quizz);

                    implementar_tela_3_2();
                } else {
                    alert("Deve ter pelo menos 2 niveis");
                }
            } else {
                alert("Deve ter pelo menos 3 perguntas");
            }
        } else {
            alert("A imagem tem que ser em URL");
            console.log(url_usuario_quizz);
        }
    } else {
        alert("O título deve ter entre 20 a 60 caracteres");
        console.log(title_usuario_quizz.length);
    }
}
//coloca as questões para serem preenchidas depois
function quantidade_questions_usuario() {
    for (let i = 0; i < questions_usuario_quizz; i++) {
        lista_post_quizz.questions[i] = {
            title: ``,
            color: ``,
            answers: [],
        };
    }
}
//coloca os niveis para serem preenchidos depois
function quantidade_levels_usuario() {
    for (let i = 0; i < levels_usuario_quizz; i++) {
        lista_post_quizz.levels[i] = {
            title: `Título do nível 1`,
            image: `https://http.cat/411.jpg`,
            text: `Descrição do nível 1`,
            minValue: 0
        };
    }
}
//Coloca tela 3 parte para montar as perguntas
function implementar_tela_3_2() {
    resetar_tela3_style();
    main.innerHTML = `
    <div class="tela_3">
      <ul class="comeco">
        <div class="titulo_criar_pergunta">
          <h2>Crie suas perguntas</h2>
        </div>
        <div class="perguntas_usuarios">
          
        </div>
        <button onclick="criar_answers()"><p>Prosseguir para criar níveis</p></button>
      </ul>
    </div>
    `;
    implementar_quantidades_perguntas();
}

//função para aparecer a quantidade de perguntas no site para ser montadas
function implementar_quantidades_perguntas() {
    let quantidade_perguntas = document.querySelector(
        ".tela_3 ul .perguntas_usuarios"
    );

    for (let i = 0; i < questions_usuario_quizz; i++) {
        let n = i + 1;
        quantidade_perguntas.innerHTML += `
            <div id="p_user_${i}" class="pergutas1_usuario_box">
                <h2>Pergunta ${n}</h2>
                <input type="text" id="p_0" placeholder="Texto da pergunta">
                <input type="text" id="p_1" placeholder="Cor de fundo da pergunta">
                
                <h2>Resposta correta</h2>
                <input type="text" id="resposta_t_1" placeholder="Resposta correta">
                <input type="url" id="url_t_1" placeholder="URL da imagem">
              
                <h2>Resposta incorretas</h2>
                <div class="incorretas">
                    <input type="text" id="resposta_f_1" placeholder="Resposta incorreta 1">
                    <input type="url" id="url_f_1" placeholder="URL da imagem 1">
                    <input type="text" id="resposta_f_2" placeholder="Resposta incorreta 2">
                    <input type="url" id="url_f_2" placeholder="URL da imagem 2">
                    <input type="text" id="resposta_f_3" placeholder="Resposta incorreta 3">
                    <input type="url" id="url_f_3" placeholder="URL da imagem 3">
                </div>
            </div>
        `;
    }
}


//pega as respostas da pagina e coloca na lista para ser postado
function criar_answers() {
    for (let i = 0; i < questions_usuario_quizz; i++) {
        let verificar_respostas = document.querySelector(
            `.tela_3 ul .perguntas_usuarios #p_user_${i}`
        );
        let texto_pergunta = verificar_respostas.querySelector(`#p_0`).value;
        let cor_pergunta = verificar_respostas.querySelector(`#p_1`).value;
        let resp_correta = verificar_respostas.querySelector(`#resposta_t_1`).value;
        let url_correta = verificar_respostas.querySelector(`#url_t_1`).value;
        let resp_errada1 = verificar_respostas.querySelector(`#resposta_f_1`).value;
        let url_errada1 = verificar_respostas.querySelector(`#url_f_1`).value;
        let resp_errada2 = verificar_respostas.querySelector(`#resposta_f_2`).value;
        let url_errada2 = verificar_respostas.querySelector(`#url_f_2`).value;
        let resp_errada3 = verificar_respostas.querySelector(`#resposta_f_3`).value;
        let url_errada3 = verificar_respostas.querySelector(`#url_f_3`).value;

        if (texto_pergunta.length > 20) {
            if (cor_pergunta !== "") {
                if (resp_correta !== "" || url_correta !== "") {
                    if (resp_errada1 !== "" || url_errada1 !== "") {
                        if (resp_errada2 !== "" || url_errada2 !== "") {
                            if (resp_errada3 !== "" || url_errada3 !== "") {
                                lista_post_quizz.questions[i] = {
                                    title: texto_pergunta,
                                    color: cor_pergunta,
                                    answers: [{
                                            text: resp_correta,
                                            image: url_correta,
                                            isCorrectAnswer: true
                                        },
                                        {
                                            text: resp_errada1,
                                            image: url_errada1,
                                            isCorrectAnswer: false
                                        },
                                        {
                                            text: resp_errada2,
                                            image: url_errada2,
                                            isCorrectAnswer: false
                                        },
                                        {
                                            text: resp_errada3,
                                            image: url_errada3,
                                            isCorrectAnswer: false
                                        }
                                    ]
                                }
                            } else {
                                lista_post_quizz.questions[i] = {
                                    title: texto_pergunta,
                                    color: cor_pergunta,
                                    answers: [{
                                            text: resp_correta,
                                            image: url_correta,
                                            isCorrectAnswer: true
                                        },
                                        {
                                            text: resp_errada1,
                                            image: url_errada1,
                                            isCorrectAnswer: false
                                        },
                                        {
                                            text: resp_errada2,
                                            image: url_errada2,
                                            isCorrectAnswer: false
                                        }
                                    ]
                                }
                            }
                        } else {
                            lista_post_quizz.questions[i] = {
                                title: texto_pergunta,
                                color: cor_pergunta,
                                answers: [{
                                        text: resp_correta,
                                        image: url_correta,
                                        isCorrectAnswer: true
                                    },
                                    {
                                        text: resp_errada1,
                                        image: url_errada1,
                                        isCorrectAnswer: false
                                    }
                                ]
                            }
                        }
                    } else {
                        alert(`Na pergunta ${i} deve conter pelo menos uma resposta e uma imagem errada `);
                        i = questions_usuario_quizz.length;
                        console.log(resp_errada1, url_errada1);
                    }
                } else {
                    alert(
                        `Na pergunta ${i} correta tem que conter um texto e uma imagem em URL`
                    );
                    i = questions_usuario_quizz.length;

                }
            } else {
                alert(`Na pergunta ${i} deve conter uma cor como #zzzzzz`);
                i = questions_usuario_quizz.length;
                console.log(cor_pergunta);
            }
        } else {
            alert(`Na pergunta ${i} o texto da pergunta deve conter mais q 20 caracteres`);
            i = questions_usuario_quizz.length;
            console.log(texto_pergunta);
        }
    }
    console.log(lista_post_quizz)
    criar_levels()
}

// Criar niveis pare ser mostrado no final do quizz
function criar_levels(){
    for(let i =0 ; i < levels_usuario_quizz; i++ ){

    }
}


   



// Tela 3 - Montar quizz do Usuario
//chamar função
iniciar_site();