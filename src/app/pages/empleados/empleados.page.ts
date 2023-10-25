import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.page.html',
  styleUrls: ['./empleados.page.scss'],
})
export class EmpleadosPage implements OnInit {

  empleados: any[] = [];
  showSearchBar: boolean = false;
  searchTerm: string = '';
  allEmpleados: any[] = [];

  constructor(private actionSheetCtrl: ActionSheetController, private router: Router,
    private alertController: AlertController, private db: AngularFireDatabase, private storage: AngularFireStorage) {

      this.loadEmpleados();

     }

     loadEmpleados(): void {
      const empRef = this.db.list('EMPLEADOS').snapshotChanges();
      empRef.subscribe(snapshots => {
        this.allEmpleados = snapshots.map(snapshot => {
          const values = snapshot.payload.val();
          if (typeof values === 'object' && values !== null) {
            return { uid: snapshot.key, ...values };
          } else {
            return {};
          }
        });
        this.empleados = [...this.allEmpleados];
      });
    }

  async presentActionSheet(empleado: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones De Empleado',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Eliminar Empleado',
          role: 'destructive',
          data: {
              action: 'delete',
          },
          handler: () => {
              this.eliminacion(empleado);
          },
        },
        {
          text: 'Ver Perfil',
          handler: () => {
            this.verPerfil(empleado.uid);
          },
        },
        {
          text: 'Actualizar Información',
          handler: () => {
              this.actualizarEmpleado(empleado.uid);
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

  async eliminacion(empleado: any) {
    const alert = await this.alertController.create({
        header: '¡Advertencia!',
        message: '¿Realmente desea eliminar este empleado?',
        buttons: [
            {
                text: 'Sí',
                handler: () => {
                    this.borrarEmpleado(empleado);
                }
            },
            'No'
        ],
    });

    await alert.present();

  }

  verPerfil(empleadoUid: string) {
    if (empleadoUid) {
        this.router.navigate(['/perfil-empleado', empleadoUid]);
    } else {
        console.error('empleadoUid is undefined or null');
    }
}


  actualizarEmpleado(empleadoUid: string) {
    this.router.navigate(['/actualizar-empleado', empleadoUid]);
  }

  ngOnInit() {
  }

  toggleSearchBar() {
    this.showSearchBar = !this.showSearchBar;
    if (!this.showSearchBar) {
      this.empleados = [...this.allEmpleados];
    }
  }
  

  borrarEmpleado(empleado: any) {
    const imageRef = this.storage.refFromURL(empleado.imageUrl);
    imageRef.delete().toPromise()
    .then(() => {
      this.db.list('EMPLEADOS').remove(empleado.uid)
      .then(() => {
          console.log('Empleado eliminado con éxito.');
      })
      .catch(error => {
          console.error('Error al eliminar empleado:', error);
      });
    })
    .catch(error => {
        console.error('Error al eliminar imagen:', error);
    });
  }

  filterEmpleados(event: any) {
    const searchTerm = event.target.value;
    
    if (!searchTerm) {
      this.empleados = [...this.allEmpleados];
      return;
    }
    
    this.empleados = this.allEmpleados.filter(empleado => {
      let matchesNombre = empleado.nombre && searchTerm && empleado.nombre.toLowerCase().includes(searchTerm.toLowerCase());
      let matchesCorreo = empleado.correo && searchTerm && empleado.correo.toLowerCase().includes(searchTerm.toLowerCase());
      let matchesTelefono = empleado.telefono && searchTerm && empleado.telefono.toLowerCase().includes(searchTerm.toLowerCase());
    
      return matchesNombre || matchesCorreo || matchesTelefono;
    });
  }  

}
