import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfiguracaoComponent } from './modal-configuracao.component';

describe('ModalConfiguracaoComponent', () => {
  let component: ModalConfiguracaoComponent;
  let fixture: ComponentFixture<ModalConfiguracaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalConfiguracaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalConfiguracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
