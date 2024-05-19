from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
import base64

def encrypt_data(data, key):
    cipher = AES.new(key, AES.MODE_EAX)
    ciphertext, tag = cipher.encrypt_and_digest(data.encode())
    return base64.b64encode(cipher.nonce + tag + ciphertext).decode()

def decrypt_data(encrypted_data, key):
    encrypted_data = base64.b64decode(encrypted_data)
    nonce = encrypted_data[:16]
    tag = encrypted_data[16:32]
    ciphertext = encrypted_data[32:]
    cipher = AES.new(key, AES.MODE_EAX, nonce)
    plaintext = cipher.decrypt_and_verify(ciphertext, tag)
    return plaintext.decode()

# Read HTML data from file
with open("Front_dashboard/Guarder Free Website Template - Free-CSS.com/guarder-html/Accident_reports.html", "r", encoding="utf-8") as file:
    html_data = file.read()

# Generate random key
key = get_random_bytes(16)

# Encrypt HTML data
encrypted_html_data = encrypt_data(html_data, key)
print("Encrypted data:", encrypted_html_data)

# Decrypt HTML data (optional)
decrypted_html_data = decrypt_data(encrypted_html_data, key)
print("Decrypted data:", decrypted_html_data)
