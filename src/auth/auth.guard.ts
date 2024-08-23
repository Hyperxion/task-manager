import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (this.configService.get('ENABLE_AUTH') === 'false') return true;

    const secret = this.configService.get('JWT_SECRET');
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const handlerClass = context.getClass();
    const handlerName = context.getHandler();

    // Login and register routes should be public
    if (handlerClass.name === 'AuthController') return true;

    //Get ToDo Lists route must be public
    if (
      handlerClass.name === 'ToDoListsController' &&
      handlerName.name === 'findAll'
    )
      return true;

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: secret,
      });

      request.userId = decoded.id;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(
    request: Request & { authorization },
  ): string | undefined {
    const [type, token] =
      (request.headers as any).authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
