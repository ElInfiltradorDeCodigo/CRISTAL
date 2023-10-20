import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router'; 
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-actualizar-empleado',
  templateUrl: './actualizar-empleado.page.html',
  styleUrls: ['./actualizar-empleado.page.scss'],
})
export class ActualizarEmpleadoPage implements OnInit {

      nombre: any;
      apellido_p: any;
      apellido_m: any;
      telefono: any;
      correo: any;
      sucursal: any;
      departamento: any;
      public sucursales: any[] = [];
      public departamentos: any[] = [];
      public departamentosFiltrados: any[] = [];

  constructor(public toastController: ToastController,private route: ActivatedRoute,
              private db: AngularFireDatabase, private router: Router, private loadingController: LoadingController) { }

  async datosCambiados() {
    const toast = await this.toastController.create({
      message: 'Los Datos Se Actualizaron Correctamente!',
      duration: 2000,
      cssClass: 'toast-custom'
    });
    toast.present();
  }

  ngOnInit() {
    const empleadoUid = this.route.snapshot.paramMap.get('id'); 
    if (empleadoUid) {
        this.loadEmpleadoData(empleadoUid);
    } else {
        console.error('empleadoUid is undefined or null');
    }

    this.cargarSucursales();
    this.cargarDepartamentos();
}

loadEmpleadoData(empleadoUid: string): void {
  const empRef = this.db.object(`EMPLEADOS/${empleadoUid}`).valueChanges();
  empRef.subscribe(
      (data: any) => {
          if (data) {
              this.nombre = data.nombre;
              this.apellido_p = data.apellido_p;
              this.apellido_m = data.apellido_m;
              this.telefono = data.telefono;
              this.sucursal = data.sucursal;
              this.departamento = data.departamento;
          }
      },
      error => {
          console.error('Error al cargar empleado:', error);
      }
  );
}

guardarCambios() {
  const empleadoUid = this.route.snapshot.paramMap.get('id'); 
  if (empleadoUid) {
      this.actualizarDatosEmpleado(empleadoUid);
      this.router.navigate(['/empleados']);
  } else {
      console.error('empleadoUid is undefined or null');
  }
}

async actualizarDatosEmpleado(empleadoUid: string) {
  const loading = await this.loadingController.create({
    message: 'Actualizando datos...',
  });
  await loading.present();
  
  this.db.object(`EMPLEADOS/${empleadoUid}`).update({
      nombre: this.nombre,
      apellido_p: this.apellido_p,
      apellido_m: this.apellido_m,
      telefono: this.telefono,
      sucursal: this.sucursal,
      departamento: this.departamento
  }).then(() => {
      this.datosCambiados();
      loading.dismiss();
  }).catch(error => {
      console.error('Error al actualizar datos del empleado:', error);
      loading.dismiss();
  });
}

cargarSucursales() {
  this.db.list('SUCURSALES').valueChanges().subscribe(data => {
    this.sucursales = data;
  });
}

cargarDepartamentos() {
  this.db.list('DEPARTAMENTOS').valueChanges().subscribe(data => {
    this.departamentos = data;
    this.filtrarDepartamentos(); 
  });
}

filtrarDepartamentos() {
  
  this.departamentosFiltrados = this.departamentos.filter(departamento => departamento.sucursal === this.sucursal);
}

}
