from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_list_users():
    response = client.get("/users/")
    assert response.status_code == 200
    assert "users" in response.json()
  
def test_create_user():
    user_data = {
        "username": "John Doe",
        "email": "johndoe@email.com"
    }
    response = client.post("/users/", json=user_data)
    assert response.status_code == 400
    assert "User with this name already exists" in response.json()["detail"]
    
def test_get_user_by_id():
  response = client.get("/users/1")
  assert response.status_code == 200
  assert "id" in response.json()
