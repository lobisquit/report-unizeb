# report-unizeb
Web server to report sensors data for [UniZEB](http://unizeb.dii.unipd.it/) project

## How to install
This app requires python3 together with `virtualenv` command and sqlite3 database,
so provide them from your distribution repository.

After that, you should create a virtual environment in the folder and install all
needed dependencies.

```bash
    virtualenv venv/
    source venv/bin/activate
    pip install -r requirements.txt
```

## How to run

[Flask](http://flask.pocoo.org/) application can be run easily for local debugging,
via flask embedded server.

Remember: **always** `source` the virtual environment before starting anything.

```bash
    DATABASE_URL=sqlite:///local.db FLASK_APP=webapp.py flask run
```

To deploy the app, you should go with an high-performance web server, such as [Tornado](http://www.tornadoweb.org/en/stable/).

It can be started at port 5000 (customizable) simply by

```bash
    PORT=5000 python webapp.py
```
