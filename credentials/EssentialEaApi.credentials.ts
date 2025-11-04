import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class EssentialEaApi implements ICredentialType {
	name = 'essentialEaApi';

	displayName = 'Essential Ea API';

	icon = 'file:essentialEa.svg' as const;

	// Link to your community node's README
	documentationUrl = 'https://github.com/timyeung/n8n-nodes-essential-ea?tab=readme-ov-file#credentials';

	properties: INodeProperties[] = [
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

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {},
	};

	test: ICredentialTestRequest = {
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
