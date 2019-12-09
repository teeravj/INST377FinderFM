# Developer Manual
## How to install your application and all dependencies
* Navigate to the directory/folder with the project using the command line.
* Run "npm install" in the command line.
* You should now have a package-lock.json file, a package.json file, a .eslintrc and a .esinterc.json file, and a node_modules folder.
* Make sure to include the following in your .gitignore : node_modules, .DS_Store, npm-debug.log, .vscode/, and /*.env 
* To see if the server is working, run "npm start". You should see a message in the console that says "Example app listening on port 8000!"

## How to run your application on a server
* Open a new tab or window in your browser.
* In the URL bar, type "localhost:8000"
* You should see the home page for FinderFM!


## API for server application 
[PG Country API](https://data.princegeorgescountymd.gov/resource/sphi-rwax.json)
### All GET, POST, PATCH, etc endpoints, and what they each do
* GET
..* app.get("/", (req, res) => {
  const baseURL =
    "https://data.princegeorgescountymd.gov/resource/sphi-rwax.json";
  fetch(baseURL)
    .then(r => r.json())
    .then(data => {
      let cleanData = [];

      data.forEach(i => {
        if (i.season1time && i.farmers_market_id != "1010258") {
            cleanData.push(i);
          }
      });
      console.log(cleanData);
      res.send({ cleanData: cleanData });
    })
    .catch(err => {
      console.log(err);
      res.redirect("/error");
    });
});
..* The GET endpoint of our server retrieves and transforms data from the API. For this API specifically, the GET endpoint only includes markets that are not missing any data, such as the season1time. There is also a duplicate in this API so we do not include that market by including "i.farmers_market_id != '1010258'" in the initial if statement when transforming the data. The cleaned, transformed data is then sent to the front end when a GET request is made.

* POST
* app.post("/", (req, res) => {
  res.send({"hello world!": "hello world!"});
  });
* Our POST endpoint was not needed for this app because no data was being sent to the server. However, using curl, you will see "hello world!" in your console if you make a POST request.

* PUT
* app.put("/", (req, res) => {
  res.send({"hello world!": "hello world!"});
  });
* Our PUT endpoint was not needed for this app because no data was being added to a database. However, using curl, you will see "hello world!" in your console if you make a PUT request.

## A clear set of expectations around known bugs
* There are currently no known bugs.

## Road-map for future development
* Implement a live map with our filter functions
* Live updates with React or some type of dynamic framework
* Implement a calendar
