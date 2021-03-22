const pass = Buffer.from('OTkzNjA1ODUyNw==', "base64").toString("ascii");
module.exports = {
    server: `mongodb+srv://kashyapkrlucky:${pass}@cluster0.ftzrr.mongodb.net/retail?retryWrites=true&w=majority`
}
