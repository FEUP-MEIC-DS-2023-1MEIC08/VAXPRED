from sqlalchemy.orm import Session

from models import PluginDependency

class PluginDependencyRepository:
    def __init__(self, db: Session):
        self.db = db

    def create_dependency(self, plugin_id, dependency_name, dependency_vendor, dependency_version):
        new_dependency = PluginDependency(name=dependency_name,vendor = dependency_vendor, version=dependency_version,plugin_id=plugin_id)
        self.db.add(new_dependency)
        self.db.commit()
        self.db.refresh(new_dependency)
        return new_dependency

    def get_dependencies_by_plugin_id(self, plugin_id):
        dependencies = self.db.query(PluginDependency).filter_by(plugin_id=plugin_id).all()
        dependenciesList = []
        for dependency in dependencies:
            dependenciesList.append([dependency.name,dependency.vendor,dependency.version])
        return dependenciesList

    def update_dependencies(self, plugin_id, new_dependencies):
        self.db.query(PluginDependency).filter_by(plugin_id=plugin_id).delete()

        for dependency in new_dependencies:
            new_dependency = PluginDependency(name=dependency[0],vendor=dependency[1],version=dependency[2] ,plugin_id=plugin_id)
            self.db.add(new_dependency)

        self.db.commit()

        new_dependencies = self.get_dependency_names_by_plugin_id(plugin_id)
        return new_dependencies