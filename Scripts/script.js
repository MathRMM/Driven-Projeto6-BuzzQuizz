const imagemexemplo = "https://i0.wp.com/www.popsfera.com.br/wp-content/uploads/2020/06/rmcapa.jpg?resize=800%2C445&ssl=1";
const imagemexemplodois = "https://img.quizur.com/f/img616d7cd648db87.18180838.jpeg?lastEdited=1634565339";
const quizzes = [
    { objeto: [{
        imagem: imagemexemplo,
        respostastatus: "correta"
        },
        {
        imagem: imagemexemplo,
        respostastatus: "errada"
        },
        {
        imagem: imagemexemplo,
        respostastatus: "errada"
        },
        {
        imagem: imagemexemplo,
        respostastatus: "errada"
        }
    ] },
    { objeto: [{ 
        imagem: imagemexemplodois,
        respostastatus: "correta"
        },
        {
        imagem: imagemexemplodois,
        respostastatus: "errada"
        },
        {
        imagem: imagemexemplodois,
        respostastatus: "errada"
        },
        {
        imagem: imagemexemplodois,
        respostastatus: "errada"
        }    
    ]}];

console.log(quizzes[1].objeto[0].respostastatus);
console.log(quizzes.length);


let adicionarQuizz = document.querySelector(".caixa-quizz");

for (j = 0; j < quizzes.length; j++) {

    let sorteador = quizzes[j].objeto.sort(comparador);

    adicionarQuizz.innerHTML = `<div class="caixa-pergunta corum"><h2>Qualquer pergunta tosca, aqui?</h2></div>
    <div class="caixa-duas-opcoes um">
      
    </div>
    <div class="caixa-duas-opcoes dois">
      
      </div>` + adicionarQuizz.innerHTML;


    let adicionarPerguntasum = document.querySelector(".um");
    console.log(adicionarQuizz.innerHTML);
    for (let i = 0; i < 2; i++) {  
    
    adicionarPerguntasum.innerHTML += `<div class="caixa-opcao auxiliar" onclick="selecionarResposta(this)">
    <img src=${sorteador[i].imagem}/>
   <p class="opcao-resposta ${sorteador[i].respostastatus} oculta">Resposta ${i}</p>`
    }
    console.log(adicionarPerguntasum.innerHTML);
    let adicionarPerguntasdois = document.querySelector(".dois")
    for (let i = 2; i < 4; i++) {
    
    adicionarPerguntasdois.innerHTML += `<div class="caixa-opcao auxiliar" onclick="selecionarResposta(this)">
    <img src=${sorteador[i].imagem}/>
    <p class="opcao-resposta ${sorteador[i].respostastatus} oculta">Resposta ${i}</p>`;
      
    }
    console.log(adicionarQuizz.innerHTML);
    console.log(adicionarPerguntasdois.innerHTML);

}

function selecionarResposta (elemento) {
    console.log(elemento);
    
    elemento.classList.remove("auxiliar");
    elemento.querySelector(".opcao-resposta").classList.remove("oculta");
        
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
}
function comparador() { 
	return Math.random() - 0.5; 
}