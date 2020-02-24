// Criando interação

// Adicionado e tirando a classe Hide
// Assim escondendo ou revelando o formulario
document
    .querySelector('header button')
    .addEventListener('click',function(){
        document
            .querySelector('.form')
            .classList.toggle('hide')
    })
