import time
from sqlite3 import dbapi2 as sqlite3
from flask import Flask, render_template, request, jsonify, _app_ctx_stack

DATABASE = '/tmp/todolist.db'
PER_PAGE = 30
DEBUG = True

app = Flask('todolist')
app.config.from_object(__name__)


def get_db():
    top = _app_ctx_stack.top
    if not hasattr(top, 'sqlite_db'):
        top.sqlite_db = sqlite3.connect(app.config['DATABASE'])
        top.sqlite_db.row_factory = sqlite3.Row
    return top.sqlite_db


@app.teardown_appcontext
def close_database(exception):
    top = _app_ctx_stack.top
    if hasattr(top, 'sqlite_db'):
        top.sqlite_db.close()


def init_db():
    db = get_db()
    with app.open_resource('schema.sql', mode='r') as f:
        db.cursor().executescript(f.read())
    db.commit()


@app.cli.command('initdb')
def initdb_command():
    init_db()
    print('Initialized the database.')


def query_db(query, args=(), one=False):
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    return (rv[0] if rv else None) if one else rv


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/tasks', methods=["GET", "OPTIONS"])
def get_tasks():
    tasks = query_db('''
                select task_id,
                       text,
                       pub_date
                  from tasks
                 order by task_id asc limit ?''', [PER_PAGE])
    result = [dict(task_id=task['task_id'], text=task['text'], pub_date=task['pub_date']) for task in tasks]
    return jsonify({'tasks': result})


@app.route('/tasks', methods=["POST"])
def create_task():
    task = request.json
    try:
        db = get_db()
        db.execute('''insert into tasks (text, pub_date)
                      values (?, ?)''', (request.json['text'], int(time.time())))
        db.commit()
        for row in query_db('''select last_insert_rowid()''', []):
            task['task_id'] = row[0]
            task['status'] = 'Success'
        return jsonify(task)
    except Exception as e:
        task['status'] = 'Error'
        task['message'] = str(e)
        return jsonify(task)


@app.route('/tasks/<int:task_id>', methods=["DELETE"])
def delete_task(task_id):
    try:
        db = get_db()
        db.execute('''delete from tasks where task_id = ?''', (task_id,))
        db.commit()
        return jsonify({'status': 'Success'})
    except Exception as e:
        return jsonify({'status': 'Error', 'message': str(e)})