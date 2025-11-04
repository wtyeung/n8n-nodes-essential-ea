"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EssentialEaApi = void 0;
class EssentialEaApi {
    constructor() {
        this.name = 'essentialEaApi';
        this.displayName = 'Essential Ea API';
        this.icon = 'file:essentialEa.svg';
        this.documentationUrl = 'https://github.com/timyeung/n8n-nodes-essential-ea?tab=readme-ov-file#credentials';
        this.properties = [
            {
                displayName: 'Domain',
                name: 'domain',
                type: 'string',
                default: 'https://mycompany.essentialintelligence.com',
                required: true,
                placeholder: 'https://mycompany.essentialintelligence.com',
                description: 'The domain of your Essential EA instance (without trailing slash)',
            },
            {
                displayName: 'Username',
                name: 'username',
                type: 'string',
                default: '',
                required: true,
                description: 'Your Essential EA username',
            },
            {
                displayName: 'Password',
                name: 'password',
                type: 'string',
                typeOptions: { password: true },
                default: '',
                required: true,
                description: 'Your Essential EA password',
            },
        ];
        this.authenticate = {
            type: 'generic',
            properties: {},
        };
        this.test = {
            request: {
                baseURL: '={{$credentials.domain}}',
                url: '/api/oauth/token',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    username: '={{$credentials.username}}',
                    password: '={{$credentials.password}}',
                },
            },
        };
    }
}
exports.EssentialEaApi = EssentialEaApi;
//# sourceMappingURL=EssentialEaApi.credentials.js.map