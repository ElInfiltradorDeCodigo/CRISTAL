import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.page.html',
  styleUrls: ['./insumos.page.scss'],
})
export class InsumosPage implements OnInit {

  insumos: any[] = [];
  allInsumos: any[] = [];
  showSearchBar = false; 

  constructor(private actionSheetCtrl: ActionSheetController, private router: Router,
    private alertController: AlertController, private db: AngularFireDatabase, private storage: AngularFireStorage,
    private toastController: ToastController) { }
  
    async presentActionSheet(insumo: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones De Producto',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Eliminar Producto',
          role: 'destructive',
          data: {
            action: 'delete',
          },
          handler: () => {
            this.eliminacion(insumo);
        },
      },
        {
          text: 'Actualizar Infromación',
          data: {
            action: 'actualizarDatos',
          },
          handler: () => {
            this.actualizarDatos(insumo);
          },
        },
        {
          text: 'Ver Ventas Realizadas',
          data: {
            action: 'actualizarDatos',
          },
          handler: () => {
            this.verDepartamentos();
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

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'bottom'
    });
    toast.present();
  }  

  async eliminacion(insumo: any){
    const alert = await this.alertController.create({
      header: '¡Advertencia!',
      message: '¿Realmente desea eliminar este producto?',
      buttons: [
        {
          text: 'Sí',
          role: 'confirm',
          handler: () => {
            
          }
        },
        'No'
      ],
    });
  
    await alert.present();
      
    alert.onDidDismiss().then((result) => {
      if (result.role === 'confirm') {
        this.db.object(`INSUMOS/${insumo.key}`).remove().then(() => {
          
          let fileName = insumo.imageUrl.split('%2F')[1].split('?')[0];
          fileName = decodeURIComponent(fileName);
  
          this.storage.ref(`insumoImages/${fileName}`).delete().subscribe({
            next: () => {
              this.presentToast('Producto eliminado exitosamente', 'success');
            },
            error: (error) => {
              console.error("Error al eliminar la imagen: ", error);
              this.presentToast('Error al eliminar la imagen', 'danger');
            }
          });
  
        }).catch(error => {
          console.error("Error al eliminar el insumo: ", error);
          this.presentToast('Error al eliminar el insumo', 'danger');
        });
      }
    });
  }  


  actualizarDatos(insumo: any){
    this.router.navigate(['/actualizar-insumo', insumo.key]);
  }


  verDepartamentos(){

    this.router.navigate(['/ventas']);

  }

  ngOnInit() {
    this.db.list('INSUMOS').snapshotChanges().subscribe((snapshots: any[]) => {
      this.allInsumos = snapshots.map(snapshot => {
        return {
          key: snapshot.key,
          ...snapshot.payload.val()
        };
      });
      this.insumos = [...this.allInsumos];
    });
  }

  filterItems(event: Event) {
    const searchTerm = (event as CustomEvent).detail.value.toLowerCase();
  
    if (!searchTerm) {
      this.insumos = this.allInsumos;
      return;
    }
  
    this.insumos = this.allInsumos.filter(insumo => {
      return insumo.nombre.toLowerCase().includes(searchTerm) || insumo.clave.toLowerCase().includes(searchTerm);
    });
  }

  toggleSearchBar() {
    this.showSearchBar = !this.showSearchBar;
    if (!this.showSearchBar) {
      this.insumos = [...this.allInsumos];
    }
  }
  
  

}
