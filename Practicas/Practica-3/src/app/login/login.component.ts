import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    email?: string;
    password?: string;

    emailDefault!: string;
    passDefault!: string;

    constructor() { }

    ngOnInit(): void {
        this.emailDefault = 'practica3@sa.com';
        this.passDefault = 'practica3';
    }

    inicioIniciarSesion(){
       alert(this.iniciarSesion() ? 'Bienvenido!!' : "Credenciales incorrectas")
    }

    iniciarSesion(){
        if(this.email === this.emailDefault && this.password === this.passDefault){
            return true;
        }
        else{
            return false;
        }
    }

}
