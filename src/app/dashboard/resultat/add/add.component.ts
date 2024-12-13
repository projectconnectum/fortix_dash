import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { ResultatService } from 'src/app/service/resultat.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  selectedPays: number = 1;
  selectedJour: number = 1;

  @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();
  notifyParent() {
    this.notify.emit(true);
  }

  ResultType:any="SIMPLE";

  jeux:any[]=[];
  selectedJeuID:any;
  nums:any;
  win:any;
  mac:any;

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
    this.loadJeux();
  }

  selectJour(jour: number) {
    this.selectedJour = jour;
    this.loadJeux();
  }

  onJeuChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.selectedJeuID = selectedValue; // Mettre à jour la variable avec l'ID sélectionné
    console.log('Selected Jeu ID:', this.selectedJeuID);
  }
  


  constructor(private resultatService:ResultatService,private toastService:NgToastService ){}
  ngOnInit(): void {
   this.loadJeux();
  }


  loadJeux(){
    this.resultatService.getAllJeux(this.selectedJour,this.selectedPays).subscribe(
      (res)=>{
        console.log(res);
        this.jeux=res.data;
        this.selectedJeuID=this.jeux[0].id;
        console.log("selected jeu :",this.selectedJeuID)
      },
      (err)=>{
        console.log(err);
      }
    );
  }


  resetData(){
    this.nums="",
    this.win="",
    this.mac=""
  }

  addResultat(){

    let data:any;

    if(this.ResultType=="SIMPLE"){
       data={
        type:this.ResultType,
        jeu_id:this.selectedJeuID,
        numbers:this.nums
      }
    }else if(this.ResultType=="DOUBLE"){
      data={
        type:this.ResultType,
        jeu_id:this.selectedJeuID,
        win:this.win,
        mac:this.mac
      }

    }
   

    console.log(data);

     this.resultatService.Add(data).subscribe(
      (res)=>{
        console.log(res);
        this.toastService.success({
          detail: "Résultat enregistrer",
          duration: 10000,
          position: "topRight",
        });
        this.resetData();
        
        this.notifyParent();
        
      },
      (err)=>{
        console.log(err);
        this.toastService.error({
          detail: err.error.error,
          duration: 10000,
          position: "topRight",
        });
      }
    );



  }

}
