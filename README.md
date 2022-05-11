# Angular-Type-Safe-Reactive-FormGorup
Reactive FormGroups Wrapped in a Type Safe Class

FormGorup Wrapper implemented:

```ruby
export class FormGroupTypeSafe<T extends object> extends FormGroup{
    constructor(
        controls: { [key in keyof T]: AbstractControl; }, 
        validatorOrOpts?: ValidatorFn | AbstractControlOptions | ValidatorFn[], 
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[]
    ){
        super(controls, validatorOrOpts, asyncValidator);
    }

    override controls!: {[key in keyof T]: FormControl};
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

  constructor(){}

  ngOnInit(){
    this.typeSafeFormGroup.controls.name
    this.typeSafeFormGroup.controls.message
    this.typeSafeFormGroup.controls.email
  }

}
```