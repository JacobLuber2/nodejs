const http = require("http")

http.createServer((request, response) => {
    const { url, method } = request
    const chunks = []

    request.on("error", (error) => {
        response.statusCode = 500
        response.setHeader("Content-Type", "application/json")
        response.write(JSON.stringify(error))
        response.end()
    })
        .on("data", (chunk) => {
            chunks.push(chunk)
        })
        .on("end", () => {
            console.log(chunks)
            const body = Buffer.concat(chunks).toString()
            const responseBody = {
                url,
                method,
                body,
            };
            response.on("error", (error) => {
                response.statusCode = 500
                response.setHeader("Content-Type", "application/json");
                response.write(JSON.stringify(error));
                response.end();
            });


            switch (url) {
                case "/":
                    response.setHeader("Content-Type", "text/html");
                    response.write("raise")
                    console.log("/ reached")
                    break;
                case "/about":
                    const details = {
                        name: "Jacob",
                        city: "Denver",
                    };
                    response.setHeader("Content-Type", "application/json");
                    response.write(JSON.stringify(details));
                    console.log("/about reached")
                    break;
                case "/echo":
                    response.setHeader("content-type", "text/html");
                    response.write(JSON.stringify(responseBody));
                    console.log("/echo reached")
                    break;
                default:
                    response.setHeader("Content-Type", "text/html");
                    response.write(
                        "404 not found"
                    )

            };
        })
    })
        .listen(3001, () => console.log("Server Listening"))