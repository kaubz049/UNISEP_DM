import express from "express";
import knex from "knex";

const mysql = knex({
    client: "mysql2",
    connection: {
        host: "localhost",
        user: "root",
        password: "1234",
        database: "mercado"
    }
});

async function testaConexaoComBancoDeDados() {
    try {
        await mysql.raw("SELECT 0 AS RESULT");
        console.log("Sucesso ao conectar ao banco de dados!");
    } catch (error) {
        console.log("Erro ao realizar conexão com banco de dados!");
    }
}

testaConexaoComBancoDeDados();

const app = new express();

app.use((express.json()));

app.get("/listar", async (req, resp) => {

    const produtos = await mysql.select("*").from("produto");

    resp.send(produtos);

});

app.get("/listar/:id", async (req, resp)=>{

    const {id} = req.params;

    const produto = await mysql.select("*").from("produto").where({id: id});

    resp.send(produto);

})


app.post("/cadastrar", async (req, resp) => {

    const {nome, preco, qtd_estoque} = req.body;

    const produto = await mysql.insert({nome, preco, qtd_estoque}).into("produto");

    resp.send({msg : "Produto " + (nome) + " cadastrado com sucesso!"});

})

app.put("/atualizar", async (req, resp)=>{
    const {id, nome, preco, qtd_estoque} = req.body;

    const produtoAtualizado = await mysql('produto').where({id}).update({nome, preco, qtd_estoque});


    if(produtoAtualizado == 1){
        const produto = (await mysql.select("*").from("produto").where({id}));
        resp.send(produto);
    } else {
        resp.send({msg : "Não foi possivel atualizar o produto!"});
    }


    resp.send({msg : "Produto " + (id) + " atualizado com sucesso!"});
})


app.listen(8080, ()=>{
    console.log("O servidor está rodando na porta 8080");
})