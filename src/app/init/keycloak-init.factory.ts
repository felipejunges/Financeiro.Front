import { KeycloakService } from "keycloak-angular";

export function initializeKeycloak(keycloak: KeycloakService) {
    return () =>
        keycloak.init({
            config: {
                url: 'http://keycloak:8080',
                realm: 'myrealm',
                clientId: 'myclient'
            },
            initOptions: {
                silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
                redirectUri: 'http://localhost:4200',
                checkLoginIframe: false,
            }
        });
}