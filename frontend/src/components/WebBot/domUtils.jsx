// src/utils/domUtils.js
export const getHierarchicalContent = (element) => {
  if (!element) return { content: '', structure: [] };
  
  // Check if this is a graph element
  const graphMatch = element.className.match(/graph-(data_[a-c])/i);
  const graphType = graphMatch ? graphMatch[1] : null;
  
  // Find the nearest boundary element
  let boundary = element;
  while (boundary && !boundary.hasAttribute('data-chat-boundary')) {
    boundary = boundary.parentElement;
    if (boundary === document.body) break;
  }

  if (!boundary || boundary === document.body) {
    boundary = element.closest('.complex-component') || 
               element.closest('.content-row') || 
               element;
  }

  const clone = boundary.cloneNode(true);
  const unwantedSelectors = ['button', 'a', 'svg', 'select'];
  unwantedSelectors.forEach(selector => {
    clone.querySelectorAll(selector).forEach(el => el.remove());
  });

  // Get all text nodes
  const walker = document.createTreeWalker(
    clone,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  let textParts = [];
  let node;
  while (node = walker.nextNode()) {
    if (node.nodeValue.trim() !== '') {
      textParts.push(node.nodeValue.trim());
    }
  }

  // Get element structure
  const structure = [];
  let current = element;
  while (current && current !== boundary && current !== document.body) {
    structure.unshift({
      tag: current.tagName.toLowerCase(),
      class: current.className,
      id: current.id
    });
    current = current.parentElement;
  }

  return {
    content: textParts.join('\n\n').replace(/\s+/g, ' ').trim(),
    structure,
    boundaryElement: boundary,
    graphType // Add graph type to the return object
  };
};
  const getElementStructure = (element) => {
    const path = [];
    let current = element;
    
    while (current && current.nodeType === Node.ELEMENT_NODE) {
      path.unshift({
        tag: current.tagName.toLowerCase(),
        class: current.className,
        id: current.id
      });
      current = current.parentNode;
    }
    
    return path.slice(0, 3); // Return top 3 levels of hierarchy
  };

export const getFullTextContent = (element) => {
    if (!element) return '';
    
    // Create a deep clone to avoid modifying the original DOM
    const clone = element.cloneNode(true);
    
    // Remove unwanted interactive elements
 
    const unwantedSelectors = [
        'button', 'a', 'svg', 
        'select'
      ];
    
    unwantedSelectors.forEach(selector => {
      clone.querySelectorAll(selector).forEach(el => el.remove());
    });
  
    // Get all text nodes recursively
    const walker = document.createTreeWalker(
      clone,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
  
    let textParts = [];
    let node;
    while (node = walker.nextNode()) {
      if (node.nodeValue.trim() !== '') {
        textParts.push(node.nodeValue.trim());
      }
    }
  
    // Normalize whitespace and join with paragraph breaks
    return textParts
      .join('\n\n')
      .replace(/\s+/g, ' ')
      .trim();
  };
  
  
  // Add these new functions to domUtils.js

export const enableDebugMode = () => {
  window.__tripleClickDebug = true;
  console.log('[TripleClick] Debug mode enabled');
};

export const highlightElement = (element, duration = 3000, isGraph = false) => {
  if (!element?.style) return;

  // Clear previous highlight if exists
  if (element._highlightTimeout) {
    clearTimeout(element._highlightTimeout);
    element.style.outline = '';
    element.style.boxShadow = '';
  }

  // Set new highlight style
  const color = isGraph ? '#3a86ff' : '#4CAF50';
  const width = isGraph ? 4 : 3;
  
  element.style.outline = `${width}px solid ${color}`;
  element.style.boxShadow = `0 0 0 ${width}px ${color}33`;
  element.style.outlineOffset = '2px';
  element.style.transition = 'outline 0.2s ease';

  // Debug logging
  if (window.__tripleClickDebug || element.hasAttribute('data-chat-debug')) {
    const tagName = element.tagName.toLowerCase();
    const id = element.id ? `#${element.id}` : '';
    const classes = element.className ? `.${element.className.replace(/\s+/g, '.')}` : '';
    console.log(
      `%c[TripleClick]%c Highlighting ${tagName}${id}${classes}`,
      'color: #4CAF50; font-weight: bold',
      ''
    );
  }

  element._highlightTimeout = setTimeout(() => {
    element.style.outline = '';
    element.style.boxShadow = '';
    delete element._highlightTimeout;
  }, duration);

  return element;
};

export const logCapture = (content, boundaryElement, structure, graphType) => {
  if (!window.__tripleClickDebug && !boundaryElement?.hasAttribute('data-chat-debug')) return;

  console.groupCollapsed(
    `%c[TripleClick]%c Captured ${content.length} chars from ${boundaryElement?.tagName}`,
    'color: #4CAF50; font-weight: bold',
    ''
  );
  console.log('Content:', content);
  console.log('Structure:', structure);
  if (graphType) console.log('Graph Type:', graphType);
  console.groupEnd();
};

  // src/utils/dataUtils.js
export const fetchGraphData = async (graphType) => {
  // Placeholder - implement when backend is ready
  switch(graphType.toLowerCase()) {
    case 'data_a':
      return { message: "Data A will be fetched from backend" };
    case 'data_b':
      return { message: "Data B will be fetched from backend" };
    case 'data_c':
      return { message: "Data C will be fetched from backend" };
    default:
      return null;
  }
};