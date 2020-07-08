import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  questions = [ { category: "Entertainment: Japanese Anime & Manga", type: "multiple", difficulty: "easy", question: "In &quot;Fairy Tail&quot;, what is the nickname of Natsu Dragneel?", correct_answer: "The Salamander", incorrect_answers: ["The Dragon Slayer", "The Dragon", "The Demon"] }, { category: "Entertainment: Video Games", type: "boolean", difficulty: "medium", question: "&quot;Return to Castle Wolfenstein&quot; was the only game of the Wolfenstein series where you don&#039;t play as William &quot;B.J.&quot; Blazkowicz.", correct_answer: "False", incorrect_answers: ["True"] } ]
  question = {};
  questionsRestante = this.questions.length;
  sendInfo = {question : {}, questionsRestante: this.questions.length};
  checkQuestion:string;
  constructor(private http:HttpClient) { 

  }
  

  async getQuestionsList() {
    let questionId = this.getRandomQuestionsNumber(this.questions.length);
    let questionPromise =  new Promise((resolve,reject)=>{
        
        this.question = this.questions[questionId];
        
        this.questionsRestante -= 1;
        this.sendInfo.question = this.question
        this.sendInfo.questionsRestante = this.questionsRestante;
        
        resolve(this.sendInfo)
        reject("Erreur pas de données")
    }); 
    return questionPromise;
  }

  getRandomQuestionsNumber(max){
    return Math.floor(Math.random() * Math.floor(max));
  }

  async getPerson(){
  let data = await this.http.get("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy").toPromise();
    //console.log(data)

  }

  async getQuestionFromAPI(questionQuantity:number, category:string, difficulty:string){
    let params = new HttpParams();
    params = params.append('amount', questionQuantity.toString());
    params = params.append('category', category);
    params = params.append('difficulty', difficulty.toLowerCase());
   
    
    let data = await this.http.get("https://opentdb.com/api.php",{params}).toPromise();
    
    // let questionId = this.getRandomQuestionsNumber(this.questions.length);
    
    // this.question = data.results[questionId];   
    // this.questionsRestante -= 1;
    // this.sendInfo.question = this.question
    // this.sendInfo.questionsRestante = this.questionsRestante;
    console.log(data)
    return data;
  }


}


