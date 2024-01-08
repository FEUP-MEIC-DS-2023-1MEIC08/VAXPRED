from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_list_tags():
    response = client.get("/tags/")
    assert response.status_code == 200
    assert "tags" in response.json()
    
def get_plugins_by_tag():
    response = client.get("/tags/1/plugins")
    assert response.status_code == 200
    assert "plugins" in response.json()
