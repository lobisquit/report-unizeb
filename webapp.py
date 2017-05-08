import json
import os
import sys
from datetime import date, datetime

from tornado.httpserver import HTTPServer
from tornado.ioloop import IOLoop
from tornado.wsgi import WSGIContainer

from flask import Flask, redirect, render_template, request, url_for
from model import Measure, session

app = Flask(__name__)

@app.route('/')
def root_page():
	# return "<br>".join( [repr(m) for m in session.query(Measure).all()] )
	return render_template('index.html')

@app.route('/last_datum', methods=['GET', 'POST'])
def last_datum():
	last_measure = session.query(Measure).order_by(Measure.date_time.desc()).first()
	return last_measure.to_json()

@app.route('/arduino', methods=['GET', 'POST'])
def parse_request():
	try:
		# try to create a new point
		m = Measure(
			date_time=datetime.now(),
			temperature=int(request.args.get('temperature')),
			humidity=	int(request.args.get('humidity')),
			brightness=	int(request.args.get('brightness')))

		# add measure to database and log
		session.add(m)
		session.commit()
		print("New measure: {}".format(m))

		return str(m)
	except:
		return "<h1>Invalid request</h1>"

if __name__ == "__main__":
	print("Tornado starting")
	sys.stdout.flush() # this forces print output also to heroku log

	http_server = HTTPServer(WSGIContainer(app))

	port = int(os.environ.get("PORT", 5000))
	http_server.listen(port, address='0.0.0.0')
	IOLoop.instance().start()
