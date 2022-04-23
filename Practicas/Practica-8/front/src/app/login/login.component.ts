import { Component, OnInit } from '@angular/core';
import { ServiceService } from './service.service';

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

    resultado: any;
    constructor(public service:ServiceService) { }

    ngOnInit(): void {
        this.emailDefault = 'practica3@sa.com';
        this.passDefault = 'practica3';
    }

    async inicioIniciarSesion(){
        this.resultado = await (await this.service.getContador()).toPromise()
        console.log(this.resultado)

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
