"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[9336],{9336:(C,f,n)=>{n.r(f),n.d(f,{AgregarSucursalPageModule:()=>y});var h=n(6814),t=n(95),o=n(7027),d=n(2891),p=n(5861),e=n(5879),S=n(6796),v=n(8330),A=n(7523),Z=n(6240);const I=[{path:"",component:(()=>{var s;class i{constructor(r,a,l,g,u,m,P,b){this.toastController=r,this.fb=a,this.afAuth=l,this.afs=g,this.db=u,this.router=m,this.storage=P,this.loadingController=b,this.selectedImage=null,this.imagePreview="../../../assets/img/add-image.png",this.sucursalForm=this.fb.group({nombre_sucursal:["",[t.kI.required,t.kI.maxLength(50)]],tipo_sucursal:["",[t.kI.required,t.kI.maxLength(20)]],colonia:["",[t.kI.required,t.kI.maxLength(45)]],codigo_postal:["",[t.kI.required,t.kI.maxLength(5),t.kI.pattern("^[0-9]*$")]],localidad:["",[t.kI.required,t.kI.maxLength(70)]]})}presentLoading(r){var a=this;return(0,p.Z)(function*(){const l=yield a.loadingController.create({message:r,spinner:"crescent",backdropDismiss:!1});return yield l.present(),l})()}ngOnInit(){}onImageSelected(r){const a=r.target;if(a.files&&a.files[0]){if(this.selectedImage=a.files[0],!this.selectedImage.type.startsWith("image/"))return this.presentToast("Por favor, selecciona una imagen v\xe1lida"),void(this.selectedImage=null);this.previewImage(this.selectedImage)}else this.selectedImage=null}previewImage(r){const a=new FileReader;a.onload=()=>{this.imagePreview=a.result},a.readAsDataURL(r)}registerSucursal(){var r=this;return(0,p.Z)(function*(){if(r.sucursalForm.valid&&r.selectedImage){const a=yield r.presentLoading("Registrando sucursal...");try{const l=`sucursales/${r.selectedImage.name}_${(new Date).getTime()}`,u=yield(yield r.storage.ref(l).put(r.selectedImage)).ref.getDownloadURL(),m=r.sucursalForm.value;m.imageUrl=u,yield r.db.list("SUCURSALES").push(m),a.dismiss(),r.presentToast("La Sucursal Se Ha Registrado!"),r.sucursalForm.reset(),r.imagePreview="../../../assets/img/add-image.png",r.selectedImage=null,r.router.navigateByUrl("/sucursales")}catch(l){a.dismiss(),console.error("Error al registrar sucursal: ",l),r.presentToast("Error al registrar la sucursal, por favor intenta de nuevo.")}}else r.presentToast("Por favor, completa el formulario y selecciona una imagen.")})()}presentToast(r){var a=this;return(0,p.Z)(function*(){(yield a.toastController.create({message:r,duration:2e3})).present()})()}}return(s=i).\u0275fac=function(r){return new(r||s)(e.Y36(o.yF),e.Y36(t.qu),e.Y36(S.zQ),e.Y36(v.ST),e.Y36(A.KQ),e.Y36(d.F0),e.Y36(Z.Q1),e.Y36(o.HT))},s.\u0275cmp=e.Xpm({type:s,selectors:[["app-agregar-sucursal"]],decls:28,vars:9,consts:[[3,"translucent"],["color","primary"],["slot","start"],["defaultHref","/sucursales","color","secondary"],["fullscreen",""],[1,"datosCambio"],[3,"formGroup","ngSubmit"],["alt","Click para seleccionar una imagen",2,"width","95px","height","95px","cursor","pointer","margin","0 auto","margin-bottom","15px",3,"src","click"],["type","file",2,"display","none",3,"change"],["fileInput",""],["formControlName","nombre_sucursal","label","Nombre Sucursal:","maxlength","50","required","",3,"counter"],["formControlName","tipo_sucursal","label","Tipo Sucursal:","maxlength","20","required","",3,"counter"],["formControlName","colonia","label","Colonia:","maxlength","45","value","Gonzalez","required","",3,"counter"],["formControlName","codigo_postal","label","C.P:","onkeypress","return (event.charCode >= 48 && event.charCode <= 57)","maxlength","5","required","",3,"counter"],["formControlName","localidad","label","Localidad y Estado:","maxlength","70","required","",3,"counter"],[1,"btn"],["expand","block","color","secondary",2,"max-width","200px","margin","0 auto",3,"disabled","click"]],template:function(r,a){if(1&r){const l=e.EpF();e.TgZ(0,"ion-header",0)(1,"ion-toolbar",1)(2,"ion-buttons",2),e._UZ(3,"ion-back-button",3),e.qZA(),e.TgZ(4,"ion-title"),e._uU(5,"Registrar Sucursal"),e.qZA()()(),e.TgZ(6,"ion-content",4)(7,"h1"),e._uU(8,"Datos De La Sucursal:"),e.qZA(),e.TgZ(9,"div",5)(10,"form",6),e.NdJ("ngSubmit",function(){return a.registerSucursal()}),e.TgZ(11,"ion-item")(12,"img",7),e.NdJ("click",function(){e.CHM(l);const u=e.MAs(14);return e.KtG(u.click())}),e.qZA(),e.TgZ(13,"input",8,9),e.NdJ("change",function(u){return a.onImageSelected(u)}),e.qZA()(),e.TgZ(15,"ion-item"),e._UZ(16,"ion-input",10),e.qZA(),e.TgZ(17,"ion-item"),e._UZ(18,"ion-input",11),e.qZA(),e.TgZ(19,"ion-item"),e._UZ(20,"ion-input",12),e.qZA(),e.TgZ(21,"ion-item"),e._UZ(22,"ion-input",13),e.qZA(),e.TgZ(23,"ion-item"),e._UZ(24,"ion-input",14),e.qZA(),e.TgZ(25,"div",15)(26,"ion-button",16),e.NdJ("click",function(){return a.registerSucursal()}),e._uU(27,"Registrar"),e.qZA()()()()()}2&r&&(e.Q6J("translucent",!0),e.xp6(10),e.Q6J("formGroup",a.sucursalForm),e.xp6(2),e.Q6J("src",a.imagePreview,e.LSH),e.xp6(4),e.Q6J("counter",!0),e.xp6(2),e.Q6J("counter",!0),e.xp6(2),e.Q6J("counter",!0),e.xp6(2),e.Q6J("counter",!0),e.xp6(2),e.Q6J("counter",!0),e.xp6(2),e.Q6J("disabled",a.sucursalForm.invalid))},dependencies:[t._Y,t.JJ,t.JL,t.Q7,t.nD,o.oU,o.YG,o.Sm,o.W2,o.Gu,o.pK,o.Ie,o.wd,o.sr,o.j9,o.cs,t.sg,t.u]}),i})()}];let T=(()=>{var s;class i{}return(s=i).\u0275fac=function(r){return new(r||s)},s.\u0275mod=e.oAB({type:s}),s.\u0275inj=e.cJS({imports:[d.Bz.forChild(I),d.Bz]}),i})(),y=(()=>{var s;class i{}return(s=i).\u0275fac=function(r){return new(r||s)},s.\u0275mod=e.oAB({type:s}),s.\u0275inj=e.cJS({imports:[h.ez,t.u5,o.Pc,T,t.UX]}),i})()}}]);