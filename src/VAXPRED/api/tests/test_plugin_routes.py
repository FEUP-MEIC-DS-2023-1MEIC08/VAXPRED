from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_list_plugins():
    response = client.get("/plugins/")
    assert response.status_code == 200
    assert "plugins" in response.json()

def test_create_plugin():
    plugin_data = {
        "name": "New Plugin",
        "version": "1.0.0",
        "description": "A new plugin",
        "developer": "John Doe"
    }
    response = client.post("/plugins/", json=plugin_data)
    assert response.status_code == 200
    assert "id" in response.json()


def test_get_plugin_by_id():
  response = client.get("/plugins/1")
  assert response.status_code == 200
  assert "id" in response.json()


def test_get_plugin_by_FTS():
  response = client.get("/plugins/?search=Boost")
  assert response.status_code == 200
  assert "plugins" in response.json()
  