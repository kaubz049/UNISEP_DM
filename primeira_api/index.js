const express = require("express");

const app = new express();

app.use(express.json());

const contador_id = 1;

var data = [{
    id: 1,
    nome: "Guilherme",
    cpf: "123456789",
    status: true
}];


app.get("/listar", (request, response)=>{
    return response.send(data);
});


app.post("/cadastrar", (request, response) =>{
    const {nome, cpf, status} = request.body;

    contador_id++

    data.push({
        id: contador_id,
        nome,
        cpf,
        status
    });

    return response.send("Pessoa cadastrada com sucesso!")
});

app.listen(8080, ()=>{
    console.log("O servidor está rodando na porta 8080")    
});

