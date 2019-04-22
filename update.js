/* recursive function */
function updateObj(org, com){
  // base case 1 - return if command is null
  if (!com) return org; 

  // base case 2 - return updated object based on $ command
  const comKey = Object.keys(com)[0];  // assume command key doesn't have sibling keys
  if (comKey && comKey.slice(0, 1) === '$') { 
    switch(comKey) {
      case '$set':
        return com[comKey];
      case '$merge':
        return Object.assign({}, org, com[comKey]);
      case '$apply':
        return com[comKey](org);
    }
  } 
  else if (comKey && !org) {
    return updateObj(null, com[compKey]);
  }

  // base case 3 - return non-object item
  if (typeof org !== 'object') return org;  

  // recursive call until it hits base cases
  const tmp = {};
  const keys = [...Object.keys(org), ...Object.keys(com)];  // array of keys from org and com
  for (let i = 0; i < keys.length; i++) {
    const childOrg = org[keys[i]] ? org[keys[i]]: null ;
    const childCom = com[keys[i]] ? com[keys[i]]: null ;
    tmp[keys[i]] = updateObj(childOrg, childCom);  
  }
  return tmp;
}

/* return a new array without mutating original array */
function updateArray(org, com) {
  const key = Object.keys(com)[0];
  switch(key) {
    case '$push':
      return [...org, ...com[key]];
    case '$unshift':
      return [...com[key], ...org];
    case '$splice':
      const newArr = [...org];
      newArr.splice(...com[key][0]);
      return newArr; 
    default:
      return org;
  }
}

/* main update function - org: original state, com: command object */
const update = (org, com) =>  (Array.isArray(org)) ? updateArray(org, com) : updateObj(org, com);

module.exports = update;