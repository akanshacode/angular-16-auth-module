// auth/login/login.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var sliderCaptcha: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  @ViewChild('captchaCheckbox') captchaCheckbox: any;
  constructor(private fb: FormBuilder,private router: Router,private modalService: NgbModal) {}
  public captchaVerify = false;
	public showPassword = false;
  sliders: any
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Add a method to handle form submission
  onSubmit() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
        return;
      // Handle login logic here
    }
     // Get entered email and password
     const enteredEmail = this.loginForm?.value?.email;
     const enteredPassword = this.loginForm?.value?.password;
 
     // Retrieve stored credentials from local storage
     let data:any=localStorage.getItem('credentials')
     const storedCredentials = JSON.parse(data) || [];
 
     // Check if entered credentials match any stored credentials
     const matchedCredential = storedCredentials.find(
       (       credential: { email: any; password: any; }) => credential.email === enteredEmail && credential.password === enteredPassword
     );
 
     if (matchedCredential) {
       // Redirect to dashboard or perform other actions as needed
       console.log('Login successful. Redirecting to dashboard.');
       this.router.navigate(['/dashboard']);
     } else {
       // Show alert for invalid email and password
       alert('Invalid email or password.');
     }
   }
  
  

  loginWithGoogle() {
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