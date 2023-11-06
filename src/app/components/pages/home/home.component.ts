import { Component, OnInit } from '@angular/core';
import { MomentService } from 'src/app/services/moment.service';
import { Moment } from 'src/app/Moment';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allMoments: Moment[] = []
  moments: Moment[] = []
  baseApiUrl = environment.baseApiUrl
  searTerm: string = ""

  constructor(private momentService: MomentService) {}

  ngOnInit(): void {
    this.momentService.getMoments().subscribe((items) => {

      const data = items.data 

      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleString('pt-br')
      })

      this.allMoments = data 
      this.moments = data
    })
  }

  // todo search
  search(e: Event): void {
    const target = e.target as HTMLInputElement
    const value = target.value

    this.moments = this.allMoments.filter((moment) => {
      if (!!moment.title)
      moment.title.toLowerCase().includes(value)
   })
  }
}
