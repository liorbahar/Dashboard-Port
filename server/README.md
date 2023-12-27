1. run the command: docker run -d -p 27017:27017 --name my-mongo-container mongo
2. run the command: npm start
3. the server will run on port 3001

* the service communicate with mongo db

db architecture:
there are serveral collections
1. chartskinds - enum of the available charts like (pie, bar)
2. charts - list of charts each chart related to chartkinds
3. eventschemas - list of event schemas
4. events - list of event each event related to specific event schema