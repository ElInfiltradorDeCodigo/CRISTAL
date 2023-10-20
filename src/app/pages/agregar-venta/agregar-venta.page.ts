import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { format } from 'date-fns';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/compat/database'; 
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { TDocumentDefinitions } from 'pdfmake/interfaces';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-agregar-venta',
  templateUrl: './agregar-venta.page.html',
  styleUrls: ['./agregar-venta.page.scss'],
})
export class AgregarVentaPage implements OnInit {

  ventaForm: FormGroup;
  fechaFormateada: string;
  productores: any[] = [];
  insumos: any[] = [];

  constructor(public toastController: ToastController, private fb: FormBuilder, 
              private db: AngularFireDatabase, private afAuth: AngularFireAuth, 
              private router: Router, private loadingController: LoadingController) { 

    this.ventaForm = this.fb.group({
      nombre_cliente: ['', [Validators.required, Validators.maxLength(50)]],
      telefono_cliente: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]],
      empleado: ['', [Validators.maxLength(50)]],
      productos: this.fb.array([
        this.crearProducto(),
      ]),
      total: ['', [Validators.required, Validators.maxLength(10), Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$")]],
      mostrarCampos: [false],
      totalDiferir: [{value: '', disabled: true}, [Validators.maxLength(10)]],
      meses: [{value: '', disabled: true}, [Validators.maxLength(10)]],
      observaciones: ['', [Validators.maxLength(200)]],
    });

    const fechaActual: Date = new Date();
    this.fechaFormateada = format(fechaActual, 'dd/MM/yyyy');

  }

  get productos(): FormArray {
    return this.ventaForm.get('productos') as FormArray;
  }

  generarPDF(ventaData: any) {
    let productosString = '';
    ventaData.productos.forEach((prod: any) => {
        productosString += `Nombre: ${prod.nombre}, Cantidad: ${prod.cantidad}, Precio: ${prod.precio}\n`;
    });

    const documentDefinition = {
      content: [
            { text: 'Datos De La Venta', fontSize: 16, bold: true, margin: [0, 0, 0, 10] },
            { text: `Nombre Cliente: ${ventaData.nombre_cliente}` },
            { text: `Telefono Cliente: ${ventaData.telefono_cliente}` },
            { text: `Empleado: ${ventaData.empleado}` },
            { text: `Fecha: ${this.fechaFormateada}`, margin: [0, 0, 0, 10] },
            { text: 'Productos:', fontSize: 14, bold: true },
            productosString,{ text: `Total: ${ventaData.total}`, margin: [0, 10, 0, 0] },
            ventaData.mostrarCampos ? { text: `Total A Diferir: ${ventaData.totalDiferir}` } : {},
            ventaData.mostrarCampos ? { text: `Pago Por Mes: ${ventaData.meses}` } : {},
            ventaData.mostrarCampos ? { text: `Observaciones: ${ventaData.observaciones}` } : {}
          ]
        } as TDocumentDefinitions;

    pdfMake.createPdf(documentDefinition).download('TicketVenta.pdf');
}

  crearProducto(): FormGroup {
    return this.fb.group({
      nombre: [''],
      cantidad: ['', [Validators.required, Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$")]],
      precio: [''],
    });
  }

  agregarProducto() {
    this.productos.push(this.crearProducto());
  }

  toggleCampos() {
    if (this.ventaForm.get('mostrarCampos')?.value) {
      
      const total = this.ventaForm.get('total')?.value;
      this.ventaForm.get('totalDiferir')?.setValue(total);
      this.ventaForm.get('meses')?.setValue((total / 3).toFixed(2));
    } else {
      
      this.ventaForm.get('totalDiferir')?.reset();
      this.ventaForm.get('meses')?.reset();
      this.ventaForm.get('observaciones')?.reset();
    }
  }
  

  async datosCambiados() {
    if (this.ventaForm.valid) {
        console.log(this.ventaForm.value);

        const loading = await this.loadingController.create({
            message: 'Registrando...',
            backdropDismiss: false,
        });
        await loading.present();

        const ventaData = this.ventaForm.getRawValue();

        try {
            
            const ventasRef = this.db.list('/VENTAS');
            await ventasRef.push({
                nombre_cliente: ventaData.nombre_cliente,
                telefono_cliente: ventaData.telefono_cliente,
                empleado: ventaData.empleado,
                productos: ventaData.productos,
                total: ventaData.total,
                fecha: this.fechaFormateada
            });

            const updatePromises = [];

            for (let producto of ventaData.productos) {
              updatePromises.push(this.updateExistenciaProducto(producto));
          }

            if (ventaData.mostrarCampos) {
                const adeudosRef = this.db.list('/ADEUDOS');
                await adeudosRef.push({
                    nombre_cliente: ventaData.nombre_cliente,
                    telefono_cliente: ventaData.telefono_cliente,
                    totalDiferir: ventaData.totalDiferir,
                    meses: ventaData.meses,
                    observaciones: ventaData.observaciones,
                    fecha: this.fechaFormateada,
                    numero_pago: 0 
                });            

            }

            await Promise.all(updatePromises);
            await this.router.navigate(['/ventas']);
            await this.presentToast('Venta registrada exitosamente!', 'success');
            this.generarPDF(ventaData);
        } catch (error) {
            
            console.error("Error al registrar venta: ", error);
            await this.presentToast('Error al registrar la venta. Intente nuevamente.', 'danger');
        } finally {
            
            await loading.dismiss();
        }

    } else {
        this.presentToast('Formulario inválido', 'danger');
        console.log('Formulario inválido');
    }
}

private updateExistenciaProducto(producto: any): Promise<void> {
  return new Promise<void>((resolve, reject) => {
      const insumoRef = this.db.list('/INSUMOS', ref => ref.orderByChild('nombre').equalTo(producto.nombre));
      const sub = insumoRef.snapshotChanges().subscribe(async (res) => {
          try {
              if (res.length > 0 && res[0].key !== null) { 
                  const key = res[0].key;
                  const payload: { val(): { existencia: number } } = res[0].payload as any;
                  const existenciaActual = payload.val().existencia;
                  
                  if (existenciaActual - producto.cantidad >= 0) {
                    await this.db.list('/INSUMOS').update(key, {existencia: existenciaActual - producto.cantidad});
                    resolve();
                } else {
                    reject("La cantidad vendida es mayor a la existencia del producto: " + producto.nombre);
                }
                
              }
          } catch (error) {
              reject(error);
            } finally {
              sub.unsubscribe();
          }
      });
  });
}

async presentToast(message: string, color: string) {
  const toast = await this.toastController.create({
    message: message,
    duration: 2000,
    color: color,
  });
  toast.present();
}


  ngOnInit() {

    this.obtenerProductores();
    this.cargarUsuarioActual();
    this.cargarInsumos();

  }

  obtenerProductores() {
    this.db.list('/PRODUCTORES').valueChanges().subscribe((productores: any[]) => {
      this.productores = productores;
    }, error => {
      console.log(error); 
    });
  }

  productorSeleccionado(event: any) {
    const productorSeleccionado = event.detail.value;
    if (productorSeleccionado) {
        this.ventaForm.get('telefono_cliente')?.setValue(productorSeleccionado.telefono);
    }
  }

  cargarUsuarioActual() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.ventaForm.get('empleado')?.setValue(`${user.email}`);
      }
    });
  }

  cargarInsumos() {
    this.db.list('/INSUMOS').valueChanges().subscribe((insumos: any[]) => {
      this.insumos = insumos;
    }, error => {
      console.log(error); 
    });
  }

  cargarPrecio(event: any, productoIndex: number) {
    const nombreInsumoSeleccionado = event.detail.value;
    const insumoSeleccionado = this.insumos.find(insumo => insumo.nombre === nombreInsumoSeleccionado);
    if (insumoSeleccionado) {
      this.productos.at(productoIndex).get('precio')?.setValue(insumoSeleccionado.precio);
    }
  }

  calcularTotal() {
    let total = 0;

    this.productos.controls.forEach(control => {
      const cantidad = control.get('cantidad')?.value || 0;
      const precio = control.get('precio')?.value || 0;
  
      total += cantidad * precio;
    });
  
    this.ventaForm.get('total')?.setValue(total.toFixed(2));
  }

  eliminarProducto(index: number) {
    this.productos.removeAt(index);
    this.calcularTotal(); 
  }

  verificarCantidad(productoIndex: number) {
    const nombreInsumoSeleccionado = this.productos.at(productoIndex).get('nombre')?.value;
    const cantidadIngresada = this.productos.at(productoIndex).get('cantidad')?.value;
    const insumoSeleccionado = this.insumos.find(insumo => insumo.nombre === nombreInsumoSeleccionado);
  
    if (insumoSeleccionado && cantidadIngresada > insumoSeleccionado.existencia) {
      
      this.productos.at(productoIndex).get('cantidad')?.setErrors({excedeExistencia: true});
    } else {
      
      this.productos.at(productoIndex).get('cantidad')?.setErrors(null);
    }
  
    this.calcularTotal();
  } 
  
}
