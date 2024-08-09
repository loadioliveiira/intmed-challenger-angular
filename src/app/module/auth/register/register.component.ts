import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../../services/register/register.service';
import { ModalDefaultComponent } from '../../../shared/modal-default/modal-default.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModalDefaultComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private registerService: RegisterService
  ) {}

  registerForm!: FormGroup;

  passwordFieldType: string = 'password';

  isModalOpen = false;
  modalTitle = 'Erro';
  modalMessage = '';

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.checkPasswords }
    );
  }

  submitRegister() {
    if (this.registerForm.invalid) return;

    const { name, email, password, confirmPassword } =
      this.registerForm.getRawValue();
    try {
      this.registerService.register(name, email, password);
      this.router.navigate(['/login']);
    } catch (erro) {
      this.modalMessage = 'Erro ao tentar fazer cadastro';
      this.isModalOpen = true;
    }
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password')!.value;
    const confirmPassword = group.get('confirmPassword')!.value;

    return password === confirmPassword ? null : { notSame: true };
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  togglePassword(elements: string[]) {
    elements.forEach((element) => {
      const passwordInput = <HTMLInputElement>document.getElementById(element);
      if (passwordInput) {
        if (passwordInput.type === 'password') {
          passwordInput.type = 'text';
          this.passwordFieldType = 'text';
        } else {
          this.passwordFieldType = 'password';
          passwordInput.type = 'password';
        }
      }
    });
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
