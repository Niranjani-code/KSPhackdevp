import random
import string
from bs4 import BeautifulSoup

def generate_random_encryption_value():
    encryption_value = ''.join(random.choices(string.ascii_uppercase + string.digits, k=16))
    return encryption_value

def encrypt_html_file(input_file, output_file):
    # Read the content of the input HTML file
    with open(input_file, "r") as f:
        html_content = f.read()

    # Parse the HTML content
    soup = BeautifulSoup(html_content, 'html.parser')

    # Identify the columns to encrypt
    column_indices_to_encrypt = [1, 4,17, 18,19]

    # Process each row in the table
    for row in soup.find_all('tr')[1:]:  # Skip the header row
        # Process each cell in the row
        cells = row.find_all('td')
        for i, cell in enumerate(cells):
            # Check if the cell corresponds to a column to encrypt
            if i in column_indices_to_encrypt:
                # Encrypt the cell value
                encrypted_value = generate_random_encryption_value()
                # Replace the original value with the encrypted value
                cell.string = encrypted_value

    # Write the encrypted HTML content to the output file
    with open(output_file, "w") as f:
        f.write(str(soup))

    print("HTML file encrypted successfully.")

if __name__ == "__main__":
    input_file_path = "C://Users//vaibh_e47rn93//dataprivacy//Front_dashboard//WebsiteTemplate//guarder-html//Victim_Info_Details.html"
    output_file_path = "C://Users//vaibh_e47rn93//dataprivacy//Front_dashboard//WebsiteTemplate//guarder-html//Victim_info_details_encrypt.html"
    
    encrypt_html_file(input_file_path, output_file_path)
