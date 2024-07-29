import { Directive, ElementRef, Input, inject } from '@angular/core';
import { ComponentProps, createElement, ElementType } from 'react';
import { createRoot } from 'react-dom/client';

@Directive({
  selector: '[reactComponent]',
})
export class ReactNgDirective<Comp extends ElementType> {
  @Input() reactComponent!: Comp;
  @Input() props: ComponentProps<Comp> | undefined;

  private root = createRoot(inject(ElementRef).nativeElement)

  ngOnChanges() {
    this.root.render(createElement(this.reactComponent, this.props))
  }

  ngOnDestroy() {
    this.root.unmount();
  }
}