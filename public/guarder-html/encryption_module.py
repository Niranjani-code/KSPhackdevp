from cryptography.fernet import Fernet

def generate_key():
    return Fernet.generate_key()
    encoded_encryption_key = b'QTg4OHVSYlhjX2pBb1I0LThGcHN5dGp0TXVmdXpPc09zaUJoU055bWk2QT0='

def encrypt(data, key):
    cipher_suite = Fernet(key)
    encrypted_data = cipher_suite.encrypt(data.encode())
    return encrypted_data

def decrypt(encrypted_data, key):
    cipher_suite = Fernet(key)
    decrypted_data = cipher_suite.decrypt(encrypted_data).decode()
    return decrypted_data
