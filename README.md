# Angular TypeSafe Reactive Forms
Reactive FormGroups Wrapped in a Type Safe Class

*This is a a package still evolving* :gear:
- [x] Type Safe Form Groups And Form Controls implemented
- [ ] Improve the documentation
- [ ] Provide StackBlitz example cases
- [ ] Improve the package that converts form interface into the form of backend service contract


- Improvements suggesions, bugs, errors, pull requests? Everything you need: https://github.com/pheetah/Angular-Type-Safe-Reactive-FormGroup
- check this stackblitz example project: https://stackblitz.com/edit/ng-typesafe-formgroup?file=src%2Fapp%2Fapp.component.html,src%2Fapp%2Fapp.component.ts

## Installation and Basic Usage Guide

*Implemented on Angular v13.2.x*

<br />

Please click on dropdowns below for further information:

<details><summary style="font-weight:bold;">Installation and Basic Integration</summary>
<p>
<ul style="list-style-type: upper-roman;">
  <li>
  To install the package just write the command:

  ```
  npm i ng-typesafe-formgroup
  ```
  </li>
  <li>
  Make sure that you import <i>FormsModule</i> and <i>ReactiveFormsModule</i> to the related module!

  ```ruby
  import { FormsModule, ReactiveFormsModule } from '@angular/forms';

  @NgModule({
    declarations: [
      ...
    ],
    imports: [
      ...,
      FormsModule,
      ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [...]
  })
  export class ...Module { }
  ```
  </li>
  <ul>
</p>
</details>

<details><summary style="font-weight:bold">Basic Usage</summary>
  <ul style="list-style-type: upper-roman">
  <li> Either use in strong-typed fashion </br>
  

  ```ruby
  import { FormControlTypeSafe, FormGroupTypeSafe } from 'ng-typesafe-formgroup';


  interface CustomInterface{
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

    typeSafeFormGroup = new FormGroupTypeSafe<CustomInterface>({
      name: new FormControlTypeSafe<CustomInterface["name"]>('', [Validators.required, Validators.minLength(5)]),
      email: new FormControlTypeSafe<CustomInterface["email"]>('', [Validators.required, Validators.maxLength(30)]),
      message: new FormControlTypeSafe<CustomInterface["message"]>('', [Validators.required, Validators.maxLength(100)])
    });

    \* you can now directly reach the controls! *\
    ngOnInit(){
      this.typeSafeFormGroup.controls.name
      this.typeSafeFormGroup.controls.message
      this.typeSafeFormGroup.controls.email
      this.typeSafeFormGroup.controls.email.value
      this.typeSafeFormGroup.controls.email.valueChanges.subscribe(a => console.log(a));
      this.typeSafeFormGroup.valueChanges.subscribe(a => console.log(a));
    }

  }
  ```


  </li>
  <li> Or use loose typing

  ```ruby
  import { FormControlTypeSafe, FormGroupTypeSafe } from 'ng-typesafe-formgroup';


  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
  })
  export class AppComponent {
    typeSafeFormGroupTypedWeak = new FormGroupTypeSafe({
      x: new FormControlTypeSafe('', [Validators.required])
    });

    ngOnInit(){
      this.typeSafeFormGroupTypedWeak.controls.x.value
      this.typeSafeFormGroupTypedWeak.controls.x.valueChanges.subscribe(a => console.log(a));
      this.typeSafeFormGroupTypedWeak.valueChanges.subscribe(a => console.log(a));
    }
  }
      
  ```

  </li>
  </ul>
</details>
<details><summary style="font-weight:bold">Discover the Package</summary>
  <h2 style="color: steelblue">Flexibility</h2>
  <li> Either use strong typing

  ```ruby
    ...
    
    interface CustomInterface{
      name: string,
      email: string,
      message: number,
    };

    ...

    typeSafeFormGroup = new FormGroupTypeSafe<CustomInterface>({
      name: new FormControlTypeSafe<CustomInterface["name"]>('', [Validators.required, Validators.minLength(5)]),
      email: new FormControlTypeSafe<CustomInterface["email"]>('', [Validators.required, Validators.maxLength(30)]),
      message: new FormControlTypeSafe<CustomInterface["message"]>('', [Validators.required, Validators.maxLength(100)])
    });

    ...
  ```
  and this way forms will asset your values on <i>typeSafeFormGroup.valueChanges</i> and <i>typeSafeFormGroup.value</i> such as ;
   ```ruby
    typeSafeFormGroup.valueChanges.subscribe(val => val); \* val asserted as CustomInterface *\
    typeSafeFormGroup.value \* value asserted as CustomInterface \*
   ```
   so that value is asserted correctly, unlike normal FormGroup class asserts everything as any!
  </li>
  <br>
  <li> Or use loose typing. It still prevents you try to reach undefined control or mistype the control name in the group. But providing interface stricts you on form controls you add.
    
  ```ruby
    typeSafeFormGroupTypedWeak = new FormGroupTypeSafe({
      x: new FormControl('', [Validators.required])
    });

    constructor(){}

    ngOnInit(){
      this.typeSafeFormGroupTypedWeak.controls.x /* OK!
      this.typeSafeFormGroupTypedWeak.controls.a /* X->error! a is not a member of constructor object
    }
  ```
      
  </li>

  <br><br>
</details>

<br />

<br />

<br />

<br />

# Important note

Be careful on value assertions. If you declare and interface and provide it to form group, values asserted on property types of interface. For example:
```ruby
  interface CustomInterface{
    name: string,
    email: string,
    message: number,
  };

  typeSafeFormGroup = new FormGroupTypeSafe<CustomInterface>({
    name: new FormControlTypeSafe<CustomInterface["name"]>('', [Validators.required, Validators.minLength(5)]),
    email: new FormControlTypeSafe<CustomInterface["email"]>('', [Validators.required, Validators.maxLength(30)]),
    message: new FormControlTypeSafe<CustomInterface["message"]>('', [Validators.required, Validators.maxLength(100)])
  });

  this.typeSafeFormGroup.controls.email.value -> asserted as: string | number , because types on CustomInterfaces are string | number
  this.typeSafeFormGroup.controls.email.valueChanges.subscribe(a => console.log(a)); -> 'a' asserted as string | number
  this.typeSafeFormGroup.valueChanges.subscribe(a => console.log(a)); -> 'a' asserted as CustomInterface
  this.typeSafeFormGroup.value -> asserted as CustomInterface

```

If you don't provide an interface values asserted as "unknown". If you want to assign the value for example to a string (you expect it coming from the form), just basically do:
  ```ruby
    typeSafeFormGroupTypedWeak = new FormGroupTypeSafe({
      x: new FormControlTypeSafe('', [Validators.required])
    });

    let x:string = <unknown> this.typeSafeFormGroupTypedWeak.controls.x.value as string;
    this.typeSafeFormGroupTypedWeak.controls.x.valueChanges.subscribe(a => a);



    this.typeSafeFormGroupTypedWeak.controls.x.value -> asserted as unknown
  ```

Please note that you can still use FormControl inside FormGroupTypeSafe instead of FormControlTypeSafe, but it's recommended to use FormControlTypeSafe.

# Type safe forms prevents you from making mistakes

- Transpiler warns you if you try to access an invalid control
```ruby
  typeSafeFormGroupTypedWeak = new FormGroupTypeSafe({
    x: new FormGroupTypeSafe('', [Validators.required])
  });

  constructor(){}

  ngOnInit(){
    this.typeSafeFormGroupTypedWeak.controls.x /* OK!
    this.typeSafeFormGroupTypedWeak.controls.a /* X->error! a is not a member of constructor object
  }
```

- If you provide an interface, you can not define a control that is not defined in the interface you provide

```ruby
  interface FormControls{
    name: string,
    email: string,
    message: number,
  };

  typeSafeFormGroup = new FormGroupTypeSafe<FormControls>({
    name: new FormControlTypeSafe('', [Validators.required, Validators.minLength(5)]),
    email: new FormControlTypeSafe('', [Validators.required, Validators.maxLength(30)]),
    message: new FormControlTypeSafe('', [Validators.required, Validators.maxLength(100)]),
    outlier: new FormControlTypeSafe('', [Validators.required, Validators.maxLength(100)]) // X-> error! 'outlier' is not  FormControls property!
  })
```



//old version implementation: v0.0.1
# Angular-Type-Safe-Reactive-FormGroup
Reactive FormGroups Wrapped in a Type Safe Class

FormGroup Wrapper implemented:

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