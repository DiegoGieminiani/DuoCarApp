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

  sendDetailsWithState(conductor: boolean = false) {
    const navigationExtras: NavigationExtras = {
      state: { user: this.usuario.value.user }
    };
    // eslint-disable-next-line max-len
    if (conductor) {
      this.router.navigate([`/home-conductor/${navigationExtras.state.user}`], navigationExtras);
    }else{
      this.router.navigate([`/home/${navigationExtras.state.user}`], navigationExtras);
    }
  }

  //Metodo para navegar desde un metodo llamado desde el html
  toHome() {
    console.log('entramos al metodo');
    if (this.loginType === 'conductor') {
      if ('asdf' === this.usuario.value.user) {
        this.sendDetailsWithState(true);
      } else {
        this.presentAlert();
      }
    }else{
      if ('asdf' === this.usuario.value.user) {
        this.sendDetailsWithState();
      } else {
        this.presentAlert();
      }
    }


    // this.navCtrl.navigateForward('/home');
  }

  toRegister() {
      this.router.navigate([`/register/${this.loginType}`]);
  }

  loginUser() {
    if ((this.usuario.value.user.trim()!="") && ((this.usuario.value.pass.trim()!=""))){
      if (this.loginType === 'conductor'){
        this.authService.login(this.usuario.value.user, this.usuario.value.pass, true);
      } else {
        this.authService.login(this.usuario.value.user, this.usuario.value.pass, false);
      }
      //console.log(isAuth)
      //toHome()

    }
  }

  //Metodo de alerta
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error Login',
      subHeader: 'Infomaci??n : ',
      message: 'Usuario o contrase??a son incorrecto',
      buttons: ['Aceptar'],
    });
    await alert.present();
  }
  //Animaci??n
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
