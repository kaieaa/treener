// Database mockup
const groups = [
    {
        id: 0,
        name: 'Soojendusharjutused',
        description: 'Kirjeldus',
        dateAdded: Date.now()
    },
    {
        id: 1,
        name: 'Harrastajatele',
        description: 'Kirjeldus',
        dateAdded: Date.now()
    }
  ];
  
  const groupsService = {};
  
  groupsService.read = () => {
    return groups;
  }
  
  
  groupsService.readById = (id) => {
    return groups[id];
  }
  
  groupsService.create = (group) => {
    group.id = groups.length,
    groups.push(group);
    return group;
  }
  
  groupsService.update = (group) => {
    // Check if optional data exists
    if (group.description) {
      // Change user data in 'database'
      groups[group.id].description = group.description;
    }
    // Check if optional data exists
    if ((group.exerciseId || group.exerciseId === 0)) {
      // Change user data in 'database'
      groups[group.id].exerciseId = group.exerciseId;
    }
    return groups[group.id];
  }
  
  groupsService.delete = (id) => {
    groups.splice(id, 1);
    return true;
  }
  
  module.exports = groupsService;