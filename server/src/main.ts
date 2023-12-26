import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(3001);
}
bootstrap();

// const Ajv = require('ajv');

// // Your JSON Schema
// const jsonSchema = {
//   "title" : "lior",
//   "description" : "A product from Acme's catalog",
//   "type" : "object",
//   "properties" : {
//       "productId" : {
//           "description" : "The unique identifier for a product",
//           "type" : "integer"
//       },
//       "productName" : {
//           "description" : "Name of the product",
//           "type" : "string"
//       }
//   }
// }
// // Your JSON data to validate
// const jsonData = {
//   "productId": 123,
//   "productName": "Sample Product",
// };

// // Create an Ajv instance
// const ajv = new Ajv();

// // Compile the JSON Schema
// const validate = ajv.compile(jsonSchema);

// // Validate the JSON data
// const isValid = validate(jsonData);

// if (isValid) {
//   console.log('JSON data is valid.');
// } else {
//   console.log('JSON data is not valid.');
//   console.log(validate.errors);
// }
