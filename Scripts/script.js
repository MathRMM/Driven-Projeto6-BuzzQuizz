//Tela 1 Principal
//difinições
const API = "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes";
const main = document.querySelector("main");
const elementoQueQueroQueApareca = document.querySelector("ul");
let lista_quizz_usuario = [];
let lista_quizz_api = [];

let img_quizz;
let r = 0;

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
        r++;
    }
    console.log(lista_quizz_api[2].questions[0].answers[0]);
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

    setTimeout(scrollar, 2000);

    function scrollar() {
        let scrolll = document
            .querySelector(".caixa-quizz:nth-child(2)")
            .scrollIntoView();
    }
}

function comparador() {
    return Math.random() - 0.5;
}

function Mudar_tela_quizz(paramentro) {
    resetar_tela1_style();
    console.log(paramentro.id);

    main.innerHTML = `
  <div class="tela_2">
        <div class="img-topo" style="
            background: linear-gradient(to bottom, rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)), 
            url(https://epipoca.com.br/wp-content/uploads/2021/07/Ricky-and-Morty-Divulgacao.jpg);
            background-size: cover;
            background-position: center;">
            <h4>
                O título do Quizz vem aqui por cima da foto, colocando grande para
                quebrar.
            </h4>
        </div>
        <div class="caixa-auxiliar">
        </div>
    </div>
  `;

    const imagemexemplo =
        "https://i0.wp.com/www.popsfera.com.br/wp-content/uploads/2020/06/rmcapa.jpg?resize=800%2C445&ssl=1";
    const imagemexemplodois =
        "https://img.quizur.com/f/img616d7cd648db87.18180838.jpeg?lastEdited=1634565339";
    const quizzes = [
        {
            objeto: [
                {
                    imagem: imagemexemplo,
                    respostastatus: "correta",
                },
                {
                    imagem: imagemexemplo,
                    respostastatus: "errada",
                },
                {
                    imagem: imagemexemplo,
                    respostastatus: "errada",
                },
                {
                    imagem: imagemexemplo,
                    respostastatus: "errada",
                },
            ],
        },
        {
            objeto: [
                {
                    imagem: imagemexemplodois,
                    respostastatus: "correta",
                },
                {
                    imagem: imagemexemplodois,
                    respostastatus: "errada",
                },
                {
                    imagem: imagemexemplodois,
                    respostastatus: "errada",
                },
                {
                    imagem: imagemexemplodois,
                    respostastatus: "errada",
                },
            ],
        },
    ];

    let adicionarQuizz = document.querySelector(".caixa-auxiliar");

    for (j = 0; j < quizzes.length; j++) {
        let sorteador = quizzes[j].objeto.sort(comparador);

        adicionarQuizz.innerHTML =
            `<div class="caixa-quizz">        
    <div class="caixa-pergunta corum"><h2>Qualquer pergunta tosca, aqui?</h2></div>
    <div class="caixa-duas-opcoes um">      
    </div>
    <div class="caixa-duas-opcoes dois">  
    </div>
    </div>` + adicionarQuizz.innerHTML;

        let adicionarPerguntasum = document.querySelector(".um");

        for (let i = 0; i < 2; i++) {
            adicionarPerguntasum.innerHTML += `<div class="caixa-opcao auxiliar" onclick="selecionarResposta(this)">
    <img src=${sorteador[i].imagem}/>
   <p class="opcao-resposta ${sorteador[i].respostastatus} oculta">Resposta ${i}</p>`;
        }

        let adicionarPerguntasdois = document.querySelector(".dois");
        for (let i = 2; i < 4; i++) {
            adicionarPerguntasdois.innerHTML += `<div class="caixa-opcao auxiliar" onclick="selecionarResposta(this)">
    <img src=${sorteador[i].imagem}/>
    <p class="opcao-resposta ${sorteador[i].respostastatus} oculta">Resposta ${i}</p>`;
        }
    }
}

// Tela 3 - Montar quizz do Usuario
//chamar função
iniciar_site();
//Mudar_tela_criar();
