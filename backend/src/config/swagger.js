const  { join }= require('path');
const fs = require('fs');
const swaggerUI = require('swagger-ui-express');
const yaml = require('yamljs');
const { ENV } = require('./constants');


function swagger  (router) {
    
    try {
        const files = fs.readdirSync(join(__dirname, '../docs/routes'))
        const swaggerDoc = yaml.load(join(__dirname, `../docs/swagger.yml`))
        for (const i of files) {
            const doc = yaml.load(join(__dirname, `../docs/routes/${i}`))

            if ('paths' in doc) { swaggerDoc.paths = { ...swaggerDoc.paths, ...doc.paths } }
            if ('components' in doc) {
                if ('schemas' in doc.components) { swaggerDoc.components.schemas = { ...swaggerDoc.components.schemas, ...doc.components.schemas } }
                if ('responses' in doc.components) { swaggerDoc.components.responses = { ...swaggerDoc.components.responses, ...doc.components.responses } }
            }
        }
        router.use('/docs', swaggerUI.serve);
        router.get('/docs', swaggerUI.setup(swaggerDoc));
        console.log(`Loading swagger document in: http://localhost:${ENV.PORT}/docs`);
        
    } catch (err) {
        console.log('Error loading Swagger files .yml :', err);
    }
}

module.exports = swagger