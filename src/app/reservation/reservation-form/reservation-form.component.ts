import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation.service';
import { Reservation } from 'src/app/models/reservation';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {

  action: string = '';
  reservationForm: FormGroup = new FormGroup({});

  /**
   * This is the example of dependency injection in Angular. 
   * Angular will inject this dependency when this compoment is created.
   * 
   */
  constructor(private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router, private ActivatedRoute: ActivatedRoute) {

  }

  /**
   * We see taht this.formBuilder here is available as class number. 
   * This is TypeScript shorthand for inilizing a class member. In the 
   * consutructor you just need to inject a private field. 
   */
  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]], //multiple validator can be submitted
      roomNumber: ['', Validators.required]
    });
  }

  setAction(value: string) {
    this.action = value;
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      console.log("valid");

      /**
       * We could also create a Reservation object here manually by accessing the value from
       * checkInDate, checkOutDate and others. 
       * However this.reservationForm.value gives us a handy way to do this.
       */
      let reservation: Reservation = this.reservationForm.value;
      this.reservationService.addReservation(reservation);

    }

    if (this.action === 'submit') {
      // reset the value
      this.reservationForm.reset();
    } else if (this.action === 'submitExit') {
      // navigate away
      this.router.navigate(['/list'])
    }

  }

}
