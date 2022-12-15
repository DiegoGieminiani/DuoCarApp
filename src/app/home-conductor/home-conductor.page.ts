import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-home-conductor',
  templateUrl: './home-conductor.page.html',
  styleUrls: ['./home-conductor.page.scss'],
})
export class HomeConductorPage implements OnInit {
  username = this.route.snapshot.paramMap.get('userName');
  isModalOpen = false;
  user

  constructor(private route: ActivatedRoute, private router: Router) {}
  viajesDisponibles
  async ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'))
    await this.getViajesDisponibles()
    this.viajesDisponibles = JSON.parse(localStorage.getItem("viajesDisponibles"));
    console.log("VIAJES DISPONIBLES: ", this.getViajesDisponibles)
  }

  toProfile() {
    this.router.navigate([`/profile`]);
  }

  toTripHistory() {
    this.router.navigate([`/trip-history`]);
  }

  toHome() {
    this.router.navigate([`/home/${this.username}`]);
  }

  mostrarMapa() {
    this.setOpen(true)
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  async getViajesDisponibles (){
    const headers = {
      'Content-Type': 'text/plain',
      "Access-Control-Allow-Origin": "*",
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      "Access-Control-Allow-Headers": "x-access-token, Origin, X-Requested-With, Content-Type, Accept"

    };
    const datosObtenidos = await axios
      .post(
        'https://xmdsydoicb.execute-api.us-east-1.amazonaws.com/getTripsByStatus',
        {
          status: 1,
          rutConductor: this.user.rut
        }, {headers}
        )
        .then(function (response) {
        console.log('axios ok', response);
        localStorage.setItem("viajesDisponibles", JSON.stringify(response.data));
        return response;
      })
      .catch(function (error) {
        console.log('axios oknt', error);
        localStorage.setItem("viajesDisponibles", JSON.stringify([]));
        return {error: error};
      });
    console.log('axios ', datosObtenidos);
  }

  async updateStatus (id: String, newStatus: Number, rutConductor: String){
    console.log("id", id)
    console.log("newStatus", newStatus)
    console.log("rutConductor", rutConductor)
    const headers = {
      'Content-Type': 'text/plain',
      "Access-Control-Allow-Origin": "*",
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      "Access-Control-Allow-Headers": "x-access-token, Origin, X-Requested-With, Content-Type, Accept"
    };
    const datosObtenidos = await axios
      .post(
        'https://xmdsydoicb.execute-api.us-east-1.amazonaws.com/addTripConductor',
        {
          "id": id,
          "newStatus": newStatus,
          "rutConductor": rutConductor
        }, {headers}
        )
        .then(function (response) {
        console.log('axios ok', response);
        localStorage.setItem("viajesDisponibles", JSON.stringify(response.data));
        return response;
      })
      .catch(function (error) {
        console.log('axios oknt', error);
        localStorage.setItem("viajesDisponibles", JSON.stringify([]));
        return {error: error};
      });
    console.log('axios ', datosObtenidos);
  }  
}


