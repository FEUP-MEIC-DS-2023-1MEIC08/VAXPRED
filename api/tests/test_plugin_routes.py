from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_list_plugins():
    response = client.get("/plugins/")
    assert response.status_code == 200
    assert "plugins" in response.json()

def test_create_plugin():
    plugin_data = {
        "name": "ProductivityMaster",
        "version": "3.0",
        "description": "Boost your productivity with this amazing plugin",
        "developer": "TechSolutions Inc.",
        "release_date": "2023-12-11T22:46:55",
        "last_update_date": "2023-12-11T22:46:55",
        "supplier_name": "TechSolutions Inc.",
        "supplier_email": "techsolutions@gmail.com",
        "contract_duration": 2,
        "price": 0,
        "category": "Data Quality",
        "changelog": "This is the changelog.",
        "dependencies": [
          [
            "Lisinopril",
            "Oyope",
            "0.37"
          ]
        ],
        "faqs": [
          {
            "question": "What is this Plugin?",
            "answer": "This Plugin is a powerful tool that helps with..."
          },
          {
            "question": "How do I install this Plugin?",
            "answer": "To install this Plugin, you need to follow these steps..."
          }
        ]
    }
    response = client.post("/plugins/", json=plugin_data)
    assert response.status_code == 409
    assert "Plugin with this name already exists" in response.json()["detail"]


def test_get_plugin_by_id():
  response = client.get("/plugins/1")
  assert response.status_code == 200
  assert "id" in response.json()


def test_get_plugin_by_FTS():
  response = client.get("/plugins/?search=Boost")
  assert response.status_code == 200
  assert "plugins" in response.json()
  

def test_get_plugins_by_category():
   response = client.get("/plugins/category/data-quality")
   assert response.status_code == 200
   assert "plugins" in response.json()

