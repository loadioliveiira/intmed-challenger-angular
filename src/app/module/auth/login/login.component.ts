import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { AuthService } from '../../../services/auth-service/auth.service';
import { ModalDefaultComponent } from '../../../shared/modal-default/modal-default.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModalDefaultComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private authService: AuthService
  ) {}

  loginForm!: FormGroup;

  passwordFieldType: string = 'password';

  isModalOpen = false;
  modalTitle = 'Erro';
  modalMessage = '';

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get username() {
    return this.loginForm.get('username')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.getRawValue();
    this.localStorageService.set('username', username);

    this.authService.login(username, password).subscribe(
      (response) => {
        this.localStorageService.set('token', response.token);
        this.router.navigate(['/home']);
      },
      (error) => {
        this.modalMessage = 'Usuário ou senha incorreto';
        this.isModalOpen = true;
      }
    );
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  togglePassword() {
    const passwordInput = <HTMLInputElement>document.getElementById('password');
    if (passwordInput.type === 'password') {
      this.passwordFieldType = 'text';
      (<HTMLInputElement>document.getElementById('password')).type = 'text';
    } else {
      this.passwordFieldType = 'password';
      (<HTMLInputElement>document.getElementById('password')).type = 'password';
    }
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
