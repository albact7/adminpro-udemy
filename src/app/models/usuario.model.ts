export class Usuario{

    constructor(
        public nombre:string,
        public email:string,
        public password:string,
        public img?:string, // a partir de aqui los parametros tienen que ser opcionales o tener un valor por defecto
        public role?:string,
        public google?:boolean,
        public _id?:string
        ){}


}