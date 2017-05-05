import os
import sys
from datetime import date, datetime
from functools import wraps

from sqlalchemy import and_

from flask import (Flask, abort, flash, redirect, render_template, request,
                   session, url_for)
from flask_login import LoginManager, current_user, login_user, logout_user

app = Flask(__name__)

login_manager = LoginManager()
login_manager.init_app(app)

datas = []

@app.route('/')
def root_page():
	string = ""
	for datum in datas:
		string += "{} -> temp = {}, lum = {}, hum={}<br>".format(
			datum[0],
			datum[1],
			datum[2],
			datum[3])
	return string

@app.route('/arduino', methods=['GET', 'POST'])
def parse_request():
	datas.append(
		(datetime.now().strftime('%d-%m-%Y %H:%M'),
		request.args.get('temp'),
		request.args.get('lum'),
		request.args.get('hum')))
	return str(datas)

if __name__ == "__main__":
	print("Tornado starting")
	# this forces print output also to heroku log
	sys.stdout.flush()

	from tornado.wsgi import WSGIContainer
	from tornado.httpserver import HTTPServer
	from tornado.ioloop import IOLoop
	import os

	http_server = HTTPServer(WSGIContainer(app))

	port = int(os.environ.get("PORT", 5000))
	http_server.listen(port, address='0.0.0.0')
	IOLoop.instance().start()
