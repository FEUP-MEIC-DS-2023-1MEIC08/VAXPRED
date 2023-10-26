from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_associate_user_plugin():
    response = client.post("/users/1/plugins/1/associate/")
    assert response.status_code == 200
    assert "message" in response.json()

def test_list_user_plugins():
    response = client.get("/users/1/plugins/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_disassociate_user_plugin():
    response = client.delete("/users/1/plugins/1/disassociate/")
    assert response.status_code == 200
    assert "message" in response.json()

