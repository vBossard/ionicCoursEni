import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  ansmwerSubmitted:boolean = false;

  //Utilisateur
  user= {
    pseudo:"",
    score:0,
    level:"",
    remember:false,
  }

  constructor(private formBuilder: FormBuilder) {
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
      rememberMe:['']
    })
  }

  /**
   * Validation du formulaire
  */
   validateForm(){
    if(this.formInfo.valid){
      this.showForm = false;
      this.user.pseudo = this.formInfo.value.pseudo;
      this.user.score = 0;
      this.user.level = this.formInfo.value.difficulty;
      this.user.remember = this.formInfo.value.rememberMe;
    }
    
  }

  /**
   * Verification des erreurs
   */
  get errorControl(){
    return this.formInfo.controls;
  }

  /**
   * Vérification de la réponse
   */
  submitAnswer(reponse){
    this.ansmwerSubmitted =true
  }

}
