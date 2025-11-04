"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repositoryDescription = void 0;
const showOnlyForRepositories = {
    resource: ['repository'],
};
exports.repositoryDescription = [
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
//# sourceMappingURL=index.js.map