const eventBus = {
  on(event, callback) {
    document.addEventListener(
      event,
      (e) => callback(e.detail)
    , { capture: true });
    //);
    //, { once: true });
  },
  dispatch(event, data) {
    console.log('eventBus - dispatch - event:', data);
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  },
  remove(event, callback) {
    document.removeEventListener(event, callback);
  },
  listEventInfo(_id) {
    const allElements = Array.prototype.slice.call(document.querySelectorAll('*'));
    allElements.push(document);
    allElements.push(window);

    const types = [];

    for (let ev in window) {
      if (/^on/.test(ev)) types[types.length] = ev;
    }

    let elements = [];
    for (let i = 0; i < allElements.length; i++) {
      const currentElement = allElements[i];
      for (let j = 0; j < types.length; j++) {
        if (typeof currentElement[types[j]] === 'function') {
          //if (currentElement.id === 'logout') {
          if (currentElement.id === _id) {
            return true;
            //return currentElement.id;
          }
        }
      }
    }
    return false;
  },
  listAllEventListeners() {
    const allElements = Array.prototype.slice.call(document.querySelectorAll('*'));
    allElements.push(document);
    allElements.push(window);

    const types = [];

    for (let ev in window) {
      if (/^on/.test(ev)) types[types.length] = ev;
    }

    let elements = [];
    for (let i = 0; i < allElements.length; i++) {
      const currentElement = allElements[i];
      for (let j = 0; j < types.length; j++) {
        if (typeof currentElement[types[j]] === 'function') {
          elements.push({
            "node": currentElement,
            "type": types[j],
            "func": currentElement[types[j]].toString(),
          });
        }
      }
    }

    return elements.sort(function(a,b) {
      return a.type.localeCompare(b.type);
    });
  },
};

export default eventBus
