import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionDirective } from './action.directive';
import { ActionDirectiModule } from './action.module';

describe(ActionDirective.name, () => {
  let fixture: ComponentFixture<ActionDirectiveTestComponent> = null;
  let component: ActionDirectiveTestComponent = null;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionDirectiveTestComponent],
      imports: [ActionDirectiModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ActionDirectiveTestComponent);
    component = fixture.componentInstance;
  });

  it('(DOM) (@Output appAction) should emit event with payload when ENTER key is pressed', () => {
    const divElement: HTMLElement =
      fixture.nativeElement.querySelector('.dummy-component');
    const event = new KeyboardEvent('keyup', { key: 'Enter' });

    divElement.dispatchEvent(event);

    expect(component.hasEvent()).toBeTrue();
  });

  it('(DOM) (@Output appAction) should emit event with payload when clicked', () => {
    const divElement: HTMLElement =
      fixture.nativeElement.querySelector('.dummy-component');
    const event = new Event('click');

    divElement.dispatchEvent(event);

    expect(component.hasEvent()).toBeTrue();
  });

  it('(DOM) (@Output appAction) should emit event with payload when ENTER key is pressed or clicked', () => {
    const divElement: HTMLElement =
      fixture.nativeElement.querySelector('.dummy-component');
    const clickEvent = new Event('click');
    const enterEvent = new KeyboardEvent('keyup', { key: 'Enter' });

    divElement.dispatchEvent(clickEvent);
    expect(component.hasEvent()).withContext('Click Event').toBeTrue();

    component.clearEvent();

    divElement.dispatchEvent(enterEvent);
    expect(component.hasEvent())
      .withContext('Keyboard Event "keyup"')
      .toBeTrue();
  });
});

@Component({
  template:
    '<div class="dummy-component" (appAction)="actionHandler($event)"></div>',
})
class ActionDirectiveTestComponent {
  private event: Event = null;

  public actionHandler(event: Event): void {
    this.event = event;
  }

  public hasEvent(): boolean {
    return !!this.event;
  }

  public clearEvent(): void {
    this.event = null;
  }
}
