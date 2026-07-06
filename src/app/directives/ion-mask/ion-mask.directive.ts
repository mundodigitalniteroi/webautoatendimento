import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appIonMask]',
})
export class IonMaskDirective {
  @Input('appIonMask') maskConfig: {
    mask: string;
    placeholderChar?: string;
    blockedKeys?: string[];
  } = { mask: '' };

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any): void {
    this.el.nativeElement.value = '';
    let value: string = event.target.value.replace(/\D/g, '');
    let maskedValue: string = this.applyMask(value);

    this.el.nativeElement.value = maskedValue;
  }

  @HostListener('beforeinput', ['$event'])
  onKeyDown(event: any): void {
    // Bloqueia teclas especificadas
    if (
      this.maskConfig.blockedKeys &&
      this.maskConfig.blockedKeys.includes(event.data)
    ) {
      event.preventDefault();
    }
  }

  private applyMask(value: string): string {
    const mask: string = this.maskConfig.mask;
    const placeholderChar: string = this.maskConfig.placeholderChar || '9';

    let result: string = '';
    let maskIndex: number = 0;

    if (mask.length == 0) return value;

    for (let i = 0; i < mask.length && maskIndex < value.length; i++) {
      if (mask[i] === placeholderChar) {
        result += value[maskIndex++];
      } else {
        result += mask[i];
      }
    }

    return result;
  }
}
