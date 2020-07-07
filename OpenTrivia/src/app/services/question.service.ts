import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  questions = [ { category: "Entertainment: Japanese Anime & Manga", type: "multiple", difficulty: "easy", question: "In &quot;Fairy Tail&quot;, what is the nickname of Natsu Dragneel?", correct_answer: "The Salamander", incorrect_answers: ["The Dragon Slayer", "The Dragon", "The Demon"] }, { category: "Entertainment: Video Games", type: "boolean", difficulty: "medium", question: "&quot;Return to Castle Wolfenstein&quot; was the only game of the Wolfenstein series where you don&#039;t play as William &quot;B.J.&quot; Blazkowicz.", correct_answer: "False", incorrect_answers: ["True"] } ]
  question ={};

  constructor() { }


  getQuestionsList() {
    let questionId = this.getRandomQuestionsNumber(this.questions.length);
    let questionPromise =  new Promise((resolve,reject)=>{
        this.question = this.questions[questionId];     

        resolve(this.questions[questionId]),  
        reject("Erreur pas de données")
    }); 
    return questionPromise;
  }

getRandomQuestionsNumber(max){
  return Math.floor(Math.random() * Math.floor(max));
}


}




}
