import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScheduleDTO } from '../../interfaces/schedule-dto';
import { ResponseScheduleDTO } from '../../interfaces/response-schedule-dto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  protected apiUrl = environment.apiUrl;

  constructor(protected httpClient: HttpClient) { }

  public getSpecialties(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/especialidades`);
  }

  public getDoctors(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/medicos`);
  }

  public getDate(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/agendas`);
  }

  public schedule(scheduleDTO: ScheduleDTO): Observable<ResponseScheduleDTO> {
    return this.httpClient.post<ResponseScheduleDTO>(`${this.apiUrl}/consultas`, { scheduleDTO } );
  }

  public removeSchedule(consulta_id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/consultas/${consulta_id}`);
  }

}
