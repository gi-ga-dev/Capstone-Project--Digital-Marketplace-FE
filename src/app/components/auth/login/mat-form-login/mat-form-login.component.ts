import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ShopsystemService } from 'src/app/services/shopsystem.service';

@Component({
  selector: 'app-mat-login-form',
  templateUrl: './mat-form-login.component.html',
  styleUrls: ['./mat-form-login.component.scss']
})
export class LoginMatCardComponent implements OnInit {

  @ViewChild('f') form!: NgForm;
  error = undefined;
  hide = true;
  show = false;

  constructor(
    private authService: AuthService,
    private shopService: ShopsystemService,
    private router: Router) { }

  ngOnInit(): void { }

  onSubmit() {
    this.show = true;
    this.authService.login(this.form.value).subscribe(
      resp => {
        this.error = undefined;
        console.log("--> User logged in");
        this.router.navigate(['home']);
        this.getCartListForBadgeCount(this.authService.getId()).subscribe();
      },
      err => {
        this.error = err.error;
      }
    )
  }

  getCartListForBadgeCount(shopId: number | undefined) {
    // get lista carrello per conteggio badge avviene quando:
    // addToCart, addFreeWithSub, removeFromCart, Login, e Logout (rimuove dal local)
    return this.shopService.getCartListByShopId(shopId).pipe(
      tap(data => {
        localStorage.setItem('badgeCount', JSON.stringify(data.length));
      })
    )
  }

}
