import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appToggleDropdown]'
})
export class ToggleDropdownDirective {
  @HostBinding('class.open') toggle = false ;
  

  @HostListener('click') onClick() {
    this.toggle = !this.toggle ;
    console.log(this.toggle);
  }

  constructor() {}

}
