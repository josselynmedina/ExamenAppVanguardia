var express = require('express');
var bodyParser= require("body-parser");
var mongoose= require('mongoose');
var path= require("path");
var app = express();


app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get('/', function (req, res) {
    res.render("index", { nombre: 'Josselyn Medina'});
});

app.listen(3000, function () {
  console.log('Conectado al puerto 3000!');
});


app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://admin:admin123@ds121192.mlab.com:21192/dbbodega',  { useNewUrlParser: true });

//Esquema
var bodegaSchema = mongoose.Schema({
    sku: Number,
    descripcion: String,
    marca: String,
    nestante: String
},{collection:'Productos'});

//agregado metodos al esquema
bodegaSchema.methods.info = function () {
    var msj = "Hola, soy " + this.descripcion + " y estoy en el estante" + this.nestante;
    console.log(msj);
};

//paseando el esquema al modelo
var Productos = mongoose.model('Productos', bodegaSchema);

//Get de los productos
app.get('/api/productos', function (req, res) {
    Productos.find(function (err, productos){
        if (err)
            res.status(500).send('Error en la base de datos');
        else
            res.status(200).json(productos);
    });
});

///Get de los productos por ID
app.get('/api/productos/{sku}',function(req,res){
    Productos.findById(req.params.sku,function(err, productos) {
        if (err)
            res.status(500).send('Error en la base de datos');
        else{
            if (productos != null) {
                productos.info();
                res.status(200).json(productos);
            }
            else
                res.status(404).send('No se encontro el producto');
        }
    });
});

//agrega un nuevo producto
app.post('/api/productos',function(req,res){
    var productos1 = new Productos({
        sku: req.body.sku,
        descripcion: req.body.descripcion,
        marca: req.body.marca,
        nestante: req.body.nestante
    });
 
    //guarda una producto en la base de datos
    productos1.save(function (error, productos1) {
        if (error) {
            res.status(500).send('No se ha podido agregar.');
        }
        else {
            res.status(200).json('Agregado exitosamente'); 
        }
    });
});



//por marca
app.get('/api/productos?marca={marca}', function(req, res){
    Productos.find({marca: req.query.marca},function (err, productos) {
        if (err) {
            console.log(err);
            res.status(500).send('Error al leer de la base de datos');
        }
        else
            res.status(200).json(productos);
    });
});


