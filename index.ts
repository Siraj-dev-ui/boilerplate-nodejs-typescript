import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
const userRoutes = require('./Routes/UserRoutes');
const _ = require('dotenv').config();
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

const port = process.env.PORT;

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Swagger UI
// const swaggerJsDocs = YAML.load('./Swagger/swagger.yaml');
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDocs));

interface SwaggerObject {
  openapi: string;
  info: {
    title: string;
    version: string;
    description?: string;
    // Add more properties as needed
  };
  paths: {
    [path: string]: {
      [method: string]: {
        summary?: string;
        description?: string;
        operationId?: string;
        // Add more properties as needed
      };
    };
  };
  // Add more top-level properties as needed
}

const swaggerJsDocs = YAML.load('./Swagger/swagger.yaml') as SwaggerObject;
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDocs));
// app.get('/', (req: Request, res: Response) => {
//   res.send(`hellow from exdsfpress again and agian ${process.env.Name}`);
// });

// app.post('/', (req: Request, res: Response) => {
//   res.send({
//     data: req.body,
//   });
// });

// Routes

app.use(userRoutes);

app.listen(port, () => {
  console.log(`now listening on port ${port}`);
});
