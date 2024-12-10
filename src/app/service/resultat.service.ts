import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { api } from "../env/api.env";


@Injectable({
    providedIn: 'root'
  })
  export class ResultatService {
  
    constructor(private http: HttpClient) { }

    getAllResultat(jourId:number,paysId:number):Observable<any>{
        return this.http.get<any>(api.url+'pronostic/list/resultat/'+jourId+"/"+paysId+"/");
      };


      Add(data:any):Observable<any>{
        return this.http.post<any>(api.url+'pronostic/add/resultat/',data);
      };

      Update(data:any,id:number):Observable<any>{
        return this.http.put<any>(api.url+'pronostic/update/resultat/'+id+"/",data);
      };

      delete(id:number):Observable<any>{
        return this.http.delete<any>(api.url+'pronostic/delete/resultat/'+id+"/");
      };



    getAllJeux(jourId:number,paysId:number):Observable<any>{
        return this.http.get<any>(api.url+'pronostic/jeux/'+jourId+"/"+paysId+"/");
      };


    

  }