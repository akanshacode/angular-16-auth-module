// auth/signup/signup.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/app/environments/environment';
declare var sliderCaptcha: any;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  signupForm!: FormGroup;

  @ViewChild('captchaCheckbox') captchaCheckbox: any;
  public captchaVerify = false;
	public showPassword = false;
  sliders: any

  constructor(private fb: FormBuilder,private modalService: NgbModal) {}


  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.passwordMatchValidator // Custom validation function
    });
  }

  // Add a method to handle form submission
  onSubmit() {
    if (!this.signupForm.valid) {
      this.signupForm.markAllAsTouched();
return;
      // Handle login logic here
    }
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;

    // Retrieve existing credentials from local storage or initialize as an empty array
    let data:any=localStorage.getItem('credentials')
    let storedCredentials = JSON.parse(data) || [];

    // Append the new credentials to the array
    storedCredentials.push({ email, password });

    // Save the updated credentials array back to local storage
    localStorage.setItem('credentials', JSON.stringify(storedCredentials));

    // Optionally, you can clear the form fields here
    this.signupForm.reset();
    console.log(this.signupForm.value); // Access form values
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      // Set a custom error if passwords do not match
      confirmPassword?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    // Clear the custom error if passwords match
    confirmPassword?.setErrors(null);
    return null;
  }


  signinWithGoogle() {
    let url = "google"
		window.location.href = environment.baseURL + 'auth/v1/' + url;
   
  }

  openSlider(content: any) {
    const modalRef = this.modalService.open(content, { size: 'md', centered: true, windowClass: 'slider-capcha',backdrop: 'static', });

    modalRef.result.then((result: string) => {
        if (result === 'closedByBackdrop') {
            // Modal closed by clicking outside, uncheck the checkbox
            this.captchaCheckbox.nativeElement.checked = false;
        }
    });

    const captcha = sliderCaptcha({
        id: 'sliderCap',
        repeatIcon: 'fa fa-redo',
        onSuccess: () => {
            this.captchaVerify = true;
            console.log('Captcha verified successfully');
            // this.toastrService.success('Captcha Verified Successfully');
            this.sliders = document.getElementsByClassName('slider');
            for (let i = 0; i < this.sliders.length; i++) {
                this.sliders[i].style.display = 'none';
            }

            // Close all modals and disable the checkbox
            this.modalService.dismissAll();
            this.captchaCheckbox.nativeElement.disabled = true;
            return;
        }
    });
}
}