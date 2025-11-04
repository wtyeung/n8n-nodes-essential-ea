"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.businessCapabilityDescription = void 0;
const showOnlyForBusinessCapabilities = {
    resource: ['businessCapability'],
};
exports.businessCapabilityDescription = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: showOnlyForBusinessCapabilities,
        },
        options: [
            {
                name: 'Get Many',
                value: 'getAll',
                action: 'Get business capabilities',
                description: 'Get many business capabilities',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/essential-core-api/v1/business-capabilities',
                    },
                },
            },
            {
                name: 'Get',
                value: 'get',
                action: 'Get a business capability',
                description: 'Get a single business capability by ID',
                routing: {
                    request: {
                        method: 'GET',
                        url: '=/essential-core-api/v1/business-capabilities/{{$parameter.capabilityId}}',
                    },
                },
            },
            {
                name: 'Create',
                value: 'create',
                action: 'Create a business capability',
                description: 'Create a new business capability',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/essential-core-api/v1/business-capabilities',
                    },
                },
            },
        ],
        default: 'getAll',
    },
    {
        displayName: 'Capability ID',
        name: 'capabilityId',
        type: 'string',
        displayOptions: {
            show: {
                operation: ['get'],
                resource: ['businessCapability'],
            },
        },
        default: '',
        required: true,
        description: 'The business capability ID',
    },
    {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['businessCapability'],
            },
        },
        default: '',
        required: true,
        description: 'The name of the business capability',
        routing: {
            send: {
                type: 'body',
                property: 'name',
            },
        },
    },
    {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['businessCapability'],
            },
        },
        default: '',
        description: 'The description of the business capability',
        routing: {
            send: {
                type: 'body',
                property: 'description',
            },
        },
    },
];
//# sourceMappingURL=index.js.map