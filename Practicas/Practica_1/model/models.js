function Usuario(id,nombre,password,type,type_str,pedidos,token){
    this.id = id;
    this.user = nombre;
    this.password = password;
    this.type = type;
    this.type_str = type_str;
}
let cliente1 =  new Usuario(1,'Fredy','contra123',1,'Cliente');
let cliente2 =  new Usuario(2,'Roca','contra123',1,'Cliente');
let cliente3 =  new Usuario(3,'Fercho','contra123',1,'Cliente');

let repartidor1 = new Usuario(4,'Andres','contra123',2,'Repartidor')
let repartidor2 = new Usuario(5,'Estuardo','contra123',2,'Repartidor')

let restaurante1 = new Usuario(6,'mcdonalds','contra123',3,'Restaurante')

let usuarios = [cliente1,cliente2,cliente3,repartidor1,repartidor2,restaurante1];

const llave = "c0ntr453ni4s3cr3t@"
module.exports = {
    usuarios,
    llave
}