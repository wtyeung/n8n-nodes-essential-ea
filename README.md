# n8n-nodes-essential-ea

This is an n8n community node. It lets you use Essential EA (Enterprise Architecture) in your n8n workflows.

Essential EA is an enterprise architecture management platform that helps organizations capture and manage information about their business capabilities, applications, processes, technology, and data.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Resources](#resources)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

This node supports the following resources and operations:

### Application
- **Get Many**: Retrieve multiple applications
- **Get**: Get a single application by ID
- **Create**: Create a new application
- **Update**: Update an existing application
- **Delete**: Delete an application

### Business Capability
- **Get Many**: Retrieve multiple business capabilities
- **Get**: Get a single business capability by ID
- **Create**: Create a new business capability

### Company
- **Get Many**: Retrieve multiple companies with pagination support

### Repository
- **Get Many**: Retrieve all repositories
- **Get**: Get a single repository by ID

### User
- **Get Many**: Retrieve multiple users
- **Get**: Get a single user by ID
- **Create**: Create a new user

## Credentials

To use this node, you need an Essential EA API access token.

### Prerequisites
1. Access to an Essential EA instance (e.g., `https://yourcompany.essentialintelligence.com`)
2. An API access token with appropriate permissions

### Setup
1. In n8n, go to **Credentials** > **New**
2. Search for "Essential EA API"
3. Enter your **Access Token**
4. Click **Save**

The node uses Bearer token authentication and will automatically include the token in the Authorization header for all API requests.

## Compatibility

- Minimum n8n version: 1.0.0
- Tested with n8n version: 1.x
- Uses n8n-workflow API version 1

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [Essential EA API Documentation](https://api.enterprise-architecture.org/)
* [Essential Project Website](https://enterprise-architecture.org/)

## Version History

### 0.1.0
- Initial release
- Support for Applications, Business Capabilities, Companies, Repositories, and Users
- Bearer token authentication
- CRUD operations for core resources
