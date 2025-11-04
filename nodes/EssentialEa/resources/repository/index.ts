import type { INodeProperties } from 'n8n-workflow';

const showOnlyForRepositories = {
	resource: ['repository'],
};

export const repositoryDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForRepositories,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get repositories',
				description: 'Get many repositories',
				routing: {
					request: {
						method: 'GET',
						url: '/essential-core-api/v1/repositories',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a repository',
				description: 'Get a single repository by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/essential-core-api/v1/repositories/{{$parameter.repositoryId}}',
					},
				},
			},
		],
		default: 'getAll',
	},
	{
		displayName: 'Repository ID',
		name: 'repositoryId',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['get'],
				resource: ['repository'],
			},
		},
		default: '',
		description: 'The repository ID to retrieve',
	},
];
