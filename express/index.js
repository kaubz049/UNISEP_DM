const express = require("express");

const app = new express();

app.get("/", (request, response) => {
    response.send("capivara")
})


app.listen(8080, () => {
    console.log("🐗 O servidor está rodando na porta 8080");
} );