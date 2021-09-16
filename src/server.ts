import express, {Request} from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1

  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  });

  app.get("/filteredimage", async (req, res) => {
    const image_url = req.query.image_url;
    console.log("Step one");
    console.log(image_url);
    if (!image_url) {
      return res.status(422).send('Param image_url is required.');
    }

    try {
      const filtered_image_url = await filterImageFromURL(image_url);
      console.log("Step two");
      await res.status(200).sendFile(filtered_image_url, {}, error => {
        if (error) {
          console.log(error);
          return res.status(422).send('Something goes wrong.');
        }
      });
      console.log("Step three");
    }catch (e) {
      console.log("Throw exception");
      res.status(422).send('Something goes wrong. Check filter image url.');
    }
  });

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  });
})();
