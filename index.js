const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
    // if (req.url == "/") {
    //     fs.readFile(
    //         path.join(__dirname, "public", "index.html"),
    //         (err, content) => {
    //             if (err) throw err;
    //             res.writeHead(200, { "content-type": "text/html" })
    //             res.end(content)

    //         }
    //     )

    // }
    // if (req.url === "/about") {
    //     fs.readFile(
    //         path.join(__dirname, "public", "about.html"),s
    //         (err, content) => {
    //             if (err) throw err;
    //             res.writeHead(200, { "content-type": "text/html" })
    //             res.end(content)
    //         }
    //     )
    // }
    // if (req.url === "/api/users") {
    //   const users = {"name":"Mukti","age":"29"}
    //   res.writeHead(200, { "content-type": "application/json" })
    //   res.end(JSON.stringify(users))
    // }
    let filePath = path.join(__dirname, "public", req.url === "/" ? "index.html" : req.url)
    let exten = path.extname(filePath);
    let contentType = "text/html";
    switch (exten) {
        case '.js':
            contentType = "text/javascript"
            break;
        case '.css':
            contentType = "text/css"
            break;
        case '.json':
            contentType = "application/json"
            break;
        case '.png':
            contentType = "text/png"
            break;
        case '.jpg':
            contentType = "text/jpg"
            break;
    }
    fs.readFile(filePath, (err, content) => {
    console.log(filePath)
        if (err) {
            if (err.code == 'ENOENT') {
                fs.readFile(path.join(__dirname, "public", "404.html"), (err, content) => {
                    if (err) throw err;
                    res.writeHead(200, { "content-type": "text/html" })
                    res.end(content,"utf")
                })
            }else{
                res.writeHead(500)  ;
                res.end(`server error is ${err.code}`)
            }
        }else{
            res.writeHead(200, { "content-type":contentType})
            res.end(content,"utf")
        }
    })
    
})

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})