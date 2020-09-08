export class NeulhanJS {
  constructor(config) {
    this.setProxy(config);
    this.initialize();
  }
  initialize() {
    for (const data in this.proxy) {
      this.reflect(data, this.proxy[data]);
    }
    this.setBind();
  }
  setProxy(config) {
    this.proxy = new Proxy(config, {
      get: (target, prop, value) => {
        console.log("GET ACTION 감지!");
        return target[prop];
      },
      set: (target, prop, value) => {
        console.log("SET ACTION 감지!");
        target[prop] = value;
        this.reflect(prop, value);
        return true;
      },
    });
  }
  setBind() {
    const bindList = [...document.querySelectorAll("[neulhan-bind]")];
    for (const input of bindList) {
      const bindName = input.getAttribute("neulhan-bind");
      input.addEventListener("keyup", (e) => {
        this.proxy[bindName] = e.target.value;
      });
    }
  }
  reflect(prop, value) {
    document.querySelector(`[neulhan-data="${prop}"]`).innerText = value;
    document.querySelector(`[neulhan-bind="${prop}"]`).value = value;
  }
}
