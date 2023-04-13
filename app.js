const express = require ("express");
const cors = require ("cors")
const fs = require ("fs")

const app = express();
const port = process.env.PORT || 4000;
app.use(cors())

app.get("/banner" , (req, res) => {
    const data = getData("./data/Banner.json");
    res.json(data)
})

app.get("/category" , (req, res) => {
    const data = getData("./data/Category.json");
    res.json(data)
})

app.get("/product" , (req, res) => {
    const data = getData("./data/Product.json");
    res.json(data)
})

app.get("/product/:id" , (req, res) => {
    const data = findData(req.params.id)
    res.json(data)
})

app.listen(port, () => {
    console.log("Server Running");
})

const getData = (path) => {
    const data = fs.readFileSync(path, "utf-8", (err, data) => data )
        return JSON.parse(data);
}

const findData = (id) => {
    const dataProduct = getData('./data/Product.json')
    const findProduct = dataProduct.find( (data) => data.id == parseInt(id))
    const dumy = {
        "id" : 999, 
        "brand" : "Tidak Ditemukan", 
        "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus...", 
        "price" : 2500000,
        "promo" : 2499999, 
        "category" : "SMARTPHONE",
        "image" : ["https://i.postimg.cc/JnfcjLZR/sepatu-1.jpg"]
    }
    if (!findProduct) {
        return dumy
    }
    return findProduct
}