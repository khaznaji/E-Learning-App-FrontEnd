import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';

@Component({
  selector: 'app-coach-profile',
  templateUrl: './coach-profile.component.html',
  styleUrls: ['./coach-profile.component.css']
})
export class CoachProfileComponent implements   OnInit {

  data: any = [];
  username!:string;
  image!:any;


  status:boolean=false;
  updateImage!:FormGroup;
    constructor(private sr:UserService,private formBuilder: FormBuilder,
      ) { }


    getUserByid(id:any){
      this.sr.getUserById(id).subscribe(res=>{
        this.data=res
        console.log(this.data);
        this.username=this.data.firstName+" "+this.data.lastName
        this.image=this.data.image
      })
    }
    selectedFileName: string = '';
    get f() { return this.updateImage.controls; }

    cjangeleImage(){
      const formData = new FormData();
      formData.append('image', this.updateImage.get('image')!.value);
      this.sr.updateImage(localStorage.getItem('id'),formData).subscribe(res=>{
        this.getUserByid(localStorage.getItem('id'))

        console.log(res)})

    }
    onFileSelected(event: any) {
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        this.updateImage.get('image')!.setValue(file);
        this.selectedFileName = file.name;
      }
    }

    ngOnInit(): void {

      this.getUserByid(localStorage.getItem('id'))

      this.updateImage=this.formBuilder.group({
        image: ['']

      })
    }

}
