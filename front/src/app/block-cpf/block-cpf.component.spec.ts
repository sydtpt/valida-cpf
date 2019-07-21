import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockCpfComponent } from './block-cpf.component';

describe('BlockCpfComponent', () => {
  let component: BlockCpfComponent;
  let fixture: ComponentFixture<BlockCpfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockCpfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockCpfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
