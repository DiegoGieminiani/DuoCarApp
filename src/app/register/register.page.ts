import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  loginType = this.route.snapshot.paramMap.get('userType');
  usuario = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    apellido: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    correo: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
    telefono: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(11)]),
    contrasena: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  constructor(private route: ActivatedRoute, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
  }

  validateRegister() {
    if (this.loginType === 'pasajero') {
      if (this.usuario)/*.value.nombre.length > 0*/ {
        this.registerAlert();
      } else {
        this.registerFail();
      }
    } else {
      if (this.usuario) {
        this.router.navigate(['/register-car']);
      } else {
        this.registerFail();
      }
    }
  }
  async registerAlert() {
    const alert = await this.alertController.create({
      header: 'Registrado',
      subHeader: 'Usuario : ',
      message: 'registrado correctamente',
      buttons: [{
        text: 'Aceptar',
        role: 'aceptar',
        handler: () => {
          this.router.navigate([`/switch-user`]);
        }
      }]
    });
    await alert.present();
  }

  async registerFail() {
    const alert = await this.alertController.create({
      header: 'Error al registrar',
      subHeader: 'Usuario : ',
      message: 'no registrado',
      buttons: [{
        text: 'Aceptar',
      }]
    });
    await alert.present();
  }

}
