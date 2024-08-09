import { ResponseScheduleDTO } from './../../../interfaces/response-schedule-dto';
import { ScheduleDTO } from './../../../interfaces/schedule-dto';
import { TokenInterceptor } from './../../../token.interceptor';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { ScheduleService } from '../../../services/shedule/schedule.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(
    private localStorageService: LocalStorageService,
    private scheduleService: ScheduleService
  ) {}

  form: any = {
    specialty: '',
    doctor: '',
    dateId: '',
    hour: '',
  };

  isModalOpen = false;
  userNameLoggedIn!: string;

  specialties: any[] = [];
  doctors: any[] = [];
  dates: any[] = [];

  schedules: ResponseScheduleDTO[] = [];

  ngOnInit() {
    this.userNameLoggedIn = this.localStorageService
      .get('username')
      .toUpperCase();
    this.loadSpecialties();
    this.loadDoctors();
    this.loadDates();
  }

  loadSpecialties() {
    try {
      this.scheduleService.getSpecialties().subscribe((data) => {
        this.specialties = data;
      });
    } catch (error) {
      alert('Erro ao carregar especialidades.');
    }
  }

  loadDoctors() {
    try {
      this.scheduleService.getDoctors().subscribe((data) => {
        this.doctors = data;
      });
    } catch (error) {
      alert('Erro ao carregar especialidades.');
    }
  }

  loadDates() {
    try {
      this.scheduleService.getDate().subscribe((data) => {
        this.dates = data;
      });
    } catch (error) {
      alert('Erro ao carregar especialidades.');
    }
  }

  onChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.form[target.name] = target.value;
  }

  get filteredDoctors() {
    return this.form.specialty
      ? this.doctors.filter(
          (doctor) =>
            doctor.especialidade.nome.toLowerCase() ===
            this.form.specialty.toLowerCase()
        )
      : this.doctors;
  }

  get filteredDates() {
    return this.form.doctor
      ? this.dates.filter(
          (doctor) =>
            doctor.medico.especialidade.nome.toLowerCase() ===
            this.form.specialty.toLowerCase()
        )
      : this.dates;
  }

  get filteredHours() {
    return this.form.dateId
      ? this.dates.find(
          (doctor) =>
            doctor.medico.especialidade.nome.toLowerCase() ===
              this.form.specialty.toLowerCase() && String(doctor.id) === this.form.dateId
        ).horarios
      : [];
  }

  submit() {
    const schedule = { agenda_id: this.form.dateId, horario: this.form.hour } as ScheduleDTO;
    this.scheduleService.schedule(schedule).subscribe((data) => {
      this.schedules.unshift(data);
      this.clearForm();
    });
    this.closeModal()
  }

  clearForm() {
    this.form = {
      specialty: '',
      doctor: '',
      dateId: '',
      hour: '',
    };
  }

  // lógica apenas para fazer o visual funcionar
  removeSchedule(index: number) {
    this.schedules.splice(index, 1);
  }

  removeScheduleMethod(){
    this.scheduleService.removeSchedule(this.form.dateId);
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
