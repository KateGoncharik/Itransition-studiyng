export class Component {
  #children = [];
  #node = null;

  constructor({ tag = "div", className = "", text = "" }, ...children) {
    const node = document.createElement(tag);
    node.className = className;
    node.textContent = text;
    this.#node = node;

    if (children) {
      this.appendChildren(children);
    }
  }

  append(child) {
    this.#children.push(child);
    this.#node.append(child.getNode());
  }

  appendChildren(children) {
    children.forEach((el) => {
      this.append(el);
    });
  }

  getNode() {
    return this.#node;
  }

  getChildren() {
    return this.#children;
  }

  setTextContent(content) {
    this.#node.textContent = content;
  }

  setAttribute(attribute, value) {
    this.#node.setAttribute(attribute, value);
  }

  addListener(event, listener, options = false) {
    this.#node.addEventListener(event, listener, options);
  }
}
