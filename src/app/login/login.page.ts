import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, createAnimation } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginType = this.route.snapshot.paramMap.get('userType');
  value = "asdf";
  token = "123456";
  usuario = new FormGroup({
    user: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
    pass: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
  });

  constructor(private storage: Storage, private authService: AuthenticationService, private route: ActivatedRoute, private router: Router, private alertController: AlertController) {
    this.storage.set('token',this.token);
  }
  ngOnInit() {
    this.animacionUno();
  }

  sendDetailsWithState(userType: string) {
    const navigationExtras: NavigationExtras = {
      state: { user: this.usuario.value.user }
    };
    // eslint-disable-next-line max-len
    this.router.navigate([`/home${userType}/${navigationExtras.state.user}`], navigationExtras);
  }

  //Metodo para navegar desde un metodo llamado desde el html
  toHome() {
    console.log('entramos al metodo');
    if (this.loginType === 'conductor') {
      if ('asdf' === this.usuario.value.user) {
        this.sendDetailsWithState('-conductor');
      } else {
        this.presentAlert();
      }
    }else{
      if ('asdf' === this.usuario.value.user) {
        this.sendDetailsWithState('');
      } else {
        this.presentAlert();
      }
    }


    // this.navCtrl.navigateForward('/home');
  }
  //Boton que manda al registro
  toRegister() {
      this.router.navigate([`/register/${this.loginType}`]);
  }
  //Boton que manda al home
  loginUser() {
    if ((this.usuario.value.user.trim()!="") && ((this.usuario.value.pass.trim()!=""))){
      this.authService.login(this.usuario.value.user, this.usuario.value.pass,this.loginType);
      //console.log(isAuth)
      //toHome()

    }
  }

  //Metodo de alerta
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error Login',
      subHeader: 'Infomación : ',
      message: 'Usuario o contraseña son incorrecto',
      buttons: ['Aceptar'],
    });
    await alert.present();
  }

  //Animación
  animacionUno() {
    const animacion = createAnimation()
      .addElement(document.querySelector('#loginCard'))
      .duration(800)
      .iterations(1)
      .fromTo('transform', 'translateX(100px)', 'translateX(0px)')
      .fromTo('opacity', '0.2', '1');
    animacion.play();
  }
}
