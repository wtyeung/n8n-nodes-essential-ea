import { NodeConnectionTypes, type INodeType, type INodeTypeDescription, type IExecuteFunctions, type INodeExecutionData } from 'n8n-workflow';
import { userDescription } from './resources/user';
import { companyDescription } from './resources/company';
import { repositoryDescription } from './resources/repository';
import { applicationDescription } from './resources/application';
import { businessCapabilityDescription } from './resources/businessCapability';

export class EssentialEa implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Essential Ea',
		name: 'essentialEa',
		icon: { light: 'file:essentialEa.svg', dark: 'file:essentialEa.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the Essential Ea API',
		defaults: {
			name: 'Essential Ea',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'essentialEaApi', required: true }],
		requestDefaults: {
			baseURL: '={{$credentials.domain}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Application',
						value: 'application',
					},
					{
						name: 'Business Capability',
						value: 'businessCapability',
					},
					{
						name: 'Company',
						value: 'company',
					},
					{
						name: 'Repository',
						value: 'repository',
					},
					{
						name: 'User',
						value: 'user',
					},
				],
				default: 'user',
			},
			...applicationDescription,
			...businessCapabilityDescription,
			...companyDescription,
			...repositoryDescription,
			...userDescription,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const credentials = await this.getCredentials('essentialEaApi');
		
		// Get access token
		const tokenResponse = await this.helpers.httpRequest({
			method: 'POST',
			url: `${credentials.domain}/api/oauth/token`,
			headers: {
				'Content-Type': 'application/json',
			},
			body: {
				username: credentials.username,
				password: credentials.password,
			},
			json: true,
		});
		
		const accessToken = tokenResponse.access_token || tokenResponse.token;
		
		// Execute requests with token
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		
		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;
				
				let method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET';
				let endpoint = '';
				let body: unknown = undefined;
				
				// Build request based on resource and operation
				if (resource === 'user') {
					if (operation === 'getAll') {
						endpoint = '/users';
					} else if (operation === 'get') {
						const userId = this.getNodeParameter('userId', i) as string;
						endpoint = `/users/${userId}`;
					} else if (operation === 'create') {
						method = 'POST';
						endpoint = '/users';
						body = {
							name: this.getNodeParameter('name', i) as string,
						};
					}
				} else if (resource === 'application') {
					if (operation === 'getAll') {
						endpoint = '/essential-core-api/v1/applications';
					} else if (operation === 'get') {
						const applicationId = this.getNodeParameter('applicationId', i) as string;
						endpoint = `/essential-core-api/v1/applications/${applicationId}`;
					} else if (operation === 'create') {
						method = 'POST';
						endpoint = '/essential-core-api/v1/applications';
						body = {
							name: this.getNodeParameter('name', i) as string,
							description: this.getNodeParameter('description', i) as string,
						};
					} else if (operation === 'update') {
						method = 'PUT';
						const applicationId = this.getNodeParameter('applicationId', i) as string;
						endpoint = `/essential-core-api/v1/applications/${applicationId}`;
						body = {
							name: this.getNodeParameter('name', i) as string,
							description: this.getNodeParameter('description', i) as string,
						};
					} else if (operation === 'delete') {
						method = 'DELETE';
						const applicationId = this.getNodeParameter('applicationId', i) as string;
						endpoint = `/essential-core-api/v1/applications/${applicationId}`;
					}
				} else if (resource === 'businessCapability') {
					if (operation === 'getAll') {
						endpoint = '/essential-core-api/v1/business-capabilities';
					} else if (operation === 'get') {
						const capabilityId = this.getNodeParameter('capabilityId', i) as string;
						endpoint = `/essential-core-api/v1/business-capabilities/${capabilityId}`;
					} else if (operation === 'create') {
						method = 'POST';
						endpoint = '/essential-core-api/v1/business-capabilities';
						body = {
							name: this.getNodeParameter('name', i) as string,
							description: this.getNodeParameter('description', i) as string,
						};
					}
				} else if (resource === 'repository') {
					if (operation === 'getAll') {
						endpoint = '/essential-core-api/v1/repositories';
					} else if (operation === 'get') {
						const repositoryId = this.getNodeParameter('repositoryId', i) as string;
						endpoint = `/essential-core-api/v1/repositories/${repositoryId}`;
					}
				} else if (resource === 'company') {
					if (operation === 'getAll') {
						endpoint = '/companies';
					}
				}
				
				const responseData = await this.helpers.httpRequest({
					method,
					url: `${credentials.domain}${endpoint}`,
					headers: {
						Authorization: `Bearer ${accessToken}`,
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body,
					json: true,
				});
				
				returnData.push({
					json: responseData,
					pairedItem: { item: i },
				});
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: error.message },
						pairedItem: { item: i },
					});
				} else {
					throw error;
				}
			}
		}
		
		return [returnData];
	}
}
