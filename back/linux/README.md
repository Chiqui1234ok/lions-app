In ```linux``` folder will be all the stuff related to:
1) Cron jobs, which controlls:
    - All tasks which needs daily/weekly/monthly run

2) User's databases:
    - My architectural approach says I need a database for each user, so when the user search or filters a result, MongoDB doesn't need to look between a lot of documents (even documents which doesn't belong to the user). I think this approach will speed up database queries in the mid-long run.
    The data needed for running a database for an user, like:
        - ```.env``` file
        - ```Dockerfile```
        - ```docker-compose.yml```