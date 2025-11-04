import type { INodeProperties } from 'n8n-workflow';

const showOnlyForApplications = {
	resource: ['application'],
};

export const applicationDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForApplications,
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create an application',
				description: 'Create a new application',
				routing: {
					request: {
						method: 'POST',
						url: '/essential-core-api/v1/applications',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete an application',
				description: 'Delete an application',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/essential-core-api/v1/applications/{{$parameter.applicationId}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get an application',
				description: 'Get a single application by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/essential-core-api/v1/applications/{{$parameter.applicationId}}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get applications',
				description: 'Get many applications',
				routing: {
					request: {
						method: 'GET',
						url: '/essential-core-api/v1/applications',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update an application',
				description: 'Update an existing application',
				routing: {
					request: {
						method: 'PUT',
						url: '=/essential-core-api/v1/applications/{{$parameter.applicationId}}',
					},
				},
			},
		],
		default: 'getAll',
	},
	{
		displayName: 'Application ID',
		name: 'applicationId',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['get', 'update', 'delete'],
				resource: ['application'],
			},
		},
		default: '',
		required: true,
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['create', 'update'],
				resource: ['application'],
			},
		},
		default: '',
		required: true,
		description: 'The name of the application',
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
				operation: ['create', 'update'],
				resource: ['application'],
			},
		},
		default: '',
		description: 'The description of the application',
		routing: {
			send: {
				type: 'body',
				property: 'description',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				operation: ['create', 'update'],
				resource: ['application'],
			},
		},
		options: [
			{
				displayName: 'Status',
				name: 'status',
				type: 'string',
				default: '',
				description: 'The status of the application',
				routing: {
					send: {
						type: 'body',
						property: 'status',
					},
				},
			},
			{
				displayName: 'Version',
				name: 'version',
				type: 'string',
				default: '',
				description: 'The version of the application',
				routing: {
					send: {
						type: 'body',
						property: 'version',
					},
				},
			},
		],
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				operation: ['getAll'],
				resource: ['application'],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		routing: {
			send: {
				type: 'query',
				property: 'limit',
			},
		},
		description: 'Max number of results to return',
	},
];
