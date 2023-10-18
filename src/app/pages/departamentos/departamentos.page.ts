import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/compat/database';

interface Departamento {
  key?: string; 
  nombre: string;
  sucursal: string;
  autor: string;
  fecha_creacion: string;
}

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.page.html',
  styleUrls: ['./departamentos.page.scss'],
})
export class DepartamentosPage implements OnInit {

  departamentos: any[] = [];

  constructor(private actionSheetCtrl: ActionSheetController, private router: Router,
    private alertController: AlertController, private db: AngularFireDatabase) { }

  async presentActionSheet(depto: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones De Departamento',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Eliminar',
          role: 'destructive',
          data: {
            action: 'delete',
          },
          handler: () => {
            this.eliminacion(depto);
        },
        },
        {
          text: 'Ver Empleados',
          data: {
            action: 'actualizarDatos',
          },
          handler: () => {
            this.verEmpleados();
          },
        },
        {
          text: 'Cerrar',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
  }

  async eliminacion(depto: any) {
    const alert = await this.alertController.create({
      header: '¡Advertencia!',
      message: '¿Realmente desea eliminar este departamento?',
      buttons: [
        {
          text: 'Sí',
          handler: () => {
            this.db.list('DEPARTAMENTOS').remove(depto.key).then(() => {
              console.log("Departamento eliminado con éxito");
            }).catch(error => {
              console.error("Error al eliminar el departamento: ", error);
            });
          }
        },
        'No'
      ]
    });

    await alert.present();

  }

  verEmpleados(){

    this.router.navigate(['/empleados']);

  }

  ngOnInit() {
    this.cargarDepartamentos();
  }

  cargarDepartamentos() {
    this.db.list('DEPARTAMENTOS').snapshotChanges().subscribe(items => {
      this.departamentos = items.map(item => {
        const data = item.payload.val() as Departamento;
        const key = item.payload.key;
        return { key, ...data }; 
      });
    });
  }
  

}
