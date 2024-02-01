import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridJsAngularComponent } from './gridjs-angular.component';

describe('GridjsAngularComponent', () => {
  let component: GridJsAngularComponent;
  let fixture: ComponentFixture<GridJsAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridJsAngularComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GridJsAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
