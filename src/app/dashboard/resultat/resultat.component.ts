import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { ResultatService } from 'src/app/service/resultat.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resultat',
  templateUrl: './resultat.component.html',
  styleUrls: ['./resultat.component.css']
})
export class ResultatComponent implements OnInit{
  selectedPays: number = 1;
  selectedJour: number = 1;

  pays = [
    {id:1, code: 'TOGO', flag: 'assets/img/flag/togo.png' },
    {id:2, code: 'GHANA', flag: 'assets/img/flag/ghana.png' },
    {id:3, code: 'BENIN', flag: 'assets/img/flag/benin.png' },
    {id:4, code: 'C.I', flag: 'assets/img/flag/ci.png' }
  ];

  jours = [ 
    {id:1, nom: 'Lundi'},
    {id:2, nom: 'Mardi' },
    {id:3, nom: 'Mercredi'},
    {id:4, nom: 'Jeudi'},
    {id:5, nom: 'Vendredi'},
    {id:6, nom: 'Samedi'},
    {id:7, nom: 'Dimanche'},
  
  ];

  selectPays(pays: number) {
    this.selectedPays = pays;
    this.loadResultat();
  }

  selectJour(jour: number) {
    this.selectedJour = jour;
    this.loadResultat();
  }

  showAddDialog:boolean=false;
  showUpdateDialog:boolean=false;

  onNotify(event: boolean) {
    console.log(event);
    this.showAddDialog=false;
    this.loadResultat();
    
  }

  onNotify2(event: boolean) {
    console.log(event);
    this.showUpdateDialog=false;
    this.loadResultat();
  }

  selectedResult:any;

  selectResultat(item:any){
    this.selectedResult=item;
    console.log(this.selectedResult)
    this.showUpdateDialog=true;

  }



  
  constructor(private resultatService:ResultatService,private toastService:NgToastService ){}
  ngOnInit(): void {
   this.loadResultat();
  }

  resultats:any[]=[];

  loadResultat(){
    this.resultatService.getAllResultat(this.selectedJour,this.selectedPays).subscribe(
      (res)=>{
        console.log(res);
        this.resultats=res.data;
      },
      (err)=>{
        console.log(err);
      }
    );
  }

  delete(id:any){
    Swal.fire({
      text:'Voulez vous vraiment suprimer Ce résultat ? !!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText:"Non",
      confirmButtonText: 'Oui',
      customClass: {
      actions: 'my-actions',
      cancelButton: 'order-1 right-gap',
      confirmButton: 'order-2',
      denyButton: 'order-3',
      },
      }).then((result) => {
      if (result.isConfirmed) {
        // delete operation
        this.resultatService.delete(id).subscribe(
          (res)=>{
                  
            this.toastService.success({
              detail: "Résultat supprimé ",
              duration: 10000,
              position: "topRight",
            });

            this.loadResultat();
    
          },
          (err)=>{
            console.log(err);
            this.toastService.error({
              detail: "Une erreur est survenue",
              duration: 10000,
              position: "topRight",
            });
          }
        );
          
      } 
      })



    
  }

}
