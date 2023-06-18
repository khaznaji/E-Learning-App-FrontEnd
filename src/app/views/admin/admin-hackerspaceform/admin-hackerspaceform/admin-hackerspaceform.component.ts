import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HackerspacesService } from 'src/app/MesServices/Hackerspaces/hackerspaces.service';

@Component({
  selector: 'app-admin-hackerspaceform',
  templateUrl: './admin-hackerspaceform.component.html',
  styleUrls: ['./admin-hackerspaceform.component.css']
})
export class AdminHackerspaceformComponent implements OnInit {

  HackerForm!: FormGroup;
  imagepath = ""

  constructor(
    private formBuilder: FormBuilder,
    private hackerspaceservice: HackerspacesService
  ) { }

  AddHackerspaceForm() {
    const formData = new FormData();
    formData.append('Region', this.HackerForm.get('region')?.value);
    formData.append('Location', this.HackerForm.get('location')?.value);
    formData.append('adresse', this.HackerForm.get('adresse')?.value);
    formData.append('Description', this.HackerForm.get('description')?.value);
    const photoFile = this.HackerForm.get('Photo')?.value;
    if (photoFile instanceof File) {
      // Append the actual file to the form data
      formData.append('Photo', photoFile, photoFile.name);
    }

    formData.append('Email', this.HackerForm.get('email')?.value);
    formData.append('Phone', this.HackerForm.get('phone')?.value);
    console.log(formData);
    this.hackerspaceservice.addHackerspaces(formData).subscribe(
      (data: any) => {
        console.log(data);
      }

    );
  }
  onFileSelected(event: any) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.HackerForm.get('Photo')!.setValue(file);
      console.log(this.HackerForm.get('Photo')!.value);

    }else{
      this.HackerForm.get('Photo')!.setValue(this.imagepath);
    }
}

    get f() { return this.HackerForm.controls; }

  ngOnInit(): void {

    this.HackerForm = this.formBuilder.group({
      region: [''],
      location: [''],
      adresse:[''],
      description: [''],
      phone: [''],
      email: [''],
        Photo: '',

    });
  }
}
