from flask import Flask, request, redirect, abort
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
import json
from flask_jsonpify import jsonify
import string
import random
import datetime
from time import gmtime, strftime
import os
import redis
from werkzeug.utils import secure_filename
import base64


# Configuration
REDIS_URL = os.getenv('REDISTOGO_URL', 'redis://localhost:6379')
PER_PAGE = 30
SECRET_KEY = 'development key'

app = Flask(__name__)

# Setup redis client
r = redis.StrictRedis.from_url(REDIS_URL)

CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

cors = CORS(app, resources={r"/foo": {"origins": "http://localhost:5002"}})

app.config.from_object(__name__)

api = Api(app)




#borrar db
#r.flushdb();

@app.route('/cargarContenido', methods=['POST'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def cargarContenido():
    usuario = request.json['usuario']

    contenido = {
    'usuario': usuario,
    'descripcion':request.json['descripcion'],
    'foto': request.json['foto'],
    'fecha': strftime("%d-%m-%Y", gmtime())
    }

    if usuario == 'usuario1':
        timelineUsuario = 'timeline:%s' % usuario
        timelineSeguidor = 'timeline:usuario2'
    else:
        timelineUsuario = 'timeline:%s' % usuario
        timelineSeguidor = 'timeline:usuario1'

    fotosUsuario = 'fotos:%s' % usuario

    r.lpush(timelineUsuario,json.dumps(contenido),)
    r.lpush(timelineSeguidor,json.dumps(contenido))
    r.lpush(fotosUsuario,json.dumps(contenido))
    return jsonify("CONTENIDO CARGADO")

@app.route('/cargarHistoria', methods=['POST'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def cargarHistoria():
    usuario = request.json['usuario']

    contenido = {
    'usuario': usuario,
    'foto': request.json['foto'],
    }

    fecha = datetime.datetime.now().isoformat()
    historia = 'historia:%s:' % usuario
    clave = historia + fecha

    r.lpush(clave,json.dumps(contenido),)
    r.expire(clave,15)

    return jsonify("HISTORIA CARGADO")



@app.route('/getTimeline/<username>')
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def getTimeline(username):
    contenido = []
    timelineUsuario = 'timeline:%s' % username

    for i in range(0, r.llen(timelineUsuario)):
        foto = json.loads(r.lindex(timelineUsuario,i))
        contenido.append(foto)

    retorno = {
        'contenido': contenido
    }

    return json.dumps(retorno)

@app.route('/getFotos/<username>')
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def getFotos(username):
    print('getFotos')
    contenido = []
    fotosUsuario = 'fotos:%s' % username
    for i in range(0, r.llen(fotosUsuario)):
        foto = json.loads(r.lindex(fotosUsuario,i))
        contenido.append(foto)

    retorno = {
        'contenido': contenido
    }

    return json.dumps(retorno)

@app.route('/getHistorias/<username>')
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def getHistorias(username):
    contenido = []

    for key in r.scan_iter(match='historia:*'):
        print(key)
        foto = json.loads(r.lindex(key,0))
        contenido.append(foto)

    retorno = {
        'contenido': contenido
    }

    return json.dumps(retorno)





if __name__ == '__main__':
   app.run(port=5002)
