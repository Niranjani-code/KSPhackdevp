from flask import Flask, request, render_template
import encryption_module
import base64

app = Flask(__name__)

# Encoded Encryption key (should be kept secure)
encoded_encryption_key = b'QTg4OHVSYlhjX2pBb1I0LThGcHN5dGp0TXVmdXpPc09zaUJoU055bWk2QT0='

# Decode the encoded key to bytes
encryption_key = base64.urlsafe_b64decode(encoded_encryption_key)

@app.route('/')
def index():
    return render_template('Accident_reports.html')

@app.route('/encrypt', methods=['POST'])
def encrypt_data():
    original_data = request.form['original_data']
    encrypted_data = encryption_module.encrypt(original_data, encryption_key)
    return render_template('encrypt.html', encrypted_data=encrypted_data)

@app.route('/decrypt', methods=['POST'])
def decrypt_data():
    encrypted_data = request.form['encrypted_data']
    decrypted_data = encryption_module.decrypt(encrypted_data, encryption_key)
    return render_template('Accident_reports.html', decrypted_data=decrypted_data)

if __name__ == '__main__':
    app.run(debug=True)
