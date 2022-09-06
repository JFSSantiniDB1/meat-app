import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { RadioOption } from './radio-option.model';

@Component({
  selector: 'ma-radio',
  templateUrl: './radio.component.html',
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true
    }
  ]
})
export class RadioComponent implements OnInit, ControlValueAccessor  {

  @Input() options: RadioOption[] | undefined
  
  value: any

  onChange: any

  constructor() { }

  ngOnInit(): void {
  }

  setValue(opt: any) {
    this.value = opt.value
    this.onChange(this.value)
  }


  writeValue(obj: any): void {
    this.value = obj
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}

}
