import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pronosticos',
  templateUrl: './pronosticos.page.html',
  styleUrls: ['./pronosticos.page.scss'],
})
export class PronosticosPage implements OnInit {
  data = {
    fecha: new Date().toISOString().slice(0,10),
    precio_acido_formico: null,
    precio_alambre_galvanizado: null,
    precio_cuchillas_r2: null,
    precio_cuchillas_r1: null,
    precio_canaletas: null,
    precio_tazas_recoleccion: null,
    campana_marketing: 'Ninguna',
    temporada: 'Invierno'
  };
  prediction: any;

  constructor(private http: HttpClient, public alertController: AlertController, public navCtrl: NavController) { }

  async ngOnInit() {
    const alert = await this.alertController.create({
      header: 'Prueba de la función de pronóstico',
      message: 'Esta es una versión beta del módulo de pronóstico de ventas. Por favor, selecciona la fecha en la que quieres pronosticar las ventas, ingresa los PRECIOS en los campos solicitados y presiona "Predecir" para continuar.',
      buttons: ['Entendido']
    });

    await alert.present();
  }

  submitPrediction() {
    const apiUrl = 'http://localhost:5000/predict';
    this.http.post(apiUrl, this.data).subscribe(
      response => {
        console.log('Respuesta de la API:', response);
        this.prediction = response;
        console.log('Predicción recibida:', this.prediction);
        let dataForResults = {
          prediction: this.prediction.prediction[0],
          ...this.data
        };
        this.navCtrl.navigateForward('/resultados', {
          queryParams: {
            data: JSON.stringify(dataForResults)
          }
        });
      },
      error => {
        console.error(error);
      }
    );
  }
  
}

