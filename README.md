# Movie service

Service collect movies from http://www.omdbapi.com and save into local database.
Also user can add comments to movies.

### Prerequisites

To run service on your local machine you need install

* [docker](https://docs.docker.com/install/) 
* [docker-compose](https://docs.docker.com/compose/install/) 

### Installing

After install docker and docker-compose you can install service on your local machine

```
make
```

## Running

To run service execute command

```
make run
```

Service should run on port 3000. 

Check if service works by executing command

```
curl 127.0.0.1:3000
```

Result:

```
OK
```

## Testing

To run test execute the command

```
make run_test
```

You should see the output

```
  Service
3000
    /GET movies
Node.js app is listening on port:3000
      ✓ it should GET all the movies (44ms)
    /POST movies
      ✓ it should POST a movie title and download movie and save in db (48ms)
    /GET comments
      ✓ it should GET all the comments
    /POST comment
      ✓ it should POST a comment and save in db
```
