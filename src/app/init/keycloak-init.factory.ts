import { KeycloakService } from "keycloak-angular";

export function initializeKeycloak(keycloak: KeycloakService) {
    return () =>
        keycloak.init({
            config: {
                url: 'http://localhost:8080',
                realm: 'myrealm',
                clientId: 'myclient'
            },
            initOptions: {
                //onLoad: 'check-sso',
                //silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'
                silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
                redirectUri: 'http://localhost:4200',
                checkLoginIframe: false,
            }
        });
}