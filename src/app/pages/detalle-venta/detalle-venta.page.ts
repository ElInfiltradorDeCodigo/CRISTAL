import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-detalle-venta',
  templateUrl: './detalle-venta.page.html',
  styleUrls: ['./detalle-venta.page.scss'],
})
export class DetalleVentaPage implements OnInit {
  
  venta: any;

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase) { 

    this.route.paramMap.subscribe(params => {
      let id = params.get('id'); 
    });

   }

  ngOnInit() {
    const ventaId = this.route.snapshot.paramMap.get('ventaId');
    if (ventaId) {
        this.db.object(`VENTAS/${ventaId}`).valueChanges().subscribe((ventaData: any) => {
            this.venta = ventaData;
        });
    }
}

getNombreCompleto(nombre_cliente: any): string {
  return `${nombre_cliente?.nombre} ${nombre_cliente?.apellido_p} ${nombre_cliente?.apellido_m}`;
}

toggleDetails(producto: { showDetails: boolean; }) {
  producto.showDetails = !producto.showDetails;
}


}
