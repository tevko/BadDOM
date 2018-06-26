
window.vDiff = (target, source) => {
    const worker = {
        settings: {
            original: target,
        },
        replace(nTarget, nSource = target) {
            const v = document.createElement('template');
            v.innerHTML = nSource;
            const vHTML = v.content.firstChild.nextElementSibling;
            if (vHTML.nodeName !== nTarget.nodeName) {
                nTarget.parentElement.replaceChild(vHTML, nTarget);
                return;
            }
            this.iterate(target, vHTML);
        },
        iterate(targetNode, sourceNode, tOriginal) {
            if (targetNode || sourceNode) {
                this.checkAdditions(targetNode, sourceNode, tOriginal);
                if (targetNode && sourceNode && targetNode.nodeName !== sourceNode.nodeName) {
                    this.checkNodeName(targetNode, sourceNode);
                } else if (targetNode && sourceNode && targetNode.nodeName === sourceNode.nodeName) {
                    this.checkTextContent(targetNode, sourceNode);
                    targetNode.nodeType !== 3 && target.nodeType !== 8 && this.checkAttributes(targetNode, sourceNode);
                }
            }
            if (targetNode && sourceNode) {
                if (targetNode.childNodes && sourceNode.childNodes) {
                    this.settings.lengthDifferentiator = [...target.childNodes, ...sourceNode.childNodes];
                } else {
                    this.settings.lengthDifferentiator = null;
                }
                (this.settings.lengthDifferentiator || []).forEach((node, idx) => {
                    this.settings.lengthDifferentiator &&
                    this.iterate(targetNode.childNodes[idx], sourceNode.childNodes[idx], targetNode, sourceNode);
                });
            }
        },
        checkNodeName(targetNode, sourceNode) {
            const n = sourceNode.cloneNode(true);
            targetNode.parentElement.replaceChild(n, targetNode);
        },
        checkAttributes(targetNode, sourceNode) {
            const attributes = targetNode.attributes || [];
            const filteredAttrs = Object.keys(attributes).map((n) => attributes[n]);
            const attributesNew = sourceNode.attributes || [];
            const filteredAttrsNew = Object.keys(attributesNew).map((n) => attributesNew[n]);
            filteredAttrs.forEach(o => sourceNode.getAttribute(o.name) !== null ?
                targetNode.setAttribute(o.name, sourceNode.getAttribute(o.name)) :
                targetNode.removeAttribute(o.name));
            filteredAttrsNew.forEach(a => targetNode.getAttribute(a.name) !== sourceNode.getAttribute(a.name) &&
            targetNode.setAttribute(a.name, sourceNode.getAttribute(a.name)));
        },
        checkTextContent(targetNode, sourceNode) {
            if (targetNode.nodeValue !== sourceNode.nodeValue) {
                targetNode.textContent = sourceNode.textContent;
            }
        },
        checkAdditions(targetNode, sourceNode, tParent = this.settings.original) {
            if (sourceNode && targetNode === undefined) {
                const newNode = sourceNode.cloneNode(true);
                tParent.nodeType !== 3 && tParent.nodeType !== 8 && tParent.appendChild(newNode);
            } else if (targetNode && sourceNode === undefined) {
                targetNode.parentElement.removeChild(targetNode);
            }
        },
    };
    Object.create(worker).replace(target, source);
};
