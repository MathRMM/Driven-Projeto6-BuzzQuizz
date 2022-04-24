alert("Helloooo");

function selecionarResposta (elemento) {
    console.log(elemento);
    
    elemento.classList.remove("auxiliar");
    elemento.querySelector(".opcao-resposta").classList.add("clicada");
        
    const pai = elemento.parentNode.parentNode;
    console.log(pai);
    
    
    for (let i = 0; i < 3; i++) {
        let aux = pai.querySelector(".auxiliar");
        if (aux !== null) {
            aux.classList.remove("auxiliar");
            aux.classList.add("naoclicada");
            aux.querySelector(".opcao-resposta").classList.add("naoclicadafonte");
        }
    }
}


