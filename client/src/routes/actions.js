export function longpress(node, threshold = 300) {
  
    const handle_mousedown = (e) => {
      e.preventDefault();
      let start = Date.now();
  
      let timeout = setTimeout(() => {
        node.dispatchEvent(new CustomEvent('longpress'));
        timeout = null
      }, threshold);
  
      const cancel = (e) => {
        e.preventDefault();
        if(timeout) node.dispatchEvent(new CustomEvent('shortpress'))

        clearTimeout(timeout);
        timeout = null

        node.removeEventListener('mousemove', cancel);
        node.removeEventListener('mouseup', cancel);
        node.removeEventListener('touchend', cancel);
      };
  
      node.addEventListener('mousemove', cancel);
      node.addEventListener('mouseup', cancel);
      node.addEventListener('touchend', cancel);

    }
  
    node.addEventListener('mousedown', handle_mousedown);
    node.addEventListener('touchstart', handle_mousedown);

  
    return {
      destroy() {
        node.removeEventListener('mousedown', handle_mousedown);
        node.removeEventListener('touchstart', handle_mousedown)
      }
    };
  }