import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Moment } from 'src/app/Moment';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css']
})
export class MomentFormComponent implements OnInit {
  @Output() onSubmit: EventEmitter<Moment> = new EventEmitter()
  @Input() btnText!: any
  @Input() momentData: Moment | null = null

  momentForm!: FormGroup;
  
  ngOnInit(): void {
    // Mapeando campos inputs
    this.momentForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl(this.momentData ? this.momentData.title : '', [Validators.required]),
      description: new FormControl(this.momentData ? this.momentData.description : '', [Validators.required]),
      image: new FormControl(''),
    })
  }

  // Inicializando campo title
  get title() {
    return this.momentForm.get('title')!
  }

  // Inicializando campo description
  get description() {
    return this.momentForm.get('description')!
  }

  onFileSelected(event: any) {
    // Pegando 1° arquivo que vem no array de files
    const file: File = event.target.files[0]

    this.momentForm.patchValue({image: file})
  }

  submit() {
    if (!this.momentForm.value) {
      return
    }
    
    this.onSubmit.emit(this.momentForm.value)
  }
}
