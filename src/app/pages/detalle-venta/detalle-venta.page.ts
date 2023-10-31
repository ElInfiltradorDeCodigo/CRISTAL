import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-detalle-venta',
  templateUrl: './detalle-venta.page.html',
  styleUrls: ['./detalle-venta.page.scss'],
})
export class DetalleVentaPage implements OnInit {
  
  venta: any;
  ventaId: string = '';

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase, private storage: AngularFireStorage) { 
    const ventaId = this.route.snapshot.paramMap.get('ventaId');
    if (ventaId) {
      this.ventaId = ventaId;
    } else {
      console.error('No se proporcionó un ID de venta');
      
    }
  }

  ngOnInit() {
    if (this.ventaId) {
      this.db.object(`VENTAS/${this.ventaId}`).valueChanges().subscribe((ventaData: any) => {
        this.venta = { ...ventaData, uid: this.ventaId };
      });
    }
  }  


async descargarTicket(ventaId: string) {
  if (!ventaId) {
    console.error('Error: El ID de la venta no está disponible');
    return;
  }
  const ref = this.storage.ref(`ventas/${ventaId}.pdf`);
  try {
    const url = await ref.getDownloadURL().toPromise();
    window.open(url, '_blank');
  } catch (error) {
    console.error('Error al descargar el ticket:', error);
  }
}


getNombreCompleto(nombre_cliente: any): string {
  return `${nombre_cliente?.nombre} ${nombre_cliente?.apellido_p} ${nombre_cliente?.apellido_m}`;
}

toggleDetails(producto: { showDetails: boolean; }) {
  producto.showDetails = !producto.showDetails;
}


}
