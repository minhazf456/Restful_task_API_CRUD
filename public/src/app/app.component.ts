import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = ""
  tasks = [];
  task = "";
  green = false;
  newTask: any;
  editTask: any;
  editTog: boolean = false;

  constructor(private _httpService: HttpService){
  }
/// here we initialised this two service when the page is loaded. firstone, getting all tasks from getTasksFromService() function. and 2ndone representing the new objects to be created with its attributes.
  ngOnInit(){
    this.getTasksFromService()
    this.newTask = { title: "", description: "" }
  }

  getTasksFromService(){
    const observable = this._httpService.getTasks();
    observable.subscribe(data => {
      console.log('~Loading All Tasks~', data);
      this.tasks = data['tasks']
      this.green = true;
    });
  }

  onSubmit(){
    console.log("~Pre Create~");
    const observable = this._httpService.addTask(this.newTask);
    observable.subscribe(data => {
      console.log("~Create~");
      this.newTask = data['data']
      this.getTasksFromService();
    })
  }

  editForm(task){
    this.editTask = {_id: task._id, title: task.title, description: task.description}
    this.editTog = true;
  }

  onEdit(){
    let observable = this._httpService.editTask(this.editTask);
    console.log(this.editTask)
    observable.subscribe(data => {
      console.log("~Edit~");
      this.editTog = false;
      this.getTasksFromService();
    })
  }

  onDelete(task){
    let observable = this._httpService.deleteTask(task);
    observable.subscribe(data => {
      console.log("~Delete~");
      this.getTasksFromService();
  })
}
}

//   // info(idx){
//   //   this.task = this.tasks[idx];
//   // }
// }


// tslint:disable-next-line: max-line-length
/// For Form data, when user creates data from html the data stays in the htmlso we want our data to be trasferred to the controller(app/component.ts, because data needs to be sent to the database.From controller, data will come down to the service(http.service.ts). from here http will make post request to the server and data will end up to database through server.~~~~~ Now from database~~~ ,database will respose back to server will communicate to the serice from where the request came from, at this point response is observable, we should be returning the observable to the compponent and component will subscribe the data and will decide what he gonna do with this data.
