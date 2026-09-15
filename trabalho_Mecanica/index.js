import express from "express";
import knex from "knex";

const mysql = knex({
    client: "mysql2",
    connection: {
        host: "localhost",
        user: "root",
        password: "1234",
        database: "mecanica"
    }
});

async function testaConexaoComBancoDeDados() {
    try {
        await mysql.raw("SELECT 0 AS RESULT");
        console.log("Sucesso ao conectar ao banco de dados!");
    } catch (error) {
        console.log("Erro ao realizar conexão com banco de dados!");
        console.log(error);
    }
}

testaConexaoComBancoDeDados();

const app = express();

app.use(express.json());


// GET
app.get("/listar", async (req, resp) => {

    const veiculos = await mysql
        .select("*")
        .from("agendamento");

    resp.send(veiculos);

});


// GET
app.get("/listar/:id", async (req, resp) => {

    const { id } = req.params;

    const veiculo = await mysql
        .select("*")
        .from("agendamento")
        .where({ id: id });

    if (veiculo.length > 0) {
        resp.send(veiculo);
    } else {
        resp.status(404).send({
            msg: "Veículo não encontrado!"
        });
    }

});


// POST
app.post("/cadastrar", async (req, resp) => {

    const {
        cliente,
        modelo,
        marca,
        ano,
        placa,
        problema
    } = req.body;

    await mysql
        .insert({
            cliente,
            modelo,
            marca,
            ano,
            placa,
            problema
        })
        .into("agendamento");

    resp.send({
        msg: "Veículo de " + cliente + " cadastrado com sucesso!"
    });

});


// PUT
app.put("/atualizar", async (req, resp) => {

    const {
        id,
        cliente,
        modelo,
        marca,
        ano,
        placa,
        problema
    } = req.body;

    const veiculoAtualizado = await mysql("agendamento")
        .where({ id })
        .update({
            cliente,
            modelo,
            marca,
            ano,
            placa,
            problema
        });

    if (veiculoAtualizado == 1) {

        const veiculo = await mysql
            .select("*")
            .from("agendamento")
            .where({ id });

        resp.send(veiculo);

    } else {

        resp.status(404).send({
            msg: "Não foi possível atualizar o veículo!"
        });

    }

});


// DELETE
app.delete("/excluir/:id", async (req, resp) => {

    const { id } = req.params;

    const veiculoExcluido = await mysql("agendamento")
        .where({ id })
        .delete();

    if (veiculoExcluido == 1) {

        resp.send({
            msg: "Veículo " + id + " excluído com sucesso!"
        });

    } else {

        resp.status(404).send({
            msg: "Veículo não encontrado!"
        });

    }

});


app.listen(8080, () => {
    console.log("O servidor está rodando na porta 8080");
});
