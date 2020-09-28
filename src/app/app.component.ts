import { Component, OnInit } from '@angular/core';
import { of, from, timer, interval, concat, merge, range, combineLatest, Observable } from 'rxjs';
import { toArray, take, map, pluck, filter, takeUntil, first, last, skip, skipLast, find, findIndex } from 'rxjs/operators';
import { takeLast } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor() { }
  title = 'rxjs';

  ofExData;
  ngOnInit(): void {

    // 1.of observable: They have Convert the argument to an observable sequence.
    let ofEx = of( 1, 2,3)
    ofEx.subscribe(res => {
      this.ofExData = res
      console.log("of:", res);
    });

    //2. from observable: Create an observable from an Array.
    // array be also like (object, promise, an iterable object)

    //from as a array.
    const fromEx = from([1, 2]).subscribe(res => {
      // console.log("Array From", res);
    });

    // from as a string.
    const fromEx1 = from('vaman').subscribe(res => {
      // console.log("String From", res);
    });

    //3. pipe: Pipe perform before subsribe and also perform inside pipe first then after perform subscribe.

    //4. toArray observable: toArray that convert data into array. 

    let toArrayEx1 = of(0, 1, 2)
    toArrayEx1.pipe(
      toArray()
    ).subscribe(res => {
      // console.log("toArray", res);
    });

    //5. map observable: map observable is user to Modified original data like multiple ,addition,some condition to change.

    let mapEx = of(0, 1, 2)
    mapEx.pipe(
      map(res => res * 2)
    ).subscribe(res => {
      // console.log("map",res);
    })

    //6. pluck observable: pluck observable is used in a object only.
    // This observable replay object value and in pluck observable inside we have pass a object key.

    let pluckEx = of(
      {
        key: 1
      },
      {
        key: 2
      },
      {
        key: 3
      }
    )
    pluckEx.pipe(
      pluck('key')
    ).subscribe(res => {
      // console.log("pluck", res);
    })

    //7. nestedPluck observable: If we have used nested object that time we have used in nested pluck observable. 
    //That time we have passed two parameter first one is object key and second one is nested object key.

    let nestedPluckEx = of(
      {
        v: 1,
        x: {
          a: 1,
          b: 2
        },
        z: 7
      }
    )
    nestedPluckEx.pipe(
      pluck('x', 'b')
    ).subscribe(res => {
      // console.log(" nested pluck", res);
    })

    //8. filter observable: We have use filter observable in any find or some condition apply or some value compare that time we have used in filter.
    //that filtering the value.

    let filterEx = of(1, 2, 3, 4)
    filterEx.pipe(
      filter(data => data > 2)
    ).subscribe(res => {
      // console.log("Filter", res);
    })

    //9. take observable: We can starting some value print that time we have use take observable.

    let takeEx = of(1, 2, 3, 4, 5, 6)
    takeEx.pipe(
      take(2)
    ).subscribe(
      res => {
        // console.log("take",res);
      })

    //10. takeLast observable: We can ending some value print that time we have use takeLast observable.

    let takeLastEx = of(1, 2, 3, 4, 5, 6)
    takeLastEx.pipe(
      takeLast(3)
    ).subscribe(
      res => {
        // console.log("take last",res);
      })

    //11. takeUntil observable: that have responce when that condition not full fill means condition time that have perform and then after they have stop. 

    interval(1000).pipe(
      takeUntil(timer(5000))
    ).subscribe(
      res => {
        // console.log("Interval", res);
      })

    //12. interval observable: That have return responce after given time and again and again that have responce output value.

    interval(1000).subscribe(
      res => {
        // console.log("Interval", res);
      })

    //13. concate observable: That have concate two value as a sequence first array completed then after second array start.

    const timer0 = interval(1000).pipe(take(4));
    const sequence = range(1, 10);
    const result = concat(timer0, sequence);
    result.subscribe(
      res => {
        // console.log("concate", res);
      })

    //14. merge observable: That have merge two value as a timeing when which timing first that call first does not matter that have first array value or second array value.

    const timer1 = interval(1000).pipe(take(10));
    const timer2 = interval(2000).pipe(take(6));
    const timer3 = interval(500).pipe(take(10));
    const concurrent = 2;
    const merged = merge(timer1, timer2, timer3, concurrent);
    merged.subscribe(
      res => {
        // console.log("merge", res);
      })

    //15. combineLatest observable: That have return array1 and array2 value which have last come and combine.

    const firstTimer = timer(0, 1000);
    const secondTimer = timer(500, 1000);
    const combinedTimers = combineLatest(firstTimer, secondTimer);
    combinedTimers.subscribe(
      res => {
        // console.log("combineLatest", res);
      })

    //16. first observable: They have return first argument.

    let firstEx = of(1, 2, 3, 4,)
    firstEx.pipe(
      first()
    ).subscribe(res => {
      // console.log("first", res);
    })

    //17. last observable: They have rturn last argument.

    let lastEx = of(1, 2, 3, 4,)
    lastEx.pipe(
      last()
    ).subscribe(res => {
      // console.log("last", res);
    })

    //18. skip observable: They have skip value as we can pass in a starting part.

    let skipEx = of(1, 2, 3, 4, 5, 6)
    skipEx.pipe(
      skip(2)
    ).subscribe(res => {
      // console.log("skip", res);
    })

    //19. skipLast observable: They have skip value as we can pass as a end of a part.

    let skipLastEx = of(1, 2, 3, 4, 5, 6)
    skipLastEx.pipe(
      skipLast(2)
    ).subscribe(res => {
      // console.log("skip Last", res);
    })

    //20. find observable: We can use find observable in a any value find in a array or string or anything else.
    //That have return only first find argument value.

    let findEx = of(1, 3, 2, 6, 4, 5, 7, 8)
    findEx.pipe(
      find(data => data > 5)
    ).subscribe(res => {
      // console.log("find", res);
    })

    //21. findIndex observable: We can use findIndex observable in a any value index find in a array or string or anything else.
    //That have return only first find argument Index.

    let findIndexEx = of(1, 3, 2, 6, 4, 5, 7, 8)
    findIndexEx.pipe(
      findIndex(data => data > 5)
    ).subscribe(res => {
      // console.log("findIndex", res);
    })

    //22. timer observable: That have two part 
    //  1) delay: delay that represend as a how many time after that have perform.
    // 2) interval: That interval 1000  sec after that have perform and perform again and again.
    const timerEx = timer(3000, 1000);
    timerEx.subscribe(res => {
      // console.log("timer", res);  
    })

    //23. custom observable: We can also create a custom observable. 
    // inside we have 3 main part
    //  1) observable.next('msg')
    //  2) observable.error('msg')
    //  3) observable.complete()

    // syntax of custom observable

    const cusObj = Observable.create(observer => {
      // observer.next('msg')    //normali this run
      // observer.error('msg')   // if any error that time this one run
      // observer.complete()     // this run then after not any one run 
      // observer.next('msg')  // not execution because we have already completed so...
    })
    cusObj.subscribe(res => {
      // console.log("findIndex", res);
    })

    //24. Custom Interval observable: We have also set interval in a custom observable.

    const cusIntObj = Observable.create(observer => {
      setInterval(() => {
        observer.next('msg')
      }, 1000)
    })
    cusIntObj.subscribe(res => {
      // console.log("findIndex", res);
    })

    //25.Tap observable: If we have any action perform that time we have used a tap obsrvable.
    //  Main use of tap observable is debugging and also responce doesn't any effect.
    //  example : console.log(data)

    //26. retry observable: we have fetch any api in online and suppose we have net connection is loss that time show error.
    //  This error how many time show that deside inside a retry observable. 
    //  like retry(2) :- That have show 2 time error

    //27. subject: that have allow multicasted value to many observable.
    //  subject be like a EventEmitters.
    //  subject not have any required initial value and we can't passed the initial value in subject.
    //  syntax : subject = new subject<num>();

    //28. behaviour subject: 
    //   behaviour subject is required initial value without initial value that have can't perform.
    //   syntax : subject = new behaviourSubject(0)     // <--- here 0 is a initial value  

    // ---- Flattening opservable ----

    //29. Flattening observable: When we used two time subscribe value that time flattening observable used.
    //  They have main 3 flattening observable
    //    1) concateMap()
    //    2) mergeMap()
    //    3) switchMap()

    //30. concateMap(): They have combine two observable ( map() + concateAll() ) 
    //  let different between map() && ( map() + concateAll() ) && concateMap()

    //  1) map(): 
    //         If we used only map observable that time we have used 2 time subscriber then after got output.
    //  2)map() + concateAll() :
    //          If we use map() + concateAll() that time only 1 time subscribe then after we got a output but 2 observable used.
    //  3)concateMap():
    //          If we used concateMap() direct 1 time subscribe got outpput and also 1 observable used.

    // sort:
    //  1)map() : 2 time subscribe + 1 observable use 
    //  1)map() + concateAll() : 1 time subscribe + 2 observable use 
    //  1)concateMap() : 1 time subscribe + 1 observable use 

    //31. mergeMap:They have combine two observable ( map() + mergeAll() ) 
    //  let different between map() && ( map() + mergeAll() ) && mergeMap()

    //  1) map(): 
    //         If we used only map observable that time we have used 2 time subscriber then after got output.
    //  2)map() + mergeAll() :
    //          If we use map() + mergeAll() that time only 1 time subscribe then after we got a output but 2 observable used.
    //  3)mergeMap():
    //          If we used mergeMap() direct 1 time subscribe got outpput and also 1 observable used.

    // sort:
    //  1)map() : 2 time subscribe + 1 observable use.
    //  1)map() + mergeAll() : 1 time subscribe + 2 observable use.
    //  1)mergeMap() : 1 time subscribe + 1 observable use.

    //32. switchMap:They have combine two observable ( map() + switchAll() ) 
    //  switchMap show only last request of the data
    //  let different between map() && ( map() + switchAll() ) && switchMap()

    //  1) map(): 
    //         If we used only map observable that time we have used 2 time subscriber then after got output.
    //  2)map() + switchAll() :
    //          If we use map() + switchAll() that time only 1 time subscribe then after we got a output but 2 observable used.
    //  3)switchMap():
    //          If we used switchMap() direct 1 time subscribe got outpput and also 1 observable used.

    // sort:
    //  1)map() : 2 time subscribe + 1 observable use.
    //  1)map() + switchAll() : 1 time subscribe + 2 observable use.
    //  1)switchMap() : 1 time subscribe + 1 observable use.

    // ==> different btn concateMap() && mergeMap() && switchMap() 

    //  1) concateMap() : they have concate the two value in a order to time.
    //  2) mergeMap(): They have merge the two value as a sequence when first value complete then after second value merge.
    //  3) switchMap() : They return only last request of the data.

  }
}
