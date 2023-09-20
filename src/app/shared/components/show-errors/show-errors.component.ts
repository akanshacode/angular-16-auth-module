// show-errors.component.ts
import { Component, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-show-errors',
  templateUrl: './show-errors.component.html',
  styleUrls: ['./show-errors.component.css']
})
export class ShowErrorsComponent {
  private static readonly errorMessages: any = {
    'required': (param?: any) => `${param} is required`,
    'email': () => 'Please enter a valid email',
    'minlength': (params: { requiredLength: string }) => 'The min number of characters is ' + params.requiredLength,
    'maxlength': (params: { requiredLength: string }) => 'The max allowed number of characters is ' + params.requiredLength,
    'pattern': (params: any) => 'Please Enter a valid value',
    'min': (params: { min: any }) => `At least ${params.min} is required in this field`,
    'max': (params: { max: any }) => `Max value can be ${params.max} only`,
    'ngxEditor': (params: { allowedLength: any; textLength: any }) => `The max allowed number of characters is ${params.allowedLength} and current characters are ${params.textLength}`,
    'whitespace': () => 'Please enter valid input',
  };

  @Input()
  public control!: AbstractControlDirective | AbstractControl | null;
  @Input() fname = "";

  constructor() { }

  ngOnInit() {
  }

  /**
   * @description: used to set whether to show errors or not
   */
  shouldShowErrors(): any {
    return this.control &&
      this.control.errors &&
      (this.control.dirty || this.control.touched);
  }

  /**
   * @description: used to set the list of errors
   */
  listOfErrors(): string[] {
    let data: any = this.control?.errors
    let arr = Object.keys(data);
    let msg = this.getMessage(arr[0], data[arr[0]]);
    let array = [];
    array.push(msg);
    return array;
  }

  /**
   * @description: used to get the error validation message
   * @param type
   * @param params
   * @returns
   */
  private getMessage(type: string, params: any) {
    if (type == "required") {
      if (this.fname) {
        params = this.fname;
      } else {
        params = 'This field';
      }
    }

    return ShowErrorsComponent.errorMessages[type](params);
  }
}
