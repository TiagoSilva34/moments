import { Component, OnInit } from '@angular/core';
import { Moment } from 'src/app/Moment';
import { MessagesService } from 'src/app/services/messages.service';
import { MomentService } from 'src/app/services/moment.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent implements OnInit {
  constructor(
    private momentService: MomentService,
    private messageService: MessagesService, 
    private router: Router
  ) {}
  
  btnText: string = 'Compartilhar'
   
  ngOnInit(): void {
    
  }

  async createHandler(moment: Moment) { 
    //FormData serve para quando trabalhamos com envio de arquivos para o formulário
    const formData = new FormData

    formData.append('title', moment.title)
    formData.append('description', moment.description)

    if (moment.image) {
      formData.append('image', moment.image)
    }

    // TODO

    // Enviar para o service
    await this.momentService.createMoment(formData).subscribe()

    // Exibir msg
    this.messageService.add('Momento adicionado com sucesso!')

    // Redirect
    this.router.navigate(['/'])
  }
}
