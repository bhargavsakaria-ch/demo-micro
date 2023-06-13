import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { IncomingHttpHeaders } from 'http';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { Services } from './microservice.enum';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(Services.AUTH) private authClient: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (context.getType() !== 'http') return false;
    console.log('AuthGuard called by Class: ', context.getClass());
    console.log('AuthGuard called by Function: ', context.getHandler());

    const request = context.switchToHttp().getRequest();
    const headers: IncomingHttpHeaders = request.headers;
    const authorizationHeader = headers.authorization;

    if (!authorizationHeader) return false;

    const accessTokenParts = (authorizationHeader as string).split(' ');

    if (accessTokenParts.length !== 2) return false;

    const accessToken = accessTokenParts[1];

    return this.authClient
      .send({ cmd: 'verify_jwt' }, { accessToken: accessTokenParts.join(' ') })
      .pipe(
        switchMap(({ exp }) => {
          if (!exp) return of(false);

          const TOKEN_EXP_MS = exp * 1000;

          const jwtValid = Date.now() < TOKEN_EXP_MS;
          console.log('JWT VALID: ', jwtValid);

          return of(jwtValid);
        }),
        catchError(() => {
          throw new UnauthorizedException();
        }),
      );
  }
}
