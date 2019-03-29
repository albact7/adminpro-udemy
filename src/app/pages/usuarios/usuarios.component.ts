import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

declare var swal: any;
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios:Usuario[] = [];
  desde: number = 0;
  numero_registrados: number=0;
  usuarios_por_pagina: number = 5;
  cargando: boolean = true

  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();

    this._modalUploadService.notificacion
      .subscribe(resp=>{
        this.cargarUsuarios();
      });
  }

  mostrarModal(id:string){
    this._modalUploadService.mostrarModal('usuarios', id);
  }

  cargarUsuarios(){
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde)
        .subscribe((resp:any) =>{
          this.usuarios = resp.usuarios;
          this.numero_registrados = resp.total;
          this.cargando = false;
        });
    
  }

  cambiarPagina(pagina:number){
    if(this.hayAnteriores() && this.haySiguientes()) return;
    this.desde+=pagina;
    this.cargarUsuarios();
    
  }

  hayAnteriores(){
    return (this.desde-this.usuarios_por_pagina>=0);
  }
  haySiguientes(){
    return (this.desde+this.usuarios_por_pagina<this.numero_registrados);
  }

  buscarUsuario( termino: string ){
    if(termino.length<=0) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this._usuarioService.buscarUsuarios(termino)
        .subscribe((resp:any)=>{
          this.usuarios= resp.usuarios;
          this.cargando = false;

        });
  }

  borrarUsuario(usuario:Usuario){
    console.log('a borrar', usuario._id);
    if(usuario._id === this._usuarioService.usuario._id){
      swal('No puede borrar usuario', 'No se puede borrar a sí mismo', 'error');
      return;
    }

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this._usuarioService.borrarUsuario(usuario._id)
        .subscribe((resp:any)=>{
          swal("Poof! Your user has been deleted!", {
            icon: "success",
          });
          this.cargarUsuarios();
        });
        
      } else {
        swal("Your user is safe!");
      }
      return;
    });
  }

  guardarRoleUsuario(usuario:Usuario, role:string){
    usuario.role = role;
    this._usuarioService.actualizarUsuario(usuario)
        .subscribe(resp => {
          console.log(resp);
          console.log('rol actualizado');
          
        });
  }

}
