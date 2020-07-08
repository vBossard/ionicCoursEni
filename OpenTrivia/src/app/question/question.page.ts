import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {
  user:User = {pseudo: "",questionQuantity: 0,category:"", score:0, difficulty:"", remember:false};
  ansmwerSubmitted:boolean = false;
  questionNumber:number = 0;
  question = {};
  listReponse = [];
  bonneReponse;
  showAnswerColor = false;
  primary = "primary";
  disableAnswer = false;
  questionsRestante:number;
  afficherScore:boolean = false;
  listQuestions = [];
  listQuestionsSize:number;
  
  constructor(private route: ActivatedRoute, private questionService:QuestionService, private router:Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.user.pseudo = params.pseudo;
      this.user.category = params.category;
      this.user.questionQuantity = params.questionQuantity;
      this.user.difficulty = params.difficulty;
      this.user.remember = params.rememberMe;
    })
    this.getQuestionsAPI(this.user.questionQuantity,this.user.category, this.user.difficulty);

    
  }
  
  async getQuestionsAPI(questionQuantity,category,difficulty){
    this.questionService.getQuestionFromAPI(questionQuantity,category,difficulty).then(
     resolve => {
       console.log(resolve)
       this.createQuestionArray(resolve)
     },
     reject => {
       console.log(reject)
     }
   )
 }

  /**
   * Crée le tableau de questions
   * @param questions 
   */
  createQuestionArray(questions){
    this.listQuestions = questions.results;
    console.log(questions)
    this.getQuestion();
  }

  /**
   * Récupère une question dans la list
   */
  getQuestion(){
    // Mise à jour du numéro de questions
    this.questionNumber += 1;
    // Nombre de questions disponible
    this.listQuestionsSize = this.listQuestions.length;
    // Récupérer un numéro pour prendre une question au hasard
    let randomNumber = this.getRandomQuestionsNumber(this.listQuestionsSize)
    // Récupérer la question
    let questionToDisplay = this.listQuestions[randomNumber];
    // Récupérer l'index de la question pour suppression futur
    let questionIndex = this.listQuestions.indexOf(randomNumber);
    // Formatage de la question pour la vue
    this.bonneReponse = questionToDisplay.correct_answer;
    this.listReponse.push({texte : questionToDisplay.correct_answer, color : "success"})
    questionToDisplay.incorrect_answers.map(reponse => {
      this.listReponse.push({texte : reponse, color: "danger"})
    });
    // Mélanger les questions
    this.listReponse = this.shuffle(this.listReponse);

    // Mise à jour de la question dans la vue
    this.question = questionToDisplay;

    //Supprimer la question du tableau
    this.listQuestions.splice(questionIndex, 1);
    
  }
  getRandomQuestionsNumber(max){
    return Math.floor(Math.random() * Math.floor(max));
  }


  /**
   * Mélange la liste des réponses
   * @param array 
   */
  shuffle(array) {
    for (let i = array.length -1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i+1));
      let tmp = array[i];
      array[i] = array[j];
      array[j] = tmp;
    }
    return array;
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
    this.listReponse = [];
    this.ansmwerSubmitted = false;
    this.showAnswerColor = false;
    this.disableAnswer = false;
    if(this.listQuestions.length > 0){
      this.getQuestion();
    }else if(this.listQuestions.length === 0){
      console.log("Fin du game")
      this.router.navigate(['score'], {queryParams : this.user});
      
    }
    
  }

}
