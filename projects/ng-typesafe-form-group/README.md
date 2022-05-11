# Angular-Type-Safe-Reactive-FormGroup
Reactive FormGroups Wrapped in a Type Safe Class

FormGroup Wrapper implemented:

```ruby
import { 
    AbstractControl, 
    AbstractControlOptions, 
    AsyncValidatorFn, 
    FormControl, 
    FormGroup, 
    ValidatorFn 
} from "@angular/forms";

export class FormGroupTypeSafe<T extends object> extends FormGroup{
    constructor(
        controls: Record<keyof T, AbstractControl>, 
        validatorOrOpts?: ValidatorFn | AbstractControlOptions | ValidatorFn[], 
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[]
    ){
        super(controls, validatorOrOpts, asyncValidator);
    }

    override controls!: Record<keyof T, AbstractControl>;
}
```

This way, by passing a simple interface, FormGroups can be type safe. As a simple usage, check this:

```ruby
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

  typeSafeFormGroupTypedWeak = new FormGroupTypeSafe({
    x: new FormControl('', [Validators.required])
  });

  constructor(){}

  ngOnInit(){
    this.typeSafeFormGroup.controls.name
    this.typeSafeFormGroup.controls.message
    this.typeSafeFormGroup.controls.email
    this.typeSafeFormGroup.controls.email.value
    this.typeSafeFormGroup.controls.email.valueChanges.subscribe();

    this.typeSafeFormGroupTypedWeak.controls.x
    this.typeSafeFormGroupTypedWeak.controls.x.value
    this.typeSafeFormGroupTypedWeak.controls.x.valueChanges.subscribe();
  }

}
```

you get errors if you try to do these:
```ruby
  typeSafeFormGroupTypedWeak = new FormGroupTypeSafe({
    x: new FormControl('', [Validators.required])
  });

  constructor(){}

  ngOnInit(){
    this.typeSafeFormGroupTypedWeak.controls.x // OK!
    this.typeSafeFormGroupTypedWeak.controls.a // X->error! a is not a member of constructor object
  }
```

or,

```ruby
  interface FormControls{
    name: FormControl,
    email: FormControl,
    message: FormControl,
  };

  typeSafeFormGroup = new FormGroupTypeSafe<FormControls>({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    message: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    outlier: new FormControl('', [Validators.required, Validators.maxLength(100)]) // X-> error! 'outlier' is not  FormControls property!
  })
```