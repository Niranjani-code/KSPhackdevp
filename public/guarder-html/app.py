from flask import Flask, render_template, url_for

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('C:\\Users\\vaibh_e47rn93\\dataprivacy\\Front_dashboard\\WebsiteTemplate\\guarder-html\\templates\\index1.html')

if __name__ == "__main__":
    app.run(debug=True)
