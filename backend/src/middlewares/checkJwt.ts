import { config } from '../configure';
import { type Request, type Response, type NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface AuthConfig {
    domain: string,
    audience: string,
    secret: string,
}

const authConfig: AuthConfig = {
    domain: config.auth0.domain,
    audience: config.auth0.audience,
    secret: config.auth0.secret
};

interface IPayload {
    sub: string,
}

export function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authToken = request.headers.authorization;
    if (!authToken) {
        return response.status(401).send({ message: 'Unauthorized' });
    }
    const token = authToken.split(' ')[1];
    try {
        const { sub } = verify(token, config.auth0.secret, {
            audience: authConfig.audience,
            issuer: authConfig.domain
        }) as IPayload;
        console.log('sub', sub);
        next();
    } catch (err) {
        return response.status(401).send({ message: 'Unauthorized' });
    }
}
