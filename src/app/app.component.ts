import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormGroupTypeSafe, ITypeSafeFormControls } from './type-safe-fg-packages/classes';

interface FormControls{
  name: FormControl,
  email: FormControl,
  message: FormControl,
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  typeSafeFormGroup = new FormGroupTypeSafe<FormControls>({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    message: new FormControl('', [Validators.required, Validators.maxLength(100)])
  })

  constructor(){}

  ngOnInit(){
    //this.typeSafeFormGroup.controls.name
    //this.typeSafeFormGroup.controls.message
    //this.typeSafeFormGroup.controls.email
  }

}