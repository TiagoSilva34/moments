import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { MomentService } from 'src/app/services/moment.service';
import { CommentService } from 'src/app/services/comment.service';
import { Moment } from 'src/app/Moment';
import { Comment } from 'src/app/Comment';
import { environment } from 'src/environment/environment';
import { MessagesService } from 'src/app/services/messages.service';
@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit {
  moment?: Moment
  baseApiUrl = environment.baseApiUrl

  commentForm!: FormGroup

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private commentService: CommentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Paramêtro id no angular preciso ser numerico
    const id = Number(this.route.snapshot.paramMap.get('id'))

    this.momentService.getMoment(id).subscribe(item => this.moment = item.data)

    this.commentForm = new FormGroup({
      text: new FormControl("", [Validators.required]),
      username: new FormControl("", [Validators.required])
    })
  }

  get text() {
    return this.commentForm.get('text')
  }

  get username() {
    return this.commentForm.get('username')
  }

  async removeHandler(id: number) {
    await this.momentService.removeMoment(id).subscribe()

    this.messagesService.add('Registro excluído com sucesso')

    this.router.navigate(['/'])
  }

  async onSubmit(formDirective: FormGroupDirective) {
    if (this.commentForm.invalid) return 

    const data: Comment = this.commentForm.value

    data.momentId = Number(this.moment!.id)

    console.log(data)


    await this.commentService.createComment(data).subscribe((comment) => this.moment!.comments!.push(comment.data))

    this.messagesService.add('Comentário adicionado')

    this.commentForm.reset()

    formDirective.reset()
  }
}
