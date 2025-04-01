import spacy
import sys
import json
import pickle


from flask import Flask, jsonify, request

app = Flask(__name__)

nlp = spacy.load("es_core_news_sm")
@app.route("/detect-names", methods=["POST"])
def extract_names():
    text=request.get_json().get('text')
    doc=nlp(text)
    print("entidades: ", doc.ents, text)
    for ent in doc.ents: 
        print(f'Entidad {ent.text} Tipo {ent.label_}')
        
            
    names=[ent.text for ent in doc.ents ]
    return jsonify({"names":names})

if __name__=="__main__":
    app.run(debug=True)


