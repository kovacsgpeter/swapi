from flask import Flask, flash, render_template, url_for, redirect, request, session
import json
from urllib.request import Request, urlopen
import data_manager



app = Flask(__name__)

app.secret_key = 'whatever'






def get_api():
    webURL = Request("https://swapi.co/api/planets/", headers={'User-Agent': 'Mozilla/5.0'})
    webpage = urlopen(webURL)
    data = webpage.read()
    encoding = webpage.info().get_content_charset('utf-8')
    response_data = json.loads(data.decode(encoding))

    return response_data['results'][0]

@app.route("/")
def route_main():
    print('load')
    return render_template("main.html")

@app.route('/registration', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        user = data_manager.check_user(request.form['register_user_name'])
        if len(user) == 0:

            password = data_manager.hash_password(request.form['register_password'])

            login_name = request.form['register_user_name']

            data_manager.register(login_name, password)

            return redirect(url_for('route_main', already_used=False))
        else:
            return render_template('registration.html', already_used=True)
    return render_template('registration.html', already_used=False)


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        user_name = request.form['user_name']

        data = data_manager.login(user_name)
        if not data:

            return render_template('main.html',error="failed")
        user_id = data_manager.get_id_by_user_name(user_name)['user_id']
        session['user_name'] = user_name
        session['user_id'] = user_id

        log = data_manager.verify_password(request.form.to_dict()['password'], data[0]['user_password'])
        if log:

            return redirect(url_for('route_main'))
        else:
            session.pop('user_name', None)
            session.pop('user_id', None)
            return render_template('main.html', error="failed")
    else:

        return render_template('main.html')


@app.route('/logout')
def logout():
    session.pop('user_name',None)
    return redirect(url_for('route_main'))


app.run()