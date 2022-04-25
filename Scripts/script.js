//Tela 1 Principal
//difinições
const API = "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes";
const main = document.querySelector("main");
const elementoQueQueroQueApareca = document.querySelector("ul");
let lista_quizz_usuario = [];
let lista_quizz_api = [];
let quizz
let img_quizz;
let r = -1;

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
    console.log(lista_quizz_api[2].id);
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

function Mudar_tela_criar() {
    resetar_tela1_style();
}

function resetar_tela1_style() {
    const tela_1 = document.querySelector(".tela_1");
    if (tela_1.parentNode) {
        tela_1.parentNode.removeChild(tela_1);
    }
}

//Tela 2 - Quizz
function selecionarResposta(elemento) {
    console.log(elemento);

    elemento.classList.remove("auxiliar");
    elemento.querySelector(".opcao-resposta").classList.remove("oculta");

    elemento.querySelector(".opcao-resposta").classList.add("clicada");

    const pai = elemento.parentNode.parentNode;
    console.log(pai);

    for (let i = 0; i < 3; i++) {
        let aux = pai.querySelector(".auxiliar");
        if (aux !== null) {
            aux.classList.remove("auxiliar");
            aux.classList.add("naoclicada");
            aux.querySelector(".opcao-resposta").classList.remove("oculta");
        }
    }
    r++

    setTimeout(scrollar, 2000);

    function scrollar() {
        let scrolll = document
            .querySelector(`#a${r}.caixa-quizz`)
            .scrollIntoView();
    }
}

function comparador() {
    return Math.random() - 0.5;
}

function Mudar_tela_quizz(paramentro) {
    resetar_tela1_style();
    let id_quizz_selecionado = paramentro.id
    console.log(id_quizz_selecionado)
    

     for(let i=0; i < lista_quizz_api.length ; i++){
        let id_quizz = "quizz_"+ lista_quizz_api[i].id
        if(id_quizz === id_quizz_selecionado){
            quizz = lista_quizz_api[i]
            console.log(quizz.questions.length)
        }
    } 
    implementar_tela_2()
}
  
   
function implementar_tela_2(){
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
    </div>
  `;
  questoes_quizz();
}

function questoes_quizz(){
        let adicionarQuizz = document.querySelector(".caixa-auxiliar");

        for (j = 0; j < quizz.questions.length; j++) {
            let sorteador = quizz.questions
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
    <p class="opcao-resposta ${sorteador[j].answers[i].isCorrectAnswer} oculta">Resposta ${i}</p>`;
            }            
        } 
       
    }

// Tela 3 - Montar quizz do Usuario
//chamar função
iniciar_site();

