import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal-configuracao',
  templateUrl: './modal-configuracao.component.html',
  styleUrls: ['./modal-configuracao.component.css']
})
export class ModalConfiguracaoComponent {
  faTimes = faTimes;

  constructor(
    public dialogRef: MatDialogRef<ModalConfiguracaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  fecharModal(): void {
    this.dialogRef.close();
  }
}
