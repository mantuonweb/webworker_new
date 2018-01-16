(function(s) {
  
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
  s.addEventListener('message', function(e) {
    findPrimeNumbers(e.data.limit);
  });

}(self));