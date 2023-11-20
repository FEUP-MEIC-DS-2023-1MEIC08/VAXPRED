from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

class UserPlugin(BaseModel):
    name: str
    version: str
    description : str
    developer : str
    release_date : datetime
    last_update_date : datetime
    supplier_name : str
    supplier_email : str
    plugin_id: int
    association_date : datetime
    duration : Optional[int] 

class UserPluginList(BaseModel):
    associations: List[UserPlugin]
