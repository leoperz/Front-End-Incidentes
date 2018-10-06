import {FormGroup}from '@angular/forms';

export class RegistrationValidator{
    
    static validate(registrationFormGroup : FormGroup){
        let password = "";
        let confirmpassword="";
        password = registrationFormGroup.controls.password.value;
         confirmpassword= registrationFormGroup.controls.confirmpassword.value;

        if(confirmpassword == null){
            return null;
        }
        if(confirmpassword != password){
            return{
                doesMatchPassword:true
            }
        }
        return null;
    }
}