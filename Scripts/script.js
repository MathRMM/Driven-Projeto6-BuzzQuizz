//difinições
const contain_style = document.querySelector("style");
const contain_ul = document.querySelector("ul");
const API = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";
const elementoQueQueroQueApareca = document.querySelector("ul");

let img_quizz;
let r =0 ;


//funções
function iniciar_site() {
  lista_quizz();
}

function lista_quizz() {
  axios.get(`${API}`).then(implementar_quizz);
}

function implementar_quizz(promisse) {
    for (let i = 0; i < 12 ; i++){ 
        let listar_img_quizz = promisse.data[i].image;
        let listar_title_quizz = promisse.data[i].title;
        let listar_id_quizz = promisse.data[i].id;
        let remove_space_title = listar_title_quizz.split(" ").join("");
        contain_style.innerHTML += ` 
                div.lista-quizz div#a${listar_id_quizz}.quizz{
                    background:linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%),
                    url(${listar_img_quizz});
                    background-size: cover;
                    background-position: center;
                    height: 182px;
                    width: 340px;
                    object-fit: cover;
                    margin: 20px 15px;
                    border-radius: 5px;      
                }`;

        contain_ul.innerHTML += `
                <div id="a${listar_id_quizz}" class="quizz">
                    <h3>${listar_title_quizz}</h3>
                </div>
            `;
        r++  
    }        
}

//chamar função
iniciar_site();
