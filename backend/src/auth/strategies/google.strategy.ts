import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(configService: ConfigService) {
        const clientID = configService.get<string>('GOOGLE_CLIENT_ID') || 'DUMMY_CLIENT_ID';
        const clientSecret = configService.get<string>('GOOGLE_CLIENT_SECRET') || 'DUMMY_CLIENT_SECRET';
        const callbackURL = configService.get<string>('GOOGLE_CALLBACK_URL') || 'http://localhost:3001/auth/google/callback';

        super({
            clientID,
            clientSecret,
            callbackURL,
            scope: ['email', 'profile'],
        });

        if (clientID === 'DUMMY_CLIENT_ID') {
            console.warn('[GoogleStrategy] GOOGLE_CLIENT_ID is not configured. Google Login will not work.');
        }
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ): Promise<any> {
        const { name, emails, photos } = profile;
        const fullName = [name.givenName, name.familyName].filter(Boolean).join(' ');
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            fullName: fullName || emails[0].value.split('@')[0],
            picture: photos[0].value,
            accessToken,
        };
        done(null, user);
    }
}
