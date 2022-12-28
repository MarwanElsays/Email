import { Directive, ElementRef, Renderer2, OnInit, HostListener } from '@angular/core';

@Directive({
  selector: '[appChangebkcolor]'
})
export class ChangebkcolorDirective {

  constructor(private elem:ElementRef,private renderer:Renderer2) { }
  
  @HostListener('click') onmouseClick(){
    this.renderer.setStyle(this.elem.nativeElement,'border-bottom','3px solid black');
  }

}


// this.renderer.setStyle(this.elem.nativeElement,'border-bottom','3px solid black');