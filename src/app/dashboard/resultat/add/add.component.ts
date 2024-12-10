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


  constructor(private resultatService:ResultatService,private toastService:NgToastService ){}
  ngOnInit(): void {
   this.loadJeux();
  }


  loadJeux(){
    this.resultatService.getAllJeux(this.selectedJour,this.selectedPays).subscribe(
      (res)=>{
        console.log(res);
        this.jeux=res.data;
      },
      (err)=>{
        console.log(err);
      }
    );
  }

  addResultat(){
    const data={
      type:this.ResultType,
      jeu_id:this.selectedJeuID,
      numbers:this.nums,
      win:this.win,
      mac:this.mac
    }

    this.resultatService.Add(data).subscribe(
      (res)=>{
        console.log(res);
        this.toastService.success({
          detail: "Résultat enregistrer",
          duration: 10000,
          position: "topRight",
        });
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
