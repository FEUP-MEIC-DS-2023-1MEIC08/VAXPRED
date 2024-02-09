from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_list_images():
    response = client.get("/images/")
    assert response.status_code == 200
    assert "images" in response.json()
    
def get_image_by_id():
    response = client.get("/images/1")
    assert response.status_code == 200
    assert "image" in response.json()

def get_image_by_plugin_id():
    response = client.get("/images/plugins/1")
    assert response.status_code == 200
    assert "image" in response.json()