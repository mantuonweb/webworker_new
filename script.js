(function(w, d) {

  d.querySelector('.search').addEventListener('click', function() {
    
    // Create a new worker with the worker script
    var worker = new Worker('worker.js');
    
    // Adding an event listener to receive postMessage events from the worker
    worker.addEventListener('message', function(e) {
      var primeElement = d.createElement('span');
      primeElement.classList.add('prime');
      primeElement.textContent = e.data.prime;
      
      d.querySelector('.prime-numbers').appendChild(primeElement);
    });
    
    // To start the worker we need to post an initial message where we also pass
    // in parameters to the worker.
    worker.postMessage({
      limit: d.querySelector('#limit').value
    });
    
  });

}(window, document));