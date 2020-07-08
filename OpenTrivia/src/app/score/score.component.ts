import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
})
export class ScoreComponent implements OnInit {
  user:User = {pseudo: "",questionQuantity: 0,category:"", score:0, difficulty:"", remember:false};
  constructor(private route: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.user.pseudo = params.pseudo;
      this.user.difficulty = params.difficulty;
      this.user.remember = params.rememberMe;
      this.user.score = params.score;
      console.log(this.user)
    })

  }

}
