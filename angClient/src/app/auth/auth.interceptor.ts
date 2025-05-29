import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";

import { UserService } from "../shared/user.service";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

	constructor(private userService: UserService, private router: Router) { }

	intercept(req: HttpRequest<any>, next: HttpHandler) {

		// for requests which dont need jwt token to be passed like 'login' and 'signup'
		if (req.headers.get('noauth'))
			return next.handle(req.clone());
		// for requests which require token to be attached in the headers
			else {
				const clonedreq = req.clone({
					headers: req.headers.set("Authorization", "Bearer " + this.userService.getToken())
				});
				return next.handle(clonedreq).pipe(
					tap(
						event => {},
						err => {
							if (err.error.auth == false) {
								this.router.navigateByUrl('/login');
							}
						}
					)
				);
		}
	}
}