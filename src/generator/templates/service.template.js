"use strict";


const serviceTemplate = `
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';





/**
 * API Personne
 * 
 * Gestion des personnes physiques comme Morales
 * 
 * 
 * + createPersonnePhysque(data: any)
 * + updatePersonnePhysque(data: any)
 * + getPersonnePhysiqueAll()
 * + getPersonnePhysiqueById(id: any)
 * + createPersonneMorale(data: any)
 * + updatePersonneMorale(data: any)
 * + getPersonneMoraleAll()
 * + getPersonneMoraleById(id: any)
 * + getPersonneAll()
 * + getPersonneById(id: any)
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class PersonneApiService extends  AbstractTokenizedAPIRequest{
  
    constructor(
        private httpClient: HttpClient
    ) { 
        super("personne"); //Set the api resource base path
        
    }
}
`