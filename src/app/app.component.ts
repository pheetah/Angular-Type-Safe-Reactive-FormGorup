import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormControlTypeSafe, FormGroupTypeSafe } from './type-safe-fg-packages/classes';
//import { FormGroupTypeSafe } from 'dist/ng-typesafe-form-group/public-api';

interface FormControls{
  name: string,
  email: string,
  message: number,
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  typeSafeFormGroup = new FormGroupTypeSafe<FormControls>({
    name: new FormControlTypeSafe<FormControls["name"]>('', [Validators.required, Validators.minLength(5)]),
    email: new FormControlTypeSafe<FormControls["email"]>('', [Validators.required, Validators.maxLength(30)]),
    message: new FormControlTypeSafe<FormControls["message"]>('', [Validators.required, Validators.maxLength(100)])
  })
  name = new FormControlTypeSafe<FormControls["name"]>('', [Validators.required, Validators.minLength(5)]);

  typeSafeFormGroupTypedWeak = new FormGroupTypeSafe({
    x: new FormControlTypeSafe('', [Validators.required])
  });

  typeSafeFormGroupTypedWeak2 = new FormGroupTypeSafe({
    y: new FormControl('', [Validators.required])
  });

  constructor(){}

  ngOnInit(){
    this.typeSafeFormGroup.controls.name
    this.typeSafeFormGroup.controls.message
    this.typeSafeFormGroup.controls.email
    this.typeSafeFormGroup.controls.email.value
    this.typeSafeFormGroup.controls.email.valueChanges.subscribe(a => console.log(a));
    this.typeSafeFormGroup.controls.message.valueChanges.subscribe(a => console.log(a));
    //this.typeSafeFormGroup.valueChangesTypeSafe$.subscribe(a => a)
    this.typeSafeFormGroup.valueChanges.subscribe(a => {
      console.log(this.typeSafeFormGroup.value)
      console.log(a)
    })

    this.typeSafeFormGroupTypedWeak.controls.x
    this.typeSafeFormGroupTypedWeak.controls.x.value
    this.typeSafeFormGroupTypedWeak.controls.x.valueChanges.subscribe(a => a);

    this.typeSafeFormGroupTypedWeak2.controls.y.valueChanges.subscribe(y => y)
  }

}