import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-car',
  templateUrl: './register-car.page.html',
  styleUrls: ['./register-car.page.scss'],
})
export class RegisterCarPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  validateRegister() {
    if (true) {
      /*.value.nombre.length > 0*/ this.registerAlert();
    } else {
      this.registerFail();
    }
  }

  async registerAlert() {
    const alert = await this.alertController.create({
      header: 'Registrado',
      subHeader: 'Usuario : ',
      message: 'registrado correctamente',
      buttons: [
        {
          text: 'Aceptar',
          role: 'aceptar',
          handler: () => {
            this.router.navigate([`/switch-user`]);
          },
        },
      ],
    });
    await alert.present();
  }

  async registerFail() {
    const alert = await this.alertController.create({
      header: 'Error al registrar',
      subHeader: 'Usuario : ',
      message: 'no registrado',
      buttons: [
        {
          text: 'Aceptar',
        },
      ],
    });
    await alert.present();
  }
}
