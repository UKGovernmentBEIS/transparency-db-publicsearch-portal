const environment =
    process.env.NODE_ENV === 'test'
        ? 'env=local'
        : process.env.APP_ENV || process.argv[2];

const publicSearchUrls = {
    'env=local': 'http://localhost:8581',
    'env=dev':
        'https://dev-transparency-db-public-search-service.azurewebsites.net',
    'env=stg':
        'https://stg-transparency-db-public-search-service.azurewebsites.net',
    'env=prod':
        'https://prod-transparency-db-public-search-service.azurewebsites.net',
};

const accessManagementUrls = {
    'env=local': 'http://localhost:8090',
    'env=dev':
        'https://dev-transparency-db-access-management-service.azurewebsites.net',
    'env=stg':
        'https://stg-transparency-db-access-management-service.azurewebsites.net',
    'env=prod':
        'https://prod-transparency-db-access-management-service.azurewebsites.net',
};

const beisUrlPublicSearch = publicSearchUrls[environment];
const beisUrlAccessManagement = accessManagementUrls[environment];

if (!beisUrlPublicSearch) {
    throw new Error(`Unsupported environment: ${environment}`);
}

if (!beisUrlAccessManagement) {
    throw new Error(`Unsupported environment: ${environment}`);
}

module.exports = { beisUrlPublicSearch, beisUrlAccessManagement };
