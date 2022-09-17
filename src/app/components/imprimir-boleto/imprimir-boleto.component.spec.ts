import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimirBoletoComponent } from './imprimir-boleto.component';

describe('ImprimirBoletoComponent', () => {
  let component: ImprimirBoletoComponent;
  let fixture: ComponentFixture<ImprimirBoletoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImprimirBoletoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImprimirBoletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
