1. run the command: docker run -d -p 27017:27017 --name my-mongo-container mongo
2. the the command: npm i
3. run the command: 'npm start' inside the server folder
4. the server will run on port 3001

* The service communicate with mongo db

db architecture:
there are serveral collections
1. chartskinds - list of the available charts like (pie, bar) -> Enum
2. charts - list of charts each chart related to chartkinds
3. eventschemas - list of event schemas
4. events - list of event each event related to specific event schema


fake data:
for example if ypu want to create Event Schema you can put this in the Json Input Text in the UI:
{
  "title": "kkkiiiii",
  "description": "A product from Acme's catalog",
  "type": "object",
  "properties": {
    "productId": {
      "description": "The unique identifier for a product",
      "type": "integer"
    },
    "productName": {
      "description": "Name of the product",
      "type": "string"
    }
  },
  "required": ["productId", "productName"]
}