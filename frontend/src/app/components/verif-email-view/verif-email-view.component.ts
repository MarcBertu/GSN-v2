import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-verif-email-view',
  templateUrl: './verif-email-view.component.html',
  styleUrls: ['./verif-email-view.component.css']
})
export class VerifEmailViewComponent implements OnInit {

  id: number;
  userType: number;

  constructor(private _route: ActivatedRoute, private _emailService : EmailService) {
    this.id = -1;
    this.userType = -100;
  }

  ngOnInit(): void {
    this._route.queryParams.subscribe( params => {
      this.id = params['id'];
      this.userType = params['type'];
    });

    this.updateUserStatut();
  }

  updateUserStatut() {
    this._emailService.verifEmail(this.id, this.userType).subscribe({
      next: () => {
        alert("Votre compte a été validé avec succès !");
      },
      error: (error) => {
        alert("Une erreur est survenue lors de la validation de votre compte.");
      }
    });
  }

}
