import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  // Liste des difficultés
  difficultiesList: string[] = ["easy", "medium", "hard"];
  categoryList = [
  {id : "any", name : "Any Category"},
  {id:9,name :"General Knowledge"},
  {id:10,name:"Entertainment: Books"},
  {id:11,name:"Entertainment: Film"},
  {id:12,name:"Entertainment: Music"},
  {id:13,name:"Entertainment: Musicals & Theatres"},
  {id:14,name:"Entertainment: Television"},
  {id:15,name:"Entertainment: Video Games"},
  {id:16,name:"Entertainment: Board Games"},
  {id:17,name:"Science & Nature"},
  {id:18,name:"Science: Computers"},
  {id:19,name:"Science: Mathematics"},
  {id:20,name:"Mythology"},
  {id:21,name:"Sports"},
  {id:22,name:"Geography"},
  {id:23,name:"History"},
  {id:24,name:"Politics"},
  {id:25,name:"Art"},
  {id:26,name:"Celebrities"},
  {id:27,name:"Animals"},
  {id:28,name:"Vehicles"},
  {id:29,name:"Entertainment: Comics"},
  {id:30,name:"Science: Gadgets"},
  {id:31,name:"Entertainment: Japanese Anime & Manga"},
  {id:32,name:"Entertainment: Cartoon & Animations"},]
  
  
  formInfo:FormGroup;
  // Pour afficher ou non le formulaire
  showForm:boolean = true;
  // Pour vérifier si une réponse a été envoyée
  
  user:User;


  constructor(private formBuilder: FormBuilder, private router:Router, private service:QuestionService) {
    
  }

  ngOnInit(){
    console.log("ngOnit")
    this.createForm();
  }
  
  /**
   * Création du formulaire
   */
  createForm(){
    this.formInfo = this.formBuilder.group({
      pseudo:['',[Validators.required, Validators.minLength(3)]],
      questionQuantity:['', Validators.required],
      category:['', Validators.required],
      difficulty:['',[Validators.required]],
      rememberMe:[true]
    })
  }

  /**
   * Validation du formulaire
  */
   validateForm(){
      if(this.formInfo.valid){
        this.user =this.formInfo.value;
        this.redirectToQuestion();
    }
  }

  /**
   * Verification des erreurs
   */
  get errorControl(){
    return this.formInfo.controls;
  }

  /**
   * Redirige vers les questions
   */
  redirectToQuestion(){
    this.router.navigate(['question'], {queryParams : this.user});

  }
  // Stocker les infos dans un service => et réinitialiser 
  
}
