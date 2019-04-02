import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsService, SidebarService, SharedService, UsuarioService, LoginGuardGuard, AdminGuard, MedicoService } from './service.index'
import { HttpClientModule } from '@angular/common/http';
import { SubirArchivoService } from './subirArchivo/subir-archivo.service';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { HospitalService } from './hospital/hospital.service';
import { ModalCreateService } from '../components/modal-create/modal-create.service';
import { VerificaTokenGuard } from './guards/verifica-token.guard';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[SettingsService, 
    SidebarService, 
    SharedService,
    UsuarioService,
    SubirArchivoService,
    ModalUploadService,
    HospitalService,
    ModalCreateService,
    MedicoService,
    LoginGuardGuard,
    AdminGuard,
    VerificaTokenGuard
  ]
})
export class ServiceModule { }
