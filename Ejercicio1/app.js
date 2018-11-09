const fs= require ('fs');
const _=require('lodash');
const yarg = require('yargs').argv;

var p1 = "Josselyn";
var p2 = "Medina";
var p3 = "21311021";
var p = p1 +p2;

//let p1 = {"Nombre": "Josselyn"};
//let p2 = {"Apellido": "Medina"};
//let p3 = {"cuenta": "21311021"};

//let res = _.assign(p1, p2);

fs.appendFile('./Examen1.txt', 'Primer Examen Desarrollo de Applicaciones de Vanguardia.' + " " + p + " "+ p3 , error => {
  if (error)
    console.log(error);
  else
    console.log('creado');
});

console.log(p1,p2,p3);
