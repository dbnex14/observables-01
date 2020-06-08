import { Component, OnInit, OnDestroy } from '@angular/core';
// import is function provided by rxjs that is easiers way to build Observables.
import { interval, Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // Let's build our own observable here.  Observables are not part of javascript but
    // are instead packages in rxjs package which you can find reference to in package.json 
    // file.
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // });

    // Let's now build a real custom observable.
    const customIntervalObservable = Observable.create(observer => {
      // Observer is an argument passed to Observable when we create it by rxjs automatically.
      // It is the part that is interested to be informed about new data, error or completion.
      // So, we are not listening but listener which is our observer passed in and we need to
      // tell it once we are done.
      // we can now use just setInterval method and provide handler in which we cann use our
      // observer and call next() on it to emit new value.  Observer has next() method but it
      // also has error() and complete() method too.
      let count: number = 0;
      setInterval(() => {
        observer.next(count);
        // let's complete our observable
        if (count === 2) {
          observer.complete();
        }
        // let's fake an error
        if (count > 3) {
          observer.error(new Error('count is greather than 3.'));
        }
        count++;
      }, 1000);
    });

    // now subscribe to our custom observable
    this.firstObsSubscription = customIntervalObservable.subscribe(data => {
      console.log(data);
    }, error => {
      // handle error
      console.log(error);
      alert(error.message);
    }, () => {
      // completion handler
      console.log('Completed!');
    })
  }

  ngOnDestroy(): void {
    // unsubscribe from observable to prevet memory leak
    this.firstObsSubscription.unsubscribe();
  }
}
