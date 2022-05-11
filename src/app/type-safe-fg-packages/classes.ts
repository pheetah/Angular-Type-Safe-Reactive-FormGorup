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
        controls: { [key in keyof T]: AbstractControl; }, 
        validatorOrOpts?: ValidatorFn | AbstractControlOptions | ValidatorFn[], 
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[]
    ){
        super(controls, validatorOrOpts, asyncValidator);
    }

    override controls!: {[key in keyof T]: FormControl};
}