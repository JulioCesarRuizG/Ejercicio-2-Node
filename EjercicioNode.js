const http = require("http");
const axios = require("axios");
const fs = require("fs");

async function getData1() {
    const resp1 = await axios.get("https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json");
    var Arr = resp1.data[Symbol.iterator]()
    todo = '<head><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous"></head><body><table class="table table-striped"><thead><tr><th scope="col">ID</th><th scope="col">Nombre</th><th scope="col">Contacto</th></thead><tbody>';
    for(let val of Arr)
    {
        todo = todo + '<tr><th scope="row">'+ val["idproveedor"] +'</th><td>' + val["nombrecompania"] + '</td><td>' + val["nombrecontacto"] + '</td></tr>'
    }
    todo = todo + '</tbody></table><script src="js/jquery.min.js"></script><script src="js/bootstrap.min.js"></script></body>';
    fs.writeFile("htmlProveedor.html",todo,"utf-8",(err) => {
        if(err){ console.log("Error al escribir el archivo htmlproveedor")};
    })
}

async function getData2() {
    const resp2 = await axios.get("https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json");
    var Arr = resp2.data[Symbol.iterator]()
    todo = '<head><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous"></head><body><table class="table table-striped"><thead><tr><th scope="col">ID</th><th scope="col">Nombre</th><th scope="col">Contacto</th></thead><tbody>';
    for(let val of Arr)
    {
        todo = todo + '<tr><th scope="row">'+ val["idCliente"] +'</th><td>' + val["NombreCompania"] + '</td><td>' + val["NombreContacto"] + '</td></tr>'
    }
    todo = todo + '</tbody></table><script src="js/jquery.min.js"></script><script src="js/bootstrap.min.js"></script></body>';
    fs.writeFile("htmlCliente.html",todo,"utf-8",(err) => {
        if(err){ console.log("Error al escribir el archivo htmlcliente")};
    })
}
getData1();
getData2();

http.createServer(function(req,res) {
    console.log(req.url)
    res.writeHead(200,{'Content-Type':'text/html'})
    if(req.url.endsWith("proveedores.html"))
    {
        fs.readFile("htmlProveedor.html", "utf-8", (err,data) =>{
            res.end(data);
        })
    }
    else if(req.url.endsWith("clientes.html"))
    {
        fs.readFile("htmlCliente.html", "utf-8", (err,data) =>{
            res.end(data);
        })
    }
    else {
        res.end("Nada :p");
    }
}).listen(8081);