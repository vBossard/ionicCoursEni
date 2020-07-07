import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../services/question.service';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  user:User = {pseudo: "", score:0, difficulty:"", remember:false};
  ansmwerSubmitted:boolean = false;
  questionNumber:number;
  question = {};
  listReponse = [];
  bonneReponse;
  showAnswerColor = false;
  primary = "primary";
  disableAnswer = false;
  
  constructor(private route: ActivatedRoute, private questionService:QuestionService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.user.pseudo = params.pseudo;
      this.user.difficulty = params.difficulty;
      this.user.remember = params.rememberMe;
    })
    this.getQuestions();
    
  }
  async getQuestions(){
     await this.questionService.getQuestionsList().then(
      resolve => {
        this.formatQuestion(resolve)
      }
    )
  }

  formatQuestion(question){
    this.bonneReponse = question.correct_answer;
    this.listReponse.push({texte : question.correct_answer, color : "success"})
    question.incorrect_answers.map(reponse => {
      this.listReponse.push({texte : reponse, color: "danger"})
    });
    this.question = question;
  }

  submitAnswer(reponseUser){
    this.ansmwerSubmitted = true;
    this.showAnswerColor = true;
    this.disableAnswer = true;
    if(reponseUser === this.bonneReponse){
      this.user.score += 1;
    }else{
      this.user.score -= 1;
    }
  }

  nextQuestion(){
    this.listReponse = []
    this.ansmwerSubmitted = false;
    this.showAnswerColor = false;
    this.disableAnswer = false;
    this.getQuestions();
  }


}
