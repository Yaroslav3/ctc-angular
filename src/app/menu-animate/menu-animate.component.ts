import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-menu-animate',
  templateUrl: './menu-animate.component.html',
  styleUrls: ['./menu-animate.component.scss', './menu-animate.adaptive.component.scss'],
  animations: [
    trigger('menuAnimate', [
      state('show', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      state('hide', style({
        opacity: 0,
        transform: 'translateY(-100%)'
      })),
      transition('show => hide', animate('500ms ease-out')),
      transition('hide => show', animate('500ms ease-in'))
    ])
  ]
})
export class MenuAnimateComponent implements OnInit {
  state = 'hide';

  constructor(public el: ElementRef) {
  }

  ngOnInit() {
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const componentPosition = this.el.nativeElement.offsetTop;
    const scrollPosition = window.pageXOffset;

    if (scrollPosition >= componentPosition) {
      const pos = window.pageXOffset;
      if (pos > 800) {
        this.state = 'show';
      } else if (pos < 800) {
        this.state = 'hide';
      }
    }
  }
}
