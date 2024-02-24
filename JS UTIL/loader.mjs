export function initializeLoader() {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'loadingOverlay';
    loadingOverlay.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background-color:rgba(41,54,12,0.5); display:flex; justify-content:center; align-items:center; z-index:100; color: white;';
    loadingOverlay.textContent = 'LOADING...';
    document.body.appendChild(loadingOverlay);
}

export function hideLoader() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.style.display = 'none';
}

