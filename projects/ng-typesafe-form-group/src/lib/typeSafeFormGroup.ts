import { 
    AbstractControl, 
    AbstractControlOptions, 
    AsyncValidatorFn, 
    FormControl, 
    FormGroup, 
    ValidatorFn 
} from "@angular/forms";

export interface ITypeSafeFormControls{[key:string]:FormControl};

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