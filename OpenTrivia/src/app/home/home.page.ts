import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  // Liste des difficultés
  difficultiesList: string[] = ["easy", "medium", "hard"]
  formInfo:FormGroup;
  // Pour afficher ou non le formulaire
  showForm:boolean = true;
  // Pour vérifier si une réponse a été envoyée
  
  user:User;


  constructor(private formBuilder: FormBuilder, private router:Router) {
  }


  ngOnInit(){
    this.createForm();
  }
  
  /**
   * Création du formulaire
   */
  createForm(){
    this.formInfo = this.formBuilder.group({
      pseudo:['',[Validators.required, Validators.minLength(3)]],
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
  
}
