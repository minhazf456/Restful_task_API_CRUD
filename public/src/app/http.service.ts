import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) {
    this.getTasks()
  }

  getTasks(){
    return this._http.get('/tasks');
  }

  getTasksById(id:string){
    return this._http.get("/tasks/:id");
  }

  addTask(body){
    console.log("service "+body)
    console.log(body)
    return this._http.post('/tasks', body);
  }

  editTask(editTask){
    // console.log("making request" +  editTask)
    return this._http.put(`/tasks/${editTask._id}`, editTask);
  }

  deleteTask(task){
    return this._http.delete(`/tasks/${task._id}`, task);
  }
}
