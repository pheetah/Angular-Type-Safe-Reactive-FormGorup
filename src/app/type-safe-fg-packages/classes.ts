import { 
    AbstractControl, 
    AbstractControlOptions, 
    AsyncValidatorFn, 
    FormControl, 
    FormControlOptions, 
    FormGroup, 
    ValidatorFn 
} from "@angular/forms";
import { Observable } from "rxjs";

export interface ITypeSafeFormControls{[key:string]:FormControl};

interface ValueChanges<T>{
    valueChanges():Observable<T>
}

export class FormGroupTypeSafe<T extends object> extends FormGroup{
    constructor(
        controls: Record<keyof T, AbstractControl>, 
        validatorOrOpts?: ValidatorFn | AbstractControlOptions | ValidatorFn[], 
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[]
    ){
        super(controls, validatorOrOpts, asyncValidator);
    }

    override controls!: Record<keyof T, FormControlTypeSafe<T[keyof T]>>;

    // get valueChangesTypeSafe$() : Observable<T>{
    //     return this.valueChanges;
    // }

    override valueChanges!: Observable<T>;

    override value!: T;
}

export class FormControlTypeSafe<K> extends FormControl{
    constructor(
        formState?: any, 
        validatorOrOpts?: ValidatorFn | ValidatorFn[] | FormControlOptions | null, 
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
    ){
        super(formState, validatorOrOpts, asyncValidator);
    }

    override valueChanges!: Observable<K>;

    override value!: K;
}