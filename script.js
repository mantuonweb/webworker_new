(function(w, d) {

  d.querySelector('.search').addEventListener('click', function() {
    
    // Create a new worker with the worker script
    var worker = new Worker('worker.js');
    
    // Adding an event listener to receive postMessage events from the worker
    worker.onmessage=function(e) {
      var primeElement = d.createElement('span');
      primeElement.classList.add('prime');
      primeElement.textContent = e.data.prime;
      
      d.querySelector('.prime-numbers').appendChild(primeElement);
    };
    
    // To start the worker we need to post an initial message where we also pass
    // in parameters to the worker.
    worker.postMessage({
      limit: d.querySelector('#limit').value
    });
    
  });

}(window, document));


/****


(function(s) {
  console.log(s)
  function findPrimeNumbers(limit) {
    var isPrime,
        i,
        j;

    for(i = 1; i < limit; i++) {
      isPrime = true;

      for(j = 2; j < i; j++) {
        if(i % j === 0) {
          isPrime = false;
        } 
      }

      if(isPrime) {
        // Instead of accessing the DOM (which is not possible in workers anyway)
        // we will fire a postMessage event and the host is listening for it.
        s.postMessage({
          prime: i
        });
      }
    }
  }

  // Here is the entry point for the worker. It will start the thread by 
  // receiving a postMessage from a Web Worker host.
  s.onmessage=function(e) {
    findPrimeNumbers(e.data.limit);
  };

}(self));
console.log(self)//DedicatedWorkerGlobalScope

The DedicatedWorkerGlobalScope object (the Worker global scope) is accessible through the self keyword. 
Some additional global functions, namespaces objects, and constructors, not typically associated with the worker global scope, 
but available on it, are listed in the JavaScript Reference. See also: Functions available to workers.


***/