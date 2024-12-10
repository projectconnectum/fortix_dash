import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { ResultatService } from 'src/app/service/resultat.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  @Input() resultat:any
 

  @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();
  notifyParent() {
    this.notify.emit(true);
  }



  constructor(private resultatService:ResultatService,private toastService:NgToastService ){}
  ngOnInit(): void {

  }



  UpdateResultat(){
    const data=this.resultat
    console.log(data);

    this.resultatService.Update(data,data.id).subscribe(
      (res)=>{
        console.log(res);
        this.toastService.success({
          detail: "Résultat Mise a jour",
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
