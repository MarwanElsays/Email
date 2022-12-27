import { Directive, ElementRef, Renderer2, OnInit, HostListener } from '@angular/core';

@Directive({
  selector: '[appChangebkcolor]'
})
export class ChangebkcolorDirective implements OnInit{

  constructor(private elem:ElementRef,private renderer:Renderer2) { }

  ngOnInit(): void {}
  
  @HostListener('click') onmouseClick(){
    this.renderer.setStyle(this.elem.nativeElement,'border-bottom','3px solid black');
  }

}


// this.renderer.setStyle(this.elem.nativeElement,'border-bottom','3px solid black');