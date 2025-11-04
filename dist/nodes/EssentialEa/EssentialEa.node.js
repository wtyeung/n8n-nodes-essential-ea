"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EssentialEa = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const user_1 = require("./resources/user");
const company_1 = require("./resources/company");
const repository_1 = require("./resources/repository");
const application_1 = require("./resources/application");
const businessCapability_1 = require("./resources/businessCapability");
class EssentialEa {
    constructor() {
        this.description = {
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
            inputs: [n8n_workflow_1.NodeConnectionTypes.Main],
            outputs: [n8n_workflow_1.NodeConnectionTypes.Main],
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
                ...application_1.applicationDescription,
                ...businessCapability_1.businessCapabilityDescription,
                ...company_1.companyDescription,
                ...repository_1.repositoryDescription,
                ...user_1.userDescription,
            ],
        };
    }
    async execute() {
        const credentials = await this.getCredentials('essentialEaApi');
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
        const items = this.getInputData();
        const returnData = [];
        for (let i = 0; i < items.length; i++) {
            try {
                const resource = this.getNodeParameter('resource', i);
                const operation = this.getNodeParameter('operation', i);
                let method = 'GET';
                let endpoint = '';
                let body = undefined;
                if (resource === 'user') {
                    if (operation === 'getAll') {
                        endpoint = '/users';
                    }
                    else if (operation === 'get') {
                        const userId = this.getNodeParameter('userId', i);
                        endpoint = `/users/${userId}`;
                    }
                    else if (operation === 'create') {
                        method = 'POST';
                        endpoint = '/users';
                        body = {
                            name: this.getNodeParameter('name', i),
                        };
                    }
                }
                else if (resource === 'application') {
                    if (operation === 'getAll') {
                        endpoint = '/essential-core-api/v1/applications';
                    }
                    else if (operation === 'get') {
                        const applicationId = this.getNodeParameter('applicationId', i);
                        endpoint = `/essential-core-api/v1/applications/${applicationId}`;
                    }
                    else if (operation === 'create') {
                        method = 'POST';
                        endpoint = '/essential-core-api/v1/applications';
                        body = {
                            name: this.getNodeParameter('name', i),
                            description: this.getNodeParameter('description', i),
                        };
                    }
                    else if (operation === 'update') {
                        method = 'PUT';
                        const applicationId = this.getNodeParameter('applicationId', i);
                        endpoint = `/essential-core-api/v1/applications/${applicationId}`;
                        body = {
                            name: this.getNodeParameter('name', i),
                            description: this.getNodeParameter('description', i),
                        };
                    }
                    else if (operation === 'delete') {
                        method = 'DELETE';
                        const applicationId = this.getNodeParameter('applicationId', i);
                        endpoint = `/essential-core-api/v1/applications/${applicationId}`;
                    }
                }
                else if (resource === 'businessCapability') {
                    if (operation === 'getAll') {
                        endpoint = '/essential-core-api/v1/business-capabilities';
                    }
                    else if (operation === 'get') {
                        const capabilityId = this.getNodeParameter('capabilityId', i);
                        endpoint = `/essential-core-api/v1/business-capabilities/${capabilityId}`;
                    }
                    else if (operation === 'create') {
                        method = 'POST';
                        endpoint = '/essential-core-api/v1/business-capabilities';
                        body = {
                            name: this.getNodeParameter('name', i),
                            description: this.getNodeParameter('description', i),
                        };
                    }
                }
                else if (resource === 'repository') {
                    if (operation === 'getAll') {
                        endpoint = '/essential-core-api/v1/repositories';
                    }
                    else if (operation === 'get') {
                        const repositoryId = this.getNodeParameter('repositoryId', i);
                        endpoint = `/essential-core-api/v1/repositories/${repositoryId}`;
                    }
                }
                else if (resource === 'company') {
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
            }
            catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({
                        json: { error: error.message },
                        pairedItem: { item: i },
                    });
                }
                else {
                    throw error;
                }
            }
        }
        return [returnData];
    }
}
exports.EssentialEa = EssentialEa;
//# sourceMappingURL=EssentialEa.node.js.map