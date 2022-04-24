from flask import Flask
from flask import render_template as rt
app = Flask('app')
home = "https://aisa.ehnryu.repl.co"
def render(c="",home="",**kwargs):
  if c.endswith(".html"):
    c = open(f"templates/{c}","r")
    c = c.read()

  return rt("page.html",c=c,home=home,**kwargs)
@app.route('/')
def hello_world():
  return render(home=home)
@app.route('/library/')
def libr():

  return render(c="lib.html",home=home)
  
@app.route('/m/')
def m():

  return render(c="m.html",home=home)
app.run(host='0.0.0.0', port=8080)